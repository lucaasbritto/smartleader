<template>
  <q-drawer
    show-if-above
    side="left"
    bordered
    class="bg-grey-1"
  >
    <div class="q-pa-md">
      <div class="text-h6">Filtros</div>

      <q-input filled label="Pesquisar..." dense class="q-my-sm" />
      <q-btn label="Filtrar" color="primary" class="full-width" />
    </div>
  </q-drawer>
</template>

<script>
export default {
  name: 'SideMenu'
}
</script>