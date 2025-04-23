import React from 'react';

function Meetings() {
  return (
    <div className="meetings-page">
      <div className="hero">
        <div className="content">
          <h1>Meeting Schedule</h1>
          <p>Join us for our weekly meetings and special events</p>
        </div>
      </div>
      
      <div className="section">
        <h2 className="section-title">Regular Meetings</h2>
        <p>Our general body meetings are held every Thursday from 6:00 PM to 7:00 PM in the Lory Student Center, Room 333.</p>
        <p>All students are welcome to attend, whether you're a member or just interested in learning more about SASE.</p>
      </div>
      
      <div className="section">
        <h2 className="section-title">Spring 2025 Schedule</h2>
        <div className="schedule">
          <div className="schedule-item">
            <div className="date">April 24</div>
            <div className="content">
              <h3>Executive Board </h3>
              <p>Learn how to craft a compelling resume that highlights your skills and experiences.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="section">
        <h2 className="section-title">Join Our Mailing List</h2>
        <p>Want to stay updated on our meetings and events? Join our mailing list to receive weekly newsletters and reminders.</p>
        <a href="/#/contact" className="btn">Subscribe</a>
      </div>
    </div>
  );
}

export default Meetings;