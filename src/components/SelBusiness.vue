<template>
    <div id="app">
		<el-dialog title="修改管理员信息" :visible.sync="dialogFormVisible">
			  <el-form :model="AdminInfos">
			    <el-form-item label="序号" :label-width="formLabelWidth">
			      <el-input v-model="AdminInfos.bid" disabled autocomplete="off"></el-input>
			    </el-form-item>
				<el-form-item label="账号" :label-width="formLabelWidth">
				  <el-input  v-model="AdminInfos.busername"  autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" :label-width="formLabelWidth">
				  <el-input v-model="AdminInfos.bpassword"  autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="姓名" :label-width="formLabelWidth">
				  <el-input v-model="AdminInfos.bname"  autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="手机号" :label-width="formLabelWidth">
				  <el-input v-model="AdminInfos.bphone" autocomplete="off"></el-input>
				</el-form-item>
			
			  </el-form> 
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false">取 消</el-button>
			    <el-button type="primary" @click="update()">确 定</el-button>
			  </div>
			</el-dialog>
		<!-- 查询管理员信息 -->
			  <el-table :data="AdminInfo" style="width: 100%">
			    <el-table-column
			      prop="bid"
			      label="序号"
				  width="256">
			    </el-table-column>
			    <el-table-column
			      prop="busername"
			      label="账号"
				  width="256">
			    </el-table-column>
			    <el-table-column
			      prop="bpassword"
			      label="密码"
				  width="256">
			    </el-table-column>
				<el-table-column
				  prop="bname"
				  label="姓名"
				  width="256">
				</el-table-column>
                <el-table-column
				  prop="bphone"
				  label="手机号"
				  width="256">
                  
				</el-table-column>
                <!--  -->
				   <el-table-column
				      fixed="right"
				      label="操作"
					  width="256">
				      <template slot-scope="scope">
				        <el-button @click="del(scope.row)" type="danger" icon="el-icon-delete" circle  size="small"/>
						<!-- 修改管理员信息 -->
				        <el-button @click="upd(scope.row)" type="primary" icon="el-icon-edit" circle size="small"/>
				      </template>
			
				    </el-table-column>
			  </el-table>
              <div class="page" style="height:50px;display: flex;align-items: center;justify-content: center;">
          <!--
           total 总条数
           page-size:每页显示条数
           current-page ：当前页码  第一页  第二页
           total=10  pageSize=3
            4
           -->
           <el-pagination
               @size-change="handleSizeChange"
               @current-change="handleCurrentChange"
               :current-page="currentPage"
               :page-sizes="[5, 10, 20, 25]"
               :page-size="pageSize"
               layout="total, sizes, prev, pager, next, jumper"
               :total="zongshu">
             </el-pagination>
      </div>
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
			AdminInfos:{
				id:"",
				busername:"",
				bpassword:"",
				bname:"",
				bphone:"",
			},
          zongshu:-1,
          pageSize:5,
          currentPage:1
            }
        },
        methods:{
			//查询所有
            sel(){
                this.$axios.get("admin/SelBusiness.action",{params:{currpage:this.currentPage,size:this.pageSize}})
                .then(res=>{
                    this.AdminInfo=res.data.data;
                    this.zongshu=res.data.size;
                    console.log(res);
                }).catch(err => console.log(err));   
            },
			//删除
			del(row){
				this.$axios.get("admin/DelBusiness.action?bid="+row.bid)
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
				this.$axios.post("admin/UpdBusiness.action",this.AdminInfos)
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
            handleSizeChange(val){
          //每页显示条数发生改变则触发此函数handleSizeChange，参数val作用当前新的每页条数
          this.pageSize=val;
          this.sel();
        },
        handleCurrentChange(val){
          //当前页码发生改变则触发此函数handleCurrentChange，参数val作用当前新的页码
          this.currentPage=val;
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
  