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
import {cookie} from './../../../untils/cookie'
export default {
  name: 'H-bloodheigh',
  components: {
    HAddsick,
    HBloodheightotal,
    HWork,
    HSicklist
  },
  mounted () {
    // document.cookie = 'name=676767'

    // console.log(cookie.get(12))
    // 简单写入一条 Cookie 信息
    cookie.set('use11r141', 'baidu', 10)
// 写入一条 Cookie 信息，并且设置更多选项
    // cookie.set('user', 'baidu', 10, {
    //   path: '/', // 整个站点有效
    //  domain: 'localhost', // 有效域名
    //   secure: true // 加密数据传输
    // })
    console.log(document.cookie)
  }
}
</script>

<style scoped>

</style>
