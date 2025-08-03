<template>
  <q-dialog v-model="show" persistent>
    <q-card class="q-pa-md bg-white shadow-6" style="min-width: 320px; max-width: 420px; border-radius: 12px;">
      
      <q-card-section class="row items-center no-wrap q-pb-none" style="gap: 10px;">
        <q-avatar size="40px" :class="`bg-${iconColor} text-white`">
          <q-icon :name="icon" size="26px" />
        </q-avatar>
        <div class="text-h6 text-weight-bold" style="letter-spacing: 0.03em;">
          {{ title }}
        </div>
      </q-card-section>

      <q-separator spaced class="q-mb-md" />

      <q-card-section class="text-body1 q-mb-md" style="line-height: 1.4; color: #555;">
        {{ message }}
      </q-card-section>

      <q-card-actions align="right" class="q-pt-none">
        <q-btn 
          flat 
          label="Cancelar" 
          color="grey-7" 
          @click="close" 
          :disable="loading"
          class="q-mr-sm"
          rounded
          dense
        />
        <q-btn 
          unelevated 
          :label="okLabel" 
          :color="okColor" 
          :loading="loading" 
          @click="confirmAction" 
          rounded
          dense
        />
      </q-card-actions>

    </q-card>
  </q-dialog>
</template>

<script>
import confirmDialogScript from './ConfirmDialog.js'

export default confirmDialogScript

</script>