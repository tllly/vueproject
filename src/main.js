// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import AwesomePicker from 'vue-awesome-picker'
import Prompt from './components/prompt'
import VueWechatTitle from 'vue-wechat-title';  

Vue.prototype.$axios = axios

Vue.use(AwesomePicker)
Vue.use(Prompt)
Vue.use(VueWechatTitle)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
