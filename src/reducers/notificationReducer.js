import { createSlice } from '@reduxjs/toolkit'

let timeoutId

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setMessage(state, action) {
      if (state !== '') {
        clearTimeout(timeoutId)
      }

      return action.payload
    },
    clearMessage(state, action) {
      return ''
    }
  },
})

export const { setMessage, clearMessage } = notificationSlice.actions

export const setNotification = (message, seconds) => {
  return async dispatch => {
    dispatch(setMessage(message))
    timeoutId = setTimeout(() => {
      dispatch(clearMessage())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer