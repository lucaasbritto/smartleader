<template>
  <q-form @submit.prevent="submit">
    <q-input
      v-model="form.title"
      label="Título"
      outlined
      dense
      clearable
      class="full-width"
      autofocus
      :rules="[val => !!val || 'Título é obrigatório']"
    />

    <q-input
      v-model="form.description"
      label="Descrição"
      type="textarea"
      outlined
      dense
      clearable
      class="full-width"
      :rules="[val => !!val || 'Descrição é obrigatória']"
    />

    <q-select
      v-model="form.status"
      :options="statusOptions"
      label="Status"        
      outlined
      dense
      emit-value
      map-options
      class="q-mb-md"
    />

    <q-select
      v-model="form.priority"
      label="Prioridade"
      :options="priorityOptions"
      emit-value
      map-options
      outlined
      dense
      autofocus
      class="q-mb-md"
    />    

    <q-input
      v-model="form.deadline"
      label="Data Limite"
      type="date"
      outlined
      dense
      clearable
      class="full-width"
      :rules="[validateDate]"
      :min="minDate"
    />

    <div class=" row justify-end q-gutter-sm q-mt-md">
      <q-btn
        label="Cancelar"
        flat
        color="secondary"
        @click="$emit('cancel')"
        :disable="loading"
      />
      <q-btn
        :label="isEditMode ? 'Editar' : 'Salvar'"
        color="dark"
        type="submit"
        dense
        :loading="loading"
        :disable="!formIsValid || loading"
      />
    </div>   
  </q-form>
</template>

<script>
import TaskFormScript from './TaskForm.js'

export default TaskFormScript


</script>