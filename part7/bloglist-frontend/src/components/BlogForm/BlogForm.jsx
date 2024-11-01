import { Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'

const BlogForm = ({ handleSubmitNewBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })


  const handleChange = (e) => {
    setNewBlog({
      ...newBlog,
      [e.target.name] : e.target.value
    })
  }

  return (
    <form name='form' style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={(e) => handleSubmitNewBlog(e, newBlog, setNewBlog)}>
      <Typography variant='h6' sx={{ mt: 1 }}>Create a new blog</Typography>
      <TextField
        color='success'
        variant='standard'
        label='Title'
        data-testid="title-input"
        required
        placeholder='title of the new blog...'
        style={{ marginInline: '0.5rem' }}
        name="title"
        value={newBlog.title}
        onChange={handleChange} />
      <TextField
        color='success'
        variant='standard'
        label='Author'
        data-testid="author-input"
        required
        placeholder='author of the new blog...'
        style={{ marginInline: '0.5rem' }}
        name="author"
        value={newBlog.author}
        onChange={handleChange} />
      <TextField
        color='success'
        variant='standard'
        label='Url'
        data-testid="url-input"
        required
        placeholder='url of the new blog...'
        style={{ marginInline: '0.5rem' }}
        name="url"
        value={newBlog.url}
        onChange={handleChange} />
      <Button
        data-testid="create-blog-button"
        style={{ alignSelf: 'flex-start' }}
        variant='contained'
        color={'success'}
        sx={{ textTransform: 'none' }}
        type='submit'>
          Create
      </Button>
    </form>
  )
}

export default BlogForm