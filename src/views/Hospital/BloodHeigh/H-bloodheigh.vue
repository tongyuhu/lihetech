<template>
  <div>
      <el-row>
        <!-- <face></face> -->
          <el-col :span="24">
            <Hhospitalmsg></Hhospitalmsg>
            <HBloodheightotal></HBloodheightotal>
            <bloodSickLists></bloodSickLists>
            <!-- <HWork></HWork> -->
            <!-- <bloodSicklist></bloodSicklist> -->
          </el-col>
      </el-row>
  </div>
</template>

<script>
import Hhospitalmsg from '@/views/Hospital/H-hospitalMsg.vue'
import HBloodheightotal from './H-bloodheightotal'
import HWork from './H-work'
import bloodSickLists from './H-bloodSickLists.vue'
// import Bus from '@/bus'
// import face from '@/components/BloodheighSickcard/facediagnosis'
// import medicine from '@/components/medicine/medicine.vue'
// import {cookie} from './../../../untils/cookie'
export default {
  name: 'H-bloodheigh',
  components: {
    Hhospitalmsg,
    HBloodheightotal,
    HWork,
    bloodSickLists
    // face
    // medicine
  },
  mounted () {
    console.log('blood', this.$route.name)
    // document.cookie = 'name=676767'

    // console.log(cookie.get(12))
    // 简单写入一条 Cookie 信息
    // cookie.set('use11r141', 'baidu', 10)
    // 写入一条 Cookie 信息，并且设置更多选项
    // cookie.set('user', 'baidu', 10, {
    //   path: '/', // 整个站点有效
    //  domain: 'localhost', // 有效域名
    //   secure: true // 加密数据传输
    // })
  }
  // beforeRouteLeave (to, from, next) {
    // 离开当前页面关闭导航
    // Bus.$emit('closemenu', 1)
    // Bus.$emit('closemenu', this.$route.name)
    // next()
  // }
}
</script>

<style scoped>

</style>
