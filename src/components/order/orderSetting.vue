<template>
  <div>
    <div class="order-setting">
      <button @click="setWeektime">周批量设置</button>
      <span>2018-05-01  05-08</span>
    </div>

    <div>
      <el-card>
        <table>
          <thead>
            <th>日期</th>
            <th>编辑</th>
            <th>编辑</th>
          </thead>
          <tbody>
            <tr>
              <td>2018-5-14 周一</td>
              <td>该日预约
                <el-switch
                  v-model="value2"
                  active-color="#1991fc"
                  inactive-color="#f1f1f1">
                </el-switch>
              </td>
              <td>
                <span>上午08:30-12:00</span>
                <span>上午08:30-12:00</span>
                <el-button type="text" icon="el-icon-edit-outline">编辑</el-button>
              </td>
            </tr>
          </tbody>
        </table>
      </el-card>
    </div>

    <el-dialog
    center
    width="500px"
    :visible.sync="settingSingle">
      <span slot="title" class="dialog-title">预约时间设置</span>
      <div class="dialog-main">
        <div>
          <span>上午</span>
          <el-time-select
          :style="{'width':'150px'}"
          v-model="settingSingleMorning.start"
          :picker-options="{
            start: '00:00',
            step: '00:30',
            end: '24:00',
          }">
          </el-time-select>
          至
          <el-time-select
          :style="{'width':'150px'}"
          v-model="settingSingleMorning.end"
          :picker-options="{
            start: '00:00',
            step: '00:30',
            end: '24:00',
          }">
          </el-time-select>
        </div>
        <div>
          <span>下午</span>
          <el-time-select
          :style="{'width':'150px'}"
          v-model="settingSingleNoon.start"
          :picker-options="{
            start: '00:00',
            step: '00:30',
            end: '24:00',
          }">
          </el-time-select>
          至
          <el-time-select
          :style="{'width':'150px'}"
          v-model="settingSingleNoon.end"
          :picker-options="{
            start: '00:00',
            step: '00:30',
            end: '24:00',
          }">
          </el-time-select>
        </div>
      </div>
      <div slot="footer">
        <el-button @click="settingSingleCancel" type="primary">取消</el-button>
        <el-button @click="settingSingleConfirm" type="primary">保存</el-button>
      </div>
    </el-dialog>

    <el-dialog
    center
    width="500px"
    :visible.sync="settingGroup">
      <span slot="title" class="dialog-title">周批量预约时间设置</span>
      <div class="dialog-main">
        <div>
          <span>日期</span>
          <el-date-picker
            :style="{'width':'150px'}"
            v-model="settingGroupTime.start"
            type="date"
            placeholder="选择日期"
            :default-value="defaultvalue"
            :picker-options="settingGroupTimeOptions">
          </el-date-picker>
        至
          <el-date-picker
            :style="{'width':'150px'}"
            v-model="settingGroupTime.end"
            type="date"
            placeholder="选择日期"
            :picker-options="settingGroupTimeOptions">
          </el-date-picker>

          <!-- <el-date-picker
            v-model="settingGroupTime.end"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="MM-dd">
          </el-date-picker> -->
        </div>
        <div>
          <span>上午</span>
          <el-time-select
          :style="{'width':'150px'}"
          v-model="settingGroupMorning.start"
          :picker-options="{
            start: '00:00',
            step: '00:30',
            end: '12:00',
          }">
          </el-time-select>
          至
          <el-time-select
          :style="{'width':'150px'}"
          v-model="settingGroupMorning.end"
          :picker-options="{
            start: '00:00',
            step: '00:30',
            end: '12:00',
          }">

          </el-time-select>
        </div>
        <div>
          <span>下午</span>
          <el-time-select
          :style="{'width':'150px'}"
          v-model="settingGroupNoon.start"
          :picker-options="{
            start: '12:00',
            step: '00:30',
            end: '24:00',
          }">
          </el-time-select>
          至
          <el-time-select
          :style="{'width':'150px'}"
          v-model="settingGroupNoon.end"
          :picker-options="{
            start: '12:00',
            step: '00:30',
            end: '24:00',
          }">
          </el-time-select>
        </div>
      </div>
      <div slot="footer">
        <el-button @click="settingGroupCancel" type="primary">取消</el-button>
        <el-button @click="settingGroupConfirm" type="primary">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {dateFormat, daybefor, computeWeekday} from '@/untils/date.js'
