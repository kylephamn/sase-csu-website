// src/components/TranslationService.js
import englishTranslations from '../translations/en';

// Create a cache key for the stored translations
const getStorageKey = (langCode) => `sase_csu_translations_${langCode}_v1`;

// Priority translation keys - these are the most visible UI elements
const PRIORITY_KEYS = [
  'global',
  'nav',
  'home.hero',
  'footer'
];

/**
 * Service to handle dynamic translations via Netlify Functions proxy
 */
class TranslationService {
  constructor() {
    // In-memory cache for translations
    this.memoryCache = {};
    
    // Check if we're running in development or production mode
    this.isDev = process.env.NODE_ENV === 'development';
    
    // Log initialization
    console.log('Translation service initialized');
    
    // Load any cached translations from localStorage
    this.loadCachedTranslations();
  }
  
  /**
   * Load any previously cached translations from localStorage
   */
  loadCachedTranslations() {
    // Look for cached translations in localStorage
    try {
      const storedLanguages = localStorage.getItem('sase_csu_cached_languages');
      if (storedLanguages) {
        const languages = JSON.parse(storedLanguages);
        console.log(`Found cached translations for: ${languages.join(', ')}`);
        
        // Pre-load them into memory cache
        languages.forEach(lang => {
          const storageKey = getStorageKey(lang);
          const stored = localStorage.getItem(storageKey);
          if (stored) {
            try {
              this.memoryCache[`full_translations_${lang}`] = JSON.parse(stored);
            } catch (e) {
              console.error(`Failed to parse cached translations for ${lang}`, e);
            }
          }
        });
      }
    } catch (e) {
      console.warn('Failed to load cached translations', e);
    }
  }
  
  /**
   * Store translations in localStorage
   * @param {string} langCode - Language code
   * @param {object} translations - Translations object
   */
  storeTranslations(langCode, translations) {
    try {
      // Store the translations
      const storageKey = getStorageKey(langCode);
      localStorage.setItem(storageKey, JSON.stringify(translations));
      
      // Track which languages we've cached
      let cachedLanguages = [];
      try {
        const stored = localStorage.getItem('sase_csu_cached_languages');
        if (stored) {
          cachedLanguages = JSON.parse(stored);
        }
      } catch (e) {
        // Ignore
      }
      
      if (!cachedLanguages.includes(langCode)) {
        cachedLanguages.push(langCode);
        localStorage.setItem('sase_csu_cached_languages', JSON.stringify(cachedLanguages));
      }
      
      console.log(`Cached translations for ${langCode} in localStorage`);
    } catch (e) {
      console.warn('Failed to cache translations', e);
    }
  }

  /**
   * Translates text to the target language using Netlify Functions proxy
   * @param {string} text - Text to translate
   * @param {string} targetLang - Target language code (e.g., 'es', 'fr')
   * @returns {Promise<string>} - Translated text
   */
  async translateText(text, targetLang) {
    // Skip translation if text is empty or contains only placeholders
    if (!text || text.trim() === '' || text.match(/^{{.*}}$/)) {
      return text;
    }
    
    // Create a cache key based on text and target language
    const cacheKey = `${targetLang}:${text}`;
    
    // Return cached translation if available
    if (this.memoryCache[cacheKey]) {
      return this.memoryCache[cacheKey];
    }
    
    try {
      // Call our Netlify Functions proxy instead of directly calling Google API
      const response = await fetch('/.netlify/functions/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text,
          targetLang: targetLang
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Translation failed');
      }
      
      const data = await response.json();
      
      // Extract translated text from response
      const translatedText = data.data.translations[0].translatedText;
      
      // Cache the result
      this.memoryCache[cacheKey] = translatedText;
      
      return translatedText;
    } catch (error) {
      console.error('Translation API error:', error);
      // Return original text as fallback
      return text;
    }
  }
  
