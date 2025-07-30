import store from '@/stores'
import router from '@/router'

export async function login({ email, password }) {
  try {
    await store.dispatch('user/login', { email, password })
    await router.push('/')
    return null
  } catch (err) {
    return err.message || 'Erro ao fazer login'
  }
}

export async function register(data) {
  try {
    await store.dispatch('user/register', data)
    await router.push('/')
    return null
  } catch (err) {
    return err.message || 'Erro ao registrar'
  }
}