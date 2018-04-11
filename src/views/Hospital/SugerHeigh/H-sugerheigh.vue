<template>
  <div>
      <el-row>
          <el-col :span="24">
            <hospitalMsg></hospitalMsg>
            <HSugerheightotal></HSugerheightotal>
            <HsugerWork></HsugerWork>
            <HSicklist></HSicklist>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import Bus from './../../../bus'
import HSugerheightotal from './H-sugerheightotal'
import HsugerWork from './H-sugerWork'
import HSicklist from './H-sicklist'
import hospitalMsg from './../../../components/hospitalMsg.vue'
export default {
  name: 'H-bloodheigh',
  components: {
    HSugerheightotal,
    HsugerWork,
    HSicklist,
    hospitalMsg
  },
  data () {
    return {

    }
  },
  beforeRouteLeave (to, from, next) {
    // 离开当前页面关闭导航
    Bus.$emit('closemenu', this.$route.name)
    next()
  }
}
</script>

<style scoped>

</style>
