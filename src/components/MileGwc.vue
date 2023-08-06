<template>
    <div class="ad">
        <el-container>
            <!-- //页头 -->
            <el-header style="width: auto; height: 50px; background: #faa148;padding: 0px;">
                <!-- 右上角个人信息 -->
                <el-dropdown @command="handleCommand" >
                    <span class="el-dropdown-link" style="margin-left: 1500px;">{{ user }}<i class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="e" >主页</el-dropdown-item>
                        <el-dropdown-item command="a" >个人信息</el-dropdown-item> 
                        <el-dropdown-item command="d" >订单信息</el-dropdown-item> 
                        <el-dropdown-item command="f" >购物车</el-dropdown-item> 
                        <el-dropdown-item command="b" >退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>


            <!-- //页体 -->
             <el-main style="background-color: #3a2525; width: 100%;height: 918px; ">
                <template>
                <el-table
                    ref="multipleTable"
                    :data="product"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>
                    <el-table-column
                    label="收藏时间"
                    width="360">
                    <template slot-scope="scope">{{ scope.row.gcreatetime }}</template>
                    </el-table-column>
                    <el-table-column
                    prop="gid"
                    label="id"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="gname"
                    label="商品名称"
                    width="360" 
                    >    
                    </el-table-column>
                    <el-table-column
                    prop="gnum"
                    label="数量"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="gprice"
                    label="单个价格"
                    width="360">
                    </el-table-column>
                    <el-table-column
                    label="删除"
                    width="360">
                    <template slot-scope="scope">
                        <el-button type="danger" @click="del(scope.row)">删除</el-button>
                    </template>
                    
                    </el-table-column>
                </el-table>
                <div style="margin-top: 20px">
                </div>
                </template>
                <el-button type="success" @click="add">批量购买</el-button>
                <el-button type="danger" @click="add">批量删除</el-button>


            </el-main>
        </el-container>

    </div>    
    </template>
    
    <script>
     export default{
        name :'MileGwc',
        data(){
            return{
                user:"",/*用户名称 */
                product:[],
                multipleSelection:[],
                list:[]
            }
        },
        methods:{
    //退出
    exit(){
            sessionStorage.clear();
            this.$router.push("/MileLogin");            //跳转到登录MileLogin页面。。。。。。。。。。。。。。
        },
        // 页头 个人信息
        handleCommand(c){
            if(c==='a'){
                if(sessionStorage.getItem("user")!=null){
                    this.$router.push('/MileUser');
                }else{
                    this.$message.error("请先登录");
                    this.$router.push('/MileLogin');
                }
            }
            if(c==='b'){
                this.exit();
            }
            if(c==='d'){
                if(sessionStorage.getItem("user")!=null){
                    this.$router.push('/MileMyOrder');
                }else{
                    this.$message.error("请先登录");
                    this.$router.push('/MileLogin');
                }
            }
            if(c==='e'){
                if(sessionStorage.getItem("user")!=null){
                    this.$router.push('/MileUserMain');
                }else{
                    this.$message.error("请先登录");
                    this.$router.push('/MileLogin');
                }
            }
            if(c==='f'){
                if(sessionStorage.getItem("user")!=null){
                    this.$router.push('/MileGwc');
                }else{
                    this.$message.error("请先登录");
                    this.$router.push('/MileLogin');
                }
            }
        },
        sel(){
            this.$axios.get("gwc/sel.action?user="+this.user)
            .then(rs=>{
                console.log(rs);
                this.product=rs.data.data
            })
            .catch()
        },
        handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      del(row){
        console.log(row.gid);
         this.$axios.get("gwc/del.action?gid="+row.gid)
            .then(rs=>{
                if(rs.data.errorcode===0){
                     this.$message({
                     message: '恭喜你，这是一条成功消息',
                    type: 'success'
                     });
                     this.sel();
                }else{
                this.$message.error('错了哦，这是一条错误消息');
                }
                
            })
            .catch()
      },
      add(){
        let ids=[];
        this.multipleSelection.forEach(element =>{
            ids.push(element.gid)
        })
        this.$axios.post("gwc/delByIds.action",ids)
            .then(rs=>{
                if(rs.data.errorcode===0){
                     this.$message({
                     message: '恭喜你，这是一条成功消息',
                    type: 'success'
                     });
                     this.sel();
                }else{
                this.$message.error('错了哦，这是一条错误消息');
                }
                
            })
            .catch()
      }
        },
        created(){
            this.user=JSON.parse(sessionStorage.getItem('user'));
            this.sel();
        }
     }
    </script>
    
    <style scoped>
    
    </style>