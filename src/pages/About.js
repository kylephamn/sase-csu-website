import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function About() {
  const { t } = useLanguage();

  return (
    <div className="about-page">
      <div className="hero">
        <div className="content">
          <h1>{t('about.hero.title')}</h1>
          <p>{t('about.hero.description')}</p>
        </div>
      </div>
      
      <div className="section">
        <h2 className="section-title">{t('about.mission.title')}</h2>
        <p>{t('about.mission.description')}</p>
        <ul className="involvement-list">
          <li>{t('about.mission.items.success')}</li>
          <li>{t('about.mission.items.diversity')}</li>
          <li>{t('about.mission.items.resources')}</li>
          <li>{t('about.mission.items.community')}</li>
        </ul>
      </div>
      
      <div className="section">
        <h2 className="section-title">{t('about.history.title')}</h2>
        <p>{t('about.history.paragraph1')}</p>
        <p>{t('about.history.paragraph2')}</p>
      </div>
      
      <div className="section">
        <h2 className="section-title">{t('about.whatWeDo.title')}</h2>
        <div className="activities-grid">
          <div className="activity-card">
            <h3>{t('about.whatWeDo.activities.meetings.title')}</h3>
            <p>{t('about.whatWeDo.activities.meetings.description')}</p>
          </div>
          <div className="activity-card">
            <h3>{t('about.whatWeDo.activities.professional.title')}</h3>
            <p>{t('about.whatWeDo.activities.professional.description')}</p>
          </div>
          <div className="activity-card">
            <h3>{t('about.whatWeDo.activities.industry.title')}</h3>
            <p>{t('about.whatWeDo.activities.industry.description')}</p>
          </div>
          <div className="activity-card">
            <h3>{t('about.whatWeDo.activities.cultural.title')}</h3>
            <p>{t('about.whatWeDo.activities.cultural.description')}</p>
          </div>
          <div className="activity-card">
            <h3>{t('about.whatWeDo.activities.service.title')}</h3>
            <p>{t('about.whatWeDo.activities.service.description')}</p>
          </div>
          <div className="activity-card">
            <h3>{t('about.whatWeDo.activities.conferences.title')}</h3>
            <p>{t('about.whatWeDo.activities.conferences.description')}</p>
          </div>
        </div>
      </div>
      
      <div className="section">
        <h2 className="section-title">{t('about.join.title')}</h2>
        <p>{t('about.join.paragraph1')}</p>
        <p>{t('about.join.paragraph2')}</p>
        <div className="cta-buttons">
          <Link to="/meetings" className="btn">{t('about.join.meetings')}</Link>
          <Link to="/contact" className="btn">{t('about.join.contact')}</Link>
        </div>
      </div>
    </div>
  );
}

export default About;