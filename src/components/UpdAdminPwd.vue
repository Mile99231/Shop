<template>
    <div class="editpass">
      <el-form :model="adminForm" status-icon  ref="adminForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model.number="adminForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input type="password" v-model="adminForm.password" autocomplete="off"></el-input>
        </el-form-item>

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
            this.$axios.get("admin/UpdAdminPwd.action",{params:this.adminForm})
            .then(res=>{
                if(res.data.errorcode===0){
                  this.$message({
				          showClose: true,
				          message: '修改成功',
						  type: 'success'
				        });
                }
            })
        },

   
      },
      created() {
        this.adminForm.username= JSON.parse(sessionStorage.getItem("username"));
      }
    }
  </script>
  <style scoped>
    .avatar-uploader {
      text-align: left;
      padding-bottom: 10px;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 138px;
      height: 138px;
      line-height: 138px;
      text-align: center;
    }
    .avatar {
      width: 160px;
      height: 160px;
      display: block;
    }
  </style>