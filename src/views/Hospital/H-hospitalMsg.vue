<template>
  <div>
      <el-card :body-style="{ padding: '30px 20px' }">
          <p class="hospitalName">{{hospitalName}}</p>
          <p class="hospital-msg">{{hospitalAddress}}{{ hospitalDoctorNum }}</p>
      </el-card>
  </div>
</template>

<script>
import {dateFormat} from '@/untils/date'
import { mapState } from 'vuex'
export default {
  name: 'H-hospitalMessage',
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
    // 医院名字
    hospitalName () {
      if (this.admin && this.admin.hospital.department) {
        return this.admin.hospital.department
      } else {
        return '暂无数据'
      }
    },
    // 医院地址
    hospitalAddress () {
      if (this.admin && this.admin.hospital.address) {
        return this.admin.address
      } else {
        return ''
      }
    },
    // 医院人员
    hospitalDoctorNum () {
      if (this.admin && this.admin.hospitalDoctorNum) {
        return this.admin + '名医生,' + this.admin + '名护士'
      } else {
        return ''
      }
    }
  },
  methods: {
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
