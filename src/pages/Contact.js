import React from 'react';

function Contact() {
  return (
    <div className="contact-page">
      <div className="hero">
        <div className="content">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you</p>
        </div>
      </div>
      
      <div className="section">
        <h2 className="section-title">Get in Touch</h2>
        <p>Have questions about SASE CSU? Want to join our organization or partner with us? We'd love to hear from you!</p>
        
        <div className="contact-info">
          <div className="contact-method">
            <h3>Email</h3>
            <p><a href="mailto:sase.csu@gmail.com">sase.csu@gmail.com</a></p>
          </div>
          
          <div className="contact-method">
            <h3>Office</h3>
            <p>Lory Student Center, Room 333</p>
            <p>Office Hours: Thursdays, 6:00 PM - 7:00 PM</p>
          </div>
          
          <div className="contact-method">
            <h3>Mailing Address</h3>
            <p>Society of Asian Scientists and Engineers</p>
            <p>Colorado State University</p>
            <p>1201 Center Ave</p>
            <p>Fort Collins, CO 80521</p>
          </div>
        </div>
      </div>
      
      <div className="section">
        <h2 className="section-title">Connect With Us</h2>
        
        <div className="social-media">
          <a href="https://www.instagram.com/csu.sase?igsh=MWNkY29yN3ZzeTk3bA==" target="_blank" rel="noopener noreferrer" className="social-link">
            <i className="fab fa-instagram"></i> csu.sase
          </a>

          <a href="https://groupme.com/join_group/63382533/ToeT4AEk" target="_blank" rel="noopener noreferrer" className="social-link">
            Groupme
          </a>
          
          {/* <a href="https://discord.gg/yBpQT9XQQQ" target="_blank" rel="noopener noreferrer" className="social-link">
            <i className="fab fa-discord"></i> SASE CSU Discord
          </a> */}
          
          {/* <a href="https://linkedin.com/company/sasecsu" target="_blank" rel="noopener noreferrer" className="social-link">
            <i className="fab fa-linkedin"></i> SASE CSU LinkedIn
          </a> */}
        </div>
      </div>
      
      <div className="section">
        <h2 className="section-title">Get In Touch</h2>
        
        <div className="forms-container">
          <div className="contact-form-container">
            <h3>Contact Form</h3>
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
              </div>
              
              <button type="submit" className="btn">Send Message</button>
            </form>
          </div>
          
          <div className="subscribe-form-container">
            <h3>Join Our Mailing List</h3>
            <p>Stay updated on our events, meetings, and opportunities by subscribing to our weekly newsletter.</p>
            <form className="subscribe-form">
              <div className="form-group">
                <label htmlFor="subscribe-email">Email</label>
                <input type="email" id="subscribe-email" name="email" required />
              </div>
              <button type="submit" className="btn">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;