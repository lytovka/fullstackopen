import React from 'react';
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({ store }) => {

    const newAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        store.dispatch(addAnecdote(content))
        event.target.anecdote.value = ""
      }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={newAnecdote}>
                <div><input name="anecdote" /></div>
                <button>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm
