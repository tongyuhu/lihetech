<template>
  <div>
      <el-row>
          <el-col :span="20">
            <HAddsick></HAddsick>
            <HSugerheightotal></HSugerheightotal>
            <HWork></HWork>
            <HSicklist></HSicklist>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import HAddsick from './H-addsick'
import HSugerheightotal from './H-sugerheightotal'
import HWork from './H-work'
import HSicklist from './H-sicklist'
export default {
  name: 'H-bloodheigh',
  components: {
    HAddsick,
    HSugerheightotal,
    HWork,
    HSicklist
  }
}
</script>

<style scoped>

</style>
