import React, { useState, useEffect } from 'react';
import Question from './components/Question';

export default function App() {

    const [ triviaRoundData, setTriviaRoundData ] = useState([]);
    const [ playerAnswers, setPlayerAnswers ] = useState({});

    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5')
            .then((response) => response.json())
            .then((data) => {
                setTriviaRoundData(data.results);
            });
    }, []);

    function updatePlayerAnswers(key, value) {
        setPlayerAnswers((prevAnswers) => ({
            ...prevAnswers,
            [key]: value
        }));
    };

    const questions = triviaRoundData.map((item) => (
        <Question 
            key={item.question}
            question={item.question}
            correctAnswer={item.correct_answer}
            incorrectAnswers={item.incorrect_answers}
            playerAnswers={playerAnswers}
            updatePlayerAnswers={updatePlayerAnswers}
        />
    ));

    return (
        <main>
            <form>
                {questions}
                <button>Check Answers</button>
            </form>
        </main>
    );
};