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
      <h2>Create a new blog</h2>
      <label>
          Title
        <input
          data-testid="title-input"
          required
          placeholder='title of the new blog...'
          style={{ marginInline: '0.5rem' }}
          name="title"
          value={newBlog.title}
          onChange={handleChange} />
      </label>
      <label>
          Author
        <input
          data-testid="author-input"
          required
          placeholder='author of the new blog...'
          style={{ marginInline: '0.5rem' }}
          name="author"
          value={newBlog.author}
          onChange={handleChange} />
      </label>
      <label>
          Url
        <input
          data-testid="url-input"
          required
          placeholder='url of the new blog...'
          style={{ marginInline: '0.5rem' }}
          name="url"
          value={newBlog.url}
          onChange={handleChange} />
      </label>
      <button
        data-testid="create-blog-button"
        style={{ alignSelf: 'flex-start' }}
        type='submit'>
          Create
      </button>
    </form>
  )
}

export default BlogForm