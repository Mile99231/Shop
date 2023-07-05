// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// 全局注册element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 全局注册axios
import axios from 'axios';
//axios请求地址公有路径 
axios.defaults.baseURL="http://localhost:8089/End/"
Vue.prototype.$axios = axios

//请求拦截器
/*
每一次向服务器发送请求，都要携带token,很麻烦
因此我们可以使用axios拦截器,将每次请求进行拦截
然后，在当前请求中添加token。这样每次向服务器发送请求都会携带token.
*/
axios.interceptors.request.use(function(config){
  if(sessionStorage.getItem("token")){
     config.headers['token'] = sessionStorage.getItem("token");
  }
  return config;
},function(error){
 return Promise.reject("error");
});
//响应
axios.interceptors.response.use(response=>{
  if(response.data.token){
    sessionStorage.setItem("token",response.data.token);
  }
  return response;
},error=>{
  return Promise.reject(error);
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
