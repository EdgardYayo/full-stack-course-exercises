import { Button, Container, TextField, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const LoginForm = ({ username, password, handleLogin, setUsername, setPassword }) => {
  return (
    <Container maxWidth={'sm'}>
      <form
        data-testid="loginForm"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
        onSubmit={handleLogin}>
        <Typography variant='h4'>Please log in to see your blogs</Typography>
        <TextField
          color='success'
          variant='standard'
          label='Username'
          data-testid="username-input"
          style={{ marginInline: '0.5rem' }}
          name='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <TextField
          color='success'
          variant='standard'
          label='Password'
          data-testid="password-input"
          type='password'
          style={{ marginInline: '0.5rem' }}
          name='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button
          data-testid="login-button"
          style={{ alignSelf: 'flex-end' }}
          type='submit'
          variant='contained'
          color={'success'}
        >
        Login
        </Button>
      </form>
    </Container>
  )
}

export default LoginForm

LoginForm.prototypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired
}