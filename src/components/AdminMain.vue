<template>
    <div class="AdminMain">
        <el-container>
            <el-header>
              <div>
    <img src="../assets/logo.png" alt="" width="15px">
    <span>后台管理系统</span>
  </div>
  <!-- <el-button type="info" plain  @click="loginout">退出</el-button> -->

  <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
    {{loginuser}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command="a">个人中心</el-dropdown-item>
    <el-dropdown-item command="b">退出登录</el-dropdown-item>

  </el-dropdown-menu>

</el-dropdown>
            </el-header> 
    <el-container>

        <!-- 侧边栏 -->
      <el-aside  width="200px"> 
      <el-menu 
      background-color="#333744" 
        text-color="#fff" 
        :collapse-transition='false' 
        class="el-menu-vertical-demo"
         unique-opened :router = 'true'
        :default-active="$route.path"> 
        <!-- 多级菜单 -->
          <el-submenu v-for="item in menulist" :index="item.id" :key="item.id">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>  
        </template> 
        <!-- 二级菜单 -->
        <el-menu-item v-for="subItem in item.child" :index="subItem.path" :key="subItem.path">
          <template slot="title">
          <i :class="subItem.icon"></i>
          <span>{{subItem.name}}</span> 
        </template>
        </el-menu-item>
    </el-submenu>
    </el-menu>
</el-aside>

      <el-container >
        <div class="cont">
        <router-view></router-view>
      
      </div>

      </el-container>
    </el-container>
  </el-container>
    </div>    
    </template>
    
    <script>
     export default{
        name :'',
        data(){
            return{
              loginuser:{
            },
            menulist:[
         {
            name:'管理员',
            icon:'el-icon-s-custom',
            id:'1',
            child:[{
              name:'管理员个人信息',
              icon:'el-icon-s-custom',
              path:'/SelAdmin'
            },
            {
              name:'修改密码',
              icon:'el-icon-folder-add',
              path:'/UpdAdminPwd'
            },
            {
              name:'头像',
              icon:'el-icon-folder-add',
              path:'/z' 
            },
           
           
            ]
          },
          {
            name:'商家管理',
            icon:'el-icon-s-goods',
            id:'2',
            child:[{
              name:'商家信息',
              icon:'el-icon-goods',
              path:'/SelBusiness'
            },
           
            ]
          },
         {
            name:'用户管理',
            icon:'el-icon-coordinate',
            id:'3',
            child:[{
              name:'用户信息',
              icon:'el-icon-coordinate',
              path:'/SelUser'
            },
           
            ]
          } ,
          {
            name:'商品管理',
            icon:'el-icon-tickets',
            id:'4',
            child:[{
              name:'商品信息',
              icon:'el-icon-tickets',
              path:'/BusPro'
            },
           
            ]
          } 
        ],
            }
        },
        methods:{
          loginout(){
         sessionStorage.removeItem('username');
         this.$router.push('/Admin');
        },
          handleCommand(c){
          if(c==='a'){
            console.log("个人中心方法");
          }
          if(c==='b'){
            this.loginout();
          }
       
        }
    
        },
        created(){
         
     this.loginuser=JSON.parse(sessionStorage.getItem('name'));
    //  this.loginuser=JSON.parse(sessionStorage.getItem('username'));
      console.log(this.loginuser);
        }
     }
    </script>
    
    <style scoped>
    .AdminMain{
        height: 100%;
    }
    .el-container {
     height: 100%;
     width: 100%;
    }
    .el-menu{
     height: 100%;
    }
    .el-header {
    background-color: #373d41;
    display:flex;    /*弹性布局*/ 
    justify-content: space-between; /*子元素分边显示 */
    align-items: center; /*子元素居中显示 */
    color: #fff;
    font-size: 20px;
     }
    .el-dropdown{
      color: #fff;
    }

  .el-aside {
    background-color: #D3DCE6;
    color: #fff;
    text-align: center;
    line-height: 200px;
     }
  
  .el-main {
    background-color: #E9EEF3;
    color:#fff;
    text-align: center;
    line-height: 160px;
     }
     .toggle-button{
    background-color: #4a5064;
    font-size: 10px;
    color: #fff;
    line-height: 24px;
    text-align: center;
    cursor: pointer;
    letter-spacing: 0.3em;
  }
  
</style>