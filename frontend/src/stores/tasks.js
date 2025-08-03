import tasksApi from '@/api/tasks'

const state = {
  tasks: [],
  total: 0
}

const mutations = {
  SET_TASKS(state, response) {
    state.tasks = response.data
    state.total = response.total
  },

  ADD_TASK(state, task) {
    state.tasks.unshift(task)
  },

  UPDATE_TASK(state, updatedTask) {
    const index = state.tasks.findIndex(t => t.id === updatedTask.id)
    if (index !== -1) {
      state.tasks.splice(index, 1, updatedTask)
    }
  },

  REMOVE_TASK(state, taskId) {
    state.tasks = state.tasks.filter(t => t.id !== taskId)
    state.total -= 1
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

  async createTask({ commit }, data) {
    try {
      const response = await tasksApi.create(data)
      commit('ADD_TASK', response)
    } catch (error) {
      console.error('Erro ao criar tarefa:', error)
      throw error
    }
  },

  async updateTask({ commit }, { id, data }) {
    try {
      const response = await tasksApi.update(id, data)
      commit('UPDATE_TASK', response)
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error)
      throw error
    }
  },

  async updateStatusTask({ commit }, { id, status = 'concluido' }) {
    try {
      const response =  await tasksApi.updateStatus(id, { status })
      commit('UPDATE_TASK', response)
    } catch (error) {
      console.error('Erro ao marcar como concluída:', error)
    }
  },

  async deleteTask({ commit }, taskId) {
    try {
      await tasksApi.delete(taskId)
      commit('REMOVE_TASK', taskId)
    } catch (error) {
      console.error('Erro ao Excluir a tarefa:', error)
      throw error
    }
  },

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