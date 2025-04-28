import React from 'react';
import CountdownTimer from '../components/CountdownTimer';
import { useLanguage } from '../context/LanguageContext';

function Events() {
  const { t } = useLanguage();
  
  // Target date for the event (April 24, 2025 at 6:00 PM)
  const eventDate = new Date('2025-04-24T18:00:00');

  return (
    <div className="events-page">
      <div className="hero">
        <div className="content">
          <h1>{t('events.hero.title')}</h1>
          <p>{t('events.hero.description')}</p>
        </div>
      </div>
      
      <div className="section featured-event">
        <h2 className="section-title">Executive Board Election Night</h2>
        <div className="event-details">
          <div className="event-info">
            <p><strong>{t('common.date')}:</strong> April 24, 2025</p>
            <p><strong>{t('common.time')}:</strong> 6:00 PM - 7:00 PM</p>
            <p><strong>{t('common.location')}:</strong> Lory Student Center Room 306</p>
            
            {/* Dynamic countdown component */}
            <CountdownTimer targetDate={eventDate} />
          </div>
          <div className="event-description">
            <h3>{t('events.about')}</h3>
            <p>Join us for our Executive Board Election Night, where you'll have the opportunity to vote for your 2025-2026 executive board.</p>
            
            <h3>{t('events.whatToBring')}</h3>
            <ul className="involvement-list">
              <li>Your phone</li>
              <li>Critical Thinking Caps</li>
              <li>Hunger for quality executive members</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;