import { useState, useEffect, useRef } from 'react';
import React from 'react';
import './style.css';

const Timer = ({ timeRemaining, currentQuestion }) => {
  const [animationKey, setAnimationKey] = useState(0);
  const clockSoundRef = useRef(null);

  useEffect(() => {
    // use useRef to only create the clock sound once.
    clockSoundRef.current = new Audio('/timer.mp3');
    clockSoundRef.current.load();

    return () => {
      // Clean up the clock sound when the component unmounts
      if (clockSoundRef.current) {
        clockSoundRef.current.pause();
        clockSoundRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    setAnimationKey((prevKey) => prevKey + 1);
    
    // stop and reset the clock sound when the current question changes
    if (clockSoundRef.current) {
      clockSoundRef.current.pause();
      clockSoundRef.current.currentTime = 0;
    }
  }, [currentQuestion]);

  useEffect(() => {
    // timeRemaining is 11 when the clock sound should play
    if (timeRemaining === 11 && clockSoundRef.current) {
      clockSoundRef.current.play().catch(error => {
        console.log("Ses oynatılmadı, izinle ilgili bir sorun olabilir:", error);
      });
    }
  }, [timeRemaining]);

  const strokeColor = timeRemaining <= 10 ? 'red' : 'var(--primary-color)';

  return (
    <div id='timer'>
      <div id='time' style={{ color: strokeColor }}>{timeRemaining}</div>
      <svg
        key={animationKey}
        className='time-indicator'
        style={{ animationDuration: `${timeRemaining}s` }}>
        <circle r="18" cx="20" cy="20" style={{ stroke: strokeColor }}></circle>
      </svg>
    </div>
  );
};

export default Timer;
