import { mapGetters, mapActions } from 'vuex'
import { getStatusColor, getPriorityColor, formatDateBR} from '@/utils/taskUtils';
import { notifySuccess, notifyError, notifyWarning } from '@/utils/notify'
import TaskDialog from '@/components/Task/TaskDialog/TaskDialog.vue'
import TaskView from '@/components/Task/TaskView/TaskView.vue'
import TaskViewDialog from '@/components/Task/TaskViewDialog/TaskViewDialog.vue'
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog/ConfirmDeleteDialog.vue'
import TaskFilters from '@/components/Task/TaskFilters/TaskFilters.vue'

export default {
  name: 'DashboardView',

  components: { 
    TaskDialog,
    TaskView, 
    TaskViewDialog,
    ConfirmDeleteDialog,
    TaskFilters
  },

  data() {
    return {
      createLoading: false,
      showCreateDialog: false,
      loading: false,
      isEditMode: false,
      editTask: null, 
      dialogViewVisible: false,
      selectedTask: null,
      deleteDialog: false,
      taskToDelete: null,
      deleteLoading: false,
      downloadingIds: [],
      form: {
        title: '',
        description: '',
        status: 'Pendente',
        priority: 'Média',
        deadline: ''
      },
      filters: {
        title: '',
        description: '',
        status: null,
        priority: null,
        date: null
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
        { name: 'priority', label: 'Prioridade', field: 'priority', align: 'center' },
        { name: 'status', label: 'Status', field: 'status', align: 'center' },
        { name: 'deadline', label: 'Data Limite', field: row => formatDateBR(row.deadline), align: 'center' },       
        { name: 'actions', label: 'Ações', field: 'actions', align: 'center' },
      ],      
    }
  },

  computed: {
    ...mapGetters('tasks', ['tasks', 'total']),
    ...mapGetters('exports', ['exports']),
  },

  watch: {
    total(newTotal) {
      this.pagination.rowsNumber = newTotal
    }
  },

  methods: {
    getStatusColor,
    getPriorityColor,

    ...mapActions('tasks', ['createTask', 'fetchTasks','updateTask','deleteTask']),
    ...mapActions('exports', ['loadExportList', 'triggerExport']),

    async insertTask(data) {
      this.createLoading = true;
      try {
        if(this.isEditMode && this.editTask) {        
        await this.updateTask({ id: this.editTask.id, data })
        notifySuccess('Tarefa atualizada com sucesso!')
      } else {
        await this.createTask(data)

        notifySuccess('Tarefa cadastrada com sucesso!')
      }

      this.showCreateDialog = false
      this.resetForm()
      this.editTask = null

      } catch (error) {
          notifyError('Erro ao salvar a tarefa')
      }finally {
        this.createLoading = false; 
      }
    },

    async onRequest({ pagination }) {
      this.loading = true;
      try {
        this.pagination = { ...pagination }

        const params = {
          ...this.filters,
          page: pagination.page,
          per_page: pagination.rowsPerPage
        };

        await this.fetchTasks(params);

        this.pagination.rowsNumber = this.total;

      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      } finally {
        this.loading = false;
      }
    },

    async confirmDeleteTask() {
      this.deleteLoading = true
      try {
        await this.deleteTask(this.taskToDelete.id)
        notifySuccess('Tarefa excluída com sucesso!')
        this.deleteDialog = false
        this.taskToDelete = null
      } catch (error) {
        notifyError('Erro ao excluir tarefa.')
      } finally {
        this.deleteLoading  = false        
      }
    },

    async exportExcel() {
      try {
        notifyWarning('Gerando exportação...')               
        await this.triggerExport();
        
        notifySuccess('Exportação concluida. Você poderá baixar o arquivo em "Exportações')
        await this.loadExportList();

      } catch (error) {        
        notifyError('Erro ao iniciar exportação');
      }
    },

    async downloadExport(file) {
      if (this.downloadingIds.includes(file.id)) return

      this.downloadingIds.push(file.id)

      try {
        notifyWarning('Realizando Download...')
        const response = await this.$store.dispatch('exports/downloadExportFile', file.id)

        const blob = new Blob([response.data], {
          type: response.headers['content-type'] || 'application/octet-stream'
        })

        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')

        const filename = file.filename || `export-${new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')}.xlsx`

        link.href = url
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)

        notifySuccess('Download realizado com sucesso!')

      } catch (error) {
        console.error('Download error:', error)        
        notifyError('Erro ao fazer download do arquivo.')

      } finally {        
        this.downloadingIds = this.downloadingIds.filter(id => id !== file.id)
      }
    },

    onFilter() {
      this.pagination.page = 1;
      this.onRequest({ pagination: this.pagination });
    },

    applyFilters(newFilters) {
      this.filters = newFilters;
      this.pagination.page = 1;
      this.onRequest({ pagination: this.pagination });
    },

    openCreateTask() {
      this.isEditMode = false
      this.resetForm()
      this.showCreateDialog = true
    },

    openEditTask(task) {
      this.isEditMode = true
      this.editTask = { ...task } 
      this.form = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        deadline: task.deadline
      }
      this.showCreateDialog = true
    },

    openViewTask(task) {
      this.selectedTask = task
      this.dialogViewVisible = true
    },

    openDeleteTask(task) {
      this.taskToDelete = task
      this.deleteDialog = true
    },

    resetForm() {
      this.form = {
        title: '',
        description: '',
        status: 'Pendente',
        priority: 'Média',
        deadline: ''
      },
      this.editTask = null
      this.isEditMode = false
    },

    resetFilters() {
      this.filters = {
        title: '',
        description: '',
        status: null,
        priority: null,
        date: null
      };
      this.pagination.page = 1;
      this.onRequest({ pagination: this.pagination });
    },

  },

  mounted() {
    this.onRequest({ pagination: this.pagination });
    this.loadExportList();
  }
}