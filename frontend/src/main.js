import Vue from 'vue'
import App from './App.vue'
import router from './router'
import api from './api'
import Quasar from 'quasar'
import quasarIconSet from 'quasar/icon-set/material-icons'
import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'
import store from './stores'

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.use(Quasar, {
  plugins: {},
  iconSet: quasarIconSet,
})

new Vue({
  router,
  store,  
  render: h => h(App),
}).$mount('#app')