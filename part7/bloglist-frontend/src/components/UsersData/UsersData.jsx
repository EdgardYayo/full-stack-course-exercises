import { Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const linkStyles = {
  color: 'black',
  textDecoration: 'none'
}

const tableCellStyles = {
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-3px)',
    '& .user-link': {
      color: 'green !important'
    }
  }
}

const UsersData = () => {
  const users = useSelector(state => state.users)

  console.log(users)
  return (
    <section>
      <Typography variant='h3' sx={{ m: 1 }}>Users</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Usernames</TableCell>
            <TableCell><b>Blogs created</b></TableCell>
          </TableRow>
        </TableHead>
        {users.map((user) => {
          return <TableBody key={user.id}>
            <TableRow>
              <Tooltip title='See user details' placement='bottom-start' arrow>
                <TableCell sx={tableCellStyles}>
                  <Link className='user-link' style={linkStyles} to={`/users/${user.id}`}>{user.username}</Link>
                </TableCell>
              </Tooltip>
              <TableCell>
                {user.blogs.length}
              </TableCell>
            </TableRow>
          </TableBody>
        })}
      </Table>
    </section>
  )
}

export default UsersData