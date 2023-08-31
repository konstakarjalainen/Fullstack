import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload.sort((a,b) => b.votes - a.votes)
    }
  },
})

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = id => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const votedAnecdote = anecdotes.find(a => a.id === id)
    const changedAnecdote = {
      ...votedAnecdote,
      votes: votedAnecdote.votes + 1
    }
    await anecdoteService.giveVote(id, changedAnecdote)
    dispatch(
      setAnecdotes(
        anecdotes.map(anecdote =>
          anecdote.id !== id ? anecdote : changedAnecdote)
      )
    )
  }
}

export default anecdoteSlice.reducer