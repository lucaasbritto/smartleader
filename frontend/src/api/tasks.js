import api from './index'

export default {
  async getAll(params = {}) {
    const response = await api.get('/tasks', { params })
    return response.data
  },

}