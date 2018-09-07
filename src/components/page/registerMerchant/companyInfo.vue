<template>
  <div id="companyInfo">
    <div class="bank-title">
      <h3>企业信息</h3>
    </div>
    <div class="bank-formdata">
      <ul class="bank-form">
        <li class="bank-form-item">
          <label class="form-label">
            <span class="require-icon">*</span><span class="form-label-text">企业类别</span>
          </label>
          <div class="form-select">
            <input  type="text" readonly  @click="showType"  v-model="type">
          </div>
        </li>
        <li class="bank-form-item">
          <label class="form-label">
            <span class="require-icon">*</span><span class="form-label-text">企业名称</span>
          </label>
          <div class="form-input">
            <input type="text" placeholder="请输入" v-model="formData.companyName">
          </div>
        </li>
        <li class="bank-form-item">
          <label class="form-label">
            <span class="require-icon">*</span><span class="form-label-text">公司电话</span>
          </label>
          <div class="form-input">
            <input type="number" placeholder="请输入" v-model="formData.telephone">
          </div>
        </li>
        <li class="bank-form-item">
          <label class="form-label">
            <span class="require-icon">*</span><span class="form-label-text">公司地址</span>
          </label>
          <div class="form-input">
            <input type="text" placeholder="请输入" v-model="formData.companyAddress">
          </div>
        </li>
        <li class="bank-form-item">
          <label class="form-label">
            <span class="require-icon">*</span><span class="form-label-text">管理员姓名</span>
          </label>
          <div class="form-input">
            <input type="text" placeholder="请输入" v-model="formData.contacts">
          </div>
        </li>
        <li class="bank-form-item">
          <label class="form-label">
            <span class="require-icon">*</span><span class="form-label-text">管理员手机号</span>
          </label>
          <div class="form-input">
            <input type="number" placeholder="请输入" v-model="formData.contactMobile">
          </div>
        </li>
        <li class="bank-form-item">
          <label class="form-label">
            <span class="require-icon">*</span><span class="form-label-text">管理员身份证号</span>
          </label>
          <div class="form-input">
            <input type="text" placeholder="请输入" v-model="formData.identityNo">
          </div>
        </li>
        <li class="bank-form-item">
          <label class="form-label">
            <span class="require-icon">*</span><span class="form-label-text">店铺LOGO</span>
          </label>

          <div class="form-upload">
            <div class="file-box">
              <img :src="formData.shopLogo ? formData.shopLogo : '/static/images/companyupload4@3x.png'" alt="">
              <input type="file" @change="uploadimg('shopLogo')">
            </div>
          </div>
        </li>
        <li class="bank-form-item">
          <label class="form-label">
            <span class="require-icon">*</span><span class="form-label-text">授权书</span>
          </label>
          <div class="form-input">
            <a href="javascript:;">查看实例</a>
          </div>
          <div class="form-tip">
            <p>请将授权书图片保存至手机，打印后加盖企业公章并拍照上传</p>
          </div>
          <div class="form-downlink">
            <a href="https://mobile.10cifang.com/pic/downLoad?filename=authorization.docx">下载授权书至手机</a>
          </div>
          <div class="form-upload">
            <div class="file-box">
              <img :src="formData.authorization ? formData.authorization : '/static/images/companyupload4@3x.png'" alt="">
              <input type="file" @change="uploadimg('authorization')">
            </div>
          </div>
        </li>

      </ul>
    </div>
    <div class="bank-formdata" style="margin-top: 20px;">
      <ul class="bank-form">
        <li class="bank-form-item">
          <label class="form-label">
            <span class="require-icon">*</span><span class="form-label-text">统一社会信用代码</span>
          </label>
          <div class="form-input">
            <input type="text" placeholder="请输入" v-model="formData.creditCode">
          </div>
        </li>
        <li class="bank-form-item">
          <label class="form-label">
            <span class="require-icon">*</span><span class="form-label-text">营业执照</span>
          </label>
          <div class="form-upload">
            <div class="file-box">
              <img :src="formData.license ? formData.license : '/static/images/companyupload4@3x.png'" alt="">
              <input type="file" @change="uploadimg('license')">
            </div>
          </div>
        </li>

      </ul>
    </div>
    <div class="bank-title" style="margin-top: 20px;">
      <h3>主营类别</h3>
    </div>
    <div class="bank-formdata">
      <ul class="bank-form">
        <li class="bank-form-item">
          <label class="form-label">
            <span class="require-icon">*</span><span class="form-label-text">主营类别</span>
          </label>
          <div class="form-select">
            <input type="text" readonly  @click="showCategory()">
          </div>
        </li>
        <li class="form-checkbox">
          <a href="javascript:;" v-for="item in categorys" v-if="item.select" v-show="item.select">{{ item.categoryName }}</a>
        </li>
      </ul>
    </div>
    <div class="bank-btn">

        <a href="javascript:;" @click="submitInfo">下一步</a>

    </div>
    <SelectComponent
      v-if = "isShowType"
      v-bind:selectObj="{ selectArr: typeList, isShow: true, selectParFn: 'setType1', closeSelect: 'closeType'}"
      v-on:setType1 = "setType"
      v-on:closeType="closeSelect"
    ></SelectComponent>
    <SelectCategorys
        v-if="showSelectCategorys"
        :categorys="categorys"
        v-on:changeCategorys = "changeCategorys"
        v-on:closeCategorys = "closeCategorys"
    ></SelectCategorys>
  </div>
