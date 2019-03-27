<template>
  <div class="cashRec">
    <div class="header"><Logout/></div>
    <div class="main">
      <div class="center_box">
        <div class="countDetail detail" style="">
          <div class="countBox_wrap">
            <div class="countBox">
              <span class="title">可提现（元）</span>
              <p class="countNum"><span style="color: #4e67ee;">40.0</span></p>
            </div>
          </div>
          <div class="countBox_wrap">
            <div class="countBox">
              <span class="title">历史总收入（元）</span>
              <p class="countNum"><span>90.0</span></p>
            </div>
          </div>
          <div class="countBox_wrap">
            <div class="countBox">
              <span class="title">通过模板数量</span>
              <p class="countNum"><span>1</span></p>
            </div>
          </div>
        </div>
        <div class="cashDetail detail">
          <div class="cash_icon">账户明细</div>
          <div class="zhtable">
            <div style="border-radius:3px;overflow:hidden;">
              <table cellspacing="0">
                <tbody>
                <tr class="title">
                  <th>流水(元)</th>
                  <th>结余(元)</th>
                  <th>变动类型</th>
                  <th>服务内容</th>
                  <th>时间</th>
                </tr>
                </tbody>
              </table>
            </div>
            <table id="accountDetail" cellspacing="0">
              <tbody>
              <tr class="income">
                <td>10.0</td>
                <td>40.00</td>
                <td>收入</td>
                <td>哒柠</td>
                <td>2019-03-20 10:54</td>
              </tr>
              <tr class="income">
                <td>80.0</td>
                <td>180.00</td>
                <td>收入</td>
                <td>哒柠</td>
                <td>2019-03-19 17:10</td>
              </tr>
              <tr class="income">
                <td>-100.0</td>
                <td>100.00</td>
                <td>收入</td>
                <td>哒柠</td>
                <td>2019-03-19 17:04</td>
              </tr>
              <tr class="income">
                <td>100.0</td>
                <td>100.00</td>
                <td>收入</td>
                <td>哒柠</td>
                <td>2019-03-19 16:56</td>
              </tr>
              <tr class="income">
                <td>-100.0</td>
                <td>0.00</td>
                <td>收入</td>
                <td>噶gas</td>
                <td>2018-11-26 20:29</td>
              </tr>
              <tr class="income">
                <td>100.0</td>
                <td>100.00</td>
                <td>收入</td>
                <td>噶gas</td>
                <td>2018-11-26 20:29</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div id="pageContainer" class="pageContainer">
            <a href="javascript:;" class="disablePageBtn" style="margin-right: 5px;">
              <div class="prevPage"></div>
            </a>
            <a class="pageNum currentPageNum " page="1">1</a>
            <a href="javascript:;" class="disablePageBtn">
              <div class="nextPage"></div>
            </a>
          </div>
        </div>
      </div>
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
    width: 300px;
    text-align: center;
  }
  td {
    width: 300px;
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
  .expenditure td:first-child:before {
    content: '-';
  }
  .income td:first-child:before{
    content: '+';
  }

  /*pagecontainer*/
  .disablePageBtn {
    opacity: .5;
    cursor: default;
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

  .pageSeparator {
    width: 21px;
    height: 21px;
    line-height: 21px;
    font-size: 12px;
    display: inline-block;
    vertical-align: top;
    margin-right: 5px;
  }

  .pageNum {
    width: 21px;
    height: 21px;
    line-height: 21px;
    font-size: 12px;
    text-align: center;
    color: #666;
    display: inline-block;
    vertical-align: top;
    border: 1px solid #bfbfbf;
    margin-right: 5px;
    cursor: pointer;
  }

  .pageNum:hover {
    width: 21px;
    height: 21px;
    line-height: 21px;
    font-size: 12px;
    text-align: center;
    color: #666;
    display: inline-block;
    border: 1px solid #3164FF;
    color: #3164FF;
    margin-right: 5px;
    cursor: pointer;
  }

  .currentPageNum {
    border: 1px solid #3164FF;
    background: #3164FF;
    color: #fff;
    cursor: default;
  }

  .currentPageNum:hover {
    border: 1px solid #3164FF;
    background: #3164FF;
    color: #fff;
    cursor: default;
  }

  .matCurrentPage {
    display: inline-block;
    vertical-align: top;
  }

  .prevPage {
    width: 21px;
    height: 21px;
    background: url(/image/qt.png?v=201703241457) -333px -174px;
    border: 1px solid #bfbfbf;
  }

  .disablePageBtn .prevPage:hover {
    background: url(/image/qt.png?v=201703241457) -333px -174px;
    border: 1px solid #bfbfbf;
  }

  .prevPage:hover {
    background: url(/image/manage/thirdDesigner/slidehover.svg?v=201901211605) no-repeat 7px center;
    border: 1px solid #3164FF;
  }

  .nextPage {
    width: 21px;
    height: 21px;
    background: url(/image/qt.png?v=201703241457) -351px -174px;
    border: 1px solid #bfbfbf;
  }

  .disablePageBtn .nextPage:hover {
    background: url(/image/qt.png?v=201703241457) -351px -174px;
    transform: rotate(0deg);
    border: 1px solid #bfbfbf;
  }

  .nextPage:hover{
    background: url(/image/manage/thirdDesigner/slidehover.svg?v=201901211605) no-repeat 7px center;
    transform: rotate(180deg);
    border: 1px solid #3164FF;
  }
  /*detail end*/
</style>
