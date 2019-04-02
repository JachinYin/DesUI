<template>
  <div class="editInfo">
    <div class="header">
      <Logout/>
    </div>

    <div class="container">
      <div class="form_box">
        <span class="title" style="color: #a98d17">▌基本信息</span>
        <div class="item"><div class="keyClass">昵称</div><el-input type="text"></el-input></div>
        <div class="item"><div class="keyClass">联系手机</div><el-input type="text"></el-input></div>
        <div class="item"><div class="keyClass">邮箱</div><el-input type="text"></el-input></div>
        <div class="item"><div class="keyClass">微信</div><el-input type="text"></el-input></div>
        <div class="item"><div class="keyClass">QQ</div><el-input type="text"></el-input></div>
        <div class="item"><div class="keyClass">地址</div><el-input type="text"></el-input></div>
      </div>
      <div class="tip"><span @click="showMore=!showMore"><span v-if="!showMore">显示更多</span><span v-else>收起更多</span></span></div>
      <div class="form_box" v-if="showMore">
        <span class="title">▌更多信息</span>
        <div class="item"><div class="keyClass">昵称</div><el-input type="text"></el-input></div>
        <div class="item"><div class="keyClass">联系手机</div><el-input type="text"></el-input></div>
        <div class="item"><div class="keyClass">邮箱</div><el-input type="text"></el-input></div>
        <div class="item"><div class="keyClass">微信</div><el-input type="text"></el-input></div>
        <div class="item"><div class="keyClass">QQ</div><el-input type="text"></el-input></div>
        <div class="item"><div class="keyClass">地址</div><el-input type="text"></el-input></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Logout from "../inc/Logout";
  export default {
    name: "EditInfo",
    components: {Logout},
    data:function () {
      return{
        showMore: false,
      }
    },
    methods:{
      refresh:function () {
        let that = this;
        $.ajax({
          url: that.preUrl + '/getDesigner',
          data:{
            aid: -10
          },
          success: function (res) {
            if(res.success){
              console.log(res.data);
            }
          },
          error: function () {
            that.$message.error("网络繁忙，请稍后重试~");
          }
        })
      }
    },
    created() {
      this.refresh()
    }
  }
</script>

<style scoped>
  .editInfo{
    background: #f2f2f2;
    height: 100%;
  }
  .header{
    margin-bottom: 30px;
  }
  .container{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    background: white;
    margin: auto;
    padding: 50px;
    width: 80%;
    height: 600px;
    min-width: 500px;
    overflow-y: auto;
  }
  .container .form_box{
    width: 500px;
    margin: auto;
  }

  .tip{
    margin: 12px 0;
    background: #f8f8f8;
    color: #aaaaaa;
    cursor: pointer;
    text-align: center;
  }
  .tip span:hover{
    color: #2b89fb;
  }

  .item{
    margin: 10px 10px;
    padding: 6px 0;
    text-align: center;
    border-bottom: 1px #f2f2f2 solid;
  }
  .keyClass{
    /*text-align: right;*/
    display: inline-block;
    width: 80px;
    line-height: 40px;
  }


  .el-input{
    width: 300px;
  }
</style>
