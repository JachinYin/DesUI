<template>
  <div class="logout">
    <span @click="Logout"><icon i-class="logout"></icon> 退出</span>
  </div>
</template>

<script>
  export default {
    name: "Logout",
    methods: {
      Logout: function () {
        this.$confirm(
          '确定退出？', '提示',
        ).then(() => {
          let that = this;
          $.ajax({
            url: that.preUrl + '/logout',
            success: function (res) {
              if (res.success) {
                that.$commUtil.setToken("");
                that.$router.push("/");
              }
            },
            error: function () {
              that.$message.error("网络繁忙，请稍后重试~");
            }
          });
        }).catch(()=>{});
      }
    }
  }
</script>

<style scoped>
  .logout {
    display: inline-block;
    line-height: 70px;
    float: right;
    margin-right: 50px;
    cursor: pointer;
    user-select: none;
    text-decoration: underline;
  }

  .logout:hover {
    color: #2b89fb;
  }
</style>
