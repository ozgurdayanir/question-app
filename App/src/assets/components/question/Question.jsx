import React, { useEffect } from 'react';

const Question = ({ question, currentQuestion, onAnswer, showAnswers }) => {
  useEffect(() => {
    const answerTimeout = setTimeout(() => {
      if (!showAnswers) {
        onAnswer(null); // Consider as blank answer if time runs out
      }
    }, 4000);

    return () => clearTimeout(answerTimeout);
  }, [showAnswers, onAnswer]);

  return (
    <div>
      <h3>Question {currentQuestion + 1}</h3>
      <h2>{question.question}</h2>
      {question.media && <img src={question.media} alt={question.question} style={{ width: '300px', marginBottom: '20px' }} />}
      {showAnswers && question.options.map((option, index) => (
        <button key={index} onClick={() => onAnswer(index)}>
          {option}
        </button>
      ))}
      {!showAnswers && <p>Answers will appear in 4 seconds...</p>}
    </div>
  );
};

export default Question;
