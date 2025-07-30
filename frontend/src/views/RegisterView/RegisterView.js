import { register } from '@/services/auth'
import AuthForm from '@/components/Auth/AuthForm.vue'
import { notifySuccess, notifyError } from '@/utils/notify'

export default {
  name: 'RegisterView',
  components: {
    AuthForm
  },
  data() {
    return {
      loading: false,
      error: null,
      validationErrors:{}
    }
  },
  methods: {
    async onRegister(formData) {
      this.loading = true
      this.error = null

      const err = await register(formData)
      if (err){ 
        this.error = err
        notifyError(err)   
      }else{
         notifySuccess('Conta registrada com sucesso!')
      }

      this.loading = false
    }
  },
}