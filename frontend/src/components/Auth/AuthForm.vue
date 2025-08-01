<template>
  <q-form @submit.prevent="onSubmit" ref="form">
    <q-input v-model="form.name" label="Nome" v-if="['register', 'registerUser'].includes(mode)" filled :disable="loading" lazy-rules stack-label
             :rules="[val => !!val || 'Nome é obrigatório']" :error="!!errors.name" :error-message="errors.name ? errors.name[0] : ''"/>  

    <q-input v-model="form.email" label="Email" type="email" filled :disable="loading" lazy-rules stack-label
             :rules="[val => !!val || 'Email é obrigatório']" :error="!!errors.email" :error-message="errors.email ? errors.email[0] : ''"/>

    <q-input v-model="form.password" label="Senha" type="password" filled :disable="loading" lazy-rules stack-label
             :rules="[val => !!val || 'Senha é obrigatória']" :error="!!errors.password" :error-message="errors.password ? errors.password[0] : ''"/>

    <q-input v-if="['register', 'registerUser'].includes(mode)" v-model="form.password_confirmation" filled :disable="loading" lazy-rules stack-label
             label="Confirme a senha" type="password"
             :rules="[val => !!val || 'Confirmação obrigatória']" :error="!!errors.password_confirmation" :error-message="errors.password_confirmation ? errors.password_confirmation[0] : ''"/>

    <q-checkbox
      v-if="mode === 'registerUser'" v-model="form.is_admin" label="É administrador?" :disable="loading"
    />

    <q-input v-if="mode === 'register'" v-model="form.company_name" filled :disable="loading" lazy-rules stack-label
             label="Empresa" :rules="[val => !!val || 'Empresa obrigatória']" :error="!!errors.company_name" :error-message="errors.company_name ? errors.company_name[0] : ''"/>

    <q-input v-if="mode === 'register'" v-model="form.company_identifier" filled :disable="loading" lazy-rules stack-label
             label="CNPJ" :rules="[val => !!val || 'CNPJ obrigatório']" :error="!!errors.company_identifier" :error-message="errors.company_identifier ? errors.company_identifier[0] : ''"/>

    <div class="q-mt-md">
        <q-btn 
            :label="buttonLabel" 
            type="submit" 
            class="full-width btn-submit"
            :loading="loading"
            :disable="loading" 
            no-caps
        />
    </div>

  </q-form>
</template>

<script>
export default {
  name: 'AuthForm',
  props: {
    mode: {
      type: String,
      default: 'login'
    },
    loading: Boolean,
    error: String,
    errors: {
        type: Object,
        default: () => ({})
  }
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        company_name: '',
        company_identifier: '',
        is_admin: false
      }
    }
  },
  computed: {
    buttonLabel() {
      switch (this.mode) {
        case 'login':
          return 'Entrar'
        case 'register':
          return 'Registrar'
        case 'registerUser':
          return 'Criar Usuário'
        default:
          return 'Enviar'
      }
    }
  },
  methods: {
    async onSubmit() {
      const isValid = await this.$refs.form.validate()
      if (!isValid) return

      this.$emit('submit', { ...this.form })
    }
  }
}
</script>

<style>
.btn-submit {
  background-color: #f05065 !important;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  border-radius: 12px;
  box-shadow: 0 6px 12px #0080ff88;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover:not(:disabled) {
    background-color: #005bb5;
    box-shadow: 0 8px 18px #005bb588;
  }
}
</style>