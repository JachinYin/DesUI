<template>
  <div class="cashRec">
    <div class="header">
      <span @click="withdraw" class="opt_withdraw">
        <icon i-class="withdraw"></icon>
        提现
      </span>
      <Logout/>
    </div>
    <div class="main">
      <div class="center_box">
        <div class="countDetail detail" style="">
          <div class="countBox_wrap">
            <div class="countBox">
              <span class="title">可提现（元）</span>
              <p class="countNum"><span style="color: #4e67ee;">{{cashData.balance ? cashData.balance : 0}}</span></p>
            </div>
          </div>
          <div class="countBox_wrap">
            <div class="countBox">
              <span class="title">历史总收入（元）</span>
              <p class="countNum"><span>{{cashData.totalPrice ? cashData.totalPrice: 0}}</span></p>
            </div>
          </div>
          <div class="countBox_wrap">
            <div class="countBox">
              <span class="title">通过模板数量</span>
              <p class="countNum"><span>{{cashData.passTemplate ? cashData.passTemplate : 0}}</span></p>
            </div>
          </div>
        </div>
        <div class="cashDetail detail">
          <div class="cash_icon">账户明细</div>
          <div class="cashFlowList">
            <div style="border-radius:3px;overflow:hidden;">
              <table cellspacing="0">
                <tbody>
                <tr class="title">
                  <th>流水(元)</th>
                  <th>结余(元)</th>
                  <th>变动类型</th>
                  <th>模板ID</th>
                  <th>时间</th>
                </tr>
                </tbody>
              </table>
            </div>
            <table id="accountDetail" cellspacing="0">
              <tbody>
              <tr :class="item.type===1 ? 'income' : 'expenditure'" v-for="(item) in list.slice(index, size)">
                <td>{{item.price < 0 ? -item.price : item.price}}</td>
                <td>{{item.balance}}</td>
                <td>{{item.type === 1 ? '收入' : item.type === 2 ? '提现' : '打回'}}</td>
                <td>{{item.tempId || ''}}</td>
                <td>{{item.time}}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div id="pageContainer" class="pageContainer">
            <div class="pageNav">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="page.currentPage"
                :page-size="page.pageSize"
                :total="page.total"
                layout="prev, pager, next"
                style="padding-top: 12px"
              >
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Logout from "@/components/inc/Logout";
  import {Pagination_Mixins} from "@/api/comm/mixins";

  export default {
    name: "CashRecord",
    components: {Logout},
    mixins: [Pagination_Mixins],
    data: function () {
      return{
        cashData: {},
        list: [],
      }
    },
    methods:{
      // 发起提现
      withdraw: function () {
        this.$prompt('请输入提现金额', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: this.reg_Price,
          inputErrorMessage: '金额格式不正确'
        }).then(({value}) => {
          this.doWithdraw(value);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作'
          });
        });
      },
      // 确定提现
      doWithdraw: function(price){
        let that = this;
        $.ajax({
          url: that.preUrl + '/withdraw',
          data:{
            price: price,
          },
          success: function(res){
            if(res.success){
              that.$message.success(res.msg);
              that.getCashData();
            }else{
              that.$message.error(res.msg);
            }
          },
          error: function(){
            that.$message.error("网络繁忙，请稍后重试~");
          }
        })
      },

      // 获取账户明细信息
      getCashData(){
        let that = this;
        $.ajax({
          url: that.preUrl + '/getCashData',
          success: function(res){
            if(res.success){
              that.cashData = res.data;
              that.list = that.cashData.cashFlowList;
              that.page.total = that.list.length;
            }else that.$message.error(res.msg);
          },
          error: function(){}
        })
      },
    },
    created() {
      this.getCashData();
    }

  }
</script>

<style scoped>
  .header .opt_withdraw{
    line-height: 70px;
    padding: 0 50px;
    cursor: pointer;
    box-sizing: border-box;
  }
  .header .opt_withdraw:hover{
    color: #2b89fb;
  }

  /*detail start*/
  .main{
    padding: 0 50px;
    position: relative;
  }
  .center_box{
    position: absolute; /*使用abs，就一定要在其父类元素上使用positioned的元素*/
    margin: auto;
    left: 0;right: 0;bottom: 0;top: 0;
  }
  .detail{
    margin: 20px auto;
    width: 80%;
    min-width: 750px;
    background: #fff;
    border-radius:  4px;
    box-shadow:0 2px 10px rgba(0,0,0,0.05);
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  /*统计 start*/
  .countDetail {
    height:125px;
  }
  .countBox_wrap {
    min-width: 250px;
    width:  33.3%;
    height:  125px;
    float:  left;
    position: relative;
  }
  .countBox {
    width:  100%;
    position:  relative;
    left:  80%;
    transform: translateX(-50%);
    margin-top: 24px;
    min-width: 250px;
    user-select: none;
  }
  .countBox .title {
    font-size:  14px;
  }
  .countBox .countNum {
    font-size: 45px;
    margin-top: 12px;
    font-weight:bold;
  }
  /*统计end*/

  /*账户明细start*/
  .cashDetail {
    height:  500px;
    padding:  32px;
    position: relative;
  }

  .cash_icon {
    font-size:20px;
    font-weight:bold;
    position:  relative;
    padding-left: 12px;
    margin-bottom:32px;
  }
  .cash_icon:before {
    content:  '';
    display:  block;
    width: 4px;
    height:19px;
    background:  #3164FF;
    position:  absolute;
    top: 4px;
    left: 0;
  }

  tr.title{
    height: 32px;
    line-height: 32px;
    background: #F0F0F0;
    color: #999999;
    font-size: 12px;
    -webkit-border-radius:3px;
    -moz-border-radius:3px;
    border-radius:3px;
  }
  th {
    font-weight: normal;
    width: 135px;
    text-align: center;
  }
  td {
    width: 135px;
    text-align: center;
    font-size:14px;
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #E2E1EF;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .income td:first-child{
    color: #09C16B;
  }
  .expenditure td:first-child{
    color: #c15c0d;
  }
  .expenditure td:first-child:before {
    content: '-';
  }
  .income td:first-child:before{
    content: '+';
  }

  .pageContainer a {
    display: inline-block;
    text-decoration: none;
  }
  .pageContainer {
    text-align: center;
    font-size: 0;
    position: absolute;
    bottom: 32px;
    left:50%;
    transform: translateX(-50%);
  }
</style>
