import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, buttonHandler }) => {
    return (
        <button onClick={buttonHandler}>{text}</button>
    );
}

const Buttons = ({ handleGood, handleNeutral, handleBad }) => {
    return (
        <>
            <Button text={"good"} buttonHandler={handleGood} />
            <Button text={"neutral"} buttonHandler={handleNeutral} />
            <Button text={"bad"} buttonHandler={handleBad} />
        </>
    );
}

const Statistic = ({ text, value }) => {
    return (
        <>
            <tr>
                <td>{text}</td>
                <td>{value}</td>
            </tr>
        </>
    );
}


const Statistics = ({ good, bad, neutral, allFeedback, average, percentage }) => {
    if (good === 0 && bad === 0 && neutral === 0)
        return (
            <p>Leave your feedback</p>
        );
    else
        return (
            <>
                <table>
                    <tbody>
                    <Statistic text={"good"} value={good} />
                    <Statistic text={"neutral"} value={neutral} />
                    <Statistic text={"bad"} value={bad} />
                    <Statistic text={"all"} value={allFeedback} />
                    <Statistic text={"average"} value={average} />
                    <Statistic text={"positive"} value={percentage} />
                    </tbody>
                </table>
            </>
        );
}



const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);


    const handleGood = () => {
        setGood(good + 1);
    }
    const handleNeutral = () => {
        setNeutral(neutral + 1);
    }
    const handleBad = () => {
        setBad(bad + 1);
    }

    let allFeedback = good + bad + neutral;
    let average = (good + 0 - 1 * bad) / (good + bad + neutral);
    let percentage = ((good / (good + neutral + bad)) * 100).toString();

    return (
        <div>
            <h1>give feedback</h1>
            <Buttons handleGood={handleGood} handleBad={handleBad} handleNeutral={handleNeutral} />
            <h2>Statistics</h2>
            <Statistics good={good} bad={bad} neutral={neutral} allFeedback={allFeedback} average={average} percentage={percentage} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)