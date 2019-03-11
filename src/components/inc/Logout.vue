<template>
    <div class="logout">
      <span @click="Logout">退出</span>
    </div>
</template>

<script>
    export default {
      name: "Logout",
      methods:{
        Logout: function(){
          if(!confirm("确定退出？")){
            return;
          }
          this.$router.push("/logout");
        }
      }
    }
</script>

<style scoped>
  .logout{
    display: inline-block;
    line-height: 70px;
    float: right;
    margin-right: 50px;
    cursor: pointer;
    user-select: none;
    text-decoration: underline;
  }
  .logout:hover{
    color: #2b89fb;
  }
</style>
