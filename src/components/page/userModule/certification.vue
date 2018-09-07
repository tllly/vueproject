<template>
  <div id="companyInfo">
    <div class="bank-formdata">
      <ul class="bank-form">
        <li class="bank-form-item">
          <label class="form-label">
            <span class="require-icon">*</span><span class="form-label-text">企业名称</span>
          </label>
          <div class="form-input">
            <input type="text" placeholder="请输入营业执照上的公司名称" v-model="dataobj.companyName">
          </div>
        </li>
        <li class="bank-form-item">
          <label class="form-label">
            <span class="require-icon">*</span><span class="form-label-text">统一社会信用代码</span>
          </label>
          <div class="form-input">
            <input type="text" placeholder="请输入" v-model="dataobj.licenseCode" >
          </div>
        </li>
        <li class="bank-form-item form-upload-item">
          <label class="form-label">
            <span class="require-icon">*</span><span class="form-label-text">营业执照</span>
          </label>
          <div class="form-upload">
            <div class="file-box">
              <div class="upload-task">
                <img :src="licenseImg" alt="">
                <input type="file" name="" id="" @change='uploadimg()'>
                <div class="upload-center">上传</div>
              </div>
            </div>
          </div>
        </li>
        <li class="bank-form-item">
          <label class="form-label">
            <span class="require-icon"> </span><span class="form-label-text">邮箱</span>
          </label>
          <div class="form-input">
            <input type="email" placeholder="请输入" class="tal" v-model="dataobj.email">
          </div>
        </li>
        <li class="bank-form-item">
          <label class="form-label">
            <span class="require-icon"> </span><span class="form-label-text">邮件验证码</span>
          </label>
          <div class="form-input">
            <input type="text" placeholder="请输入" class="tal codeimput" v-model="dataobj.emailCode">
            <a href="javascript:;" v-show="showCode" id="getCodeBtn" @click="getCodeFn()">获取验证码</a>
            <a href="javascript:;" v-show="!showCode" id="codeCount">剩余{{ count }}s</a>
          </div>
        </li>
      </ul>
    </div>
    <div class="bank-btn">
      <a href="javascript:;" class="available" @click="submitdata">提交</a>
    </div>
  </div>
</template>
<script>

  export default {
    data: function () {
      return {
        showCode: true,
        count: 60,
        licenseImg:'',
        dataobj:{
          emailCode:'',
          companyName:'',
          licenseCode:'',
          email:''
        }
      }
    },
    created: function () {

    },
    methods: {
      getCodeFn: function () {
        if(!this.dataobj.email){
          this.$prompt('请填写邮箱');
          return
        }
        this.$axios.get('/wx/user/sendEmailCode?email='+this.dataobj.email)
        .then((res)=>{
          console.log(res)
          const maxSecond = 60
          if (!this.timer) {
            this.count = maxSecond
            this.showCode = false
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= maxSecond) {
                this.count--
              } else {
                this.showCode = true
                clearInterval(this.timer)
                this.timer = null
              }
            }, 1000)
          }
        })
        .catch((err)=>{
          console.log(err)
        })
      },
      uploadimg:function(){
        let reader =new FileReader();  
        let img1=event.target.files[0];  
        let type=img1.type;//文件的类型，判断是否是图片  
        let size=img1.size;//文件的大小，判断图片的大小  
        let form = new FormData();   
        form.append('file',img1,img1.name);  
        if(type.split('/')[0] != 'image'){  
            alert('请选择我们支持的图片格式！');  
            return false;  
        }  
        if(size>3145728){  
            alert('请选择3M以内的图片！');  
            return false;  
        }
        this.$axios.post('/wx/user/uploadCertFile/businessLicence',form,{
            headers:{'Content-Type':'multipart/form-data'}
        }).then((res) => {
          this.licenseImg = res.data.data
          console.log(res.data.data)
        }).catch((err) => {  
          alert('上传图片出错！');  
        })      
      },
      submitdata(){
        const that = this;
        if(this.dataobj.companyName == ''){
          this.$prompt('请填写企业名称');
          return;
        }
        if(this.dataobj.licenseCode == ''){
          this.$prompt('请填写统一社会信用代码');
          return;
        }
        if(this.licenseImg == ''){
          this.$prompt('请上传营业执照');
          return;
        }else{
          this.dataobj.licenseImg = this.licenseImg
        }
        if(this.dataobj.email == ''){
          this.$prompt('请填写邮箱');
          return;
        }
        if(this.dataobj.emailCode == ''){
          this.$prompt('请填写邮箱验证码');
          return;
        }
        this.$axios.post('/wx/user/submitUserCert',this.dataobj)
        .then((res)=>{
          this.$prompt('提交成功');
          setInterval(function(){
            that.$router.push({
              path: '/userModule/usercenter'
            });
          },2000)
        })
        .catch((err)=>{
          this.$prompt('提交失败');
        })
      }
    }
  }
</script>

<style lang="less" scoped>
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
    padding: 0px 25px;
    box-sizing: border-box;
    background-color: #ffffff;
  }
  #companyInfo .bank-formdata{
    background-color: #ffffff;
  }
  #companyInfo .bank-formdata .bank-form .bank-form-item{
    padding: 30px 0;
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
  #companyInfo .bank-formdata .bank-form .form-upload-item{
    padding-bottom: 62px;
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
    width: 15px;
    height: 37px;
    line-height: 46px;
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
    border: 1px dashed #00c1de;
    box-sizing: border-box;
    position: relative;
  }
  #companyInfo .bank-formdata .bank-form .bank-form-item .form-upload .file-box .upload-task img{
    position: relative;
    z-index: 10;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
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
    z-index: 9;
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
  #companyInfo .bank-formdata .bank-form .bank-form-item .form-upload .file-box .upload-task input[type='file']{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    z-index: 11;
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
  #companyInfo .bank-formdata .bank-form .bank-form-item .form-input input.codeimput{
    width: 260px;
    float: left;
  }
  #companyInfo .bank-formdata .bank-form .bank-form-item .form-input a#codeCount{
    display: block;
    float: right;
    width: 170px;
    height: 37px;
    line-height: 37px;
    padding-right: 0;
    text-align: right;
    color: rgb(204,204,204);
  }
  #companyInfo .bank-formdata .bank-form .bank-form-item .form-input a#getCodeBtn{
    display: block;
    float: right;
    width: 170px;
    height: 37px;
    line-height: 37px;
    padding-right: 0;
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
    padding: 140px 0px 30px 0;
    margin-top: 0;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
  }
  .bank-btn a{
    width: 702px;
    height: 88px;
    display: block;
    text-align: center;
    line-height: 88px;
    margin: 0 auto;
    border-radius: 5px;
    font-size: 34px;
    font-family: 'PingFang-SC-Medium';
  }
  .bank-btn a.disabled{
    color: #999999;
    background-color: #e5e5e5;
  }
  .bank-btn a.available{
    color: #FFFFFF;
    background-color: rgb(0,193,222);
  }
</style>


