// src/components/TranslationService.js
import englishTranslations from '../translations/en';

// Create a cache key for the stored translations
const getStorageKey = (langCode) => `sase_csu_translations_${langCode}_v1`;

/**
 * Service to handle translations using local language files
 */
class TranslationService {
  constructor() {
    // In-memory cache for translations
    this.memoryCache = {};
    
    // Check if we're running in development or production mode
    this.isDev = process.env.NODE_ENV === 'development';
    
    console.log('Translation service initialized (local files only)');
    
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
   * Gets or loads translations for a language
   * @param {string} langCode - Language code
   * @returns {Promise<Object>} - Translations object
   */
  async getTranslations(langCode) {
    // English is our base language, return it directly
    if (langCode === 'en') {
      return englishTranslations;
    }
    
    // Check if we have the full translations set in memory cache
    const cacheKey = `full_translations_${langCode}`;
    if (this.memoryCache[cacheKey]) {
      return this.memoryCache[cacheKey];
    }
    
    try {
      // Try to load from a static file (for supported languages)
      try {
        const staticTranslations = await import(`../translations/${langCode}.js`);
        // Cache the translations
        this.memoryCache[cacheKey] = staticTranslations.default;
        // Also store in localStorage for future visits
        this.storeTranslations(langCode, staticTranslations.default);
        
        console.log(`Loaded translations for ${langCode} from local file`);
        return staticTranslations.default;
      } catch (e) {
        console.warn(`No local translations found for ${langCode}, falling back to English`);
      }
      
      // If we get here, we don't have translations for this language
      // Fall back to English
      return englishTranslations;
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
    
    console.log('Translation cache cleared');
  }
}

// Create instance
const translationServiceInstance = new TranslationService();

// Export instance
export default translationServiceInstance;