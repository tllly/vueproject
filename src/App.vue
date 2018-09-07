<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view  v-wechat-title="$route.meta.title"/>
    <!-- <commentFooter></commentFooter> -->
  </div>
</template>

<script>
  import CommentFooter from './components/footer.vue'
  export default {
    name: 'App',
    components:{
      commentFooter:CommentFooter
    }
  }
</script>

<style>
  #app {
    margin: 0 auto;
  }
</style>
