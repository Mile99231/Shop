<template>
    <div class="ad">
        <el-container>
            <!-- //页头 -->
            <el-header style="width: auto; height: 50px; background: #faa148;padding: 0px;">
                <el-dropdown @command="handleCommand" >
                    <span class="el-dropdown-link" style="margin-left: 1500px;">{{ user }}<i class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a" >个人信息</el-dropdown-item> 
                        <el-dropdown-item command="d" >订单信息</el-dropdown-item> 
                        <el-dropdown-item command="b" >退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>


            <!-- //页体 -->
             <el-main style="background-color: #f7a2a2; width: 100%;height: auto; ">
                <div style="background-color: #f7a2a2; width: 900px; height: 600px; margin-left: 300px; ">
                    <div style="width: 350px; height: 400px; background-color: #601c1c; float: left;"><img :src="this.$route.params.pmainimage" style="width: 350px; height: 400px;"></div>
                    <div style="color: #392121;background-color: #d79191; height: 400px; margin-left: 500px;">
                         <div style="text-align: center;"><h3 >{{ this.$route.params.pname }}</h3></div><br><br>
                        <div style="color: #8f4902;text-align: center;"><h4>{{ this.$route.params.price }}元</h4></div><br><br>
                        <div style="text-align: center;"><h4>剩余数量:{{ this.$route.params.pstock }}辆</h4></div><br><br>
                        <div style="text-align: center;">在售状态{{ this.$route.params.status }}</div><br><br>
                        <template>
                            <el-input-number v-model="num" :min="1" :max="10" label="描述文字" style="margin-left: 110px;"></el-input-number>
                        </template><br><br><br>
                        <el-button type="success" @click="addShop" style="margin-left: 150px;">购买</el-button>
                    </div>
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
                user:"",/*用户名称 */
                num:1,/*购买数量 */
                price:this.$route.params.price,/*价格 */
                dname: this.$route.params.pname,/*商品名称 */
                proid:this.$route.params.proid

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
                    this.$router.push('/MileUser');
                }else{
                    this.$message.error("请先登录");
                    this.$router.push('/MileLogin');
                }
                if(c==='d'){
                if(sessionStorage.getItem("user")!=null){
                    this.$router.push('/MileMyOrder');
                }else{
                    this.$message.error("请先登录");
                    this.$router.push('/MileLogin');
                }
            }
            }
            if(c==='b'){
                this.exit();
            }
        },
        addShop(){
            this.$axios.get("order/add.action?user="+this.user+"&dname="+this.dname+"&num="+this.num+"&price="+this.price+"&proid="+this.proid)
            .then(rs=>{
                if(rs.data.errorcode==1){
                    this.$message({message: '购买成功',type: 'success'});
                    console.log(this.proid);
                }else{
                    this.$message.error("购买失败");
                }
            })
            .catch()
        }

        },
        created(){
            this.user=JSON.parse(sessionStorage.getItem('user'));      //获取用户名称。。。。。。。。。。。。。。。。。。。。。。。。
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