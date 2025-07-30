<template>
  <div class="container py-5">
    <h1 class="mb-4">Bem-vindo!</h1>
    <q-btn 
          label="Sair"
          color="negative"
          icon="logout"
          @click="logout"
          unelevated
        />
  </div>
</template>

<script>
export default {
  computed: {
    userName() {
      return this.$store.getters['user/userName']
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout')
      this.$router.push('/login')
    }
  }
}
</script>