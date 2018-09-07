<template>
<div class="mysearch wrapper" ref="wrapper">
    <div class="content">
    <div class="homesearchbox">
        <span>求购</span>
        <p><input @keypress="searchkeyf" v-model="searchkey" type="search" placeholder="请输入求购商品"></p>
    </div>
    <div class="tabtns">
        <span :class="{cur : sortflag == 0}" @click="filterbydefault">全部</span>
        <span :class="{cur : sortflag == 1}" @click="filterbytime">发布时间</span>
        <span :class="{cur : sortflag == 2}" @click="filterbynum">报价数</span>
        <span :class="{cur : sortflag == 3}" @click="filterbystate">已完成</span>
    </div>
    <div class="homelist">
        <ul>
            <router-link tag="li" :to="{path:'/mySeek/seekdetail/'+item.id}" v-for="(item,key) in datalist" :key="key" v-bind:class="[item.tradingType == 1 ? '' : 'hk', item.expire ? 'done' : '']">
                <div class="title"><span>求购</span>{{item.title}}</div>
                <router-link :to="{path:'/mySeek/bidding/'+item.id}">
                    <div class="num"><span>收到报价：{{item.quoteSum}} 个</span></div>
                </router-link>
                <p><span>发布时间</span>{{item.createTime}}</p>
                <p><span>付款方式</span>{{item.tradingType == 1?'平台支付':'线下支付'}}</p>
                <p><span>预期价格</span>{{item.prePrice}}</p>
                <p><span>运费要求</span>报价{{item.isExemptionPostage == 0 ? '不' : ''}}包含运费</p>
                <p><span>剩余时间</span><span class="red">10天 15时 30分</span></p>
                <div class="company"><span v-show="item.currencyType == 1">大陆</span><span v-show="item.currencyType == 2">美元</span>{{item.companyName}}</div>
                <span class="deletebtn" @click="deleteItem(key,item.id)" @click.stop></span>
            </router-link>
        </ul>
    </div>
    </div>
