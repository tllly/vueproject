<template>
  <div class="select-task"  @click="closeSelect" >
    <ul class="select-list">
      <li v-for="item in selectArr" @click="selectItem(item)" :key="item.id" v-bind:class="{ checked: item.select, uncheck: !item.select }" >{{ item.value }}</li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
  .select-task{
    position: fixed;
    width: 750px;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0,0,0,0.3);
    z-index: 99;
    ul.select-list{
      position: absolute;
      left: 0;
      bottom: 0;
      padding: 0;
      width: 750px;
      max-height: 680px;
      overflow-y: auto;
      bottom: 0;
      li{
        width: 750px;
        height: 96px;
        text-align: center;
        font-size: 32px;
        line-height: 96px;
        background-color: #ffffff;
        border-bottom: 1px solid rgb(229,229,229);
        &:nth-last-of-type(1){
          border-bottom: 0;
        }
        &.checked{
          background-color: #eeeeee;
        }
      }
    }
  }
</style>

<script>
  export default {
    props: {
      /*{ selectArr:Arrary, selectParFn: eventName, closeSelect: eventName1}*/
      /*selectArr为供选择的数组item为{id:1,value:string,select:Booloea}*/
      /*selectParFn：选择后改变父组件中的数据的事件名*/
      /*closeSelect: 父组件中关闭子组件的事件名*/
      selectObj: Object
    },
    data () {
      return {
        selectArr: JSON.parse(JSON.stringify(this.selectObj.selectArr)),
        curSelect: {
          id: '',
          value: '',
          select: ''
        }
      }
    },
    methods: {
      selectItem: function (item) {
        for (let i = 0; i < this.selectArr.length; i++) {
          this.selectArr[i].select = false
        }
        item.select = true
        this.curSelect.id = item.id
        this.curSelect.value = item.value
        this.curSelect.select = item.select
        console.log(this.selectObj.selectParFn)
        let result = {
            curSelect: this.curSelect,
            selectArr: this.selectArr
        }
        this.$emit(this.selectObj.selectParFn, result)
        this.$emit(this.selectObj.closeSelect)

      },
      closeSelect: function () {
        this.$emit(this.selectObj.closeSelect)
      }
    }
  }
</script>
