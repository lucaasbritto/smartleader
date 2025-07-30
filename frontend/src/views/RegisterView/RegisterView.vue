<template>
  <div class="login-page">
    <q-card class="login-card">
      <div class="text-center">
        <img src="@/assets/images/logo-smart.svg" alt="Logo" class="logo" />
        <div class="text-grey q-mb-md">Crie sua conta</div>
      </div>

      <auth-form
        mode="register"
        :loading="loading"
        :error="error"
        :errors="validationErrors"
        @submit="onRegister"
      />

      <div class="text-center q-mt-md">
        <q-btn
          flat
          label="Já tem uma conta? Login"
          class="text-grey-6"
          @click="$router.push('/login')"
        />
      </div>
    </q-card>
  </div>
</template>


<script>
  import registerViewScript from './RegisterView.js'

  export default registerViewScript

</script>


<style lang="scss" scoped>
    @use './RegisterView.scss'; 
</style>
