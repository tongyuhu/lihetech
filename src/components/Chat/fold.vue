<template>
  <div>
    <!-- 折叠好友列表 -->
    <div @click="toggle" class="fold-title">
      <span class="iconfont icon-arrowright" v-if="!show"></span>
      <span class="iconfont icon-arrowdown" v-if="show"></span>
      <span class="flod-title-text">
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
    padding-left: 20px;
    // &-text{
    //   display: inline-block;
    // }
  }
}
</style>

