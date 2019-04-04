<template>
  <div class="editInfo">
    <div class="header">
      <span class="back" @click="$router.push('/myInfo')">返回</span>
      <Logout/>
    </div>

    <div class="container">
      <div class="certification">
        <el-tooltip effect="light" content="点击发起认证" placement="right" v-if="desData.status!==3">
          <span @click="onCert">
            <icon i-class="cert1" style="cursor: pointer"></icon>
          </span>
        </el-tooltip>
        <icon i-class="cert2" v-else></icon>
      </div>
      <div class="photo" >
        <img @click="isUpload=true" alt="" v-if="desData.photoImg" :src="preUrl+desData.photoImg">
        <img @click="isUpload=true" alt="" v-else src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAOfUlEQVR4Xu2deZBcVRWHz+mZbmYQwuaETZClBIIBWQLEYZY+dxIjISAgRAKCikuqABVRBFFAQKWEilAqpYJsQiEVlD3BkPHdN4vDYkCQULIF2aQ0GbYMyyzdfaxDvVCZnted7pm+/bZ7q/JX3jv3nt/5pt979557LoJtVgEDCqABm9akVQAsWBYCIwpYsIzIao1asCwDRhSwYBmR1Rq1YFkGjChgwTIiqzVqwbIMGFHAgmVEVmvUgmUZMKKABcuIrNaoBcsyYEQBC5YRWa1RC5ZlwIgCFiwjslqjFizLgBEFLFhGZLVGLViWASMKWLCMyGqNWrAsA0YUsGAZkdUatWBZBowoYMEyIqs1asGyDBhRwIJlRFZr1IJlGTCigAXLiKzWqAXLMmBEAQuWEVmtUQuWZcCIAhYsI7JaoxYsy4ARBSxYRmS1Ri1YlgEjCliwjMhqjVqwLANGFLBgbSQrM6dc120FgM8DwOHMvDMA7ICIKe+yIWZ+DRFfAwD59yoArE6lUg93dnY+ZyRCETVqwQKA3t7eQ3O53MkAcCIiTp9MLJn5WQBYMjw8fNP8+fNHJmMjTvckGizXdYmZLwSAbK2CysxrEfHKdDp9dVtb21Ct7EbNTiLB6u3tbcnlclch4kkGA7aOmc9SSt1qsI/Qmk4cWK7rHlIoFO6b7CNvEpG8DwAWEdE7k7g3srckCizHcU4FgGsRMVPniD0NAEcR0fN17jew7hIDltb6RwBwaYVKDwOACwA9iLgmlUqtyWQyzxcKhbFCobDN6OjoNojYAgBtADCfmQ/b6MvRtwtmfgMR5xHRqgrHEOnLEgGW67oXMPMlFUTqNma+uampSbe2tr5fwfUfXDIwMLDtyMjIKdIHIk4rc5/YVET0UKW2o3pd7MHSWp8IAH8sFyBmfhgRz5zqr4kANjw8fBEing4AjSX6fBMADo37YzHWYPX19e2ay+WeAYAmvyAz8ygiLiaiG2v5y1DBB4K8ax0Y5xf6WIOlte7z3oMmcCPzTalUakE2m/17LaHaYKu/v3+nsbEx+SI8sIT9O4noOBN9h8FmbMFyHOc0RLyuhMjPp9Ppzra2NlmWMda01k3MLB8Ah/p1goifyWazK40NIEDDsQSrv79/y7GxsRcA4KM+2r7T2Nh4cHt7uyzBGG8yGZvP5x8FgF2KO2PmR5RShxkfRAAdxBIs13XPYebLfQJZkOkBpdSKemqttZ4JAI8AQLPPmI5RSt1dz/HUo6/YgeVlKLwEAB/zEXAJEX2vHsIW91FqHo2ZH1NKHRzEmEz2GTuwHMc5EhHlpXlcY+Z38/n8znPnzn3bpKClbK9YseIj6XT6JUTcrviaVCp1eGdn50AQ4zLVZ+zA0lrfAgCSAlMM1kVKqUomSU1pDVrrswDgSp8Ofk1E3zTWcQCGYwWW1rqRmd9GxM2LtBwaHR3dcd68ee8GoPGHXS5fvnyzpqYmWdoZNz6Z+lBKbR/k2Grdd9zAkrU7mbsqbrcQ0Sm1Fm8y9rTWSwHghOJ7Gxsb92xvb5cv2Vi0WIHluu4PmPlnPo/B0Hx5aa3lMS2P63ENEU/NZrM3x4IqAIgVWI7j3CQB2jg4zPzetGnTtp41a9ZYGIK2cuXKrRoaGuRxuCGP/oNhMfMVSqnvh2GMtRhD3MDqR8TDi4R5koj2r4VYtbKhtZYZ/x2L/gDuUUp9rlZ9BG0nVmBpreUdZfeigD2glJoXtNAb9+84zqOIeFDROGM1nxUrsBzH+Z9PyvGNRPSVMIGltb4XABYUgfWMUmqfMI1zKmOJFVhaa9kVs0VRwH6hlPruVESq9b1a6xsA4MtFdl8hol1r3VdQ9mIFlt8vFjPfoJQ6LSiB/fp1HOduRDy66P+eJqIZYRrnVMYSK7C01pKx8IkiQf5CREdMRaRa3+s4zkOIWJzV8BARfbrWfQVlL25gSdLerCIxHyeiUsl2geiutf43AOxW1Pn9RDQ/kAEZ6DRuYN0OAMcX6fROS0vLdjNnzhw1oF/VJlevXp1Zu3btekTcLOzvglU7t9ENcQPrPAC4rFgQZv5svXOwSgXFdd2jmPkenzGeHKdd07ECy3Xducz8gE9QryaiM6fyF1ire/1WBzzbM4hINrbGosUKrIGBgebh4eG3fHY6v5LNZndDRMkgDaxJdkNzc/M6ANiy6DH4slLq44ENzEDHsQJL9PGbfPR0O4WIJiz+GtC0pMlS+VjMfKVS6ux6jsV0X7EDq9TuHGZ+YXBwcK+FCxfmTYvqZ9/LIH0ZEbf1+f92IuoPYlym+owdWN4Onf8UP25EQGZerJS6xpSY5ew6jnM+Iv7U56X9KaWUbLaIVYsdWN7j8CcA8EOfIL6dTqcPqndCndb6AGaWSdFxUwwyPkRcmM1mZZokVi2WYPX19W0zNjb2qk+KsvxqPYuIB9dre7u3r/CJ4jQZ7xf0GSLaN+iPChNExxIsEcpxnLMRcUkJ0e4HgKOJKGdC1A025St1ZGSkBwAO8euHmecopf5qcgxB2Y4tWEuXLm1oaWmRWlQHlAjqQDqdXtDe3i7VX2reKqjdcC8RFS9E13wcQRmMLVgiaG9v777e9nbfajMA8CIAHFHrickKqs0Metv8Xw4q8Kb7jTVY3iPxVES8qYyQwzKPlMlkLptqlWOvAJtUYT6jVH0sZh5BxLap1uIyDcZU7cceLO8r8bcAsLicWMz8OiKe19zcvHT27NnrqxG20op+zCwz/4uUUrIFLNYtEWAxM7quK1mbX6ogmjlm/hsALEfE3oaGhjUdHR2yDPNh6+7u3r6hoUHyvqQ+fKU1SOWX6ngimrD9v4IxRe6SRIC1ISqO4/wcESezxUpKacuRJrLTek+/aYxNRP5NZj5WKSVfiIloiQLLe+eSoiFSGtKvdpaJoEtZyLlEJB8KiWmJA8t75zqGmf+EiA0mIy0v6o2NjR0dHR1SGytRLTFgeSk1ixBRKr7sV8coMwDckUqlLu7s7Hyyjv0G2lXswfJe3GX7l6wdbh2o2gDLmPlcpdRTAY/DePexBqunp2dGoVD4g88GC+PCluqAmSVt53f5fP78oIrA1cP5WILllYuUrz854qRUIX9ffZlZ5rD+IQddIqKk3/zX+ye7rJGZ5TzDXZhZjjzZwStJecAmTqTw60uWks4holKVnesRf2N9xA6sVatWbT40NHQHAFRUr8GbCe8GgNsLhUJ/V1fXmsmo3dfXt0c+nz+yUCicgYh7V2qDma8fHBz8RlAJiJWOs9rrYgWWTFymUqkHELGS6jKvAMDV8lgioreqFa7c9Y7jdMkRKsx89KYOb/LsdKfT6eOmuqRUSx+mais2YDmO80kAEKh22oQostniEmb+lem0mZ6ent3z+fx3AOCrm5pUZeanmHleV1eXPH4j32IBljyGxsbGHtzE4Zby2X99Pp8/d86cOa/XM3Je4uESRCxb9UaSEAuFQmu9x2dCi8iD5eU9yTFtE05+2Egw2dJ+UtDHuTmOsxAArkHErcp8NT6RyWTao/5YjDRY3d3d26VSqQFE3KtMoO7JZDJfDEug5PFYKBTkJIqSk7TMLD51EZEcyBnJFlmwZOJTay2lIVvLQHUtES2WWYIwRcfbuPpnADiyzLhCVzCuGg0jC9Ymctpl08QvlVLfrkaMel67atWq9NDQ0J3l4ApTzYlqtYkkWFrrfZj5iTKHhkfir9078GCZHC9XInDrGhsb9zaVl18tLNVcHzmwvGDIUbvjisNucFoquRDRsVHZUiVnGgKAnFkohx/4tbvEn2qCGoZrowiWZIGWOmr3xXQ6vX9YXtQrDbDWWnLD/lUqRyyVSnV2dnb2VmovDNdFCixZA5RykIi4Z7F4Xj55q1Lq4TAIW+0YvNl6WVqa0KJ4YGakwHJddxEz31pC/Mif7KC1Lrnpg5kXKKWWVQtsUNdHBixveuG5Er9WL02fPn2vsJSDnGwwtdZSSlxy6yVroriFrpZqOT8jA1a5RwUAfJ2Ifj/ZgIbpPsdxTkdEWRyf0OTQ8mw2KwV8Q9+iBNb1JdbaJEthD9MLyvWKpBS/XbdunWy8GHfWjtd/YEcPV+t/JMDyJhPfKD51QpyV7VzZbPaKah0P8/WO41yIiBf7fKBEpqRkJMByXfcEZp6we1iS9JqamnZqbW0V6GLTtNZyULr8Ek9oUTk/OhJgOY5zKyIu8tE5thVbtNZy+PiEkyqicq5hJMAqcZRJoKUfTf88uq57ATP7HY7eR0Qdpvufqv3Qg+UVL3uvhKO7x3WHsZRCkolRH7/fz2azW4R9ySr0YLmu287MfssZg0QkO2Vi2bydRpKPlS52sKGh4VMdHR3/DLPjoQdLay2pL1f5iLiMiMYdJhlmoSczNq31gwAw2+frMLDqz5X6EXqwHMe5DhH9zhu8k4iOq9TRKF5X4sBMceU6IvpamH0KPVha6x8DwEU+It5GRH5fimHWu6qxaa3Fb/F/XAt7EqMMNvRg9fT07FcoFB7z2dF8LBHdVVWkInax+J7P5x8v3pvIzG1KKSkOF9oWerBEOa31F7wcrCav9sH5SqnLQ6tqDQfmOM5JiCjroM0AkEPEb2Wz2d/UsAsjpiIBlnjubZ3fN5fLPRfnYhp+URbf169fPyOTyTwblSTGyIBl5M/KGjWmgAXLmLTJNmzBSnb8jXlvwTImbbINW7CSHX9j3luwjEmbbMMWrGTH35j3Fixj0ibbsAUr2fE35r0Fy5i0yTZswUp2/I15b8EyJm2yDVuwkh1/Y95bsIxJm2zDFqxkx9+Y9xYsY9Im27AFK9nxN+a9BcuYtMk2bMFKdvyNeW/BMiZtsg1bsJIdf2PeW7CMSZtswxasZMffmPcWLGPSJtuwBSvZ8TfmvQXLmLTJNmzBSnb8jXlvwTImbbINW7CSHX9j3luwjEmbbMMWrGTH35j3Fixj0ibbsAUr2fE35r0Fy5i0yTZswUp2/I15/3/wAhXiQpjiogAAAABJRU5ErkJggg==" >
    </div>
      <div class="form_box">
        <span class="title" style="color: #a98d17">▌基本信息</span>
        <div class="item"><div class="keyClass">昵称</div><el-input type="text" v-model="desData.nickName"></el-input></div>
        <div class="item"><div class="keyClass">联系手机</div><el-input type="text" v-model="desData.phone"></el-input></div>
        <div class="item"><div class="keyClass">邮箱</div><el-input type="text" v-model="desData.email"></el-input></div>
        <div class="item"><div class="keyClass">微信</div><el-input type="text" v-model="desData.weChat"></el-input></div>
        <div class="item"><div class="keyClass">QQ</div><el-input type="text" v-model="desData.qq"></el-input></div>
        <div class="item"><div class="keyClass">国家</div><el-input type="text" v-model="desData.country"></el-input></div>
        <div class="item"><div class="keyClass">地址</div><el-input type="text" v-model="desData.address"></el-input></div>
      </div>
      <div class="tip"><span @click="showMore=!showMore"><span v-if="!showMore">显示更多</span><span v-else>收起更多</span></span></div>
      <div class="form_box" v-if="showMore">
        <span class="title" style="color: #489078">▌认证信息 <span style="color: silver;font-size: 12px">(认证通过后不可修改)</span></span>

        <div v-if="(desData.status===1 || desData.status===3)" class="showInfo">
          <div class="item"><div class="keyClass">真实姓名</div><span>{{desData.realName}}</span></div>
          <div class="item"><div class="keyClass">个人简介</div><span>{{desData.intro}}</span></div>
          <div class="item"><div class="keyClass">持卡人</div><span>{{desData.cardHolder}}</span></div>
          <div class="item"><div class="keyClass">开户行</div><span>{{desData.openBank}}</span></div>
          <div class="item"><div class="keyClass">银行账号</div><span>{{desData.bankAcct}}</span></div>
          <div class="item"><div class="keyClass">身份证号</div><span>{{desData.idNum}}</span></div>
        </div>
        <div v-else>
          <div class="item"><div class="keyClass">真实姓名</div><el-input type="text" v-model="desData.realName"></el-input></div>
          <div class="item"><div class="keyClass">个人简介</div><el-input type="text" v-model="desData.intro"></el-input></div>
          <div class="item"><div class="keyClass">持卡人</div><el-input type="text" v-model="desData.cardHolder"></el-input></div>
          <div class="item"><div class="keyClass">开户行</div><el-input type="text" v-model="desData.openBank"></el-input></div>
          <div class="item"><div class="keyClass">银行账号</div><el-input type="text" v-model="desData.bankAcct"></el-input></div>
          <div class="item"><div class="keyClass">身份证号</div><el-input type="text" v-model="desData.idNum"></el-input></div>
        </div>

      </div>
      <div class="footer">
        <el-button type="primary" style="width: 200px" @click="saveInfo(true)" v-if="desData.status!==3">保存</el-button>
        <el-button type="primary" style="width: 200px" @click="saveInfo(false)" v-else>保存</el-button>
      </div>
    </div>

    <UploadImage :is-visible="isUpload" @closeBox="closeUploadFileBox"></UploadImage>
  </div>
