<template>
  <div class="myInfo">
    <div class="header"><Logout/></div>
    <div class="main">
      <div class="below personal" style="">
        <div class="belowTop">
          <div class="belowTopBg" style="background-image: url(http://12030782.s136i.faiusr.com/2/AIgBCAAQAhgAIK_al_QFKNSu-6UGMIASOIAS.jpg);"></div>
        </div>
        <div class="belowBelow">
          <div class="tx" style="background-image: url(http://12030782.s136i.faiusr.com/2/AIgBCAAQAhgAIK_al_QFKNSu-6UGMIASOIAS.jpg)"></div>
          <div class="name">受持读诵</div>
          <div class="level"><div class="icon"></div>认证设计师™</div>
          <div class="info">
            <div class="infoOne">所在地：&nbsp;&nbsp;
              <div class="residence">中国&nbsp;&nbsp;北京&nbsp;&nbsp;北京</div>
            </div>
          </div>

          <div class="resume">
            <div class="resumeOne">个人简介：</div>
            <div class="resumeInfo">的重复三次</div>
          </div>
          <div class="infoTip">
            个人资料暂不支持修改，如需修改请联系设计师小助理QQ：3190781479申请修改资料。
          </div>
        </div>
      </div>
<!--      <div>
        <icon i-class="export"></icon>
        <icon i-class="filter"></icon>
        <icon i-class="logout"></icon>
        <icon i-class="balance"></icon>
        <icon i-class="logo1"></icon>
        <icon i-class="setting"></icon>
        <icon i-class="user"></icon>
        <icon i-class="password"></icon>
        <icon i-class="logo2"></icon>
        <icon i-class="audit"></icon>
        <icon i-class="userInfo"></icon>
      </div>-->
    </div>
  </div>
</template>

<script>
    import Logout from "../../components/inc/Logout";
    export default {
        name: "MyInfo",
      components: {Logout},
      data: function () {
        return{
          form:{
            id: 0,
            name: '',
          }
        }
      },
      methods: {
        closeUploadFileBox: function () {
          this.$emit("closeBox");
        },
        // 提交审核
        submitFile: function () {
          this.$message.info("提审~");
          let thiz = this;

        }
      }
    }
</script>

<style scoped>
  .main{
    padding: 0 50px ;
  }
  .belowTop{
    width:  80%;
    min-width: 750px;
    height:  172px;
    overflow: hidden;
    margin: 48px auto 0 auto;
    -webkit-border-radius:4px 4px 0 0;
    border-radius: 4px 4px 0 0;
  }
  .belowTopBg{
    width:  97%;
    height:  212px;
    background-image: url(/image/manage/yellowSeaDragon.png?v=201901151635);
    background-repeat: no-repeat;
    background-size: cover;
    margin:-20px 0 0 -20px;
    filter: blur(15px);
    overflow: hidden;
  }
  .tx {
    position: absolute;
    left: 50%;
    top: -60px;
    width: 100px;
    height: 100px;
    margin-left: -50px;
    border-radius: 50%;
    background-image: url(/image/manage/yellowSeaDragon.png?v=201901151635);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100%;
    vertical-align: middle;
  }
  .belowBelow {
    width:  80%;
    min-width: 750px;
    position:  relative;
    background:  #fff;
    margin:  0 auto;
    border-radius:  0 0 4px 4px;
  }
  .belowBelow .name {
    padding-top: 49px;
    text-align:  center;
    font-size:  16px;
    font-weight:  bold;
  }

  .belowBelow .level {
    width: 127px;
    height:28px;
    line-height:  28px;
    text-align:  center;
    border:1px solid rgba(78,103,238,1);
    opacity:1;
    color:  #3164FF;
    font-size:  12px;
    border-radius: 14px;
    margin: 8px auto 16px auto;
    position: relative;
    user-select: none;
  }
  .belowBelow .level .icon{
    width:13px;
    height:13px;
    background: url(/image/manage/thirdDesigner/authDesigner.svg?v=201901151658) no-repeat center center;
    position: absolute;
    top: 50%;
    margin-top: -6px;
    left: 13px;
  }

  .belowBelow .residence {
    display: inline;
  }

  .belowBelow .infoOne {
    font-size:  12px;
    color: #999;
    text-align:  center;
  }

  .belowBelow .resume {
    max-width: 644px;
    font-size:  12px;
    overflow:  hidden;
    margin:  32px auto 97px auto;
  }

  .belowBelow .resumeOne {
    float:  left;
    margin-right:  8px;
  }

  .belowBelow .resumeInfo {
    float:  left;
    max-width:576px;
  }

  .infoTip {
    padding-bottom:  49px;
    text-align:  center;
    font-size:  12px;
    color: #999;
  }
</style>
