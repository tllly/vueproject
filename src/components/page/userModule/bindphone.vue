<template>
   <div class="bindphone">
       <div class="bindphonembox">
           <ul>
               <li>
                   <input type="number" placeholder="请输入手机号">
                   <button v-show="show" @click="getCode">获取验证码</button>
                   <button v-show="!show">{{count}}S</button>
                </li>
               <li><input type="text" placeholder="请输入短信验证码"></li>
               <li><input type="button" value="立即绑定"></li>
           </ul>
       </div>
   </div>
</template>
<script>
export default {
data(){
  return {
   show: true,
   count: '',
   timer: null,
  }
 },
 methods:{
   getCode(){
     const TIME_COUNT = 60;
     if (!this.timer) {
       this.count = TIME_COUNT;
       this.show = false;
       this.timer = setInterval(() => {
       if (this.count > 0 && this.count <= TIME_COUNT) {
         this.count--;
        } else {
         this.show = true;
         clearInterval(this.timer);
         this.timer = null;
        }
       }, 1000)
      }
   }  
 }
}
</script>
<style scoped>
.bindphone{
    background: #ffffff;
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0px;
    top: 0px;
}
.bindphonembox{
    width: 590px;
    padding-top: 62px;
    margin: 0 auto;
}
.bindphonembox ul li{
    padding-top: 34px;
    height: 91px;
    border-bottom: 2px solid #E5E5E5;/*no*/
    position: relative;
}
.bindphonembox ul li input[type="text"],.bindphonembox ul li input[type="number"]{
    width: 100%;
    height: 91px;
    border:0px;
    font-size: 36px;
    color:#333333;
    float: left;
}
.bindphonembox ul li button{
    position: absolute;
    top:34px;
    right: 0px;
    height: 91px;
    font-size: 28px;
    color: #cccccc;
    background: none;
    border: 0px;
}
.bindphonembox ul li button:focus{
    color:#00c1de;
}
.bindphonembox ul li:last-child{
    padding-top: 56px;
    border: 0px;
}
.bindphonembox ul li input[type="button"]{
    width: 100%;
    height: 88px;
    background: #E5E5E5;
    font-size: 36px;
    color: #999999;
    border: 0px;
    border-radius: 5px;
    float: left;
}
.bindphonembox ul li input[type="button"]:focus{
    background: #00C1DE;
    color: #ffffff;
}
</style>

