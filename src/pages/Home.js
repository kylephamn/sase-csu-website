import React from 'react';

function Home() {
  return (
    <div className="home-page">
      <div className="hero">
        <div className="content">
          <h1>Society of Asian Scientists and Engineers</h1>
          <h2>Colorado State University Chapter</h2>
          <p>Empowering Asian heritage scientists and engineers to achieve their full potential</p>
          <a href="/#/events" className="btn">Join Our Next Event</a>
        </div>
      </div>
      
      <div className="section">
        <h2 className="section-title">Welcome to SASE CSU!</h2>
        <p>We are dedicated to supporting students of Asian heritage in STEM fields at Colorado State University. Our mission is to provide opportunities for networking, professional development, and community building.</p>
        <p>Whether you're looking for academic support, career guidance, or simply a place to connect with peers who share similar experiences, SASE CSU is here for you.</p>
      </div>
      
      <div className="section">
        <h2 className="section-title">Upcoming Event</h2>
        <div className="event-card">
          <h3>Executive Board Election Night </h3>
          <p className="event-date">April 24, 2025 • 6:00 PM - 7:00 PM</p>
          <p className="event-location">Lory Student Center, Room 306</p>
          <p>Join us for our Executive Board Election Night, where you'll have the opportunity to vote for your 2025-2026 executive board.</p>
          <a href="/#/events" className="btn">Learn More</a>
        </div>
      </div>
      
      <div className="section">
        <h2 className="section-title">Get Involved</h2>
        <p>There are many ways to get involved with SASE CSU:</p>
        <ul className="involvement-list">
          <li>Attend our regular meetings every Thursday</li>
          <li>Participate in professional development workshops</li>
          <li>Volunteer for community outreach events</li>
          <li>Apply for leadership positions</li>
        </ul>
        <a href="/#/contact" className="btn">Contact Us</a>
      </div>
    </div>
  );
}

export default Home;