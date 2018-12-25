<template>
  <div class="pane" v-show="show" ref="pane">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'pane',
  props: {
    paneName: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      show: true
    }
  },
  methods: {
    updateNav () {
      this.$parent.updateNav()
    }
  },
  watch: {
    label () { // label 改变更新
      this.updateNav()
    }
  },
  mounted () {
    this.updateNav()
  }
}
</script>

<style>

</style>
