import React from 'react';
import he from 'he';
import { nanoid } from 'nanoid';

export default function Question(props) {

    const { question, correctAnswer, incorrectAnswers } = props;

    const answersArray = (() => {
        const newArray = [...incorrectAnswers];
        const randomIndexNumber = Math.floor(Math.random() * newArray.length);
        newArray.splice(randomIndexNumber, 0, correctAnswer);
        return newArray;
    })();

    const answerElements = answersArray.map((answer) => (
        <div key={nanoid()}>
            <input type='radio' id='test' />
            <label htmlFor='test'>{answer}</label>
        </div>
    ));

    return (
        <div>
            <p>{he.decode(question)}</p>
            {answerElements}
        </div>
    );
};