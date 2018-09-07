<template>
  <div>
    <OrderNews v-bind:datalist="datalist"></OrderNews>
  </div>
</template>


<script>
  import OrderNews from '../../ordernews.vue';
  export default {
    components:{
      OrderNews: OrderNews
    },
    data () {
      return {
        datalist:[] 
      }
    },
    created(){
      var typeid = this.$route.params.id;
      this.$axios.post('/wx/wxuserNotices/queryUserNoticesList',{
        "currPage":1,
        "pageSize":10,
        "type":typeid
      }).then((res)=>{
        console.log(res);
        this.datalist = res.data.data.rows
      }).catch((res)=>{

      })
    }
  }
</script>
