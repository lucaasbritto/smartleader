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
          v-if="user?.is_admin"
          flat
          dense
          icon="settings"
          color="grey-4"
          size="sm"
        >
          <q-menu 
            v-model="settingsMenu"           
            transition-show="jump-down"
            transition-hide="jump-up"
            class="q-mt-md"
            cover auto-close
            >
            <q-list style="min-width: 200px">
              <q-item class="bg-grey text-white">
              <q-item-section avatar>
                <q-icon name="settings" size="sm"/>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-subtitle4">Configurações</q-item-label>
              </q-item-section>
            </q-item>

            
              <q-item clickable v-close-popup @click="showCreateUserModal = true">
                <q-item-section avatar>
                  <q-icon name="person_add" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Criar Usuário</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-separator v-if="user?.is_admin" vertical color="grey-8" class="q-mx-sm"/>

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

      <user-create-modal
        :show.sync="showCreateUserModal"        
      />
    </div>
  </q-header>
</template>

<script>
import headerScript from './Header.js'

export default headerScript

</script>


<style scoped lang="scss">
  @use './Header.scss'; 

</style>