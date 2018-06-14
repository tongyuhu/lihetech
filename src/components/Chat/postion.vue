<template>
  <div class="amap-page-container">
    <el-amap vid="amapDemo" :zoom="zoom" :center="position" class="amap-demo">
      <el-amap-marker vid="component-marker" 
      :position="position" 
      :title="title"
      >
      </el-amap-marker>
    </el-amap>
  </div>
</template>


  
<script>
export default {
  name: 'amap-page',
  props: {
    position: {
      type: [Array],
      default: function () {
        return []
      }
    },
    title: {
      type: [String],
      default: ''
    }
  },
  data () {
    return {
      count: 1,
      zoom: 14
    }
  }
}
</script>
<style>
  .amap-page-container{
    display: inline-block;
  }
  .amap-demo {
    height: 300px;
    width: 400px;
  }
</style>