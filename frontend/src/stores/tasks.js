import tasksApi from '@/api/tasks'

const state = {
  tasks: [],
  total: 0
}

const mutations = {
  SET_TASKS(state, response) {
    state.tasks = response.data
    state.total = response.total
  }
}

const actions = {
  async fetchTasks({ commit }, params = {}) {
    try {
      const response = await tasksApi.getAll(params)
      console.log('Response da API:', response)
      commit('SET_TASKS', response)

    } catch (error) {
      console.error('Erro ao buscar tarefas:', error)
    }
  }
}

const getters = {
  tasks: (state) => state.tasks,
  total: (state) => state.total
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}