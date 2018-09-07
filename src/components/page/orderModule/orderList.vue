<template>
  <div id="orderList">
    <orderItem v-for="(item,index) in datalist" :key="index" v-bind:dataobj="item"></orderItem>
    <!-- <orderItem></orderItem> -->
    <CommentFooter></CommentFooter>
  </div>
</template>
<style lang="less" scoped>
  #orderList{
    padding-bottom: 100px;
  }
</style>
<script>
  import orderItem from '../../ordermodule.vue';
  import CommentFooter from '../../footer.vue';
  export default {
    components:{
      orderItem: orderItem,
      CommentFooter:CommentFooter
    },
    data () {
      return {
        datalist:[]
      }
    },
    created(){
      this.$axios.post('/wx/companiesFoundOrder/querUserOrderList',{
        "currPage":1,
      	"pageSize":10
      }).then((res)=>{
        this.datalist = res.data.data.rows
      }).catch((err)=>{
        console.log(err)
      })
    }
  }
</script>
