import TaskForm from '../TaskForm/TaskForm.vue'

export default {
  name: 'TaskDialog',
  components: { TaskForm },
  props: {
    value: { type: Boolean, default: false },
    taskData: { type: Object, default: () => null },
    loading: { type: Boolean, default: false }
  },
  data() {
    return {
      show: this.value,
    }
  },
  computed: {
    isEdit() {
      return !!this.taskData && !!this.taskData.id
    }
  },
  watch: {
    value(val) {
      this.show = val
    },
    show(val) {
      this.$emit('input', val)
    }
  },
  methods: {
    handleSubmit(data) {
      this.$emit('submit', data)
    },
    close() {
      this.$emit('input', false)
    }
  }
}