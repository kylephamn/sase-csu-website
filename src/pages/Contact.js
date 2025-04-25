// Contact.js with EmailJS integration and environment variables
import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';

function Contact() {
  // Initialize EmailJS once when component mounts
  useEffect(() => {
    // Initialize EmailJS with User ID from environment variable
    emailjs.init(process.env.REACT_APP_EMAILJS_USER_ID);
  }, []);

  // State for contact form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // State for subscribe form
  const [subscribeEmail, setSubscribeEmail] = useState('');
  
  // State for form submission status
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    isError: false,
    message: ''
  });
  
  // State for subscription status
  const [subscribeStatus, setSubscribeStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    isError: false,
    message: ''
  });

  // Handle contact form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle contact form submission
  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ ...formStatus, isSubmitting: true });

    // Get IDs from environment variables
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_CONTACT_TEMPLATE_ID;

    // Prepare template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message
    };

    // Send email using EmailJS
    emailjs.send(serviceId, templateId, templateParams)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setFormStatus({
          isSubmitting: false,
          isSubmitted: true,
          isError: false,
          message: 'Your message has been sent successfully!'
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      })
      .catch((error) => {
        console.error('FAILED...', error);
        setFormStatus({
          isSubmitting: false,
          isSubmitted: true,
          isError: true,
          message: 'Failed to send message. Please try again later.'
        });
      });
  };

  // Handle subscription form submission
  const handleSubscribeSubmit = (e) => {
    e.preventDefault();
    setSubscribeStatus({ ...subscribeStatus, isSubmitting: true });

    // Get IDs from environment variables
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_SUBSCRIBE_TEMPLATE_ID;

    // Prepare template parameters
    const templateParams = {
      subscriber_email: subscribeEmail
    };

    // Send email using EmailJS
    emailjs.send(serviceId, templateId, templateParams)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setSubscribeStatus({
          isSubmitting: false,
          isSubmitted: true,
          isError: false,
          message: 'You have been successfully subscribed to our newsletter!'
        });
        // Reset form
        setSubscribeEmail('');
      })
      .catch((error) => {
        console.error('FAILED...', error);
        setSubscribeStatus({
          isSubmitting: false,
          isSubmitted: true,
          isError: true,
          message: 'Failed to subscribe. Please try again later.'
        });
      });
  };

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

          <a href="discord.gg/yBpQT9XQQQ" target="_blank" rel="noopener noreferrer" className="social-link">
          <i class="fa-brands fa-discord"></i> Discord
          </a>
        </div>
      </div>
      
      <div className="section">
        <h2 className="section-title">Get In Touch</h2>
        
        <div className="forms-container">
          <div className="contact-form-container">
            <h3>Contact Form</h3>
            {formStatus.isSubmitted && !formStatus.isError ? (
              <div className="form-success">
                <p>{formStatus.message}</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="btn" 
                  disabled={formStatus.isSubmitting}
                >
                  {formStatus.isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                
                {formStatus.isSubmitted && formStatus.isError && (
                  <div className="form-error">
                    <p>{formStatus.message}</p>
                  </div>
                )}
              </form>
            )}
          </div>
          
          <div className="subscribe-form-container">
            <h3>Join Our Mailing List</h3>
            <p>Stay updated on our events, meetings, and opportunities by subscribing to our weekly newsletter.</p>
            
            {subscribeStatus.isSubmitted && !subscribeStatus.isError ? (
              <div className="form-success">
                <p>{subscribeStatus.message}</p>
              </div>
            ) : (
              <form className="subscribe-form" onSubmit={handleSubscribeSubmit}>
                <div className="form-group">
                  <label htmlFor="subscribe-email">Email</label>
                  <input 
                    type="email" 
                    id="subscribe-email" 
                    name="email" 
                    value={subscribeEmail}
                    onChange={(e) => setSubscribeEmail(e.target.value)}
                    required 
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn"
                  disabled={subscribeStatus.isSubmitting}
                >
                  {subscribeStatus.isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
                
                {subscribeStatus.isSubmitted && subscribeStatus.isError && (
                  <div className="form-error">
                    <p>{subscribeStatus.message}</p>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;