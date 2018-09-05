<template>
  <div>
    <!-- 血压趋势 -->
    <div class="margin-bottom">
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
          <span>测量状态统计：</span>
          <span class="status-span">
            <f-button
            :width="75"
            :height="24"
            v-for="(item,index) in statusType.move"
            :key="item.label"
            :isChecked="item.status"
            @checked="statusTypeChange('move',index)">
            {{item.label}}
            </f-button>
          </span>
          <span>用药效果统计：</span>
          <span>
            <f-button
            :width="90"
            :height="24"
            v-for="(item,index) in statusType.medicine"
            :key="item.label"
            :isChecked="item.status"
            @checked="statusTypeChange('medicine',index)">
            {{item.label}}
            </f-button>
          </span>

        </div>
        <div>
          <el-row>
            <div class="flex">
              <div class="flex widthone">
                <div class="flex-btn-left">
                  <el-button v-show="showtrendBtn" :disabled="trendBtnNext" @click="bloodTrendNext" icon="el-icon-arrow-left" type="text" :style="{'font-size':'28px','color':'#999' ,'background':'#eaeaea'}"></el-button>
                </div>
                <div class="chart-min-width">
                  <div id='bloodTrend' :style="{width:'auto',height:'300px'}"></div>
                </div>
                <div class="flex-btn">
                  <el-button v-show="showtrendBtn" :disabled="trendBtnPre" @click="bloodTrendPer" icon="el-icon-arrow-right" type="text" :style="{'font-size':'28px','color':'#999','background':'#eaeaea'}"></el-button>
                </div>
              </div>
              <div>
                <div class="blood-trend-right-text">
                  <span>{{tipDate}}</span>
                </div>
                <div class="blood-trend-right">
                  <div class="blood-trend-item totalbg">
                    <p>{{this.bloodTrendState.total}}</p>
                    <p>总测量次数</p>
                  </div>
                  <div class="blood-trend-item normalbg">
                    <p>{{this.bloodTrendState.normal}}</p>
                    <p>正常偏高次数</p>
                    <p>121/81~139/89</p>
                  </div>
                </div>
                <div class="blood-trend-right">
                  <div class="blood-trend-item heighbg">
                    <p>{{this.bloodTrendState.heigh}}</p>
                    <p>高血压次数</p>
                    <p>140/90~179/109</p>
                  </div>
                  <div class="blood-trend-item dangerbg">
                    <p class="danger-text">{{this.bloodTrendState.danger}}</p>
                    <p>危险次数</p>
                    <p>>179/109</p>
                  </div>
                </div>
              </div>
            </div>
          </el-row>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import {dateFromWeek, dateFormat} from '@/untils/date'
