import api from './index.js'

export async function getUserProfile() {
  const response = await api.get('/me')
  return response.data
}

export async function Usercreate(data) {
  const response = await api.post('/users', data)
  return response.data
}
