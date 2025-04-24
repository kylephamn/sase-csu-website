// src/pages/Calendar.js
import React from 'react';
import EventCalendar from '../components/EventCalendar';
import CalendarSubscription from '../components/CalendarSubscription';

function CalendarPage() {
  return (
    <div className="calendar-page">
      <div className="hero">
        <div className="content">
          <h1>Event Calendar</h1>
          <p>Stay up to date with all our upcoming events and activities</p>
        </div>
      </div>
      
      <div className="section">
        <h2 className="section-title">Upcoming Events</h2>
        <p>Browse our calendar to see all upcoming meetings, workshops, social events, and more. Click on an event for more details and to add it to your personal calendar.</p>
        
        <EventCalendar />
        
        <div className="calendar-info">
          <h3>Calendar Features</h3>
          <ul>
            <li>View events by month, week, day, or as an agenda list</li>
            <li>Filter events by category to find what interests you</li>
            <li>Click on any event to see details and add it to your personal calendar</li>
            <li>Color-coded categories make it easy to identify event types</li>
          </ul>
        </div>
      </div>
      
      <div className="section">
        <h2 className="section-title">Subscribe to Our Calendar</h2>
        <p>Never miss an event! You can subscribe to our entire calendar using the options below. This will add all current and future SASE CSU events to your personal calendar.</p>
        
        <CalendarSubscription />
        
        <p className="subscription-note">By subscribing, you'll automatically receive updates when events are added or changed.</p>
      </div>
      
      <div className="section">
        <h2 className="section-title">Suggest an Event</h2>
        <p>Have an idea for an event? We welcome suggestions from all members!</p>
        <a href="/#/contact" className="btn">Contact Us With Your Ideas</a>
      </div>
    </div>
  );
}

export default CalendarPage;