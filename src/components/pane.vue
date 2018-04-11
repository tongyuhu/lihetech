<template>
  <div class="pane" v-show="show" ref="pane">
    <slot></slot>
  </div>
</template>

<script>
// import Vue from 'vue'
// Vue.component()
export default {
  name: 'pane',
  props: {
    name: {
      type: [String, Number]
    },
    label: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      show: true,
      panename: this.name
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
