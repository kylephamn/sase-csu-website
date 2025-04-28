import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Import all translations
import './translations/en';
import './translations/zh';
import './translations/ja';
import './translations/ko';
import './translations/hi';
import './translations/vi';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);