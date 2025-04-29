// src/context/LanguageContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import translationService from '../components/TranslationService';

// Create the language context
const LanguageContext = createContext();

// Available languages
export const languages = {
  en: { 
    code: 'en', 
    name: 'English', 
    nativeName: 'English',
    dir: 'ltr' // left-to-right text direction
  },
  zh: { 
    code: 'zh', 
    name: 'Chinese', 
    nativeName: '中文',
    dir: 'ltr'
  },
  ko: { 
    code: 'ko', 
    name: 'Korean', 
    nativeName: '한국어',
    dir: 'ltr'
  },
  ja: { 
    code: 'ja', 
    name: 'Japanese', 
    nativeName: '日本語',
    dir: 'ltr'
  },
  hi: { 
    code: 'hi', 
    name: 'Hindi', 
    nativeName: 'हिन्दी',
    dir: 'ltr'
  },
  vi: { 
    code: 'vi', 
    name: 'Vietnamese', 
    nativeName: 'Tiếng Việt',
    dir: 'ltr'
  },
  th: { 
    code: 'th', 
    name: 'Thai', 
    nativeName: 'ไทย',
    dir: 'ltr'
  },
  ms: { 
    code: 'ms', 
    name: 'Malay', 
    nativeName: 'Bahasa Melayu',
    dir: 'ltr'
  },
  id: { 
    code: 'id', 
    name: 'Indonesian', 
    nativeName: 'Bahasa Indonesia',
    dir: 'ltr'
  },
  tg: { 
    code: 'tg', 
    name: 'Tagalog', 
    nativeName: 'Tagalog',
    dir: 'ltr'
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    dir: 'ltr'
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    dir: 'ltr'
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl' // right-to-left text direction
  },
};

// Store and retrieve the language preference key
const LANGUAGE_PREFERENCE_KEY = 'sase_csu_language_preference';

// Provider component
export const LanguageProvider = ({ children }) => {
  // Function to get initial language with fallbacks
  const getInitialLanguage = () => {
    try {
      // Get stored language preference
      const storedLanguage = localStorage.getItem(LANGUAGE_PREFERENCE_KEY);
      
      // If it exists and is a supported language, use it
      if (storedLanguage && languages[storedLanguage]) {
        console.log(`Using stored language preference: ${storedLanguage}`);
        return storedLanguage;
      }
      
      // Otherwise, use browser language or default to English
      const browserLang = navigator.language.split('-')[0];
      const defaultLang = languages[browserLang] ? browserLang : 'en';
      console.log(`No stored preference, using ${defaultLang} based on browser`);
      return defaultLang;
    } catch (e) {
      // In case of any localStorage errors, default to English
      console.warn('Error accessing language preferences', e);
      return 'en';
    }
  };

  // Save language preference to localStorage
  const saveLanguagePreference = (langCode) => {
    try {
      localStorage.setItem(LANGUAGE_PREFERENCE_KEY, langCode);
      console.log(`Language preference saved: ${langCode}`);
    } catch (e) {
      console.warn('Could not save language preference', e);
    }
  };

  const [currentLanguage, setCurrentLanguage] = useState(getInitialLanguage());
  const [translations, setTranslations] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);

  // Set HTML language and direction attributes on first load
  useEffect(() => {
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = languages[currentLanguage]?.dir || 'ltr';
  }, [currentLanguage]);

  // Load translations when language changes
  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Load translations from local files
        const loadedTranslations = await translationService.getTranslations(currentLanguage);
        setTranslations(loadedTranslations);
        setIsFullyLoaded(true);
        
        // Save language preference
        saveLanguagePreference(currentLanguage);
        
        // Set document language and direction
        document.documentElement.lang = currentLanguage;
        document.documentElement.dir = languages[currentLanguage]?.dir || 'ltr';
      } catch (error) {
        console.error(`Failed to load translations for ${currentLanguage}:`, error);
        setError(`Failed to load translations for ${languages[currentLanguage]?.name || currentLanguage}. Using English instead.`);
        
        // Fallback to English if translations fail to load
        if (currentLanguage !== 'en') {
          try {
            const enTranslations = await translationService.getTranslations('en');
            setTranslations(enTranslations);
          } catch (fallbackError) {
            console.error('Failed to load even English translations:', fallbackError);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [currentLanguage]);

  // Change language function with persistence
  const changeLanguage = (langCode) => {
    if (languages[langCode]) {
      // Set the new language
      setCurrentLanguage(langCode);
      
      // Save preference to localStorage
      saveLanguagePreference(langCode);
    } else {
      console.error(`Language code "${langCode}" is not supported.`);
    }
  };

  // Translate function 
  const t = (key, params = {}) => {
    if (!translations || isLoading) return key; // Return key if translations not yet loaded
    
    const keys = key.split('.');
    let translation = translations;
    
    // Navigate through nested objects
    for (const k of keys) {
      translation = translation?.[k];
      if (!translation) return key; // Return key if translation not found
    }
    
    // Replace parameters if any
    if (typeof translation === 'string' && Object.keys(params).length) {
      return Object.entries(params).reduce(
        (str, [paramKey, paramValue]) => str.replace(`{{${paramKey}}}`, paramValue),
        translation
      );
    }
    
    return translation || key;
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        currentLanguage, 
        languages, 
        changeLanguage, 
        t,
        isLoading,
        isFullyLoaded,
        error
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;