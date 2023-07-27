<template>
    <div class="admin">
        <div class="login_box">
            <div class="avator_box">
                <img src="../assets/logo.png">
              
            </div>
        </div>
        <div>
        <el-form ref="user" :model="user" label-width="80px" :rules="rules" >

            <el-form-item  prop="username"  label="账号">
                <el-input prefix-icon="el-icon-user"  v-model="user.username" placeholder="请输入账号"></el-input>
            </el-form-item>

            <el-form-item prop="password" label="密码">
                <el-input prefix-icon="el-icon-user-solid"  v-model="user.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>

            <el-form-item prop="inputStr"  label="验证码">
                 <el-input  v-model="user.inputStr" placeholder="请输入验证码"></el-input>
            </el-form-item>
            
 
            <el-form-item>
            <el-button type="info" @click="login('user')">登录</el-button>
            <el-button  @click="resetForm('user')" >重置</el-button>
            <img :src="imgurl" alt="">
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
                    inputStr:""
                    
                },
       
               
                imgurl:"",
                rules:{
                        username:[{ required: true, message: '请输入账号', trigger: 'blur' }],
                        password:[{ required: true, message: '请输入密码', trigger: 'blur' },
                                  { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }],
                        inputStr:[{required: true, message: '请输入验证码', trigger: 'blur'}]
                     }
            };
        },
        methods:{
            
            login(formName){
                this.$refs[formName].validate((valid)=>{
                if(valid){
                this.$axios.post("admin/checkVerify",{params: this.user.inputStr})
                .then(res=>{
                if(res.data===true){  
                this.$axios.get("admin/login.action",{params: this.user})
                .then(res=>{
                    if(res.data.errorcode===0){
                        this.$message({message: "登录成功",type: "success"});
                        sessionStorage.setItem('name',JSON.stringify(res.data.result.name));
                        sessionStorage.setItem('username',JSON.stringify(res.data.result.username));
                        this.$router.push("/AdminMain")
                    }else{
                        this.$message.error('用户名或密码不正确，请重新输入');
                        this.yanzheng();
                    }
                 
                })
                    }else{
                        this.yanzheng();
                        this.$message.error('验证码不正确，请重新输入');
                    }
                    }).catch((error) => {
                    console.log(error);
                    });
                    }else{
                        this.$message.error('验证失败，请重新输入');
                        return false;

                    }
            })			
		},
        yanzheng(){
            this.imgurl="http://localhost:8089/shop/admin/getVerify?"+Math.random();//生成一个随机的图片验证码的url地址
            console.log(this.imgurl); 
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