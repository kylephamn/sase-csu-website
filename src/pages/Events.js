import React from 'react';
import CountdownTimer from '../components/CountdownTimer';

function Events() {
  // Target date for the event (April 24, 2025 at 6:00 PM)
  const eventDate = new Date('2025-11-04T18:00:00');

  return (
    <div className="events-page">
      <div className="hero">
        <div className="content">
          <h1>Next Event</h1>
          <p>Don't miss our upcoming event!</p>
        </div>
      </div>

      <div className="section featured-event">
        <h2 className="section-title">SASE Valentine's Card Making</h2>
        <div className="event-details">
          <div className="event-info">
            <p><strong>Date:</strong> February 10, 2026</p>
            <p><strong>Time:</strong> 5:00 PM - 6:00 PM</p>
            <p><strong>Location:</strong> LSC Room 322</p>

            {/* Dynamic countdown component */}
            <CountdownTimer targetDate={eventDate} />
          </div>
          <div className="event-description">
            <h3>About the Event</h3>
            <p>Celebrate Valentine's Day with SASE! Make cards and compete in Valentine's-themed jeopardy. Chocolates and Valentine's candies will be provided.</p>

            <h3>What to Bring</h3>
            <ul className="involvement-list">
              <li>You!</li>
              <li>Valentine's Candy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;
