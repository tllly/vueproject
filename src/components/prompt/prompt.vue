<template>
   <!-- 全局提示框 -->
   <p v-show="visible" class="dialog-tips dialog-center">
     <span>{{message}}</span>
   </p>
</template>
<script>
export default {
 data() {
  return {
   visible: false,
   message: ""
  };
 }
};
</script>
<style lang="less">
.dialog-tips{
  position: fixed;
  z-index: 100;
  width: 70%;
  padding: 20px 22px;
  background-color: rgba(0, 0, 0, 0.8);
  color: #ffffff;
  font-size:32px;
  text-align: center;
}
.dialog-center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
}
</style>