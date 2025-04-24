// src/utils/calendarUtils.js
/**
 * Utility functions for calendar subscription and export
 */

/**
 * Generate an iCalendar (ICS) file from events
 * @param {Array} events - Array of event objects
 * @returns {string} - ICS file content as string
 */
export const generateICS = (events) => {
    // Start the ICS file
    let icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//SASE CSU//Calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:SASE CSU Events',
      'X-WR-TIMEZONE:America/Denver',
      'X-WR-CALDESC:Events for the Society of Asian Scientists and Engineers at Colorado State University'
    ].join('\r\n');
  
    // Add each event to the ICS file
    events.forEach(event => {
      // Format dates for iCalendar (remove dashes, colons, etc.)
      const startDate = new Date(event.start);
      const endDate = new Date(event.end);
      
      const formatDate = (date) => {
        return date.toISOString().replace(/-|:|\./g, '').slice(0, 15) + 'Z';
      };
      
      const startFormatted = formatDate(startDate);
      const endFormatted = formatDate(endDate);
      
      // Create a unique ID for the event
      const uid = `event-${event.id}@sasecsu.org`;
      
      // Add event to calendar
      icsContent += '\r\n' + [
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${formatDate(new Date())}`,
        `DTSTART:${startFormatted}`,
        `DTEND:${endFormatted}`,
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${event.description ? event.description.replace(/\n/g, '\\n') : ''}`,
        `LOCATION:${event.location || ''}`,
        'END:VEVENT'
      ].join('\r\n');
    });
    
    // Close the ICS file
    icsContent += '\r\nEND:VCALENDAR';
    
    return icsContent;
  };
  
  /**
   * Download ICS file to user's device
   * @param {string} filename - Name of the file to download
   * @param {string} content - ICS file content
   */
  export const downloadICS = (filename, content) => {
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  /**
   * Create Google Calendar subscription URL
   * @param {Array} events - Array of event objects
   * @returns {string} - Google Calendar URL to add all events
   */
  export const createGoogleCalendarURL = (events) => {
    // For a single event, we can use a direct URL
    if (events.length === 1) {
      const event = events[0];
      const startTime = new Date(event.start).toISOString().replace(/-|:|\./g, '');
      const endTime = new Date(event.end).toISOString().replace(/-|:|\./g, '');
      
      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(event.description || '')}&location=${encodeURIComponent(event.location || '')}`;
    }
    
    // For multiple events, we redirect to the Google Calendar import page
    // The user will need to download the ICS file and import it
    return 'https://calendar.google.com/calendar/u/0/r/settings/export';
  };
  
  /**
   * Create URL for Apple Calendar
   * This simply returns a webcal:// URL that points to the hosted ICS file
   * @param {string} icsUrl - URL to the hosted ICS file
   * @returns {string} - Apple Calendar URL
   */
  export const createAppleCalendarURL = (icsUrl) => {
    // Convert https:// to webcal:// for Apple Calendar
    return icsUrl.replace(/^https?:\/\//, 'webcal://');
  };
  
  /**
   * Create URL for Outlook Calendar
   * @param {string} icsUrl - URL to the hosted ICS file
   * @returns {string} - Outlook Calendar URL
   */
  export const createOutlookCalendarURL = (icsUrl) => {
    return `https://outlook.office.com/calendar/0/addfromweb?url=${encodeURIComponent(icsUrl)}`;
  };