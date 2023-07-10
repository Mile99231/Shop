<template>
    <div class="ad" display:grid>
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
             <el-main style="background-color: #f8f8f8; width: 80%;height: 600px; margin: auto; margin-top: 60px; border-radius: 4px;">
                    <!-- 用户头像上传 -->
            <div style="float: left;">
                
                <h4 style="text-align: center; width: 178px;">上传头像</h4>
                <div style="height: 178px; width: 178px;background-color: #b6afaf;">
                    
                    <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                </div>
                
            </div>
            <!-- 个人信息 -->
            <div style="float: left; margin-left: 50px;margin-top: 20px; border: 2px solid #b6afaf; height: 178px; width:990px ;">
                <h4 style="height: 60px;">用户名:     {{ user.uname }}</h4>
                <h4 style="height: 59px;">手机号:     {{ user.uphone }}</h4>
                <h4 style="height: 59px;">注册日期:       <el-date-picker v-model="time1" type="date" disabled placeholder="选择日期">
    </el-date-picker></h4>
            </div>
            <!-- 添加收获地址 -->
            <el-button type="text" @click="dialogFormVisible = true">添加收获地址</el-button>
            <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="姓名" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="性别" :label-width="formLabelWidth">
                        <el-radio v-model="form.radio" label="男">男</el-radio>
                        <el-radio v-model="form.radio" label="女">女</el-radio>
                    </el-form-item>

                    <el-form-item label="手机号" :label-width="formLabelWidth">
                        <el-input v-model="form.phone" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="收货地址" :label-width="formLabelWidth">
                        <el-input v-model="form.addrss" autocomplete="off"></el-input>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click=add()>确 定</el-button>
                </div>
            </el-dialog>

            <!-- 我的收获地址 -->
            <el-button type="text" @click=select()>查看收获地址</el-button>
            <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
                <el-table :data="gridData">
                    <el-table-column property="name" label="姓名" width="200"></el-table-column>
                    <el-table-column property="sex" label="性别" width="150"></el-table-column>
                    <el-table-column property="phone" label="手机" width="150"></el-table-column>
                    <el-table-column property="addrss" label="地址" width="200"></el-table-column>
                </el-table>
            </el-dialog>


               </el-main>
        </el-container>
    </div>    
    </template>
    
    <script>
     export default{
        name :'MileUser',
        data(){
            return{
                    imageUrl: '',
                    name:"",
                    user:{},
                    bfile: '',
                    time1:"",
                    form: {
          name: '',
          radio: '男',
          phone:'',
          addrss:'',
          user:''
        },
        formLabelWidth: '120px',
        dialogTableVisible: false,
        dialogFormVisible: false,
        gridData: [],

            }
        },
        methods:{
            handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        this.bfile = file;
        return isJPG && isLt2M;
      },
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
        },
        // 查询用户信息
        User(){
            this.$axios
            .get("UserServlet?name="+this.name)
            .then(rs=>{
               this.user=rs.data
               this.time1=rs.data.ulasttime
            })
            .catch()
        },
        //添加收获地址
        add(){
            let fd = new FormData();
            fd.append("name",this.form.name);
            fd.append("radio",this.form.radio);
            fd.append("phone",this.form.phone);
            fd.append("addrss",this.form.addrss);
            fd.append("user",this.form.user);

            this.$axios
            .post("AddaddrssServlet",fd)
            .then(rs=>{
                if(rs.data==1){
                    this.$message({
                        message: '恭喜你，这是一条成功消息',
                        type: 'success'
                    });
                }else{
                    this.$message.error('错了哦，这是一条错误消息');
                }
                this.dialogFormVisible = false
            })
            .catch()
        },
        //查询收货地址
        select(){
            this.dialogTableVisible = true;

            this.$axios
            .get("SelectAddressServlet?name="+this.name)
            .then(rs=>{
                console.log(rs);
                this.gridData = rs.data;
            })
            .catch()
        }
        
        },
        created(){
            this.name=JSON.parse(sessionStorage.getItem('user'));  
            this.User();
            this.form.user=JSON.parse(sessionStorage.getItem('user'));
        }
     }
    </script>
    
    <style scoped>
     .avatar-uploader .el-upload {
    border: 1px dashed #000000;
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
    color: #41454a;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
    
  }
    </style>