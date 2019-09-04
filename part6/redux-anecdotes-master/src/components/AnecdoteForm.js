import React from 'react'
import anecdoteService from '../services/anecdotes'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

    const newAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ""
        console.log(content)
        const newAnecdote = await anecdoteService.createNew(content)
        props.addAnecdote(newAnecdote)
        console.log(newAnecdote)
        sendNotification(content)
    }

    const sendNotification = (content) => {
        props.addNotification(`${content} has been added to the list`)
        setTimeout(() => {
            addNotification(null)
        }, 5000)
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

const mapDispatchToProps = {
    addAnecdote,
    addNotification,
}

export default connect(
    null,
    mapDispatchToProps,
)(AnecdoteForm)
