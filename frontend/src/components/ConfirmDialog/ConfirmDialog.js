export default {
  props: {
    value: Boolean,
    loading: Boolean,
    title: {
      type: String,
      default: 'Confirmação'
    },
    message: {
      type: String,
      default: 'Tem certeza?'
    },
    okLabel: {
      type: String,
      default: 'Confirmar'
    },
    okColor: {
      type: String,
      default: 'primary'
    },
    icon: {
      type: String,
      default: 'warning'
    },
    iconColor: {
      type: String,
      default: 'red'
    }
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
    confirmAction() {
      this.$emit('confirm')
    },
    close() {
      if (!this.loading) this.$emit('input', false)
    }
  }
}