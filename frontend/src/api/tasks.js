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

  async update(id, data) {
    const response = await api.put(`/tasks/${id}`, data)
    return response.data
  },

  async updateStatus(id, data) {
    const response = await api.patch(`/tasks/${id}/status`, data)
    return response.data
  },

  async delete(id) {
    const response = await api.delete(`/tasks/${id}`)
    return response.data
  }

}