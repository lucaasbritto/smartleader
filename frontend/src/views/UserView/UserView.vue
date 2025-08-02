<template>
  <div class="q-pa-md">
    <q-card style="max-width: 600px; margin: auto;">
      <q-card-section class="row items-center q-pb-none bg-dark text-white">
        <q-icon name="person_add" class="q-mr-sm" />
        <div class="text-h6">Criar novo usuário</div>
      </q-card-section>

      <q-card-section>
        <auth-form
          :mode="'registerUser'"
          :loading="loading"
          :error="error"
          :errors="errors"
          @submit="handleSubmit"
        />
      </q-card-section>

      <q-card-actions align="right" class="q-pt-none">
        <q-btn label="Voltar" flat @click="$router.back()" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
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
</script>