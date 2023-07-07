<template>
    <div id="app">
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
				  prop="idcard"
				  label="身份证号"
				  width="171">
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
				        <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
				        <el-button @click="upd(scope.row)" type="text" size="small">修改</el-button>
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
            AdminInfo:[]
            }
        },
        methods:{
            sel(){
                this.$axios.get("SelAdminServlet")
                .then(res=>{
                    this.AdminInfo=res.data;
                    
                }).catch(err => console.log(err));   
            },
			del(row){
				this.$axios.get("DelAdminServlet?id="+row.id)
                .then(res=>{
					if(res.data=="OK"){
						this.$message({
          							showClose: true,
          							message: '删除成功',
          							type: 'success'
        							});
					}                
                }).catch(err => console.log(err));  
				this.sel();
			}

        },
        created(){
            this.sel();
        }
     }
  
    
  </script>  
  
  <style scoped> 

  </style>
  