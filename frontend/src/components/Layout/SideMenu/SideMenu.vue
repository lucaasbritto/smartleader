<template>
  <q-drawer
    show-if-above
    side="left"
    :width="220"
    class="bg-dark flex flex-column"
  >
    <div class="q-pa-md drawer-header text-grey">
      <q-icon name="dashboard" size="18px" class="q-mr-sm" />
      <div class="drawer-title">Dashboard</div>
    </div>

    <q-list
      padding
      class="menu-list flex-grow scroll"
      style="overflow-y:auto;"
    >    

      <div class="section-title q-mt-md">
        <q-icon name="assignment" size="12px" class="section-icon" />
        Tarefas
      </div>
      <q-item clickable v-ripple to="/" exact active-class="menu-item-active" dense>
        <q-item-section avatar>
          <q-icon name="checklist" size="14px" />
        </q-item-section>
        <q-item-section> Gerenciar Tarefas </q-item-section>
      </q-item>

      <template v-if="isAdmin">
        <div class="section-title">
          <q-icon name="person" size="12px" class="section-icon" />
          Usuários
        </div>
        <q-item clickable v-ripple to="/users/new" exact active-class="menu-item-active" dense>
          <q-item-section avatar>
            <q-icon name="person_add" size="14px" />
          </q-item-section>
          <q-item-section> Novo Usuário </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/users" exact active-class="menu-item-active" dense>
          <q-item-section avatar>
            <q-icon name="group" size="14px" />
          </q-item-section>
          <q-item-section> Listar Usuários </q-item-section>
        </q-item>
      </template>


      <div class="section-title q-mt-md">
        <q-icon name="file_download" size="12px" class="section-icon" />
        Exportações
      </div>
      <q-item clickable v-ripple to="/exports" active-class="menu-item-active" dense>
        <q-item-section avatar>
          <q-icon name="cloud_download" size="14px" />
        </q-item-section>
        <q-item-section> Arquivos Exportados </q-item-section>
      </q-item>
    </q-list>

  </q-drawer>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'SideMenu',
    computed: {
      ...mapGetters('user', ['user']),
      isAdmin() {
        console.log(this.user);
        return this.user?.is_admin === 1
      }
    }
  }

</script>

<style scoped lang="scss">
  @use './SideMenu.scss'; 

</style>
