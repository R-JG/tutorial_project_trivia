import React, { useState, useEffect } from 'react';
import he from 'he';

export default function Question(props) {

    const { 
            question, 
            correctAnswer, 
            incorrectAnswers, 
            isGameRunning,
            playerAnswers,
            updatePlayerAnswers 
    } = props;

    const [ answersArray, setAnswersArray ] = useState([]);

    useEffect(() => {
        randomizeAnswers(incorrectAnswers, correctAnswer)
    }, [correctAnswer, incorrectAnswers]);
    
    function randomizeAnswers(incorrectAnswers, correctAnswer) {
        const newArray = [...incorrectAnswers];
        const randomIndexNumber = Math.floor(Math.random() * newArray.length);
        newArray.splice(randomIndexNumber, 0, correctAnswer);
        setAnswersArray(newArray);
    };

    function determineAnswerStyles(answer) {
        if (isGameRunning) {
            return (playerAnswers[question] === answer) 
                ? 'answer--checked' 
                : '';
        } else {
            if (answer === correctAnswer) {
                return 'answer--correct';
            } else {
                return (answer === playerAnswers[question]) 
                ? 'answer--incorrect' 
                : 'answer--other';
            };
        };
    };

    const answerElements = answersArray.map((answer) => (
        <div 
            key={`${question}${answer}`}
            className={`answer ${determineAnswerStyles(answer)}`} 
        >
            <input 
                type='radio' 
                name={question}
                id={`${question}${answer}`} 
                onChange={() => {
                    if (isGameRunning) updatePlayerAnswers(question, answer);
                }}
            />
            <label htmlFor={`${question}${answer}`}>
                {he.decode(answer)}
            </label>
        </div>
    ));

    return (
        <div className='question-container'>
            <h2 className='question'>{he.decode(question)}</h2>
            <div className='answers-container'>
                {answerElements}
            </div>
            <hr />
        </div>
    );
};