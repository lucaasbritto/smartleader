import { login } from '@/services/auth'
import AuthForm from '@/components/Auth/AuthForm.vue'

export default {
  name: 'LoginView',
  components: {
    AuthForm
  },
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      error: null,
    }
  },
  methods: {
    async onLogin(payload) {
      this.error = null
      this.loading = true
       const err = await login(payload)
      if (err) this.error = err
      this.loading = false
    }
  }
}