</template>
<style lang="less" scoped>
  html{

  }
  #accountType{
    position: fixed;
    width: 750px;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0,0,0,0.3);
    ul#typeList{
      position: absolute;
      left: 0;
      bottom: 0;
      height: 192px;
      width: 750px;
      li{
        width: 750px;
        height: 96px;
        text-align: center;
        font-size: 32px;
        line-height: 96px;
        background-color: #ffffff;
        &.checked{
          background-color: #eeeeee;
        }
      }
    }
  }
  #companyInfo{

  }
  #companyInfo .bank-title{
    padding: 40px 25px;
    border-top: 1px solid #e5e5e5;
    background-color: #ffffff;
  }
  #companyInfo .bank-title h3{
    font-size: 34px;
    font-weight: bold;
    text-align: left;
    font-family: 'PingFang-SC-Bold';
  }
  #companyInfo .bank-formdata{
    background-color: #ffffff;
  }
  #companyInfo .bank-formdata .bank-form .bank-form-item{
    padding: 30px 25px;
    border-bottom: 1px solid #e6e6e6;
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
  }
  #companyInfo .bank-formdata .bank-form .bank-form-item:after{
    content: '';
    width: 0;
    height: 0;
    display: block;
    zoom: 1;
    overflow: hidden;
    clear: both;
  }
  #companyInfo .bank-formdata .bank-form .bank-form-item .form-label{
    width: 250px;
    margin-right: 10px;
    float: left;
    font-size: 32px;
    font-family: 'PingFang-SC-Medium';
    vertical-align: middle;
  }
  #companyInfo .bank-formdata .bank-form .bank-form-item .form-label span.require-icon{
    color: #f35050;
    display: block;
    float: left;
    margin-right: 5px;
    height: 37px;
    line-height: 46px;
    width: 15px;
  }
  #companyInfo .bank-formdata .bank-form .bank-form-item .form-label span.form-label-text{
    font-size: 28px;
    display: block;
    float: left;
  }
  #companyInfo .bank-formdata .bank-form .form-checkbox{
    padding: 40px 34px;
  }
  #companyInfo .bank-formdata .bank-form .form-checkbox:after{
    content: '';
    width: 0;
    height: 0;
    display: block;
    zoom: 1;
    overflow: hidden;
    clear: both;
  }
  #companyInfo .bank-formdata .bank-form .form-checkbox a{
    display: block;
    width: 200px;
    height: 70px;
    line-height: 70px;
    text-align: center;
    margin-right: 40px;
    margin-bottom: 40px;
    font-size: 28px;
    color: #00c1de;
    background-color: #e5fcff;
    border-radius: 5px;
    float: left;
  }
  #companyInfo .bank-formdata .bank-form .form-checkbox a:nth-of-type(3n){
    margin-right: 0;
  }
  #companyInfo .bank-formdata .bank-form .form-checkbox a:nth-of-type(4),
  #companyInfo .bank-formdata .bank-form .form-checkbox a:nth-of-type(5),
  #companyInfo .bank-formdata .bank-form .form-checkbox a:nth-of-type(6){
    margin-bottom: 0;
  }
  #companyInfo .bank-formdata .bank-form .bank-form-item .form-input{
    width: 430px;
    float: right;
  }
  #companyInfo .bank-formdata .bank-form .bank-form-item .form-downlink{
    padding: 0 25px;
    float: left;
  }
  #companyInfo .bank-formdata .bank-form .bank-form-item .form-downlink a{
    display: block;
    height: 80px;
    width: 650px;
    border-radius: 40px;
    background-color: #00c1de;
    text-align: left;
    box-sizing: border-box;
    padding-left: 235px;
    line-height: 80px;
    color: #ffffff;
    font-size: 28px;
    font-family: "MicrosoftYaHei";
    background-image: url("/static/images/Shape1copy42@3x.png");
    background-repeat: no-repeat;
    background-position: 200px 25px;
    background-size: 24px 30px;
  }
  #companyInfo .bank-formdata .bank-form .bank-form-item .form-tip{
    padding: 30px 25px 40px;
    font-size: 28px;
    color: #999999;
    text-align: left;
    float: left;
  }
  #companyInfo .bank-formdata .bank-form .bank-form-item .form-upload{
    height: 410px;
    padding: 40px 25px 20px;
    float: left;
    box-sizing: border-box;
  }
  #companyInfo .bank-formdata .bank-form .bank-form-item .form-upload .file-box{
    width: 650px;
    height: 350px;
    box-sizing: border-box;
    position: relative;
  }
  #companyInfo .bank-formdata .bank-form .bank-form-item .form-upload .file-box img{
    width: 650px;
    height: 350px;
    box-sizing: border-box;
  }
  #companyInfo .bank-formdata .bank-form .bank-form-item .form-upload .file-box input[type=file]{
    width: 650px;
    height: 350px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
  #companyInfo .bank-formdata .bank-form .bank-form-item .form-upload .file-box .upload-task{
    width: 650px;
    height: 350px;
    background-color: #fafafa;
    position: absolute;
    left: -1px;
    top: -1px;
    box-sizing: border-box;
  }
  #companyInfo .bank-formdata .bank-form .bank-form-item .form-upload .file-box .upload-task .upload-center{
    width: 150px;
    box-sizing: border-box;
    line-height: 50px;
    height: 50px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -75px;
    margin-top: -25px;
    background-image: url("/static/images/upload6@3x.png");
    background-repeat: no-repeat;
    background-size: 30px 30px;
    background-position: 10px 10px;
    padding-left: 50px;
    font-size: 32px;
    color: #00c1de;
  }
  #companyInfo .bank-formdata .bank-form .bank-form-item .form-select{
    width: 430px;
    height: 37px;
    min-height: 37px;
    overflow: visible;
    display: block;
    float: right;
  }
  #companyInfo .bank-formdata .bank-form .bank-form-item .form-input textarea{
    width: 430px;
    height: 37px;
    min-height: 37px;
    overflow: visible;
    display: table-cell;
  }
  #companyInfo .bank-formdata .bank-form .bank-form-item .form-input textarea,
  #companyInfo .bank-formdata .bank-form .bank-form-item .form-select input,
  #companyInfo .bank-formdata .bank-form .bank-form-item .form-input input{
    display: block;
    width: 430px;
    border: 0;
    outline: 0;
    text-align: right;
    font-size: 32px;
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
  #companyInfo .bank-formdata .bank-form .bank-form-item .form-select input{
    background-image: url("/static/images/arrow5@3x.png");
    background-repeat: no-repeat;
    background-size: 18px 33px;
    background-position: 412px 6px;
    padding-right: 25px;
    box-sizing: border-box;
  }
  #companyInfo .bank-formdata .bank-form .bank-form-item .form-input a{
    padding-right: 25px;
    font-size: 28px;
    color: #00c1de;
    display: block;
    height: 37px;
    line-height: 37px;
    text-align: right;
  }
  #companyInfo .bank-formdata .bank-form .bank-form-item .form-input textarea::placeholder,
  #companyInfo .bank-formdata .bank-form .bank-form-item .form-input input::placeholder{
    font-size: 32px;
    color: #cccccc;
    font-family: 'PingFang-SC-Medium';
  }
  .bank-btn{
    padding: 30px 24px;
    margin-top: 0;
    bottom: 0;
    left: 0;
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
    border-radius: 5px;
    font-size: 34px;
    font-family: 'PingFang-SC-Medium';
  }
