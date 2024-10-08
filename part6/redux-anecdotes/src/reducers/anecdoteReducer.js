import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
      voteAnecdote(state, action) {
        const id = action.payload.id
        return state
          .map((el) => el.id === id ? action.payload : el)
      },
      appendAnecdote(state, action) {
        state.push(action.payload)
      },
      setAnecdotes(state, action) {
        return action.payload
      }
    }
})


// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'VOTE': {
//       const id = action.payload.id
//       const currentAnecdote = state.find((el) => el.id === id)
//       const votedAnecdote = {
//         ...currentAnecdote,
//         votes: currentAnecdote.votes + 1
//       }
    
//       return state.map((el) => el.id === id ? votedAnecdote : el)
//     }
//     case 'NEW_ANECDOTE': {
//       let newAnecdote = {
//         content: action.payload.content,
//         id: getId(),
//         votes: 0
//       }

//       return [...state, newAnecdote]
//     }
//     default: 
//       return state

//   }
// }

export const { voteAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

//ASYNC ACTION CREATORS
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNewAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateVoteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const currentAnecdote = getState().anecdotes.find((a) => a.id === id)

    let votedAnecdote = {
      ...currentAnecdote,
      votes: currentAnecdote.votes + 1
    }

    const updatedAnecdote = await anecdotesService.voteAnecdote(id, votedAnecdote)

    dispatch(voteAnecdote(updatedAnecdote))

  }
}

export default anecdoteSlice.reducer