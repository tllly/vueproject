<template>
<div class="home">
    <div class="homesearchbox">
        <span>求购</span>
        <p><input type="search" placeholder="请输入求购商品"></p>
    </div>
    <div class="honmebanner">
        <img src="/static/images/homebanner.png" alt="">
        <div class="bannernav">
          <router-link to="/mySeek/mysearch">
            <div class="item item1">
                <p>我的求购</p>
            </div>
          </router-link>
          <router-link to="/orderModule/orderList">
            <div class="item item2">
                <p>我的订单</p>
            </div>
          </router-link>
          <router-link to="/myNews/news">
            <div class="item item3">
                <p>我的消息</p>
            </div>
          </router-link>
          <router-link to="/registerMerchant/companyInfo">
            <div class="item item4">
                <p>成为供应商</p>
            </div>
          </router-link>
        </div>
    </div>
    <div class="homelistitle">Intelligent智能寻货searchgoods</div>
    <div class="homelist">
        <ul>
            <li>
                <div class="title"><span>求购</span>希捷企业级硬盘</div>
                <div class="num"><span>收到报价：20 个</span></div>
                <p><span>发布时间</span>2018.04.24</p>
                <p><span>付款方式</span>平台交易</p>
                <p><span>预期价格</span>¥2000/个</p>
                <p><span>运费要求</span>报价包含运费</p>
                <p><span>剩余时间</span><span class="red">10天 15时 30分</span></p>
                <div class="company"><span>大陆</span>深圳第五维度科技有限公司</div>
                <span class="deletebtn"></span>
            </li>
            <li class="hk">
                <div class="title"><span>求购</span>希捷企业级硬盘</div>
                <div class="num"><span>收到报价：20 个</span></div>
                <p><span>发布时间</span>2018.04.24</p>
                <p><span>付款方式</span>平台交易</p>
                <p><span>预期价格</span>¥2000/个</p>
                <p><span>运费要求</span>报价包含运费</p>
                <p><span>剩余时间</span><span class="red">10天 15时 30分</span></p>
                <div class="company"><span>大陆</span>深圳第五维度科技有限公司</div>
            </li>
        </ul>
    </div>
    <commentFooter></commentFooter>
</div>
</template>
<script>
import qs from 'qs'
import CommentFooter from './footer.vue'
export default {
    data(){
        return{
            msg:'我是首页'
        }
    },
    components:{
        commentFooter:CommentFooter
    },
    created:function(){
        console.log('你说你会在乎我');
        this.initdata();
    },
    methods:{
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
        }
    }
}
</script>
<style lang="less" scoped>
.home{background: #ffffff;}
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
.honmebanner{
    width: 100%;
    height: 377px;
    position: relative;
    img{
        height: 100%;
        width: 100%;
    }
    .bannernav{
        width: 702px;
        height: 205px;
        background: #ffffff;
        position: absolute;
        bottom: -102px;
        left: 50%;
        margin-left: -351px;
        border-radius: 10px;
        box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.1);
        .item{
            float: left;
            width: 25%;
            font-size: 24px;
            color: #666666;
            padding-top: 130px;
            height: 46px;
            line-height: 46px;
            text-align: center;
            background-repeat: no-repeat;
            background-position: center 40px;
            background-size: 102px 102px;
        }
        .item.item1{
            background-image: url('/static/images/homeqgnav.png');
        }
        .item.item2{
            background-image: url('/static/images/homeordernav.png');
        }
        .item.item3{
            background-image: url('/static/images/homemessagenav.png');
        }
        .item.item4{
            background-image: url('/static/images/homegysnav.png');
        }
    }
}
.homelistitle{
    margin-top: 102px;
    height: 125px;
    text-indent: -9999px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 508px 34px;
    background-image: url('/static/images/Intelligentsearchgoods.png');
}
.homelist{
    padding: 0 24px 139px;
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
}

</style>