</template>

<script>
  import Logout from "../inc/Logout";
  import {UPLOAD_MIXINS} from "../../api/comm/mixins";
  import UploadImage from "@/components/openhtml/UploadFile";
  export default {
    name: "EditInfo",
    components: {UploadImage, Logout},
    mixins:[UPLOAD_MIXINS],
    data:function () {
      return{
        showMore: false,
        desData: {},
      }
    },
    methods:{
      closeUploadFileBox: function(imgUrl){
        if(imgUrl){
          this.desData.photoImg = imgUrl;
        }
        this.isUpload = false;
      },

      refresh:function () {
        let that = this;
        $.ajax({
          url: that.preUrl + '/getDesignerInfo',
          success: function (res) {
            if(res.success){
              that.desData = res.data.desData;
            }
          },
          error: function () {
            that.$message.error("网络繁忙，请稍后重试~");
          }
        })
      },

      saveInfo: function (isPass) {
        let that = this;
        let data = {};
        if(isPass){
          data = {
            nickName: this.desData.nickName,
            phone: this.desData.phone,
            email: this.desData.email,
            weChat: this.desData.weChat,
            qq: this.desData.qq,
            address: this.desData.address,
            country: this.desData.country,
            photoImg: this.desData.photoImg,
          }
        }else{
          data = {
            nickName: this.desData.nickName,
            phone: this.desData.phone,
            email: this.desData.email,
            weChat: this.desData.weChat,
            qq: this.desData.qq,
            country: this.desData.country,
            address: this.desData.address,
            photoImg: this.desData.photoImg,

            realName: this.desData.realName,
            intro: this.desData.intro,
            cardHolder: this.desData.cardHolder,
            openBank: this.desData.openBank,
            bankAcct: this.desData.bankAcct,
            idNum: this.desData.idNum,
            frontImg: this.desData.frontImg,
            reverseImg: this.desData.reverseImg,
          }
        }

        $.ajax({
          url: that.preUrl + '/setDesignerInfo',
          data: data,
          success: function (res) {
            if(res.success){
              that.$message.success(res.msg);
            } else{
              that.$message.error(res.msg);
            }
          },
          error: function () {
            that.$message.error("网络繁忙，请稍后重试~");
          }
        });
      },

      // 发起认证
      onCert: function(){
        this.$confirm('请确保认证信息填写正确，再发起认证申请', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info',
          center: true
        }).then(() => {
          this.doCert();
        }).catch(() => {});
      },
      // 发送认证ajax
      doCert: function () {
        let that = this;
        $.ajax({
          url: that.preUrl + '/getDesignerInfo',
          success: function (res) {
            if(res.success){
              that.$message.success("test");
            }
          },
          error: function () {
            that.$message.error("网络繁忙，请稍后重试~");
          }
        });
      },

    },
    created() {
      this.refresh()
    }
  }
