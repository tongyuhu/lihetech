<template>
  <div>
    <!-- 血压与行为分数 -->
    <div class="blood-cover">
      <el-card :body-style="{ padding: '0px' }">
        <div class="card-header">
          <p class="title">血压与行为分数</p>
        </div>
        <div class="check-date">
          <el-row type="flex" justify="start">
            <button v-for="(item,index) in bloodAndBehaviourDate" 
            :key="item.date" 
            class="check-date-btn" 
            :class="{checked:item.isChecked}" 
            @click="updateBehaviourChecked(index)"
            >
              {{item.date}}
            </button>
          </el-row>
        </div>
        <div class="chart">
          <el-row :gutter="20">
            <el-col :span="18" :xl="16" :lg="18" :md="24">
              <div id='bloodBehaviourBlood' :style="{width:'auto',height:'250px'}"></div>
            </el-col>
            <el-col :span="6" :xl="8" :lg="6" :md="12">
              <div class="table">
                <table>
                  <tr>
                    <th>行为指数</th>
                    <td>
                      <p>优(>90)</p>
                      <p>{{BehaviourRate.behaveLevel.behaveOptimal}}</p>
                    </td>
                    <td>
                      <p>良(80-90)</p>
                      <p>{{BehaviourRate.behaveLevel.behaveGood}}</p>
                    </td>
                    <td>
                      <p>中(60-80)</p>
                      <p>{{BehaviourRate.behaveLevel.behaveMedium}}</p>
                    </td>
                    <td>
                      <p>差(60)</p>
                      <p>{{BehaviourRate.behaveLevel.behavePoor}}</p>
                    </td>
                  </tr>
                  <tr>
                    <th>高血压比例</th>
                    <td>
                      <p>{{BehaviourRate.bpLevel.bpOptimal}}</p>
                    </td>
                    <td>
                      <p>{{BehaviourRate.bpLevel.bpGood}}</p>
                    </td>
                    <td>
                      <p>{{BehaviourRate.bpLevel.bpMedium}}</p>
                    </td>
                    <td>
                      <p>{{BehaviourRate.bpLevel.bpPoor}}</p>
                    </td>
                  </tr>
                </table>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>

    <!-- 血压趋势 -->
    <div>
      <el-card :body-style="{ padding: '0px' }">
        <div class="card-header">
            <p class="title">血压趋势</p>
        </div>
        <div class="check-date">
          <el-row type="flex" justify="start">
            <button v-for="(item,index) in bloodTrendDate" 
            :key="item.date" 
            class="check-date-btn" 
            :class="{checked:item.isChecked}" 
            @click="updatebloodTrendChecked(index)">
              {{item.date}}
            </button>
          </el-row>
        </div>
        <!-- 状态选择 -->
        <div class="check-status">
          <span class="check-all-span">
            <button class="check-all-btn" @click="checkAllHandle()">
              <span :class="{'check-all-btn-icon':!ischeckAll,'check-all-btn-icon-active':ischeckAll}"></span>
              <span>全选</span>
            </button>
          </span>
          <span class="status-span"
          v-for="(item,index) in status" :key="item.value">
            <f-button
            :width="86"
            :height="24"
            :isChecked='item.default'
            @checked='changeStatus(index)'>{{item.label}}</f-button>
          </span>
        </div>
        <!-- 运动后 -->
        <div class="check-status">
          <span class="label-right">运动后：</span>
          <span class="status-span"
          v-for="item in sportsType" :key="item.value">
            <f-button
            :width="86"
            :height="24"
            :isChecked='item.default'
            @checked='changeStatus'>{{item.label}}</f-button>
          </span>
        </div>
        <!-- 餐后 -->
        <div class="check-status">
          <span class="label-right">餐后：</span>
          <span class="status-span"
          v-for="item in foodType" :key="item.value">
            <f-button
            :width="86"
            :height="24"
            :isChecked='item.default'
            @checked='changeStatus'>{{item.label}}</f-button>
          </span>
        </div>
        <div>
          <el-row>
            <el-col :span="12">
              <div id='bloodTrend' :style="{width:'350px',height:'250px'}"></div>
            </el-col>
            <el-col :span="12">
              <div class="clear">
                <div class="blood-trend-item">
                  <p>23</p>
                  <p>总测量次数</p>
                </div>
                <div class="blood-trend-item">
                  <p>19</p>
                  <p>正常偏高次数</p>
                  <p>121/81~139/89</p>
                </div>
              </div>
              <div class="clear">
                <div class="blood-trend-item">
                  <p>2</p>
                  <p>高血压次数</p>
                  <p>121/81~139/89</p>
                </div>
                <div class="blood-trend-item">
                  <p class="danger-text">19</p>
                  <p>危险次数</p>
                  <p>>179/109</p>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>

  </div>
