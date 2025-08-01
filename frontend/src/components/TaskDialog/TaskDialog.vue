<template>
  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 600px;">
      <q-card-section class="row items-center q-pb-none bg-dark text-white">
        <div class="text-h6">{{ isEdit ? 'Editar Tarefa' : 'Nova Tarefa' }}</div>
         <q-space />
          <q-btn icon="close" flat round dense @click="close" />
      </q-card-section>

      <q-card-section>
        <task-form
          :initialData="taskData"
          :loading="loading"
          :is-edit-mode="isEditMode"
          @submit="handleSubmit"
          @cancel="close"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
  import TaskDialogScript from './TaskDialog.js'

  export default TaskDialogScript

</script>