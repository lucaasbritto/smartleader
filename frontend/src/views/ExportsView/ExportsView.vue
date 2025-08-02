<template>
  <q-page padding class="bg-grey-2">
    <q-card class="shadow-4 rounded-borders q-pa-md" style="max-width: 860px; margin: auto;">
      
      <q-card-section class="row items-center justify-between q-pb-none">
        <div class="text-h5 text-primary text-weight-bold">
          Arquivos Exportados
        </div>
        <q-btn
          icon="refresh"
          @click="loadExportList"
          flat
          round
          dense
          color="primary"
          v-ripple
          aria-label="Atualizar lista"
        >
          <q-tooltip anchor="top middle" self="bottom middle">
            Atualizar lista
          </q-tooltip>
        </q-btn>
      </q-card-section>

      <q-separator spaced color="grey-4" />

      <q-card-section>
        <q-list bordered padding class="bg-white rounded-borders shadow-1">
          <q-item-label header class="text-subtitle2 text-grey-8 q-pb-md q-pt-none">
            Clique no arquivo para baixar
          </q-item-label>

          <q-item
            v-for="file in exports"
            :key="file.id"
            clickable
            v-ripple
            @click="file.status === 'done' && downloadExport(file)"
            class="q-py-sm q-gutter-x-sm"
            :aria-label="`Baixar arquivo ${file.filename}, status ${file.status}`"
           >
            
            <q-item-section>
                <q-icon name="insert_drive_file" color="blue" size="20px" class="q-mr-sm" />
                <span class="text-truncate" style="max-width: 220px;">{{ file.filename }}</span>
            </q-item-section>
            
            <q-item-section>
                <q-badge
                :color="statusColor(file.status)"
                class="q-mr-sm"
                rounded
                :label="statusLabel(file.status)"
                align="top"
                />
            </q-item-section>
            
            <q-item-section class="text-grey-6" style="font-size: 13px;">
                {{ new Date(file.created_at).toLocaleString() }}
                
            </q-item-section>

            <q-item-section side>
                <q-btn
                dense
                round
                flat
                icon="download"
                color="primary"
                :disable="file.status !== 'done'"
                :title="file.status === 'done' ? 'Baixar arquivo' : 'Arquivo ainda não disponível'"
                @click.stop="downloadExport(file)"
                />
            </q-item-section>
            </q-item>
        </q-list>
       
        <q-inner-loading
          :showing="loading"
          message="Carregando exportações..."
          background-color="rgba(255, 255, 255, 0.85)"
          spinner-color="primary"
          class="rounded-borders"
        />
        
        <div
          v-if="!exports.length && !loading"
          class="text-subtitle1 text-center text-grey-6 q-mt-xl"
        >
          Nenhuma exportação encontrada.
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
    import exportsViewScript from './ExportsView.js'

    export default exportsViewScript

</script>

<style scoped lang="scss">
    @use './ExportsView.scss'; 

</style>
