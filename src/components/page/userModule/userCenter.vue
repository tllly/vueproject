<template>
    <div id="accountCenter">
      <div id="accountInfo">
        <div id="accountImage">
          <img src="/static/images/userimage@3x.png" alt="">
        </div>
        <div id="accountName" @click="showmessage('发货的萨芬哈迪斯卡丰厚的萨克分范德萨范德萨分的公司')">
          夏老师0820
        </div>
      </div>
      <div id="accountList">
        <ul>
          <li id="qiugou">
            <router-link to="/mySeek/mysearch">
            我的求购
            </router-link>
          </li>
          <li id="dingdan">
            <router-link to="/orderModule/orderList">
              我的订单
            </router-link>
          </li>
          <li id="xiaoxi">
            <router-link to="/myNews/news">
              我的消息
            </router-link>
          </li>
          <li id="gongyingshang">
            <router-link to="/registerMerchant/companyInfo">
              入驻成为供应商
            </router-link>
          </li>
          <li id="renzheng">
            <router-link to="/userModule/certification">
              实名认证
            </router-link>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    methods:{
      showmessage(msg){
        this.$prompt(msg);
      }
    }
  }
</script>

<style lang="less" scoped>
  @white-bg: #ffffff;
  @accountMainFontColor:rgb(51,51,51);
  @pfm:PingFang-SC-Medium;
  @pfb:PingFang-SC-Bold;
  @border-color:rgb(230,230,230);
  #accountCenter{
    width: 750px;
    #accountInfo{
      padding: 25px 24px;
      width: 750px;
      height: 188px;
      background-color: @white-bg;
      box-sizing: border-box;
      #accountImage{
        box-sizing: border-box;
        width: 138px;
        height: 138px;
        border: 4px solid @white-bg;
        border-radius: 50%;
        box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.1);
        float: left;
        img{
          width: 130px;
          height: 130px;
          border-radius: 50%;
        }
      }
      #accountName{
        box-sizing: border-box;
        width: 100%;
        padding-left: 196px;
        height: 138px;
        line-height: 138px;
        text-align: left;
        font-size: 36px;
        color: @accountMainFontColor;
        font-family: @pfb;
        letter-spacing: 3px;
      }
    }
    #accountList{
      margin-top: 20px;
      background-color: @white-bg;
      padding: 0 25px 0 24px;
      box-sizing: border-box;
      ul{
        li{
          height: 101px;
          background-image: url("/static/images/arrow5@3x.png");
          background-repeat: no-repeat;
          background-position: 653px 25px;
          border-bottom: 1px solid @border-color;
          box-sizing: border-box;
          &:nth-last-child(1){
            border-bottom: 0;
            height: 100px;
          }
          a{
            display: block;
            height: 100px;
            font-size: 32px;
            font-family: @pfm;
            color: @accountMainFontColor;
            line-height: 100px;
            text-align: left;
            padding-left: 95px;
            box-sizing: border-box;
            background-repeat: no-repeat;
          }
          &#qiugou{
            a{
              background-image: url("/static/images/qiugou@3x.png");
              background-position: 13px 23px;
            }
          }
          &#dingdan{
            a{
              background-image: url("/static/images/dingdan@3x.png");
              background-position: 13px 23px;
            }
          }
          &#xiaoxi{
            a{
              background-image: url("/static/images/xiaoxi@3x.png");
              background-position: 13px 23px;
            }
          }
          &#gongyingshang{
            a{
              background-image: url("/static/images/gongyingshang@3x.png");
              background-position: 13px 23px;
            }
          }
          &#renzheng{
            a{
              background-image: url("/static/images/renzheng@3x.png");
              background-position: 13px 23px;
            }
          }
        }
      }
    }
  }
</style>


