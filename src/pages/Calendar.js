// src/pages/Calendar.js
import React from 'react';
import { Link } from 'react-router-dom';
import EventCalendar from '../components/EventCalendar';
import CalendarSubscription from '../components/CalendarSubscription';
import { useLanguage } from '../context/LanguageContext';

function CalendarPage() {
  const { t } = useLanguage();

  return (
    <div className="calendar-page">
      <div className="hero">
        <div className="content">
          <h1>{t('calendar.hero.title')}</h1>
          <p>{t('calendar.hero.description')}</p>
        </div>
      </div>
      
      <div className="section">
        <h2 className="section-title">{t('calendar.upcoming.title')}</h2>
        <p>{t('calendar.upcoming.description')}</p>
        
        <EventCalendar />
        
        <div className="calendar-info">
          <h3>{t('calendar.features.title')}</h3>
          <ul>
            <li>{t('calendar.features.items.view')}</li>
            <li>{t('calendar.features.items.filter')}</li>
            <li>{t('calendar.features.items.details')}</li>
            <li>{t('calendar.features.items.categories')}</li>
          </ul>
        </div>
      </div>
      
      <div className="section">
        <h2 className="section-title">{t('calendar.subscribe.title')}</h2>
        <p>{t('calendar.subscribe.description')}</p>
        
        <CalendarSubscription />
        
        <p className="subscription-note">{t('calendar.subscribe.note')}</p>
      </div>
      
      <div className="section">
        <h2 className="section-title">{t('calendar.suggest.title')}</h2>
        <p>{t('calendar.suggest.description')}</p>
        <Link to="/contact" className="btn">{t('calendar.suggest.cta')}</Link>
      </div>
    </div>
  );
}

export default CalendarPage;