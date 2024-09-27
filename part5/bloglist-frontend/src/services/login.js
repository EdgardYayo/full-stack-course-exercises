import axios from 'axios'
const baseUrl = '/api/login'

const logIn = async (username, password) => {
  const response = await axios.post(baseUrl, { username, password })

  console.log('response', response)

  if(response.status === 200 || response.status === 201) {
    localStorage.setItem('userOfBlogsApp', JSON.stringify(response.data))
  }

  return response.data
}

export default { logIn }