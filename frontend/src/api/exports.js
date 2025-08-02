import api from './index'

export default {
  async getExports() {
    const response = await api.get('/exports')
    return response
  },

  async exportTasks() {
    const response = await api.post('/exports')
    return response
  },

  async downloadExport(id) {
    return await api.get(`/exports/${id}/download`, {
      responseType: 'blob'
    })
  }

}
