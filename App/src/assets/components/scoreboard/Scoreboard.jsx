import React from 'react';

const Scoreboard = ({ score, correctAnswers, wrongAnswers, blankAnswers, onReplay }) => {
  return (
    <div>
      <h2>Game Over!</h2>
      <p>Total Score: {score}</p>
      <p>Correct Answers: {correctAnswers}</p>
      <p>Wrong Answers: {wrongAnswers}</p>
      <p>Blank Answers: {blankAnswers}</p>
      <button onClick={onReplay}>Replay</button>
    </div>
  );
};

export default Scoreboard;
