import React from 'react';
import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/Anecdotes'
import Notification from './components/Notification'
import Filter from './components/Filter'


const App = (props) => {
  const store = props.store

  return (
    <div>
      {store.getState().notification === null ? 
      <div></div>
      :
      <Notification store={store}/>
      }
      <Filter store={store}/>
      <Anecdotes store={store} />
      <AnecdoteForm store={store}/>
    </div>
  )
}

export default App