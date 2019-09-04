import React, { useEffect } from 'react';
import {connect} from 'react-redux'
import {initializeAnecdotes} from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/Anecdotes'
import Notification from './components/Notification'
import Filter from './components/Filter'


const App = (props) => {

  useEffect(() => {
    anecdoteService.getAll().then(anecdotes =>
        props.initializeAnecdotes(anecdotes)
    )
  })

  return (
    <div>
      <Notification />
      <Filter />
      <Anecdotes />
      <AnecdoteForm />
    </div>
  )
}

export default connect(
  null,
  {initializeAnecdotes}
)(App)