  /**
   * Translates multiple texts in a single batch request
   * @param {Array<string>} texts - Array of texts to translate
   * @param {string} targetLang - Target language code
   * @returns {Promise<Array<string>>} - Array of translated texts
   */
  async translateBatch(texts, targetLang) {
    if (texts.length === 0) return [];
    
    // Filter out texts that are already in cache
    const uncachedTexts = [];
    const uncachedIndexes = [];
    const results = new Array(texts.length);
    
    // Check cache first for each text
    texts.forEach((text, index) => {
      // Skip empty or placeholder texts
      if (!text || text.trim() === '' || text.match(/^{{.*}}$/)) {
        results[index] = text;
        return;
      }
      
      const cacheKey = `${targetLang}:${text}`;
      if (this.memoryCache[cacheKey]) {
        results[index] = this.memoryCache[cacheKey];
      } else {
        uncachedTexts.push(text);
        uncachedIndexes.push(index);
      }
    });
    
    // If all texts were cached, return results immediately
    if (uncachedTexts.length === 0) {
      return results;
    }
    
    try {
      // Call batch translate function
      const response = await fetch('/.netlify/functions/batch-translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          texts: uncachedTexts,
          targetLang: targetLang
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Batch translation failed');
      }
      
      const data = await response.json();
      const translations = data.data.translations;
      
      // Process and cache translations
      translations.forEach((item, i) => {
        const originalText = uncachedTexts[i];
        const translatedText = item.translatedText;
        const originalIndex = uncachedIndexes[i];
        
        // Update results array
        results[originalIndex] = translatedText;
        
        // Update cache
        this.memoryCache[`${targetLang}:${originalText}`] = translatedText;
      });
      
      return results;
    } catch (error) {
      console.error('Batch translation error:', error);
      
      // Return original texts for uncached items as fallback
      uncachedIndexes.forEach((originalIndex, i) => {
        results[originalIndex] = texts[originalIndex];
      });
      
      return results;
    }
  }

  /**
   * Extract a subset of translations based on specified paths
   * @param {Object} obj - Full translations object 
   * @param {Array} paths - Array of dot-notation paths to extract
   * @returns {Object} - Subset of translations
   */
  extractPaths(obj, paths) {
    const result = {};
    
    paths.forEach(path => {
      const parts = path.split('.');
      let current = obj;
      let target = result;
      
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        
        if (i === parts.length - 1) {
          // Last part, set the value
          if (current && current[part] !== undefined) {
            target[part] = current[part];
          }
        } else {
          // Create path if it doesn't exist
          if (!target[part]) {
            target[part] = {};
          }
          
          if (current && current[part]) {
            current = current[part];
            target = target[part];
          } else {
            break; // Path doesn't exist in source
          }
        }
      }
    });
    
