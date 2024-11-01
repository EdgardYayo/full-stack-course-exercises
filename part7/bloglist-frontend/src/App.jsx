import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notifyWithTimeout } from './reducers/notificationReducer'
import { addCommentToBlog, createBlog, deleteBlog, initializeBlogs, likeBlog } from './reducers/blogsReducer'
import { logInUser, logOutUser } from './reducers/userReducer'
import Blog from './components/Blog/Blog'
import BlogForm from './components/BlogForm/BlogForm'
import Toggable from './components/Toggable/Toggable'
import LoginForm from './components/LoginForm/LoginForm'
import UserNav from './components/UserNav/UserNav'
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import UsersData from './components/UsersData/UsersData'
import { initializeUsers } from './reducers/usersReducer'
import UserBlogs from './components/UserBlogs/UserBlogs'
import BlogDetails from './components/BlogDetails/BlogDetails'
import { Alert, Box, Typography } from '@mui/material'

const boxStyles = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  gap: '0.5rem'
}

const App = () => {
  const user = useSelector(state => state.user)
  const notificationMessage = useSelector(state => state.notifications)
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const blogForm = useRef()
  const nav = useNavigate()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!username || !password) {
      dispatch(notifyWithTimeout('The username and the password are required', 4))
    }

    let user = {
      username:  username.trim(),
      password
    }

    try {
      dispatch(logInUser(user))
      dispatch(notifyWithTimeout('Successfull log in', 3))
    } catch (error) {
      console.log(error)
      dispatch(notifyWithTimeout(error.response.data.error, 3.5))
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logOutUser())
    dispatch(notifyWithTimeout('User logged out', 2))
    nav('/')
  }

  const handleSubmitNewBlog = async (e, newBlog, setNewBlog) => {
    e.preventDefault()

    console.log(blogForm.current, blogForm)

    try{
      dispatch(createBlog(newBlog))
      setNewBlog({
        title: '',
        author: '',
        url: ''
      })
      dispatch(notifyWithTimeout(`A new blog with the title '${newBlog.title}' by '${newBlog.author}' has been added`, 3.5))
      blogForm.current.toggleVisibility()
    } catch (error) {
      console.log(error)
      if(error.response.data) {
        dispatch(notifyWithTimeout(error.response.data.error, 3.5))
      } else {
        dispatch(notifyWithTimeout(error, 3.5))
      }
    }
  }

  const handleLikeABlog = async (e, blogData) => {
    e.preventDefault()

    try {
      dispatch(likeBlog(blogData))
      dispatch(notifyWithTimeout('Blog successfully liked 👍', 3.5))
    } catch (error) {
      console.log(error)
      if(error.response.data) {
        dispatch(notifyWithTimeout(error.response.data.error, 3.5))
      } else {
        dispatch(notifyWithTimeout(error, 3.5))
      }
    }

  }

  const handleDeleteBlog = async (e, blog) => {
    e.preventDefault()

    if(!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) return

    try {
      dispatch(deleteBlog(blog.id))
      dispatch(notifyWithTimeout('Blog successfully deleted', 3.5))
    } catch(error) {
      console.log(error)
      if(error.response.data) {
        dispatch(notifyWithTimeout(error.response.data.error, 3.5))
      } else {
        dispatch(notifyWithTimeout(error, 3.5))
      }
    }
  }

  const handleCommentBlog = async (e, blog, comment) => {
    e.preventDefault()

    if(!comment || comment.trim() === '') {
      dispatch(notifyWithTimeout('You need to write a comment before submit', 3.5))
      return
    }

    try {
      dispatch(addCommentToBlog(blog.id, comment))
      dispatch(notifyWithTimeout('Comment added to a blog successfully', 3.5))
    } catch(error) {
      console.log(error)
      if(error.response.data) {
        dispatch(notifyWithTimeout(error.response.data.error, 3.5))
      } else {
        dispatch(notifyWithTimeout(error, 3.5))
      }
    }
  }

  console.log(user)

  return (
    <div>
      {user && <UserNav user={user} handleLogout={handleLogout} />}
      {notificationMessage !== null && <Alert severity='info' sx={{ mb: 1, mt: 1 }}>{notificationMessage}</Alert>}
      <Routes>
        <Route path='/' element={!user ?
          (<LoginForm
            username={username}
            password={password}
            handleLogin={handleLogin}
            setPassword={setPassword}
            setUsername={setUsername}
          />) :
          (<>
            <Toggable buttonLabel='Create blog' ref={blogForm}>
              <BlogForm handleSubmitNewBlog={handleSubmitNewBlog} />
            </Toggable>
            <Typography variant='h3' sx={{ textAlign: 'center', letterSpacing: '20px', textShadow: '2px 2px 2px green' }}>
              BLOGS
            </Typography>
            <Box sx={boxStyles}>
              {blogs.map(blog =>
                <Blog
                  key={blog.id}
                  blog={blog}
                  user={user}
                  handleDelete={handleDeleteBlog}
                />
              )}
            </Box>
          </>)} />
        <Route path='/users' element={ <UsersData /> } />
        <Route path='/users/:id' element={ <UserBlogs /> } />
        <Route path='/blogs/:id' element={ <BlogDetails handleLikes={handleLikeABlog} handleComment={handleCommentBlog} /> } />
      </Routes>
    </div>
  )
}

export default App


