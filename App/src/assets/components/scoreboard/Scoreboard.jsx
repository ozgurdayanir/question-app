import './style.css';
import { useState } from 'react';
import React from 'react';
import Results from '../results';

const Scoreboard = ({questions, score, correctAnswers, wrongAnswers, blankAnswers, onReplay, userAnswers}) => {
  const [showAnswers, setShowAnswers] = useState(false);
  const handleToggle = () => {
    setShowAnswers((prevState) => !prevState); // Toggle the state
  };
  return (
    <>
    <div className='container'>
      <h1>Game Over! Your Score: <br />{score}</h1>
      <div className='result-container'>
        <div className='result'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2.25C6.62391 2.25 2.25 6.62391 2.25 12C2.25 17.3761 6.62391 21.75 12 21.75C17.3761 21.75 21.75 17.3761 21.75 12C21.75 6.62391 17.3761 2.25 12 2.25ZM15.75 12.75H12.75V15.75C12.75 15.9489 12.671 16.1397 12.5303 16.2803C12.3897 16.421 12.1989 16.5 12 16.5C11.8011 16.5 11.6103 16.421 11.4697 16.2803C11.329 16.1397 11.25 15.9489 11.25 15.75V12.75H8.25C8.05109 12.75 7.86032 12.671 7.71967 12.5303C7.57902 12.3897 7.5 12.1989 7.5 12C7.5 11.8011 7.57902 11.6103 7.71967 11.4697C7.86032 11.329 8.05109 11.25 8.25 11.25H11.25V8.25C11.25 8.05109 11.329 7.86032 11.4697 7.71967C11.6103 7.57902 11.8011 7.5 12 7.5C12.1989 7.5 12.3897 7.57902 12.5303 7.71967C12.671 7.86032 12.75 8.05109 12.75 8.25V11.25H15.75C15.9489 11.25 16.1397 11.329 16.2803 11.4697C16.421 11.6103 16.5 11.8011 16.5 12C16.5 12.1989 16.421 12.3897 16.2803 12.5303C16.1397 12.671 15.9489 12.75 15.75 12.75Z" fill="#63EC5E" />
          </svg>
          <h3>Correct Answers: {correctAnswers}</h3>
        </div>
        <div className='result'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2.25C6.62391 2.25 2.25 6.62391 2.25 12C2.25 17.3761 6.62391 21.75 12 21.75C17.3761 21.75 21.75 17.3761 21.75 12C21.75 6.62391 17.3761 2.25 12 2.25ZM15.75 12.75H8.25C8.05109 12.75 7.86032 12.671 7.71967 12.5303C7.57902 12.3897 7.5 12.1989 7.5 12C7.5 11.8011 7.57902 11.6103 7.71967 11.4697C7.86032 11.329 8.05109 11.25 8.25 11.25H15.75C15.9489 11.25 16.1397 11.329 16.2803 11.4697C16.421 11.6103 16.5 11.8011 16.5 12C16.5 12.1989 16.421 12.3897 16.2803 12.5303C16.1397 12.671 15.9489 12.75 15.75 12.75Z" fill="#FF4E4E" />
          </svg>
          <h3>Wrong Answers: {wrongAnswers}</h3>
        </div>
        <div className='result'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 21.75C6.62391 21.75 2.25 17.3761 2.25 12C2.25 6.62391 6.62391 2.25 12 2.25C17.3761 2.25 21.75 6.62391 21.75 12C21.75 17.3761 17.3761 21.75 12 21.75Z" fill="#E7E7E7" />
          </svg>
          <h3>Blank Answers: {blankAnswers}</h3>
        </div> 
      </div>
      <Results showAnswers={showAnswers}
    userAnswers={userAnswers}
    questions={questions} />
      <div className='btn-group'>
        <button onClick={onReplay}>Replay</button>
        <button onClick={handleToggle}>Show Answers</button>
      </div>
    </div>
    
    </>
  );
};

export default Scoreboard;
