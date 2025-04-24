import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Function to calculate time difference
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();
      
      if (difference <= 0) {
        setIsExpired(true);
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };
    
    // Initial calculation
    setTimeLeft(calculateTimeLeft());
    
    // Set up interval to update countdown every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, [targetDate]);
  
  // Padding function to ensure two digits
  const padWithZero = (number) => {
    return number < 10 ? `0${number}` : number;
  };

  return (
    <div className="countdown-timer">
      <p className="countdown-label">
        {isExpired ? "Event has started!" : "Event starts in:"}
      </p>
      {!isExpired ? (
        <div className="countdown-time">
          <div className="countdown-segment">
            <span className="countdown-number">{timeLeft.days}</span>
            <span className="countdown-unit">days</span>
          </div>
          <div className="countdown-segment">
            <span className="countdown-number">{padWithZero(timeLeft.hours)}</span>
            <span className="countdown-unit">hours</span>
          </div>
          <div className="countdown-segment">
            <span className="countdown-number">{padWithZero(timeLeft.minutes)}</span>
            <span className="countdown-unit">minutes</span>
          </div>
          <div className="countdown-segment">
            <span className="countdown-number">{padWithZero(timeLeft.seconds)}</span>
            <span className="countdown-unit">seconds</span>
          </div>
        </div>
      ) : (
        <div className="countdown-expired">Join us now!</div>
      )}
    </div>
  );
};

export default CountdownTimer;