import { login as apiLogin, logout as apiLogout, register as apiRegister } from '../api/auth'
import { getUserProfile, Usercreate, listUsers  } from '../api/user'

const state = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  users: [], 
}

const getters = {
  isAuthenticated: state => !!state.token,
  userName: state => (state.user ? state.user.name : 'Visitante'),
  user: state => state.user,
  users: state => state.users,
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
  addUser(state, user) {
    state.users.push(user)
  },
  setUsers(state, users) {
    state.users = users
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
  async register({ commit }, data) {
    const { token, user } = await apiRegister(data)
    commit('setToken', token)
    commit('setUser', user)
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    return { token, user }
  },
  async createUser({ commit }, data) {  
     const response = await Usercreate(data)   
    
    commit('addUser', response) 
  },
  async fetchUsers({ commit }) { 
    const response = await listUsers()
    commit('setUsers', response.data)
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