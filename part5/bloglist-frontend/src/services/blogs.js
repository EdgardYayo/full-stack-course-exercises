import axios from 'axios'
const baseUrl = '/api/blogs'

const getToken = () => {
  let user = localStorage.getItem('userOfBlogsApp')

  let token
  if(user) {
    user = JSON.parse(user)
    console.log(user)

    token = `Bearer ${user.TOKEN}`
  }

  return token
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log(response)

  return response.data
}

const createNewBlog = async (newBlog) => {
  let token = getToken()
  console.log(token)

  let config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)

  return response.data
}

const putLikesIntoABlog = async (blogData) => {
  const response = await axios.put(`${baseUrl}/${blogData.id}`, blogData)

  return response.data
}

const deleteBlog = async (blogId) => {
  let token = getToken()

  let config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${blogId}`, config)

  return response.data
}

export default { getAll, createNewBlog, putLikesIntoABlog, deleteBlog }