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
      commit('SET_TASKS', response)

    } catch (error) {
      console.error('Erro ao buscar tarefas:', error)
    }
  },

  async createTask({ dispatch }, data) {
    try {
      await tasksApi.create(data)
      await dispatch('fetchTasks')
    } catch (error) {
      console.error('Erro ao criar tarefa:', error)
      throw error
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