import React from 'react';
import Anecdote from './Anecdote'
import { addVote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const Anecdotes = ({ store }) => {

    const anecdotes = store.getState().filter === "" ? store.getState().anecdotes
        :
        store.getState().anecdotes
            .sort((a, b) => b.votes - a.votes)
            .filter(a => a.content.toLocaleLowerCase().includes(store.getState().filter.toLocaleLowerCase()))

    const vote = (id) => {
        store.dispatch(addVote(id));

        const findAnecdote = anecdotes.find((a) => {
            return a.id === id
        })

        store.dispatch(addNotification(`You voted '${findAnecdote.content}'`))
        setTimeout(() => {
            store.dispatch(addNotification(null))
        }, 5000)
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