</script>




<style scoped>
  .header .back{
    line-height: 70px;
    padding: 0 50px;
    cursor: pointer;
    box-sizing: border-box;
  }
  .header .back:hover{
    color: #2b89fb;
  }

  .editInfo{
    background: #f2f2f2;
    height: 100%;
  }
  .header{
    margin-bottom: 30px;
  }
  .container{
    position: relative;
    border-radius: 6px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    background: white;
    margin: auto;
    padding: 50px;
    width: 80%;
    height: 600px;
    min-width: 500px;
    overflow-y: auto;
  }
  .container .certification{
    position: absolute;
    left: 10px;
    top: 0;
    font-size: 90px;
  }

  .container .photo{
    text-align: center;
    margin-bottom: 30px;
    border-bottom: 1px #f2f2f2 solid;
  }
  .container .photo img{
    width: 150px;
    height: 150px;
    border: 1px silver solid;
    border-radius: 50%;
  }

  .container .form_box{
    width: 500px;
    margin: auto;
  }

  .container .showInfo span{
    display: inline-block;
    width: 300px;
    text-align: left;
    box-sizing: border-box;
    padding: 0 15px;
    color: gray;
  }

  .tip{
    margin: 12px 0;
    background: #f8f8f8;
    color: #aaaaaa;
    text-align: center;
  }
  .tip span{
    cursor: pointer;
  }
  .tip span:hover{
    color: #2b89fb;
  }

  .item{
    margin: 10px 10px;
    padding: 6px 0;
    text-align: center;
    border-bottom: 1px #f2f2f2 solid;
  }
  .keyClass{
    /*text-align: right;*/
    display: inline-block;
    width: 80px;
    line-height: 40px;
  }

  .footer{
    margin-top: 20px;
    text-align: center;
  }



  .el-input{
    width: 300px;
  }
</style>
