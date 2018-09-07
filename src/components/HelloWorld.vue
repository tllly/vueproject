<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Ecosystem</h2>
    <button @click="initdata">axios跨域获取数据</button>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted: function () {
    //this.initdata()
  },
  methods: {
    initdata: function () {
      var url = '/api/view/home/findHeadline'
      this.$axios.post(url,qs.stringify({
        'name':'晶日头条',
        'num':4
      })).then(function (response) {
        console.log(response)
      }).catch(function (error) {
        console.log(error)
      })
      // this.$axios({
      //   methods: 'get',
      //   baseURL: '/api'
      // })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  font-size: 30px;
}
ul {
  list-style-type: none;
  padding: 0;
  font-size: 30px;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
