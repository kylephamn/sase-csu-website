// src/components/LanguageLoadingIndicator.js
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageLoadingIndicator = () => {
  const { isLoading, isFullyLoaded, error, currentLanguage, languages } = useLanguage();
  
  // Don't show anything if everything is fully loaded and no errors
  if ((!isLoading && isFullyLoaded) && !error) return null;
  
  // Get current language display name
  const langName = languages[currentLanguage]?.name || currentLanguage;
  
  return (
    <div className="language-loading-indicator">
      {isLoading && (
        <div className="loading-indicator">
          <div className="loading-spinner"></div>
          <span>Loading {langName} translations...</span>
        </div>
      )}
      
      {!isLoading && !isFullyLoaded && !error && (
        <div className="loading-progress">
          <span>Loading complete translations...</span>
        </div>
      )}
      
      {error && (
        <div className="loading-error">
          <span>{error}</span>
        </div>
      )}
      
      <style jsx>{`
        .language-loading-indicator {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 9999;
          text-align: center;
          font-size: 0.8rem;
          padding: 5px;
        }
        
        .loading-indicator {
          background-color: var(--csu-gold);
          color: var(--csu-green);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: opacity 0.3s ease;
        }
        
        .loading-progress {
          background-color: #e8e8e8;
          color: #666;
          padding: 5px;
          font-size: 0.75rem;
        }
        
        .loading-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid var(--csu-green);
          border-radius: 50%;
          border-top-color: transparent;
          animation: spin 1s linear infinite;
        }
        
        .loading-error {
          background-color: #f8d7da;
          color: #721c24;
          padding: 5px;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LanguageLoadingIndicator;