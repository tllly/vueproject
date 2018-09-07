<template>
<div class="ordernews">
  <div v-for="(item,index) in datalist" :key="index" class="news-item">
    <div class="news-date">{{item.createTime}}</div>
    <router-link tag="div" class="news-content" :to="{path: item.type == 1?'/mySeek/mysearch':'/orderModule/orderList'}">
      <p class="news-detail">{{item.content}}</p>
      <template v-if="item.type == 2">
      <p class="news-tips" >本次寻货涉及担保交易，可能会额外产生费用。</p>
      </template>
    </router-link>
  </div>
</div>
</template>

<script>
export default{
  data(){
    return{
      msg:''
    }
  },
  props:{
    datalist:{
      type:Array,
      required:true
    }
  }
}
</script>

<style lang="less" scoped>
  @main-bg-color:rgb(248,248,248);
  @news-date-color:rgb(153,153,153);
  @news-content-color:rgb(51,51,51);
  @news-tips-color:rgb(102,102,102);
  @white-bg:#ffffff;
  @pfm:PingFang-SC-Medium;
  @pfb:PingFang-SC-Bold;
  .news-item{
    width: 750px;
    padding: 0 24px;
    box-sizing: border-box;
    background-color: @main-bg-color;
    .news-date{
      height: 86px;
      line-height: 86px;
      text-align: center;
      font-size: 24px;
      font-family: @pfm;
    }
    .news-content{
      padding: 25px 30px;
      box-sizing: border-box;
      background-color: @white-bg;
      p.news-detail{
        font-family: @pfm;
        font-size: 32px;
        text-align: left;
        color: @news-content-color;
        line-height: 51px;
      }
      p.news-tips{
        font-size: 28px;
        font-family: @pfm;
        color: @news-tips-color;
        text-align: left;
        line-height: 40px;
        margin-top: 15px;
      }
    }
  }
</style>
