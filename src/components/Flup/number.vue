<template>
  <div class="feng-input-wrap inline-block">
    <!-- <div class="feng-flex"> -->
      <div class="feng-input-q feng-flex">
        <div>
          <slot name="left">
              <!-- <span>前置</span> -->
          </slot>
        </div>
      </div>
    <!-- </div> -->
    <input type="text" :value="currentValue" @change="handleChange" class="feng-input" :style="{'padding-left':leftOffset+'px','padding-right':rightOffset+'px','height':height+'px'}">
    <div class="feng-input-h feng-flex">
      <div>
        <slot name="right">
            <!-- <span>后置</span> -->
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
const isValueNumber = function (value) {
  return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value)
}
export default {
  name: 'myinput',
  props: {
    value: {
      type: [String, Number],
      default: 0
    },
    disabled: Boolean,
    label: String,
    leftOffset: {  // 左侧padding
      type: Number,
      default: 0
    },
    rightOffset: {  // 右侧padding
      type: Number,
      default: 0
    },
    height: {  // 高
      type: Number,
      default: 32
    },
    number: {  // 是否只能输入数字
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      currentValue: this.value  // 输入框内容
    }
  },
  watch: {
    currentValue: function (val) { // 数值改变向父组件提交
      this.$emit('input', val)
      this.$emit('on-change', val)
    },
    value: {
      handler: function (val) {
        this.updateValue(val)
      },
      immediate: true
    }
  },
  methods: {
    /**
     * @description 初始化数据
     */
    updateValue (val) {
      this.currentValue = val
    },
    /**
     * @description 输入框改变
     */
    handleChange: function (event) {
      let vm = this
      let val = event.target.value.trim()
      if (vm.number) {  // 数字输入校验
        if (isValueNumber(val)) {
          let value = Number(val)
          vm.currentValue = value
          // console.log('aaaaanumber', this.currentValue)
        } else {
          if (val === '') {
            event.target.value = null
            vm.currentValue = null
          } else {
            event.target.value = vm.currentValue
          }
        }
      } else {
        // 非数字不校验
        vm.currentValue = val
      }
      // isValueNumber(val)
    }
  },
  mounted () {
    this.updateValue(this.value)
  }
}
</script>
<style scoped>
.feng-flex{
  display: flex;
  align-items: center;
  justify-content: center;
}
.feng-input{
    border:none;
    outline: none;
    background: transparent;
    font-size: 14px;
    height: 32px;
    border:1px solid #dcdfe6;
    border-radius: 4px;
    box-sizing: border-box;
    /* max-width: 1080px; */
    width: 100%;
    color: #606266;
    /* position: absolute; */
    /* top:0; */
    /* padding-left: 60px; */
  }
  .feng-input-wrap{
    position: relative;
    /* max-width: 1080px; */
    height: 100%;
    width: 100%;
    color: #606266;
  }
  .feng-input:focus {
    border:1px solid #1991fc;
    border-radius: 4px;
  }
  .feng-input-q{
    position: absolute;
    top:0;
    left: 5px;
    height: 100%;
    text-align: center;
    line-height: 100%;
    /* vertical-align: baseline; */
    /* display: inline-block; */
    font-size: 14px;
    /* padding: 1px 0; */
    /* padding-top: 10px; */
  }
  .feng-input-h{
    position: absolute;
    right: 5px;
    top:0;
    height: 100%;
    font-size: 14px;
    /* padding-top: 10px; */
  }
  .inline-block{
    display: inline-block;
  }
</style>

