<template>
  <div class="pane">
    <!-- <span class="pane-label" @click="changePane">{{label}}</span> -->
    <div v-if="show">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {findComponentsDownward, findComponentUpward, findBrothersComponents} from './../untils/untils'
export default {
  name: 'f-pane',
  props: {
    label: {
      type: [String],
      default: 'pane'
    }
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    changePane () {
      this.show = true
      let brothers = findBrothersComponents(this, 'f-pane')
      // console.log(brothers)
      brothers.forEach(item => {
        item.show = false
      })
    }

  }
}
</script>

<style lang="scss" scoped>
  .pane{
    display: inline-block;
    &-label{
      font-size: 20px;
      cursor: pointer;
    }
  }
</style>

