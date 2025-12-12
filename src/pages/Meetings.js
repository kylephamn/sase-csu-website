import React from 'react';
import { Link } from 'react-router-dom';

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
        <p>Our general body meetings are held every other Monday from 6:00 PM to 7:00 PM in the Lory Student Center, Room 390.</p>
        <p>All students are welcome to attend, whether you're a member or just interested in learning more about SASE.</p>
      </div>

      <div className="section">
        <h2 className="section-title">Spring 2025 Schedule</h2>
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
        <h2 className="section-title">Join Our Mailing List</h2>
        <p>Want to stay updated on our meetings and events? Join our mailing list to receive weekly newsletters and reminders.</p>
        <Link to="/contact" className="btn">Subscribe</Link>
      </div>
    </div>
  );
}

export default Meetings;
