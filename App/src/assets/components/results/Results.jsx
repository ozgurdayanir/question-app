import React from 'react'
import './style.css'

function Results({ showAnswers, questions, userAnswers }) {
    return showAnswers ?
        <>
            <div className='results-container'>
                <h2>Results</h2>
                <ul>
                    {questions.map((question, index) => (
                        <li key={index}>
                            <h4>{question.question}</h4>
                            <p><strong>Correct Answer:</strong> {question.answer}</p>
                            <p>
                                {/* Display the user's answer if it exists, otherwise display "No answer given" */}
                                <strong>Your Answer: </strong> 
                                {userAnswers[index] !== null ? question.options[userAnswers[index]] : " No answer given"}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </> : (null
        )
}

export default Results