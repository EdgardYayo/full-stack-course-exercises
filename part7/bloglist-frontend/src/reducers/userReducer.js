import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/login'


const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers:{
    saveUserData(state, action) {
      console.log(action.payload)
      return action.payload
    },
    removeUserData(state, action) {
      return action.payload
    }
  }
})

export const { saveUserData, removeUserData } = userSlice.actions

export const logInUser = (userData) => {
  return async (dispatch) => {
    const user = await userService.logIn(userData.username, userData.password)
    console.log(user)
    dispatch(saveUserData(user))
  }
}

export const logOutUser = () => {
  return async (dispatch) => {
    dispatch(removeUserData(null))
  }
}

export default userSlice.reducer