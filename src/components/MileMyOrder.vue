<template>
    <div class="ad">
        <el-container>
            <!-- //页头 -->
            <el-header style="width: auto; height: 50px; background: #faa148;padding: 0px;">
                <!-- 右上角个人信息 -->
                <el-dropdown @command="handleCommand" >
                    <span class="el-dropdown-link" style="margin-left: 1800px;">{{ name }}<i class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a" >个人信息</el-dropdown-item> 
                        <el-dropdown-item command="d" >订单信息</el-dropdown-item> 
                        <el-dropdown-item command="b" >退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>


            <!-- //页体 -->
             <el-main style="background-color: #3a2525; width: 100%;height: auto; ">
                <!-- 二级框架 包整个订单信息 -->
                <div style="background: red; height: 1600px; width: 1600px; margin-left: 100px   ;">
                    <!-- 三级 单个订单信息 -->
                    <div style="background-color: blue; width: 1600px; height: 300px;">
                        <!-- 四级 订单图片 -->
                        <div style="background-color: rosybrown; height: 300px; width: 350px;">

                        </div>
                    </div>
                </div>
            </el-main>
        </el-container>

    </div>    
    </template>
    
    <script>
     export default{
        name :'MileMyOrder',
        data(){
            return{
    
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
                    this.$router.push('/MileUser');
                }else{
                    this.$message.error("请先登录");
                    this.$router.push('/MileLogin');
                }
            }
        },
        },
        created(){
    
        }
     }
    </script>
    
    <style scoped>
    
    </style>