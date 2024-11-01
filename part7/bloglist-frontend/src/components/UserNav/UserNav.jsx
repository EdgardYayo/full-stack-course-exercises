import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const linkStyle = {
  textDecoration: 'none',
  color: 'inherit',
}

const typographyLinks = {
  color: 'white',
  transition: 'all ease 250ms',

  '&:hover': {
    borderRadius: '0.1rem',
    outline: '1px solid white',
    outlineOffset: '6px'
  }
}

const UserNav = ({ user, handleLogout }) => {

  return (
    <AppBar position='sticky' sx={{ background: 'green' }}>
      <Container maxWidth={'xl'}>
        <Toolbar disableGutters sx={{ display: 'flex', gap: '1rem', fontFamily: 'monospace' }}>
          <Typography variant='h5' sx={typographyLinks}>
            <Link style={linkStyle} to={'/'}>Blogs</Link>
          </Typography>
          <Typography variant='h5' sx={typographyLinks}>
            <Link style={linkStyle} to={'/users'}>User</Link>
          </Typography>
          <Typography variant='h5' sx={{ fontWeight: 'bold', marginInlineStart: 'auto' }}>
            <i>{user.name}</i> Logged in
          </Typography>
          <Button
            sx={{ textTransform: 'none' }}
            data-testid="logout-button"
            variant='contained'
            color='info'
            onClick={handleLogout}>
              Log out
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default UserNav