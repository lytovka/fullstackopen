import React from 'react';
import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/Anecdotes'
import Notification from './components/Notification'
import Filter from './components/Filter'


const App = () => {

  return (
    <div>
      <Notification />
      <Filter />
      <Anecdotes />
      <AnecdoteForm />
    </div>
  )
}

export default App