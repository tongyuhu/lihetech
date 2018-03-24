<template>
  <div>
      <el-card :body-style="{ padding: '30px 20px' }">
          <p class="hospitalName">{{hospitalName}}</p>
          <p class="hospital-msg">{{hospitalAddress}}{{ hospitalDoctorNum }}</p>
      </el-card>
  </div>
</template>

<script>
import {dateFormat} from './../../../untils/date'
// import Bus from './../../../bus'
import { mapState } from 'vuex'
export default {
  name: 'H-addsick',
  data () {
    return {
    }
  },
  computed: {
    date: function () {
      let today = new Date()
      dateFormat(today, 0, true)
      return dateFormat(today, 0, true)
    },
    ...mapState({
      admin: state => state.adminInfo
    }),
    hospitalName () {
      if (this.admin && this.admin.department) {
        return this.admin.department
      } else {
        return '暂无数据'
      }
    },
    hospitalAddress () {
      if (this.admin && this.admin.hospital.address && this.admin.address) {
        return this.admin.hospital.address + this.admin.address
      } else {
        return '暂无数据'
      }
    },
    hospitalDoctorNum () {
      if (this.admin && this.admin.hospitalDoctorNum) {
        return this.admin + '名医生,' + this.admin + '名护士'
      } else {
        return ''
      }
    }
  },
  methods: {
  },
  mounted () {
    // vue - bus
    // Bus.$on('adminInfo', value => {
    //   console.log(value, 12222211)
    // })
  },
  beforeDestroy () {
    // Bus.$off('adminInfo')
  }
}
</script>

<style scoped>
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
