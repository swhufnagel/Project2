import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
Vue.use(Vuetify)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/',
      name: 'login',
      component: Login
    }
  ]
})
