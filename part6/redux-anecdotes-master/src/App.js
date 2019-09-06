import React, { useEffect } from 'react';
import {connect} from 'react-redux'
import {initializeAnecdotes} from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/Anecdotes'
import Notification from './components/Notification'
import Filter from './components/Filter'


const App = (props) => {

  useEffect(() => {
        props.initializeAnecdotes()
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