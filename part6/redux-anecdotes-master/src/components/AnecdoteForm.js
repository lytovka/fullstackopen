import React from 'react';
import { addAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({ store }) => {

    const newAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        store.dispatch(addAnecdote(content))
        sendNotification(content)
        event.target.anecdote.value = ""
    }

    const sendNotification = (content) => {
        store.dispatch(addNotification(`${content} has been added to the list`))
        setTimeout(() => {
            store.dispatch(addNotification(null))
        },5000)
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
