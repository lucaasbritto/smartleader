import api from './index'

export default {
  async getAll(params = {}) {
    const response = await api.get('/tasks', { params })
    return response.data
  },

  async create(data) {
    const response = await api.post('/tasks', data)
    return response.data
  },
}