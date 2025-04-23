import React from 'react';

function Events() {
  return (
    <div className="events-page">
      <div className="hero">
        <div className="content">
          <h1>Next Event</h1>
          <p>Don't miss our upcoming industry networking night</p>
        </div>
      </div>
      
      <div className="section featured-event">
        <h2 className="section-title">Executive Board Election Night</h2>
        <div className="event-details">
          <div className="event-info">
            <p><strong>Date:</strong> April 24, 2025</p>
            <p><strong>Time:</strong> 6:00 PM - 7:00 PM</p>
            <p><strong>Location:</strong> Lory Student Center, Room 306</p>
            <div className="countdown-timer">
              <p className="countdown-label">Event starts in:</p>
              <div className="countdown-time">1 day</div>
            </div>
          </div>
          <div className="event-description">
            <h3>About the Event</h3>
            <p>Join us for our Executive Board Election Night, where you'll have the opportunity to vote for your 2025-2026 executive board.</p>
            
            {/* <h3>Featured Companies</h3>
            <div className="company-logos">
              <div className="company-logo">Google</div>
              <div className="company-logo">Lockheed Martin</div>
              <div className="company-logo">Medtronic</div>
              <div className="company-logo">HP Inc.</div>
              <div className="company-logo">Woodward Inc.</div>
            </div> */}
            
            <h3>What to Bring</h3>
            <ul className="involvement-list">
              <li>Your phone</li>
              <li>Critical Thinking Caps</li>
              <li>Hunger for quality executive members</li>
              {/* <li>Professional attire recommended</li> */}
            </ul>
            
            {/* <h3>RSVP</h3> */}
            {/* <p>Please RSVP by April 28th to help us prepare adequately for the event.</p>
            <a href="/#/contact" className="btn">RSVP Now</a> */}
          </div>
        </div>
      </div>
      
      {/* <div className="section">
        <h2 className="section-title">Upcoming Events</h2>
        <div className="events-list">
          <div className="event-card">
            <h3>Study Night</h3>
            <p className="event-date">April 23, 2025 • 6:00 PM - 9:00 PM</p>
            <p className="event-location">Engineering Building, Room E104</p>
            <p>Join us for a collaborative study session before finals. Refreshments will be provided.</p>
          </div>
          
          <div className="event-card">
            <h3>Industry Networking Night</h3>
            <p className="event-date">April 30, 2025 • 6:00 PM - 8:00 PM</p>
            <p className="event-location">Engineering Building, Room E204</p>
            <p>Connect with industry professionals and learn about internship and job opportunities in various STEM fields.</p>
          </div>
          
          <div className="event-card">
            <h3>End of Year Celebration</h3>
            <p className="event-date">May 7, 2025 • 6:00 PM - 9:00 PM</p>
            <p className="event-location">Student Center, Ballroom A</p>
            <p>Join us as we celebrate our achievements and recognize our graduating members. Dinner will be provided.</p>
          </div>
          
          <div className="event-card">
            <h3>SASE National Conference</h3>
            <p className="event-date">October 10-12, 2025</p>
            <p className="event-location">Dallas, TX</p>
            <p>The annual SASE National Conference brings together students and professionals from across the country for workshops, networking, and career opportunities.</p>
          </div>
        </div>
      </div>
      
      <div className="section">
        <h2 className="section-title">Past Events</h2>
        <div className="events-list">
          <div className="event-card past-event">
            <h3>Resume Workshop</h3>
            <p className="event-date">April 9, 2025</p>
            <p>Students learned how to craft compelling resumes that highlight their skills and experiences.</p>
          </div>
          
          <div className="event-card past-event">
            <h3>Guest Speaker: Dr. Jennifer Liu</h3>
            <p className="event-date">April 16, 2025</p>
            <p>Dr. Liu from NASA discussed her career journey and current research projects in aerospace engineering.</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Events;