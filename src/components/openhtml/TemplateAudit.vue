<template>
  <div class="editTemplate openHtml" v-if="isVisible">
    <div class="body">
      <div class="header">
        <div class="title">
          <span style="padding-left: 26px">审 核 记 录</span>
        </div>
        <span class="close_btn" @click="closeTempAuditBox">&#10006;</span>
      </div>
      <div class="container">
        <div class="info">
          <div class="left">
            <img :src="auditData.imgUrl" alt="">
            <div v-if="!auditData.imgUrl && auditData.status!==3" style="position: relative; top: -150px;color: rgba(255,0,0,0.59)">提醒：无封面<br>大概率无法通过审核</div>
          </div>
          <div class="right">
            <div class="item">
              <span class="keyClass">标题</span>
              <span class="valClass">{{auditData.title}}</span>
            </div>
            <div class="item">
              <span class="keyClass">关键词</span>
              <span class="valClass">{{auditData.keyWd}}</span>
            </div>
            <div class="item">
              <span class="keyClass">行业信息</span>
              <span class="valClass">{{auditData.info}}</span>
            </div>
            <div class="item">
              <span class="keyClass">内容</span>
              <span class="valClass">{{auditData.content}}</span>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="auditList">
            <div v-if="auditData.list.length === 0">暂无审核记录</div>
            <div class="item" v-for="(item, index) in auditData.list">
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
        </div>
      </div>
      <div class="footer">
        <el-button type="primary" size="small" v-if="auditData.status === 0" @click="submitAudit">提交审核</el-button>
        <el-button type="primary" size="small" v-if="auditData.status === 2" @click="submitAudit">重新提交审核</el-button>
        <el-button type="primary" size="small" v-if="auditData.status === 3" @click="closeTempAuditBox">确认</el-button>
      </div>
    </div>
    <div class="mask" @click="closeTempAuditBox"></div>
  </div>
</template>

<script>
    export default {
      name: "TemplateAudit",
      props: ["isVisible", "auditData"],
      data: function(){
        return{
        }
      },
      methods:{
        closeTempAuditBox: function () {
          this.$emit("closeBox");
        },
        // 提交审核
        submitAudit: function () {
          this.$message.info("提审~");
          let thiz = this;

        }
      },
      created() {
      },
    }
</script>

<style scoped>
 .header{
   margin-top: 4px;
   height: 50px;
 }
 .header  .title{
   display: inline-block;
   line-height: 50px;
   /*font-weight: bold;*/
   font-size: 20px;
 }
 .header .close_btn{
   cursor: pointer;
   float: right;
   margin-right: 20px;
   line-height: 50px;
 }

  .container{
    padding: 10px 30px;
    height: 440px;
    overflow-y: auto;
  }
  .container .info{
    height: 280px;
  }
  .info .left{
    padding: 10px;
    height: 250px;
    width: 200px;
    background: #f2f2f2;
    float: left;
  }
  .info .right{
    border-radius: 4px;
    padding: 10px;
    width: 280px;
    height: 250px;
    border: 1px #e4e4e4 solid;
    float: right;
    overflow-y: auto;

  }
  .container img{
    margin: auto;
    width: 180px;
    height: 250px;
    /*border: 1px red solid;*/
  }
  .container .btn{
    cursor: pointer;
  }


  .content{
    margin-top: 30px;
  }
  .content .auditList{
    padding: 20px;
    width: 300px;
    text-align: left;
    margin: auto;
    border-radius: 10px 56px 10px 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
 .item{
   margin: 10px 10px;
   padding: 6px 0;
   text-align: left;
   border-bottom: 1px #f1f1f1 solid;
 }
 .item .keyClass{
   display: block;
   color: #525457;
 }
 .item .valClass{
   padding-left: 12px;
   display: inline-block;
   width: 250px;
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

  .footer{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    height: 60px;
    padding: 10px;
  }
</style>
