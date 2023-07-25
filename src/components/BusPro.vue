<template>
    <div id="app">
      <el-table
    :data="AdminInfo"
    style="width: 100%;margin-bottom: 20px;"
    row-key="pstock"
    default-expand-all
    :tree-props="{children: 'products'}">
    <el-table-column
      prop="bname"
      label="商家名称"
      width="256">
    </el-table-column>
    <el-table-column
      prop="pid"
      label="商品id"
      width="256">
    </el-table-column>
    <el-table-column
      prop="pname"
      label="商品名称"
      sortable
      width="256">
    </el-table-column>
    <el-table-column
      prop="proid"
      label="商品图片"
      width="180">
      <template slot-scope="scope">
      <img width="50" :src="scope.row.pmainimage">
      </template>
    </el-table-column>
    <el-table-column
      prop="price"
      label="商品价格"
      width="180">
    </el-table-column>
    <el-table-column
      prop="pstock"
      label="商品库存"
      width="180">
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
            AdminInfo:[],
            hasChildren:true,
            zongshu:-1,
          pageSize:5,
          currentPage:1
         }
        },
        methods:{
			//查询所有
            sel(){
                this.$axios.get("admin/selBusPro.action",{params:{currpage:this.currentPage,size:this.pageSize}})
                .then(res=>{
                    this.AdminInfo=res.data.data;
                    this.zongshu=res.data.size;
                    console.log(res);
                }).catch(err => console.log(err));   
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
  