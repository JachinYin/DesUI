<template>
  <div class="uploadFile openHtml" v-if="isVisible" v-cloak>
    <div class="body">
      <div class="abs">
        <div class="centerBox">
          <div class="icon">
            <i class="el-icon-upload"></i>
            <p>上传图片</p>
          </div>
          <form enctype="multipart/form-data">
            <input type="file" class="uploadImg" value="上传" id="file" @change="onUpload">
          </form>
        </div>
      </div>
    </div>
    <div class="mask" @click="closeUploadFileBox"></div>
  </div>
</template>

<script>
    export default {
      name: "UploadImage",
      props: ['isVisible', 'imgType'],
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
          let that = this;
          let files = e.target.files[0];

          let maxSize = 2; // 单位：M
          /*图片类型正则验证*/
          let imgStr = /\.(jpg|jpeg|png|bmp|BMP|JPG|PNG|JPEG)$/;
          if(!imgStr.test(files.name)) {
            this.$notify.error(
              {
                title: '错误',
                message: "文件不是图片类型",
                showClose: false
              });
            return;
          } else {
            /*图片大小*/
            let imagSize = files.size;
            if(imagSize > (1024 * 1024 * maxSize)) {
              this.$notify.error(
                {
                  title: '错误',
                  message: "大小不能超过" + maxSize + "M",
                  showClose: false
                });
              return;
            }
          }

          let formFile = new FormData();
          formFile.append("file", files);
          $.ajax({
            url: that.preUrl + '/upload/' + that.imgType,//这里是请求后台的上传文件接口
            type: 'POST',
            data: formFile,
            processData: false,
            contentType: false,
            success: function(res){
              if (res.success) {
                that.imgUrl = res.data.fileUrl;
                that.closeUploadFileBox();
              }else{
                that.$message.error(res.msg);
              }
            },
            error:function () {
              that.$message.error("网络繁忙，请稍后重试~");
            }
          });
        }
      }
    }
</script>

<style scoped>
  .body{
    height: 280px;
    width: 400px;
    z-index: 1001;
  }

  .abs{
    position: relative;
    padding: 20px;
  }
  .centerBox{
    border: 2px #409EFF dotted;
    border-radius: 4px;

  }
  .centerBox .icon{
    position: absolute;
    padding: 50px 132px;
    color: #409EFF;
  }
  .centerBox .icon i{
    font-size: 100px;
  }
  input{
    cursor: pointer;
  }
  .uploadImg{
    background: #f2f2f2;
    width: 100%;
    height: 240px;
    opacity: 0;
  }
  .mask{
    z-index: 1000;
  }
</style>
