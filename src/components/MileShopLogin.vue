<template>
    <div class="ad">
        <div class="background">
            <img src="../assets/e90664acbb424877adfaa40ca21cd35b.jpeg" width="100%" height="100%">
        </div>
          
        <div class="login">
            <el-input v-model="username" placeholder="请输入内容" class="pass" style="margin-top: 350px;margin-left: 30px;"></el-input><br>
            <el-input placeholder="请输入密码" v-model="password" show-password class="user" style="margin-top: 20px; margin-left: 30px;"></el-input><br>
            <el-button type="primary" style="margin-top: 30px;margin-left: 150px;" @click="login()">登录</el-button>
        </div>
        
    </div>    
    </template>
    
    <script>
import axios from 'axios';

     export default{
        name :'MileLogin',
        data(){
            return{
                username: '',
                password:''
            }
        },
        methods:{
            login(){
                this.$axios.get("BusinessServlet?username="+this.username+"&password="+this.password)
                .then(rs=>{
                    console.log(rs);
                    if(rs.data==1){
                        this.$message({
          message: '登录成功',
          type: 'success'})
                    }else{
                        this.$message.error('登录失败');
                    }

})
          .catch();
            },
            
        },
        created(){
    
        }
     }
    </script>
    
    <style scoped>
    .background{
        width: 100%;
        height: 100%;
        z-index: -1;
        position: absolute;
        display: flex;
    }
    .user{
        width: 300px;
    }
    .pass{
        width: 300px;
    }

    .login{
        width: 500px;
        height: 200px;
        opacity: 0.60;
        margin: auto;
    }
    </style>