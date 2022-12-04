import React, { useState, useEffect } from 'react';
import Question from './components/Question';

export default function App() {

    const [ triviaRoundData, setTriviaRoundData ] = useState([]);
    const [ playerAnswers, setPlayerAnswers ] = useState({});

    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5')
            .then((response) => response.json())
            .then((data) => setTriviaRoundData(data.results));
    }, []);

    return (
        <main>
            <form>
                <Question />
                <button>Check Answers</button>
            </form>
        </main>
    );
};