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
            <div className="date">November 4</div>
            <div className="content">
              <h3>SASE Boba Night</h3>
              <p>Join the SASE E-Board at Ding Tea for free boba and to socialize and network with us and your peers! </p>
            </div>
          </div>
          {/* SEPARATOR */}
          <div className="schedule-item">
            <div className="date">November 17</div>
            <div className="content">
              <h3>SASE Team Challenges</h3>
              <p>Join the SASE E-Board to compete against your peers in a variety of challenges. Winning team receives a prize! </p>
            </div>
          </div>
          {/* SEPARATOR */}
          <div className="schedule-item">
            <div className="date">December 1</div>
            <div className="content">
              <h3>SASE Hot Chocolate Studying</h3>
              <p>Join the SASE E-Board to have some hot chocolate and snacks as we prepare for finals! </p>
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