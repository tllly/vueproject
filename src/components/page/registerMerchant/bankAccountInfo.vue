<template>
  <div id="bankAccountInfo">
    <div class="bank-title">
      <h3>人民币账户资料</h3>
    </div>
    <div class="bank-formdata">
      <ul class="bank-form">
        <li class="bank-form-item">
          <label class="form-label">
            <span class="require-icon">*</span><span class="form-label-text">户名</span>
          </label>
          <div class="form-input">
            <input type="text" placeholder="请输入" v-model="rmbAccountInfo.accountHolderName">
          </div>
        </li>
        <li class="bank-form-item">
          <label class="form-label">
            <span class="require-icon">*</span><span class="form-label-text">银行账号</span>
          </label>
          <div class="form-input">
            <input type="text" placeholder="请输入" v-model="rmbAccountInfo.bankAccount">
          </div>
        </li>
        <li class="bank-form-item">
          <label class="form-label">
            <span class="require-icon">*</span><span class="form-label-text">开户行</span>
          </label>
          <div class="form-input">
            <input type="text" placeholder="请输入" v-model="rmbAccountInfo.openBank">
          </div>
        </li>
        <li class="bank-form-item">
          <label class="form-label">
            <span class="require-icon">*</span><span class="form-label-text">联行号</span>
          </label>
          <div class="form-input">
            <input type="text" placeholder="请输入" v-model="rmbAccountInfo.branchNumber">
          </div>
        </li>
        <li class="bank-form-item">
          <label class="form-label">
            <span class="require-icon">*</span><span class="form-label-text">支行所在地</span>
          </label>
          <div class="form-input">
            <textarea name="" id="addressRmb" v-model="rmbAccountInfo.bankAddress"  placeholder="请输入" rows="1"   @keyup="changeRmbHeight"></textarea>
          </div>
        </li>
      </ul>
    </div>
    <div class="bank-title" style="margin-top: 20px;border-top: 0">
      <h3>美元账户资料(选填)</h3>
    </div>
    <div class="bank-formdata">
      <ul class="bank-form">
        <li class="bank-form-item">
          <label class="form-label">
            <span class="require-icon">*</span><span class="form-label-text">户名</span>
          </label>
          <div class="form-input">
            <input type="text" placeholder="请输入" v-model="dollarAccountInfo.accountHolderName">
          </div>
        </li>
        <li class="bank-form-item">
          <label class="form-label">
            <span class="require-icon">*</span><span class="form-label-text">银行账号</span>
          </label>
          <div class="form-input">
            <input type="text" placeholder="请输入" v-model="dollarAccountInfo.bankAccount">
          </div>
        </li>
        <li class="bank-form-item">
          <label class="form-label">
            <span class="require-icon">*</span><span class="form-label-text">开户行</span>
          </label>
          <div class="form-input">
            <input type="text" placeholder="请输入" v-model="dollarAccountInfo.openBank">
          </div>
        </li>
        <li class="bank-form-item">
          <label class="form-label">
            <span class="require-icon">*</span><span class="form-label-text">Swift Code</span>
          </label>
          <div class="form-input">
            <input type="text" placeholder="请输入" v-model="dollarAccountInfo.swiftCode">
          </div>
        </li>
        <li class="bank-form-item">
          <label class="form-label">
            <span class="require-icon">*</span><span class="form-label-text">联行号</span>
          </label>
          <div class="form-input">
            <input type="text" placeholder="请输入" v-model="dollarAccountInfo.branchNumber">
          </div>
        </li>
        <li class="bank-form-item">
          <label class="form-label">
            <span class="require-icon">*</span><span class="form-label-text">支行所在地</span>
          </label>
          <div class="form-input">
            <textarea name="" id="addressDos"  placeholder="请输入" rows="1" v-model="dollarAccountInfo.bankAddress"   @keyup="changeDosHeight"></textarea>
          </div>
        </li>
      </ul>
    </div>
    <div class="bank-btn">
      <a href="javascript:;" @click="submitInfo">提交</a>
    </div>

  </div>
</template>

