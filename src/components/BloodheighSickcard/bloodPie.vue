<template>
  <div class="margin-bottom">
      <!-- 血压直方图 -->
      <el-card :body-style="{ padding: '0px' }">
        <div class="card-header">
            <p class="title">血压直方图</p>
        </div>
        <div class="check-date">
          <el-row type="flex" justify="start">
            <button v-for="(item,index) in histogramChecked.date" 
            :key="item.date" 
            class="check-date-btn" 
            :class="{checked:item.isChecked}" 
            @click="isHistogramChecked(item,index)">
              {{item.date}}
            </button>
          </el-row>
        </div>
        <div id='bloodHistogram'  :style="{width:'auto',height:'425px'}"></div>
      </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
import {bloodCoverApi, histogramApi} from '@/api/components/BloodheighSickcard/report'
// import bloodHeighAverage from './bloodHeighAverage'
// import BMI from './BMI'
export default {
  props: {
    sickID: {
      default: 0
    },
    hospitalId: {
      default: 0
    }
  },
  components: {
    // bloodHeighAverage,
    // BMI
  },
  data () {
    return {
      // 血压分布时间数据
      coverChecked: {
        date: [
          {
            date: '一周',
            value: 'oneweek',
            isChecked: false
          },
          {
            date: '两周',
            value: 'twoweek',
            isChecked: false
          },
          {
            date: '一个月',
            value: 'onemonth',
            isChecked: false
          },
          {
            date: '三个月',
            value: 'threemonth',
            isChecked: false
          }
        ],
        // 选择的时间
        dateChecked: ''
      },
      // 血压分布原数据
      coverData: [],
      // 血压直方图时间数据
      histogramChecked: {
        date: [
          {
            date: '一周',
            value: 'oneweek',
            isChecked: false
          },
          {
            date: '两周',
            value: 'twoweek',
            isChecked: false
          },
          {
            date: '一个月',
            value: 'onemonth',
            isChecked: false
          },
          {
            date: '三个月',
            value: 'threemonth',
            isChecked: false
          }
        ],
        dateChecked: ''
      },
      // 血压直方图原数据
      histogramData: []
    }
  },
  methods: {
    /**
     * @param {obj} date date.value时间
     * @param {number} index 选择coverChecked的index
     * @description 血压分布时间选择
     */
    iscoverChecked (date, index) {
      this.coverChecked.date.forEach(item => {
        item.isChecked = false
      })
      this.coverChecked.date[index].isChecked = true
      this.updateCover(date.value)
    },
    // 如果是选择固定时间 date 为按钮的value
    // 如果是自定义时间段 date 为起始时间 enddate为结束时间
    /**
     * @param {string|date}  oneweek/ twoweek /onemonth /threemonth 如果有enddate 则为开始时间
     * @param {date} enddate 结束时间
     * @description 更新血压分布
     */
    updateCover (date, enddate) {
      let params = {
        'userId': this.sickID,
        'adminHospitalId': this.hospitalId
      }
      let dateParams = {
        label: '',
        value: '',
        endtime: null
      }
      let nowtime = new Date()
      // let nowtime = '2018-03-01'
      if (enddate) {
        dateParams = {
          label: '',
          value: date,
          endtime: enddate
        }
      } else {
        dateParams = {
          label: date,
          value: nowtime,
          endtime: null
        }
      }
      this.$axios(bloodCoverApi(params, dateParams))
      .then(res => {
        if (res.data.data) {
          this.coverData = []
          for (let data in res.data.data) {
            this.$set(this.coverData, data, res.data.data[data])
          }
          console.log('饼图数据', this.coverData)
          // console.log(1, res.data.data)
        }
        // let bloodCover = echarts.init(document.getElementById('bloodCover'))
        // bloodCover.setOption(this.bloodCoverOption())
      })
    },
    /**
     * @description 整理图表数据
     * @param {obj} data
     * @returns {Array}
     * */
    formatCoverData (data) {
      let vm = this
      // 如果不够6个数据 添加0数据到数组
      if (data.length !== 6) {
        let a = this._.findIndex(data, function (item) {
          return vm._.toNumber(item.bpType === 1)
        })
        let b = this._.findIndex(data, function (item) {
          return vm._.toNumber(item.bpType === 2)
        })
        let c = this._.findIndex(data, function (item) {
          return vm._.toNumber(item.bpType === 3)
        })
        let d = this._.findIndex(data, function (item) {
          return vm._.toNumber(item.bpType === 4)
        })
        let e = this._.findIndex(data, function (item) {
          return vm._.toNumber(item.bpType === 5)
        })
        let f = this._.findIndex(data, function (item) {
          return vm._.toNumber(item.bpType === 6)
        })
        if (a === -1) {
          data.splice(0, 0, {
            'bpType': 1,
            'countBest': 0
          })
        }
        if (b === -1) {
          data.splice(1, 0, {
            'bpType': 2,
            'countBest': 0
          })
        }
        if (c === -1) {
          data.splice(2, 0, {
            'bpType': 3,
            'countBest': 0
          })
        }
        if (d === -1) {
          data.splice(3, 0, {
            'bpType': 4,
            'countBest': 0
          })
        }
        if (e === -1) {
          data.splice(4, 0, {
            'bpType': 5,
            'countBest': 0
          })
        }
        if (f === -1) {
          data.splice(5, 0, {
            'bpType': 6,
            'countBest': 0
          })
        }
      }
      let arr = []
      data.forEach(item => {
        if (this._.toNumber(item.bpType) === 1) {
          arr.push({value: item.countBest, name: '正常'})
        }
        if (this._.toNumber(item.bpType) === 2) {
          arr.push({value: item.countBest, name: '正常高值'})
        }
        if (this._.toNumber(item.bpType) === 3) {
          arr.push({value: item.countBest, name: '轻度'})
        }
        if (this._.toNumber(item.bpType) === 4) {
          arr.push({value: item.countBest, name: '中度'})
        }
        if (this._.toNumber(item.bpType) === 5) {
          arr.push({value: item.countBest, name: '危险'})
        }
        if (this._.toNumber(item.bpType) === 6) {
          arr.push({value: item.countBest, name: '低血压'})
        }
      })
      // 没数据添加0数据
      let namearr = ['正常', '正常高值', '轻度', '中度', '危险', '低血压']
      if (arr.length !== 6) {
        arr.forEach(item => {
          if (item.name === '正常' || '正常高值' || '轻度' || '中度' || '危险' || '低血压') {
            namearr = this._.filter(namearr, function (val) {
              return val !== item.name
            })
          }
        })
        namearr.forEach(item => {
          arr.push({value: 0, name: item})
        })
      }
      return arr
    },
    /**
     * @param {obj} date date.value时间
     * @param {number} index 选择histogramChecked的index
     * @description 血压直方图时间选择
     */
    isHistogramChecked (date, index) {
      this.histogramChecked.date.forEach(item => {
        item.isChecked = false
      })
      this.histogramChecked.date[index].isChecked = true
      // this.updateCover(date.value)
      this.updateHistogram(date.value)
    },
    /**
     * @param {string|date}  oneweek/ twoweek /onemonth /threemonth 如果有enddate 则为开始时间
     * @param {date} enddate 结束时间
     * @description 更新直方图数据
     */
    updateHistogram (date, enddate) {
      let vm = this
      let params = {
        'userId': vm.sickID,
        'adminHospitalId': vm.hospitalId
      }
      let dateParams = {
        label: '',
        value: '',
        endtime: null
      }
      let nowtime = new Date()
      // let nowtime = '2018-03-01'
      if (enddate) {
        dateParams = {
          label: '',
          value: date,
          endtime: enddate
        }
      } else {
        dateParams = {
          label: date,
          value: nowtime,
          endtime: null
        }
      }

      // vm.$axios(histogramApi(params, dateParams))
      // .then(res => {
      //   if (res.data) {
      //     if (res.data.data) {
      //       vm.histogramData = []
      //       res.data.data.forEach((item, index) => {
      //         vm.$set(vm.histogramData, index, item)
      //       })
      //     }
      //   }
      //   // let bloodHistogram = echarts.init(document.getElementById('bloodHistogram'))
      //   // bloodHistogram.setOption(this.bloodHistogramOption())
      // })
      let histogramPromise = new Promise(function (resolve, reject) {
        vm.$axios(histogramApi(params, dateParams))
        .then(res => {
          if (res.data) {
            if (res.data.data) {
              vm.histogramData = []
              res.data.data.forEach((item, index) => {
                vm.$set(vm.histogramData, index, item)
              })
              resolve()
            }
          }
          // let bloodHistogram = echarts.init(document.getElementById('bloodHistogram'))
          // bloodHistogram.setOption(this.bloodHistogramOption())
        })
      })
      let coverPromise = new Promise(
        function (resolve, reject) {
          vm.$axios(bloodCoverApi(params, dateParams))
          .then(res => {
            if (res.data.data) {
              vm.coverData = []
              for (let data in res.data.data) {
                vm.$set(vm.coverData, data, res.data.data[data])
              }
              resolve()
              console.log('饼图数据', vm.coverData)
              // console.log(1, res.data.data)
            }
            // let bloodCover = echarts.init(document.getElementById('bloodCover'))
            // bloodCover.setOption(this.bloodCoverOption())
          })
        }
      )
      Promise.all([histogramPromise, coverPromise]).then(function (results) {
        console.log('promise', results)
        let bloodHistogram = echarts.init(document.getElementById('bloodHistogram'))
        bloodHistogram.setOption(vm.bloodHistogramOption())
      })
    },
    /**
     * @param {array} data
     * @returns {array} [[120,80,2016-08]]
     * @description 格式化直方图数据
     */
    formatHistogram (data) {
      let arr = []
      if (data.length !== 0) {
        data.forEach(item => {
          let arr1 = []
          arr1.push(item['diastolic'])
          arr1.push(item['systolic'])
          arr1.push(item['measureTime'])
          arr.push(arr1)
        })
      }
      return arr
    },
    /**
     * @description 血压分布饼图配置
     */
    bloodCoverOption () {
      let vm = this
      let color = []
      let hascolor = ['#33b2f2', '#59d8a1', '#efa13a', '#ff7d43', '#f96767', '#9ac3e4']
      let nullcolor = ['#eaeaea', '#eaeaea', '#eaeaea', '#eaeaea', '#eaeaea', '#eaeaea']
      let count = 0
      this.formatCoverData(this.coverData).forEach((item) => {
        if (item.value === 0) {
          count++
        }
      })
      if (count !== 6) {
        color = hascolor
      } else {
        color = nullcolor
      }
      count = 0
      console.log('coverData', this.formatCoverData(this.coverData))
      return {
        color: color,
        legend: {
          orient: 'vertical',
          left: '50%',
          top: 'center',
          data: ['正常', '正常高值', '轻度', '中度', '危险', '低血压'],
          selectedMode: false,
          // formatter: (name) => {
          //   let i = 0
          //   let num = ''
          //   if (this.coverData) {
          //     this.formatCoverData(this.coverData).forEach((item, index) => {
          //       if (item.name === name) {
          //         i = index
          //         return i
          //       }
          //     })
          //     num = this.formatCoverData(this.coverData)[i].value
          //   }
          //   return name + '（共' + num + '次）'
          // },
          itemGap: 10,
          itemWidth: 20,
          itemHeight: 20,
          textStyle: {
            color: '#666',
            fontSize: 14
          }
        },
        series: [
          {
            name: '高血压',
            type: 'pie',
            radius: '70%',
            center: ['25%', '50%'],
            stillShowZeroSum: true,
            data: this.formatCoverData(this.coverData),
            // data: [
            //     {value: 335, name: '正常'},
            // ],
            label: {
              normal: {
                position: 'inner',
                formatter: function (params) {
                  if (vm._.toNumber(params.value) === 0) {
                    return ''
                  } else {
                    return params.value + '%'
                  }
                },
                fontSize: 14
              }
            },
            labelLine: {
              normal: {
                // show: false
              }
            }
          }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 1,
            shadowOffsetX: 0,
            shadowColor: ''
          }
        }
      }
    },
    /**
     * @description 血压直方图配置
     */
    bloodHistogramOption () {
      let vm = this
      // let areaColor = ['#33b2f2', '#59D8A1', '#efa13a', '#ff7d43', '#f96767']
      let areaColor = ['#0099FF', '#59D8A2', '#efa13a', '#ff7d43', '#e21b1b', '#9ac3e4']

      // let vm = this
      let color = []
      let hascolor = ['#33b2f2', '#59d8a1', '#efa13a', '#ff7d43', '#f96767', '#9ac3e4']
      let nullcolor = ['#eaeaea', '#eaeaea', '#eaeaea', '#eaeaea', '#eaeaea', '#eaeaea']
      let count = 0
      let cover = vm.formatCoverData(this.coverData)
      cover.forEach((item) => {
        if (item.value === 0) {
          count++
        }
      })
      if (count !== 6) {
        color = hascolor
      } else {
        color = nullcolor
      }
      count = 0
      console.log('格式化后的饼图数据', '')
      return {
        // color: color,
        color: ['#33b2f2', '#59d8a1', '#efa13a', '#ff7d43', '#f96767', '#9ac3e4'],
        tooltip: {
          show: false
        },
        legend: {
          orient: 'horizontal',
          left: '20',
          // top: 'center',
          selectedMode: false,
          itemWidth: 20,
          itemHeight: 20,
          data: [
            {
              name: '正常',
              icon: 'roundRect'
            },
            {
              name: '正常高值',
              icon: 'roundRect'
            },
            {
              name: '轻度',
              icon: 'roundRect'
            },
            {
              name: '中度',
              icon: 'roundRect'
            },
            {
              name: '危险',
              icon: 'roundRect'
            },
            {
              name: '低血压',
              icon: 'roundRect'
            }
          ]
        },
        grid: {
          left: '5%',
          right: '50%',
          bottom: '50',
          top: '90',
          containLabel: true
        },
        xAxis: [{
          type: 'value',
          name: '低压（舒张压）',
          nameLocation: 'end',
          boundaryGap: false,
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          min: 30,
          max: 120,
          minInterval: 10
        }],
        yAxis: [
          {
            type: 'value',
            name: '高压（收缩压）',
            nameLocation: 'end',
            minInterval: 10,
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            min: 60
          }
        ],
        series: [
          {
            type: 'line',
            name: '正常',
            symbol: 'none',
            // stack: '堆叠',
            lineStyle: {
              normal: {
                width: 0,
                color: areaColor[0]
              }
            },
            areaStyle: {
              normal: {
                color: areaColor[0]
              }
            },
            z: 10,
            connectNulls: true,
            data: [
                [0, 130],
                [85, 130],
                [85, 0]
            ]
          },
          {
            type: 'line',
            name: '正常高值',
            symbol: 'none',
            // stack: '堆叠',
            lineStyle: {
              normal: {
                width: 0,
                color: areaColor[1]
              }
            },
            areaStyle: {
              normal: {
                color: areaColor[1]
              }
            },
            itemStyle: {},
            z: 9,
            connectNulls: true,
            step: true,
            data: [
                [0, 140],
                [90, 140],
                [90, 0]
            ]

          },
          {
            type: 'line',
            name: '轻度',
            symbol: 'none',
            lineStyle: {
              normal: {
                width: 0,
                color: areaColor[2]
              }
            },
            areaStyle: {
              normal: {
                color: areaColor[2]
              }
            },
            z: 8,
            data: [
                [0, 160],
                [100, 160],
                [100, 0]
            ]
          },
          {
            type: 'line',
            name: '中度',
            symbol: 'none',
            lineStyle: {
              normal: {
                width: 0,
                color: areaColor[3]
              }
            },
            areaStyle: {
              normal: {
                color: areaColor[3]
              }
            },
            z: 7,
            data: [
                [0, 180],
                [110, 180],
                [110, 0]
            ]
          },
          {
            type: 'line',
            name: '危险',
            symbol: 'none',
            lineStyle: {
              normal: {
                width: 0,
                color: areaColor[4]
              }
            },
            areaStyle: {
              normal: {
                color: areaColor[4]
              }
            },
            z: 6,
            data: [
                [0, 210],
                [120, 210],
                [120, 0]
            ]
          },
          {
            type: 'line',
            name: '低血压',
            symbol: 'none',
            lineStyle: {
              normal: {
                width: 0,
                color: areaColor[5]
              }
            },
            areaStyle: {
              normal: {
                color: '#9ac3e4'
              }
            },
            z: 15,
            data: [
                [0, 90],
                [60, 90],
                [60, 0]
            ]
          },
          {
            type: 'scatter',
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
              normal: {
                color: '#fff'
              }
            },
            z: 20,
            tooltip: {
              show: true,
              backgroundColor: 'rgba(250,250,250,0.7)',
              textStyle: {
                color: '#000'
              },
              triggerOn: 'click',
              formatter: function (a) {
                let low = ''
                let heigh = ''
                let time = ''
                if (a.data) {
                  if (a.data[0]) {
                    low = '低压:' + a.data[0]
                  }
                  if (a.data[1]) {
                    heigh = '高压:' + a.data[1]
                  }
                  if (a.data[2]) {
                    time = '时间:' + a.data[2] + '<br>'
                  }
                }
                return (
                time +
              low + '<br>' +
              heigh
                )
              }
            },
            data: this.formatHistogram(this.histogramData)

            // data: [
            //   [145, 119, '2018-01-08 18:48:16'],
            //   [165, 86, '2018-01-08 19:54:16'],
            //   [138, 67, '2018-01-05 21:54:16'],
            //   [120, 81, '2018-02-03 16:09:48'],
            //   [100, 83, '2018-02-03 16:09:48'],
            //   [100, 83, '2018-02-03 16:09:48'],
            //   [185, 81, '2018-02-03 16:09:48']
            // ]

          },
          {
            type: 'scatter',
            symbol: 'circle',
            symbolSize: 0,
            itemStyle: {
              normal: {
                color: '#fff'
              }
            },
            z: 20,
            // tooltip: {
            //   show: true,
            //   backgroundColor: 'rgba(250,250,250,0.7)',
            //   textStyle: {
            //     color: '#000'
            //   },
            //   triggerOn: 'click',
            //   formatter: function (a) {
            //     let low = ''
            //     let heigh = ''
            //     let time = ''
            //     if (a.data) {
            //       if (a.data[0]) {
            //         low = '低压:' + a.data[0]
            //       }
            //       if (a.data[1]) {
            //         heigh = '高压:' + a.data[1]
            //       }
            //       if (a.data[2]) {
            //         time = '时间:' + a.data[2] + '<br>'
            //       }
            //     }
            //     return (
            //     time +
            //   low + '<br>' +
            //   heigh
            //     )
            //   }
            // },
            data: [[120, 210]]

            // data: [
            //   [145, 119, '2018-01-08 18:48:16'],
            //   [165, 86, '2018-01-08 19:54:16'],
            //   [138, 67, '2018-01-05 21:54:16'],
            //   [120, 81, '2018-02-03 16:09:48'],
            //   [100, 83, '2018-02-03 16:09:48'],
            //   [100, 83, '2018-02-03 16:09:48'],
            //   [185, 81, '2018-02-03 16:09:48']
            // ]

          },
          {
            name: '高血压',
            color: color,
            type: 'pie',
            radius: '50%',
            center: ['75%', '50%'],
            stillShowZeroSum: true,
            data: cover,
            // data: [
            //     {value: 335, name: '正常'},
            // ],
            label: {
              normal: {
                position: 'inner',
                formatter: function (params) {
                  if (vm._.toNumber(params.value) === 0) {
                    return ''
                  } else {
                    return params.value + '%'
                  }
                },
                fontSize: 14
              }
            },
            labelLine: {
              normal: {
                // show: false
              }
            }
          }
        ]
      }
      // return option
    },
    /**
     * @description 计算血压等级对应的色值
     */
    computeDanger (bptype) {
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
          color = '#9ac3e4' // 低血压
          break
        case 0:
          color = '#191918'
          break
        default:
          color = '#191918'
      }
      return color
    }

  },
  watch: {
  },
  mounted () {
    // let vm = this
    // 初始化血压分布图
    // this.coverChecked.date[0].isChecked = true
    // this.updateCover(this.coverChecked.date[0].value)
    // let bloodCover = echarts.init(document.getElementById('bloodCover'))
    // bloodCover.setOption(this.bloodCoverOption())
    // 初始化血压直方图
    this.histogramChecked.date[0].isChecked = true
    this.updateHistogram(this.histogramChecked.date[0].value)
    let bloodHistogram = echarts.init(document.getElementById('bloodHistogram'))
    bloodHistogram.setOption(this.bloodHistogramOption())

    // this.bloodfoodChecked.date[0].isChecked = true
    // this.bloodfoodChecked.kaluli = true
    // this.updateFood(this.bloodfoodChecked.date[0].date)
    // let bloodFood = echarts.init(document.getElementById('bloodFood'))
    // bloodFood.setOption(this.bloodFoodOption('kaluli'))

    // this.bloodsportChecked.date[0].isChecked = true
    // this.bloodsportChecked.kaluli = true
    // this.updateSport(this.bloodsportChecked.date[0].date)
    // let bloodSport = echarts.init(document.getElementById('bloodSport'))
    // bloodSport.setOption(this.bloodSportOption('kaluli'))

    // bloodFood.on('datazoom', function (chartsparams) {
    //   if (chartsparams.end === 100) {
    //     if (vm.bloodfoodData.pageNum >= vm.bloodfoodData.pages) {
    //       return
    //     }
    //     vm.bloodfoodData.pageNum ++
    //     let params = {
    //       'userId': vm.sickID,
    //       'adminHospitalId': vm.hospitalId,
    //       'bpMeasureTime': vm.bpMeasureTime || '',
    //       'pageNum': vm.bloodfoodData.pageNum,
    //       'pageSize': 5
    //     }
    //     vm.$axios(bloodfoodApi(params))
    //       .then(res => {
    //         let bloodFood = echarts.init(document.getElementById('bloodFood'))
    //         bloodFood.showLoading(
    //           {
    //             text: '加载中...',
    //             color: '#1991fc',
    //             textColor: '#000',
    //             maskColor: 'rgba(255, 255, 255, 0.8)',
    //             zlevel: 0
    //           }
    //         )
    //         if (vm.bloodfoodData.pageNum <= res.data.pages) {
    //           if (res.data.data.length !== 0) {
    //             res.data.data.forEach((item, index) => {
    //               if (!item.systolic) {
    //                 item.systolic = 0
    //               }
    //               if (!item.diastolic) {
    //                 item.diastolic = 0
    //               }
    //               if (!item.calories) {
    //                 item.calories = 0
    //               }
    //               if (!item.foodScore) {
    //                 item.foodScore = 0
    //               }
    //               if (!item.bpType) {
    //                 item.bpType = 0
    //               }
    //               vm.bloodfoodData.x.push(item.createTime)
    //               vm.bloodfoodData.systolic.push(item.systolic)
    //               vm.bloodfoodData.diastolic.push(item.diastolic)
    //               vm.bloodfoodData.foodScore.push(item.foodScore)
    //               vm.bloodfoodData.calories.push(item.calories)
    //               vm.bloodfoodData.bpType.push(item.bpType)
    //             })
    //           }
    //         }
    //         if (vm.bloodfoodChecked.kaluli) {
    //           bloodFood.setOption(vm.bloodFoodOption('kaluli', 50, 85))
    //         }
    //         if (vm.bloodfoodChecked.score) {
    //           bloodFood.setOption(vm.bloodFoodOption('score', 50, 85))
    //         }
    //         // bloodFood.setOption(vm.bloodFoodOption(50, 80))
    //         bloodFood.hideLoading()
    //       })
    //   }
    // })
    // bloodSport.on('datazoom', function (chartsparams) {
    //   // let vm = this
    //   // console.log('num', vm.bloodsportData.pageNum)
    //   // console.log('num', vm.bloodsportData)
    //   if (chartsparams.end === 100) {
    //     // console.log('num', vm.bloodsportData.pageNum)
    //     if (vm.bloodsportData.pageNum >= vm.bloodsportData.pages) {
    //       return
    //     }
    //     vm.bloodsportData.pageNum ++

    //     let params = {
    //       'userId': vm.sickID,
    //       'adminHospitalId': vm.hospitalId,
    //       'bpMeasureTime': vm.bpMeasureTime || '',
    //       'pageNum': vm.bloodsportData.pageNum,
    //       'pageSize': 5
    //     }
    //     vm.$axios(bloodsportApi(params))
    //       .then(res => {
    //         let bloodSport = echarts.init(document.getElementById('bloodSport'))
    //         bloodSport.showLoading(
    //           {
    //             text: '加载中...',
    //             color: '#1991fc',
    //             textColor: '#000',
    //             maskColor: 'rgba(255, 255, 255, 0.8)',
    //             zlevel: 0
    //           }
    //         )
    //         if (vm.bloodsportData.pageNum <= res.data.pages) {
    //           if (res.data.data.length !== 0) {
    //             res.data.data.forEach((item, index) => {
    //               if (!item.systolic) {
    //                 item.systolic = 0
    //               }
    //               if (!item.diastolic) {
    //                 item.diastolic = 0
    //               }
    //               if (!item.calories) {
    //                 item.calories = 0
    //               }
    //               if (!item.foodScore) {
    //                 item.foodScore = 0
    //               }
    //               if (!item.bpType) {
    //                 item.bpType = 0
    //               }
    //               vm.bloodsportData.x.push(item.createTime)
    //               vm.bloodsportData.systolic.push(item.systolic)
    //               vm.bloodsportData.diastolic.push(item.diastolic)
    //               vm.bloodsportData.movementScore.push(item.movementScore)
    //               vm.bloodsportData.calories.push(item.calories)
    //               vm.bloodsportData.bpType.push(item.bpType)
    //             })
    //           }
    //         }
    //         if (vm.bloodsportChecked.kaluli) {
    //           bloodSport.setOption(vm.bloodSportOption('kaluli', 50, 85))
    //         }
    //         if (vm.bloodsportChecked.score) {
    //           bloodSport.setOption(vm.bloodSportOption('score', 50, 85))
    //         }

    //         bloodSport.hideLoading()
    //       })
    //   }
    // })
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
    border: 1px solid #fff;
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
    border: 1px solid #fff;
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
    border-color: #1991fc;
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
    background: url('~icon/hospital-icon-44.png')
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
    /* float: left; */
    display: inline-block;
    /* width: 100%; */
  }
  .checked-kaluli{
    /* margin-top: 80px; */
  }
  .checked-score{
    margin-top:10px;
  }
  .middle-wrap{
    position: relative;
    height: 100%;
  }
  .middle{
    position: absolute;
    /* display: table-cell; */
    /* vertical-align: middle; */
    top:50%;
    transform: translateY(-50%)
  }
  .margin-bottom{
    margin-bottom:8px;
    color: #ffffff1a;
  }
  .flex{
    display: flex;
    position: relative;
    flex-wrap: nowrap;
    width: 100%;
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
  .kaluli-wrap{
    position: relative;
  }
  .kaluli-btn-wrap{
    position: absolute;
    width: 200px;
    height: 40px;
    top: 50%;
    left: 150px;
    z-index: 99;
  }
</style>
