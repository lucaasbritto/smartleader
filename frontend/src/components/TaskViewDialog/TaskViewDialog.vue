<template>
  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 700px; max-width: 900px">
      <q-card-section class="row items-center q-pa-md bg-dark text-white">
        <q-icon name="info" class="q-mr-sm" />
        <div class="text-h6">Detalhes da Tarefa</div>
        <q-space />
        <q-btn dense flat icon="close" @click="close" />
      </q-card-section>

      <q-separator />

      <q-card-section>
        <task-view :task="task" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Fechar" color="primary" @click="close" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
  import TaskViewDialogScript from './TaskViewDialog.js'

  export default TaskViewDialogScript

</script>