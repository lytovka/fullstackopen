import React from 'react';
import { addAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux';

const AnecdoteForm = (props) => {

    const newAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        props.addAnecdote(content)
        sendNotification(content)
        event.target.anecdote.value = ""
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

const mapStateToProps = (state) => {
    console.log(state)
    return {
        
    }
}

const mapDispatchToProps = {
    addAnecdote,
    addNotification,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AnecdoteForm)
