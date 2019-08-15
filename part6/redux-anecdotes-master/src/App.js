import React from 'react';
import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/Anecdotes'


const App = (props) => {
  const store = props.store

  return (
    <div>
      <Anecdotes store={store} />
      <AnecdoteForm store={store}/>
    </div>
  )
}

export default App