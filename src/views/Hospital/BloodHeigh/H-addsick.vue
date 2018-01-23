<template>
  <div>
      <el-row type="flex" justify="space-between">
          <el-col :span="8">
              <p>{{ hospitalName }}</p>
              <el-button size="small" type="primary" @click="addSick">添加病人</el-button>
          </el-col>
          <el-col :span="16">
            <div class='add-sick-right'>
              <p>{{ date }}</p>
              <p>诊所位于{{ hospitalAddress }},{{ hospitalDoctorNum }}名医生,{{ hospitalNanaNum }}名护士</p>
            </div>
          </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  name: 'H-addsick',
  data () {
    return {
      hospitalName: '张江高科诊所',
      hospitalAddress: '诊所位于祖冲之路887弄72-73号',
      hospitalDoctorNum: '1',
      hospitalNanaNum: '1'
      // date: ''
    }
  },
  computed: {
    date: function () {
      let today = new Date()
      var year = today.getFullYear()
      var mounth = today.getMonth() + 1
      var day = today.getDate()
      // var time = today.toLocaleDateString()
      var nowtime = year + '年' + mounth + '月' + day + '日'
      // console.log(nowtime)
      return nowtime
      // return time
    }
  },
  methods: {
    // date: function (date) {
    //   let today = new Date()
    //   date = today.toLocaleString()
    //   return date
    // },
    addSick () {
      // console.log(this.$router)
      this.$router.push({name: 'addSick'})
    }
  },
  watch: {
    // date: function () {
    //   let today = new Date()
    //   let date = today.toLocaleString()
    //   return date
    // }
    // '$router': beforeEach(({name: other}, from, next) => {
    //     // this.$router.push({name: 'other'})
    //   console.log(1)
    //   next()
    // })
  }
}
</script>

<style scoped>
  .add-sick-right{
    text-align: right;
  }
</style>
