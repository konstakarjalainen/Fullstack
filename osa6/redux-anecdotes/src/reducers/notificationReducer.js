import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const notificationSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    updateNotification(state, action) {
      console.log('payload', action.payload)
      return action.payload
    }
  }
})

export const { updateNotification } = notificationSlice.actions

export const setNotification = (msg, secs) => {
  return dispatch => {
    dispatch(updateNotification(msg))
    setTimeout(() => {
      dispatch(updateNotification(null))
    }, secs*1000)
  }
}
export default notificationSlice.reducer