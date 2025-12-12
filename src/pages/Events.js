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
        <h2 className="section-title">SASE Boba Night</h2>
        <div className="event-details">
          <div className="event-info">
            <p><strong>Date:</strong> November 4, 2025</p>
            <p><strong>Time:</strong> 6:00 PM - 7:00 PM</p>
            <p><strong>Location:</strong> Lory Student Center Room -> Ding Tea</p>

            {/* Dynamic countdown component */}
            <CountdownTimer targetDate={eventDate} />
          </div>
          <div className="event-description">
            <h3>About the Event</h3>
            <p>Join us for our Boba Night, where you'll get free boba and get to network with your executive board and peers!</p>

            <h3>What to Bring</h3>
            <ul className="involvement-list">
              <li>You!</li>
              <li>Boba Order</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;
