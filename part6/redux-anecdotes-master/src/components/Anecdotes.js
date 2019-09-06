import React from 'react';
import {connect} from 'react-redux'
import anecdoteService from '../services/anecdotes'
import Anecdote from './Anecdote'
import { addVote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const Anecdotes = (props) => {

    const vote = async (id) => {
        // const updatedVote = await anecdoteService.putVotes(id);
        const findAnecdote = props.anecdotesShow.find((a) => {
            return a.id === id
        })
        props.addVote(findAnecdote, id);

        props.addNotification(`You voted '${findAnecdote.content}'`, 5)
    }

    return (
        <>
            <h2>Anecdotes</h2>
            {
                props.anecdotesShow.sort((a, b) => b.votes - a.votes).map(anecdote =>
                    <Anecdote key={anecdote.id} anecdote={anecdote} voteButtonClick={() => vote(anecdote.id)} />
                )
            }
        </>
    )
}

const anecdotesToShow = ({anecdotes, filter}) => {
    return filter === "" ? anecdotes
    :
    anecdotes.filter(a => a.content.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
}

const mapStateToProps = (state) => {
    console.log(state);
    return{
        anecdotesShow: anecdotesToShow(state),
        filter: state.filter,
        notification: state.notification
    }
}

const mapDispatchToProps = {
    addNotification,
    addVote
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Anecdotes)
