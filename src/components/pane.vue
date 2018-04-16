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
      // panename: this.name
    }
  },
  methods: {
    updateNav () {
      this.$parent.updateNav()
    }
  },
  watch: {
    label () {
      this.updateNav()
    }
  },
  // beforeMount () {
  //   this.updateNav()
  // },
  mounted () {
    this.updateNav()
  }
}
</script>

<style>

</style>
