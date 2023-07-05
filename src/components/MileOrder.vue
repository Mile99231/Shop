<template>
    <div class="ad">
        <el-container>
            <!-- //页头 -->
            <el-header style="width: auto; height: 50px; background: #faa148;padding: 0px;">
                <el-dropdown @command="handleCommand" >
                    <span class="el-dropdown-link" style="margin-left: 1500px;">{{ name }}<i class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a" >个人信息</el-dropdown-item> 
                        <el-dropdown-item command="b" >退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>


            <!-- //页体 -->
             <el-main style="background-color: #ffffff; width: 100%;height: auto; ">
                <div style="background-color: red; width: 900px; height: 600px; margin-left: 300px;">

                </div>

            </el-main>
        </el-container>
    </div>    
    </template>
    
    <script>
     export default{
        name :'MileUserMain',
        data(){
            return{
                page:[],
                allShopa:[],
                title:"",
                name:""
            }
        },
        methods:{
           
        exit(){
            sessionStorage.clear();
            this.$router.push("/MileLogin");            //跳转到登录MileLogin页面。。。。。。。。。。。。。。
        },
        // 页头 个人信息
        handleCommand(c){
            if(c==='a'){
                if(sessionStorage.getItem("user")!=null){
                    this.$router.push('/MileUserMain');
                }else{
                    this.$message.error("请先登录");
                    this.$router.push('/MileLogin');
                }
            }
            if(c==='b'){
                this.exit();
            }
        },
        tiao(item){
            if(sessionStorage.getItem("user")!=null){
                this.$router.push({name:'MileUserMain',params:item});            //跳转到MileUserMain页面。。。。。。。。。。。。
            }else{
                this.$message.error("请先登录");
                this.$router.push('/MileLogin');
            }
        }

        },
        created(){
            this.name=sessionStorage.getItem("user");            //获取用户名称。。。。。。。。。。。。。。。。。。。。。。。。
        }
     }
    </script>
    
    <style scoped>
    .ad{
        margin: 0px;
    }
    .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
    </style>