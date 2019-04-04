<template>
  <div class="editTemplate openHtml" v-if="isVisible">
    <div class="body">
      <div class="header">
        <div class="title">
          <span style="padding-left: 26px">创 建 模 板</span>
        </div>
        <span class="close_btn" @click="closeCreateTemplateBox">&#10006;</span>
      </div>
      <div class="container">
        <div class="pic">
          <img @click="showUploadFileBox" :src="preUrl+form.imgUrl" alt="">
          <span @click="showUploadFileBox" class="btn" v-if="!form.imgUrl">请设置封面图</span>
          <span @click="showUploadFileBox" class="btn" v-else>更换封面图</span>
        </div>
        <div class="content">
          <div class="item">
            <span class="keyClass">标题</span>
            <span class="valClass"><input type="text" v-model="form.title"></span>
          </div>
          <div class="item">
            <span class="keyClass">关键词</span>
            <span class="valClass"><input type="text" v-model="form.keyWd"></span>
          </div>
          <div class="item">
            <span class="keyClass">行业信息</span>
            <span class="valClass"><input type="text" v-model="form.info"></span>
          </div>
          <div class="item">
            <span class="keyClass">内容</span>
            <span class="valClass"><textarea v-model="form.content"></textarea></span>
          </div>
        </div>
      </div>
      <div class="footer">
        <el-button type="primary" size="small" @click="addTemplate">创建</el-button>
      </div>
    </div>
    <div class="mask" @click="closeCreateTemplateBox"></div>
    <UploadFile :is-visible="isUpload" @closeBox="closeUploadFileBox"></UploadFile>
  </div>
</template>

<script>

  import {UPLOAD_MIXINS} from "../../api/comm/mixins"
  import UploadFile from "../../components/openhtml/UploadFile";

    export default {
      name: "TemplateCreate",
      components: {UploadFile},
      props: ["isVisible"],
      mixins:  [UPLOAD_MIXINS],
      data: function(){
        return{
          form: this.resetForm(),
          isCre: false,
        }
      },
      methods:{

        closeUploadFileBox: function(imgUrl){
          this.form.imgUrl = imgUrl;
          this.isUpload = false;
        },

        resetForm: function(){
          this.form = {
            title : '',
            keyWd : '',
            info : '',
            imgUrl : undefined,
            content : '',
          };
          return this.form;
        },
        closeCreateTemplateBox: function () {
          this.$emit("closeBox", this.isCre);
        },

        addTemplate: function () {
          let thiz = this;
          if (thiz.form.title === '') {
            this.$message.error("标题不能为空");
            return;
          }
          thiz.isCre = true;
          thiz.closeCreateTemplateBox();
          thiz.isCre = false;
          $.ajax({
            url:this.preUrl + '/addTemplate',
            data:{
              // aid : 1, // aid 从后端拿取
              title : thiz.form.title,
              keyWd : thiz.form.keyWd,
              info : thiz.form.info,
              imgUrl : thiz.form.imgUrl,
              content : thiz.form.content,
            },
            success: function (res) {
              if(res.success){
                thiz.$message.success(res.msg);
                // 用来做判断，保证只有是创建模板成功之后，才会刷新模板列表
                thiz.isCre = true;
                thiz.closeCreateTemplateBox();
                thiz.isCre = false;
                thiz.resetForm();
              }
              else{
                thiz.$message.error(res.msg);
              }
            },
            error: function () {
              thiz.$message.error("网络繁忙，请稍后重试~");
            }
          })
        }
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
  .container .pic{
    width: 180px;
    height: 250px;
    margin: auto;
  }
  .container img{
    width: 180px;
    height: 250px;
    /*border: 1px black solid;*/
  }
  .container .btn{
    cursor: pointer;
  }

  .content{
    margin-top: 30px;
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
 .item .valClass input{
   display: inline-block;
   /*height: 30px;*/
   padding: 0 15px;
   line-height: 28px;
   font-size: 18px;
   border-radius: 25px 4px 25px 25px;
   border: 1px #cfcfcf solid;
   color: #666666;
   width: 300px;
   /*background: #f2f2f2;*/
 }
 .item .valClass input:focus{
   outline: none;
   border: 1px #2b89fb solid;
   border-radius: 25px 4px 25px 25px;
 }
 .item .valClass textarea{
   font-family: 'Avenir', Helvetica, Arial, sans-serif;
   color: #666666;
   width: 245px;
   max-width: 300px;
   min-width: 300px;
   max-height: 400px;
   min-height: 80px;
   padding: 5px 15px;
   line-height: 28px;
   font-size: 18px;
   border-radius: 6px;
 }
 .item .valClass textarea:focus{
   outline: none;
   border: 1px #2b89fb solid;
   border-radius: 6px;
 }

  .footer{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    height: 50px;
    padding: 10px;
  }
</style>
