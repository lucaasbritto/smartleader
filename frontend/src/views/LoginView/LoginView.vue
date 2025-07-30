<template>
  <div class="q-pa-md flex flex-center login-page">    
    <q-card class="q-pa-xl login-card" style="">
      <div class="text-center q-mb-md" style="">
        <img src="@/assets/images/logo-smart.svg" alt="Logo" class="logo q-mb-sm" />

        <div class="text-grey">Acesso ao sistema de gestão</div>
      </div>

      <auth-form
        :loading="loading"
        :error="error"
        @submit="onLogin"
      />

      <div class="text-center q-mt-md">
        <q-btn flat label="Criar conta" @click="$router.push('/register')" color="primary" />
      </div>

      <div class="text-center q-mt-md text-grey-6 text-caption">
        © 2025 SmartLeader
      </div>
    </q-card>
  </div>
</template>

<script>
import loginViewScript from './LoginView.js'

export default loginViewScript


</script>

<style lang="scss" scoped>
    @use './LoginView.scss'; 
</style>