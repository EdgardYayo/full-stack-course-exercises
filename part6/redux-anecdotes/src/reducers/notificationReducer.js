import { createSlice } from "@reduxjs/toolkit";


const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        notify(state, action) {
           return action.payload
        },
        removeNotification() {
            return ''
        }
    }
})

export const notifyWithTimeout = (message, time) => {
    return (dispatch) => {
        dispatch(notify(message))

        let timeInMs = time * 1000

        // To remove the notification we can do this
        // ⬇️⬇️⬇️
        // setTimeout(() => {
        //     dispatch(removeNotification())
        // }, timeInMs)

        // Or if we want to recycle the same action
        // This ⬇️⬇️⬇️
        setTimeout(() => {
            dispatch(notify(''))
        }, timeInMs)
    }
    
  }


export const { notify, removeNotification } = notificationSlice.actions

export default notificationSlice.reducer