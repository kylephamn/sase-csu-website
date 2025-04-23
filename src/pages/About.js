import React from 'react';

function About() {
  return (
    <div className="about-page">
      <div className="hero">
        <div className="content">
          <h1>About Us</h1>
          <p>Learn about our mission, history, and the impact we're making at CSU</p>
        </div>
      </div>
      
      <div className="section">
        <h2 className="section-title">Our Mission</h2>
        <p>The Society of Asian Scientists and Engineers (SASE) at Colorado State University is dedicated to:</p>
        <ul className="involvement-list">
          <li>Preparing Asian heritage scientists and engineers for success</li>
          <li>Celebrating diversity on campus</li>
          <li>Providing resources for academic & professional development</li>
          <li>Building a supportive community network</li>
        </ul>
      </div>
      
      <div className="section">
        <h2 className="section-title">Our History</h2>
        <p>SASE CSU was founded in 2018 by a group of passionate students who recognized the need for representation and support for Asian Americans in STEM fields at Colorado State University. Since then, we have grown into a vibrant community that hosts regular events, workshops, and networking opportunities.</p>
        <p>Our chapter is part of the national SASE organization, which was established in 2007 and now has over 80 collegiate chapters across the United States.</p>
      </div>
      
      <div className="section">
        <h2 className="section-title">What We Do</h2>
        <div className="activities-grid">
          <div className="activity-card">
            <h3>Weekly Meetings</h3>
            <p>General body meetings featuring guest speakers, workshops, and social activities</p>
          </div>
          <div className="activity-card">
            <h3>Professional Development</h3>
            <p>Resume building, interview prep, and networking opportunities</p>
          </div>
          <div className="activity-card">
            <h3>Industry Connections</h3>
            <p>Company tours, networking events, and career fairs</p>
          </div>
          <div className="activity-card">
            <h3>Cultural Celebrations</h3>
            <p>Events that celebrate Asian cultures and foster cross-cultural understanding</p>
          </div>
          <div className="activity-card">
            <h3>Community Service</h3>
            <p>Volunteer opportunities that give back to the Fort Collins community</p>
          </div>
          <div className="activity-card">
            <h3>Conferences</h3>
            <p>Participation in regional and national SASE conferences</p>
          </div>
        </div>
      </div>
      
      <div className="section">
        <h2 className="section-title">Join Us</h2>
        <p>SASE CSU is open to all students at Colorado State University, regardless of major or background. We welcome anyone who is interested in learning about Asian cultures, supporting diversity in STEM, or simply looking for a community of like-minded individuals.</p>
        <p>To join, simply attend one of our general body meetings or reach out to us through our contact page.</p>
        <div className="cta-buttons">
          <a href="/#/meetings" className="btn">View Meeting Schedule</a>
          <a href="/#/contact" className="btn">Get in Touch</a>
        </div>
      </div>
    </div>
  );
}

export default About;