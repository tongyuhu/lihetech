<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import {findComponentsDownward, findComponentUpward} from './../untils/untils'
export default {
  name: 'f-tabs',
  data () {
    return {

    }
  },
  methods: {
    getPanes () {
      findComponentsDownward(this, 'f-pane')
    }
  }

}
</script>

<style>

</style>
