import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    saveUsers(state, action) {
      return action.payload
    }
  }
})

export const { saveUsers } = usersSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAllUsers()
    dispatch(saveUsers(users))
  }
}

export default usersSlice.reducer