import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async content => {
  const obj = {content, votes: 0}
  const response = await axios.post(baseUrl, obj)
  return response.data
}

const putVote = async (newAnecdote, id) => {
  const votedAnecdote = {
    ...newAnecdote,
    votes: newAnecdote.votes+1
  }
  const response = await axios.put(`${baseUrl}/${id}`, votedAnecdote)
  return response.data
}

export default { getAll, createNew, putVote }