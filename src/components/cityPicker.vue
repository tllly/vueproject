<template>
  <div class="citypicker">
    <awesome-picker
      ref="picker4"
      :textTitle="picker4.textTitle"
      :data="picker4.data"
      :anchor="picker4.anchor"
      @confirm="handlePicker4Confirm">
    </awesome-picker>
  </div>
</template>
<style lang="less" scoped>

</style>

<script>
  import areaData from '../area.js'
  export default {
    data () {
      return {
        picker4: {
          anchor: [],
          textTitle: '区域选择器',
          data: areaData
        }
      }
    },
    methods: {
      showPicker4 () {

      },
      handlePicker4Confirm (v) {
        this.picker4.anchor = v
        this.value = v ? JSON.stringify(v) : null
      }
    },
    created: function () {
      this.$refs.picker4.show()
    }
  }
</script>