</template>

<script>
import echarts from 'echarts'
// import {dateFormat, daybefor} from './../../untils/date'
import {bloodheighSickDataApi, updateBehaviourRateApi} from './../../api/components/BloodheighSickcard/bloodCover'
// import { deepcopy } from './../../untils/untils'
export default {
  components: {
  },
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
      ischeckAll: false,
      status: [
        {
          label: '日常',
          value: '1',
          default: true
        },
        {
          label: '睡前',
          value: '2',
          default: true
        },
        {
          label: '浅睡眠',
          value: '3',
          default: true
        },
        {
          label: '深睡眠',
          value: '4',
          default: true
        },
        {
          label: '醒来',
          value: '5',
          default: true
        },
        {
          label: '运动后',
          value: '6',
          default: true
        },
        {
          label: '餐后',
          value: '7',
          default: true
        },
        {
          label: '入厕后',
          value: '8',
          default: true
        },
        {
          label: '喝酒后',
          value: '9',
          default: true
        },
        {
          label: '情绪波动',
          value: '10',
          default: true
        },
        {
          label: '生病',
          value: '11',
          default: true
        },
        {
          label: '抽烟后',
          value: '12',
          default: true
        }
      ],
      sportsType: [
        {
          label: '运动后',
          value: 'after24Sport',
          default: true
        },
        {
          label: '运动后',
          value: 'afte42rSport',
          default: true
        },
        {
          label: '运动后',
          value: 'after7Sport',
          default: true
        },
        {
          label: '运动后',
          value: 'afterSpor56t',
          default: true
        }
      ],
      foodType: [
        {
          label: '运动后',
          value: 'after089Sport',
          default: true
        },
        {
          label: '运动后',
          value: 'afterS890port',
          default: true
        },
        {
          label: '运动后',
          value: 'afterSp0890ort',
          default: true
        },
        {
          label: '运动后',
          value: 'aft879erSport',
          default: true
        },
        {
          label: '运动后',
          value: 'af534terSport',
          default: true
        },
        {
          label: '运动后',
          value: 'after142Sport',
          default: true
        }
      ],
      bloodTrendDate: [
        {
          date: '最近',
          value: 'lately',
          isChecked: false
        },
        {
          date: '日',
          value: 'day',
          isChecked: false
        },
        {
          date: '周',
          value: 'week',
          isChecked: false
        },
        {
          date: '月',
          value: 'month',
          isChecked: false
        }
      ],
      //
      bloodAndBehaviourData: {
        date: [],
        avgSystolic: [],
        avgDiastolic: [],
        avgBehaveScore: []
      },
      bloodAndBehaviourDate: [
        {
          date: '日',
          value: 'day',
          isChecked: false
        },
        {
          date: '周',
          value: 'week',
          isChecked: false
        },
        {
          date: '月',
          value: 'month',
          isChecked: false
        }
      ],
      behaviourChecked: null,
      dataIndex: 0,
      chartA: {date: ''},
      BehaviourRate: {
        behaveLevel: {
          behaveGood: '',
          behaveMedium: '',
          behaveOptimal: '',
          behavePoor: ''
        },
        bpLevel: {
          bpGood: '',
          bpMedium: '',
          bpOptimal: '',
          bpPoor: ''
        }
      },
      bloodTrendChecked: null,
      statusArr: ''
    }
  },
  methods: {
    checkAllHandle () {
      // this.ischeckAll = !this.ischeckAll
      // this.status.forEach(item => {
        // item.default = true
        // item.isChecked =
      // })
      // this.updatebloodTrendData(this.bloodTrendChecked, this.statusArr)
    },

    bloodBehaviourBloodOption () {
      let vm = this
      let option = {
        color: ['#8ecefc', 'e6f5fe', '8ecefc'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false
          },
          backgroundColor: 'rgba(50,50,50,0.2)',
          triggerOn: 'click',
          // triggerOn: 'mousemove|click',
          formatter: function (a) {
            if (a.dataIndex === vm.dataIndex) {
              // vm.updateBehaviourRateDate(a[0].axisValue)
            } else {
              vm.updateBehaviourRateDate(a[0].axisValue)
            }
            // vm.dataIndex = a.dataIndex
            // a[]
            // let
            // a[0].dataIndex
            console.log(a)
            return (
                a[0]['axisValueLabel'] + '<br>' +
                a[0]['seriesName'] + ': ' + a[0]['value'] + '<br>' +
                a[1]['seriesName'] + ': ' + a[1]['value'] + '<br>' +
                a[2]['seriesName'] + ': ' + a[2]['value']
            )
            // return (
            //     a[0]['axisValueLabel'] + '<br>' +
            //     '<span style="display: inline-block; margin-right: 5px; border-radius: 10px; width: 9px; height: 9px; background-color: ' + a[0]['color'] + '"></span>' +
            //     a[0]['seriesName'] + ': ' + a[0]['value'] + '<br>' +
            //     '<span style="display: inline-block; margin-right: 5px; border-radius: 10px; width: 9px; height: 9px; background-color: ' + a[1]['color'] + '"></span>' +
            //     a[1]['seriesName'] + ': ' + a[1]['value'] + '<br>' +
            //     '<span style="display: inline-block; margin-right: 5px; border-radius: 10px; width: 9px; height: 9px; background-color: ' + a[0]['color'] + '"></span>' +
            //     a[2]['seriesName'] + ': ' + a[2]['value']
            // )
          }
        },
        axisPointer: {
          link: [{
            xAxisIndex: 'all'
          }],
          lineStyle: {
            color: '#fff',
            width: 0
          }
        },
        grid: [{ // 直角坐标系内绘图网格
            //   show: false,
          top: '30px',
          left: '30',
          right: '58%',
          width: 'auto',
          height: 'auto'
        },
        {
          top: '30px',
          left: '50%',
          width: 'auto',
          height: 'auto'
        }
        ],
        xAxis: [

          { // 直角坐标系grid的x轴
            gridIndex: 0,
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              interval: 0, // 显示x轴数据
              showMinLabel: true,
              showMaxLabel: true,
              align: 'left',
              rotate: 330
            },
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            // min: 0,
            axisTick: {
              show: false
            },
            // 血压横坐标
            // data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']
            data: vm.bloodAndBehaviourData.date
          },
          { // 直角坐标系grid的x轴
            type: 'category',
            gridIndex: 1,
            boundaryGap: false,
            axisLabel: {
              interval: 0, // 显示x轴数据
              showMinLabel: true,
              showMaxLabel: true,
              align: 'left',
              rotate: 330
            },
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            axisTick: {
              show: false
            },
            // 行为分数横坐标
            // data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']
            data: vm.bloodAndBehaviourData.date
          }
        ],
        yAxis: [{ // 直角坐标系grid的y轴
          name: '血压',
          gridIndex: 0,
          nameLocation: 'end',
          type: 'value',
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#999'
            }
          },
          axisTick: {
            show: false
          },
            // axisLabel: {
            //   // formatter: '{value}%'
            // },
          splitLine: { // y轴网格显示
            show: true
          },
          nameTextStyle: { // 坐标轴名样式
            color: '#666',
            fontSize: 12,
            align: 'left'
          },
          boundaryGap: true,
          splitNumber: 3, // 坐标轴分割段数
          minInterval: 40, // 自动计算的坐标轴最小间隔大小。例如可以设置成1保证坐标轴分割刻度显示成整数。
            // interval: 50, // 强制设置坐标轴分割间隔。
          data: ['0', '120', '140', '180']
        },
        { // 直角坐标系grid的y轴
          name: '行为分数',
          gridIndex: 1,
          nameLocation: 'end',
          type: 'value',
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#999'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: { // y轴网格显示
            show: true
          },
          nameTextStyle: { // 坐标轴名样式
            color: '#666',
            fontSize: 12,
            align: 'left'
          },
          boundaryGap: true,
          splitNumber: 3, // 坐标轴分割段数
          minInterval: 40, // 自动计算的坐标轴最小间隔大小。例如可以设置成1保证坐标轴分割刻度显示成整数。
            // interval: 50, // 强制设置坐标轴分割间隔。
          data: ['0', '120', '140', '180']
        }
        ],
        series: [

          {
            xAxisIndex: 0,
            yAxisIndex: 0,
            name: '舒张压',
            type: 'line',
            smooth: true,
            smoothMonotone: 'x',
            lineStyle: {
              normal: {
                width: 2,
                color: '#8ecefc'
              }
            },
            itemStyle: {
              normal: {
                color: '#8ecefc'
              }
            },
            areaStyle: {
              normal: {
                color: '#e6f5fe',
                origin: 'auto',
                shadowColor: '#e6f5fe'
              }
            },
            data: vm.bloodAndBehaviourData.avgDiastolic
            // data: [44, 65, 74, 86, 70, 85, 92, 56, 75, 84, 66, 50]
          },
          {
            xAxisIndex: 0,
            yAxisIndex: 0,
            name: '收缩压',
            type: 'line',
            smooth: true,
            smoothMonotone: 'x',
            lineStyle: {
              normal: {
                width: 2,
                color: '#7cedc4'
              }
            },
            itemStyle: {
              normal: {
                color: '#7cedc4'
              }
            },
            areaStyle: {
              normal: {
                color: '#def3f2',
                origin: 'auto',
                shadowColor: '#def3f2'
              }
            },
            // data: [34, 55, 54, 76, 60, 75, 72, 16, 55, 74, 36, 10]
            data: vm.bloodAndBehaviourData.avgSystolic

          },

          {
            xAxisIndex: 1,
            yAxisIndex: 1,
            name: '行为分数',
            type: 'line',
            smooth: true,
            smoothMonotone: 'x',
            lineStyle: {
              normal: {
                width: 2,
                color: '#8ecefc'
              }
            },
            itemStyle: {
              normal: {
                color: '#8ecefc'
              }
            },
            areaStyle: {
              normal: {
                color: '#e6f5fe',
                origin: 'auto',
                shadowColor: '#e6f5fe'
              }
            },
            // data: [44, 65, 74, 86, 70, 85, 92, 56, 75, 84, 66, 50]
            data: vm.bloodAndBehaviourData.avgBehaveScore
          }
        ],
        textStyle: {
          color: '#666',
          fontSize: 12
        }
      }
      return option
    },
    bloodBehaviourOption () {
      return {
        grid: { // 直角坐标系内绘图网格
          show: false,
          top: '30px',
          width: 'auto',
          height: 'auto'
        },
        xAxis: { // 直角坐标系grid的x轴
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            interval: 0,  // 显示x轴数据
            showMinLabel: true,
            showMaxLabel: true,
            align: 'left',
            rotate: 330
          },
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisTick: {
            show: false
          },
          data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']
        },
        yAxis: { // 直角坐标系grid的y轴
          name: '行为分数',
          nameLocation: 'end',
          type: 'value',
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#999'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {  // y轴网格显示
            show: true
          },
          nameTextStyle: { // 坐标轴名样式
            color: '#666',
            fontSize: 12,
            align: 'left'
          },
          boundaryGap: true,
          splitNumber: 3,  // 坐标轴分割段数
          minInterval: 40, // 自动计算的坐标轴最小间隔大小。例如可以设置成1保证坐标轴分割刻度显示成整数。
          // interval: 50, // 强制设置坐标轴分割间隔。
          data: ['0', '120', '140', '180']
        },
        series: [
          {
            name: '舒张压',
            type: 'line',
            smooth: true,
            smoothMonotone: 'x',
            lineStyle: {
              normal: {
                width: 2,
                color: '#8ecefc'
              }
            },
            itemStyle: {
              normal: {
                color: '#8ecefc'
              }
            },
            areaStyle: {
              normal: {
                color: '#e6f5fe',
                origin: 'auto',
                shadowColor: '#e6f5fe'
              }
            },
            data: [44, 65, 74, 86, 70, 85, 92, 56, 75, 84, 66, 50]
          }

        ],
        textStyle: {
          color: '#666',
          fontSize: 12
        }
      }
    },
    bloodTrendOption () {
      return {
        title: {
          text: '广场舞30min',
          textStyle: {
            color: '#666',
            fontSize: 12,
            align: 'center',
            fontWeight: 'normal'
          },
          left: '40%'
        },
        tooltip: { // 提示框组件
          trigger: 'item'
          // trigger: 'axis'
        },
        axisPointer: {
          link: [{
            xAxisIndex: 'all'
          }],
          lineStyle: {
            color: '#fff',
            width: 0
          }
        },
        grid: { // 直角坐标系内绘图网格
          show: false,
          top: '30px',
          width: 'auto',
          height: 'auto'
        },
        xAxis: { // 直角坐标系grid的x轴
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            interval: 0,  // 显示x轴数据
            showMinLabel: true,
            showMaxLabel: true,
            align: 'left',
            rotate: 330
          },
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisTick: {
            show: false
          },
          // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']
        },
        yAxis: { // 直角坐标系grid的y轴
          type: 'value',
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#999'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {  // y轴网格显示
            show: true
          },
          nameTextStyle: { // 坐标轴名样式
            color: '#666',
            fontSize: 12,
            align: 'left'
          },
          boundaryGap: true,
          splitNumber: 3,  // 坐标轴分割段数
          minInterval: 40, // 自动计算的坐标轴最小间隔大小。例如可以设置成1保证坐标轴分割刻度显示成整数。
          data: ['0', '120', '140', '180']
        },
        series: [
          {
            name: '舒张压',
            type: 'line',
            smooth: true,
            smoothMonotone: 'x',
            tooltip: { // 提示框组件
              snap: true,
              formatter: '{c}',
              backgroundColor: '#81cefc',
              textStyle: {
                color: '#fff',
                fontSize: 12
              },
              position: (point) => {
                point[0] -= 10
                point[1] -= 40
                return point
              }
            },
            lineStyle: {
              normal: {
                width: 2,
                color: '#8ecefc'
              }
            },
            itemStyle: {
              normal: {
                color: '#8ecefc'
              }
            },
            areaStyle: {
              normal: {
                color: '#e6f5fe',
                origin: 'auto',
                shadowColor: '#e6f5fe'
              }
            },
            data: [44, 65, 74, 86, 70, 85, 92, 56, 75, 84, 66, 50]
          },
          {
            name: '收缩压',
            type: 'line',
            smooth: true,
            smoothMonotone: 'x',
            tooltip: { // 提示框组件
              snap: true,
              formatter: '{c}',
              backgroundColor: '#7cedc4',
              textStyle: {
                color: '#fff',
                fontSize: 12
              },
              position: (point) => {
                point[0] -= 10
                point[1] += 25
                return point
              }
            },
            lineStyle: {
              normal: {
                width: 2,
                color: '#7cedc4'
              }
            },
            itemStyle: {
              normal: {
                color: '#7cedc4'
              }
            },
            areaStyle: {
              normal: {
                color: '#def3f2',
                origin: 'auto'
              }
            },
            data: [ 34, 55, 54, 76, 60, 75, 72, 16, 55, 74, 36, 10 ]
          }

        ],
        textStyle: {
          color: '#666',
          fontSize: 12
        }
      }
    },
    // 整理后
    // 日期选择
    updateBehaviourChecked (index) {
      // let vm = this
      this.bloodAndBehaviourDate.forEach(item => {
        item.isChecked = false
      })
      this.bloodAndBehaviourDate[index].isChecked = true
      this.behaviourChecked = index
      this.updateBehaviourData(index)
    },
    updateBehaviourData (index) {
      let vm = this
      let params = {
        'userId': vm.sickID,
        'adminHospitalId': vm.hospitalId,
        'bpMeasureTime': vm.bpMeasureTime || ''
      }
      this.bloodAndBehaviourData.date = []
      this.bloodAndBehaviourData.avgSystolic = []
      this.bloodAndBehaviourData.avgDiastolic = []
      if (index === 0) {
        this.$axios(bloodheighSickDataApi(params, 1))
        .then(res => {
          res.data.data.forEach((item, inx) => {
            if (!item.description) {
              item.description = 0
            }

            this.$set(this.bloodAndBehaviourData.date, inx, item.description)
            this.$set(this.bloodAndBehaviourData.avgSystolic, inx, item.avgSystolic)
            this.$set(this.bloodAndBehaviourData.avgDiastolic, inx, item.avgDiastolic)

            if (inx === 0) {
              this.$set(this.chartA, 'date', item.description)
            }
            // this.bloodAndBehaviourData.date.push(item.description)
            // this.bloodAndBehaviourData.avgSystolic.push(item.avgSystolic)
            // this.bloodAndBehaviourData.avgDiastolic.push(item.avgDiastolic)
            if (!item.avgBehaveScore) {
              item.avgBehaveScore = 0
            }
            this.$set(this.bloodAndBehaviourData.avgBehaveScore, inx, item.avgBehaveScore)
            // this.bloodAndBehaviourData.avgBehaveScore.push(item.avgBehaveScore)
            let bloodBehaviourBlood = echarts.init(document.getElementById('bloodBehaviourBlood'))
            bloodBehaviourBlood.setOption(this.bloodBehaviourBloodOption())
          })
        })
      }
      if (index === 1) {
        this.$axios(bloodheighSickDataApi(params, 7))
        .then(res => {
          res.data.data.forEach(item => {
            this.bloodAndBehaviourData.date.push(item.description)
            this.bloodAndBehaviourData.avgSystolic.push(item.avgSystolic)
            this.bloodAndBehaviourData.avgDiastolic.push(item.avgDiastolic)
            if (!item.avgBehaveScore) {
              item.avgBehaveScore = 0
            }
            this.bloodAndBehaviourData.avgBehaveScore.push(item.avgBehaveScore)
            let bloodBehaviourBlood = echarts.init(document.getElementById('bloodBehaviourBlood'))
            bloodBehaviourBlood.setOption(this.bloodBehaviourBloodOption())
          })
        })
      }
      if (index === 2) {
        this.$axios(bloodheighSickDataApi(params, 30))
        .then(res => {
          res.data.data.forEach(item => {
            this.bloodAndBehaviourData.date.push(item.description)
            this.bloodAndBehaviourData.avgSystolic.push(item.avgSystolic)
            this.bloodAndBehaviourData.avgDiastolic.push(item.avgDiastolic)
            if (!item.avgBehaveScore) {
              item.avgBehaveScore = 0
            }
            this.bloodAndBehaviourData.avgBehaveScore.push(item.avgBehaveScore)
            let bloodBehaviourBlood = echarts.init(document.getElementById('bloodBehaviourBlood'))
            bloodBehaviourBlood.setOption(this.bloodBehaviourBloodOption())
          })
        })
      }
    },
    updateBehaviourRateDate (date) {
      let vm = this
      // let date = ''
      let params = {
        'userId': vm.sickID,
        'adminHospitalId': vm.hospitalId,
        'bpMeasureTime': vm.bpMeasureTime || ''
      }
      this.$axios(updateBehaviourRateApi(params, this.behaviourChecked, date))
      .then(res => {
        console.log(res)
        this.BehaviourRate = res.data.data
      })
    },
    updatebloodTrendChecked (index) {
      this.bloodTrendDate.forEach(item => {
        item.isChecked = false
      })
      this.bloodTrendDate[index].isChecked = true
      this.bloodTrendChecked = index
      this.updatebloodTrendData(index, this.statusArr)
    },
    // updateDate (date, index) {
    //   this.checkDate.forEach(item => {
    //     item.isChecked = false
    //   })
    //   this.checkDate[index].isChecked = true
    //   this.updatebloodTrendData(index, this.statusArr)
    // },
    changeStatus (index) {
      let arr = []
      this.status[index].default = !this.status[index].default
      this.status.forEach(item => {
        if (item.default) {
          arr.push(item.value)
        }
      })
      this.statusArr = arr.join(',')
      this.updatebloodTrendData(this.bloodTrendChecked, this.statusArr)
    },
    updatebloodTrendData (index, status) {
      let vm = this
      let params = {
        'userId': vm.sickID,
        'adminHospitalId': vm.hospitalId,
        'bpMeasureTime': this.statusArr || ''
      }
      // let bloodTrend = echarts.init(document.getElementById('bloodTrend'))
      // bloodTrend.setOption(this.bloodTrendOption())
      if (index === 0) {
        this.$axios(bloodheighSickDataApi(params, 0))
      }
      if (index === 1) {
        this.$axios(bloodheighSickDataApi(params, 1))
      }
      if (index === 2) {
        this.$axios(bloodheighSickDataApi(params, 7))
      }
      if (index === 3) {
        this.$axios(bloodheighSickDataApi(params, 30))
      }
    }
  },
  mounted () {
    this.updatebloodTrendChecked(0)
    this.dataIndex = 0
    let vm = this
    let params = {
      'userId': vm.sickID,
      'adminHospitalId': vm.hospitalId,
      'bpMeasureTime': vm.bpMeasureTime || ''
    }
    this.$axios(bloodheighSickDataApi(params, 1))
    .then(res => {
      let date = res.data.data[0].description
      this.updateBehaviourRateDate(date)
    })
    this.updateBehaviourChecked(0)
    this.updateBehaviourData(0)
    let bloodBehaviourBlood = echarts.init(document.getElementById('bloodBehaviourBlood'))
    bloodBehaviourBlood.setOption(this.bloodBehaviourBloodOption())
    let bloodTrend = echarts.init(document.getElementById('bloodTrend'))
    bloodTrend.setOption(this.bloodTrendOption())
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
  .chart{
    padding: 0px 24px 0px 24px;
  }
  .check-date{
    padding: 20px 0 20px 24px;
  }
  .check-date-btn{
    border:none;
    background-color:#fff;
    cursor: pointer;
    font-size:18px;
    color:#666;
    width:64px;
    height: 36px;
    outline:none;
  }
  .check-status{
    padding: 0px 0 20px 24px;
    font-size: 14px;
    color: #666;
  }
  .check-status span{
    display: inline-block;
    /* margin-right: 10px; */
  }
  .checked{
    background-color:#1991fc;
    color:#fff;
    border-radius:2px;
  }
  table{
    /* height: 200px; */
    border:1px solid #eaeaea;
    background-color: #fff;
    text-align: center;
    vertical-align: middle;
    width: 100%;
  }
  table th{
    border:1px solid #eaeaea;
    padding: 15px 0;
    text-align: center;
    vertical-align: middle;
    font-size: 14px;
    color: #041421;
  }
  table td{
    border:1px solid #eaeaea;
    padding: 15px 0;
    text-align: center;
    vertical-align: middle;
  }
  .red-text{
    color:#e87070;
  }
  table p{
    font-size: 14px;
    color: #666;
    margin: 0;
    padding: 0;
    padding-bottom: 10px;
  }
  .table{
    height: 250px;
    padding-top: 40px;
  }
  .blood-cover{
    margin-bottom: 8px;
  }
  .check-all-btn{
    outline: none;
    border: none;
    background-color: #fff;
    color: #666;
    cursor: pointer;
    font-size: 14px;
  }
  .status-span{
    margin-right: 2px;
    margin-bottom: 5px;
  }
  button{
    padding: 0;
    vertical-align: baseline;
  }
  .check-all-span{
    margin-right: 30px;
  }
  .check-all-btn-icon{
    display: inline-block;
    position: relative;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 20px;
    height: 20px;
    background-color: #fff;
    vertical-align: middle;
    padding: 0;
  }
  .check-all-btn-icon-active{
    display: inline-block;
    position: relative;
    content: "";
    width: 20px; 
    height: 20px;  
    vertical-align: middle;
    background: url('./../../../诊所-高血压/hospitalIcon/诊所-icon-44.png')
  }
  .label-right{
    margin-right: 20px;
    width: 60px;
  }
  .blood-trend-item{
    font-size: 14px;
    color: #666;
    background-color: #f4f6f9;
    height: 80px;
    margin:10px 10px 0 0;
    width: 150px;
    padding: 10px;
    float: left;
  }
  .blood-trend-item p{
    padding-top:5px;
    color: #666;
  }
  .blood-trend-item p:nth-child(1){
    font-size: 24px;
    color:#1991fc;
  }
  .danger-text{
    color:#e87070 !important;
  }
  .float-box{
    float: left;
  }
  .checked-kaluli{
    margin-top: 80px;
  }
  .checked-score{
    margin-top:10px;
  }
</style>
