import TaskView from '@/components/TaskView/TaskView.vue'

export default {
  name: 'TaskViewDialog',
  components: { TaskView },
  props: {
    value: { type: Boolean, default: false },
    task: { type: Object, default: null }
  },
  data() {
    return {
      show: this.value
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
    close() {
      this.show = false
    }
  }
}