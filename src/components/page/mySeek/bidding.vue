<template>
   <div class="bidding">
       <div class="bidnumbox">
           <div class="biditem biditem1">
               <p class="p1">收到的报价</p>
               <p class="p2">{{bidallnum}}</p>
           </div>
           <div class="biditem biditem2">
               <p class="p1">已中标</p>
               <p class="p2">{{bidinnum}}</p>
           </div>
       </div>
        <div class="bidlists">
            <div class="companyitem" v-for="(item,key) in datalist" :key="key">
                <div class="imgbox"><img :src="item.shopLogo" alt=""></div>
                <div class="namebox">
                    <p class="name">{{item.shopName}}</p>
                    <p class="mark"><span class="rz">金牌认证</span><span class="zh">营业执照</span></p>
                    <p class="times">中标数：<span>{{item.wonNum}}</span>次 &nbsp;&nbsp;&nbsp;&nbsp; 总报价：<span>{{item.quoteNum}}</span>次</p>
                </div>
                <div class="moneybox" @click="cheackbidinfor(item.id)">
                    <p>报价金额：<span>¥{{item.totalMoney}}</span>元</p>
                    <p>承接数量：<span>{{item.productNum}}</span></p>
                    <span class="jt"></span>
                </div>
                <div class="btnbox"><button :class="{down:item.wonNum == 0}">中标</button></div>
            </div>
        </div>
        <div class="bidinforpop" v-show="popboxflag">
            <div class="bidinform">
                <h3>报价详情</h3>
                <ul>
                    <li>
                        <div class="itemt">商品单价</div>
                        <div class="itemc">¥{{bidinforobj.price}}</div>
                    </li>
                    <li>
                        <div class="itemt">是否包含运费</div>
                        <div class="itemc">{{bidinforobj.postage == 0 ? '是' :'否'}}</div>
                    </li>
                    <li>
                        <div class="itemt">运费</div>
                        <div class="itemc">¥{{bidinforobj.postage}}</div>
                    </li>
                    <li>
                        <div class="itemt">是否包含税费</div>
                        <div class="itemc">{{bidinforobj.taxCost == 0 ? '是' :'否'}}</div>
                    </li>
                    <li>
                        <div class="itemt">税费</div>
                        <div class="itemc">¥{{bidinforobj.taxCost}}</div>
                    </li>
                    <li>
                        <div class="itemt">库存数量</div>
                        <div class="itemc">{{bidinforobj.productNum}}</div>
                    </li>
                    <li class="red">
                        <div class="itemt">总价</div>
                        <div class="itemc">¥{{bidinforobj.totalMoney}}</div>
                    </li>
                    <li class="pt">
                        <div class="itemt">联系人：</div>
                        <template v-if="bidinforobj.contacts == '' || bidinforobj.contacts == null">
                            <div class="itemc"><span>中标后可见</span></div>
                        </template>
                        <template v-else>
                            <div class="itemc">{{bidinforobj.contacts}}</div>
                        </template>
                    </li>
                    <li class="pb">
                        <div class="itemt">联系方式：</div>
                        <template v-if="bidinforobj.contactsMobile == '' || bidinforobj.contactsMobile == null">
                            <div class="itemc"><span>中标后可见</span></div>
                        </template>
                        <template v-else>
                            <div class="itemc">{{bidinforobj.contactsMobile}}</div>
                        </template>
                    </li>
                </ul>
                <span class="spandown" @click="shutdowninfor"></span>
            </div>
        </div>
   </div>
