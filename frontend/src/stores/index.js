import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import tasks from './tasks' 
import exports from './exports' 

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    tasks,
    exports
  }
})