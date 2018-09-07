<template>
    <div class="addsearch">
        <div class="tips">请输入您的采购需求，您写的越详细，获得得报价就会越精确。</div>
        <ul class="proinforlist">
            <li><span>*</span>交易币种 <input @click="showCurrencyType"  type="text" readonly  class="select-input"  v-model="currencyTypeInfo.currencyTypeText"></li>
            <li><span>*</span>交货地 <input  type="text" readonly @click="showPicker4" class="select-input"  v-model="formData.deliveryPlace"></li>
            <li><span>*</span>是否包含税费 <input @click="showIsExemptionTaxSelect"  type="text" readonly  class="select-input"  v-model="isExemptionTaxInfo.isExemptionTaxText"></li>
            <li><span>*</span>是否包含运费 <input @click="showIsExemptionPostageSelect" type="text" readonly  class="select-input"  v-model="isExemptionPostageInfo.isExemptionPostageText"></li>
            <li><span>*</span>联系人 <input v-model="formData.contacts" type="text" placeholder="请输入"></li>
            <li><span>*</span>联系方式 <input v-model="formData.contactsMobile" type="number" placeholder="请输入"></li>
            <li><span>*</span>采购量 <input v-model="formData.buyNum" type="text" placeholder="请输入"></li>
            <li><span class="none">*</span>预期价格 <p><span>元</span><input type="number" v-model="formData.prePrice" placeholder="请输入预期价格"></p></li>
        </ul>
        <div class="searchtime">
            <div class="selectime">
                <p class="pdeadline">报价截止时间</p>
                <p class="ptip">未设置报价截止时间，则需要手动结束求购需求</p>
                <span class="text" @click="choseEndTime">{{ formData.endTime }}</span>
                <span class="jt"></span>
            </div>
            <div class="payway"><span>*</span>付款方式 <input @click="showTradingTypeSelect"  type="text" readonly  class="select-input"  v-model="tradingTypeInfo.tradingTypeText"></div>
            <div class="payway"><span class="none">*</span>交货期 <p>自下单后<input v-model="formData.deliveryDays" type='number'>天内交货至指定地点</p></div>
        </div>
        <ul class="proinforlist">
            <li>
              <span>*</span>品牌
              <p class="icon-select" @click="showBrandNameInfoSelect"></p>
              <input type="text" v-model="brandNameInfo.brandNameText" placeholder="可以直接输入品牌名称">
            </li>
            <li class="gray">
              <span>*</span>商品分类
              <p class="icon-select" @click="showCategory"></p>
              <input type="text" placeholder="" @click="showCategory" readonly v-model="productCategoryInfo.productCategoryText">
            </li>
            <li v-for="item in curQueryPropertyList" :class="{ checkmore: !item.isEdit  }">
              {{ item.propertyName }}
              <p class="icon-select" v-if="!item.isEdit" @click="showCheckMore(item)"></p>
              <input type="text" placeholder="" v-if="item.isEdit" v-model="item.text">
              <div class="checkbox-list" v-if="!item.isEdit">
                <a href="javascript:;" v-for="item1 in item.values" v-if="item1.checked">{{ item1.propertyValue }}</a>
              </div>
              <checkMore
                v-if="item.isShow"
                :checkItem="item.values"
                v-on:change="chengePropertyItem($event, item)"
              ></checkMore>
            </li>
        </ul>
        <div class="supplement">
            <p>补充</p>
          <div style="position: relative">
            <textarea name="remark" @keyup="checkCurlength" maxlength="225" v-model="formData.remark" id="remark" cols="30" rows="10" placeholder="请输入补充说明，越详细供应商报价越准确哦~~"></textarea>
            <span class="tips">{{ curlength }}/225</span>
          </div>

        </div>
        <div class="btnbox">
            <button @click="submitInfo">立即发布</button>
        </div>
      <SelectComponent
        v-if = "currencyTypeInfo.isShow"
        v-bind:selectObj="{ selectArr: currencyTypeInfo.selectArr, isShow: currencyTypeInfo.isShow, selectParFn: 'setType', closeSelect: 'closeCurrencyTypeEvent'}"
        v-on:setType = "setCurrencyTypeInfo"
        v-on:closeCurrencyTypeEvent = 'closeCurrencyTypeSelect'
      ></SelectComponent>
      <SelectComponent
        v-if = "isExemptionTaxInfo.isShow"
        v-bind:selectObj="{ selectArr: isExemptionTaxInfo.selectArr, isShow: isExemptionTaxInfo.isShow, selectParFn: 'setType', closeSelect: 'closeIsExemptionTaxInfoEvent'}"
        v-on:setType = "setIsExemptionTaxInfo"
        v-on:closeIsExemptionTaxInfoEvent = 'closeIsExemptionTaxSelect'
      ></SelectComponent>
      <SelectComponent
        v-if = "isExemptionPostageInfo.isShow"
        v-bind:selectObj="{ selectArr: isExemptionPostageInfo.selectArr, isShow: isExemptionPostageInfo.isShow, selectParFn: 'setType', closeSelect: 'closeIsExemptionPostageInfoEvent'}"
        v-on:setType = "setIsExemptionPostageInfo"
        v-on:closeIsExemptionPostageInfoEvent = 'closeIsExemptionPostageInfoSelect'
      ></SelectComponent>
      <SelectComponent
        v-if = "tradingTypeInfo.isShow"
        v-bind:selectObj="{ selectArr: tradingTypeInfo.selectArr, isShow: tradingTypeInfo.isShow, selectParFn: 'setType', closeSelect: 'closeTradingTypeInfoEvent'}"
        v-on:setType = "setTradingTypeInfo"
        v-on:closeTradingTypeInfoEvent = 'closeTradingTypeInfoSelect'
      ></SelectComponent>
      <SelectComponent
        v-if = "brandNameInfo.isShow"
        v-bind:selectObj="{ selectArr: brandNameInfo.selectArr, isShow: brandNameInfo.isShow, selectParFn: 'setType', closeSelect: 'closeBrandNameInfoEvent'}"
        v-on:setType = "setBrandNameInfo"
        v-on:closeBrandNameInfoEvent = 'closeBrandNameInfoSelect'
      ></SelectComponent>
      <datepicker
        v-model="showDate"
        :minDate="minDate"
        v-on:change="getEndTime"
      ></datepicker>
      <productCategory
        v-if="productCategoryInfo.isShow"
        :productCategoryInfo="productCategoryInfo"
        :id="productCategoryInfo.productCategory"
        :parentId="productCategoryInfo.productCategoryParentId"
        :categoryName="productCategoryInfo.productCategoryText"
        v-on:change="setProductCategoryInfo"
      ></productCategory>
        <commentFooter></commentFooter>
      <awesome-picker
        i-if="isLand"
        ref="picker4"
        :textTitle="picker4.textTitle"
        :data="picker4.data"
        :anchor="picker4.anchor"
        @confirm="handlePicker4Confirm">
      </awesome-picker>
      <awesome-picker
        i-if="!isLand"
        ref="picker5"
        :textTitle="picker5.textTitle"
        :data="picker5.data"
        :anchor="picker5.anchor"
        @confirm="handlePicker5Confirm">
      </awesome-picker>
    </div>
