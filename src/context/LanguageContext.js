// src/context/LanguageContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

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
  fil: { 
    code: 'fil', 
    name: 'Filipino', 
    nativeName: 'Filipino',
    dir: 'ltr'
  }
};

// Provider component
export const LanguageProvider = ({ children }) => {
  // Get stored language preference or default to browser language or English
  const getBrowserLanguage = () => {
    const browserLang = navigator.language.split('-')[0];
    return languages[browserLang] ? browserLang : 'en';
  };

  const getInitialLanguage = () => {
    const storedLanguage = localStorage.getItem('preferredLanguage');
    return storedLanguage || getBrowserLanguage();
  };

  const [currentLanguage, setCurrentLanguage] = useState(getInitialLanguage());
  const [translations, setTranslations] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Load translations for the current language
  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      try {
        // Dynamic import for the translations
        const translationModule = await import(`../translations/${currentLanguage}.js`);
        setTranslations(translationModule.default);
        
        // Save language preference
        localStorage.setItem('preferredLanguage', currentLanguage);
        
        // Set document language and direction
        document.documentElement.lang = currentLanguage;
        document.documentElement.dir = languages[currentLanguage].dir;
        
      } catch (error) {
        console.error(`Failed to load translations for ${currentLanguage}:`, error);
        // Fallback to English if translations fail to load
        if (currentLanguage !== 'en') {
          const enModule = await import('../translations/en.js');
          setTranslations(enModule.default);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [currentLanguage]);

  // Change language function
  const changeLanguage = (langCode) => {
    if (languages[langCode]) {
      setCurrentLanguage(langCode);
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
        isLoading
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