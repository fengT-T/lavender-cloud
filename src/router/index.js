import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Cloud from '@/components/Cloud'
import Login from '@/components/Login'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Cloud
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

const whiteList = new Set([
  'Login'
])

router.beforeEach((to, from, next) => {
  if (store.getters.isLogin || whiteList.has(to.name)) {
    next()
    return
  }
  next({name: 'Login'})
})
export default router
