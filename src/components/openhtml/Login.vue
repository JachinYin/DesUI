<template>
  <div class="login">
    <div class="login_box">
      <div class="body">
          <span class="title">
                <span style="color:#2b89fb;">▌</span> 登陆
            <!--<span class="close_btn" @click="isLoginVisible = !isLoginVisible">&#10006</span>-->
          </span>
        <hr>
      </div>
      <div class="body">
        <div class="icon">
          <img src="../../assets/timg.png" alt="logo">
        </div>

        <el-form ref="form" :model="form" label-width="40px">
          <el-form-item label="账户">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item align="left">
            <!--<el-checkbox-group v-model="form.rememberMe">-->
              <el-checkbox label="记住我" name="type"></el-checkbox>
            <!--</el-checkbox-group>-->
            <!--<span>记住我</span>-->
            <el-button type="primary" @click="login()">登 陆</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="foot"><span>还没有账号？点击<span class="reg" @click="register">注册</span></span></div>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data(){
      return{
        form:{
          name: '',
          password: '',
          rememberMe: false,
        },
        isLoginVisible: false
      }
    },
    methods:{
      login: function () {
        this.$message.success("成功");
        console.log(this.form);
      },
      register: function () {
        window.open("http://localhost:8080/#/register", "_blank");
        this.$message.success("注册成功");
      }
    },
    watch: {
     form: function(val){
       console.log(val);
       if(!val) return;
      if(!/^\d*\.?\d{0,2}$/.test(val.name)){
        return ''
      }
    }
  }
  }
</script>

<style scoped>
  .login{
    height: 100%;
    width: 100%;
    /*background: #f2f2f2;*/
    position: absolute;
    left: 0;
  }
  .login_box{
    position: relative;
    text-align: center;
    background: white;
    /*background: linear-gradient(to bottom right, rgba(250, 251, 255, 1), #7cc2ff); !* 标准的语法（必须放在最后） *!*/
    color: #858585;
    border-radius: 6px;

    height: 560px;
    width: 400px;
    margin: 100px auto;
    z-index: 1000;
    box-shadow:0 0 10px #858585;
    padding-top: 1px;
  }
  .body{
    text-align: left;
  }
  .body .icon{
    text-align: center;
  }
  .body .icon img{
    width: 240px;
    height: 240px;
    -webkit-user-drag: none;
  }

  .body .title{
    display: block;
    text-align: left;
    margin: 15px 25px;
    height: 25px;
    font-size: 18px;
  }
  .body .close_btn{
    float: right;
    padding-right: 10px;
    cursor: pointer;
  }
  .body hr{
    border: none;
    width: 90%;
    border-bottom: 1px #bfbfbf4a solid;
  }

  .foot {
    position: relative;
    bottom: 0;
    height: 50px;
  }
  .foot .reg{
    color: #409EFF;
    cursor: pointer;
  }

  .el-form{
    width: 250px;
    margin: auto;
  }
  .el-button{
    /*width: 100%;*/
  }

</style>
