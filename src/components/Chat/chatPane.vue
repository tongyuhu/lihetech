<template>
  <div v-show="show" class="pane">
    <slot>
      暂无数据
    </slot>
  </div>
</template>

<script>
export default {
  name: 'impane',
  props: {
    label: {
      type: [String],
      default: ''
    },
    title: {
      type: [String]
    },
    icon: {
      type: [String]
    }
  },
  data () {
    return {
      show: false,
      index: null
    }
  }

}
</script>

<style scoped>
.pane{
  /* height: 350px; */
  background: #f4f6f9;
  padding-top:15px;
  /* padding-left: 20px; */
}
</style>
