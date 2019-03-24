<template>
  <div class="myInfo">
    <div class="header"><Logout/></div>
    <div class="main">

      <input type="text" v-model="form.id">
      <input type="text" v-model="form.name">

    </div>
  </div>
</template>

<script>
    import Logout from "@/components/inc/Logout";
    export default {
        name: "MyInfo",
      components: {Logout},
      data: function () {
        return{
          form:{
            id: 0,
            name: '',
          }
        }
      },
      methods: {
        closeUploadFileBox: function () {
          this.$emit("closeBox");
        },
        // 提交审核
        submitFile: function () {
          this.$message.info("提审~");
          let thiz = this;

        }
      }
    }
</script>

<style scoped>

</style>
