import { mapActions, mapGetters } from 'vuex'
import { formatDateBR} from '@/utils/taskUtils';

export default {
  name: 'UserListPage',
  data() {
    return {
      loading: true,
      columns: [
        { name: 'id', label: 'ID', align: 'center', field: 'id' },
        { name: 'name', label: 'Nome', align: 'center', field: 'name' },
        { name: 'email', label: 'Email', align: 'center', field: 'email' },
        { name: 'is_admin', label: 'Perfil', align: 'center'},
        { name: 'created_at', label: 'Criado em', field: row => formatDateBR(row.created_at), align: 'center' }, 
      ]
    }
  },
  computed: {
    ...mapGetters('user', ['users'])
  },
  methods: {
    ...mapActions('user', ['fetchUsers']),
  },
  async created() {
    try {
      this.loading = true
      await this.fetchUsers()
    } finally {
      this.loading = false
    }
  }
}