import React, { useState, useEffect } from 'react';
import './App.css';
import questions from '../public/data'; // 
import Question from './assets/components/question';
import Timer from './assets/components/timer';
import Scoreboard from './assets/components/scoreboard';

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [blankAnswers, setBlankAnswers] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const handleStart = () => {
    setGameStarted(true);
    setShowAnswers(false); // Ensure answers are hidden at the start
    setTimeRemaining(30); // Reset timer
    setCurrentQuestion(0); // Reset to the first question
    setScore(0); // Reset score
    setCorrectAnswers(0); // Reset correct answers
    setWrongAnswers(0); // Reset wrong answers
    setBlankAnswers(0); // Reset blank answers
    setGameOver(false); // Reset game over state
  };

  useEffect(() => {
    let timer;
    if (gameStarted && timeRemaining > 0 && !gameOver) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      handleNextQuestion();
    }
    return () => clearInterval(timer);
  }, [timeRemaining, gameOver, gameStarted]);

  // Show answers after 4 seconds from the start of the game
  useEffect(() => {
    if (gameStarted) {
      const answerTimeout = setTimeout(() => {
        setShowAnswers(true); // Show answers after 4 seconds
      }, 4000);

      return () => clearTimeout(answerTimeout);
    }
  }, [gameStarted, currentQuestion]); // Runs when gameStarted changes

  const handleAnswer = (index) => {
    setShowAnswers(false);
    // Check if an answer was selected
    if (index === null) {
      setBlankAnswers((prev) => prev + 1);
    } else if (index === questions[currentQuestion].options.indexOf(questions[currentQuestion].answer)) {
      setScore((prev) => prev + 10);
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setWrongAnswers((prev) => prev + 1);
    }

    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeRemaining(30);
      setShowAnswers(false); // Reset showAnswers for the next question
    } else {
      setGameOver(true);
      setBlankAnswers((prev) => prev + (questions.length - correctAnswers - wrongAnswers - 1)); // Calculate blank answers
    }
  };

  const restartGame = () => {
    handleStart(); // Use handleStart to reset the game
  };

  return (
    <div className="App">

      {!gameStarted ? (
        <div className='container'>
          <h1>Welcome to <br /> Question Game!</h1>
          <div className='rules-container'>
            <h2>The rules are very simple!</h2>
            <div className='rule'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 3C7.03125 3 3 7.03125 3 12C3 16.9688 7.03125 21 12 21C16.9688 21 21 16.9688 21 12C21 7.03125 16.9688 3 12 3ZM11.7188 17.25C11.5333 17.25 11.3521 17.195 11.1979 17.092C11.0437 16.989 10.9236 16.8426 10.8526 16.6713C10.7817 16.5 10.7631 16.3115 10.7993 16.1296C10.8354 15.9477 10.9247 15.7807 11.0558 15.6496C11.1869 15.5185 11.354 15.4292 11.5359 15.393C11.7177 15.3568 11.9062 15.3754 12.0775 15.4464C12.2488 15.5173 12.3952 15.6375 12.4983 15.7917C12.6013 15.9458 12.6562 16.1271 12.6562 16.3125C12.6562 16.5611 12.5575 16.7996 12.3817 16.9754C12.2058 17.1512 11.9674 17.25 11.7188 17.25ZM13.2863 12.4688C12.5264 12.9788 12.4219 13.4461 12.4219 13.875C12.4219 14.049 12.3527 14.216 12.2297 14.339C12.1066 14.4621 11.9397 14.5312 11.7656 14.5312C11.5916 14.5312 11.4247 14.4621 11.3016 14.339C11.1785 14.216 11.1094 14.049 11.1094 13.875C11.1094 12.848 11.5819 12.0314 12.5541 11.3784C13.4578 10.7719 13.9688 10.3875 13.9688 9.54234C13.9688 8.96766 13.6406 8.53125 12.9614 8.20828C12.8016 8.13234 12.4458 8.05828 12.008 8.06344C11.4586 8.07047 11.032 8.20172 10.7034 8.46609C10.0837 8.96484 10.0312 9.50766 10.0312 9.51562C10.0271 9.60181 10.006 9.68632 9.96919 9.76435C9.93237 9.84238 9.88054 9.9124 9.81667 9.9704C9.75279 10.0284 9.67811 10.0732 9.5969 10.1024C9.51569 10.1315 9.42954 10.1444 9.34336 10.1402C9.25718 10.1361 9.17266 10.115 9.09463 10.0782C9.0166 10.0414 8.94659 9.98953 8.88859 9.92565C8.83059 9.86177 8.78574 9.7871 8.7566 9.70589C8.72745 9.62468 8.71459 9.53852 8.71875 9.45234C8.72391 9.33844 8.80313 8.31234 9.87984 7.44609C10.4381 6.99703 11.1483 6.76359 11.9892 6.75328C12.5845 6.74625 13.1437 6.84703 13.523 7.02609C14.6578 7.56281 15.2812 8.45766 15.2812 9.54234C15.2812 11.1281 14.2214 11.8402 13.2863 12.4688Z" fill="var(--primary-color)" />
              </svg>
              <p>You have to answer 10 questions to complete the game.</p>
            </div>
            <div className='rule'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19.4859 20.0217C19.0762 16.4175 17.4314 14.9236 16.23 13.8342C15.3994 13.0781 15 12.6849 15 12C15 11.3245 15.398 10.9388 16.2262 10.1981C17.4417 9.11204 19.1062 7.62423 19.4869 3.97126C19.5173 3.66436 19.483 3.35449 19.3861 3.0617C19.2892 2.76892 19.1319 2.49973 18.9244 2.27157C18.7028 2.02788 18.4326 1.83331 18.1312 1.70042C17.8298 1.56753 17.5039 1.49926 17.1745 1.50001H6.82547C6.49563 1.49898 6.16923 1.56711 5.86735 1.70001C5.56547 1.83291 5.2948 2.02762 5.07281 2.27157C4.86593 2.50005 4.70924 2.76935 4.61283 3.0621C4.51643 3.35486 4.48247 3.66457 4.51312 3.97126C4.89234 7.61251 6.55078 9.08954 7.76156 10.1677C8.59781 10.9125 9 11.3011 9 12C9 12.7078 8.59687 13.1044 7.75781 13.8633C6.5625 14.9461 4.92187 16.4288 4.51406 20.0217C4.48095 20.3272 4.51268 20.6363 4.60719 20.9287C4.70169 21.2211 4.85684 21.4903 5.0625 21.7186C5.28495 21.9654 5.55693 22.1626 5.8607 22.2972C6.16446 22.4318 6.4932 22.501 6.82547 22.5H17.1745C17.5068 22.501 17.8355 22.4318 18.1393 22.2972C18.4431 22.1626 18.715 21.9654 18.9375 21.7186C19.1432 21.4903 19.2983 21.2211 19.3928 20.9287C19.4873 20.6363 19.519 20.3272 19.4859 20.0217ZM16.0922 20.25H7.92797C7.19672 20.25 6.99047 19.4063 7.50328 18.8831C8.74453 17.625 11.25 16.7241 11.25 15.2813V10.5C11.25 9.56954 9.46875 8.85939 8.36672 7.35001C8.18484 7.10111 8.20312 6.75001 8.66531 6.75001H15.3558C15.75 6.75001 15.8348 7.09829 15.6558 7.34767C14.5697 8.85939 12.75 9.56486 12.75 10.5V15.2813C12.75 16.7124 15.3614 17.4844 16.5187 18.8845C16.9852 19.4489 16.822 20.25 16.0922 20.25Z" fill="var(--primary-color)" />
              </svg>
              <p>The time given to you for each question is 30 seconds.</p>
            </div>
            <div className='rule'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21.0501 18.7069L13.0612 3.87094C12.495 2.81906 10.9866 2.81906 10.4198 3.87094L2.4314 18.7069C2.30845 18.9352 2.24681 19.1916 2.2525 19.4508C2.25818 19.7101 2.33099 19.9635 2.46383 20.1863C2.59666 20.409 2.78498 20.5935 3.0104 20.7217C3.23583 20.85 3.49065 20.9176 3.74999 20.918H19.7292C19.9888 20.918 20.2439 20.8507 20.4696 20.7226C20.6954 20.5945 20.884 20.4101 21.0171 20.1873C21.1502 19.9644 21.2232 19.7109 21.229 19.4514C21.2348 19.1919 21.1732 18.9354 21.0501 18.7069ZM11.7408 18.6211C11.5554 18.6211 11.3741 18.5661 11.2199 18.4631C11.0658 18.3601 10.9456 18.2137 10.8746 18.0424C10.8037 17.8711 10.7851 17.6826 10.8213 17.5007C10.8575 17.3188 10.9468 17.1518 11.0779 17.0207C11.209 16.8896 11.376 16.8003 11.5579 16.7641C11.7397 16.7279 11.9282 16.7465 12.0995 16.8175C12.2708 16.8884 12.4173 17.0086 12.5203 17.1627C12.6233 17.3169 12.6783 17.4982 12.6783 17.6836C12.6783 17.9322 12.5795 18.1707 12.4037 18.3465C12.2279 18.5223 11.9894 18.6211 11.7408 18.6211ZM12.7589 9.19219L12.4898 14.9109C12.4898 15.1098 12.4108 15.3006 12.2702 15.4413C12.1295 15.5819 11.9387 15.6609 11.7398 15.6609C11.5409 15.6609 11.3502 15.5819 11.2095 15.4413C11.0689 15.3006 10.9898 15.1098 10.9898 14.9109L10.7208 9.19453C10.7147 9.05793 10.7362 8.92151 10.784 8.79341C10.8318 8.6653 10.9049 8.54813 10.999 8.44888C11.093 8.34963 11.2061 8.27033 11.3315 8.2157C11.4568 8.16108 11.5919 8.13225 11.7286 8.13094H11.7384C11.8761 8.13087 12.0123 8.15869 12.1389 8.21272C12.2656 8.26675 12.3799 8.34587 12.4751 8.44531C12.5703 8.54475 12.6443 8.66245 12.6928 8.7913C12.7413 8.92015 12.7631 9.05748 12.757 9.195L12.7589 9.19219Z" fill="var(--primary-color)" />
              </svg>
              <p>But be careful! You will not be able to go back to the previous question.</p>
            </div>
          </div>
          <button id='start-btn' onClick={handleStart}>Start Game</button>
        </div>
      ) : gameOver ? (
        <Scoreboard
          score={score}
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
          blankAnswers={blankAnswers}
          onReplay={restartGame}
        />
      ) : (
        <div>
          <Question
            question={questions[currentQuestion]}
            currentQuestion={currentQuestion}
            onAnswer={handleAnswer}
            showAnswers={showAnswers}
          />
          <Timer timeRemaining={timeRemaining} currentQuestion={currentQuestion} />
        </div>
      )}
    </div>
  );
};

export default App;