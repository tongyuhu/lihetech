<template>
  <div>
      <el-row>
          <el-col :span="24">
            <HAddsick></HAddsick>
            <HBloodheightotal></HBloodheightotal>
            <HWork></HWork>
            <HSicklist></HSicklist>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import HAddsick from './H-addsick'
import HBloodheightotal from './H-bloodheightotal'
import HWork from './H-work'
import HSicklist from './H-sicklist'
export default {
  name: 'H-bloodheigh',
  components: {
    HAddsick,
    HBloodheightotal,
    HWork,
    HSicklist
  }
}
</script>

<style scoped>

</style>
