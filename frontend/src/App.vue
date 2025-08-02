<template>
  <q-layout view="hHh LpR fFf">
    <AppHeader v-if="isLoggedIn" />

    <side-menu v-if="isLoggedIn" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script >
import AppHeader from '@/components/Layout/Header/Header.vue'
import SideMenu from '@/components/Layout/SideMenu/SideMenu.vue'
import { mapState } from 'vuex'

  export default {
    name: 'App',
    components: {
      AppHeader,
      SideMenu
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
</style>
