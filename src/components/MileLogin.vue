<template>
    <div class="ad">
        <div class="background" style="height: 100%;">
            <img src="../assets/e90664acbb424877adfaa40ca21cd35b.jpeg" width="100%" height="100%">
        </div>
        <div class="login">
            <el-form ref="user" :model="user" label-width="80px">
            <el-form-item prop="loginname" >

            账号:<el-input v-model="user.loginname" placeholder="请输入账号" class="pass" style="margin-top: 350px;margin-left: 30px;"></el-input><br>
            </el-form-item>
            <el-form-item prop="pwd" >
            密码:<el-input placeholder="请输入密码" v-model="user.pwd" show-password class="user" style="margin-top: 20px; margin-left: 30px;"></el-input><br>
            </el-form-item>
            <el-button type="primary" style="margin-top: 30px;margin-left: 150px;" @click="login('user')">登录</el-button>
            <el-button type="warning" style="margin-left: 120px;" @click="reg()">注册</el-button>
            </el-form>
        </div>
        
    </div>    
    </template>
    
    <script>
import axios from 'axios';

     export default{
        name :'MileLogin',
        data(){
            return{
                user:{loginname:"",pwd:""}
            }
        },
        methods:{
            login(formName){
                this.$axios.get("UserLoginServlet?username="+this.user.loginname+"&password="+this.user.pwd)
                .then(rs=>{
                    console.log(rs);
                    if(rs.data==1){
                        this.$message({
                        message: '登录成功',
                        type: 'success'})
                        sessionStorage.setItem('user',JSON.stringify(this.user.loginname))//将用户信息存储到session中。这样你的
                        this.$router.push('/MileUserMain');
                    }else{
                        this.$message.error('登录失败');
                    }

})
          .catch();
            },
            reg(){
                this.$message({
          message: '注册成功',
          type: 'success'
        });
            }
            
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