<template>
    <div class="order-item" v-if="showModule">
      <div class="orderinfo-box">
        <div class="orderinfo">
          <div class="orderinfo-top">
            <h4>求购</h4>
            <p>{{dataobj.title}}</p>
            <a href="javascript:;" @click="closeOrder(dataobj.id)">关闭</a>
          </div>
          <div class="order-content">
            <ul>
              <li><span>品牌:</span><span>{{dataobj.brandName}}</span></li>
              <li><span>采购量:</span><span>{{dataobj.buyNum}}</span></li>
              <li><span>付款方式:</span><span>{{dataobj.tradingType == 1 ? '平台支付':'线下支付'}}</span></li>
              <li><span>订单ID:</span><span>{{dataobj.id}}</span></li>
              <li><span>寻货单ID:</span><span>{{dataobj.companiesFoundId}}</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="companyinfo-box">
        <div class="companyinfo-top">
          <div class="company-logo">
            <img :src="dataobj.shopLogo" alt="">
          </div>
          <div class="company-desc">
            <p>{{dataobj.shopName}}</p>
            <div class="company-tag">
              <span class="tag-identification" v-if="isIdentification">金牌认证</span>
              <span class="tag-license" v-if="isLicense">营业执照</span>
            </div>
            <div class="company-history">
              <span>中标数: {{dataobj.wonNum}}次</span>
              <span>总报价: {{dataobj.quoteNum}}次</span>
            </div>
          </div>
        </div>
        <p class="offer-price">报价金额: ￥{{dataobj.totalMoney}}元</p>
        <p class="receive-number">承接数量: {{dataobj.productNum}}</p>
        <div class="upload-bill">
          <img :src="dataobj.exchangeMemo?dataobj.exchangeMemo:'/static/images/uploadicon6@3x.png'" alt="">
          <input type="file" @change='uploadimg(dataobj.id)'>
        </div>
      </div>
      <!-- <router-link to="/orderModule/paymodule"> -->
        <input class="order-pay" value="立即付款" type="button" @click="payorder(dataobj.id,dataobj.type)">
      <!-- </router-link> -->
    </div>