</div>
</template>
<script>
import qs from 'qs'
import BScroll from 'better-scroll'
import CommentFooter from '../../footer.vue'
export default {
    data(){
        return{
            datalist:[],//数据列表
            searchkey:'',//搜索关键字
            pagetatol:0,
            parameter:{
                "currPage":1,
                "pageSize":10,
                "collation":"",
                "sortWord": '',
                "status":'',
                "title":''
            },
            sortflag:0//排序标识
        }
    },
    components:{

    },
    created(){
        this.initdata()
    },
    methods:{
        //初始化获取数据列表
        initdata: function () {
            var url = '/wx/companyfound/queryMyBuyInfo'
            this.$axios.post(url,this.parameter).then((response) => {
                this.pagetatol = response.data.data.pageCount
                this.datalist = response.data.data.rows
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.wrapper, {click:true})
                            this.scroll.on('touchEnd', (pos) => {
                            // 下拉动作
                            if (pos.y > 50) {
                                //this.initdata()
                                console.log('下拉')
                            }
                            //上拉加载 总高度>下拉的高度+10 触发加载更多
                            if(this.scroll.maxScrollY>pos.y+10){
                                if(this.parameter.currPage < this.pagetatol){
                                    this.parameter.currPage++
                                    this.getpagedata()
                                }
                                this.scroll.refresh()
                            }
                        })
                    } else {
                        this.scroll.refresh()
                    }
                })
            }).catch((error) => {
                console.log(error)
            })
        },
        //获取分页更多数据
        getpagedata(){
            this.$axios.post('/wx/companyfound/queryMyBuyInfo',this.parameter).then((res)=>{
                this.datalist = this.datalist.concat(res.data.data.rows)
            }).catch((err)=>{
                console.log(err)
            })
        },
        //根据默认筛选
        filterbydefault: function(){
            this.sortflag = 0
            this.parameter = {
                "currPage":1,
                "pageSize":10,
                "collation":"",
                "sortWord": '',
                "status":'',
                "title":''
            }
            this.initdata()
        },
        //根据发布时间筛选
        filterbytime: function(){
            this.sortflag = 1
            this.parameter = {
                "currPage":1,
                "pageSize":10,
                "collation":"desc",
                "sortWord": 'createTime',
                "status":'',
                "title":''
            }
            // this.parameter.collation = 'desc'
            // this.parameter.sortWord = 'createTime'
            // this.parameter.status = ''
            this.initdata()
        },
        //根据报价数量筛选
        filterbynum: function(){
            this.sortflag = 2
            this.parameter = {
                "currPage":1,
                "pageSize":10,
                "collation":"desc",
                "sortWord": 'quoteSum',
                "status":'',
                "title":''
            }
            // this.parameter.collation = 'desc'
            // this.parameter.sortWord = 'quoteSum'
            // this.parameter.status = ''
            this.initdata()
        },
        //根据完成状态筛选
        filterbystate: function(){
            this.sortflag = 3
            this.parameter = {
                "currPage":1,
                "pageSize":10,
                "collation":"",
                "sortWord": '',
                "status":'1',
                "title":''
            }
            // this.parameter.collation = ''
            // this.parameter.sortWord = ''
            // this.parameter.status = '1'
            this.initdata()
        },
        //搜索筛选
        searchkeyf:function(event){
            if (event.keyCode == 13 && this.searchkey != '') {
                this.sortflag = null
                this.parameter = {
                    "currPage":1,
                    "pageSize":10,
                    "collation":"",
                    "sortWord": '',
                    "status":'',
                    "title":this.searchkey
                }
                this.initdata()
            }
        },
        //删除某项
        deleteItem:function(index,id){
            this.$axios.get('/wx/companyfound/closeFound?id='+id)
            .then((res)=>{
                console.log(res)
                if(res.data.data){
                    this.datalist.splice(index,1)
                }
            })
            .catch((err)=>{

            })
        }
    }
}
</script>
<style lang="less" scoped>
.mysearch{
    position: fixed;
    width: 100%;
    height: 100%;
}
.homesearchbox{
    padding: 0 24px;
    height: 80px;
    padding-top: 10px;
    background: #ffffff;
    span{
        float: left;
        height: 58px;
        line-height: 58px;
        font-size: 28px;
        color: #000000;
        margin: 0 29px 0 9px;
    }
    p{
        float: left;
        height: 58px;
        border-radius: 58px;
        width: 500px;
        background-color: #F4F4F4;
        font-size: 28px;
        color: #000000;
        padding-left: 70px;
        background-image: url('/static/images/search-icon.png');
        background-repeat: no-repeat;
        background-position: 24px center;
        background-size: 26px 26px;
        input{
            float: left;
            width: 500px;
            height: 58px;
            border: 0px;
            background: none;
            font-size: 26px;
        }
    }
}
.tabtns{
    height: 88px;

    margin: 2px 0 24px;
    background: #ffffff;
    font-size: 28px;
    text-align: center;
    color: #333333;
    span{
        float: left;
        width: 25%;
        line-height: 86px;
        border-bottom: 3px solid #ffffff;
    }
    span.cur{
        border-bottom: 3px solid #00C1DE;
        color: #00C1DE;
    }
}
.homelist{
    padding: 0 24px 20px;
    li{
        border: 1px solid #EEEEEE;
        background: #ffffff;
        border-radius: 16px;
        margin-bottom: 24px;
        box-shadow: 0px 8px 24px 0px rgba(0, 8px, 24px, 0.08);
        padding-bottom: 30px;
        position: relative;
        .title{
            height: 87px;
            line-height: 87px;
            font-size: 32px;
            color: #333333;
            span{
                color: #00c1de;
                margin: 0 20px 0 10px;
            }
        }
        .num{
            height: 66px;
            line-height: 66px;
            text-align: center;
            width: 580px;
            border: 1px solid #00C1DE;
            background: #EBFCFF;
            margin: 0 auto 25px;
            border-radius: 66px;
            font-size: 32px;
            color: #00c1de;
            span{
                padding-left: 44px;
                background-repeat: no-repeat;
                background-position: left center;
                background-size: 32px 32px;
                background-image: url('/static/images/targetgreen.png');
            }
        }
        p{
            height: 58px;
            line-height: 58px;
            font-size: 30px;
            color: #333333;
            padding-left: 109px;
            span{
                color: #666666;
                margin-right: 70px;
            }
            .red{
                color: #ff6169;
                margin: 0px;
            }
        }
        .company{
            height: 48px;
            line-height: 48px;
            margin-top: 25px;
            font-size: 26px;
            color: #999999;
            padding-left: 130px;
            position: relative;
            span{
                position: absolute;
                display: block;
                color: #ffffff;
                left: -1px;
                top: 0px;
                width: 86px;
                height: 48px;
                line-height: 48px;
                padding-left: 20px;
                background-repeat: no-repeat;
                background-position: left center;
                background-size: 100% 100%;
                background-image: url('/static/images/dlflag.png');
            }
        }
        .deletebtn{
            position: absolute;
            top: 23px;
            right: 23px;
            display: block;
            width: 44px;
            height: 44px;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-image: url('/static/images/homedeleteicon.png');
            &:active{
                background-image: url('/static/images/homedeleteiconl.png');
            }
        }
    }
    li.hk{
        .title{
            span{
                color: #fecd0f;
            }
        }
        .num{
            border: 1px solid #fecd0f;
            background: #FFFCF0;
            color: #fecd0f;
            span{
                background-image: url('/static/images/targetyellow.png');
            }
        }
        .company{
            span{
                background-image: url('/static/images/hkflag.png');
            }
        }
    }
    li.done{
        .title{
            color: #999999;
            span{
                color: #999999;
            }
        }
        .num{
            border: 1px solid #CCCCCC;
            background: #EEEEEE;
            color: #999999;
            span{
                background-image: url('/static/images/targetgray.png');
            }
        }
        .company{
            span{
                background-image: url('/static/images/doneflag.png');
            }
        }
        p{
            color: #999999;
            span{
                color: #999999;
            }
            .red{
                color: #999999;
            }
        }
    }
}

</style>

