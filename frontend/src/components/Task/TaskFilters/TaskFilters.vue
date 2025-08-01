<template>
  <q-card flat bordered class="q-pa-sm q-mb-sm">
    <q-form @submit.prevent="onFilter">
      <div class="row q-col-gutter-xs">
        
        <q-input
          v-model="localFilters.title"
          label="Título"
          dense outlined hide-bottom-space
          class="col-12 col-md-2 q-mb-xs"
          clearable
        >
          <template v-slot:prepend>
            <q-icon name="title" />
          </template>
        </q-input>

        
        <q-input
          v-model="localFilters.description"
          label="Descrição"
          dense outlined hide-bottom-space
          class="col-12 col-md-3 q-mb-xs"
          clearable
        >
          <template v-slot:prepend>
            <q-icon name="description" />
          </template>
        </q-input>

        
        <q-select
          v-model="localFilters.status"
          label="Status"
          :options="['Pendente', 'Em andamento', 'Concluída']"
          dense outlined hide-bottom-space
          class="col-12 col-md-2 q-mb-xs"
          emit-value map-options
          clearable
        >
          <template v-slot:prepend>
            <q-icon name="check_circle_outline" />
          </template>
        </q-select>

        
        <q-select
          v-model="localFilters.priority"
          label="Prioridade"
          :options="['Baixa', 'Média', 'Alta']"
          dense outlined hide-bottom-space
          class="col-12 col-md-2 q-mb-xs"
          emit-value map-options
          clearable
        >
          <template v-slot:prepend>
            <q-icon name="priority_high" />
          </template>
        </q-select>

        
        <q-input
          v-model="localFilters.date"
          label="Data"
          type="date"
          dense outlined hide-bottom-space
          class="col-12 col-md-2 q-mb-xs"
          clearable
        >
          <template v-slot:prepend>
            <q-icon name="event" />
          </template>
        </q-input>

        
        <div class="col-12 col-md-1 q-gutter-xs flex items-end">
          <q-btn
            icon="search"
            dense
            unelevated
            color="primary"
            no-caps
            @click="onFilter"
            label="Filtrar"
            class="full-width q-mt-xs"
            size="sm"
          />
          <q-btn
            icon="clear"
            dense
            flat
            color="grey-7"
            no-caps
            @click="onReset"
            label="Limpar"
            class="full-width q-mt-xs"
            size="sm"
          />
        </div>
      </div>
    </q-form>
  </q-card>
</template>


<script>
export default {
  name: 'TaskFilters',

  props: {
    filters: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      localFilters: { ...this.filters }
    };
  },

  watch: {
    filters: {
      handler(newVal) {
        this.localFilters = { ...newVal };
      },
      deep: true
    }
  },

  methods: {
    onFilter() {
      this.$emit('apply-filters', { ...this.localFilters });
    },

    onReset() {
      const emptyFilters = {
        title: '',
        description: '',
        status: null,
        priority: null,
        date: null
      };
      this.localFilters = emptyFilters;
      this.$emit('apply-filters', emptyFilters);
    }
  }
};
</script>
