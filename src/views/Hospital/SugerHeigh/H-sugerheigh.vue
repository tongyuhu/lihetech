<template>
  <div>
      <el-row>
          <el-col :span="24">
            <Hhospitalmsg></Hhospitalmsg>
            <HSugerheightotal></HSugerheightotal>
            <HsugerWork></HsugerWork>
            <sugerSicklist></sugerSicklist>
          </el-col>
      </el-row>
  </div>
</template>

<script>
// import Bus from '@/bus'
import HSugerheightotal from './H-sugerheightotal'
import HsugerWork from './H-sugerWork'
import sugerSicklist from './H-sugerSicklist.vue'
import Hhospitalmsg from '@/views/Hospital/H-hospitalMsg.vue'
export default {
  name: 'H-bloodheigh',
  components: {
    HSugerheightotal,
    HsugerWork,
    sugerSicklist,
    Hhospitalmsg
  },
  data () {
    return {

    }
  }
  // beforeRouteLeave (to, from, next) {
  //   // 离开当前页面关闭导航
  //   Bus.$emit('closemenu', this.$route.name)
  //   next()
  // }
}
</script>

<style scoped>

</style>
