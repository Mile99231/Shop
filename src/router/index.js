import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Admin from '@/components/Admin'
import MileLogin from '@/components/MileLogin'
import MileShopLogin from '@/components/MileShopLogin'
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
      path: '/Admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/MileLogin',
      name: 'MileLogin',
      component: MileLogin
    }
    ,
    {
      path: '/MileShopLogin',
      name: 'MileShopLogin',
      component: MileShopLogin
    }

  ]
})
