<template>
  <div>
    <el-card :body-style="{ padding: '0px' }">
        <div class="card-header">
          <p class="title">原始数据</p>
        </div>
        <div class="original">
          <div>
            <el-date-picker
              v-model="month"
              type="month"
              format="yyyy-MM"
              value-format="yyyy-MM"
              :clearable='true'
              size="mini"
              :style="{width:'120px'}"
              placeholder="选择月"
              @change="checkTime">
            </el-date-picker>
          </div>
          <div class="original-table" v-loading="loading">
            <table>
              <tr>
                <th>日期</th>
                <th>血压值</th>
                <th>血压类型</th>
                <th>测量类型</th>
                <th>测量时间</th>
              </tr>
              <tr v-for="(ori,index) in original" :key="index">
                <th>{{ori.date}}</th>
                <td><p>{{ori.diastolic}}/{{ori.systolic}}</p></td>
                <td><p>{{ori.bpType}}</p></td>
                <td><p>{{ori.recordType}}</p></td>
                <td><p>{{ori.time}}</p></td>
              </tr>
            </table>
          </div>
          <div class="page">
            <el-pagination
              class="el-pagination"
              @current-change="currentChange"
              :current-page.sync="pageNum"
              :page-size="pageSize"
              layout="total, prev, pager, next, jumper"
              :total="recordCount"
              prev-text="上一页"
              next-text="下一页">
            </el-pagination>
          </div>
        </div>
    </el-card>
  </div>
</template>

<script>
import {originalApi} from '@/api/components/BloodheighSickcard/original.js'
import {dateFormat} from '@/untils/date.js'
export default {
  props: {
    sickID: {
      default: 0
    },
    hospitalId: {
      default: 0
    }
  },
  data () {
    return {
      loading: false,
      month: '',
      pageSize: 10,
      pageNum: 1,
      recordCount: 0,
      original: []

    }
  },
  methods: {
    getOriginalData () {
      this.loading = true
      let params = {
        userId: this.sickID,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      if (this.month) {
        params.measureMonthTime = this.month
      }
      this.$axios(originalApi(params))
      .then(res => {
        if (this._.has(res.data, 'data')) {
          if (res.data.data) {
            this.original = []

            res.data.data.forEach(item => {
              if (this._.has(item, 'bpMeasureTimes')) {
                item.bpMeasureTime = this.bpMeasureTime(item.bpMeasureTimes)
              }
              if (this._.has(item, 'measureTime')) {
                item.date = this.time(item.measureTime).date
                item.time = this.time(item.measureTime).time
              }
              if (this._.has(item, 'bpType')) {
                item.bpType = this.bpType(item.bpType)
              }
              if (this._.has(item, 'recordType')) {
                item.recordType = this.recordType(item.recordType)
              }
              this.original.push(item)
            })
            this.recordCount = res.data.recordCount
            this.pageSize = res.data.pageSize
            this.pageNum = res.data.pageNum
            this.loading = false

            console.log('原始数据', this.original)
          }
        }
        if (res.data.code === '1001') {
          this.loading = false
          this.$message({
            message: '获取原始数据失败',
            type: 'error'
          })
        }
      })
      .catch(err => {
        console.log('获取原始数据失败', err)
        this.loading = false
      })
    },
    bpMeasureTime (val) {
      let type
      switch (val) {
        case 0:
          type = '未知'
          break
        case 1:
          type = '日常'
          break
        case 2:
          type = '睡前'
          break
        case 3:
          type = '浅睡眠'
          break
        case 4:
          type = '深睡眠'
          break
        case 5:
          type = '醒来'
          break
        case 6:
          type = '运动后'
          break
        case 7:
          type = '餐后'
          break
        case 8:
          type = '入厕后'
          break
        case 9:
          type = '喝酒后'
          break
        case 10:
          type = '情绪波动'
          break
        case 11:
          type = '生病'
          break
        case 12:
          type = '抽烟后'
          break
        default:
          type = '未知'
          break
      }
      return type
    },
    recordType (val) {
      let type
      switch (val) {
        case 1:
          type = '自动记录'
          break
        case 2:
          type = '手动记录'
          break
        case 3:
          type = '血压手表初始化'
          break
        default:
          type = '未知'
          break
      }
      return type
    },
    bpType (val) {
      let type
      switch (val) {
        case 0:
          type = '未知'
          break
        case 1:
          type = '正常血压'
          break
        case 2:
          type = '正常高值'
          break
        case 3:
          type = '轻度高血压'
          break
        case 4:
          type = '中度高血压'
          break
        case 5:
          type = '危险血压'
          break
        default:
          type = '未知'
          break
      }
      return type
    },
    time (val) {
      let date = val.slice(0, 10)
      let time = val.slice(11)
      return {
        'date': date,
        'time': time
      }
    },
    checkTime () {
      let date = new Date()
      date = dateFormat(date, 0, true)
      if (this.month) {
        if (this._.gt(this.month, date)) {
          this.$message({
            showClose: true,
            message: '日期不能大于当前日期',
            type: 'warning'
          })
          // this.month = ''
        } else {
          this.pageNum = 1
          this.getOriginalData()
        }
      } else {
        this.pageNum = 1
        this.getOriginalData()
      }
    },
    currentChange (page) {
      this.pageNum = page
      this.getOriginalData()
    }
  },
  mounted () {
    this.getOriginalData()
    // console.log(this.month)
  }
}
</script>

<style scoped>
  .title{
    /* margin-left:20px; */
    margin-top:24px;
    margin-bottom:2px;
    font-size:20px;
    color:#666
  }
  .card-header{
    margin: 0 20px 0 20px;
    border-bottom:1px solid #ebeef5;
    height: 28px;
  }
  .original{
    margin:20px;
  }
  p{
    color:#666;
  }
  table{
    /* height: 200px; */
    border:1px solid #eaeaea;
    background-color: #fff;
    text-align: center;
    vertical-align: middle;
    width: 100%;
    font-size: 14px;
  }
  th{
    /* font-size: 16px; */
  }
  table th{
    border:1px solid #eaeaea;
    padding: 15px 0;
    text-align: center;
    vertical-align: middle;
  
    color: #041421;
  }
  table td{
    border:1px solid #eaeaea;
    padding: 15px 0;
    text-align: center;
    vertical-align: middle;
  }
  .original-table{
    margin-top:20px;
    /* min-height: 200px; */
  }
  .page {
  margin-top:26px;
  margin-bottom: 24px;
  margin-right: 30px;
  font-size: 16px !important;
  text-align: right;
  vertical-align: middle;
}
.el-pagination{
  font-size: 16px;
}
</style>
