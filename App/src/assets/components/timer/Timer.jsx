import { useState, useEffect } from 'react';
import React from 'react';
import './style.css';
const Timer = ({ timeRemaining, currentQuestion }) => {
  const [animationKey, setAnimationKey] = useState(0);
  useEffect(() => {
    setAnimationKey((prevKey) => prevKey + 1);
  }, [currentQuestion]);

  const strokeColor = timeRemaining <= 10 ? 'red' : 'var(--primary-color)';
  const clockSound = new Audio('/timer.mp3');

  useEffect(() => {
    clockSound.load();
  }, []);

  useEffect(() => {
    if (timeRemaining === 11) {
      clockSound.play().catch(error => {
        console.log("Ses oynatılmadı, izinle ilgili bir sorun olabilir:", error);
      });;
    }
  }, [timeRemaining]);

  return (
    <>
      <div id='timer'>
        <div id='time' style={{ color: strokeColor }}>{timeRemaining}</div>
        <svg
          key={animationKey}
          className='time-indicator'
          style={{ animationDuration: `${timeRemaining}s` }}>
          <circle r="18" cx="20" cy="20" style={{ stroke: strokeColor }}></circle>
        </svg>
      </div>
    </>
  )
};

export default Timer;
