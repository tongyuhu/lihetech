<template>
  <ul class="ul clear">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: 'chartMessageGroup',
  data () {
    return {

    }
  }
}
</script>

<style scoped>
  .clear::after{
    content: "";
    width:0;
    height: 0;
    visibility: hidden;
    display: block;
    clear: both;
  }
  .ul{
    list-style: none;
    margin:0;
    padding:0;
    margin-right: 5px;
    margin-bottom: 15px;
  }
</style>
