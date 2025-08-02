import AuthForm from '@/components/Auth/AuthForm.vue'
import { mapActions } from 'vuex'
import { notifySuccess, notifyError } from '@/utils/notify'

export default {
  name: 'UserCreatePage',
  components: { AuthForm },
  data() {
    return {
      loading: false,
      error: '',
      errors: {}
    }
  },
  methods: {
    ...mapActions('user', ['createUser']),

    async handleSubmit(formData) {
      this.loading = true
      this.error = ''
      this.errors = {}

      try {
        await this.createUser(formData)
        notifySuccess('Usuário criado com sucesso!')
        this.$router.push('/users/')
      } catch (error) {
        this.error = error?.response?.data?.message || 'Erro ao criar usuário.'
        this.errors = error?.response?.data?.errors || {}
        notifyError("Erro ao criar usuário. Tente novamente.")
      } finally {
        this.loading = false
      }
    }
  }
}