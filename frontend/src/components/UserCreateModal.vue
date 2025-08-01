<template>
  <q-dialog v-model="internalShow" persistent>
    <q-card style="min-width: 600px;" >
      <q-card-section class="row items-center q-pb-none bg-dark text-white">
        <q-icon name="person_add" class="q-mr-sm" />
        <div class="text-h6">Criar novo usuário</div>
         <q-space />
          <q-btn icon="close" flat round dense @click="closeModalUser" />
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
        <q-btn flat label="Fechar" @click="closeModalUser" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import AuthForm from '@/components/Auth/AuthForm.vue'
import { notifySuccess, notifyError } from '@/utils/notify'

export default {
  name: 'UserCreateModal',
  components: { 
    AuthForm 
  },

  props: {
    show: Boolean
  },

  data() {
    return {
      loading: false,
      error: '',
      errors: {}
    }
  },

  computed: {
    internalShow: {
      get() {
        return this.show
      },
      set(val) {
        if (!val) this.reset()
        this.$emit('update:show', val)
      }
    }
  },

  methods: {

    ...mapActions('user', ['createUser']),

    reset() {
      this.error = ''
      this.errors = {}
    },

    async handleSubmit(formData) {
      this.loading = true
      this.error = ''
      this.errors = {}

      try {
        await this.createUser(formData)
        notifySuccess('Usuário criado com sucesso!')
        this.internalShow = false
      } catch (error) {
        this.error = error?.response?.data?.message || 'Erro ao criar usuário.'
        this.errors = error?.response?.data?.errors || {}
        notifyError("Erro ao criar usuario, Tente novamente")
      } finally {
        this.loading = false
      }
    },
    closeModalUser(){
        this.internalShow = false
    }
  }
}
</script>