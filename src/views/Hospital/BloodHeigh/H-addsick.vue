<template>
  <div>
      <!-- <el-row type="flex" justify="space-between"> -->
        <el-button @click="goanchor('#anchor')">
        anchor
      </el-button>
          <el-card :body-style="{ padding: '30px 20px' }">
              <p class="hospitalName">{{ hospitalName }}</p>
              <p class="hospital-msg">{{ hospitalAddress }} {{ hospitalDoctorNum }}名医生,{{ hospitalNanaNum }}名护士</p>
              <!-- <el-button size="small" type="primary" @click="addSick">添加病人</el-button> -->
          </el-card>
          <!-- <el-col :span="16">
            <div class='add-sick-right'>
              <p>{{ date }}</p>
              <p>{{adminInfoAdd.username}}</p>
              <p>{{ hospitalAddress }} {{ hospitalDoctorNum }}名医生,{{ hospitalNanaNum }}名护士</p>
            </div>
          </el-col> -->
      <!-- </el-row> -->
  </div>
</template>

<script>
import {dateFormat} from './../../../untils/date'
// import HospitalApi from './../../../api/views/Hospital/BloodHeigh/H-addsick'
import Bus from './../../../bus'
import { mapState } from 'vuex'
// import {HospitalApi} from './../../../api/views/Hospital/BloodHeigh/H-addsick'
export default {
  name: 'H-addsick',
  data () {
    return {
      hospitalName: '张江高科诊所',
      // hospitalAddress: '诊所位于祖冲之路887弄72-73号',
      hospitalDoctorNum: '1',
      hospitalNanaNum: '1',
      adminInfoAdd: {}
    }
  },
  computed: {
    date: function () {
      let today = new Date()
      dateFormat(today, 0, true)
      return dateFormat(today, 0, true)

      // let today = new Date()
      // var year = today.getFullYear()
      // var mounth = today.getMonth() + 1
      // var day = today.getDate()
      // var nowtime = year + '年' + mounth + '月' + day + '日'
      // return nowtime
    },
    // hospitalAddress () {
    //   if (this.$store.state.adminInfo && this.$store.state.adminInfo.address !== null) {
    //     return '诊所位于' + this.$store.state.adminInfoaddress + ','
    //   } else {
    //     return ''
    //   }
    // }
    ...mapState({
      hospitalAddress: state => {
        if (state.adminInfo && state.adminInfo.address) {
          return '诊所位于' + state.adminInfoaddress + ','
        } else {
          return '诊所位置信息'
        }
      }
    })
  },
  methods: {
    // HospitalApi,
    addSick () {
      this.$router.push({name: 'addSick'})
    },
    goanchor (el) {
      let anchor = document.getElementById('anchor')
      console.log(anchor.offsetTop)
      console.log(this.$el.offsetTop)
      let scrollrange = 500
      let i = 0
      let scroll = setInterval(() => {
        if (i < scrollrange) {
          i += 50
          window.scrollTo(0, i)
        } else if (i >= scrollrange) {
          clearInterval(scroll)
        }
      }, 50)
    }
  },
  // watch: {
  // },
  mounted () {
    let vm = this
    vm.adminInfoAdd = vm.$store.state.adminInfo

    Bus.$on('adminInfo', value => {
      console.log(value, 12222211)
    })
  },
  // created () {
  //   Bus.$on('adminInfo', value => {
  //     console.log(value, 111111111)
  //   })
  // },
  beforeDestroy () {
    Bus.$off('adminInfo')
  }
}
</script>

<style scoped>
  /* .add-sick-right{
    text-align: right;
  } */
  .hospitalName{
    margin: 0;
    padding: 0;
    font-size: 32px;
    color:#041421;
    /* font-weight: bold; */
  }
  .hospital-msg{
    margin: 0;
    padding: 0;
    font-size: 14px;
    color: #666;
    margin-top: 10px;
  }
</style>
