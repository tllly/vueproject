<template>
    <div class="check-list">
      <ul class="check-ul">
        <li :class="{ checked: item.isChecked }" class="check-list-item" @click="check(item)" :key="item.id" v-for="item in dataList">{{ item.value }}</li>
      </ul>
      <div class="btn-box">
        <input type="button" value="确定" @click="submitItem">
      </div>
    </div>
</template>

<style lang="less" scoped>
  .check-list{
    position: fixed;
    width: 750px;
    height: 100%;
    left: 0;
    z-index: 9999;
    top: 0;
    background-color: #ffffff;
    .check-ul{
      height: 100%;
      padding-bottom: 100px;
      box-sizing: border-box;
      overflow-y: auto;
      .check-list-item{
        font-size: 32px;
        color: rgb(51,51,51);
        font-family: 'PingFang-SC-Medium';
        height: 100px;
        border-bottom: 1px solid rgb(230,230,230);
        box-sizing: border-box;
        width: 750px;
        padding: 0 23px 0 24px;
        line-height: 100px;
        text-align: left;
        background-repeat: no-repeat;
        background-position: 677px center;
        &.checked{
          background-image: url("/static/images/checked9@3x.png");
          background-size: 36px 24px;
        }
      }
    }
    .btn-box{
      height: 150px;
      width: 750px;
      position: absolute;
      bottom: 0;
      padding: 30px;
      box-sizing: border-box;
      input[type='button']{
        width: 702px;
        height: 90px;
        line-height: 90px;
        text-align: center;
        font-size: 34px;
        color: rgb(255,255,255);
        margin: 0 auto;
        border-radius: 6px;
        outline-style: none;
        border: 0;
        background-color: rgb(0,193,222);
      }
    }
  }
</style>

<script>
  export default {
    props: {
      checkItem: Array
    },
    data () {
      return {
        dataList: []
      }
    },
    methods: {
      check: function (item) {
        item.isChecked = !item.isChecked
      },
      submitItem: function () {
        this.$emit('change', this.dataList)
      }
    },
    created: function () {
      for (let i = 0; i < this.checkItem.length; i++){
        let obj = {}
        obj.id = this.checkItem[i].id
        obj.value = this.checkItem[i].propertyValue
        obj.isChecked = this.checkItem[i].checked
        this.dataList.push(obj)
      }
    }
  }

</script>
