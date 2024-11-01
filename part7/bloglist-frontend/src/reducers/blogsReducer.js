import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      let id = action.payload.id
      return state
        .map((ele) => ele.id === id ? action.payload : ele)
    },
    eraseBlog(state, action) {
      let id = action.payload
      return state.filter((ele) => ele.id !== id)
    }
  }
})

export const { setBlogs, appendBlog, updateBlog, eraseBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }
}

export const createBlog = (content) => {
  return async (dispatch, getState) => {
    const userToken = getState().user.TOKEN
    let token = `Bearer ${userToken}`
    const newBlog = await blogService.createNewBlog(content, token)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (blogData) => {
  return async (dispatch) => {
    const likedBlog = await blogService.putLikesIntoABlog(blogData)
    dispatch(updateBlog(likedBlog))
  }

}

export const deleteBlog = (id) => {
  return async (dispatch, getState) => {
    const userToken = getState().user.TOKEN
    let token = `Bearer ${userToken}`
    await blogService.deleteBlog(id, token)
    dispatch(eraseBlog(id))
  }
}

export const addCommentToBlog = (id, comment) => {
  return async (dispatch) => {
    console.log(comment)
    let blogWithComments = await blogService.commentBlog(id, comment)
    dispatch(updateBlog(blogWithComments))
  }
}

export default blogSlice.reducer