export default {
  name: 'orderSetting',
  data () {
    return {
      settingSingle: false,
      settingSingleMorning: {
        start: '',
        end: ''
      },
      settingSingleNoon: {
        start: '',
        end: ''
      },
      settingGroup: false,
      settingGroupMorning: {
        start: '',
        end: ''
      },
      settingGroupNoon: {
        start: '',
        end: ''
      },
      settingGroupTime: {
        start: '',
        end: ''
      },
      settingGroupTimeOptions: {
        disabledDate (time) {
          let today = new Date()
          let befor = -7
          let befortoday = daybefor(today, befor, true)
          let week = computeWeekday(befortoday)
          if (week === '周日') {
            return today
          } else {
            while (week !== '周日') {
              befor--
              befortoday = daybefor(befortoday, befor, true)
              week = computeWeekday(befortoday)
            }
          }
          befortoday = daybefor(befortoday, -1, true)
          let endtoday = daybefor(befortoday, -8, true)
          let start = befortoday.split('-')

          start[0] = parseInt(start[0])
          start[1] = parseInt(start[1])
          start[2] = parseInt(start[2])
          // if(start)
          let startDate = new Date(start[0], start[1] - 1, start[2])

          let end = endtoday.split('-')

          end[0] = parseInt(end[0])
          end[1] = parseInt(end[1])
          end[2] = parseInt(end[2])
          // if(end)
          let endDate = new Date(end[0], end[1] - 1, end[2])

          // console.log('time', time)
          return time.getTime() > endDate && time.getTime() > startDate
        }
      },
      value2: '',
      defaultvalue: null
    }
  },
  methods: {
    setWeektime () {
      this.settingGroup = true
    },
    settingSingleCancel () {
      this.settingSingle = false
    },
    settingSingleConfirm () {
      this.settingSingle = false
    },
    settingGroupCancel () {
      this.settingGroup = false
    },
    settingGroupConfirm () {
      this.settingGroup = false
    }
  },
  mounted () {
    let today = new Date()
    let befor = -7
    let befortoday = daybefor(today, befor, true)
    let week = computeWeekday(befortoday)
    if (week === '周日') {
      return today
    } else {
      while (week !== '周日') {
        befor--
        befortoday = daybefor(befortoday, befor, true)
        week = computeWeekday(befortoday)
      }
    }
    befortoday = daybefor(befortoday, -1, true)
    // let endtoday = daybefor(befortoday, -8, true)
    let start = befortoday.split('-')

    start[0] = parseInt(start[0])
    start[1] = parseInt(start[1])
    start[2] = parseInt(start[2])
          // if(start)
    let startDate = new Date(start[0], start[1] - 1, start[2])
    this.defaultvalue = startDate
    console.log('start', start)
    console.log('start2', startDate)
    console.log('start1', befortoday)
  }
}
</script>

<style lang="scss" scoped>
  span{
    display: inline-block;
    margin-right: 10px;
  }

  table{
    width: 100%;
    color: #666;
    font-size: 14px;
  }
  th{
    color: #041421;
  }
  th,td{
    border:1px solid #eaeaea;
    padding: 10px;
    vertical-align: middle;
    text-align: center;
  }
.order-setting{
  margin-bottom: 20px;
  button{
    border: none;
    background: #1991fc;
    padding: 5px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
    margin-right: 15px;
  }
}
.dialog-title{
  display: inline-block;
  text-align: center;
  color: #041421;
}
.dialog-main{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.dialog-main div{
  margin-top:10px;
}
</style>

