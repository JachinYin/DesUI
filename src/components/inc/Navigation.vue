<template>
    <div class="navigation">
      <span class="title"><img src="../../assets/logo.png" alt="logo" width="20px" height="20px">设计师中心</span>
      <span v-for="(item, index) in navList" :class="'nav '+ item.flag" @click="check(item.url, index)">
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </div>
</template>

<script>
    export default {
      name: "Navigation",
      data: function () {
        return{
          navList: this.refresh(),
        }
      },
      methods: {
        check: function (name, index) {
          this.$router.push(name);
          this.refresh();
          this.navList[index].flag = 'active';
        },
        refresh(){
          this.navList = [
            {
              name: '模板设计',
              flag: '',
              url: '/template',
              icon: 'el-icon-edit-outline'
            },
            {
              name: '收支明细',
              flag: '',
              url: '/cashRecord',
              icon: 'el-icon-document'
            },
            {
              name: '个人资料',
              flag: '',
              url: '/myInfo',
              icon: 'el-icon-setting'
            }
          ];
          return this.navList;
        }
      },
      created() {
        this.navList[0].flag = 'active';
      }
    }
</script>

<style scoped>
  .title {
    display: block;
    line-height: 20px;
    margin:  25px 0;
    font-size: 20px;
  }

  .active{
    color: #575a6a;;
    background: #f2f2f2;
  }
  .nav {
    display: block;
    padding: 15px 0;
    width: 90%;
    margin: 6px auto;
    cursor: pointer;
    border-radius: 4px;
  }
  .nav:hover{
    /*border: 1px black solid;*/
    color: white;
    background: #8396fe;
  }

  .navigation{
    text-align: center;
    color: #ffffff;
    background: #536cef;
    width: 220px;
    height: 100%;
    position: fixed;
    user-select: none;
  }
</style>
