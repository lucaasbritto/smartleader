export default {
  props: {
    value: Boolean,
    loading: Boolean,
    task: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      show: this.value,
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
    confirmDelete() {
      this.$emit('confirm')
    },
    close() {
      if (!this.loading) this.$emit('input', false)
    }
  }
}