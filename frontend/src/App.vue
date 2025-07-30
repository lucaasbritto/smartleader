<template>
  <q-layout view="hHh lpR fFf">
    <AppHeader v-if="isLoggedIn" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script >
import AppHeader from '@/components/Header.vue'
import { mapState } from 'vuex'

  export default {
    name: 'App',
    components: {
      AppHeader
    },
    computed: {
       ...mapState('user', ['user']),
      isLoggedIn() {
        return !!this.user
      }
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
