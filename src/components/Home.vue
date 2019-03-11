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
  }
  .main{
    padding: 50px;
    background: #f2f2f2;
    /*height: 100%;*/
  }

  .mask{
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(48, 48, 48, 0.74);
    z-index: 999;
  }
</style>
