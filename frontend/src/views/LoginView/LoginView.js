export default {
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      error: null,
    }
  },
  methods: {
    async handleLogin() {
      this.error = null
      this.loading = true
      try {        
        await this.$store.dispatch('user/login', { email: this.email, password: this.password })
            this.$router.push('/')        
      } catch (err) {
        this.error = err.message || 'Erro ao fazer login'
      } finally {
        this.loading = false
      }
    }
  }
}
