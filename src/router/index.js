import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Admin from '@/components/Admin'
import MileLogin from '@/components/MileLogin'
import MileShopLogin from '@/components/MileShopLogin'
import MileUserMain from '@/components/MileUserMain'
import MileOrder from '@/components/MileOrder'
import AdminMain from '@/components/AdminMain'
import MileUser from '@/components/MileUser'

import SelAdmin from '@/components/SelAdmin'
import SelBusiness from '@/components/SelBusiness'
import SelUser from '@/components/SelUser'
import BusPro from '@/components/BusPro'

import UpdAdminPwd from '@/components/UpdAdminPwd'


import MileMyOrder from '@/components/MileMyOrder'
import MileUserReg from '@/components/MileUserReg'

Vue.use(Router)

const originalPush = Router.prototype.push
// 修改 原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err=>err)
}

let router= new Router({
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
      component: Admin, 
    },
    {
      path: '/AdminMain',
      name: 'AdminMain',
      component: AdminMain,
      children:[ 
        {path: '/SelAdmin',name: 'SelAdmin',component: SelAdmin,},
        {path: '/SelBusiness',name: 'SelBusiness',component: SelBusiness,},
        {path: '/SelUser',name: 'SelUser',component: SelUser,},
        {path: '/BusPro',name: 'BusPro',component: BusPro,},
        {path: '/UpdAdminPwd',name: 'UpdAdminPwd',component: UpdAdminPwd,},
      ]
    },
    {
      path: '/SelAdmin',
      name: 'SelAdmin',
      component: SelAdmin,
    },
    {
      path: '/UpdAdminPwd',
      name: 'UpdAdminPwd',
      component: UpdAdminPwd,
    },
    {
      path: '/SelBusiness',
      name: 'SelBusiness',
      component: SelBusiness,
    },
    {
      path: '/SelUser',
      name: 'SelUser',
      component: SelUser,
    },
    {
      path: '/BusPro',
      name: 'BusPro',
      component: BusPro,
    },
    {
      path: '/MileLogin',
      name: 'MileLogin',
      component: MileLogin
    },
    {
      path: '/MileShopLogin',
      name: 'MileShopLogin',
      component: MileShopLogin
    },
    {
      path: '/MileUserMain',
      name: 'MileUserMain',
      component: MileUserMain
    },
    {
      path: '/MileOrder',
      name: 'MileOrder',
      component: MileOrder
    },
    {
      path: '/MileUser',
      name: 'MileUser',
      component: MileUser
    },
    {
      path: '/MileMyOrder',
      name: 'MileMyOrder',
      component: MileMyOrder
    },
    {
      path: '/MileUserReg',
      name: 'MileUserReg',
      component: MileUserReg
    }

  ]
}) 
//路由守卫
router.beforeEach((to,from,next)=>{
  if(to.path === '/login' || to.path=== '/' ){
    next();

  }else{
    const user = sessionStorage.getItem('user');
    if(!user){
      next()
    }else{
      next();
    }
  }
})
export default router