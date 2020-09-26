import Vue from 'vue'
import Router from 'vue-router'
import firebaseApp from './firebase/app'
import store from './store'

import Login from './views/login.vue'
import Home from './views/home.vue'
import Application from './views/application.vue'
import Dashboard from './views/dashboard.vue'
import Sensors from './views/sensors.vue'
import Users from './views/users.vue'
import Charts from './views/charts.vue'
import MaintenanceLog from './views/maintenance-log.vue'

Vue.use(Router)

const isAuthenticated = (to, from, next) => {
  firebaseApp.auth().onAuthStateChanged(function(user) {
    if (user) {
      store.commit('setUser', user)
      next()
      return
    } else {
      store.commit('setUser', null)
      next('/login')
    }
  });
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/app/:vesselId',
      name: 'app',
      component: Application,
      beforeEnter: isAuthenticated,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: Dashboard,
        },
        {
          path: 'sensors',
          name: 'sensors',
          component: Sensors,
        },
        {
          path: 'users',
          name: 'users',
          component: Users,
        },
        {
          path: 'charts',
          name: 'charts',
          component: Charts,
        },
        {
          path: 'log',
          name: 'log',
          component: MaintenanceLog,
        }
      ]
    }
  ]
})