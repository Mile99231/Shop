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
      <el-aside width="200px"> 
      <el-menu >
          <el-menu-item index="1-1">个人信息</el-menu-item>

          <el-menu-item index="1-2">用户信息</el-menu-item>
        
          <el-menu-item index="1-3">商家信息</el-menu-item>
        <el-submenu index="1-4">
          <template slot="title">货物信息</template>
          <el-menu-item index="1-4-1">物流详情</el-menu-item>
          <el-menu-item index="1-4-2">库存详情</el-menu-item>
          <el-menu-item index="1-4-3">销量详情</el-menu-item>
        </el-submenu>
    </el-menu>
</el-aside>

      <el-container>
        <el-main>Main</el-main>

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

}
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
         
     this.loginuser=JSON.parse(sessionStorage.getItem('username'));
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
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
     }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
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