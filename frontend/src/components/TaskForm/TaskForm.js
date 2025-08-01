export default {
  name: 'TaskForm',
  props: {
    initialData: {
      type: Object,
      default: () => ({
        title: '',
        description: '',
        status: 'pendente',
        priority: 'média',
        deadline: '',
      }),
    },
    loading: { 
      type: Boolean,
      default: false,
    },
    isEditMode: {
      type: Boolean,
      default: false
    }   
  },
  data() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const minDate = today.toISOString().split('T')[0]

    return {
      form: {},
      today,
      minDate,
      statusOptions: ['pendente', 'em andamento', 'concluída'],
      priorityOptions: ['baixa', 'média', 'alta'],
    }
  },
  methods: {
    submit() {
      this.$emit('submit', { ...this.form })
    },
    
    validateDate(val) {
        if (!val) return 'Data é obrigatória'
        const dueDate = this.parseDateLocal(val)
        dueDate.setHours(0, 0, 0, 0)
        if (dueDate < this.today) return 'Data deve ser hoje ou posterior'
        return true
    },
    
    parseDateLocal(dateString) {
        const [year, month, day] = dateString.split('T')[0].split('-')
        return new Date(year, month - 1, day)
    }
  },
  computed: {
    formIsValid() {
        if (!this.form) return false;

        if (!this.form.title || !this.form.title.trim()) return false;
        if (!this.form.description || !this.form.description.trim()) return false;
        if (this.validateDate(this.form.deadline) !== true) return false;
        if (!this.form.status) return false;
        if (!this.form.priority) return false;

        return true;
    }
  },
  watch: {
    initialData: {
      handler(newVal) {
        this.form = { ...newVal }
      },
      immediate: true,
      deep: true,
    },
  },
}