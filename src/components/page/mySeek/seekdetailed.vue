<template>
    <div class="seekdetailed">
        <div class="companynamebox">
            <div class="imgbox"><img :src="datainfor.shopLogo?datainfor.shopLogo:'/static/images/defaultlogo1.png'" alt="十次方"></div>
            <div class="infor">
                <h3>{{datainfor.companyName}}</h3>
                <p>累计求购<span>{{datainfor.wantBuyNum}}单</span></p>
                <p>成交次数<span>{{datainfor.dealNum}}次</span></p>
            </div>
        </div>
        <div class="informationbox">
            <h3>求购 {{datainfor.title}}</h3>
            <p><span class="span1">询价单ID</span><span class="span2">{{datainfor.title}}</span></p>
            <p><span class="span1">报价截止时间</span><span class="span2">{{datainfor.expireTime}}</span></p>
            <p><span class="span1">付款方式</span><span class="span2">{{datainfor.tradingType == 1?'平台交易':'非平台交易'}}</span></p>
            <p><span class="span1">交易币种</span><span class="span2">{{datainfor.currencyType==1?'人民币':'美元'}}</span></p>
            <p><span class="span1">交货地</span><span class="span2">{{datainfor.deliveryPlace}}</span></p>
            <p><span class="span1">是否包含运费</span><span class="span2 spanm">{{datainfor.isExemptionPostage==0?'否':'是'}}</span></p>
            <p><span class="span1">是否包含税费</span><span class="span2 spanm">{{datainfor.isExemptionTax==0?'否':'是'}}</span></p>
            <p><span class="span1">交货期</span><span class="span2">自下单后{{datainfor.deliveryDays}}天内交货至指定地点</span></p>
            <template v-if="datainfor.contacts == '' || datainfor.contacts == null">
                <p><span class="span1">联系人</span><span class="span2 spand">报价后可见</span></p>
            </template>
            <template v-else>
                <p><span class="span1">联系人</span><span class="span2">{{datainfor.contacts}}</span></p>
            </template>

            <template v-if="datainfor.contactsMobile == '' || datainfor.contactsMobile == null">
                <p><span class="span1">联系电话</span><span class="span2 spand">报价后可见</span></p>
            </template>
            <template v-else>
                <p><span class="span1">联系电话</span><span class="span2">{{datainfor.contactsMobile}}</span></p>
            </template>
            
        </div>
        <div class="instructions">
            <h3>补充说明</h3>
            <p>{{datainfor.remark}}</p>
        </div>
        <div class="informationbox">
            <div class="title">商品基础信息</div>
            <p v-for="(item,key) in datainfor.companiesFoundPropertyList" :key="key"><span class="span1">{{item.propertyName}}</span><span class="span2">{{item.propertyValue}}</span></p>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            datainfor:{} //详细信息
        }
    },
    created(){
        let id = this.$route.params.id
        this.$axios.get('/wx/companyfound/queryMyNeedBuyDetail?id='+id).then((res)=>{
            this.datainfor = res.data.data
        }).catch((err=>{
            console.log(res)
        }))
    }
}
</script>
<style lang="less" scoped>
.seekdetailed{
    padding: 0 24px;
    .companynamebox{
        margin: 20px 0;
        background: #ffffff;
        overflow: hidden;
        .imgbox{
            float: left;
            width: 200px;
            height: 200px;
            margin: 24px 0 24px 24px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .infor{
            float: left;
            padding: 24px 0 0 22px;
            width: 420px;
            h3{
                height: 45px;
                line-height: 45px;
                padding-bottom: 14px;
                font-size:32px;
                color: #333333;
                overflow: hidden;
            }
            p{
                font-size:28px;
                color: #666666;
                line-height: 47px;
                span{
                    margin-left: 80px;
                    color: #00c1de;
                }
            }
        }
    }
    .informationbox{
        margin: 20px 0;
        background: #ffffff;
        padding: 5px 0 25px 24px;
        h3{
            font-size: 32px;
            line-height: 81px;
            color: #00c1de;
        }
        .title{
            padding-top: 8px;
            line-height: 77px;
            font-size: 28px;
            color: #333333;
            font-weight: bold;
        }
        p{
            font-size: 30px;
            height: 58px;
            line-height: 58px;
            color: #333333;
            .span1{
                color: #999999;
                float: left;
                width: 230px;
            }
            .span2{
                float: left;
            }
            .spanm{
                color: #666666;
            }
            .spand{
                color: #999999;
                background-repeat: no-repeat;
                background-position: left center;
                padding-left: 43px;
                background-size: 22px 28px;
                background-image: url('/static/images/lockicon.png');
            }
        }
    }
    .instructions{
        margin: 20px 0;
        padding: 7px 24px 30px;
        background: #ffffff;
        h3{
            font-size: 28px;
            color: #333333;
            line-height: 80px;
            font-weight: bold;
        }
        p{
            font-size: 32px;
            color: #333333;
            line-height: 56px;
        }
    }
}
</style>


