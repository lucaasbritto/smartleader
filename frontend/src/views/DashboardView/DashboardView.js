import { mapGetters, mapActions } from 'vuex'
import { getStatusColor, getPriorityColor, formatDateBR } from '@/utils/taskUtils';
import { notifySuccess, notifyError } from '@/utils/notify'
import TaskDialog from '@/components/TaskDialog/TaskDialog.vue'

export default {
  name: 'DashboardView',

  components: { 
    TaskDialog 
  },

  data() {
    return {
      createLoading: false,
      showCreateDialog: false,
      loading: false,
      form: {
        title: '',
        description: '',
        status: 'Pendente',
        priority: 'Média',
        deadline: ''
      },
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

    ...mapActions('tasks', ['createTask', 'fetchTasks']),

    async insertTask(data) {
      this.createLoading = true;
      try {
        await this.createTask(data)

        notifySuccess('Tarefa cadastrada com sucesso!')        
        this.showCreateDialog = false
        this.resetForm()

      } catch (error) {
          notifyError('Erro ao Criar a tarefa')
      }finally {
        this.createLoading = false; 
      }
    },

    resetForm() {
      this.form = {
        title: '',
        description: '',
        status: 'Pendente',
        priority: 'Média',
        deadline: ''
      }
    },

    async onRequest({ pagination }) {
      this.loading = true;
      try {
        this.pagination = { ...pagination }

         await this.fetchTasks({
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