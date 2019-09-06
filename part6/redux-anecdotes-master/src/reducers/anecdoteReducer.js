import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteReducer = (state = [], action) => {

  switch (action.type) {
    case "NEW_ANECDOTE":
      return [...state, action.data]
    case "INIT_ANEC":
      return action.data
    case "VOTE":
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote => anecdote.id === id ? changedAnecdote : anecdote);
    default:
      return state;
  }
}

export const addVote = (content, id) => {
  return async dispatch => {
    await anecdoteService.putVote(content, id)
    dispatch({
      type: "VOTE",
      data: { id }
    })
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)

    dispatch({
      type: "NEW_ANECDOTE",
      data: {
        ...newAnecdote,
        id: getId()
      }
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const newAnecdotes = await anecdoteService.getAll()
    dispatch({
      type: "INIT_ANEC",
      data: newAnecdotes,
    })
  }
}

export default anecdoteReducer