<template>
  <q-header elevated class="bg-black text-white q-px-md q-py-xs">
    <div class="row items-center justify-between full-width divHeader" >

      <div class="row items-center">
        <img src="@/assets/images/logo-smart.svg" alt="Logo" height="18" class="q-mr-sm">
      </div>

      <div class="row items-center q-gutter-sm">

        <div class="row items-center">
          <q-avatar size="28px" color="primary" text-color="white">
            <img :src="`https://ui-avatars.com/api/?name=${user.name}&background=f05065&color=fff&bold=true`"  />
          </q-avatar>

          <div class="column q-ml-xs">
            <div class="text-caption text-grey-4 welcomeText">Bem-vindo,</div>
            <div class="text-caption text-weight-bold">{{ user.name }}</div>
          </div>
        </div>

        <q-separator vertical color="grey-8" class="q-mx-sm"/>

        <div class="row items-center q-ml-sm">
          <q-icon name="business" size="18px" class="q-mr-xs" color="primary" />
          <div class="text-caption text-weight-bold">
            {{ user.company.name }}
          </div>
        </div>

        <q-separator vertical color="grey-8" class="q-mx-sm"/>

        <q-btn
          flat
          dense
          icon="logout"
          color="red-4"
          size="sm"
          @click="handleLogout"
          title="Sair"
        />
      </div>

    </div>
  </q-header>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AppHeader',

  computed: {
    ...mapState('user', ['user'])
  },

  methods: {
    ...mapActions('user', ['logout']),

    async handleLogout() {
      await this.logout() 
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

.q-header {
  border-bottom: 1px solid #eee;
}

.text-caption {
  font-size: 14px;
}

.welcomeText{
    font-size: 11px; 
    line-height: 1;
}

.q-separator{
    height: 32px; 
    opacity: 0.5; background:red
}
</style>