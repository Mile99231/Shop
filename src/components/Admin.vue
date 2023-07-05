<template>
    <div class="admin">
        <div class="login_box">
            <div class="avator_box">
                <img src="../assets/logo.png">
              
            </div>
        </div>
        <div>
        <el-form ref="user" :model="user" label-width="80px" :rules="rules" >

            <el-form-item prop="username"  label="账号">
                <el-input  v-model="user.username" placeholder="请输入账号"></el-input>
            </el-form-item>

            <el-form-item prop="password" label="密码">
                <el-input  v-model="user.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>

            <el-form-item prop="code"  label="验证码">
                 <el-input  v-model="user.code" placeholder="请输入验证码"></el-input>
            </el-form-item>
            

            <el-form-item>
            <el-button type="info" @click="login('user')">登录</el-button>
            <el-button  @click="resetForm('user')" >重置</el-button>
            <img id="exchangecode" :src="imgurl" />
            <a href="#" @click="yanzheng()">看不清?换一张</a>
            </el-form-item>
        </el-form>
        </div>
    </div> 


    </template>
    
    <script>
     export default{
        name :'',
        data(){
            return{
                user:{
                    username:"",
				    password:"",
                    code:"",
                },
               
                imgurl:"",
                rules:{
                        username:[{ required: true, message: '请输入账号', trigger: 'blur' }],
                        password:[{ required: true, message: '请输入密码', trigger: 'blur' },
                                  { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }],
                        // code:[{required: true, message: '请输入验证码', trigger: 'blur'}]
                     }
            };
        },
        methods:{
            login(formName){
                this.$refs[formName].validate((valid)=>{
                if(valid){
                this.$axios.get("AdminServlet?",{params: this.user})
                .then(res=>{
                    if(res.data=="OK"){
                        this.$message({message: "登录成功",type: "success"});
                        sessionStorage.setItem('username',JSON.stringify(res.config.params.username));
                        this.$router.push("/AdminMain")
                                    
                    }else{
                        alert('用户名或密码不正确,请重新填写')
                    }
                    }).catch((error) => {
                    console.log(error);
                    });
                    }else{
                        this.$message.error('验证失败，请重新输入');
                        this.yanzheng();
                        return false;

                    }
            })			
		},
        yanzheng(){
            this.imgurl=`http://localhost:8089/End/code?=${Math.random()}`
            this.$axios.get("code")
        },
        resetForm(formName) {
        this.$refs[formName].resetFields();
      }


        },
        mounted() {
             this.yanzheng(); // 组件挂载时刷新验证码
         },
     }
    </script>
    
    
    <style scoped>
       .admin {
      /* background-color: #fc9c9c; */
        width: 500px;
        margin: 0px auto;
        transform: translate(0,30%);
    
    }
    .login_box{
        /* width: 450px;
        height: 360px; */
        background-color: #fff;
        border-radius: 3px;
    }
    .login_box .avator_box{
        width: 130px;
        height: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        box-shadow: 0 0 10px #ddd;
        padding: 10px;
        margin: 15px auto;
    }
    .login_box .avator_box img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .yz{
        width: 20px;
    }
    </style>