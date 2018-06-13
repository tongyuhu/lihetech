<template>
  <div>
    <div class="order-setting">
      <button @click="setWeektime">周批量设置</button>
      <!-- <span class="title">{{start}} 至 {{end}}</span> -->
    </div>

    <div>
      <el-card>
        <table>
          <thead class="thead">
            <th>日期</th>
            <th>编辑</th>
            <th>编辑</th>
          </thead>
          <tbody class="tbody" v-for="(item,index) in orderlist" :key="item.time">
            <tr>
              <td rowspan="2">{{item.time}}</td>
              <td>上午预约
                <el-switch
                  v-model="item.morning.order"
                  active-color="#f1f1f1"
                  inactive-color="#1991fc">
                </el-switch>
              </td>
              <td>
                <span>上午：{{item.morning.time ? item.morning.time:'/'}}</span>
                <!-- <span>下午：{{item.noon ? item.noon:'/'}}</span> -->
                <el-button @click="editTime(index,'morning')" type="text" icon="el-icon-edit-outline">编辑</el-button>
              </td>
            </tr>
            <tr>
              <td>下午预约
                <el-switch
                  v-model="item.noon.order"
                  active-color="#f1f1f1"
                  inactive-color="#1991fc">
                </el-switch>
              </td>
              <td>
                <!-- <span>上午：{{item.morning ? item.morning:'/'}}</span> -->
                <span>下午：{{item.noon.time ? item.noon.time:'/'}}</span>
                <el-button @click="editTime(index,'noon')" type="text" icon="el-icon-edit-outline">编辑</el-button>
              </td>
            </tr>
          </tbody>
        </table>
      </el-card>
    </div>


    <!-- <div v-if="false">
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
                  active-color="#f1f1f1"
                  inactive-color="#1991fc">
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
    </div> -->

    <el-dialog
    center
    width="500px"
    :visible.sync="settingSingle">
      <span slot="title" class="dialog-title">预约时间设置</span>
      <div class="dialog-main">
        <div v-show="showMorningEdit">
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
        <div v-show="showNoonEdit">
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
          <span>日期选择:</span>
          <button @click="chooseWeek(index)" 
          :class="{'group-btn-active':item.choose,'group-btn':!item.choose}" 
          v-for="(item,index) in week" 
          :key="item.time">
            {{item.time}}
          </button>
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
import {orderSettingApi, settingDataApi} from '@/api/components/order/order.js'
// import {dateFormat, daybefor, computeWeekday} from '@/untils/date.js'
export default {
  name: 'orderSetting',
  data () {
    return {
      showMorningEdit: true,
      showNoonEdit: true,
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
      // order: [],
      index: null,
      // week: [, '周二', '周三', '周四', '周五', '周六', '周日']
      week: [
        {
          time: '周一',
          choose: false,
          value: 1
        },
        {
          time: '周二',
          choose: false,
          value: 2
        },
        {
          time: '周三',
          choose: false,
          value: 3
        },
        {
          time: '周四',
          choose: false,
          value: 4
        },
        {
          time: '周五',
          choose: false,
          value: 5
        },
        {
          time: '周六',
          choose: false,
          value: 6
        },
        {
          time: '周日',
          choose: false,
          value: 7
        }
      ],
      cheeckedweek: [],
      orderlist: []
    }
  },
  methods: {
    // 打开周批量设置窗口
    setWeektime () {
      this.settingGroup = true
    },
    // 取消编辑预约时间
    settingSingleCancel () {
      this.settingSingleMorning.start = ''
      this.settingSingleMorning.end = ''
      this.settingSingleNoon.start = ''
      this.settingSingleNoon.end = ''
      this.settingSingle = false
    },
    // 确认编辑时间
    settingSingleConfirm () {
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
        this.orderlist[this.index].morning.time = this.settingSingleMorning.start + '-' + this.settingSingleMorning.end
        this.orderlist[this.index].noon.time = this.settingSingleNoon.start + '-' + this.settingSingleNoon.end
        let parmars = {
          'weeks': this.index + 1,
          'startEndPeriodTimeMor': this.settingSingleMorning.start + '-' + this.settingSingleMorning.end,
          'startEndPeriodTimeAftn': this.settingSingleNoon.start + '-' + this.settingSingleNoon.end
        }
        this.$axios(orderSettingApi(parmars))
          .then(res => {
            if (res.data.code === '1001') {
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: 'warning'
              })
              this.orderlist[this.index].morning.time = ''
              this.orderlist[this.index].noon.time = ''
            }
          })
        this.initlist()
        this.settingSingle = false
      }
    },
    // 取消周批量设置
    settingGroupCancel () {
      this.settingGroupMorning.start = ''
      this.settingGroupMorning.end = ''
      this.settingGroupNoon.start = ''
      this.settingGroupNoon.end = ''
      this.settingGroup = false
    },
    // 确定周批量设置
    settingGroupConfirm () {
      if (this.cheeckedweek.length === 0) {
        this.$message({
          message: '请选择日期',
          type: 'warning'
        })
      } else {
        let edit = true
        let morning = this._.gt(this.settingGroupMorning.start, this.settingGroupMorning.end)
        let noon = this._.gt(this.settingGroupNoon.start, this.settingGroupNoon.end)
        if (this.settingGroupMorning.start) {
          if (!this.settingGroupMorning.end) {
            // this.settingGroupMorning.start = ''
            edit = false
            this.$message({
              message: '请完善设置',
              type: 'warning'
            })
          }
        }
        if (!this.settingGroupMorning.start) {
          if (this.settingGroupMorning.end) {
            // this.settingGroupMorning.end = ''
            edit = false
            this.$message({
              message: '请完善设置',
              type: 'warning'
            })
          }
        }
        if (!this.settingGroupNoon.start) {
          if (this.settingGroupNoon.end) {
            // this.settingGroupNoon.end = ''
            edit = false
            this.$message({
              message: '请完善设置',
              type: 'warning'
            })
          }
        }
        if (this.settingGroupNoon.start) {
          if (!this.settingGroupNoon.end) {
            edit = false
            // this.settingGroupNoon.start = ''
            this.$message({
              message: '请完善设置',
              type: 'warning'
            })
          }
        }
        if (morning || noon) {
          edit = false
          this.$message({
            message: '起始时间不能大于结束时间,请重新设置',
            type: 'warning'
          })
          // this.settingGroupMorning.start = ''
          // this.settingGroupMorning.end = ''
          // this.settingGroupNoon.start = ''
          // this.settingGroupNoon.end = ''
        }
        if (edit) {
          // this.cheeckedweek.forEach(item => {
          //   this.orderlist[item].morning.order = true
          //   this.orderlist[item].noon.order = true
          //   this.orderlist[item].morning.time = this.settingGroupMorning.start + '-' + this.settingGroupMorning.end
          //   this.orderlist[item].noon.time = this.settingGroupNoon.start + '-' + this.settingGroupNoon.end
          // })
          let parmars = {
            'weeks': this.cheeckedweek.join(','),
            'startEndPeriodTimeMor': this.settingGroupMorning.start + '-' + this.settingGroupMorning.end,
            'startEndPeriodTimeAftn': this.settingGroupNoon.start + '-' + this.settingGroupNoon.end
          }
          this.$axios(orderSettingApi(parmars))
          .then(res => {
            if (res.data.code === '1001') {
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: 'warning'
              })
              // res.data.data.forEach(item => {
              //   if (item.weekDay) {
              //     // this.orderlist[item.weekDay - 1].order = true
              //     this.orderlist[item.weekDay - 1].noon.order = true
              //     this.orderlist[item.weekDay - 1].morning.order = true
              //     if (item.slotType === 1) {
              //       this.orderlist[item.weekDay - 1].morning = ''
              //     }
              //     if (item.slotType === 2) {
              //       this.orderlist[item.weekDay - 1].noon = ''
              //     }
              //   }
              // })
            }
            this.initlist()
          })
          this.settingGroup = false
        }
      }
      // orderSettingApi
      // if () {
      //   let parmars = {
      //     'weeks': parmars.weeks,
      //     'startEndPeriodTimeMor': parmars.startEndPeriodTimeMor,
      //     'startEndPeriodTimeAftn': parmars.startEndPeriodTimeAftn
      //   }
      // }
      // this.settingGroup = false
    },
    // 打开编辑时间窗口
    editTime (index, val) {
      this.index = index
      if (val === 'morning') {
        if (!this.orderlist[index].morning.order) {
          this.showMorningEdit = true
          this.showNoonEdit = false
          this.settingSingle = true
          this.settingSingleNoon = {
            start: '',
            end: ''
          }
        } else {
          this.$message({
            message: '请先开启预约',
            type: 'warning'
          })
        }
      }
      if (val === 'noon') {
        if (!this.orderlist[index].noon.order) {
          this.showMorningEdit = false
          this.showNoonEdit = true
          this.settingSingle = true
          this.settingSingleMorning = {
            start: '',
            end: ''
          }
        } else {
          this.$message({
            message: '请先开启预约',
            type: 'warning'
          })
        }
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
        arr.push(week)
        befortoday = daybefor(today, befor - (day + 1), true)
        week = computeWeekday(befortoday)
        day++
      }
      return arr
    },
    chooseWeek (index) {
      this.week[index].choose = !this.week[index].choose
      if (this.week[index].choose) {
        this.cheeckedweek.push(index)
      } else {
        let hasIndex = this._.indexOf(this.cheeckedweek, index)
        if (hasIndex !== -1) {
          this.cheeckedweek.splice(hasIndex, 1)
        }
      }
      this.cheeckedweek = this._.uniq(this.cheeckedweek)
    },
    initlist () {
      this.$axios(settingDataApi({
        weekDay: null,
        slotType: null
      }))
      .then(res => {
        if (res.data.code === '0000') {
          // let list =[]
          res.data.data.forEach(item => {
            // let obj ={}
            if (item.weekDay === 1) {
              if (item.slotType === 1) {
                this.orderlist[0].morning.time = item.startEndPeriodTime
                this.orderlist[0].morning.order = item.isStop
              }
              if (item.slotType === 2) {
                this.orderlist[0].noon.time = item.startEndPeriodTime
                this.orderlist[0].noon.order = item.isStop
              }
            }
            if (item.weekDay === 2) {
              if (item.slotType === 1) {
                this.orderlist[1].morning.time = item.startEndPeriodTime
                this.orderlist[1].morning.order = item.isStop
              }
              if (item.slotType === 2) {
                this.orderlist[1].noon.time = item.startEndPeriodTime
                this.orderlist[1].noon.order = item.isStop
              }
            }
            if (item.weekDay === 3) {
              if (item.slotType === 1) {
                this.orderlist[2].morning.time = item.startEndPeriodTime
                this.orderlist[2].morning.order = item.isStop
              }
              if (item.slotType === 2) {
                this.orderlist[2].noon.time = item.startEndPeriodTime
                this.orderlist[2].noon.order = item.isStop
              }
            }
            if (item.weekDay === 4) {
              if (item.slotType === 1) {
                this.orderlist[3].morning.time = item.startEndPeriodTime
                this.orderlist[3].morning.order = item.isStop
              }
              if (item.slotType === 2) {
                this.orderlist[3].noon.time = item.startEndPeriodTime
                this.orderlist[3].noon.order = item.isStop
              }
            }
            if (item.weekDay === 5) {
              if (item.slotType === 1) {
                this.orderlist[4].morning.time = item.startEndPeriodTime
                this.orderlist[4].morning.order = item.isStop
              }
              if (item.slotType === 2) {
                this.orderlist[4].noon.time = item.startEndPeriodTime
                this.orderlist[4].noon.order = item.isStop
              }
            }
            if (item.weekDay === 6) {
              if (item.slotType === 1) {
                this.orderlist[5].morning.time = item.startEndPeriodTime
                this.orderlist[5].morning.order = item.isStop
              }
              if (item.slotType === 2) {
                this.orderlist[5].noon.time = item.startEndPeriodTime
                this.orderlist[5].noon.order = item.isStop
              }
            }
            if (item.weekDay === 7) {
              if (item.slotType === 1) {
                this.orderlist[6].morning.time = item.startEndPeriodTime
                this.orderlist[6].morning.order = item.isStop
              }
              if (item.slotType === 2) {
                this.orderlist[6].noon.time = item.startEndPeriodTime
                this.orderlist[6].noon.order = item.isStop
              }
            }
          })
        }
        console.log('周批量预约时间表', this.orderlist)
      })
    }
  },
  mounted () {
    let data = this.nextSunday()
    this.start = data[0]
    this.end = data[6]
    // data.forEach(item => {
    //   let order = {
    //     order: false,
    //     morning: '',
    //     noon: '',
    //     time: item
    //   }
    //   this.order.push(order)
    // })
    // this.init()
    // let orderlist = []
    data.forEach(item => {
      let order = {
        morning: {
          order: true,
          time: ''
        },
        noon: {
          order: true,
          time: ''
        },
        time: item
      }
      this.orderlist.push(order)
    })
    this.initlist()
  }
}
</script>

<style lang="scss" scoped>
  .tbody:nth-last-child(n+2){
    box-shadow: 0 4px #eaeaea;
  }
  .thead{
    box-shadow: 0 4px #eaeaea;
  }
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
    height: 40px;
    font-size: 16px;
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
    padding: 6px 8px;
    color: #fff;
    border-radius: 3px;
    cursor: pointer;
    margin-right: 15px;
    font-size: 14px;
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

