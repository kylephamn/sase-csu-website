import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function Meetings() {
  const { t } = useLanguage();

  return (
    <div className="meetings-page">
      <div className="hero">
        <div className="content">
          <h1>{t('meetings.hero.title')}</h1>
          <p>{t('meetings.hero.description')}</p>
        </div>
      </div>
      
      <div className="section">
        <h2 className="section-title">{t('meetings.regular.title')}</h2>
        <p>{t('meetings.regular.paragraph1')}</p>
        <p>{t('meetings.regular.paragraph2')}</p>
      </div>
      
      <div className="section">
        <h2 className="section-title">{t('meetings.schedule.title')}</h2>
        <div className="schedule">
          <div className="schedule-item">
            <div className="date">April 24</div>
            <div className="content">
              <h3>Executive Board</h3>
              <p>Learn how to craft a compelling resume that highlights your skills and experiences.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="section">
        <h2 className="section-title">{t('meetings.mailingList.title')}</h2>
        <p>{t('meetings.mailingList.description')}</p>
        <Link to="/contact" className="btn">{t('meetings.mailingList.cta')}</Link>
      </div>
    </div>
  );
}

export default Meetings;