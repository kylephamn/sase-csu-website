// src/components/EventCalendar.js
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Set up the localizer for the calendar
const localizer = momentLocalizer(moment);

const EventCalendar = () => {
  // State variables
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date()); // Add state for the current date
  const [filteredCategory, setFilteredCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
        // Convert string dates to Date objects
        const eventsWithDates = data.map(event => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end)
        }));
        setEvents(eventsWithDates);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        setError(`Failed to load events: ${error.message}`);
        setIsLoading(false);
      });
  }, []);
  
  // Filter events by category
  const filteredEvents = filteredCategory === 'all' 
    ? events 
    : events.filter(event => event.category === filteredCategory);
  
  // Custom event styles based on category
  const eventStyleGetter = (event) => {
    let backgroundColor = '';
    
    switch(event.category) {
      case 'academic':
        backgroundColor = '#3788d8'; // Blue
        break;
      case 'professional':
        backgroundColor = '#1E4D2B'; // CSU Green
        break;
      case 'social':
        backgroundColor = '#9c27b0'; // Purple
        break;
      case 'leadership':
        backgroundColor = '#C8C372'; // CSU Gold
        break;
      case 'community':
        backgroundColor = '#ff9800'; // Orange
        break;
      default:
        backgroundColor = '#1E4D2B'; // Default to CSU Green
    }
    
    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.9,
        color: 'white',
        border: '0px',
        padding: '2px 5px'
      }
    };
  };
  
  // Handle event selection
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };
  
  // Close the event details modal
  const closeModal = () => {
    setSelectedEvent(null);
  };
  
  // Add event to user's calendar
  const addToCalendar = (event) => {
    // Format the date for Google Calendar
    const startTime = moment(event.start).format('YYYYMMDDTHHmmss');
    const endTime = moment(event.end).format('YYYYMMDDTHHmmss');
    
    // Create Google Calendar URL
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    // Open in a new tab
    window.open(googleCalendarUrl, '_blank');
  };
  
  // Handle navigation - NEW FUNCTIONS
  const handleNavigate = (newDate) => {
    setDate(newDate);
  };
  
  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'academic', name: 'Academic' },
    { id: 'professional', name: 'Professional' },
    { id: 'social', name: 'Social' },
    { id: 'leadership', name: 'Leadership' },
    { id: 'community', name: 'Community Service' }
  ];

  // Show loading state
  if (isLoading) {
    return (
      <div className="calendar-loading">
        <div className="loading-spinner"></div>
        <p>Loading events...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="calendar-error">
        <h3>Error Loading Calendar</h3>
        <p>{error}</p>
        <button className="btn" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="event-calendar-container">
      <div className="calendar-controls">
        <div className="view-selector">
          <button 
            className={`view-btn ${view === 'month' ? 'active' : ''}`}
            onClick={() => setView('month')}
          >
            Month
          </button>
          <button 
            className={`view-btn ${view === 'week' ? 'active' : ''}`}
            onClick={() => setView('week')}
          >
            Week
          </button>
          <button 
            className={`view-btn ${view === 'day' ? 'active' : ''}`}
            onClick={() => setView('day')}
          >
            Day
          </button>
          <button 
            className={`view-btn ${view === 'agenda' ? 'active' : ''}`}
            onClick={() => setView('agenda')}
          >
            Agenda
          </button>
        </div>
        
        <div className="category-filter">
          <label htmlFor="category-select">Filter by Category:</label>
          <select 
            id="category-select"
            value={filteredCategory}
            onChange={(e) => setFilteredCategory(e.target.value)}
            className="category-select"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="calendar-wrapper">
        <Calendar
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleSelectEvent}
          view={view}
          onView={setView}
          date={date} // Add current date prop
          onNavigate={handleNavigate} // Add navigation handler
          views={['month', 'week', 'day', 'agenda']}
        />
      </div>
      
      {selectedEvent && (
        <div className="event-modal-overlay" onClick={closeModal}>
          <div className="event-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>×</button>
            <h2>{selectedEvent.title}</h2>
            
            {selectedEvent.featuredImage && (
              <div className="event-image">
                <img 
                  src={selectedEvent.featuredImage} 
                  alt={selectedEvent.title}
                  onError={(e) => {
                    console.error(`Failed to load image: ${selectedEvent.featuredImage}`);
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
            
            <p className="event-date">
              {moment(selectedEvent.start).format('MMMM D, YYYY')} • {moment(selectedEvent.start).format('h:mm A')} - {moment(selectedEvent.end).format('h:mm A')}
            </p>
            
            <p className="event-location">
              <strong>Location:</strong> {selectedEvent.location}
            </p>
            
            {selectedEvent.organizer && (
              <p className="event-organizer">
                <strong>Organized by:</strong> {selectedEvent.organizer}
              </p>
            )}
            
            <div className="event-description">
              <h3>About This Event</h3>
              <p>{selectedEvent.description}</p>
            </div>
            
            {selectedEvent.isRecurring && (
              <p className="event-recurring">
                <strong>Recurring Event:</strong> {selectedEvent.recurrencePattern}
              </p>
            )}
            
            {selectedEvent.tags && selectedEvent.tags.length > 0 && (
              <div className="event-tags">
                {selectedEvent.tags.map((tag, index) => (
                  <span key={index} className="event-tag">#{tag}</span>
                ))}
              </div>
            )}
            
            <div className="event-actions">
              {selectedEvent.rsvpRequired && (
                <a 
                  href={selectedEvent.rsvpUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="rsvp-btn"
                >
                  RSVP for This Event
                </a>
              )}
              
              <button 
                className="add-to-calendar-btn"
                onClick={() => addToCalendar(selectedEvent)}
              >
                Add to My Calendar
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="calendar-legend">
        <h4>Event Categories</h4>
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#3788d8' }}></span>
            <span className="legend-label">Academic</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#1E4D2B' }}></span>
            <span className="legend-label">Professional</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#9c27b0' }}></span>
            <span className="legend-label">Social</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#C8C372' }}></span>
            <span className="legend-label">Leadership</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#ff9800' }}></span>
            <span className="legend-label">Community Service</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;