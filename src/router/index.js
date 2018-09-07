import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from '@/components/home.vue'
/*订单模块的页面*/
import OrderList from '@/components/page/orderModule/orderList.vue'
import Paymodule from '@/components/page/orderModule/paymodule.vue'
/*消息模块页面*/
import News from '@/components/page/myNews/news.vue'
import NewsList from '@/components/page/myNews/newsList.vue'
/*求购模块的页面*/
import Mysearch from '@/components/page/mySeek/mysearch.vue'
import Seekdetail from '@/components/page/mySeek/seekdetailed.vue'
import Bidding from '@/components/page/mySeek/bidding.vue'
import Addsearch from '@/components/page/mySeek/addsearch.vue'
/*成为供应商模块的页面*/
import CompanyInfo from '@/components/page/registerMerchant/companyInfo.vue'
import BankAccountInfo from '@/components/page/registerMerchant/bankAccountInfo.vue'
/*用户模块的页面*/
import Usercenter from '@/components/page/userModule/userCenter.vue'
import Certification from '@/components/page/userModule/certification.vue'
import Bindphone from '@/components/page/userModule/bindphone.vue'
import a from '@/components/cityPicker.vue'





export default new Router({
    routes:[
        {path:'/',name:'Home',component:Home,meta: {
            title: '首页'
          }},
        {path:'/orderModule/orderList',name:'OrderList',component:OrderList,meta: {
            title: '订单'
          }},
        {path:'/orderModule/paymodule',name:'Paymodule',component:Paymodule,meta: {
            title: '支付'
          }},
        {path:'/myNews/news',name:'News',component:News,meta: {
            title: '消息'
          }},
        {path:'/myNews/newsList/:id',name:'NewsList',component:NewsList,meta: {
            title: '消息'
          }},
        {path:'/mySeek/mysearch',name:'Mysearch',component:Mysearch,meta: {
            title: '我的寻货'
          }},
        {path:'/mySeek/seekdetail/:id',name:'Seekdetail',component:Seekdetail,meta: {
            title: '寻货详情'
          }},
        {path:'/mySeek/bidding/:id',name:'Bidding',component:Bidding,meta: {
            title: '寻货'
          }},
        {path:'/mySeek/addsearch',name:'Addsearch',component:Addsearch,meta: {
            title: '发布寻货'
          }},
        {path:'/registerMerchant/companyInfo',name:'CompanyInfo',component:CompanyInfo,meta: {
            title: '公司详情'
          }},
        {path:'/registerMerchant/bankAccountInfo',name:'BankAccountInfo',component:BankAccountInfo,meta: {
            title: '账户信息'
          }},
        {path:'/userModule/usercenter',name:'Usercenter',component:Usercenter,meta: {
            title: '用户中心'
          }},
        {path:'/userModule/certification',name:'Certification',component:Certification,meta: {
            title: '实名认证'
          }},
        {path:'/a',name:'a',component:a},


    ]
    // ,
    // mode:"history"
})
