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
        <div class="content">
          <div class="item" @click="createTemplate">
            <div class="imgItem">
              <img src="../../assets/create1.png" alt="">
            </div>
            <span>
              <i class="el-icon-edit"></i>创建模板
            </span>
          </div>
          <div class="item" v-for="(item, index) in tempList" @mouseover="hoverItem(index)" @mouseleave="leaveItem(index)">
            <div class="imgItem">
              <img :src="item.imgUrl" alt="" v-if="item.imgUrl">
              <span v-else style="line-height: 240px;color: #d6d6d6" class="tip">暂无封面</span>
            </div>

            <span class="btn" @click="templateEdit(index)" >
              <span class="toolTip">编辑</span>
              <i class="el-icon-edit-outline" style="color: #006f00"></i>
            </span>

            <span :id="item.tempId + '_s'" style="text-overflow: ellipsis" v-if="item.title.length<6">{{item.title}}</span>
            <span :id="item.tempId + '_s'" style="text-overflow: ellipsis" v-else>{{item.title.slice(0,5)}}...</span>

            <span class="btn" @click="templateAudit(index)">
              <icon i-class="audit" style="color: #939300"></icon>
              <span class="toolTip">提交</span>
            </span>
          </div>

        </div>
        <TemplateCreate :is-visible="isCreateBoxVisible" @closeBox="closeTemplateCreateBox"/>
        <TemplateEdit :is-visible="isEditBoxVisible" :tempData="tempData" @closeBox="closeTemplateEditBox"/>
        <TemplateAudit :is-visible="isAuditBoxVisible" :auditData="auditData" @closeBox="closeTemplateAuditBox"/>
      </div>
    </div>
</template>

<script>
    import Logout from "../../components/inc/Logout";
    import TemplateEdit from "../../components/openhtml/TemplateEdit";
    import TemplateAudit from "../../components/openhtml/TemplateAudit";
    import TemplateCreate from "../../components/openhtml/TemplateCreate";
    export default {
      name: "Template",
      components: {TemplateCreate, TemplateAudit, TemplateEdit, Logout},
      data: function () {
        return{
          isCreateBoxVisible : false,
          isEditBoxVisible : false,
          isAuditBoxVisible : false,
          time: '修改时间',
          status: '全部',
          desc: '降序',
          form:{},
          tempList: [],
          tempData: 0,
          auditData: {},
        }
      },
      methods:{
        refreshTabData: function () {
          let thiz = this;
          let form = thiz.form;
          $.ajax({
            url: thiz.preUrl + "/getTemplateList",
            type: 'get',
            data: {
              designer: form.designer,
              status: form.status,
              tempId: form.tempId || 0,
              time: form.time,
              title: form.title,
              aid: 1,
            },
            success: function (res) {
              console.log(res);
              if (res.success) {
                let data = res.data;
                thiz.tempList = data.list;
                thiz.isLoad = false;
              } else {
                if (res.code === 101){
                  thiz.$router.push('/login');
                  return;
                }
                thiz.$message.error(res.msg);
              }
            },
            error: function (data) {
              thiz.$message.error('【模板审核表】服务繁忙，请稍后重试');
            }
          });
        },

        createTemplate: function () {
          this.isCreateBoxVisible = true;
        },
        closeTemplateCreateBox: function (isCre) {
          if(isCre){
            this.refreshTabData();
          }
          this.isCreateBoxVisible = false;
        },


        // 模板编辑弹窗的方法
        templateEdit: function (index) {
          this.tempData = this.tempList[index];
          this.isEditBoxVisible = true;
        },
        closeTemplateEditBox: function () {
          this.isEditBoxVisible = false;
        },

        // 模板审核弹窗的方法
        templateAudit: function(index){
          let thiz = this;
          $.ajax({
            url: thiz.preUrl + "/getTemplateAuditList",
            data:{
              tempId: thiz.tempList[index].tempId
            },
            success: function (res) {
              if(res.success){
                thiz.auditData = thiz.tempList[index];
                thiz.auditData.list = res.data.list || [];
                if(res.data.list.length > 0) {
                  thiz.auditData.status = res.data.list[0].status || 0;
                }
                else {
                  thiz.auditData.status = 0;
                }
                thiz.isAuditBoxVisible = true;
              }
              else{
                thiz.$message.error(res.msg);
              }
            },
            error: function (res) {
              thiz.$message.error("网络繁忙，请稍后重试");
            }
          });
        },
        closeTemplateAuditBox: function () {
          this.isAuditBoxVisible = false;
        },

        hoverItem: function (index) {
          // alert(this.tempList[index]);
          // $("#" + this.tempList[index].tempId + '_e').css('display', 'inline-block');
          // $("#" + this.tempList[index].tempId + '_c').css('display', 'inline-block');
          $("#" + this.tempList[index].tempId + '_s').text("│");
        },
        leaveItem: function (index) {
          // $("#" + this.tempList[index].tempId + '_e').css('display', 'none');
          // $("#" + this.tempList[index].tempId + '_c').css('display', 'none');
          let title = this.tempList[index].title;
          title = title.length < 6 ? title : (title.slice(0,5) + '...');
          $("#" + this.tempList[index].tempId + '_s').text(title);
        }
      },
      created() {
        this.refreshTabData();
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
  /*头部排序===end*/

 .main .content{
   /*display: grid;*/
   overflow-y: auto;
   /*height: calc(100% - 900px);*/
   height: 600px;
 }



  /*创建模板内容===start*/
  .item{
    position: relative;
    width: 180px;
    height: 275px;
    background: white;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    text-align: center;
    user-select: none;
    margin: 15px 20px;
    display: inline-block;
    transition: top 1s ease;
  }
  .item:hover{
    /*color: #2b89fb;*/
    box-shadow: 4px 4px 12px 0 rgba(0, 0, 0, 0.2);
    top: -2px;
  }

 .item .imgItem{
   /*background: url('../../assets/create1.png');*/
   width: 180px;
   height: 240px;
   background: rgba(229, 229, 229, 0.2);
   /*border: 1px rgba(0, 0, 0, 0.2) solid;*/
   margin-bottom: 6px;
   transition: filter 1s;
 }
 .item:hover  .imgItem{
   filter: blur(1px);
 }
 .item img{
   width: 180px;
   height: 240px;
   border: none;
 }
 .item:hover .btn{
   display: inline-block;
 }
 .item .btn{
   display: none;
   /*border: 1px #6666 solid;*/
   line-height: 20px;
   border-radius: 10%;
   padding: 2px 4px;
   cursor: pointer;
   color: #545454;
   background: #eaeaea;
 }
 .item .btn:hover{
   opacity: 0.8;
 }

 /*创建模板内容===end*/
</style>