</template>
<script>
  import qs from 'qs'
  import areaData from '../../../area.js'
  import inland from '../../../inland.js'
  import hongkong from '../../../HongKong.js'
  import CommentFooter from '../../footer.vue'
  import Datepicker from '../../datepicker.vue'
  import SelectComponent from '@/components/SelectComponent.vue'
  import distpicker from '@/components/distpicker.vue'
  import productCategory from '@/components/productCategory.vue'
  import checkMore from '@/components/checkMoreComponent.vue'

export default {
    data () {
        return {
          msg: '我是首页',
          curlength: 0,
          isLand: true,
          showDate: false,
          minDate: new Date(),
          productCategoryList: [],
          curQueryPropertyList: [],
          QueryBrandList: [],
          daludata: [],
          xianggangdata: [],
          picker4: {
            anchor: [],
            textTitle: '内陆地区',
            data: inland
          },
          picker5: {
            anchor: [],
            textTitle: '香港',
            data: hongkong
          },
          formData: {
            title: '发布寻货',
            currencyType: '',
            deliveryPlace: '',
            isExemptionTax: '',
            isExemptionPostage: '',
            contacts: '',
            contactsMobile: '',
            buyNum: '',
            prePrice: '',
            endTime: '2018-05-02',
            tradingType: '',
            deliveryDays: Number,
            brandName: '',
            productCategory: '',
            remark: '',
            companiesFoundPropertyList: []
          },
          /*币种*/
          currencyTypeInfo: {
            isShow: false,
            currencyTypeText: '人民币',
            currencyType: 1,
            selectArr: [{
              id: 1,
              value: '人民币',
              select: true
            }, {
              id: 2,
              value: '美金交易',
              select: false
            }]
          },
          isExemptionTaxInfo: {
            isShow: false,
            isExemptionTaxText: '',
            isExemptionTax: '',
            selectArr: [{
              id: 0,
              value: '不包税',
              select: false
            }, {
              id: 1,
              value: '包税',
              select: false
            }]
          },
          isExemptionPostageInfo: {
            isShow: false,
            isExemptionPostageText: '',
            isExemptionPostage: '',
            selectArr: [{
              id: 0,
              value: '不包邮',
              select: false
            }, {
              id: 1,
              value: '包邮',
              select: false
            }]
          },
          tradingTypeInfo: {
            isShow: false,
            tradingTypeText: '',
            tradingType: '',
            selectArr: [{
              id: 1,
              value: '平台交易',
              select: false
            }, {
              id: 2,
              value: '非平台交易',
              select: false
            }]
          },
          brandNameInfo: {
            isShow: false,
            brandNameText: '',
            brandName: '',
            selectArr: []
          },
          productCategoryInfo: {
            isShow: false,
            productCategoryText: '',
            productCategory: undefined,
            productCategoryParentId: undefined,
            productTypeId: undefined
          }
        }
    },
    components: {
        commentFooter: CommentFooter,
        datepicker: Datepicker,
        SelectComponent: SelectComponent,
        distpicker: distpicker,
        productCategory: productCategory,
        checkMore: checkMore
    },
  methods: {
    showPicker4 () {
      if (this.isLand) {
        this.$refs.picker4.show()
      } else {
        this.$refs.picker5.show()
      }
    },
    handlePicker4Confirm (v) {
      console.log(v)
      this.picker4.anchor = v
      let value = v ? JSON.parse(JSON.stringify(v)) : null
      let address = ''
      if ((typeof value == 'object') && (value.length > 0)) {
        for (let i = 0; i<value.length;i++) {
          address += value[i].value
        }
      }
      this.formData.deliveryPlace = address
    },
    handlePicker5Confirm (v) {
      console.log(v)
      this.picker5.anchor = v
      let value = v ? JSON.parse(JSON.stringify(v)) : null
      let address = ''
      if ((typeof value == 'object') && (value.length > 0)) {
        for (let i = 0; i<value.length;i++) {
          address += value[i].value
        }
      }
      this.formData.deliveryPlace = address
    },
    checkCurlength: function () {
      this.curlength = this.formData.remark.length
    },
    choseEndTime: function () {
      this.showDate = true
    },
    getEndTime: function (newDate, newFormatDate) {
      console.log(newDate)
      console.log(newFormatDate)
      this.formData.endTime = newFormatDate
    },
    showCheckMore: function (item) {
      item.isShow = true
    },
    chengePropertyItem: function (newData, item) {
      for (let i = 0; i < newData.length; i++) {
        for (let j = 0; j < item.values.length; j++) {
          if (item.values[j].id == newData[i].id) {
            item.values[j].checked = newData[i].isChecked
          }
        }
      }
      item.isShow = false
      console.log(item)
    },
    getProductCategory: function () {
      let _this = this
      let url = '/wx/productCategory/subCategory'
      this.$axios.post(url, qs.stringify({
        id: 0
      })).then(function (res) {
        console.log(res)
        _this.productCategoryList = res.data.data
      }).catch(function (error) {
        this.$prompt(error.data.desc)
      })
    },
    getQueryPropertyName: function (id) {
      let _this = this
      let url = '/wx/productCategory/queryPropertyName'
      console.log(_this.formData.productCategory)
      this.$axios.post(url, qs.stringify({
        productTypeId: id
      })).then(function (res) {
        console.log(res)
        let newData = res.data.data
        let newDataLength = newData.length
        for (let i = 0; i < newDataLength; i++) {
          newData[i].checked = false
          newData[i].isShow = false
          if (0 < newData[i].values.length) {
            for (let j = 0; j < newData[i].values.length; j++) {
              newData[i].values[j].checked = false
            }
          }
          if (newData[i].isEdit == 1) {
            newData[i].text = ''
          }
        }
        _this.curQueryPropertyList = newData
      }).catch(function (error) {
        this.$prompt(error.data.desc)
      })
    },
    getQueryBrandList: function () {
      let _this = this
      let url = '/wx/brand/queryBrandList'
      console.log(_this.formData.productCategory)
      this.$axios.post(url, qs.stringify({
        productTypeId: _this.formData.productCategory
      })).then(function (res) {
        console.log(res)
        let QueryBrandList = res.data.data
        let length = res.data.data.length
        for (let i = 0; i < length; i++) {
          let obj = {}
          obj.id = QueryBrandList[i].id
          obj.value = QueryBrandList[i].chinaName
          obj.select = QueryBrandList[i].false
          _this.brandNameInfo.selectArr.push(obj)
        }
      }).catch(function (error) {
        this.$prompt(error.data.desc)
      })
    },
    showCategory: function () {
      this.productCategoryInfo.isShow = true
    },
    setProductCategoryInfo: function (obj) {
      this.productCategoryInfo.isShow = false
      this.productCategoryInfo.productCategoryText = obj.categoryName
      this.productCategoryInfo.productCategoryParentId = obj.parentId
      this.productCategoryInfo.productCategory = obj.id
      this.productCategoryInfo.productTypeId = obj.productTypeId
      this.getQueryPropertyName(obj.productTypeId)
    },
    /*选择交易币种相关的方法*/
    showCurrencyType: function () {
      this.currencyTypeInfo.isShow = true
    },
    setCurrencyTypeInfo: function (newCurrencyTypeInfo) {
      if (this.currencyTypeInfo.currencyType != newCurrencyTypeInfo.curSelect.id) {
        this.formData.deliveryPlace = ''
        this.picker4.anchor = []
      }
      this.currencyTypeInfo.selectArr = newCurrencyTypeInfo.selectArr
      this.currencyTypeInfo.currencyTypeText = newCurrencyTypeInfo.curSelect.value
      this.currencyTypeInfo.currencyType = newCurrencyTypeInfo.curSelect.id
      if (this.currencyTypeInfo.currencyType == 1) {
        this.isLand = true
      } else if (this.currencyTypeInfo.currencyType == 2) {
        this.isLand = false
      }
    },
    closeCurrencyTypeSelect: function () {
      this.currencyTypeInfo.isShow = false
    },
    /*选择是否包含税费相关的方法*/
    showIsExemptionTaxSelect: function () {
      this.isExemptionTaxInfo.isShow = true
    },
    setIsExemptionTaxInfo: function (newIsExemptionTax) {
      this.isExemptionTaxInfo.selectArr = newIsExemptionTax.selectArr
      this.isExemptionTaxInfo.isExemptionTaxText = newIsExemptionTax.curSelect.value
      this.isExemptionTaxInfo.isExemptionTax = newIsExemptionTax.curSelect.id
    },
    closeIsExemptionTaxSelect: function () {
      this.isExemptionTaxInfo.isShow = false
    },
    /*选择是否包邮相关的方法*/
    showIsExemptionPostageSelect: function () {
      this.isExemptionPostageInfo.isShow = true
    },
    setIsExemptionPostageInfo: function (newIsExemptionTax) {
      this.isExemptionPostageInfo.selectArr = newIsExemptionTax.selectArr
      this.isExemptionPostageInfo.isExemptionPostageText = newIsExemptionTax.curSelect.value
      this.isExemptionPostageInfo.isExemptionPostage = newIsExemptionTax.curSelect.id
    },
    closeIsExemptionPostageInfoSelect: function () {
      this.isExemptionPostageInfo.isShow = false
    },
    /*选择交易方式相关的方法*/
    showTradingTypeSelect: function () {
      this.tradingTypeInfo.isShow = true
    },
    setTradingTypeInfo: function (newIsExemptionTax) {
      this.tradingTypeInfo.selectArr = newIsExemptionTax.selectArr
      this.tradingTypeInfo.tradingTypeText = newIsExemptionTax.curSelect.value
      this.tradingTypeInfo.tradingType = newIsExemptionTax.curSelect.id
    },
    closeTradingTypeInfoSelect: function () {
      this.tradingTypeInfo.isShow = false
    },
    /*选择品牌相关的方法*/
    showBrandNameInfoSelect: function () {
      if (this.brandNameInfo.selectArr.length == 0){
        this.getQueryBrandList()
      }
      this.brandNameInfo.isShow = true
    },
    setBrandNameInfo: function (newIsExemptionTax) {
      this.brandNameInfo.selectArr = newIsExemptionTax.selectArr
      this.brandNameInfo.brandNameText = newIsExemptionTax.curSelect.value
      this.brandNameInfo.brandName = newIsExemptionTax.curSelect.id
    },
    closeBrandNameInfoSelect: function () {
      this.brandNameInfo.isShow = false
    },
    submitInfo: function () {
      let that = this
      if (this.currencyTypeInfo.currencyType == '') {
        this.$prompt('请选择交易币种')
        return false
      }
      if (this.formData.deliveryPlace == '') {
        this.$prompt('请选择交货地')
        return false
      }
      if (this.isExemptionTaxInfo.isExemptionTax == '') {
        this.$prompt('请选择是否包含税费')
        return false
      }
      if (this.isExemptionPostageInfo.isExemptionPostage == '') {
        this.$prompt('请选择是否包邮')
        return false
      }
      if (this.formData.contacts == '') {
        this.$prompt('请填写联系人')
        return false
      }
      if (this.formData.contactsMobile == '') {
        this.$prompt('请填写联系方式')
        return false
      }
      if (this.formData.buyNum == '') {
        this.$prompt('请填写采购量')
        return false
      }
      if (this.formData.buyNum == 0) {
        this.$prompt('采购量必须大于0')
        return false
      }
      if (this.tradingTypeInfo.tradingType == '') {
        this.$prompt('请选择交易方式')
        return false
      }
      if (this.brandNameInfo.brandNameText == '') {
        this.$prompt('请选择品牌')
        return false
      }
      if (this.productCategoryInfo.productCategory == '') {
        this.$prompt('请选择商品分类')
        return false
      }
      let companiesFoundPropertyList = []
      for (let i = 0; i < this.curQueryPropertyList.length; i++) {
        if (this.curQueryPropertyList[i].isEdit == 1) {
          if (this.curQueryPropertyList[i].text != '') {
            companiesFoundPropertyList.push({
              propertyName: this.curQueryPropertyList[i].propertyName,
              propertyValue: this.curQueryPropertyList[i].text
            })
          }
        } else {
          if (0 < this.curQueryPropertyList[i].values.length) {
            let propertyValue = []
            for (let k = 0; k < this.curQueryPropertyList[i].values.length; k++) {
              if (this.curQueryPropertyList[i].values[k].checked) {
                propertyValue.push(this.curQueryPropertyList[i].values[k].propertyValue)
              }
            }
            companiesFoundPropertyList.push({
              propertyName: this.curQueryPropertyList[i].propertyName,
              propertyValue: propertyValue.join(',')
            })
          }
        }
      }
      let formData = {
        title: '发布寻货',
        currencyType: this.currencyTypeInfo.currencyType,
        deliveryPlace: this.formData.deliveryPlace,
        isExemptionTax: this.isExemptionTaxInfo.isExemptionTax,
        isExemptionPostage: this.isExemptionPostageInfo.isExemptionPostage,
        contacts: this.formData.contacts,
        contactsMobile: this.formData.contactsMobile,
        buyNum: this.formData.buyNum,
        prePrice: this.formData.prePrice,
        endTime: this.formData.endTime,
        tradingType: this.tradingTypeInfo.tradingType,
        deliveryDays: this.formData.deliveryDays,
        brandName: this.brandNameInfo.brandNameText,
        productCategory: this.productCategoryInfo.productCategory,
        remark: this.formData.remark,
        companiesFoundPropertyList: companiesFoundPropertyList
      }
      console.log(formData)
      let url = '/wx/companyfound/addCompaniesFound'
      that.$axios.post(url, qs.parse(formData)).then(function (res) {
        console.log(res)
        that.$router.push({ path: '/mySeek/mysearch' })
      }).catch(function (error) {
        this.$prompt(error.data.desc)
      })
    }
  },
  created: function () {
    window.sessionStorage.setItem('aaa',JSON.stringify(areaData))
    this.getProductCategory()
    this.getQueryBrandList()

  }
}
</script>
<style lang="less" scoped>
.addsearch{
    .tips{
        padding: 18px 40px;
        line-height: 50px;
        font-size: 28px;
        color: #ff6169;
    }
    .proinforlist{
        background: #ffffff;
        li{
            height: 100px;
            line-height: 100px;
            border-bottom: 1px solid #E5E5E5;
            font-size: 32px;
            color: #666666;
            padding: 0 23px;
            box-sizing: border-box;
            overflow: hidden;
            span{
                display: inline-block;
                width: 25px;
                height: 100px;
                line-height: 100px;
                font-size: 28px;
                color: #f35050;
            }
            span.none{
                text-indent: -9999px;
            }
            select{
                appearance:none;
                -moz-appearance:none;
                -webkit-appearance:none;
                padding-right: 38px;
                height: 90px;
                float: right;
                border: none;
                margin-top: 5px;
                font-size: 32px;
                color: #333333;
                text-align: center;
                background-color: #ffffff;
                background-repeat: no-repeat;
                background-size: 18px 33px;
                background-position: right center;
                background-image: url('/static/images/arrowright.png');
                option{
                    text-align: center;
                }
            }
            p.icon-select{
              appearance:none;
              -moz-appearance:none;
              -webkit-appearance:none;
              padding-right: 38px;
              height: 90px;
              float: right;
              border: none;
              margin-top: 5px;
              font-size: 32px;
              color: #333333;
              text-align: center;
              background-repeat: no-repeat;
              background-size: 18px 33px;
              background-position: right center;
              background-image: url('/static/images/arrowright.png');
            }
            input{
                float:right;
                height: 90px;
                border:0px;
                margin-top: 5px;
                line-height: 90px;
                font-size: 32px;
                color: #333333;
                text-align: right;
            }
            &.checkmore{
              height: auto;
              .checkbox-list{
                background-color: #ffffff;
                &:after{
                  content: '';
                  width: 0;
                  height: 0;
                  display: block;
                  zoom: 1;
                  overflow: hidden;
                  clear: both;
                }
                a{
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
                  &:nth-of-type(3n){
                    margin-right: 0;
                  }
                }
              }
            }
            .select-input{
              width: 400px;
              box-sizing: border-box;
              background-color: #ffffff;
              background-repeat: no-repeat;
              background-size: 18px 33px;
              background-position: right center;
              background-image: url('/static/images/arrowright.png');
              padding-right: 25px;
            }
            p{
                float: right;
                span{
                    float:right;
                    margin-left: 30px;
                    font-size: 32px;
                    color: #666666;
                }
            }
        }

    }
    li.gray{
        background: #eeeeee;
        select{
            background-color: #eeeeee;
        }
      input{
        background: #eeeeee;
      }
    }
    .searchtime{
        margin: 20px 0;
        background: #ffffff;
        overflow: hidden;
        .selectime{
            padding: 19px 24px 15px;
            border-bottom: 1px solid #E5E5E5;
            position: relative;
            .pdeadline{
                font-size: 32px;
                height: 61px;
                line-height: 61px;
                color: #666666;
                padding-left: 23px;
                width: 350px;
            }
            .ptip{
                font-size: 28px;
                height: 58px;
                line-height: 58px;
                color: #999999;
                padding-left: 23px;
            }
            span.text{
                font-size: 32px;
                color: #333333;
                position: absolute;
                line-height: 57px;
                top: 23px;
                right: 62px;
            }
            span.jt{
                display: block;
                width: 18px;
                height: 33px;
                position: absolute;
                background-repeat: no-repeat;
                background-size: 18px 33px;
                background-image: url('/static/images/arrowright.png');
                position:absolute;
                top: 60px;
                right: 24px;
            }
        }
        .payway{
            padding: 0px 24px;
            border-bottom: 1px solid #E5E5E5;
            height: 100px;
            line-height: 100px;
            font-size: 32px;
            color: #666666;
            span{
                display: inline-block;
                width: 25px;
                height: 100px;
                line-height: 100px;
                font-size: 28px;
                color: #f35050;
            }
            span.none{
                text-indent: -9999px;
            }
            p {
              appearance:none;
              -moz-appearance:none;
              -webkit-appearance:none;
              padding-right: 38px;
              height: 90px;
              float: right;
              border: none;
              margin-top: 5px;
              font-size: 32px;
              color: #333333;
              text-align: center;
              background-color: #ffffff;
              background-repeat: no-repeat;
              background-size: 18px 33px;
              background-position: right center;
              background-image: url('/static/images/arrowright.png');
            }
            select{
                appearance:none;
                -moz-appearance:none;
                -webkit-appearance:none;
                padding-right: 38px;
                height: 90px;
                float: right;
                border: none;
                margin-top: 5px;
                font-size: 32px;
                color: #333333;
                text-align: center;
                background-color: #ffffff;
                background-repeat: no-repeat;
                background-size: 18px 33px;
                background-position: right center;
                background-image: url('/static/images/arrowright.png');
                option{
                    text-align: center;
                }
            }
          .select-input{
            padding-right: 38px;
            height: 90px;
            float: right;
            width: 400px;
            box-sizing: border-box;
            border: none;
            margin-top: 5px;
            font-size: 32px;
            color: #333333;
            text-align: right;
            background-color: #ffffff;
            background-repeat: no-repeat;
            background-size: 18px 33px;
            background-position: right center;
            background-image: url('/static/images/arrowright.png');
          }
            p{
                float: right;
                color: #333333;
                input{
                    width: 88px;
                    height: 58px;
                    font-size: 32px;
                    margin: 0 10px;
                    text-align: center;
                    border-radius: 5px;
                    border:1px solid #E6E6E6;
                }
            }
        }
    }
    .supplement{
        margin-top: 20px;
        padding: 20px 46px;
        background: #ffffff;
        p{
            font-size: 32px;
            color: #666666;
            line-height: 61px;
        }
        textarea{
            width: 100%;
            height: 360px;
            border: 0px;
            font-size: 28px;
            color: #333333;
            display: block;
        }
        .tips{
          position: absolute;
          right: 0;
          bottom: 10px;
          color: #666666;
          font-size: 20px;
          padding: 0;
        }
    }
    .btnbox{
        padding: 30px 24px 128px;
        button{
            width: 100%;
            height: 88px;
            background: #00C1DE;
            font-size: 34px;
            color: #ffffff;
            border: 0px;
            display: block;
            border-radius: 5px;
        }
    }
}
</style>

