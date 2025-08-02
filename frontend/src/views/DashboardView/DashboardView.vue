<template>
  <div class="col-8 q-pl-xl q-pr-xl">   

    <div class="col-12 col-md-8 q-mt-md">
      <task-filters
        :filters="filters"
        @apply-filters="applyFilters"
      />

      <div class="row justify-end q-mt-md q-mb-md">          
        <q-btn
          label="Nova Tarefa"
          icon="add"
          color="dark"
          @click="openCreateTask"
          unelevated          
          dense
          size="sm"
        />

        <q-separator vertical color="grey-8" class="q-mx-sm"/>

        <q-btn
          label="Exportar"
          icon="file_download"
          color="dark"
          @click="exportExcel"
          unelevated
          dense
          size="sm"
        />
      </div>
    </div>

    <q-card flat bordered class="shadow-3 q-pt-md">
      <q-table
        :data="tasks"
        :columns="columns"
        row-key="id"
        flat bordered dense
        :pagination.sync="pagination"
        :rows-per-page-options="[10, 20, 50]"
        :loading="loading"
        :server="true"
        @request="onRequest"
        class="my-table"
      >
        <template v-slot:body-cell-title="props">
          <q-td :props="props">
            <div class="truncate-text">
              {{ props.row.title }}
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-description="props">
          <q-td :props="props">
            <div class="truncate-text">
              {{ props.row.description }}
            </div>
          </q-td>
        </template>
      
        <template v-slot:body-cell-priority="props">
          <q-td :props="props">
            <q-badge :color="getPriorityColor(props.row)" rounded>
              {{  props.row.priority }}
            </q-badge>
          </q-td>
        </template>

        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-badge :color="getStatusColor(props.row)" rounded>
              {{  props.row.status }}
            </q-badge>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td class="q-pa-none" align="right">
              <div class="row no-wrap items-center justify-center q-gutter-xs">
              <q-btn
                flat
                dense
                icon="visibility"
                color="primary"
                @click="openViewTask(props.row)"
                size="sm"
              />

              <q-separator vertical inset/>
              
              <q-btn
                dense
                flat
                icon="edit"
                color="blue"
                @click="openEditTask(props.row)"
                title="Editar tarefa"
                size="sm"
              />
              
              <q-separator  vertical inset/>
                                
              <q-btn
                dense
                flat
                icon="done"
                color="green"
                @click="confirmUpdated(props.row.id)"
                title="Marcar como concluída"
                size="sm"
              />
              
              <q-separator  vertical inset/>

            <q-btn
              dense
              flat
              icon="delete"
              color="red"
              @click="openDeleteTask(props.row)"
              title="Remover tarefa"
              size="sm"
            />
            </div>
          </q-td>
        </template>

        <template v-slot:no-data>
          <div class="text-center text-grey q-pa-md">
            Nenhuma tarefa encontrada.
          </div>
        </template>
      </q-table>

      <task-dialog
        v-model="showCreateDialog"
        :taskData="editTask"
        :loading="createLoading"
        :is-edit-mode="isEditMode"
        @submit="insertTask"
        @cancel="resetForm"        
      />

      <task-view-dialog
        v-model="dialogViewVisible"
        :task="selectedTask"
      />

      <confirm-delete-dialog
        v-model="deleteDialog"
        :task="taskToDelete"
        :loading="deleteLoading"
        @confirm="confirmDeleteTask"
      />

    </q-card>


    <div class="q-mt-md">
      <h6>Arquivos exportados:</h6>
      <q-list bordered padding>
        <q-item
          v-for="file in exports"
          :key="file.id"
          clickable
          @click="downloadExport(file)"
        >
          <q-item-section>
            {{ file.filename }} - Status: {{ file.status }} - Criado em: {{ new Date(file.created_at).toLocaleString() }}
          </q-item-section>
          <q-item-section side>
            <q-btn
              dense
              flat
              icon="download"
              color="primary"
              @click.stop="downloadExport(file)"
              :disable="file.status !== 'done'"
              :title="file.status === 'done' ? 'Baixar' : 'Arquivo ainda não disponível'"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>

  </div>
</template>

<script>
import dashboardViewScript from './DashboardView.js'

export default dashboardViewScript

</script>

<style scoped lang="scss">
  @use './DashboardView.scss'; 

</style>