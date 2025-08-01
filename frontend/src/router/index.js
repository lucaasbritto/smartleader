import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../stores'
import LoginView from '../views/LoginView/LoginView.vue'
import DashboardView from '../views/DashboardView/DashboardView.vue'
import RegisterView from '../views/RegisterView/RegisterView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach(async (to, from, next) => {

  const isAuthenticated = store.getters['user/isAuthenticated']

  if (!store.state.user.user && localStorage.getItem('token')) {
    try {
      await store.dispatch('user/fetchUser')
    } catch (e) {
      await store.dispatch('user/logout')
      return next('/login')
    }
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    return next('/login')
  }

   if ((to.path === '/login' || to.path === '/register') && isAuthenticated) {
    return next('/')
  }

  next()
})

export default router