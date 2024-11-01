import { jwtDecode }  from 'jwt-decode'
import { Link } from 'react-router-dom'
import { Card, CardContent, Tooltip, Typography } from '@mui/material'

const linkStyles = {
  textDecoration: 'none',
  color: 'black'
}

const blogStyles = {
  padding: '0.1rem',
  marginBlock: '0.3rem',
  border: 'solid green 2px',
  borderRadius: '0.3rem'
}

const cardStyles = {
  transition: 'all ease 250ms',
  '&:hover': {
    transform: 'translateY(-3px)',
    backgroundColor: 'green',
    '& .blog-link': {
      color: 'white',
      fontWeight: 'bold'
    }
  }
}

const Blog = ({ blog, user }) => {

  let userId
  if(user) {
    userId = jwtDecode(user.TOKEN).id
  }

  return (
    <Card data-testid="blog-item" style={blogStyles} sx={cardStyles}>
      <CardContent>
        <Tooltip title='See details' arrow placement='top-start'>
          <Link style={linkStyles} to={`/blogs/${blog.id}`} data-testid="blog-title">
            <Typography variant='h6' className='blog-link'>
              {blog.title}
            </Typography>
          </Link>
        </Tooltip>
      </CardContent>
    </Card>
  )
}

export default Blog