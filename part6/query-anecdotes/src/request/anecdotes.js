import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = () => 
    axios.get(baseUrl).then((res) => res.data)

const createAnecdote = (newAnecdote) => 
    axios.post(baseUrl, newAnecdote).then((res) => res.data)

const voteAnecdote = (anecdote) => 
    axios.put(`${baseUrl}/${anecdote.id}`, anecdote).then((res) => res.data)

export { getAll, createAnecdote, voteAnecdote }