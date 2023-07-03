<template>
    <div class="app">
        <div class="background">
            <!-- <img src="../assets/e90664acbb424877adfaa40ca21cd35b.jpeg" width="100%" height="100%"> -->
           
        </div>
        <el-input v-model="username" placeholder="请输入账号"></el-input>
        <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
        <el-input v-model="code" placeholder="请输入验证码"></el-input>
        <el-button type="info" @click="login()">登录</el-button>
        <img id="num" src="http://localhost:8089/End/code" /> 
    </div> 


    </template>
    
    <script>
     export default{
        name :'',
        data(){
            return{
                username:"",
				password:"",
                code:""
            }
        },
        methods:{
            login(){
                console.log(this.username);
                // let fd=new FormData()
				// 			fd.append("username",this.username)
				// 			fd.append("password",this.password)
			this.$axios.get("AdminServlet?username="+this.username+"&password="+this.password)
			.then(res=>{
				if(res.data=="OK"){
                    console.log(res);
                     location.href="https://www.4399.com" //跳转网址
					alert("用户名正确")
								
				}else{
                    console.log(res);
					alert('用户名或密码不正确,请重新填写')
				}
			})
						
		},
        yanzheng(){
            this.$axios.get("code")
			.then(res=>{
			
                    console.log(res);
          
			}).catch(console.error())
        },


        },
        created(){
            this.yanzheng();
        }
     }
    </script>
    
    
    <style scoped>
      
    </style>