import {bloodheighSickDataApi, updatebloodTrendStateApi} from '@/api/components/BloodheighSickcard/bloodCover'
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
      showtrendBtn: true,
      // 是否全选状态
      // ischeckAll: true,
      // 血压趋势 状态 按钮数据
      statusType: {
        move: [
          {
            label: '静止',
            value: 1,
            status: false
          },
          {
            label: '运动',
            value: 2,
            status: false
          },
          {
            label: '情绪波动',
            value: 3,
            status: false
          }
        ],
        medicine: [
          {
            label: '未用药',
            value: 1,
            status: false
          },
          {
            label: '服药2小时内',
            value: 2,
            status: false
          },
          {
            label: '服药2小时后',
            value: 3,
            status: false
          }

        ]
      },
      // 血压趋势 日期选择按钮状态
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
      dataIndex: 0,  // 初始化 选择域
      // chartA: {date: ''},
      // 血压趋势 当前选择的日期按钮
      bloodTrendChecked: null,
      // 当前选择的状态
      statusArr: '',
      bpMeasureTime: '',
      bpMeasureState: '',
      // 血压趋势 图表数据
      bloodTrendData: {
        date: [],
        week: [],
        systolic: [],
        diastolic: [],
        bptype: [],
        pages: 1,
        pageNum: 1,
        index: 0,
        currentPage: 1
      },
      // 当前选择的图表时间戳
      bloodTrendIndex: 0,
      // 血压趋势 表格数据
      bloodTrendState: {
        total: '',
        normal: '',
        heigh: '',
        danger: ''
      },
      trendBtnPre: true,
      trendBtnNext: true,
      lastBloodTrendChecked: null,
      lastaxisValue: null,
      lastdataIndex: null,
      lastbpMeasureTime: '',
      lastbpMeasureState: '',
      showtip: true,
      tipDate: ''
    }
  },
  methods: {
    bloodTrendOption (start, end) {
      let vm = this
      let zoomstart = 0
      let zoomend = 100
      let x1 = ''
      if (start) {
        zoomstart = start
      }
      if (end) {
        zoomend = end
      }
      return {
        title: {
          // text: '广场舞30min',
          textStyle: {
            color: '#666',
            fontSize: 12,
            align: 'center',
            fontWeight: 'normal'
          },
          left: '40%'
        },
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: [0],
            // disabled: false,
            show: false,
            realtime: true,
            start: zoomstart,
            end: zoomend,
            zoomlock: true,
            minValueSpan: 10,
            maxValueSpan: 10,
            throttle: 500,
            filterMode: 'empty',
            zoomOnMouseWheel: false

          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false
          },
          hideDelay: 2000,
          // alwaysShowContent: vm.showtip,
          backgroundColor: 'rgba(250,250,250,0.7)',
          textStyle: {
            color: '#000'
          },
          // triggerOn: 'click',
          triggerOn: 'mousemove|click',
          formatter: function (a) {
            // if (a[0].dataIndex === vm.bloodTrendIndex) {
              // vm.updatebloodTrendState(a[0].axisValue, a[0].dataIndex)
            // } else {

            if (vm.bloodTrendChecked !== 0) {
              if (vm.bloodTrendChecked !== vm.lastBloodTrendChecked || vm.lastaxisValue !== a[0].axisValue || vm.lastdataIndex !== a[0].dataIndex || vm.lastbpMeasureTime !== vm.bpMeasureTime || vm.lastbpMeasureState !== vm.bpMeasureState) {
                if (vm.bloodTrendChecked === 2) {
                  vm.updatebloodTrendState(vm.bloodTrendData.week[a[0].dataIndex], a[0].dataIndex)
                } else {
                  vm.updatebloodTrendState(a[0].axisValue, a[0].dataIndex)
                }
                vm.lastBloodTrendChecked = vm.bloodTrendChecked
                vm.lastaxisValue = a[0].axisValue
                vm.lastdataIndex = a[0].dataIndex
                vm.lastbpMeasureTime = vm.bpMeasureTime
                vm.lastbpMeasureState = vm.bpMeasureState
                vm.tipDate = a[0].axisValue
                // console.log(a)
              }
              vm.bloodTrendIndex = a.dataIndex
            }
            return (
                a[0]['axisValueLabel'] + '<br>' +
                '<span style="display: inline-block; margin-right: 5px; border-radius: 10px; width: 9px; height: 9px; background-color: ' + a[0]['color'] + '"></span>' +
                a[1]['seriesName'] + ': ' + a[1]['value'] + '<br>' +
                '<span style="display: inline-block; margin-right: 5px; border-radius: 10px; width: 9px; height: 9px; background-color: ' + a[1]['color'] + '"></span>' +
                a[0]['seriesName'] + ': ' + a[0]['value']
            )
          }
        },
        axisPointer: {
          link: [{
            xAxisIndex: 'all'
          }],
          triggerTooltip: true,
          lineStyle: {
            color: '#fff',
            width: 0
          }
        },
        grid: { // 直角坐标系内绘图网格
          show: false,
          top: '30px',
          width: 'auto',
          height: 'auto',
          bottom: '50',
          left: '95',
          right: '80'
        },
        xAxis: { // 直角坐标系grid的x轴
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            interval: 0, // 显示x轴数据
            showMinLabel: true,
            showMaxLabel: true,
            align: 'center',
            rotate: 0,
            formatter: function (val) {
              let value
              let time
              if (val.length > 11) {
                time = val.slice(5, 10)
                value = val.slice(11)
              } else {
                time = val.slice(0, 4)
                value = val.slice(5)
              }
              if (vm._.eq(time, x1)) {
                x1 = time
                return value
              } else {
                let arr = []
                arr.push(value)
                arr.push(time)
                x1 = time
                return arr.join('\n')
              }
            }
              // rotate: 330
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
          data: this.bloodTrendData.date
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
            // smooth: true,
            // smoothMonotone: 'x',
            // tooltip: { // 提示框组件
            //   // snap: true,
            //   formatter: '{c}',
            //   trigger: 'item',
            //   // formatter: function (a) {
            //   //   console.log(a)
            //   // },
            //   backgroundColor: '#81cefc',
            //   textStyle: {
            //     color: '#fff',
            //     fontSize: 12
            //   },
            //   position: (point) => {
            //     point[0] -= 10
            //     point[1] += 25
            //     return point
            //   }

            // },
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: {
              normal: {
                width: 2,
                color: '#32b77a'
              }
            },
            itemStyle: {
              normal: {
                color: function (param) {
                  let index = vm.bloodTrendData.bptype[param.dataIndex]
                  return vm.computeDangerColor(index)
                }
              }
            },
            // areaStyle: {
            //   normal: {
            //     color: '#e6f5fe',
            //     origin: 'auto',
            //     shadowColor: '#e6f5fe'
            //   }
            // },
            data: this.bloodTrendData.diastolic
          },
          {
            name: '收缩压',
            type: 'line',
            // smooth: true,
            // smoothMonotone: 'x',
            // tooltip: { // 提示框组件
            //   // snap: true,
            //   trigger: 'item',
            //   formatter: '{c}',
            //   backgroundColor: '#7cedc4',
            //   textStyle: {
            //     color: '#fff',
            //     fontSize: 12
            //   },
            //   position: (point) => {
            //     point[0] -= 10
            //     point[1] -= 40
            //     return point
            //   }
            // },
            lineStyle: {
              normal: {
                width: 2,
                color: '#228ec4'
              }
            },
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
              normal: {
                color: function (param) {
                  let index = vm.bloodTrendData.bptype[param.dataIndex]
                  return vm.computeDangerColor(index)
                }
              }
            },
            // areaStyle: {
            //   normal: {
            //     color: '#def3f2',
            //     origin: 'auto'
            //   }
            // },
            // data: [ 34, 55, 54, 76, 60, 75, 72, 16, 55, 74, 36, 10 ]
            data: this.bloodTrendData.systolic
          }

        ],
        textStyle: {
          color: '#666',
          fontSize: 12
        }
      }
    },
    updatebloodTrendChecked (index) {
      if (index === 0) {
        this.showtrendBtn = false
      } else {
        this.showtrendBtn = true
      }
      this.bloodTrendDate.forEach(item => {
        item.isChecked = false
      })
      this.bloodTrendDate[index].isChecked = true
      this.bloodTrendChecked = index
      this.updatebloodTrendData(index, this.statusArr)
      // let bloodTrend = echarts.init(document.getElementById('bloodTrend'))
      // bloodTrend.dispatchAction({
      //   type: 'hideTip'
      // })
      console.log('index, this.statusArr', index, this.statusArr)
    },
    // 0最近 1日  2周  3月
    updatebloodTrendData (index, status) {
      let vm = this
      let params = {
        'userId': vm.sickID,
        'adminHospitalId': vm.hospitalId,
        'bpMeasureTime': this.bpMeasureTime || '',
        'bpMeasureState': this.bpMeasureState || ''
      }
      let bloodTrend = echarts.init(document.getElementById('bloodTrend'))
      // this.$nextTick(function () {
      //   bloodTrend.dispatchAction({
      //     type: 'hideTip'
      //   })
      // })
      vm.tipDate = ''
      if (index === 0) {
        vm.bloodTrendData.pageNum = 1
        this.$axios(bloodheighSickDataApi(params, 0))
        .then(res => {
          this.bloodTrendData.date = []
          this.bloodTrendData.systolic = []
          this.bloodTrendData.diastolic = []
          this.bloodTrendData.bptype = []
          console.log(res.data.data, 'lllll')
          res.data.data.forEach((item, index) => {
            this.bloodTrendData.date.push(dateFormat(item.measureTime, 0))
            this.bloodTrendData.systolic.push(item.systolic)
            this.bloodTrendData.diastolic.push(item.diastolic)
            this.bloodTrendData.bptype.push(item.bpType)
          })
          this.bloodTrendData.date = this.bloodTrendData.date.reverse()
          this.bloodTrendData.systolic = this.bloodTrendData.systolic.reverse()
          this.bloodTrendData.diastolic = this.bloodTrendData.diastolic.reverse()
          this.bloodTrendData.bptype = this.bloodTrendData.bptype.reverse()
          this.bloodTrendData.pages = 1
          this.bloodTrendData.currentPage = 1
          let position = this.computeStartend(vm.bloodTrendData.currentPage, this.bloodTrendData.pageNum)
          bloodTrend.setOption(this.bloodTrendOption(position.start, 100))
          this.bloodTrendState.total = 1
          console.log('最近bptype', this.bloodTrendData.bptype)
          // if (this.bloodTrendData.bptype[0] === 2) {
          //   this.bloodTrendState.normal = 1
          //   this.bloodTrendState.heigh = 0
          //   this.bloodTrendState.danger = 0
          // }
          // if (this.bloodTrendData.bptype[0] === 3 || this.bloodTrendData.bptype[0] === 4) {
          //   this.bloodTrendState.normal = 0
          //   this.bloodTrendState.heigh = 1
          //   this.bloodTrendState.danger = 0
          // }
          // if (this.bloodTrendData.bptype[0] === 5) {
          //   this.bloodTrendState.normal = 0
          //   this.bloodTrendState.heigh = 0
          //   this.bloodTrendState.danger = 1
          // }
          if (this.bloodTrendData.bptype.length === 0) {
            this.bloodTrendState.total = 0
            this.bloodTrendState.normal = 0
            this.bloodTrendState.heigh = 0
            this.bloodTrendState.danger = 0
          } else {
            let n = 0
            let h = 0
            let d = 0
            let t = 0
            this.bloodTrendData.bptype.forEach(item => {
              if (item === 2) {
                n++
                t++
              }
              if (item === 3 || item === 4) {
                h++
                t++
              }
              if (item === 5) {
                d++
                t++
              }
            })
            this.bloodTrendState.total = t
            this.bloodTrendState.normal = n
            this.bloodTrendState.heigh = h
            this.bloodTrendState.danger = d
            console.log('最近bptypeshuju', this.bloodTrendState.total, this.bloodTrendState.normal, this.bloodTrendState.heigh, this.bloodTrendState.danger)
          }
          // this.updatebloodTrendState()
          if (res.data.data) {
            if (res.data.data.length !== 0) {
              // this.updatebloodTrendState(res.data.data[0].measureTime, 0)
              // this.updatebloodTrendState(false, false, true)
            }
          }
        })
      }
      if (index === 1) {
        vm.bloodTrendData.pageNum = 1
        this.$axios(bloodheighSickDataApi(params, 1))
        .then(res => {
          this.bloodTrendData.date = []
          this.bloodTrendData.systolic = []
          this.bloodTrendData.diastolic = []
          this.bloodTrendData.bptype = []
          res.data.data.forEach((item, index) => {
            this.$set(this.bloodTrendData.date, index, item.description)
            this.$set(this.bloodTrendData.systolic, index, item.avgSystolic)
            this.$set(this.bloodTrendData.diastolic, index, item.avgDiastolic)
            this.$set(this.bloodTrendData.bptype, index, item.bpType)
          })
          this.bloodTrendData.date = this.bloodTrendData.date.reverse()
          this.bloodTrendData.systolic = this.bloodTrendData.systolic.reverse()
          this.bloodTrendData.diastolic = this.bloodTrendData.diastolic.reverse()
          this.bloodTrendData.bptype = this.bloodTrendData.bptype.reverse()
          this.bloodTrendData.currentPage = 1
          this.$set(this.bloodTrendData, 'pages', res.data.pages)
          console.log('bloodTrendData', this.bloodTrendData)
          let position = this.computeStartend(vm.bloodTrendData.currentPage, this.bloodTrendData.pageNum)
          bloodTrend.setOption(this.bloodTrendOption(position.start, 100))
          // bloodTrend.setOption(this.bloodTrendOption())
          if (res.data.data) {
            if (res.data.data.length !== 0) {
              // this.updatebloodTrendState(res.data.data[0].description)
              this.updatebloodTrendState(false, false, true)
            }
          }
        })
      }
      if (index === 2) {
        vm.bloodTrendData.pageNum = 1
        this.$axios(bloodheighSickDataApi(params, 2))
        .then(res => {
          this.bloodTrendData.date = []
          this.bloodTrendData.week = []
          this.bloodTrendData.systolic = []
          this.bloodTrendData.diastolic = []
          this.bloodTrendData.bptype = []
          res.data.data.forEach((item, index) => {
            this.computeYearWeek(item.yearWeek)
            let week = this.computeYearWeek(item.yearWeek)[0] + '-' + this.computeYearWeek(item.yearWeek)[1] + '周'

            this.bloodTrendData.date.push(week)
            this.bloodTrendData.week.push(item.yearWeek)
            this.$set(this.bloodTrendData.bptype, index, item.bpType)
            this.$set(this.bloodTrendData.systolic, index, item.avgSystolic)
            this.$set(this.bloodTrendData.diastolic, index, item.avgDiastolic)
          })
          this.bloodTrendData.date = this.bloodTrendData.date.reverse()
          this.bloodTrendData.systolic = this.bloodTrendData.systolic.reverse()
          this.bloodTrendData.diastolic = this.bloodTrendData.diastolic.reverse()
          this.bloodTrendData.bptype = this.bloodTrendData.bptype.reverse()
          this.bloodTrendData.week = this.bloodTrendData.week.reverse()
          this.bloodTrendData.currentPage = 1
          this.$set(this.bloodTrendData, 'pages', res.data.pages)
          let position = this.computeStartend(vm.bloodTrendData.currentPage, this.bloodTrendData.pageNum)
          bloodTrend.setOption(this.bloodTrendOption(position.start, 100))
          if (res.data.data) {
            if (res.data.data.length !== 0) {
              this.updatebloodTrendState(false, false, true)
            }
          }
        })
      }
      if (index === 3) {
        vm.bloodTrendData.pageNum = 1
        this.$axios(bloodheighSickDataApi(params, 3))
        .then(res => {
          this.bloodTrendData.date = []
          this.bloodTrendData.systolic = []
          this.bloodTrendData.diastolic = []
          this.bloodTrendData.bptype = []
          res.data.data.forEach((item, index) => {
            this.$set(this.bloodTrendData.date, index, item.description)
            this.$set(this.bloodTrendData.systolic, index, item.avgSystolic)
            this.$set(this.bloodTrendData.diastolic, index, item.avgDiastolic)
            this.$set(this.bloodTrendData.bptype, index, item.bpType)
          })
          this.bloodTrendData.date = this.bloodTrendData.date.reverse()
          this.bloodTrendData.systolic = this.bloodTrendData.systolic.reverse()
          this.bloodTrendData.diastolic = this.bloodTrendData.diastolic.reverse()
          this.bloodTrendData.bptype = this.bloodTrendData.bptype.reverse()
          this.bloodTrendData.currentPage = 1
          this.$set(this.bloodTrendData, 'pages', res.data.pages)
          let position = this.computeStartend(vm.bloodTrendData.currentPage, this.bloodTrendData.pageNum)
          bloodTrend.setOption(this.bloodTrendOption(position.start, 100))
          if (res.data.data) {
            if (res.data.data.length !== 0) {
              this.updatebloodTrendState(false, false, true)
            }
          }
        })
      }
    },
    updatebloodTrendState (date, index, showzero) {
      if (showzero) {
        this.bloodTrendState.total = 0
        this.bloodTrendState.normal = 0
        this.bloodTrendState.heigh = 0
        this.bloodTrendState.danger = 0
      } else {
        if (this.bloodTrendChecked === 0) {
          // this.bloodTrendState.total = 1
          // }
          // if (this.bloodTrendData.bptype[index] === 1) {
          //   this.bloodTrendState.normal = 0
          //   this.bloodTrendState.heigh = 0
          //   this.bloodTrendState.danger = 0
          // }
          // if (this.bloodTrendData.bptype[index] === 2) {
          //   this.bloodTrendState.normal = 1
          //   this.bloodTrendState.heigh = 0
          //   this.bloodTrendState.danger = 0
          // }
          // if (this.bloodTrendData.bptype[index] === 3 || this.bloodTrendData.bptype[index] === 4) {
          //   this.bloodTrendState.normal = 0
          //   this.bloodTrendState.heigh = 1
          //   this.bloodTrendState.danger = 0
          // }
          // if (this.bloodTrendData.bptype[index] === 5) {
          //   this.bloodTrendState.normal = 0
          //   this.bloodTrendState.heigh = 0
          //   this.bloodTrendState.danger = 1
          // }
          // if (this.bloodTrendData.bptype.length === 0) {
          //   this.bloodTrendState.total = 0
          //   this.bloodTrendState.normal = 0
          //   this.bloodTrendState.heigh = 0
          //   this.bloodTrendState.danger = 0
          // }
          // return
        }
        if (this.bloodTrendChecked === 2) {
          // date = dateFormat(date, 0, 1)
          // let yearweek = this.computeYearWeek(this.bloodTrendData.week[index])
          let yearweek = this.computeYearWeek(date)
          date = dateFromWeek(yearweek[0], yearweek[1])
        }
        let vm = this
        let params = {
          'userId': vm.sickID,
          'adminHospitalId': vm.hospitalId,
          'bpMeasureTime': this.bpMeasureTime || '',
          'bpMeasureState': this.bpMeasureState || ''
        }
        this.$axios(updatebloodTrendStateApi(params, this.bloodTrendChecked, date))
        .then(res => {
          let total = 0
          let heigh = 0
          // let a = this._.findIndex(res.data.data, function (o) {
          //   return o.id === 1
          // })
          let b = this._.findIndex(res.data.data, function (o) {
            return o.id === 2
          })
          let c = this._.findIndex(res.data.data, function (o) {
            return o.id === 3 || o.id === 4
          })
          let d = this._.findIndex(res.data.data, function (o) {
            return o.id === 5
          })
          // if (a === -1) {
          //   this.$set(this.bloodTrendState, 'normal', 0)
          // }
          if (b === -1) {
            this.$set(this.bloodTrendState, 'normal', 0)
          }
          if (c === -1) {
            this.$set(this.bloodTrendState, 'heigh', 0)
          }
          if (d === -1) {
            this.$set(this.bloodTrendState, 'danger', 0)
          }
          res.data.data.forEach(item => {
            total += item.highNum
            // if (item.id === 1) {
            //   this.$set(this.bloodTrendState, 'total', item.highNum)
            // }

            if (this._.toNumber(item.id) === 2) {
              this.$set(this.bloodTrendState, 'normal', item.highNum)
            }
            if (this._.toNumber(item.id) === 3) {
              heigh = heigh + item.highNum
              // this.$set(this.bloodTrendState, 'heigh', item.highNum)
            }
            if (this._.toNumber(item.id) === 4) {
              heigh = heigh + item.highNum
              // this.$set(this.bloodTrendState, 'heigh', item.highNum)
            }
            this.$set(this.bloodTrendState, 'heigh', heigh)
            if (this._.toNumber(item.id) === 5) {
              this.$set(this.bloodTrendState, 'danger', item.highNum)
            }
          })
          this.$set(this.bloodTrendState, 'total', total)
        })
      }
    },
    computeYearWeek (value) {
      let time = value
      let year
      let week
      if (!isNaN(time)) {
        year = parseInt(time.toString().substr(0, 4))
        week = parseInt(time.toString().substr(4))
      } else if (isNaN(time)) {
        time = time + ''
        year = time.substr(0, 4)
        week = time.substr(4)
      }
      let arr = [year, week]
      return arr
    },
    computeStartend (pageNum, pages) {
      let page = {
      }
      if (pageNum === 1 && pages === 1) {
        page.start = 0
        page.end = 100
      } else if (pageNum === pages) {
        page.start = 0
        page.end = parseInt((1 / pages) * 100)
      } else if (pageNum < pages) {
        page.start = parseInt(((pages - pageNum) / pages) * 100)
        page.end = parseInt(((pages - pageNum + 1) / pages) * 100)
      }
      return page
    },
    // computeStartend (pageNum, pages) {
      //   let page = {
      //   }
      //   if (pageNum === 1 && pages === 1) {
      //     page.start = 0
      //     page.end = 100
      //   } else if (pageNum === 1) {
      //     page.start = 0
      //     page.end = parseInt((pageNum / pages) * 100)
      //   } else if (pageNum < pages || pageNum === pages) {
      //     page.start = parseInt(((pageNum - 1) / pages) * 100)
      //     page.end = parseInt((pageNum / pages) * 100)
      //   }
      //   return page
    // },
    computeDangerColor (bptype) {
      let type = this._.toNumber(bptype)
      let color = ''
      switch (type) {
        case 1:
          color = '#33b2f2'// 正常
          break
        case 2:
          color = '#59d8a1'// 正常高值
          break
        case 3:
          color = '#efa13a'// 轻度
          break
        case 4:
          color = '#ff7d43' // 中度
          break
        case 5:
          color = '#f96767' // 危险
          break
        case 6:
          color = '##9ac3e4' // 低血压
          break
        case 0:
          color = '#191918'
          break
        default:
          color = '#191918'
      }
      return color
    },
    bloodTrendNext () {
      let vm = this
      if (vm.bloodTrendData.currentPage > vm.bloodTrendData.pageNum) {
        vm.bloodTrendData.currentPage = vm.bloodTrendData.pageNum
      }
      if (vm.bloodTrendData.currentPage <= vm.bloodTrendData.pages) {
        vm.bloodTrendData.currentPage ++
      }
      let bloodTrend = echarts.init(document.getElementById('bloodTrend'))
      if (vm.bloodTrendData.pageNum >= vm.bloodTrendData.pages) {
        let position = this.computeStartend(vm.bloodTrendData.pageNum, this.bloodTrendData.pageNum)
        bloodTrend.setOption(this.bloodTrendOption(position.start, position.end))
        return
      }
      vm.bloodTrendData.pageNum ++
      let params = {
        'userId': vm.sickID,
        'adminHospitalId': vm.hospitalId,
        'pageNum': vm.bloodTrendData.pageNum,
        'bpMeasureTime': this.bpMeasureTime || '',
        'bpMeasureState': this.bpMeasureState || ''

      }
      vm.$axios(bloodheighSickDataApi(params, vm.bloodTrendChecked))
      .then(res => {
        bloodTrend.showLoading(
          {
            text: '加载中...',
            color: '#1991fc',
            textColor: '#000',
            maskColor: 'rgba(255, 255, 255, 0.8)',
            zlevel: 0
          }
            )
        if (vm.bloodTrendData.pageNum <= res.data.pages) {
          if (res.data.data.length !== 0) {
            // res.data.data = res.data.data.reverse()
            res.data.data.forEach((item, index) => {
              if (!item.description) {
                item.description = 0
              }
              if (vm.bloodTrendChecked === 0) {
                // vm.bloodTrendData.date.push(item.measureTime)
                // vm.bloodTrendData.systolic.push(item.systolic)
                // vm.bloodTrendData.diastolic.push(item.diastolic)
              }
              if (vm.bloodTrendChecked === 1 || vm.bloodTrendChecked === 3) {
                vm.bloodTrendData.date.unshift(item.description)
                vm.bloodTrendData.systolic.unshift(item.avgSystolic)
                vm.bloodTrendData.diastolic.unshift(item.avgDiastolic)
                vm.bloodTrendData.bptype.unshift(item.bpType)
                // vm.bloodTrendData.date.push(item.description)
                // vm.bloodTrendData.systolic.push(item.avgSystolic)
                // vm.bloodTrendData.diastolic.push(item.avgDiastolic)
                // vm.bloodTrendData.bptype.push(item.bpType)

                // this.bloodTrendData.date = this.bloodTrendData.date.reverse()
                // this.bloodTrendData.systolic = this.bloodTrendData.systolic.reverse()
                // this.bloodTrendData.diastolic = this.bloodTrendData.diastolic.reverse()
                // this.bloodTrendData.bptype = this.bloodTrendData.bptype.reverse()
                // if (item.bpType) {
                //   this.bloodAndBehaviourData.bpType.push(item.bpType)
                // } else {
                //   this.bloodAndBehaviourData.bpType.push(0)
                // }
              }
              if (vm.bloodTrendChecked === 2) {
                vm.computeYearWeek(this._.toString(item.yearWeek))
                let week = vm.computeYearWeek(this._.toString(item.yearWeek))[0] + '-' + vm.computeYearWeek(this._.toString(item.yearWeek))[1] + '周'
                vm.bloodTrendData.date.unshift(week)
                vm.bloodTrendData.week.unshift(this._.toString(item.yearWeek))
                vm.bloodTrendData.systolic.unshift(item.avgSystolic)
                vm.bloodTrendData.diastolic.unshift(item.avgDiastolic)
                vm.bloodTrendData.bptype.unshift(item.bpType)

          //         this.bloodTrendData.date = this.bloodTrendData.date.reverse()
          // this.bloodTrendData.systolic = this.bloodTrendData.systolic.reverse()
          // this.bloodTrendData.diastolic = this.bloodTrendData.diastolic.reverse()
          // this.bloodTrendData.bptype = this.bloodTrendData.bptype.reverse()
                // if (item.bpType) {
                //   this.bloodAndBehaviourData.bpType.push(item.bpType)
                // } else {
                //   this.bloodAndBehaviourData.bpType.push(0)
                // }
              }
              let position = vm.computeStartend(vm.bloodTrendData.currentPage, vm.bloodTrendData.pageNum)
              console.log('soureposition', vm.bloodTrendData.currentPage, vm.bloodTrendData.pageNum)
              // bloodTrend.setOption(vm.bloodTrendOption(0, position.start))
              bloodTrend.setOption(vm.bloodTrendOption(position.start, position.end))
              console.log('position', position.start, position.end)
              vm.bloodTrendData.pages = res.data.pages
              vm.bloodTrendData.pageNum = res.data.pageNum
            })
          }
        }
        // bloodTrend.setOption(vm.bloodTrendOption(50, 85))
        bloodTrend.hideLoading()
      })
    },
    bloodTrendPer () {
      let vm = this
      let bloodTrend = echarts.init(document.getElementById('bloodTrend'))
      this.bloodTrendData.currentPage --
      if (this.bloodTrendData.currentPage < 1) {
        this.bloodTrendData.currentPage = 1
      }
      let position = vm.computeStartend(vm.bloodTrendData.currentPage, vm.bloodTrendData.pageNum)
      console.log(position, vm.bloodTrendData.currentPage, vm.bloodTrendData.pageNum)
      bloodTrend.setOption(vm.bloodTrendOption(position.start, position.end))
      // console.log('soureposition', vm.bloodTrendData.currentPage, vm.bloodTrendData.pageNum)
      // console.log('position', position.start, position.end)
      // let bloodBehaviourBlood = echarts.init(document.getElementById('bloodBehaviourBlood'))
      // let position = this.computeStartend(this.bloodTrendData.currentPage, this.bloodTrendData.pageNum)
      // bloodBehaviourBlood.setOption(this.bloodBehaviourBloodOption(position.start, position.end))
    },
    // 状态选择move测量状态统计,medicine用药效果统计
    statusTypeChange (type, index) {
      this.statusType[type].forEach((item, i) => {
        if (i === index) {
          item.status = !item.status
        } else {
          item.status = false
        }
      })
      console.log('选择状态', type, index, this.statusType)
      this.tipDate = ''
    }
  },
  watch: {
    bloodTrendData: {
      handler: function (val) {
        if (val.pages < 2) {
          this.trendBtnNext = true
          this.trendBtnPre = true
        } else {
          if (val.currentPage === val.pages) {
            this.trendBtnNext = true
          } else {
            this.trendBtnNext = false
          }
          if (val.currentPage !== 1) {
            this.trendBtnPre = false
          } else {
            this.trendBtnPre = true
          }
        }
      },
      deep: true,
      immediate: true
    },
    statusType: {
      handler: function (val) {
        let a = false
        let b = false
        this.statusType.medicine.forEach(item => {
          if (item.status) {
            this.bpMeasureTime = item.value
            a = true
          }
        })
        this.statusType.move.forEach(item => {
          if (item.status) {
            this.bpMeasureState = item.value
            b = true
          }
        })
        if (!a) {
          this.bpMeasureTime = ''
        }
        if (!b) {
          this.bpMeasureState = ''
        }
        this.updatebloodTrendData(this.bloodTrendChecked)
      },
      deep: true
      // immediate: true
    }
  },
  mounted () {
    this.updatebloodTrendChecked(0)
    this.dataIndex = 0
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
    box-sizing: border-box;
    line-height: 1;
    white-space: nowrap;
    border:1px solid #fff;
    background-color:#fff;
    cursor: pointer;
    font-size:18px;
    color:#666;
    width:64px;
    height: 36px;
    outline:none;
  }
  .check-date-btn:hover{
    opacity: 0.9;
    /* box-sizing: border-box;
    line-height: 1;
    white-space: nowrap;
    border:1px solid #fff;
    background-color:#fff;
    cursor: pointer;
    font-size:18px;
    color:#666;
    width:64px;
    height: 36px;
    outline:none; */
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
    box-sizing: border-box;
    line-height: 1;
    white-space: nowrap;
    background-color:#1991fc;
    border-color: #1991fc;
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
    margin-top: 8px;
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
    margin-right: 8px;
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
    background: url('~icon/hospital-icon-44.png')
  }
  .label-right{
    margin-right: 20px;
    width: 60px;
  }
  .blood-trend-item{
    font-size: 14px;
    color: rgb(250, 245, 245);
    /* background-color: #f4f6f9; */
    height: 80px;
    margin:10px 10px 0 0;
    width: 130px;
    padding: 10px;
    float: left;
  }
  .blood-trend-item p{
    padding-top:5px;
    /* color: #666; */
  }
  .blood-trend-item p:nth-child(1){
    font-size: 24px;
    /* color:#1991fc; */
  }
  .danger-text{
    /* color:#e87070 !important; */
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
  .bloodTrend-chart{
    /* overflow: hidden; *zoom: 1; */
    /* position: relative; */
    display: flex;
  }
  .blood-trend-left{
    /* float: left; */
    /* max-width: 800px; */
    /* width: 100%; */
    /* margin-right: 450px; */
    /* display: flex; */
    /* justify-content: flex-start; */
    width: 100%;
  }
  .wrap{
    height: 100%;
    padding-bottom:20px;
    /* position: relative; */
  }
  .blood-trend-right{
    /* display: table-cell; */
    /* float: right; */
    /* position: relative; */
    /* height: 300px; */
    width: 350px;
    /* width: 100%; */
    /* margin: 0 auto; */
    padding-right: 45px;
    display: flex;
    /* flex-direction: column; */
    align-items: center;
    justify-content: space-around;
    /* flex-direction: column; */
    /* display: table-cell; */
    /* vertical-align: middle; */
    /* top:50%; */
    /* transform: translateY(-50%); */
    
    /* position: absolute; */
    /* top:0; */
    /* right: 0; */
  }
  .blood-trend-right-text span{
    display: inline-block;
    padding-left: 10px;
    font-size: 12px;
    color: #666;
  }
  .footer{
    background-color: #e87070;
    height: 10px;
  }
  .flex{
    display: flex;
    position: relative;
    flex-wrap: nowrap;
  }
  .chart-min-width{
    min-width: 100%;
  }
  .flex-btn{
    max-width: 55px;
    min-width: 55px;
    /* height: 100%; */
    position: absolute;
    bottom:50%;
    right: 0;
    z-index:99;
  }
  .flex-btn-left{
    max-width: 55px;
    min-width: 55px;
    /* height: 100%; */
    position: absolute;
    bottom:50%;
    left: 25px;
    z-index:99;
  }
  .widthone{
    width: 100%;
  }
  .totalbg{
    background-color: #33b2f2;
  }
  .normalbg{
    background-color: #59d8a1;
  }
  .heighbg{
    background-color: #efa13a;
  }
  .dangerbg{
    background-color: #f96767;
  }
  .margin-bottom{
    margin-bottom: 8px;
  }
</style>
