import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Admin from '@/components/Admin'
import MileLogin from '@/components/MileLogin'
import MileShopLogin from '@/components/MileShopLogin'
import MileUserMain from '@/components/MileUserMain'
import AdminMain from '@/components/AdminMain'
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