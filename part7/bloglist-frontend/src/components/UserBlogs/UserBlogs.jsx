import { List, ListItem, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const listItemStyles = {
  m: 0,
  fontStyle: 'italic',
  color: 'blue'
}

const UserBlogs = () => {
  const id = useParams().id
  const users = useSelector(state => state.users)
  let user = users.filter((user) => user.id === id)

  if(user.length > 0) {
    user = user.at(0)
  }

  return (
    <>
      <Typography variant='h4' sx={{ m: 1 }}>{user.name}</Typography>
      <div>
        <List dense>
          {user.blogs.length > 0
            ? user.blogs.map((blog) => <ListItem divider sx={listItemStyles} key={blog.id}>{blog.title}</ListItem>)
            : <Typography sx={{ fontWeight: 'bold' }}>This user has no blogs</Typography>}
        </List>
      </div>
    </>
  )

}

export default UserBlogs