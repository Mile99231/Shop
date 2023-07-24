<template>
    <div class="ad">
        <el-container>
            <!-- //页头 -->
            <el-header style="width: auto; height: 50px; background: #faa148;padding: 0px;">
                <!-- 右上角个人信息 -->
                <el-dropdown @command="handleCommand" >
                    <span class="el-dropdown-link" style="margin-left: 1800px;">{{ user }}<i class="el-icon-arrow-down el-icon--right"></i></span>
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
                    <div  style="background-color: rgb(248, 191, 85); width: 1600px; height: 300px; border: #3a2525 solid;" v-for="item in this.product" :key="item.id">
                        <!-- 四级 订单图片 -->
                        <div style="background-color: rgb(255, 255, 255); height: 300px; width: 350px;float: left;">
                            <img :src=item.product.pmainimage style="height: 280px; width: 350px;">
                        </div>
                        <!-- 四级 订单信息 -->
                        <div style="float: left;">
                            <h1>订单号：{{ item.did }}</h1>
                            <h1>商品名称：{{ item.dname }}</h1>
                            <h1>购买数量：{{ item.dsum }}</h1>
                            <h1>价格：{{ item.dprice }}</h1>
                            <h1>购买时间：{{ item.dtime }}</h1>
                        </div>
                    </div>
                    <div >

                    </div>
                </div>
            </el-main>
        </el-container>

    </div>    
    </template>
    
    <script>
import axios from 'axios';
     export default{
        name :'MileMyOrder',
        data(){
            return{
                user:"",/*用户名称 */
                product:[]
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
        },
        sel(){
            this.$axios.get("order/sel.action?user="+this.user)
            .then(rs=>{
                console.log(rs);
                this.product=rs.data.data
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