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
        <p>Our general body meetings are held every other Monday from 5:00 PM to 6:00 PM in the Lory Student Center, Room 390.</p>
        <p>All students are welcome to attend, whether you're a member or just interested in learning more about SASE.</p>
      </div>

      <div className="section">
        <h2 className="section-title">Spring 2026 Schedule</h2>
        <div className="schedule">
          <div className="schedule-item">
            <div className="date">January 27</div>
            <div className="content">
              <h3>Welcome Back Event</h3>
              <p>Join us to kick off the Spring 2026 semester! We'll reintroduce the e-board, introduce interns, and enjoy activities including a Super Smash Bros tournament, origami, board games, cards, and ice breaker games. Light snacks and candy provided!</p>
            </div>
          </div>

          {/* SEPARATOR */}
          <div className="schedule-item">
            <div className="date">February 10</div>
            <div className="content">
              <h3>Card Making / Valentine's Jeopardy</h3>
              <p>Celebrate Valentine's Day with SASE! Make cards and compete in Valentine's-themed jeopardy. Chocolates and Valentine's candies will be provided.</p>
            </div>
          </div>

          {/* SEPARATOR */}
          <div className="schedule-item">
            <div className="date">February 24</div>
            <div className="content">
              <h3>Professional Photoshoots</h3>
              <p>Get your professional headshots taken before the career fair! This is a great opportunity to update your LinkedIn profile and resume with a quality photo.</p>
            </div>
          </div>

          {/* SEPARATOR */}
          <div className="schedule-item">
            <div className="date">March 10</div>
            <div className="content">
              <h3>Spring into Action: Internship Prep</h3>
              <p>Learn tips to make you stand out in your internship search! We'll discuss how to track your progress and prepare for success in securing internships. (LSC Room 328-330)</p>
            </div>
          </div>

          {/* SEPARATOR */}
          <div className="schedule-item">
            <div className="date">March 24</div>
            <div className="content">
              <h3>Movie Night</h3>
              <p>Relax with SASE at our movie night! Pizza will be provided. Come unwind with your peers! (LSC Room 376-378)</p>
            </div>
          </div>

          {/* SEPARATOR */}
          <div className="schedule-item">
            <div className="date">April 7</div>
            <div className="content">
              <h3>Myth Busters: Mental Health Centered</h3>
              <p>Join us for an important discussion on mental health topics including minority myths, navigating burnout, working in cross-functional teams, and seeking help in professional settings. (LSC Room 376-378)</p>
            </div>
          </div>

          {/* SEPARATOR */}
          <div className="schedule-item">
            <div className="date">April 21</div>
            <div className="content">
              <h3>Study and Chill</h3>
              <p>Prepare for finals with SASE! Choose between watching a movie or studying with peers. Pizza will be provided to fuel your study session.</p>
            </div>
          </div>

          {/* SEPARATOR */}
          <div className="schedule-item">
            <div className="date">April 28</div>
            <div className="content">
              <h3>SASE Senior Recognition Dinner</h3>
              <p>Join us to celebrate our graduating seniors! This special dinner will include a plated meal, senior recognition ceremony with stoles and cords, senior speeches, and photo opportunities. (LSC Ballroom D, 5:00-7:00 PM)</p>
            </div>
          </div>

          {/* SEPARATOR */}
          <div className="schedule-item">
            <div className="date">May 5</div>
            <div className="content">
              <h3>Boba Night</h3>
              <p>End the semester with SASE at our Boba Night! Enjoy boba and celebrate a successful Spring 2026 semester with your peers.</p>
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