import React, { useState, useEffect } from 'react';
import he from 'he';

export default function Question(props) {

    const { 
            question, 
            correctAnswer, 
            incorrectAnswers, 
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

    const answerElements = answersArray.map((answer) => (
        <div 
            key={`${question}${answer}`}
            className={`answer ${isChecked(answer) && 'checked-answer'}`} 
        >
            <input 
                type='radio' 
                id={`${question}${answer}`} 
                name={question}
                checked={isChecked(answer)}
                onChange={()=> updatePlayerAnswers(question, answer)}
            />
            <label htmlFor={`${question}${answer}`}>
                {he.decode(answer)}
            </label>
        </div>
    ));

    function isChecked(answer) {
        return (playerAnswers[question] === answer) ? true : false;
    };

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