</template>
<script>
import qs from 'qs'
export default {
    data(){
        return{
            bidallnum:0,
            bidinnum:0,
            datalist:[], //数据列表
            popboxflag:false, //查看报价弹窗控制变量
            bidinforobj:{}   //报价详情对象
        }
    },
    created(){
        let id = this.$route.params.id
        this.$axios.post('/wx/merchantQuote/queryQuoteInfo',{
            "currPage":1,
            "pageSize":10,
            "companiesFoundId":id 
        }).then((res)=>{
            this.datalist = res.data.data.pageVo.rows
            this.bidallnum = res.data.data.receiveQuoteSum
            this.bidinnum = res.data.data.winSum
        }).catch((err)=>{
            console.log(err)
        })
    },
    methods:{
        //关闭查看报价弹窗
        shutdowninfor:function(){
            this.popboxflag = false;
        },
        //查看报价弹窗
        cheackbidinfor:function(id){
            this.$axios.post('/wx/merchantQuote/queryQuoteDetail',qs.stringify({
                "id":id
            })).then((res)=>{
                this.bidinforobj = res.data.data;
                this.popboxflag = true;
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
}
</script>
<style lang='less' scoped>
.bidding{
    .bidnumbox{
        padding: 30px 24px;
        overflow: hidden;
        .biditem{
            float: left;
            width: 47.8%;
            height: 160px;
            text-align: center;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            p{
                color: #ffffff;
            }
            p.p1{
                padding-top: 26px;
                font-size: 28px;
                line-height: 52px;
            }
            p.p2{
                font-size: 40px;
                line-height: 57px;
            }
        }
        .biditem.biditem1{
            background-image: url('/static/images/bidding1.png');
        }
        .biditem.biditem2{
            margin-left: 4.2%;
            background-image: url('/static/images/bidding2.png');
        }
    }
    .bidlists{
        .companyitem{
            padding: 0 24px;
            background: #ffffff;
            margin-bottom: 24px;
            .imgbox{
                float: left;
                width: 200px;
                height: 200px;
                margin-top: 30px;
                padding-bottom: 30px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .namebox{
                float: left;
                margin: 30px 0 0 30px;
                width: 440px;
                .name{
                    height: 71px;
                    line-height: 71px;
                    overflow: hidden;
                    font-size: 32px;
                    color: #333333;
                }
                .mark{
                    height: 65px;
                    line-height: 65px;
                    font-size: 24px;
                    color: #e6ac5c;
                    span{
                        padding-left: 38px;
                        background-position: left center;
                        background-repeat: no-repeat;
                    }
                    .rz{
                       background-image: url('/static/images/jpry.png');
                       background-size: 22px 26px;
                    }
                    .zh{
                        background-image: url('/static/images/yyzz.png');
                        background-size: 22px 25px;
                        margin-left: 40px;
                    }
                }
                .times{
                    height: 46px;
                    line-height: 46px;
                    font-size: 28px;
                    color: #666666;
                }
            }
            .moneybox{
                clear: both;
                padding: 20px 30px;
                position: relative;
                box-shadow: 0px 3px 20px 0px rgba(0, 0, 0, 0.08);
                p{
                    height: 52px;
                    line-height: 52px;
                    font-size: 30px;
                    color: #333333;
                    span{
                        color: #ff6169;
                    }
                }
                .jt{
                    display: block;
                    width: 18px;
                    height: 33px;
                    position: absolute;
                    top: 55px;
                    right: 30px;
                    background-repeat: no-repeat;
                    background-image: url('/static/images/arrowright.png');
                    background-size: 100% 100%;
                }
            }
            .btnbox{
                padding: 30px 0;
                button{
                    display: block;
                    width: 100%;
                    border: 0px;
                    height: 80px;
                    border-radius: 80px;
                    line-height: 80px;
                    font-size: 34px;
                    color: #ffffff;
                    background: #00C1DE;
                }
                button.down{
                    color: #999999;
                    background: #eeeeee;
                }
            }
        }
    }
}
.bidinforpop{
    position: fixed;
    background: rgba(0, 0, 0, 0.8);
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    .bidinform{
        width: 590px;
        background: #ffffff;
        border-radius: 10px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        h3{
            height: 100px;
            line-height: 100px;
            text-align: center;
            font-size: 34px;
            color: #00c1de;
            font-weight: bold;
            padding-top: 16px;
        }
        ul{
            li{
                height: 58px;
                line-height: 58px;
                font-size: 30px;
                color: #333333;
                .itemt{
                    float: left;
                    padding-left: 80px;
                }
                .itemc{
                    padding-left: 310px;
                    span{
                        font-size: 28px;
                        color: #999999;
                        padding-left: 43px;
                        background-position: left center;
                        background-repeat: no-repeat;
                        background-image: url('/static/images/lockicon.png');
                        background-size: 22px 28px;
                    }
                }
            }
            li.red{
                padding-bottom: 35px;
                color: #ff6169;
                font-size: 30px;
                font-weight: bold;
            }
            li.pt{
                padding-top: 16px;
                background: #F8F8F8;
            }
            li.pb{
                padding-bottom: 16px;
                background: #F8F8F8;
                border-bottom-left-radius: 10px;
                border-bottom-right-radius: 10px;
            }
        }
        .spandown{
            display: block;
            position: absolute;
            top: -74px;
            right: 0px;
            width: 44px;
            height: 44px;
            background-repeat: no-repeat;
            background-image: url('/static/images/shutdown.png');
            background-size: 100% 100%;
        }
    }
}
</style>

