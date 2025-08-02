import exportApi from '@/api/exports'

export default {
  namespaced: true,
  state: {
    exports: []
  },
  getters: {
    exports(state) {
      return state.exports;
    }
  },
  mutations: {
    SET_EXPORTS(state, exports) {
      state.exports = exports;
    }
  },
  actions: {
    async loadExportList({ commit }) {
      try {
        const response = await exportApi.getExports();
        commit('SET_EXPORTS', response.data);
      } catch (error) {
        console.error('Erro ao buscar exportações:', error);
      }
    },

    async triggerExport() {
      try {        
        await exportApi.exportTasks();       
      } catch (error) {
        console.error('Erro ao exportar tarefas:', error);
        throw error;
      }
    },

    async downloadExportFile(_, id) {
      try {
        const response = await exportApi.downloadExport(id);         
        return response
      } catch (error) {
        console.error('Erro ao baixar o arquivo exportado:', error)
        throw error
      }
    }
  }
}
