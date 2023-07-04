<template>
    <div class="ad">
        <el-container>
            <el-header style="width: auto; height: 50px; background: #e86b6b;padding: 0px;"><div style="width: 100%;background: #696969; margin-top: 10px;height: 30px;">aaa</div></el-header>
             <el-main style="background-color: #ffffff; width: 100%;height: auto; ">
            <div>
                <el-carousel height="613px" direction="vertical" :autoplay="false">
                    <el-carousel-item v-for="item in page" :key=item.id>
                        <img :src=item.imageurl :title="item.title" style="height: 613px; width: 1530px;">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div style="height: 400px;">
                <div style="height: 400px; width: 1050px; margin-left: 300px;">
                    <ul style="height: 300px; width: 150px;list-style: none; list-style-type: disc; float: left; margin: 20px 30px;" v-for="item in allShopa" :key="item.id">
                        <li style="display: list-item;">
                            <div>
                                <img :src="item.pmainimage" height="300px" width="210px" :title="item.title">
                            </div>
                            <h6 style="margin-top: -5px; color: #fe7535; ;">￥{{ item.price }} {{ item.pname }}</h6>
                        </li>
                    </ul>
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
                allShopa:[]
            }
        },
        methods:{
            lunbo(){
                this.$axios
            .get("LunBoServlet")
            .then(rs=>{
                this.page=rs.data
            })
            .catch()
        },
        allShop(){
            this.$axios
            .get("ProductServlet")
            .then(rs=>{
                this.allShopa=rs.data
            })
            .catch()
        }

        },
        created(){
            this.lunbo();
            this.allShop();
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