<template>
  <div class="q-pa-md">
    <q-card flat bordered class="bg-grey-1 q-pa-md rounded-borders shadow-1">
      
      <div class="field">
        <q-icon name="title" class="field-icon" />
        <span class="field-label">Título:</span>
        <span class="field-value" :title="task.title">{{ task.title || '-' }}</span>
      </div>

      <div class="field">
        <q-icon name="subject" class="field-icon" />
        <span class="field-label">Descrição:</span>
        <span class="field-value" :title="task.description">{{ task.description || '-' }}</span>
      </div>

      <div class="field">
        <q-icon name="event" class="field-icon" />
        <span class="field-label">Prazo:</span>
        <span class="field-value">{{ formatDateBR(task.deadline) || '-' }}</span>
      </div>

      <div class="field">
        <q-icon name="priority_high" class="field-icon" />
        <span class="field-label">Prioridade:</span>
        <q-badge :color="getPriorityColor(task)" class="field-badge" rounded>
          {{ task.priority || '-' }}
        </q-badge>
      </div>

      <div class="field">
        <q-icon name="assignment_turned_in" class="field-icon" />
        <span class="field-label">Status:</span>
        <q-badge :color="getStatusColor(task)" class="field-badge" rounded>
          {{ task.status || '-' }}
        </q-badge>
      </div>

      <div class="field">
        <q-icon name="person" class="field-icon" />
        <span class="field-label">Responsável:</span>
        <span class="field-value">{{ task.user.name || '-' }}</span>
      </div>

      <div class="field">
        <q-icon name="calendar_today" class="field-icon" />
        <span class="field-label">Criado em:</span>
        <span class="field-value">{{ formatDateBR(task.created_at) || '-' }}</span>
      </div>
    </q-card>
  </div>
</template>

<script>
  import TaskViewScript from './TaskView.js'

  export default TaskViewScript

</script>

<style scoped lang="scss">
  @use './TaskView.scss'; 

</style>
