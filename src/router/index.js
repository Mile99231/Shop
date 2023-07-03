import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Demo from '@/components/Demo'
import Admin from '@/components/Admin'
Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/aa',
      name: 'Demo',
      component: Demo
    },
    {
      path: '/Admin',
      name: 'Admin',
      component: Admin
    }

  ]
})
