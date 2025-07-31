import { mapGetters } from 'vuex'
import { getStatusColor, getPriorityColor, formatDateBR } from '@/utils/taskUtils';

export default {
  name: 'DashboardView',

  data() {
    return {
      loading: false,
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,        
      },      
      columns: [
        { name: 'id', label: 'ID', field: 'id', align: 'center' },
        { name: 'title', label: 'Título', field: 'title', align: 'center' },
        { name: 'description', label: 'Descrição', field: 'description', align: 'center' },
        { name: 'status', label: 'Status', field: 'status', align: 'center' },
        { name: 'priority', label: 'Prioridade', field: 'priority', align: 'center' },
        { name: 'deadline', label: 'Data Limite', field: row => formatDateBR(row.deadline), align: 'center' },       
        { name: 'actions', label: 'Ações', field: 'actions', align: 'center' },
      ],      
    }
  },

  computed: {
    ...mapGetters('tasks', ['tasks', 'total'])
  },

  watch: {
    total(newTotal) {
      this.pagination.rowsNumber = newTotal
    }
  },

  methods: {
    getStatusColor,
    getPriorityColor,

    async onRequest({ pagination }) {
      this.loading = true;
      try {
        this.pagination = { ...pagination }

        await this.$store.dispatch('tasks/fetchTasks', {
          page: pagination.page,
          per_page: pagination.rowsPerPage,
        });
        this.pagination.rowsNumber = this.total;
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      } finally {
        this.loading = false;
      }
    }
  },

  mounted() {
    this.onRequest({ pagination: this.pagination })
  }
}