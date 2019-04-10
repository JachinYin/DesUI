<template>
  <div class="editTemplate openHtml" v-if="isVisible">
    <div class="body">
      <div class="header">
        <div class="title">
          <span style="padding-left: 26px">编 辑 模 板</span>
        </div>
        <span class="close_btn" @click="closeEditTemplateBox">&#10006;</span>
      </div>
      <div class="container">
        <div class="pic">
          <div class="img_box" @click="showUploadFileBox(tempType)">
            <div class="img" :style="form.imgUrl ? `background-image: url('${preUrl + form.imgUrl}')` : ''"></div>
          </div>
          <span class="btn" v-if="!form.imgUrl">请设置封面图</span>
          <span class="btn" v-else>更换封面图</span>
        </div>
        <div class="content">
          <div class="item">
            <span class="keyClass">标题</span>
            <span class="valClass"><input type="text" v-model="form.title" :disabled="form.editable"></span>
          </div>
          <div class="item">
            <span class="keyClass">关键词</span>
            <span class="valClass"><input type="text" v-model="form.keyWd" :disabled="form.editable"></span>
          </div>
          <div class="item">
            <span class="keyClass">行业信息</span>
            <span class="valClass"><input type="text" v-model="form.info" :disabled="form.editable"></span>
          </div>
          <div class="item">
            <span class="keyClass">内容</span>
            <span class="valClass"><textarea v-model="form.content" :disabled="form.editable"></textarea></span>
          </div>
        </div>
      </div>
      <div class="footer">
        <el-button type="primary" size="small" @click="saveTemplate">保存</el-button>
      </div>
    </div>
    <div class="mask" @click="closeEditTemplateBox"></div>
    <UploadFile :is-visible="isUpload" :img-type="imgType" @closeBox="closeUploadFileBox"></UploadFile>
  </div>
</template>

<script>
    import {UPLOAD_MIXINS} from "@/api/comm/mixins";
    import UploadFile from "../../components/openhtml/UploadFile";

    export default {
      name: "TemplateEdit",
      props: ["isVisible", "tempData"],
      mixins: [UPLOAD_MIXINS],
      components: {UploadFile},
      data: function(){
        return{
          form: {}
        }
      },
      methods:{
        closeEditTemplateBox: function () {
          this.$emit("closeBox");
        },
        refreshTempData: function () {
        },

        saveTemplate: function () {
          let thiz = this;
          $.ajax({
            url:this.preUrl + '/setTemplate',
            data:{
              tempId : thiz.form.tempId,
              title : thiz.form.title,
              keyWd : thiz.form.keyWd,
              info : thiz.form.info,
              imgUrl : thiz.form.imgUrl,
              content : thiz.form.content,
            },
            success: function (res) {
              if(res.success){
                thiz.$message.success(res.msg);
                thiz.closeEditTemplateBox();
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
      watch:{
        tempData(){
          let status = this.tempData.status;
          this.form = {
            tempId : this.tempData.tempId,
            title : this.tempData.title,
            keyWd : this.tempData.keyWd,
            info : this.tempData.info,
            imgUrl : this.tempData.imgUrl,
            content : this.tempData.content,
            editable : status === 1 || status === 3,
          };
        },
      }
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
 .img_box{
   border: 1px #cfcfcf solid;
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
   font-size: 14px;
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
   font-size: 14px;
   border-radius: 6px;
 }
 .item .valClass textarea:focus{
   outline: none;
   border: 1px #2b89fb solid;
   border-radius: 6px;
 }
 .item .valClass textarea:disabled, input:disabled {
   background-color: #f2f2f2;
 }

  .footer{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    height: 50px;
    padding: 10px;
  }
</style>
