import React from 'react';

const Anecdote = ({ anecdote, voteButtonClick }) => {
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={voteButtonClick}>vote</button>
            </div>
        </div>
    )
}

export default Anecdote