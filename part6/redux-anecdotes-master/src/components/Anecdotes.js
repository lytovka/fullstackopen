import React from 'react';
import Anecdote from './Anecdote'
import {addVote} from '../reducers/anecdoteReducer'

const Anecdotes = ({ store }) => {
    const anecdotes = store.getState().sort((a,b) => b.votes - a.votes)

    const vote = (id) => {
        store.dispatch(addVote(id));
    }

    return (
        <>
            <h2>Anecdotes</h2>
            {
                anecdotes.map(anecdote =>
                    <Anecdote key={anecdote.id} anecdote={anecdote} voteButtonClick={() => vote(anecdote.id)} />
                )
            }
        </>
    )
}

export default Anecdotes
