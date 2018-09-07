<template>
    <div class="footer">
        <ul>
            <router-link to="/" tag="li"><p class="item1 cur">首页</p></router-link>
            <router-link  to="/myNews/news" tag="li"><p class="item2">消息</p></router-link>
            <router-link  to="/mySeek/addsearch" tag="li"><span class="add">添加</span></router-link>
            <router-link  to="/orderModule/orderList" tag="li"><p class="item3">订单</p></router-link>
            <router-link  to="/userModule/usercenter" tag="li"><p class="item4">我的</p></router-link>
        </ul>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
.footer{
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 98px;
    background: #ffffff;
    ul{
        padding-top: 14px;
        li{
            float: left;
            font-size: 22px;
            width: 20%;
            text-align: center;
            p{
                padding-top: 53px;
                height: 30px;
                line-height: 30px;
                color: #999999;
                background-repeat: no-repeat;
                background-position: top center;
            }
            p.item1{
                background-size: 44px 44px;
                background-image: url('/static/images/footerhomeicon.png');
            }
            p.item2{
                background-size: 40px 45px;
                background-image: url('/static/images/footernewsicon.png');
            }
            p.item3{
                background-size: 38px 44px;
                background-image: url('/static/images/footerordericon.png');
            }
            p.item4{
                background-size: 38px 44px;
                background-image: url('/static/images/footermyicon.png');
            }
            .add{
                display: block;
                text-indent: -9999px;
                width: 70px;
                height: 70px;
                margin: 0 auto;
                background-repeat: no-repeat;
                background-position: top center;
                background-size: 100% 100%;
                background-image: url('/static/images/footerissueicon.png');
            }
        }
        li.router-link-exact-active{
            p{
                color: #00c1de;
            }
            .add{
                background-image: url('/static/images/footerissueiconl.png');
            }
            p.item1{
                background-image: url('/static/images/footerhomeiconl.png');
            }
            p.item2{
                background-image: url('/static/images/footernewsiconl.png');
            }
            p.item3{
                background-image: url('/static/images/footerordericonl.png');
            }
            p.item4{
                background-image: url('/static/images/footermyiconl.png');
            }
        }
    }
}
</style>

