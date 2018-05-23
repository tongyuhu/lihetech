<template>
  <div>
    <div @click="toggle" class="fold-title">
      <span class="iconfont icon-arrowright" v-if="!show"></span>
      <span class="iconfont icon-arrowdown" v-if="show"></span>
      <span>
        {{title}}{{total ? '('+total+')': ''}}
      </span>
    </div>
    <div v-show="show">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fold',
  props: {
    title: {
      type: [String],
      default: '我的好友'
    },
    total: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      show: true
    }
  },
  methods: {
    toggle () {
      this.show = !this.show
    }
  }
}
</script>

<style lang="scss" scoped>
.fold{
  &-title{
    cursor: pointer;
    margin-bottom: 10px;
    user-select: none; 
  }
}
</style>

