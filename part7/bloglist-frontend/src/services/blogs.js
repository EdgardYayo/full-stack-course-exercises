import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log(response)

  return response.data
}

const createNewBlog = async (newBlog, token) => {
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

const deleteBlog = async (blogId, token) => {
  let config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${blogId}`, config)

  return response.data
}

const commentBlog = async (blogId, comment) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, { comment })
  return response.data
}

export default { getAll, createNewBlog, putLikesIntoABlog, deleteBlog, commentBlog }