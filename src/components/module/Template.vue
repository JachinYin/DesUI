<template>
    <div class="template">
      <div class="header">

        <el-dropdown @command="onFilter" class="search" trigger="click">
          <span class="el-dropdown-link select">
            <span v-if="filter.status === -1">全部</span>
            <span v-if="filter.status === 0">未提交</span>
            <span v-if="filter.status === 1">审核中</span>
            <span v-if="filter.status === 2" style="color: #fd2814">已打回</span>
            <span v-if="filter.status === 3" style="color: #41c26e">已通过</span>

            <i class="el-icon-arrow-down"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="-1">全部</el-dropdown-item>
            <el-dropdown-item :command="0">未提交</el-dropdown-item>
            <el-dropdown-item :command="1">审核中</el-dropdown-item>
            <el-dropdown-item :command="2">已打回</el-dropdown-item>
            <el-dropdown-item :command="3">已通过</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="onFilter2" class="search" trigger="click">
          <span class="el-dropdown-link select">
            <span v-if="filter.desc">降序</span>
            <span v-else>升序</span>

            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="true">降序</el-dropdown-item>
            <el-dropdown-item :command="false">升序</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div style="display:inline-block;">
          <el-input placeholder="请输入模板标题" v-model="filter.title" size="mini" @input="refreshTabData"></el-input>
        </div>

        <Logout/>
    </div>
      <div class="main">
        <div class="content">
          <div class="item" @click="createTemplate" style="cursor: pointer">
            <div class="imgItem">
              <div class="img_box">
                <div class="img_c"></div>
              </div>
            </div>
            <span style="line-height: 35px">
                <i class="el-icon-edit"></i>创建模板
            </span>
          </div>

          <div class="item" v-for="(item, index) in tempList">
            <div class="imgItem">
              <div class="img_box">
                <div class="img" :style="item.imgUrl ? `background-image: url('${preUrl + item.imgUrl}')` : ''"></div>
              </div>
            </div>

            <div class="item_footer" style="box-sizing: border-box">
              <span class="btn" @click="templateEdit(index)" v-if="item.status === 0 || item.status === 2">
                <span class="toolTip">编辑</span>
                <i class="el-icon-edit-outline" style="color: #006f00"></i>
              </span>
              <span class="btn" @click="templateEdit(index)" v-if="item.status === 1 || item.status === 3">
              <span class="toolTip">查看</span>
                <i class="el-icon-search" style="color: #006f00"></i>
              </span>

              <span class="btn" @click="templateAudit(index)">
                <icon i-class="audit" style="color: #939300"></icon>
                <span class="toolTip">提交</span>
              </span>

              <span :id="item.tempId + '_s'" class="title" v-if="item.title.length<6">{{item.title}}</span>
              <span :id="item.tempId + '_s'" class="title" v-else>{{item.title.slice(0,8)}}...</span>
            </div>

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
          filter:{
            status: -1,
            desc: true,
            title: '',
          },
          tempList: [],
          tempData: 0,
          auditData: {},
        }
      },
      methods:{
        refreshTabData: function () {
          let that = this;
          $.ajax({
            url: that.preUrl + "/getTemplateList",
            type: 'get',
            data: {
              status: that.filter.status,
              title: that.filter.title,
              comp: that.filter.desc,
              columns: 'time',
            },
            beforeSend(xhr){
              xhr.setRequestHeader("TOKEN", that.$commUtil.getToken("TOKEN"));
            },
            success: function (res) {
              if (res.success) {
                let data = res.data;
                that.tempList = data.list;
                that.isLoad = false;
              } else {
                if (res.code === 101){
                  that.$router.push('/login');
                  return;
                }
                that.$message.error(res.msg);
              }
            },
            error: function (data) {
              that.$message.error("网络繁忙，请稍后重试~");
            }
          });
        },

        // 按状态筛选
        onFilter: function(commend){
          this.filter.status = commend;
          this.refreshTabData();
        },
        // 排序
        onFilter2: function(commend){
          this.filter.desc = commend;
          this.refreshTabData();
        },

        // 模板创建弹窗方法
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
   width: 100px;
   display: inline-block;
 }
 .search .select:hover{
   color: #2b89fb;
 }
 .search .select{
   /*width: 100px;*/
   cursor: pointer;
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
   overflow-y: auto;
   height: 620px;
 }



  /*创建模板内容===start*/
  .item{
    box-sizing: border-box;
    position: relative;
    width: 180px;
    height: 285px;
    background: white;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    text-align: center;
    user-select: none;
    margin: 15px 20px;
    display: inline-block;
    transition: top 4s ease;
  }
  .item:hover{
    /*color: #2b89fb;*/
    box-shadow: 4px 4px 12px 0 rgba(0, 0, 0, 0.2);
    top: -2px;
  }

 .item .imgItem{
   width: 180px;
   height: 250px;
   background: rgba(229, 229, 229, 0.2);
   /*margin-bottom: 6px;*/
   transition: filter 1s;
 }
 .item:hover  .imgItem{
   filter: blur(1px);
 }
 .item .img, .item .img_c{
   width: 180px;
   height: 250px;
   background-repeat: no-repeat;
   background-position: center center;
   background-size: 100%;
   vertical-align: middle;
 }
 .item .img_c{
   background-image: url("../../assets/template_create.png");
 }
 .item:hover .btn{
   display: inline-block;
 }
 .item .title{
   line-height: 35px;
 }
 .item:hover .title{
   display: none;
 }
 .item .btn{
   /*width: 60px;*/
   display: none;
   /*border: 1px #6666 solid;*/
   line-height: 35px;
   /*border-radius: 4px;*/
   padding: 0 12px;
   cursor: pointer;
   color: #545454;
   /*background: #eaeaea;*/
 }
 .item .btn:nth-child(2){
   border-left: 1px #f2f2f2 solid;
 }
 .item .btn:hover{
   /*opacity: 0.8;*/
   color: #2b89fb;
 }
 .item_footer{
   height: 35px;
 }

 /*创建模板内容===end*/
</style>
