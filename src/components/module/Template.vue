<template>
    <div class="template">
      <div class="header">
        <span class="search">
          <select v-model="time">
            <option>修改时间</option>
            <option>创建时间</option>
          </select>
        </span>
        <span class="search">
          <select v-model="desc">
            <option>降序</option>
            <option>升序</option>
          </select>
        </span>
        <span class="search">
          <select v-model="status">
            <option>全部</option>
            <option>未提交</option>
            <option>审核中</option>
            <option>已打回</option>
            <option>已通过</option>
          </select></span>
        <Logout/>
      </div>
      <div class="main">
        <div class="item">
          <div class="icon_add">
            <i class="el-icon-plus"></i>
          </div>
          <span >
        <i class="el-icon-edit"></i>创建模板</span>
        </div>
      </div>
    </div>
</template>

<script>
    import Logout from "@/components/inc/Logout";
    export default {
      name: "Template",
      components: {Logout},
      data: function () {
        return{
          time: '修改时间',
          status: '全部',
          desc: '降序',
          form:{}
        }
      }
    }
</script>

<style scoped>
 .template{
   color: #909399;
 }
  /*头部排序===start*/
 .search:nth-child(1){
   margin-left: 60px;
 }
 .search{
   text-align: center;
   user-select: none;
   line-height: 70px;
   cursor: pointer;
   width: 100px;
   display: inline-block;
 }
 .search select{
   /*width: 100px;*/
   font-size: 16px;
   height: 70px;
   border: 0;
   outline: none;
 }
 .search option{
   color: black;
   outline: black;
 }
 .search select:hover{
   color: #2b89fb;
 }
  /*头部排序===end*/

  /*创建模板内容===start*/
  .item{
    width: 180px;
    height: 240px;
    background: white;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    user-select: none;
    padding-top: 1px;
    margin: 10px 20px;
  }
  .item:hover{
    color: #2b89fb;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  }
  .item .icon_add{
    width: 64px;
    height: 64px;
    margin: 60px auto 18px;
    border-radius: 50%;
    border: 1px #909399 dashed;
    font-size: 25px;
    font-weight: lighter;
    line-height: 64px;
  }
 .item:hover .icon_add{
    border: 1px #2b89fb dashed;
  }
 /*创建模板内容===end*/
</style>