    return result;
  }
  
  /**
   * Recursively translates an object's string values with optimized batching
   * @param {Object} obj - Object with string values to translate
   * @param {string} targetLang - Target language code
   * @returns {Promise<Object>} - Object with translated string values
   */
  async translateObject(obj, targetLang) {
    // Create a deep copy of the original object
    const result = JSON.parse(JSON.stringify(obj));
    
    // Collect all strings for translation
    const stringsToTranslate = [];
    const stringPaths = [];
    
    // Function to collect all strings from an object
    const collectStrings = (object, path = []) => {
      for (const key in object) {
        const currentPath = [...path, key];
        
        if (typeof object[key] === 'string') {
          // Skip empty strings and placeholders
          if (object[key] && !object[key].match(/^{{.*}}$/)) {
            // Check if we already have this in memory cache
            const cacheKey = `${targetLang}:${object[key]}`;
            if (this.memoryCache[cacheKey]) {
              // If cached, directly update the result
              let current = result;
              for (let i = 0; i < path.length; i++) {
                current = current[path[i]];
              }
              current[key] = this.memoryCache[cacheKey];
            } else {
              // Otherwise, queue for translation
              stringsToTranslate.push(object[key]);
              stringPaths.push(currentPath);
            }
          }
        } else if (typeof object[key] === 'object' && object[key] !== null) {
          // Recursively collect strings from nested objects
          collectStrings(object[key], currentPath);
        }
      }
    };
    
    // Collect all strings
    collectStrings(obj);
    
    // Optimal batch size
    const MAX_BATCH_SIZE = 100;
    
    // Process all strings in batches
    for (let i = 0; i < stringsToTranslate.length; i += MAX_BATCH_SIZE) {
      const batch = stringsToTranslate.slice(i, i + MAX_BATCH_SIZE);
      const batchPaths = stringPaths.slice(i, i + MAX_BATCH_SIZE);
      
      if (batch.length === 0) continue;
      
      try {
        // Translate the batch
        const translations = await this.translateBatch(batch, targetLang);
        
        // Update the result object with translations
        translations.forEach((translation, index) => {
          const path = batchPaths[index];
          let current = result;
          
          // Navigate to the correct location
          for (let j = 0; j < path.length - 1; j++) {
            current = current[path[j]];
          }
          
          // Set the translated value
          const lastKey = path[path.length - 1];
          current[lastKey] = translation;
          
          // Cache the translation
          const originalText = batch[index];
          this.memoryCache[`${targetLang}:${originalText}`] = translation;
        });
      } catch (error) {
        console.error('Failed to translate batch', error);
      }
    }
    
    return result;
  }
  
  /**
   * Gets priority translations for initial UI render
   * @param {string} langCode - Language code
   * @returns {Promise<Object>} - Priority translations
   */
  async getPriorityTranslations(langCode) {
    // For English, return subset of original
    if (langCode === 'en') {
      return this.extractPaths(englishTranslations, PRIORITY_KEYS);
    }
    
    // Check cache first
    const cacheKey = `priority_translations_${langCode}`;
    if (this.memoryCache[cacheKey]) {
      return this.memoryCache[cacheKey];
    }
    
    // For other languages, check if we have full translations cached
    const fullCacheKey = `full_translations_${langCode}`;
    if (this.memoryCache[fullCacheKey]) {
      // Extract priority paths from full translations
      const priority = this.extractPaths(this.memoryCache[fullCacheKey], PRIORITY_KEYS);
      this.memoryCache[cacheKey] = priority;
      return priority;
    }
    
    // If no cached translations, translate just the priority items
    const prioritySource = this.extractPaths(englishTranslations, PRIORITY_KEYS);
    const priorityTranslations = await this.translateObject(prioritySource, langCode);
    
    // Cache the result
    this.memoryCache[cacheKey] = priorityTranslations;
    
    return priorityTranslations;
  }

  /**
   * Gets or dynamically generates translations for a language
   * @param {string} langCode - Language code
   * @param {boolean} priorityOnly - Whether to return only priority translations
   * @returns {Promise<Object>} - Translations object
   */
  async getTranslations(langCode, priorityOnly = false) {
    // English is our base language, return it directly
    if (langCode === 'en') {
      return priorityOnly ? 
        this.extractPaths(englishTranslations, PRIORITY_KEYS) : 
        englishTranslations;
    }
    
    // For priority-only requests, get just what we need
    if (priorityOnly) {
      return this.getPriorityTranslations(langCode);
    }
    
    // Check if we have the full translations set in memory cache
    const cacheKey = `full_translations_${langCode}`;
    if (this.memoryCache[cacheKey]) {
      return this.memoryCache[cacheKey];
    }
    
    try {
      // Try to load from a static file first (for supported languages)
      try {
        const staticTranslations = await import(`../translations/${langCode}.js`);
        // Cache the translations
        this.memoryCache[cacheKey] = staticTranslations.default;
        // Also store in localStorage for future visits
        this.storeTranslations(langCode, staticTranslations.default);
        return staticTranslations.default;
      } catch (e) {
        console.log(`No static translations found for ${langCode}, using API translation`);
      }
      
      // If we get here, we need to dynamically translate
      
      // First load priority translations for immediate UI feedback
      await this.getPriorityTranslations(langCode);
      
      // Then translate the full content
      const translations = await this.translateObject(englishTranslations, langCode);
      
      // Cache the entire translation set
      this.memoryCache[cacheKey] = translations;
      
      // Store in localStorage for future visits
      this.storeTranslations(langCode, translations);
      
      return translations;
    } catch (error) {
      console.error(`Failed to load translations for ${langCode}:`, error);
      // Fallback to English if translation fails
      return englishTranslations;
    }
  }
  
  /**
   * Clears the translation cache
   */
  clearCache() {
    // Clear memory cache
    this.memoryCache = {};
    
    // Clear localStorage cache
    try {
      const storedLanguages = localStorage.getItem('sase_csu_cached_languages');
      if (storedLanguages) {
        const languages = JSON.parse(storedLanguages);
        languages.forEach(lang => {
          localStorage.removeItem(getStorageKey(lang));
        });
        localStorage.removeItem('sase_csu_cached_languages');
      }
    } catch (e) {
      console.warn('Failed to clear cached translations', e);
    }
  }
}

// Create instance
const translationServiceInstance = new TranslationService();

// Export instance
export default translationServiceInstance;