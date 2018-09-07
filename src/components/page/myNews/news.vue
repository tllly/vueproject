<template>
    <div class="news">
        <div class="newslistbox">
            <router-link tag="div" v-for="(item,index) in datalist1" :key="index"  :to="{path:'/myNews/newsList/'+item.type}" class="newsitem">
                <div :class="['imgbox',item.type == 1 ? 'imgbox1' : 'imgbox2']"><span>{{item.type == 1 ? typeimun1 : typeimun2}}</span></div>
                <div class="newstitle">
                    <p class="title">{{item.type == 1 ? '报价消息' : '订单消息'}}<span>{{item.createTime}}</span></p>
                    <p class="jj">{{item.content}}</p>
                </div>
            </router-link>
          <!-- <router-link to="/myNews/newsList">
            <div class="newsitem">
                <div class="imgbox imgbox2"><span>2</span></div>
                <div class="newstitle">
                    <p class="title">订单消息<span>2018-07-15</span></p>
                    <p class="jj">您收到了“希捷官方旗舰店”的报价，赶快去报价，舰店”的报价，赶赶快去</p>
                </div>
            </div>
          </router-link> -->
        </div>
        <commentFooter></commentFooter>
    </div>
</template>
<script>
import CommentFooter from '../../footer.vue'
export default {
    data(){
        return{
           datalist1:[],  //报价消息
           datalist2:[]   //订单消息
        }
    },
    computed:{
        typeimun1(){
            var _num = 0;
            for(var i = 0;i<this.datalist2.length;i++){
                if(this.datalist2[i].type == 1)
                    _num = this.datalist2[i].type
            }
            return _num
        },
        typeimun2(){
            var _num = 0;
            for(var i = 0;i<this.datalist2.length;i++){
                if(this.datalist2[i].type == 2)
                    _num = this.datalist2[i].type
            }
            return _num
        }
    },
    created(){
        this.$axios.get('/wx/wxuserNotices/queryNoticesIndex').then((res)=>{
            this.datalist1 = res.data.data.userNoticesIndexVoList
            this.datalist2 = res.data.data.userNoticesSumVoList
        }).catch((err)=>{
            console.log(err)
        })
    },
    components:{
        commentFooter:CommentFooter
    },
}
</script>
<style lang="less" scoped>
.newslistbox{
    padding-left: 24px;
    background: #ffffff;
    .newsitem{
        height: 150px;
        padding-right: 24px;
        .imgbox{
            float: left;
            width: 90px;
            height: 90px;
            margin: 30px 0 0 0;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            position: relative;
            span{
                position: absolute;
                top: -18px;
                right: -18px;
                display: block;
                width: 36px;
                height: 36px;
                border-radius: 36px;
                background: #FF1111;
                text-align: center;
                line-height: 36px;
                font-size: 22px;
                color: #ffffff;
            }
        }
        .imgbox.imgbox1{
            background-image: url('/static/images/newsbj.png');
        }
        .imgbox.imgbox2{
            background-image: url('/static/images/newsdd.png');
        }
    }
    .newsitem+.newsitem{
        border-top: 1px solid #EEEEEE;
    }
    .newstitle{
        padding-left: 120px;
        .title{
            padding-top: 17px;
            height: 52px;
            line-height: 52px;
            font-size: 30px;
            color: #333333;
            span{
                float: right;
                color: #999999;
                font-size: 24px;
            }
        }
        .jj{
            height: 52px;
            line-height: 52px;
            font-size: 28px;
            color: #666666;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>


