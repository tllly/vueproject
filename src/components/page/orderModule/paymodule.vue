<template>
    <div id="paymodule">
        <div id="companyInfo">
          <ul>
            <li><p class="info-name">户名</p><p class="info-value">{{dataobj.accountHolderName}}</p></li>
            <li><p class="info-name">开户行</p><p class="info-value">{{dataobj.openBank}}</p></li>
            <li><p class="info-name">账号</p><p class="info-value">{{dataobj.bankAccount}}</p></li>
            <li><p class="info-name">银联号</p><p class="info-value">{{dataobj.branchNumber}}</p></li>
            <template v-if="dataobj.accountType == 2">
              <li><p class="info-name">swiftCode</p><p class="info-value">{{dataobj.swiftCode}}</p></li>
            </template>
            <li><p class="info-name">公司地址</p><p class="info-value company-address">{{dataobj.companyAddress}}</p></li>
            <li><p class="info-name">联系人</p><p class="info-value">{{dataobj.contacts}}</p></li>
            <li><p class="info-name">电话</p><p class="info-value">{{dataobj.contactsMobile}}</p></li>
          </ul>
        </div>
        <!-- <div id="checkAgreement">
          <div id="outerbox">
            <input type="checkbox" @click="checked()" >
            <div v-bind:class="{ unchecked : !checkship, checked: checkship }" class="checkboximg"></div>
          </div>
          <p class="agreement-content">同意支付手续费 <span class="price">520.00元</span><span class="desc">（手续费: 实付金额X1%）</span></p>
        </div>
        <p class="total-price">合计<span>￥50000.00</span></p> -->
      <!-- <input type="button" id="payBtn" value="确定" @click="confirmagree"> -->
    </div>
</template>

<script>
  export default {
    data () {
      return {
          checkship:false,
          dataobj:{},
          dataobjshow:{},
          dataobjhide:{}
      }
    },
    created(){
      let id = this.$route.query.id
      let type = this.$route.query.type
      this.$axios.post('/wx/companiesFoundOrder/queryMerantAccountInfo',{
        "id":id,  
	      "type":type
      })
      .then((res)=>{
        this.dataobjshow = JSON.parse(JSON.stringify(res.data.data))
        //this.dataobj = res.data.data
        this.dataobjhide = res.data.data

        this.dataobjhide.accountHolderName = this.dataobjhide.accountHolderName.substr(0,2)+ '****' +this.dataobjhide.accountHolderName.substr(this.dataobjhide.accountHolderName.length-4)
        this.dataobjhide.bankAccount = this.dataobjhide.bankAccount.substr(0,4)+ '****' +this.dataobjhide.bankAccount.substr(this.dataobjhide.bankAccount.length-3)
        this.dataobjhide.branchNumber = this.dataobjhide.branchNumber.substr(0,4)+ '****' +this.dataobjhide.branchNumber.substr(this.dataobjhide.branchNumber.length-3)
        this.dataobjhide.contacts = this.dataobjhide.contacts.substr(0,1)+ '**'
        this.dataobjhide.contactsMobile = this.dataobjhide.contactsMobile.substr(0,4)+ '****' +this.dataobjhide.contactsMobile.substr(this.dataobjhide.contactsMobile.length-4)
        this.dataobjhide.swiftCode = this.dataobjhide.swiftCode.substr(0,4)+ '****' +this.dataobjhide.swiftCode.substr(this.dataobjhide.swiftCode.length-3)
        this.dataobjhide.companyAddress = this.dataobjhide.companyAddress.substr(0,3)+ '****'

        this.dataobj = this.dataobjshow;
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    methods: {
      checked: function () {
        this.checkship = !this.checkship
        if(this.checkship){
          //this.dataobj = this.dataobjshow;
        }else{
          this.dataobj = this.dataobjhide;
        }
      },
      confirmagree(){
        if(this.checkship){
          this.dataobj = this.dataobjshow;
        }else{
          this.dataobj = this.dataobjhide;
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @pay-border-color:rgb(213,232,231);
  @pfm:PingFang-SC-Medium;
  @pfb:PingFang-SC-Bold;
  @info-name-color:rgb(102,102,102);
  @info-value-color:rgb(51,51,51);
  @price-color:rgb(255,97,105);
    #paymodule {
      width: 750px;
      box-sizing: border-box;
      padding: 30px 25px 43px 24px;
      #companyInfo {
        border: 1px solid @pay-border-color ;
        background-image: url("/static/images/nongyeyinhang@3x.png");
        background-repeat: no-repeat;
        background-size: 702px 564px;
        ul{
          padding: 33px 20px 35px;
          li{
            padding-bottom: 40px;
            &:nth-last-child(1){
              padding-bottom: 0;
            }
            &:after{
              content: '';
              width: 0;
              height: 0;
              display: block;
              zoom: 1;
              overflow: hidden;
              clear: both;
            }
            p{
              height: 32px;
              line-height: 32px;
              &.company-address{
                display: inline-block;
                height: auto;
                line-height: 32px;
              }
            }
            .info-name{
              width: 150px;
              float: left;
              text-align: left;
              font-family: @pfm;
              font-size: 30px;
              color: @info-name-color;
            }
            .info-value{
              width: 509px;
              float: right;
              text-align: left;
              font-family: @pfm;
              font-size: 30px;
              color: @info-value-color;
            }
          }
        }
      }
      #checkAgreement{
        margin-top: 40px;
        height: 32px;
        #outerbox{
          width: 32px;
          height: 32px;
          position: relative;
          float: left;
          input[type='checkbox']{
            width: 32px;
            height: 32px;
            float: left;
            opacity: 0;
            position: absolute;
            left: 0;
            top: 0;
          }
          .checkboximg{
            width: 32px;
            height: 32px;
            border-radius: 6px;
            background-color: #fff;
            &.checked{
              background-image: url("/static/images/checkboximg@3x.png");
              background-size: 32px 32px;
            }
            &.unchecked{
              border: 1px solid rgb(0,193,222);
              box-sizing: border-box;
            }
          }
        }
        .agreement-content{
          float: left;
          font-size: 28px;
          line-height: 32px;
          margin-left: 20px;
          font-family: @pfm;
          color: @info-value-color;
          span{
            &.price{
              color: @price-color;
            }
            &.desc{
              color: rgb(153,153,153);
            }
          }

        }
      }
      p.total-price{
        font-size: 32px;
        font-family: @pfm;
        color: rgb(153,153,153);
        text-align: center;
        height: 270px;
        line-height: 270px;
        span{
          color: @price-color;
          font-size: 64px;
          font-family: @pfb;
        }
      }
      #payBtn{
        display: block;
        width: 600px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        background-color: @price-color;
        margin: 0 auto;
        border-radius: 44px;
        border: 0;
        font-size: 34px;
        font-family: @pfm;
        color: rgb(255,255,255);
      }
    }
</style>

