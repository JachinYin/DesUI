<template>
  <div class="editTemplate openHtml" v-if="isVisible">
    <div class="body">
      <div class="header">
        <span class="title">编 辑 模 板</span>
        <span class="close_btn">&#10006;</span>
      </div>
      <div class="container">
        <div>
          <img :src="tempData.imgUrl" alt="">
        </div>
        <div class="content">
          <div class="item">
            <span class="keyClass">标题</span>
            <span class="valClass">{{tempData.title}}</span></div>
          <div class="item">
            <span class="keyClass">关键词</span>
            <span class="valClass">{{tempData.keyWd}}</span></div>
          <div class="item">
            <span class="keyClass">行业信息</span>
            <span class="valClass">{{tempData.info}}</span></div>
          <div class="item">
            <span class="keyClass">内容</span>
            <span class="valClass">{{tempData.content}}</span></div>
        </div>
      </div>
      <div class="footer">
        <el-button type="primary" size="small">保存</el-button>
        <!--<el-button  size="small"></el-button>-->
      </div>
    </div>
    <div class="mask" @click="closeEditTemplateBox"></div>
  </div>
</template>

<script>
    export default {
      name: "EditTemplate",
      props: ["isVisible", "tempData"],
      data: function(){
        return{
        }
      },
      methods:{
        closeEditTemplateBox: function () {
          this.$emit("closeBox");
        },
        refreshTempData: function () {
        }
      },
      created() {
      },
    }
</script>

<style scoped>
 .header{
   height: 50px;
 }
 .header  .title{
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
  .container img{
    width: 180px;
  }


 .item{
   margin: 10px 10px;
   padding: 6px 0;
   text-align: left;
   border-bottom: 1px #f1f1f1 solid;
 }
 .item .keyClass{
   /*font-size: 20px;*/
   /*font-weight: bold;*/
   display: inline-block;
   padding-left: 12px;
   width: 80px;
   color: #909399;
 }
 .item .valClass{
   display: inline-block;
   width: 275px;
 }


  .footer{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    height: 50px;
    padding: 10px;
  }
</style>
