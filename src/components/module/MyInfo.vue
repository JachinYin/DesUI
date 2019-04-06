<template>
  <div class="myInfo">
    <div class="header">
      <span class="editInfo" @click="$router.push('/editInfo')">修改资料</span>
      <Logout/>
    </div>
    <div class="main">
      <div class="below personal" style="">
        <div class="belowTop">
          <div class="belowTopBg" :style="desData.photoImg ? `background-image: url('${preUrl + desData.photoImg}')` : ''"></div>
        </div>
        <div class="belowBelow">
          <div class="tx" :style="desData.photoImg ? `background-image: url('${preUrl + desData.photoImg}')` : ''"></div>
          <div class="name">{{desData.nickName}}</div>
          <div class="level" v-if="desData.status===3" @click="showCert">
            <div class="icon"><icon i-class="badge"></icon>
            </div>认证设计师
          </div>
          <div class="level" v-else @click="showCert">未认证</div>
          <div class="info">
            <div class="infoOne">所在地：&nbsp;&nbsp;
              <div class="residence">{{desData.country}} {{desData.province}} {{desData.city}} </div>
            </div>
          </div>

          <div class="resume">
            <div class="resumeOne">个人简介：</div>
            <div class="resumeInfo">{{desData.intro}}</div>
          </div>
          <div class="infoTip">
            个人认证信息通过后不支持修改，如需修改认证信息请联系设计师小助理QQ：319xxxx479申请修改资料。
          </div>

          <div class="cert" v-if="isShowCert">
            <div class="auditList">
              <div v-if="auditList.length === 0">暂无审核记录</div>
              <div class="item" v-for="(item, index) in auditList">
                <span v-if="item.status === 1">• 审核中
                </span>
                <span v-if="item.status === 2" style="color: #fd2814;">• 打回
                </span>
                <span v-if="item.status === 3" style="color: #41C26E;">• 通过
                </span>
                <span style="float: right" class="date">{{item.time}}</span>
                <p style="text-indent: 1em" v-if="item.status === 1">请耐心等待审核结果</p>
                <p style="text-indent: 1em" v-if="item.status === 2">{{item.reason}}</p>
                <p style="text-indent: 1em" v-if="item.status === 3">审核已通过</p>
              </div>
            </div>
            <br>
            <el-button type="primary" size="mini" @click="onCert" v-if="desData.status===0||desData.status===2">发起审核</el-button>
            <br><br>
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
          isShowCert: false, // 审核记录
          desData:{},
          auditList:[]
        }
      },
      methods: {
        closeUploadFileBox: function () {
          this.$emit("closeBox");
        },
        // 显示审核信息
        showCert: function(){
          this.isShowCert = !this.isShowCert;
          this.getAuditList();
        },
        // 发起认证
        onCert: function(){
          this.$confirm('请确保认证信息填写正确，再发起认证申请', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info',
            center: true
          }).then(() => {
            this.doCert();
          }).catch(() => {});
        },
        // 发送认证ajax
        doCert: function () {
          let that = this;
          $.ajax({
            url: that.preUrl + '/addDesignerAudit',
            data:{
              nickName: that.desData.nickName
            },
            success: function (res) {
              if(res.success){
                that.$message.success(res.msg);
                that.getDesData();
                that.getAuditList();
              }else{
                that.$message.error(res.msg);
              }
            },
            error: function () {
              that.$message.error("网络繁忙，请稍后重试~");
            }
          });
        },

        // 获取设计师信息
        getDesData(){
          let that = this;
          $.ajax({
            url: that.preUrl + '/getDesignerInfo',
            success: function(res){
              if(res.success)
                that.desData = res.data.desData;
              else
                that.$message.error(res.msg);
            },
            error: function(){
              that.$message.error("网络繁忙，请稍后重试~");
            }
          });
        },

        getAuditList(){
          let that = this;
          $.ajax({
            url: that.preUrl + '/getDesignerAuditList',
            success: function(res){
              if(res.success){
                that.auditList = res.data.list;
              }
              else that.$message.error(res.msg);
            },
            error: function(){
              that.$message.error("网络繁忙，请稍后重试~");
            }
          })
        }
      },
      created() {
        this.getDesData();
      }
    }
</script>

<style scoped>
  .header .editInfo{
    line-height: 70px;
    padding: 0 50px;
    cursor: pointer;
    box-sizing: border-box;
  }
  .header .editInfo:hover{
    color: #2b89fb;
  }


  .main{
    padding: 1px 50px 50px;
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
    height:  212px;
    background-image: url(../../assets/user.png);
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
    background-image: url(../../assets/user.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100%;
    vertical-align: middle;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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
    cursor: pointer;
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
    position: absolute;
    font-size: 24px;
    left: 8px;
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

  .cert{
    width: 500px;
    margin: auto ;
    text-align: center;
  }

  .auditList{
    padding: 20px;
    width: 300px;
    text-align: left;
    margin: auto;
    /*border-radius: 10px 56px 10px 10px;*/
    border-radius: 2px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }

  .item .date{
    color: #cacaca;
    margin-top: 6px;
    font-size: 80%;
  }
  .item p{
    color: #acacac;
    font-size: 14px;
  }
</style>