</template>
<script>
  export default {
    data () {
      return {
        showModule: true,
        isIdentification: true,
        isLicense: true
      }
    },
    props:{
      dataobj:{
        type:Object,
        required:true
      }
    },
    methods: {
      closeOrder: function (orderid) {
        this.$axios.get('/wx/companiesFoundOrder/closeMyFoundOrder?id='+orderid).then(res=>{
          console.log(res);
          this.showModule = false
        }).catch(err=>{

        })
      },
      uploadimg:function(orderid){
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
        this.$axios.post('/wx/companiesFoundOrder/uploadExchangeMemo/companiesFoundOrder?id='+orderid,form,{
            headers:{'Content-Type':'multipart/form-data'}
        }).then((res) => {
          this.dataobj.exchangeMemo = res.data.data
          console.log(res)
        }).catch((err) => {
          alert('上传图片出错！');
        })
      },
      payorder:function(cid,ctype){
        this.$router.push({
          path: '/orderModule/paymodule',
          query: {
            id: cid,
            type:ctype
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @order-border-color:rgb(238,238,238);
  @order-font-color1:rgb(51,51,51);
  @order-font-color:rgb(153,153,153);
  @order-info-color:rgb(102,102,102);
  @order-tag-color:rgb(230,172,92);
  @white-bg:#ffffff;
  @pfm:PingFang-SC-Medium;
  @pfb:PingFang-SC-Bold;
  @order-btn-border-color: #cccccc;
  @order-btn-bg:#f8f8f8;
  @price-color:rgb(255,97,105);
  .order-item{
    margin-top: 20px;
    width: 100%;
    background-color: @white-bg;
    box-sizing: border-box;
    overflow: hidden;
    .orderinfo-box{
      padding: 28px 23px 0px 24px;
      box-sizing: border-box;
      .orderinfo{
        border-bottom: 1px solid @order-border-color;
        .orderinfo-top{
          min-height: 46px;
          padding-left: 8px;
          padding-bottom: 5px;
          box-sizing: border-box;
          &:after{
            content: '';
            width: 0;
            height: 0;
            display: block;
            zoom: 1;
            overflow: hidden;
            clear: both;
          }
          h4{
            font-size: 32px;
            font-family: @pfm;
            float: left;
            width: 90px;
            text-align: left;
          }
          p{
            font-size: 32px;
            font-family: @pfm;
            float: left;
            text-align: left;
            width: 465px;
          }
          a{
            display: block;
            float: right;
            font-family: @pfm;
            font-size: 28px;
            width: 96px;
            height: 46px;
            line-height: 46px;
            border-radius: 24px;
            border: 1px solid @order-btn-border-color;
            background-color: @order-btn-bg;
            color: @order-font-color;
            text-align: center;
          }
        }
        .order-content{
          padding-left: 8px;
          box-sizing: border-box;
          ul{
            li{
              height: 28px;
              line-height: 28px;
              overflow: hidden;
              font-size: 28px;
              font-family: @pfm;
              margin-top: 23px;
              text-align: left;
              color: @order-info-color;
              &:nth-last-of-type(1){
                margin-bottom: 28px;
              }
              span{
                display: block;
                float: left;
                white-space: nowrap;
                text-overflow:ellipsis;
                overflow:hidden;
                &:nth-of-type(1){
                  width: 150px;
                }
                &:nth-of-type(2){
                  width: 540px;
                }
              }
            }
          }
        }
      }

    }
    .companyinfo-box{
      padding: 30px 23px 30px 24px;
      box-sizing: border-box;
      .companyinfo-top{
        height: 150px;
        overflow: hidden;
        .company-logo{
          width: 150px;
          height: 150px;
          float: left;
          img{
            width: 150px;
            height: 150px;
          }
        }
        .company-desc{
          text-align: left;
          width: 550px;
          float: left;
          padding-left: 28px;
          box-sizing: border-box;
          margin-top: 5px;
          p{
            font-family: @pfm;
            font-size: 32px;
            color: @order-font-color1;
            height: 31px;
            line-height: 31px;

          }
        }
        .company-tag{
          height: 25px;
          width: 540px;
          float: left;
          margin-top: 28px;
          span{
            margin-right: 40px;
            background-repeat: no-repeat;
            font-size: 24px;
            text-align: left;
            line-height: 26px;
            padding-left: 28px;
            float: left;
            display: block;
            height: 26px;
            color: @order-tag-color;
            &:nth-last-of-type(1){
              margin-right: 0px;
            }
            &.tag-identification{
              background-image: url("/static/images/tag-identification@3x.png");
              background-size: 22px 26px;
            }
            &.tag-license{
              background-image: url("/static/images/tag-license@3x.png");
              background-size: 22px 25px;
            }
          }
        }
        .company-history{
          height: 26px;
          width: 550px;
          float: left;
          margin-top: 30px;
          span{
            font-size: 28px;
            font-family: @pfm;
            color: @order-info-color;
            text-align: left;
            margin-right: 54px;
            display: block;
            height: 26px;
            line-height: 26px;
            float: left;
            &:nth-last-of-type(1){
              margin-right: 0;
            }
          }
        }
      }
      >p{
        height: 30px;
        line-height: 30px;
        font-size: 30px;
        margin-top: 27px;
        text-align: left;
        &.offer-price{
          margin-top: 32px;
        }
      }
      .upload-bill{
        width: 650px;
        height: 200px;
        margin: 30px auto;
        position: relative;
        img{
          width: 650px;
          height: 200px;
        }
        input[type='file']{
          width: 650px;
          height: 200px;
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
        }
      }
    }
    .order-pay{
      display: block;
      height: 86px;
      width: 100%;
      text-align: center;
      line-height: 86px;
      font-family: @pfm;
      font-size: 34px;
      color: @price-color;
      border: 0;
      border-top: 1px solid @order-border-color;
      outline-style: none;
      background-color: @white-bg;
    }

  }
</style>
