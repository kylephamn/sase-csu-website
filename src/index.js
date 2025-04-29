// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Explicitly import all available translations
import './translations/en';
import './translations/zh';
import './translations/ja';
import './translations/ko';
import './translations/hi';
import './translations/vi';
import './translations/ms';
import './translations/id';
// Add other available language imports here

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);