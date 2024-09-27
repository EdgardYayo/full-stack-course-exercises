import PropTypes from 'prop-types'

const LoginForm = ({ username, password, handleLogin, setUsername, setPassword }) => {
  return (
    <form
      data-testid="loginForm"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}
      onSubmit={handleLogin}>
      <h2>Please log in to see your blogs</h2>
      <label>
        Username
        <input
          data-testid="username-input"
          style={{ marginInline: '0.5rem' }}
          name='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
      <label>
        Password
        <input
          data-testid="password-input"
          type='password'
          style={{ marginInline: '0.5rem' }}
          name='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <button
        data-testid="login-button"
        style={{ alignSelf: 'flex-start' }}
        type='submit'
      >
        Login
      </button>
    </form>
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