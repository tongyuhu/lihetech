<template>
  <div>
      <el-row>
          <el-col>
            <HAddsick></HAddsick>
            <HBloodheightotal></HBloodheightotal>
            <HWork></HWork>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import HAddsick from './H-addsick'
import HBloodheightotal from './H-bloodheightotal'
import HWork from './H-work'
export default {
  name: 'H-bloodheigh',
  components: {
    HAddsick,
    HBloodheightotal,
    HWork
  }
}
</script>

<style>

</style>
