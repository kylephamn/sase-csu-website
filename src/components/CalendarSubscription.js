// src/components/CalendarSubscription.js
import React, { useState, useEffect } from 'react';
import { generateICS, downloadICS } from '../utils/calendarUtils';

const CalendarSubscription = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [icsGenerated, setIcsGenerated] = useState(false);
  
  // Fetch events from JSON file
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    fetch('/data/events.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setEvents(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        setError(`Failed to load events: ${error.message}`);
        setIsLoading(false);
      });
  }, []);
  
  // Handle Google Calendar subscription
  const handleGoogleCalendar = () => {
    if (events.length === 0) {
      alert('No events available to add to calendar');
      return;
    }
    
    // Generate and download ICS file
    const icsContent = generateICS(events);
    downloadICS('sase-csu-events.ics', icsContent);
    
    // Open Google Calendar import page in a new tab
    window.open('https://calendar.google.com/calendar/u/0/r/settings/export', '_blank');
    
    // Show instructions
    setIcsGenerated(true);
  };
  
  // Handle Apple Calendar subscription
  const handleAppleCalendar = () => {
    if (events.length === 0) {
      alert('No events available to add to calendar');
      return;
    }
    
    // Generate and download ICS file
    const icsContent = generateICS(events);
    downloadICS('sase-csu-events.ics', icsContent);
    
    // Show instructions
    setIcsGenerated(true);
  };
  
  // Handle Outlook Calendar subscription
  const handleOutlookCalendar = () => {
    if (events.length === 0) {
      alert('No events available to add to calendar');
      return;
    }
    
    // Generate and download ICS file
    const icsContent = generateICS(events);
    downloadICS('sase-csu-events.ics', icsContent);
    
    // Open Outlook Calendar in a new tab
    window.open('https://outlook.office.com/calendar/view/month', '_blank');
    
    // Show instructions
    setIcsGenerated(true);
  };
  
  // If events are still loading, show loading indicator
  if (isLoading) {
    return (
      <div className="calendar-subscription-loading">
        <div className="loading-spinner"></div>
        <p>Loading events...</p>
      </div>
    );
  }
  
  // If there was an error loading events, show error message
  if (error) {
    return (
      <div className="calendar-subscription-error">
        <p>{error}</p>
        <button className="btn" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }
  
  return (
    <div className="calendar-subscription">
      <div className="subscription-actions">
        <button onClick={handleGoogleCalendar} className="btn">
          Add to Google Calendar
        </button>
        <button onClick={handleAppleCalendar} className="btn">
          Add to Apple Calendar
        </button>
        <button onClick={handleOutlookCalendar} className="btn">
          Add to Outlook
        </button>
      </div>
      
      {icsGenerated && (
        <div className="subscription-instructions">
          <h4>Instructions:</h4>
          <ol>
            <li>The calendar file (ICS) has been downloaded to your device</li>
            <li>Open your calendar application (Google Calendar, Apple Calendar, or Outlook)</li>
            <li>Import the downloaded file (look for "Import" or "Add Calendar" option)</li>
            <li>Follow your calendar application's instructions to complete the import</li>
          </ol>
          <p>Once imported, all SASE CSU events will appear in your calendar!</p>
        </div>
      )}
    </div>
  );
};

export default CalendarSubscription;