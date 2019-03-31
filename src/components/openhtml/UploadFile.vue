<template>
  <div class="uploadFile openHtml" v-if="isVisible" v-cloak>
    <div class="body">
      <!--这里是具体的弹窗内容，布局还有其他自定义-->
      <!--<el-upload-->
        <!--class="upload-file"-->
        <!--drag-->
        <!--:action="uploadUrl"-->
        <!--accept="image/jpeg,image/gif,image/png,image/bmp"-->
        <!--&gt;-->
        <!--<i class="el-icon-upload"></i>-->
        <!--<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
      <!--</el-upload>-->


      <form class="form-horizontal" enctype="multipart/form-data">
        <input type="file" class="menu-image-url" value="上传"  id="file"  @change="onUpload">
      </form>

    </div>
    <div class="mask" @click="closeUploadFileBox"></div>
  </div>
</template>

<script>
    export default {
      name: "UploadImage",
      props: ['isVisible'],
      data: function () {
        return{
          imgUrl: undefined,
        }
      },
      methods: {
        closeUploadFileBox: function () {
          this.$emit("closeBox", this.imgUrl);
        },

        onUpload: function (e) {
          let thiz = this;
          var files = e.target.files[0];
          var formFile = new FormData();
          formFile.append("file", files);
          $.ajax({
            url: thiz.preUrl + '/upload',//这里是请求后台的上传文件接口
            type: 'POST',
            data: formFile,
            processData: false,
            contentType: false,
            success: function(res){
              if (res.success) {
                thiz.imgUrl = thiz.preUrl + res.data.fileUrl;
                thiz.closeUploadFileBox();
              }else{
                thiz.$message.error(res.msg);
              }
            },
            error:function () {
              this.$message.error("网络繁忙，请稍后重试~");
            }
          });
        }
      }
    }
</script>

<style scoped>
  .body{
    height: 80px;
  }
</style>
