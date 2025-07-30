import { login as apiLogin, logout as apiLogout } from '../api/auth'
import { getUserProfile } from '../api/user'

const state = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
}

const getters = {
  isAuthenticated: state => !!state.token,
  userName: state => (state.user ? state.user.name : 'Visitante'),
}

const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setToken(state, token) {
    state.token = token
  },
  clearAuth(state) {
    state.user = null
    state.token = null
  },
}

const actions = {
  async login({ commit }, { email, password }) {
    const { token, user } = await apiLogin(email, password)
    commit('setToken', token)
    commit('setUser', user)
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  },
  async fetchUser({ commit, dispatch }) {
    try {
      const user = await getUserProfile()
      commit('setUser', user)
      localStorage.setItem('user', JSON.stringify(user))
    } catch (err) {
      dispatch('logout')
    }
  },
  logout({ commit }) {
    apiLogout()
    commit('clearAuth')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}