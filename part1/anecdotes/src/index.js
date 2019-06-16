import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Anecdote = ({ anecdote, votes }) => {
    if (votes === 0)
        return (
            <>
                <p>{anecdote}</p>
                <p>Be the first one to vote for this anecdote!</p>
            </>
        );
    else
        return (
            <>
                <p>{anecdote}</p>
                <p>this anecdote has {votes} votes</p>
            </>
        );
}

const Button = ({ handle, text }) => {
    return (
        <button onClick={handle}>{text}</button>
    );
}

const App = (props) => {
    const [selected, setSelected] = useState(Math.floor(Math.random() * props.anecdotes.length));
    const [votes, setVote] = useState(new Array(props.anecdotes.length).fill(0));
    const selectRandom = () => {
        setSelected(Math.floor(Math.random() * props.anecdotes.length));
    }

    const addVote = () => {
        const newVotes = [...votes];
        newVotes[selected] += 1;
        setVote(newVotes);
    }

    const maxValue = votes.reduce((a, b) => {
        return Math.max(a, b);
    })

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
            <Button handle={addVote} text={"vote"} />
            <Button handle={selectRandom} text={"next anecdote"} />
            <h2>Anectode with the most votes</h2>
            <Anecdote anecdote={props.anecdotes[votes.indexOf(maxValue)]} votes={maxValue} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)