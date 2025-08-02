<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section class="row items-center q-pa-xs bg-dark text-white">
        <q-icon name="person" class="q-mr-xs" />
        <div class="text-subtitle2">Usuários Cadastrados</div>
      </q-card-section>

      <q-card-section>
        <q-table
          :data="users"
          :columns="columns"
          row-key="id"
          flat
          dense
          :loading="loading"
          :pagination="{ rowsPerPage: 10 }"
          no-data-label="Nenhum usuário encontrado"
          class="my-table"
        >

        <template v-slot:body-cell-is_admin="props">
            <q-td :props="props" align="center">
              <q-badge
                :color="props.row.is_admin ? 'blue' : 'green'"
                :label="props.row.is_admin ? 'Admin' : 'Usuário'"
                align="center"
              />
            </q-td>
          </template>
        </q-table>

      </q-card-section>
    </q-card>
  </div>
</template>

<script>
    import UserListViewScript from './UserListView.js'

    export default UserListViewScript

</script>

<style scoped lang="scss">
  @use './UserListView.scss'; 

</style>

