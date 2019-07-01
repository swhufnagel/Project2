/*eslint-disable */
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import colors from 'vuetify/es5/util/colors'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
/*eslint-enable */
Vue.use(Vuetify, {
  theme: {
    primary: 'colors.purple.darken-3',
    secondary: '#e0adff',
    error: '#e91e63',
    warning: 'colors.pink.lighten1',
    info: 'colors.black.lighten1'
  }
})
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    }
  ]
})