</style>

<script>
  import qs from 'qs'
  import SelectCategorys from '@/components/selectCategorys.vue'
  import SelectComponent from '@/components/SelectComponent.vue'
  export default {
    components: {
      SelectCategorys: SelectCategorys,   //注册声明选择主营类别的组件
      SelectComponent: SelectComponent
    },
    data: function () {
      return {
        msg: '我是首页',
        account: '',
        accountTypeIsCompany: true,
        showSelectCategorys: false,
        showAccountType: false,
        formData: {
          type: '',
          companyName: '',
          companyAddress: '',
          telephone: '',
          contacts: '',
          contactMobile: '',
          identityNo: '',
          shopLogo: '',
          authorization: '',
          creditCode: '',
          license: '',
          productCategories: ''
        },
        type: '',
        categorys: [],
        typeList: [{
          id: 1,
          value: '企业',
          select: false
        }, {
          id: 2,
          value: '个人',
          select: false
        }],
        isShowType: false
      }
    },
    methods: {
      changeHeight: function () {
        let scrollHeight = document.getElementById('address').scrollHeight
        document.getElementById('address').style.height = (scrollHeight + 'px')
      },
      showType: function () {
        this.isShowType = true
      },
      closeSelect: function () {
        this.isShowType = false
      },
      showCategory: function () {
        this.showSelectCategorys = true
      },
      changeCategorys: function (newCategorys) {
          this.categorys = newCategorys
      },
      closeCategorys: function () {
        this.showSelectCategorys = false
      },
      setType: function (obj) {
        this.type = obj.curSelect.value
        this.formData.type = obj.curSelect.id
        this.typeList = obj.selectArr
        this.isShowType = false
      },
      uploadimg: function(target){
        let reader =new FileReader();
        let that = this
        let img1=event.target.files[0];
        let type=img1.type;//文件的类型，判断是否是图片
        let size=img1.size;//文件的大小，判断图片的大小
        let form = new FormData();
        form.append('uploadfile', img1, img1.name);
        if(type.split('/')[0] != 'image'){
          alert('请选择我们支持的图片格式！');
          return false;
        }
        if(size>3145728){
          alert('请选择3M以内的图片！');
          return false;
        }
        console.log(img1)
        console.log(event)
        console.log(form)
        this.$axios.post('/pic/upload/authorization', form, {
          headers: {'Content-Type': 'multipart/form-data'}
        }).then((res) => {
           that.formData[target] = res.data.data
          console.log(res)
        }).catch((err) => {
          alert('上传图片出错！');
        })
      },
      getProductCategory: function () {
        let url = '/wx/productCategory/subCategory'
        this.$axios.post(url, qs.stringify({
          id: 0
        })).then(res => {
          console.log(res)
          let list = res.data.data
          for (let i = 0; i< list.length; i++) {
            list[i].select = false
          }
          this.categorys = list
        }).catch(error => {
          this.$prompt(error.data.desc)
        })
      },
      submitInfo: function () {
        let productCategories = []
        let url = '/wx/merchant/submitMerchantInfo'
        let that = this
        for (let i = 0; i < this.categorys.length; i++) {
          if (this.categorys[i].select) {
            productCategories.push(this.categorys[i].id)
          }
        }
        this.formData.productCategories = productCategories.join(',')
        console.log(this.formData)
        if (this.formData.typeId == '') {
          this.$prompt('请选择企业类别')
          return false
        }
        if (this.formData.companyName == '') {
          this.$prompt('请输入公司名称')
          return false
        }
        if (this.formData.companyAddress == '') {
          this.$prompt('请输入公司地址')
          return false
        }
        if (this.formData.telephone == '') {
          this.$prompt('请输入公司电话')
          return false
        }
        if (this.formData.contacts == '') {
          this.$prompt('请输入管理员姓名')
          return false
        }
        if (this.formData.contactMobile == '') {
          this.$prompt('请输入管理员手机号')
          return false
        }
        if (this.formData.identityNo == '') {
          this.$prompt('请输入管理员身份证号')
          return false
        }
        if (this.formData.shopLogo == '') {
          this.$prompt('请上传店铺LOGO')
          return false
        }
        if (this.formData.authorization == '') {
          this.$prompt('请上传授权书')
          return false
        }
        if (this.formData.creditCode == '') {
          this.$prompt('请输入统一社会信用代码')
          return false
        }
        if (this.formData.license == '') {
          this.$prompt('请上传营业执照')
          return false
        }
        if (this.formData.productCategories == '') {
          this.$prompt('请选择主营类别')
          return false
        }
        that.$axios.post(url, qs.parse(that.formData)).then(res => {
          console.log(res)
          that.$router.push({ path: '/registerMerchant/bankAccountInfo' })
        }).catch(error => {
          this.$prompt(error.data.desc)
        })
      }
    },
    created: function () {
      this.getProductCategory()
    }
  }
</script>
