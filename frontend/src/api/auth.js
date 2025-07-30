import api from './index'

export async function login(email, password) {
  try {
    const response = await api.post('/login', { email, password })

    return {
      token: response.data.access_token,
      user: response.data.user
    }
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Erro ao tentar fazer login')
  }
}

export async function register(data) {
  try {
    const response = await api.post('/register', data)

    return {
      token: response.data.access_token,
      user: response.data.user
    }
  } catch (error) {
    if (error.response?.status === 422 && error.response?.data?.errors) {      
      const firstFieldErrors = Object.values(error.response.data.errors)
      const firstMessage = firstFieldErrors[0][0]
      throw new Error(firstMessage)
    }

    throw new Error(error.response?.data?.message || 'Erro ao registrar')
  }
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}