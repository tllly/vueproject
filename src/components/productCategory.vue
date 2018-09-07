<template>
  <div class="product-category">
    <ul class="product-first-category">
      <li class="first-category-item"  v-for="item in productCategoryList">
        <p :class="{ subcategory: item.childList }" v-if="item.childList" @click="getSubCategory(item)">{{ item.categoryName }}</p>
        <p :class="{ subcategory: item.childList, checked: item.checked }" v-else-if="!item.childList" @click="checkPar(item)">{{ item.categoryName }}</p>
        <ul class="product-second-category" v-if="item.childList" v-show="item.isShow">
          <li class="second-category-item" @click="checkPar(item1,item.id)" :class="{ checked: item1.checked }" v-for="item1 in item.childList">{{ item1.categoryName }}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
  .product-category{
    padding-top: 20px;
    height: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #ffffff;
    z-index: 9999;
    font-family: 'PingFang-SC-Medium';
    .product-first-category{
      .first-category-item{
        padding: 0;
        >p{
          width: 750px;
          padding: 0 23px 0 24px;
          box-sizing: border-box;
          height: 100px;
          background-color: #ffffff;
          line-height: 100px;
          text-align: left;
          font-size: 32px;
          color: rgb(51,51,51);
          background-repeat: no-repeat;
          border-bottom: 1px solid rgb(230,230,230);
          &.subcategory{
            background-image: url("/static/images/arrow5@3x.png");
            background-position: 700px center;
          }
          &.checked{
            background-image: url("/static/images/checked9@3x.png");
            background-position: 677px center;
            background-size: 36px 24px;
          }
        }
        .product-second-category{
          .second-category-item{
            height: 96px;
            border-bottom: 1px solid rgb(230,230,230);
            box-sizing: border-box;
            padding: 0 23px 0 24px;
            font-size: 28px;
            text-align: left;
            line-height: 96px;
            background-color: rgb(248,248,248);
            background-position: 690px center;
            background-repeat: no-repeat;
            border-bottom: 1px solid rgb(230,230,230);
            &.checked{
              background-image: url("/static/images/checked9@3x.png");
              background-position: 677px center;
              background-size: 36px 24px;
            }
          }
        }
      }
    }
  }
</style>

<script>
  import qs from 'qs'
  export default {
    props: {
      id: {
        type: Number,
        default: 0
      },
      categoryName: {
        type: String,
        default: ''
      },
      parentId: {
        type: Number,
        default: 0
      },
      productTypeId: {
        type: Number,
        default: undefined
      }
    },
    data () {
      return {
        productCategoryList: [],
        curCategory: {
          parentId: this.parentId,
          id: this.id,
          categoryName: this.categoryName,
          productTypeId: this.productTypeId
        }
      }
    },
    methods: {
      getProductCategory: function () {
        let _this = this
        let url = '/wx/productCategory/findAllProductCategory'
        this.$axios.post(url, qs.stringify({
          id: 0
        })).then(function (res) {
          let newData = res.data.data
          let newDataLength = newData.length
          console.log(_this.curCategory)
          for (let i = 0; i < newDataLength; i++) {
              if ((newData[i].childList != null) && (newData[i].childList.length) && (newData[i].childList.length > 0)) {
                if(newData[i].id == _this.curCategory.parentId) {
                  newData[i].isShow = true
                  for (let j = 0; j < newData[i].childList.length; j++) {
                    if(newData[i].childList[j].id == _this.curCategory.id) {
                      newData[i].childList[j].checked = true
                    } else {
                      newData[i].childList[j].checked = false
                    }
                  }
                } else {
                  newData[i].isShow = false
                  for (let j = 0; j < newData[i].childList.length; j++) {
                    newData[i].childList[j].checked = false
                  }
                }

              }else{
                if (newData[i].id == _this.curCategory.id) {
                  newData[i].checked = true
                } else {
                  newData[i].checked = false
                }

              }
          }
          _this.productCategoryList = newData
          console.log(newData)
        }).catch(function (error) {
          console.log(error)
        })
      },
      getSubCategory: function (item) {
        item.isShow = !item.isShow
      },
      checkPar: function (item,parId) {
        let _this = this
        let parentId = parId || 0
        let newData = this.productCategoryList
        let newDataLength = newData.length
        for (let i = 0; i < newDataLength; i++) {
          if ((newData[i].childList != null) && (newData[i].childList.length) && (newData[i].childList.length > 0)) {
            for (let j =0; j < newData[i].childList.length; j++) {
              newData[i].childList[j].checked = false
            }
          }else{
            newData[i].checked = false
          }
        }
        item.checked = true
        _this.curCategory.parentId = parId
        _this.curCategory.id = item.id
        _this.curCategory.productTypeId = item.productTypeId
        _this.curCategory.categoryName = item.categoryName
        _this.$emit('change', _this.curCategory)
      }
    },
    created: function () {
      this.getProductCategory()
    }
  }
</script>
