import React, { useState, useEffect } from 'react';
import Question from './components/Question';

export default function App() {

    const [ triviaRoundData, setTriviaRoundData ] = useState([]);
    const [ playerAnswers, setPlayerAnswers ] = useState({});
    const [ playerScore, setPlayerScore ] = useState(0);
    const [ isGameRunning, setIsGameRunning ] = useState(true);

    useEffect(() => {
        if (!isGameRunning) return;
        fetch('https://opentdb.com/api.php?amount=5')
            .then((response) => response.json())
            .then((data) => {
                setTriviaRoundData(data.results);
            });
    }, [isGameRunning]);

    function updatePlayerAnswers(key, value) {
        setPlayerAnswers((prevAnswers) => ({
            ...prevAnswers,
            [key]: value
        }));
    };

    function tallyScore() {
        let score = 0;
        for (let i = 0; i < triviaRoundData.length; i++) {
            const question = triviaRoundData[i].question;
            if (triviaRoundData[i].correct_answer 
                === playerAnswers[question]) score++;
        };
        return score;
    };

    function handleSubmit(event) {
        event.preventDefault();
        if (isGameRunning) {
            setPlayerScore(tallyScore());
            setIsGameRunning(false);
        } else {
            setPlayerAnswers({});
            setPlayerScore(0);
            setIsGameRunning(true);
        };
    };

    const questions = triviaRoundData.map((item) => (
        <Question 
            key={item.question}
            question={item.question}
            correctAnswer={item.correct_answer}
            incorrectAnswers={item.incorrect_answers}
            isGameRunning={isGameRunning}
            playerAnswers={playerAnswers}
            updatePlayerAnswers={updatePlayerAnswers}
        />
    ));

    return (
        <main>
            <form onSubmit={handleSubmit}>
                {questions}
                <button>{(isGameRunning) ? 'Check Answers' : 'Play Again'}</button>
            </form>
            {
                !isGameRunning && 
                <div className='score-prompt'>
                    You scored {playerScore}/{triviaRoundData.length} correct answers.
                </div>
            }
        </main>
    );
};