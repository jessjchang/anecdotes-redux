import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const sortAnecdotes = (anecdotes) => {
  return anecdotes.sort((anecdote1, anecdote2) =>
    anecdote2.votes - anecdote1.votes
  )
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
      return sortAnecdotes(state)
    },
    setAnecdotes(state, action) {
      return sortAnecdotes(action.payload)
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

export const voteAnecdote = anecdote => {
  const targetId = anecdote.id

  const changedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  }

  return async (dispatch, getState)  => {
    const newAnecdote = await anecdoteService.update(targetId, changedAnecdote)
    const updatedAnecdotes = getState().anecdotes.map(anecdote =>
      anecdote.id !== targetId ? anecdote : newAnecdote
    )
    dispatch(setAnecdotes(updatedAnecdotes))
  }
}

export default anecdoteSlice.reducer