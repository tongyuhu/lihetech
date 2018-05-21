<template>
  <div>
    <div class="order-setting">
      <button @click="setWeektime">周批量设置</button>
      <span class="title">{{start}} 至 {{end}}</span>
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
            <tr v-for="(item,index) in order" :key="item.time">
              <td>{{item.time}}</td>
              <td>该日预约
                <el-switch
                  v-model="item.order"
                  active-color="#1991fc"
                  inactive-color="#f1f1f1">
                </el-switch>
              </td>
              <td>
                <span>上午：{{item.morning ? item.morning:'/'}}</span>
                <span>下午：{{item.noon ? item.noon:'/'}}</span>
                <el-button @click="editTime(index)" type="text" icon="el-icon-edit-outline">编辑</el-button>
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
            end: '12:00',
          }">
          </el-time-select>
          至
          <el-time-select
          :style="{'width':'150px'}"
          v-model="settingSingleMorning.end"
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
          v-model="settingSingleNoon.start"
          :picker-options="{
            start: '12:00',
            step: '00:30',
            end: '24:00',
          }">
          </el-time-select>
          至
          <el-time-select
          :style="{'width':'150px'}"
          v-model="settingSingleNoon.end"
          :picker-options="{
            start: '12:00',
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
          <span>日期选择：</span>
          <button @click="chooseWeek(index)" :class="{'group-btn-active':item.choose,'group-btn':!item.choose}" v-for="(item,index) in week" :key="item.time">{{item.time}}</button>
          <!-- <el-date-picker
            :style="{'width':'150px'}"
            v-model="settingGroupTime.start"
            type="date"
            placeholder="选择日期"
            :default-value="defaultvalue"
            >
          </el-date-picker>
        至
          <el-date-picker
            :style="{'width':'150px'}"
            v-model="settingGroupTime.end"
            type="date"
            placeholder="选择日期"
            >
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
import {daybefor, computeWeekday} from '@/untils/date.js'
// import {dateFormat, daybefor, computeWeekday} from '@/untils/date.js'
export default {
  name: 'orderSetting',
  data () {
    return {
      start: '',
      end: '',
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
      openOrder: '',
      defaultvalue: null,
      order: [],
      index: null,
      // week: [, '周二', '周三', '周四', '周五', '周六', '周日']
      week: [
        {
          time: '周一',
          choose: false
        },
        {
          time: '周二',
          choose: false
        },
        {
          time: '周三',
          choose: false
        },
        {
          time: '周四',
          choose: false
        },
        {
          time: '周五',
          choose: false
        },
        {
          time: '周六',
          choose: false
        },
        {
          time: '周日',
          choose: false
        }
      ]
    }
  },
  methods: {
    // 打开周批量设置窗口
    setWeektime () {
      this.settingGroup = true
    },
    // 取消编辑预约时间
    settingSingleCancel () {
      this.settingSingle = false
    },
    // 确认编辑时间
    settingSingleConfirm () {
      console.log(this.settingSingleMorning)
      console.log(this.settingSingleNoon)
      let morning = this._.gt(this.settingSingleMorning.start, this.settingSingleMorning.end)
      let noon = this._.gt(this.settingSingleNoon.start, this.settingSingleNoon.end)
      if (morning || noon) {
        this.$message({
          message: '起始时间不能大于结束时间,请重新设置',
          type: 'warning'
        })
        this.settingSingleMorning.start = ''
        this.settingSingleMorning.end = ''
        this.settingSingleNoon.start = ''
        this.settingSingleNoon.end = ''
      } else {
        this.order[this.index].morning = this.settingSingleMorning.start + '/' + this.settingSingleMorning.end
        this.order[this.index].noon = this.settingSingleNoon.start + '/' + this.settingSingleNoon.end
        this.settingSingle = false
      }
    },
    // 取消周批量设置
    settingGroupCancel () {
      this.settingGroup = false
    },
    // 确定周批量设置
    settingGroupConfirm () {
      this.settingGroup = false
    },
    // 打开编辑时间窗口
    editTime (index) {
      this.index = index
      console.log(this.openOrder)
      if (this.order[index].order) {
        this.settingSingle = true
      }
    },
    nextSunday () {
      let arr = []
      let day = 1
      let today = new Date()
      let befor = -7
      let befortoday = daybefor(today, befor, true)
      let week = computeWeekday(befortoday)
      if (week === '周日') {
        return today
      } else {
        while (week !== '周日') {
          befor--
          befortoday = daybefor(today, befor, true)
          week = computeWeekday(befortoday)
        }
      }
      befortoday = daybefor(today, befor - 1, true)
      week = computeWeekday(befortoday)
      while (day !== 8) {
        arr.push((befortoday + ' ' + week))
        befortoday = daybefor(today, befor - (day + 1), true)
        week = computeWeekday(befortoday)
        day++
      }
      return arr
    },
    chooseWeek (index) {
      this.week[index].choose = true
    }
  },
  mounted () {
    console.log(this.settingSingleMorning)
    console.log(this.settingSingleNoon)
    let data = this.nextSunday()
    this.start = data[0]
    this.end = data[6]
    data.forEach(item => {
      let order = {
        order: false,
        morning: '',
        noon: '',
        time: item
      }
      this.order.push(order)
    })
  }
}
</script>

<style lang="scss" scoped>
  .title{
    font-size: 14px;
  }
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
.group-btn-active{
  border:none;
  border-radius: 2px;
  outline: none;
  padding:5px;
  background-color: #1991fc;
  color:#fff;
  cursor: pointer;
  margin-left: 3px;
  margin-right: 3px;
}
.group-btn{
  border:none;
  border-radius: 2px;
  outline: none;
  padding:5px;
  background-color: #f4f6f9;
  color:#041421;
  cursor: pointer;
  margin-left: 3px;
  margin-right: 3px;
}
</style>

