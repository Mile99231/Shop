<template>
    <div class="editpass">
      <el-form :model="adminForm" status-icon  ref="adminForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model.number="adminForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="原密码" prop="password">
          <el-input type="password" v-model="adminForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="adminForm.newpass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="adminForm.checkPass" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('adminForm')">提交</el-button>
          <el-button @click="resetForm('adminForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
    export default {
      name: '',
      data() {
        return {
          adminForm: {
            username: '',
            password: ''
          },
        }
      },
      methods: {
        submitForm(){
            this.$axios.get("admin/UpdAdminPwd.action",{params:this.adminForm}).then(res=>{
                console.log(res);
            })
        }
   
      },
      created() {
        this.adminForm.username= JSON.parse(sessionStorage.getItem("username"));
      }
    }
  </script>
  <style scoped>
  </style>