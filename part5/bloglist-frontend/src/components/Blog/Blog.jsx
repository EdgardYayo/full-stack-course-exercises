import { useState } from 'react'
import { jwtDecode }  from 'jwt-decode'

const blogStyles = {
  padding: '0.5rem',
  marginBlock: '0.3rem',
  border: 'solid black 3px',
  borderRadius: '0.3rem'
}

const deleteButtonStyles = {
  background: 'red',
  color: 'white',
  border: 'none',
  padding: '0.5rem',
  borderRadius: '0.3rem',
  cursor: 'pointer'
}

const Blog = ({ blog, handleLikes, user, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleVisible = () => setShowDetails(!showDetails)

  const increaseAndSentLikes = (e) => {
    let modifiedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    console.log(modifiedBlog)

    // return
    handleLikes(e, modifiedBlog)
  }

  let userId
  if(user) {
    userId = jwtDecode(user.TOKEN).id
  }

  return (
    <section data-testid="blog-item" style={blogStyles}>
      <div>
        <span data-testid="blog-title">
          {blog.title}
        </span>
        <span data-testid="blog-author">
          {blog.author}
        </span>
        <button
          data-testid="view-blog-details-button"
          onClick={toggleVisible}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      {showDetails && (<div>
        <p>{blog.url}</p>
        <p data-testid="blog-likes">{blog.likes}
          <button
            data-testid="like-button"
            onClick={increaseAndSentLikes}
            style={{ marginInlineStart: '0.2rem' }}>
            like
          </button>
        </p>
        <p>{blog?.user?.name ?? 'Without username' }</p>
        <button
          data-testid="delete-blog-button"
          style={{
            ...deleteButtonStyles,
            display: userId === blog?.user?.id ? '' : 'none'
          }}
          onClick={(e) => handleDelete(e, blog)}
        >
          Remove blog X
        </button>
      </div>)}
    </section>
  )
}

export default Blog