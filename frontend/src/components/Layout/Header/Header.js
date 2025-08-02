import { mapState, mapActions } from 'vuex'
import UserCreateModal from '@/components/UserCreateModal.vue'

export default {
  name: 'AppHeader',

  components: { 
    UserCreateModal
  },

  data() {
    return {      
      settingsMenu: false,
      loading: false,
      showCreateUserModal: false,
      error: '',
      errors: {}
    }
  },

  computed: {
    ...mapState('user', ['user'])
  },

  methods: {
    ...mapActions('user', ['logout']),

    async handleLogout() {
      await this.logout() 
      this.$router.push('/login')
    },

     openCreateUserModal() {
      this.showUserDialog = true
    }
  }
}