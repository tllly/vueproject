<template>
  <div id="categoryTask" @click.prevent.self="closeTask()">
    <div id="categorySelect" >
      <ul id="categoryList">
        <li @click.prevent.self="choseThis(item)" v-for="item in data" :key="item.id" v-bind:class="{ unchose:item.select, chosed: !item.select }">{{ item.categoryName }}</li>
      </ul>
      <div class="select-btn">
        <a href="javascript:;" @click="changeCategorys()">确定</a>
      </div>
    </div>
  </div>

</template>

<style lang="less" scoped>
  @keyframes upShow {
    0%{ height: 0px; }
    100%{height: 409px}
  }
  #categoryTask{
    position: fixed;
    width: 750px;
    height: 100%;
    background-color: rgba(0,0,0,0.3);
    left: 0;
    top: 0;
    z-index: 99;
    #categorySelect{
      position: absolute;
      width: 750px;
      background-color: rgba(0,0,0,0.5);
      left: 0;
      bottom: 0;
      z-index: 99;
      animation: upShow 0.5s;
      ul#categoryList{
        border-bottom: 1px solid #e6e6e6;
        padding: 40px 34px;
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
        li{
          width: 200px;
          height: 70px;
          line-height: 70px;
          text-align: center;
          margin-right: 40px;
          margin-bottom: 40px;
          font-size: 28px;

          border-radius: 5px;
          float: left;
          cursor: pointer;
          &:nth-of-type(3n){
            margin-right: 0;
          }
          &:nth-of-type(4),
          &:nth-of-type(5),
          &:nth-of-type(6){
            margin-bottom: 0;
          }
          &.chosed{
            background-color: #f8f8f8;
            color:#484848;
          }
          &.unchose{
            color: #00c1de;
            background-color: #e5fcff;
          }
        }
      }
      .select-btn{
        padding: 30px 24px;
        background-color: #f8f8f8;
        a{
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
      }
    }
  }

</style>

<script>
  export default {
    props: {
      categorys: Array
    },
    data () {
      return {
        data:JSON.parse(JSON.stringify(this.categorys))
      }
    },
    methods: {
      changeCategorys: function ()  {
        this.$emit('changeCategorys',this.data)
        this.$emit('closeCategorys')
      },
      closeTask: function () {
        this.$emit('closeCategorys')

      },
      choseThis: function (item) {
        item.select = !item.select
      }
    },
    destroyed: function () {

    }
  }
</script>
