<template>
  <div>
    <el-row>
      <el-col :span="24">
        <Hhospitalmsg></Hhospitalmsg>
        <HBloodheightotal></HBloodheightotal>
        <bloodSickLists></bloodSickLists>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Hhospitalmsg from '@/views/Hospital/H-hospitalMsg.vue'
import HBloodheightotal from './H-bloodheightotal'
// import HWork from './H-work'
import bloodSickLists from './H-bloodSickLists.vue'
export default {
  name: 'H-bloodheigh',
  components: {
    Hhospitalmsg,
    HBloodheightotal,
    // HWork,
    bloodSickLists
  }
}
</script>

<style scoped>

</style>
