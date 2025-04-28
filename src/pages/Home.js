import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function Home() {
  const { t } = useLanguage();
  
  return (
    <div className="home-page">
      <div className="hero">
        <div className="content">
          <h1>{t('home.hero.title')}</h1>
          <h2>{t('home.hero.subtitle')}</h2>
          <p>{t('home.hero.description')}</p>
          <Link to="/events" className="btn">{t('home.hero.cta')}</Link>
        </div>
      </div>
      
      <div className="section">
        <h2 className="section-title">{t('home.welcome.title')}</h2>
        <p>{t('home.welcome.paragraph1')}</p>
        <p>{t('home.welcome.paragraph2')}</p>
      </div>
      
      <div className="section">
        <h2 className="section-title">{t('home.upcomingEvent.title')}</h2>
        <div className="event-card">
          <h3>Executive Board Election Night </h3>
          <p className="event-date">April 24, 2025 • 6:00 PM - 7:00 PM</p>
          <p className="event-location">Lory Student Center, Room 306</p>
          <p>Join us for our Executive Board Election Night, where you'll have the opportunity to vote for your 2025-2026 executive board.</p>
          <Link to="/events" className="btn">{t('home.upcomingEvent.learnMore')}</Link>
        </div>
      </div>
      
      <div className="section">
        <h2 className="section-title">{t('home.getInvolved.title')}</h2>
        <p>{t('home.getInvolved.description')}</p>
        <ul className="involvement-list">
          <li>{t('home.getInvolved.ways.meetings')}</li>
          <li>{t('home.getInvolved.ways.workshops')}</li>
          <li>{t('home.getInvolved.ways.volunteer')}</li>
          <li>{t('home.getInvolved.ways.leadership')}</li>
        </ul>
        <Link to="/contact" className="btn">{t('home.getInvolved.cta')}</Link>
      </div>
    </div>
  );
}

export default Home;