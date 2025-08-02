import { mapGetters, mapActions } from 'vuex'
import { notifySuccess, notifyError, notifyWarning } from '@/utils/notify'

export default {
  name: 'ExportsView',

  data() {
    return {
      loading: false,
      downloadingIds: []
    }
  },

  computed: {
    ...mapGetters('exports', ['exports'])
  },

  methods: {
    ...mapActions('exports', ['loadExportList']),

    statusColor(status) {
        switch (status) {
        case 'done': return 'green'
        case 'pending': return 'orange'
        case 'error': return 'red'
        default: return 'grey'
        }
    },
    statusLabel(status) {
        switch (status) {
        case 'done': return 'Completo'
        case 'pending': return 'Pendente'
        case 'error': return 'Erro'
        default: return 'Desconhecido'
        }
    },

    async downloadExport(file) {
      if (this.downloadingIds.includes(file.id) || file.status !== 'done') return

      this.downloadingIds.push(file.id)

      try {
        notifyWarning('Realizando download...')

        const response = await this.$store.dispatch('exports/downloadExportFile', file.id)

        const blob = new Blob([response.data], {
          type: response.headers['content-type'] || 'application/octet-stream'
        })

        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', file.filename || 'arquivo-exportado.xlsx')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)

        notifySuccess('Download realizado com sucesso!')

      } catch (error) {
        console.error(error)
        notifyError('Erro ao fazer download do arquivo.')
      } finally {
        this.downloadingIds = this.downloadingIds.filter(id => id !== file.id)
      }
    }
  },

  mounted() {
    this.loading = true
    this.loadExportList().finally(() => {
      this.loading = false
    })
  }
}