<style>
 #bankAccountInfo{
    background-color: #ffffff;
 }
  #bankAccountInfo .bank-title{
    padding: 40px 25px;
    border-top: 1px solid #e5e5e5;
  }
 #bankAccountInfo .bank-title h3{
   font-size: 34px;
   font-weight: bold;
   text-align: left;
   font-family: 'PingFang-SC-Bold';
 }
  #bankAccountInfo .bank-formdata .bank-form .bank-form-item{
    padding: 30px 25px;
    border-bottom: 1px solid #e6e6e6;
    box-sizing: border-box;
    width: 100%;
    background-color: #ffffff;
    overflow: hidden;
  }
  #bankAccountInfo .bank-formdata .bank-form .bank-form-item:after{
    content: '';
    width: 0;
    height: 0;
    display: block;
    zoom: 1;
    overflow: hidden;
    clear: both;
  }
  #bankAccountInfo .bank-formdata .bank-form .bank-form-item .form-label{
    width: 220px;
    margin-right: 10px;
    float: left;
    font-size: 32px;
    font-family: 'PingFang-SC-Medium';
    vertical-align: middle;
  }
 #bankAccountInfo .bank-formdata .bank-form .bank-form-item .form-label span.require-icon{
   color: #f35050;
   display: block;
   float: left;
   margin-right: 5px;
   height: 37px;
   line-height: 46px;
   width: 15px;
 }
 #bankAccountInfo .bank-formdata .bank-form .bank-form-item .form-label span.form-label-text{
   font-size: 28px;
   display: block;
   float: left;
 }
  #bankAccountInfo .bank-formdata .bank-form .bank-form-item .form-input{
    width: 460px;
    float: right;

  }
  #bankAccountInfo .bank-formdata .bank-form .bank-form-item .form-input textarea{
    width: 460px;
    height: 37px;
    min-height: 37px;
    overflow-y: hidden;
    /*overflow: visible;*/
    display: table-cell;
  }
  #bankAccountInfo .bank-formdata .bank-form .bank-form-item .form-input textarea,
  #bankAccountInfo .bank-formdata .bank-form .bank-form-item .form-input input{
    display: block;
    width: 460px;
    border: 0;
    outline: 0;
    text-align: left;
    font-size: 32px;
  }

  #bankAccountInfo .bank-formdata .bank-form .bank-form-item .form-input textarea::placeholder,
  #bankAccountInfo .bank-formdata .bank-form .bank-form-item .form-input input::placeholder{
    font-size: 32px;
    color: #cccccc;
    font-family: 'PingFang-SC-Medium';
  }
   #companyInfo .bank-formdata .bank-form .bank-form-item .form-input input.tal{
     text-align: left;
   }
   #companyInfo .bank-formdata .bank-form .bank-form-item .form-input input.tac{
     text-align: center;
   }
   #companyInfo .bank-formdata .bank-form .bank-form-item .form-input input.tar{
     text-align: right;
   }
  .bank-btn{
    margin-top: 225px;
    padding:15px 24px;
  }
  .bank-btn a{
    width: 702px;
    height: 88px;
    display: block;
    text-align: center;
    line-height: 88px;
    margin: 0 auto;
    color: #ffffff;
    background-color: #00c1de;
    font-size: 34px;
    font-family: 'PingFang-SC-Medium';
    border-radius: 5px;
  }
</style>

<script>
  import qs from 'qs'
  export default {
    data: function () {
      return {
        msg: '我是首页',
        account: '',
        rmbAccountInfo: {
          cardType: 1,
          accountHolderName: '',
          bankAccount: '',
          openBank: '',
          branchNumber: '',
          bankAddress: ''
        },
        dollarAccountInfo: {
          cardType: 2,
          accountHolderName: '',
          bankAccount: '',
          openBank: '',
          swiftCode: '',
          branchNumber: '',
          bankAddress: ''

        }
      }
    },
    created: function () {
      console.log('你说你会在乎我')
    },
    methods: {
      changeRmbHeight: function () {
        let scrollHeight = document.getElementById('addressRmb').scrollHeight
        document.getElementById('addressRmb').style.height = (scrollHeight + 'px')
      },
      changeDosHeight: function () {
        let scrollHeight = document.getElementById('addressDos').scrollHeight
        document.getElementById('addressDos').style.height = (scrollHeight + 'px')
      },
      submitInfo: function () {
        let flag = true
        if (this.rmbAccountInfo.accountHolderName == '') {
          this.$prompt('请输入户名')
          return false
        }
        if (this.rmbAccountInfo.bankAccount == '') {
          this.$prompt('请输入银行账号')
          return false
        }
        if (this.rmbAccountInfo.openBank == '') {
          this.$prompt('请输入开户行')
          return false
        }
        if (this.rmbAccountInfo.branchNumber == '') {
          this.$prompt('请输入联行号')
          return false
        }
        if (this.rmbAccountInfo.bankAddress == '') {
          this.$prompt('请输入支行所在地')
          return false
        }
        /*美元账户*/
        if (this.dollarAccountInfo.accountHolderName == '') {
          flag = false
        }
        if (this.dollarAccountInfo.bankAccount == '') {
          flag = false
        }
        if (this.dollarAccountInfo.openBank == '') {
          flag = false
        }
        if (this.dollarAccountInfo.swiftCode == '') {
          flag = false
        }
        if (this.dollarAccountInfo.branchNumber == '') {
          flag = false
        }
        if (this.dollarAccountInfo.bankAddress == '') {
          flag = false
        }
        let bankCardList = []
        let url = '/wx/merchant/submitMerchantBankInfo'
        bankCardList.push(this.rmbAccountInfo)
        if (flag) {
          bankCardList.push(this.dollarAccountInfo)
        }
        this.$axios.post(url, qs.parse({
          bankCardList: bankCardList
        })).then(res => {
          console.log(res)
          that.$router.push({ path: '/userModule/usercenter' })
        }).catch(error => {
          this.$prompt(error.data.desc)
        })
      }
    }
  }
</script>
