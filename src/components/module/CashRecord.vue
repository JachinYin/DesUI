<template>
  <div class="cashRec">
    <div class="header"><Logout/></div>
    <div class="main">
      <icon i-class="export"></icon>
      <icon i-class="filter"></icon>
      <icon i-class="logout"></icon>
      <icon i-class="balance"></icon>
      <icon i-class="logo1"></icon>
      <icon i-class="setting"></icon>
      <icon i-class="user"></icon>
      <icon i-class="password"></icon>
      <icon i-class="logo2"></icon>
      <icon i-class="audit"></icon>
      <icon i-class="userInfo"></icon>
    </div>
  </div>
</template>

<script>
    import Logout from "@/components/inc/Logout";
    export default {
        name: "CashRecord",
      components: {Logout}
    }
</script>

<style scoped>

</style>
