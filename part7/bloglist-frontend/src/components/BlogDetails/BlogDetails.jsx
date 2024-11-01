import { Box, Button, Card, Link, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const buttonStyles = {
  textTransform: 'none',
  ml: 2
}

const boxStyles = {
  display: 'flex',
  alignItem: 'center',
  gap: '0.3rem'
}

const cardStyles = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItem: 'center',
  width: '60%',
  m: '2rem auto',
  p: 2,
  '@media (max-width: 900px)': {
    flexWrap: 'wrap',
    width: '90%'
  }
}

const typographyPAndLinkStyles = {
  fontSize: '1.5rem'
}

const BlogDetails = ({ handleLikes, handleComment }) => {
  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  let blog = blogs.filter((blog) => blog.id === id)
  const [comment, setComment] = useState('')
  console.log(blog)


  if(blog.length > 0) {
    blog = blog.at(0)
  }

  const increaseAndSentLikes = (e) => {
    let modifiedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    console.log(modifiedBlog)

    // return
    handleLikes(e, modifiedBlog)
  }

  const addComment = (e, blog, comment) => {
    handleComment(e, blog, comment)

    setComment('')
  }

  return (
    <>
      <Typography variant='h3' sx={{ m: 0.5, mt: 1, textAlign: 'center' }}>{blog.title}</Typography>
      <Card sx={cardStyles} raised>
        <Box sx={{ ...boxStyles, flexDirection: 'column' }}>
          <Link sx={typographyPAndLinkStyles} color={'success'} href={`${blog.url}`} target="_blank" rel="noreferrer">{blog.url}</Link>
          <Typography variant='p' sx={typographyPAndLinkStyles}>
            {blog.likes} likes
            <Button sx={buttonStyles} variant='contained' color={'info'} onClick={increaseAndSentLikes}>Like</Button>
          </Typography>
          <Typography variant='p' sx={typographyPAndLinkStyles}>added by {blog?.user ? blog?.user.username : 'Anonymous'}</Typography>
        </Box>
        <div>
          <Typography variant='h5'>Comments</Typography>
          <Box sx={boxStyles}>
            <TextField
              color='success'
              variant='standard'
              label='Comment'
              type='text'
              name={'comment'}
              value={comment}
              onChange={(e) => setComment(e.target.value)} />
            <Button sx={buttonStyles} variant='contained' color={'info'} onClick={(e) => addComment(e, blog, comment)}>Add comment</Button>
          </Box>
          <ul>
            {blog?.comments?.length
              ? blog.comments.map((comment, i) => <li key={comment + i}>{comment}</li>)
              : <li>This blog has no comments</li>}
          </ul>
        </div>
      </Card>
    </>
  )
}

export default BlogDetails