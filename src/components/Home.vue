<template>
  <div class="home">
    <Navigation/>
    <div class="right_box">
      <router-view/>
    </div>
  </div>
</template>

<script>
    import Navigation from "@/components/inc/Navigation";
    export default {
      name: "Home",
      components: {Navigation},
      created() {
        this.$router.push("/template");
      }
    }
</script>

<style>
  .home{
    height: 100%;
  }
  .header{
    height: 70px;
    width: 100%;
    background: white;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    color: #909399
  }

  .right_box{
    margin-left: 220px;
    background: #f2f2f2;
  }
  .main{
    padding: 50px;
    background: #f2f2f2;
    /*height: 100%;*/
  }
</style>
<!--图片样式-->
<style>
  .img_box .img{
    width: 180px;
    height: 250px;
    background-image: url("../assets/template_default.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100%;
    vertical-align: middle;
  }
</style>

<!--弹窗样式-->
<style>
  /*通用弹窗格式*/
  /*
    <div class="具体弹窗名字 openHtml">
      <div class="body">
        这里是具体的弹窗内容，布局还有其他自定义
      </div>
      <div class="mask"></div>
    </div>
  */
  .openHtml{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .body{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    position: absolute;
    left: 0;right: 0;top: 0;bottom: 0;
    margin: auto;
    text-align: center;
    background: white;
    color: #909399;
    border-radius: 6px;

    width: 600px;
    height: 567px;
    z-index: 1000;

    padding-top: 1px;
  }

  /*mask*/
  .mask {
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(48, 48, 48, 0.74);
    z-index: 999;
  }
</style>
<!--滚动条-->
<style>

  ::-webkit-scrollbar
  {
    width: 4px;
    height: 4px;
    background-color: #F5F5F5;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(196, 196, 196, 0.3);
    background-color: #7d7d7d;
  }
</style>
