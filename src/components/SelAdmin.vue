<template>
    <div id="app">
		<el-button @click="add()">添加</el-button>
		<el-dialog title="添加" :visible.sync="dialogFormVisible1">
			<el-form :model="AdminInfos">
				<el-form-item label="id" :label-width="formLabelWidth" >
				  <el-input  v-model="AdminInfos.id" disabled placeholder="无需填写此项"  autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="账号" :label-width="formLabelWidth">
				  <el-input  v-model="AdminInfos.username"  autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" :label-width="formLabelWidth">
				  <el-input v-model="AdminInfos.password"  autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="姓名" :label-width="formLabelWidth">
				  <el-input v-model="AdminInfos.name"  autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别" :label-width="formLabelWidth">
				  <el-input v-model="AdminInfos.sex"   autocomplete="off"></el-input>
				</el-form-item> 
				<el-form-item label="年龄" :label-width="formLabelWidth">
				  <el-input v-model="AdminInfos.age" autocomplete="off"></el-input>
				</el-form-item>
				<!-- <el-form-item label="头像" :label-width="formLabelWidth">
				  <el-input v-model="AdminInfos.avatarUrl" autocomplete="off"></el-input>
				</el-form-item> -->
				<el-form-item label="手机号" :label-width="formLabelWidth">
				  <el-input v-model="AdminInfos.phone" autocomplete="off"></el-input>
				</el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible1 = false">取 消</el-button>
			    <el-button type="primary" @click="addInfo()">确 定</el-button>
			  </div>
			</el-dialog>

		<el-dialog title="修改管理员信息" :visible.sync="dialogFormVisible">
			<el-upload class="avatar-uploader" :action="'http://localhost:8089/shop/file/upload.action'" :data="AdminInfos"
            :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="this.user.avatarUrl" :src="this.user.avatarUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
			  <el-form :model="AdminInfos">
				
			    <el-form-item label="序号" :label-width="formLabelWidth">
			      <el-input v-model="AdminInfos.id" disabled autocomplete="off"></el-input>
			    </el-form-item>
				<el-form-item label="账号" :label-width="formLabelWidth">
				  <el-input  v-model="AdminInfos.username"  autocomplete="off"></el-input>
				</el-form-item>
				
				<el-form-item label="姓名" :label-width="formLabelWidth">
				  <el-input v-model="AdminInfos.name"  autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别" :label-width="formLabelWidth">
				  <el-input v-model="AdminInfos.sex"   autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="年龄" :label-width="formLabelWidth">
				  <el-input v-model="AdminInfos.age" autocomplete="off"></el-input>
				</el-form-item>
				
				<el-form-item label="手机号" :label-width="formLabelWidth">
				  <el-input v-model="AdminInfos.phone" autocomplete="off"></el-input>
				</el-form-item>
			
			  </el-form> 
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false">取 消</el-button>
			    <el-button type="primary" @click="update()">确 定</el-button>
			  </div>
			</el-dialog>
		<!-- 查询管理员信息 -->
				<input type="text" placeholder="请输入用户名" v-model="user.username"/><br>
				<input type="password" placeholder="请输入密码" v-model="user.password"/><br>
				<input type="text" placeholder="请输入邮箱" v-model="user.id"/><br>
				<span>{{ this.user.id }}</span>
			  <el-table :data="AdminInfo" style="width: 100%">
			    <el-table-column
			      prop="id"
			      label="序号"
				  width="171">
				 
			    </el-table-column>
			    <el-table-column
			      prop="username"
			      label="账号"
				  width="171">
				 
			    </el-table-column>
			    <el-table-column
			      prop="password"
			      label="密码"
				  width="171">
				 
			    </el-table-column>
				<el-table-column
				  prop="name"
				  label="姓名"
				  width="171">
				
				</el-table-column>
				<el-table-column
				  prop="sex"
				  label="性别"
				  width="171">
				
				</el-table-column>
				<el-table-column
				  prop="age"
				  label="年龄"
				  width="171">
				
				</el-table-column>
                <el-table-column
				  prop="avatarUrl"
				  label="头像"
				  width="171">
				 
					<img width="50" :src="this.user.avatarUrl">
				
				</el-table-column>
                <el-table-column
				  prop="phone"
				  label="手机号"
				  width="171">
				
				</el-table-column>
                <!--  -->
				   <el-table-column
				      fixed="right"
				      label="操作"
					  width="171">
				      <template slot-scope="scope">
				        <el-button @click="del(scope.row)" type="danger" icon="el-icon-delete" circle size="small"/>
						<!-- 修改管理员信息 -->
				        <el-button @click="upd(scope.row)" type="primary" icon="el-icon-edit" circle size="small"/>
				      </template>
			
				    </el-table-column>
			  </el-table>
			
            </div>
  </template>
   
  <script>
  export default {
    name: 'App',
    data(){
         return{
			formLabelWidth: '120px',
			dialogFormVisible1:false,
			dialogTableVisible: false,
			dialogFormVisible: false,
            AdminInfo:[],
			user: sessionStorage.getItem("admin") ? JSON.parse(sessionStorage.getItem("admin")) : {},
			AdminInfos:{
				id:"",
				username:"",
				password:"",
				name:"",
				sex:"",
				age:"",
				address:"",
				phone:"",
				avatarUrl:''
			}
            }
        },
        methods:{
			//查询所有
            sel(){
                this.$axios.get("admin/SelAdmin.action")
                .then(res=>{
					this.AdminInfo=res.data;
					// console.log(this.user.username);
					this.user.avatarUrl = this.user.avatarUrl != null ? "http://localhost:8089/shop/images/" + this.user.avatarUrl : null
                }).catch(err => console.log(err));   
            },
			//删除
			del(row){
				this.$axios.get("admin/DelAdmin.action?id="+row.id)
                .then(res=>{
					if(res.data.errorcode===0){
						this.$message({
          							showClose: true,
          							message: '删除成功',
          							type: 'success'
        							});
									this.sel();
					}                
                }).catch(err => console.log(err));  
				this.sel();
			},
			//执行修改操作
			update(){
				this.$axios.post("admin/UpdAdmin.action",this.AdminInfos)
                .then(res=>{
				if(res.data.errorcode===0){
				    this.$message({
				          showClose: true,
				          message: '修改成功',
						  type: 'success'
				        });
						this.dialogFormVisible =false
				 this.sel();
				 }
                }).catch(err => console.log(err));  
			},

			//修改赋值 开启窗口
			upd(row){ 
				this.dialogFormVisible = true
				this.AdminInfos=row;
				console.log(row);
			},
			handleAvatarSuccess(res, file) { //上传成功后触发函数
						this.user.avatarUrl = URL.createObjectURL(file.raw); //同步显示图片
						this.$message.info('头像修改成功，同时将右侧信息同步！'); //成功后提示文字
					},
					beforeAvatarUpload(file) { //上传前，触发函数，此函数内可以进行文件类型的判定。当前我的函数就是判断上传的头像必须为jpg格式同时小于2MB
						const isJPG = file.type === 'image/jpeg';
						const isLt2M = file.size / 1024 / 1024 < 2;

						if (!isJPG) {
						this.$message.error('上传头像图片只能是 JPG 格式!');
						}
						if (!isLt2M) {
						this.$message.error('上传头像图片大小不能超过 2MB!');
						}
						return isJPG && isLt2M;
					},
					returnPage() {//返回按钮
						this.$router.push("/home");
					},
				//添加
				addInfo(){
				this.$axios.post("admin/AddAdmin.action",this.AdminInfos)
                .then(res=>{
				if(res.data.errorcode===0){
				
				    this.$message({
				          showClose: true,
				          message: '添加成功',
						  type: 'success'
				        });
						this.dialogFormVisible =false
				 this.sel();
				 }
                }).catch(err => console.log(err));  
			},
			//添加开启窗口
			add(){ 
				this.dialogFormVisible1 = true;
			}
        },
        created(){
            this.sel();
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
  