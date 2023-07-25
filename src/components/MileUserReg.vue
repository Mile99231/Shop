<template>
    <div class="ad">
        <div class="login">
            <el-form ref="user" :model="user" label-width="80px" :rules="rules">
            <el-form-item label="账号" prop="uname"  >
            <el-input v-model="user.uname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="uphone" style="" >
            <el-input v-model="user.uphone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="upwd" >
            <el-input type="password" v-model="user.upwd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="user.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-button type="warning" style="margin-left: 120px;" @click="reg(user)" >注册</el-button>
            </el-form>
        </div>
        
    </div>    
    </template>
    
    <script>

     export default{
        name :'MileUserReg',
        data(){
            var uname = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }else{
          this.$axios.get("User/user.action?uname="+value)
                .then(rs=>{
                  if(rs.data.data!=null){
                    return callback(new Error('用户名已存在'));
                  }else{
                    return callback();
                  }
                }).catch();
        }

      };
      var uphone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        }

      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.user.upwd !== '') {
            // this.$refs.ruleForm.validateField('upwd');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.user.upwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
            return{
                user:{uname:"",upwd:"",checkPass:"",uphone:""},
                rules: {
                    upwd: [
            { validator: validatePass, trigger: 'blur' }
          ],
                checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ], 
                uname: [
            { validator: uname, trigger: 'blur' }
          ],
          uphone: [
            { validator: uphone, trigger: 'blur' }
          ]
        }
            }
        },
        methods:{
            reg(user){
                this.$axios.post("User/reg.action",this.user)
                .then(rs=>{
                    console.log(rs);
                    if(rs.data.errorcode==1){
                        this.$message({
                        message: '注册成功',
                        type: 'success'})
                        this.$router.push('/MileLogin');
                    }else{
                        this.$message.error('注册失败');
                    }}).catch();
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
    .ad{
        padding-top: 350px;
        /* margin-top: 350px; */
        height:63%;
        width: 100%;
        background-color: rgba(255, 0, 0, 0.233);
    }
    </style>