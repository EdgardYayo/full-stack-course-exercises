import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm/BlogForm'
import Toggable from './components/Toggable/Toggable'
import LoginForm from './components/LoginForm/LoginForm'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [message, setMessage] = useState(null)
  const blogForm = useRef()

  useEffect(() => {
    const getBlogs = async () => {
      let blogs = await blogService.getAll()
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    }

    getBlogs()
  }, [])

  useEffect(() => {
    let currentUser = localStorage.getItem('userOfBlogsApp')
    if (currentUser) {
      setUser(JSON.parse(currentUser))
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!username || !password) {
      setMessage('The username and the password are required')
      setTimeout(() => setMessage(null), 4000)
    }

    try {
      let userLogged = await loginService.logIn(username.trim(), password)
      setUser(userLogged)
      setMessage('Successfull log in')
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      console.log(error)
      setMessage(error.response.data.error)
      setTimeout(() => setMessage(null), 3500)
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.clear()
    setMessage('User logged out')
    setTimeout(() => {
      setMessage(null),
      window.location.reload()
    }, 1800)

  }

  const handleSubmitNewBlog = async (e, newBlog, setNewBlog) => {
    e.preventDefault()

    console.log(blogForm.current, blogForm)

    try{
      let newBlogPosted = await blogService.createNewBlog(newBlog)
      setNewBlog({
        title: '',
        author: '',
        url: ''
      })
      setMessage(`A new blog with the title '${newBlogPosted.title}' by '${newBlogPosted.author}' has been added`)
      blogForm.current.toggleVisibility()
      let currentBlogs = [...blogs, newBlogPosted]
      setBlogs(currentBlogs.sort((a, b) => b.likes - a.likes))
      setTimeout(() => setMessage(null), 3500)
    } catch (error) {
      console.log(error)
      if(error.response.data) {
        setMessage(error.response.data.error)
      } else {
        setMessage(error)
      }
      setTimeout(() => setMessage(null), 3500)
    }
  }

  const handleLikeABlog = async (e, blogData) => {
    e.preventDefault()

    try {
      let likedBlog = await blogService.putLikesIntoABlog(blogData)
      console.log(likedBlog, 'BLOG-BACK')

      setBlogs(blogs.map((b) => {
        if(b.id === likedBlog.id) {
          return {
            ...likedBlog
          }
        }
        return { ...b }
      }).sort((a,b) => b.likes - a.likes))
      setMessage('Blog successfully liked 👍')
      setTimeout(() => setMessage(null), 3500)
    } catch (error) {
      console.log(error)
      if(error.response.data) {
        setMessage(error.response.data.error)
      } else {
        setMessage(error)
      }
      setTimeout(() => setMessage(null), 3500)
    }

  }

  const handleDeleteBlog = async (e, blog) => {
    e.preventDefault()

    if(!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) return

    try {
      let deletedBlog = await blogService.deleteBlog(blog.id)
      setBlogs(blogs.filter((b) => b.id !== blog.id))
      setMessage('Blog successfully deleted')
      setTimeout(() => setMessage(null), 3500)
    } catch(error) {
      console.log(error)
      if(error.response.data) {
        setMessage(error.response.data.error)
      } else {
        setMessage(error)
      }
      setTimeout(() => setMessage(null), 3500)
    }
  }

  return (
    <div>
      {message !== null && <p data-testid="message" className='messageInfo'>{message}</p>}
      {user === null ?
        (<LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          setPassword={setPassword}
          setUsername={setUsername}
        />) :
        (<>
          <h2>
            {user.name} logged in
            <button
              data-testid="logout-button"
              onClick={handleLogout}>
              Log out
            </button>
          </h2>
          <Toggable buttonLabel='create blog' ref={blogForm}>
            <BlogForm handleSubmitNewBlog={handleSubmitNewBlog} />
          </Toggable>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              handleLikes={handleLikeABlog}
              user={user}
              handleDelete={handleDeleteBlog} />
          )}
        </>)}
    </div>
  )
}

export default App


