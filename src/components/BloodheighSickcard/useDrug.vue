<template>
  <div>
    <el-card :body-style="{ padding: '0px' }">
      <div class="card-header">
        <p class="title">用药</p>
      </div>
      <!-- 图例 -->
      <div class="chart-head">
        <span class="text-center">
          <img src="~icon/hospital-icon-34.png" alt="">
          <span>利尿剂</span> 
        </span>
        <span class="text-center">
          <img src="~icon/hospital-icon-35.png" alt="">
          <span>β受体阻滞剂</span> 
        </span>
        <span class="text-center">
          <img src="~icon/hospital-icon-36.png" alt="">
          <span>钙通道拮抗剂(CCB)</span> 
        </span>
        <span class="text-center">
          <img src="~icon/hospital-icon-37.png" alt="">
          <span>血管紧张素抑制剂(ACEI)</span> 
        </span>
        <span class="text-center">
          <img src="~icon/hospital-icon-38.png" alt="">
          <span>血管紧张素二受体阻滞剂(ARB)</span> 
        </span>
      </div>
      <!-- 图表 -->
      <div class="chart" >
        <div class="flex">
          <div class="flex-btn-left">
            <!-- <el-button size="mini" :disabled="!useDrugBtnNext" icon="el-icon-arrow-left" @click="useDrugNext" type="text" :style="{'font-size':'18px','color':'#999','background':'#eaeaea'}"></el-button> -->
            <!-- <el-button size="mini" :disabled="!useDrugBtnNext" @click="useDrug
            Next" type="text" :style="{'font-size':'14px','color':'#1991fc','background':'#fff'}">点击加载更多...</el-button> -->
            <!-- <el-button size="mini" :disabled="!useDrugBtnPre" icon="el-icon-arrow-left" @click="useDrugPer" type="text" :style="{'font-size':'18px','color':'#999','background':'#eaeaea'}"></el-button> -->
          </div>
          <div class="chart-min-width">
            <div v-loading="loading" id='useDrug'  :style="{width:'auto',height:'650px'}"></div>
          </div>
          <div class="flex-btn">
            <!-- <el-button size="mini" :disabled="!useDrugBtnPre" icon="el-icon-arrow-right" @click="useDrugPer" type="text" :style="{'font-size':'18px','color':'#999','background':'#eaeaea'}"></el-button> -->
            <!-- <el-button size="mini" :disabled="!useDrugBtnNext" icon="el-icon-arrow-right" @click="useDrugNext" type="text" :style="{'font-size':'18px','color':'#999','background':'#eaeaea'}"></el-button> -->
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {useDrugApi} from '@/api/components/BloodheighSickcard/useDrug'
import {dateFormat} from '@/untils/date.js'
import echarts from 'echarts'
import LI from 'icon/hospital-icon-34.png'
import B from 'icon/hospital-icon-35.png'
import CCB from 'icon/hospital-icon-36.png'
import ACEI from 'icon/hospital-icon-37.png'
import ARB from 'icon/hospital-icon-38.png'
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
      // data: [
      // ],
      sourData: [],
      // 图表数据
      optionData: [],
      // 图表X轴
      xasis: [],
      page: {
        pageNum: 1,
        pageSize: 120,
        pages: 1,
        currentPage: 1
      },
      // pageNum: 1,
      // pageSize: 15,
      // pages: 1,
      // currentPage: 1,
      loading: true,
      useDrugBtnPre: true,
      useDrugBtnNext: true,
      // 计算x轴坐标
      initX: -1,
      // 计算Y轴坐标
      // befor: {
      takeMedicineTime: '00000000000',
      comporeTime: '',
      // 当前页数length
      currentX: 1
      // }

    }
  },
  methods: {
    // 获取数据**
    getData (pagenum) {
      let vm = this
      vm.loading = true
      let today = new Date()
      if (!pagenum) { pagenum = 1 }
      let params = {
        'userId': vm.sickID,
        'adminHospitalId': vm.hospitalId,
        'pageNum': pagenum,
        'pageSize': this.page.pageSize,
        // 'startTime': '2018-04-01',
        // 'endTime': '2018-06-01'
        'startTime': dateFormat(today, 12, true),
        'endTime': dateFormat(today, 0, true)
      }
      vm.$axios(useDrugApi(params))
      .then(res => {
        if (res.data.data) {
          let data = res.data.data
          let computData = []
          if (this._.has(data, 'userBloodPressureList')) {
            if (data.userBloodPressureList.length > 0) {
              data.userBloodPressureList.forEach(item => {
                let bloodlist = []
                let blood = []
                if (this._.has(item, 'measureTime')) {
                  let date = item.measureTime.slice(0, 10)

                  let hours = item.measureTime.slice(11) + ':00'
                  bloodlist.push(this.transformtime(hours))
                  bloodlist.push(date)
                  blood.push(item.avgSystolic)
                  blood.push(item.avgDiastolic)
                  blood.push(item.bpTypeAvg)
                  bloodlist.push(blood)
                  if (date !== this.comporeTime) {
                    // let M = []
                    let lists = []
                    if (this._.has(data, 'userMedicationTotalplanList')) {
                      if (data.userMedicationTotalplanList.length > 0) {
                        data.userMedicationTotalplanList.forEach(item => {
                          // new Date(date.replace(/-/g,"\/"))
                          let start = item.startTime
                          let end = item.endTime
                          if (this._.gte(new Date(date.replace(/-/g, '\/')), new Date(start.replace(/-/g, '\/'))) && this._.gte(new Date(end.replace(/-/g, '\/')), new Date(date.replace(/-/g, '\/')))) {
                            this.comporeTime = date
                            if (this._.has(item, 'userMedicationPlanList')) {
                              if (item.userMedicationPlanList.length > 0) {
                                item.userMedicationPlanList.forEach(medicinelist => {
                                  if (this._.has(medicinelist, 'userMedicationList')) {
                                    if (medicinelist.userMedicationList.length > 0) {
                                      let M = []
                                      let list = []
                                      // M = []
                                      M.push(this.transformtime(medicinelist.time)) // y
                                      M.push(date)// x
                                      M.push([])// blod

                                      medicinelist.userMedicationList.forEach(medicine => {
                                        if (this._.has(medicine, 'sysMedicineId')) {
                                          list.push(medicine.sysMedicineId)
                                        }
                                      })
                                      list = this._.uniq(list)
                                      M.push(list) // medicine
                                      M.push(date)// x
                                      M.push(medicinelist.time) // y
                                      // computData.push(M)
                                      lists.push(M)
                                    }
                                  }
                                })
                              }
                            }
                          }
                        })
                      }
                    }
                    lists = this._.sortBy(lists, function (item) {
                      return item[0]
                    })
                    console.log('用药集合', lists)
                    let index = []
                    for (let i = 0; i < lists.length; i++) {
                      if (i < lists.length - 2) {
                        if (lists[i][0] === lists[i + 1][0]) {
                          lists[i][3] = this._.uniq(this._.concat(lists[i][3], lists[i + 1][3]))
                          lists[i + 1][3] = lists[i][3]
                          // lists.splice(i + 1, 1)
                          index.push(i + 1)
                        }
                      }
                    }
                    let total = 0
                    index.forEach((item, i) => {
                      total += i
                      lists.splice(item - i + total, 1)
                      // console.log('用药集合4', item)
                    })
                    // this._.differenceWith(lists, [{ 'x': 1, 'y': 2 }], this._.isEqual)
                    // lists = this._.uniq(lists)
                    computData = this._.concat(computData, lists)
                    console.log('用药集合2', lists)
                  }

                  bloodlist.push([])
                  bloodlist.push(date)
                  bloodlist.push(hours)
                  computData.push(bloodlist)
                }
              })
            }
          }
          computData = this._.uniq(computData)
          computData = this._.sortBy(computData, function (item) {
            return item[1]
          })
          computData = computData.reverse()
          console.log('用药', computData)
          // this.xasis = this.axisX(computData)
          // this.optionData = this.seriesItem(this.formatterX(computData))
          // vm.xasis = vm._.uniq(vm._.concat(this.xasis, this.axisX(computData)))
          // vm.xasis = (vm._.concat(this.axisX(computData), this.xasis))
          // this.optionData = this._.concat(this.seriesItem(computData, this.optionData))
          vm.xasis = vm._.uniq(vm._.concat(this.axisX(computData), this.xasis))
          console.log('用药XZHOU', vm.xasis)
          if (vm.xasis.length > 7) {
            vm.xasis = vm.xasis.splice(0, 7)
          }
          vm.xasis = vm.xasis.reverse()
          computData = vm.spliceData(computData)
          console.log('用药splice', computData)
          vm.sourData = vm._.concat(computData.reverse(), vm.sourData)
          vm.optionData = vm.seriesItem(vm.formatterX(vm.sourData))
          // vm.xasis = vm._.concat(this.xasis, this.axisX(computData))
          // this.optionData = this._.concat(this.optionData, this.seriesItem(this.formatterX(computData)))
          // vm.xasis = vm.xasis.reverse()
          // this.optionData = this._.concat(this.seriesItem(this.formatterX(computData).reverse(), this.optionData))
          console.log('用药chu', this.sourData)
          console.log('用药formatterX', this.formatterX(this.sourData))
          console.log('用药x data', this.xasis)
          // console.log('用药x', this.formatterX(computData))
          console.log('用药option', this.optionData)
          // let copydata = res.data.data
            // copydata = vm._.filter(copydata, function (item) {
              //   let hasBlood
            //   let hasBD = vm._.has(item, 'beforeDiastolic2')
            //   let hasBS = vm._.has(item, 'beforeSystolic2')
            //   let hasAS = vm._.has(item, 'afterSystolic')
            //   let hasAD = vm._.has(item, 'afterDiastolic')
            //   let hasT = vm._.has(item, 'takeMedicineTime')
            //   if (hasBD || hasBS || hasAS || hasAD) {
            //     hasBlood = true
            //   } else {
            //     hasBlood = false
            //   }
            //   return hasT && hasBlood
            // })
            // let merge = function (item) {
            //   let obj = {
            //     beforeDiastolic2: 'null',
            //     beforeSystolic2: 'null',
            //     bpTypeBefore: 'null',
            //     afterSystolic: 'null',
            //     afterDiastolic: 'null',
            //     bpTypeAfter: 'null',
            //     sysMedicineId: 'null'
            //   }
            //   return vm._.merge(obj, item)
            // }
            // copydata = vm._.map(copydata, merge)
            // copydata = vm._.sortBy(copydata, function (item) {
            //   return item.takeMedicineTime
            // })
            // copydata = copydata.reverse()
            // this.sourData = vm._.concat(copydata, this.sourData)
            // let useDrugData = vm.formatter(this.sourData)
            // let theX = vm.axisX(copydata)
            // vm.optionData = vm.seriesItem(useDrugData)
            // vm.optionData = vm._.concat(vm.seriesItem(useDrugData), vm.optionData)
            // vm.xasis = vm._.uniq(vm._.concat(theX, vm.xasis))
            // vm.optionData = vm._.concat(vm.optionData, vm.seriesItem(useDrugData))
            // vm.xasis = vm._.uniq(vm._.concat(vm.xasis, theX))
            // vm.optionData = vm.optionData
          // vm.xasis = vm.xasis
        }

        vm.loading = false
        let position = this.computeStartend(vm.page.currentPage, vm.page.pageNum)
        let useDrug = echarts.init(document.getElementById('useDrug'))
        // useDrug.setOption(this.useDrugOption())
        useDrug.setOption(this.useDrugOption(position.start, position.end))
        this.page.pageNum = res.data.pageNum
        this.page.pages = res.data.pages
        // if (vm.xasis.length < 7) {
        //   vm.useDrugNext()
        // }
      })
    },
    spliceData (arr) {
      let count = 0
      let base = null
      let num = 0
      arr.forEach((item, index) => {
        if (item[1] !== base) {
          count += 1
          base = item[1]
        }
        if (count === 7 || count < 7) {
          num = index
        }
      })
      return arr.splice(0, num)
    },
    // 格式化数据 计算x轴坐标  **
    formatterX (arr) {
      // let copydata = []
      let copydata = JSON.parse(JSON.stringify(arr))
      let vm = this
      let initX = -1
      let takeMedicineTime = '0000000000000000'
      // vm._(arr).forEach(function (value, index) {
      copydata.forEach(function (value, index) {
        // let time = value[1]
        let T = new Date(value[1].replace(/-/g, '\/'))
        let time = T.getTime()
        let befortime = takeMedicineTime
        // let befortime = vm.takeMedicineTime
        // let copytime = new Date(value[1].replace(/\\-/g, '\\/'))
        if (vm._.eq(time, befortime)) {
          value[1] = initX
          // value[1] = vm.initX
        } else {
          initX++
          value[1] = initX
          // vm.initX++
          // value[1] = vm.initX
        }
        takeMedicineTime = time
        // vm.takeMedicineTime = time
      })
      return copydata
    },
    // 计算X轴坐数据**
    axisX (arr) {
      let vm = this
      let x = []
      vm._(arr).forEach(function (item, index) {
        x.push(item[1])
      })
      x = vm._.uniq(x)
      return x
    },
    transformtime (time) {  // 时间转value y轴**
      if (this._.isNumber(time)) {
        return time
      } else {
        let hours = parseInt(time.slice(0, 2))
        let minute = parseInt(time.slice(3, 5))
        return hours * 60 + minute
      }
    },
    // 背景颜色
    colorBg (bptype) {
      let type
      if (bptype !== 'null') {
        bptype = parseInt(bptype)
        switch (bptype) {
          case 1:
            type = 'normalBg'
            break
          case 2:
            type = 'middleBg'
            break
          case 3:
            type = 'normalheighBg'
            break
          case 4:
            type = 'middleheighBg'
            break
          case 5:
            type = 'dangerBg'
            break
          default:
            type = 'nullBg'
        }
      }
      return type
    },
    seriesItem (data) {
      let arr = []
      if (data.length > 0) {
        data.forEach(item => {
          let text = ''
          let icon = ''
          if (item[2].length > 0) {
            let bg = this.colorBg(item[2][2])
            text = '{' + bg + '|' + '[' + item[2][0] + '/' + item[2][1] + ']' + '}'
          }
          if (item[3].length > 0) {
            if (item[3].indexOf('1') !== -1) {
              icon += '{acei|}'
            }
            if (item[3].indexOf('2') !== -1) {
              icon += '{ccb|}'
            }
            if (item[3].indexOf('3') !== -1) {
              icon += '{arb|}'
            }
            if (item[3].indexOf('4') !== -1) {
              icon += '{b|}'
            }
            if (item[3].indexOf('6') !== -1) {
              icon += '{li|}'
            }
          }
          let obj = {}
          if (item[2].length > 0) {
            obj = {
              value: item,
              // symbolSize: 1,
              symbolOffset: ['60%', '0%'],
              label: {
                show: true,
                fontSize: 10,
                normal: {
                  // symbolSize: 0,
                  // position: [0, 0],
                  formatter: [
                    text,
                    '{hr|}',
                    '{hr|}',
                    icon,
                    '{hr|}'
                  ].join('\n'),
                  rich: {
                  }
                }
              }
            }
          }
          if (item[3].length > 0) {
            obj = {
              value: item,
              // symbolSize: 1,
              symbolOffset: ['0%', '20%'],
              label: {
                show: true,
                fontSize: 10,
                normal: {
                  // symbolSize: 0,
                  // position: ['90%', '50%'],
                  formatter: [
                    text,
                    '{hr|}',
                    icon,
                    '{hr|}'
                  ].join('\n'),
                  rich: {
                  }
                }
              }
            }
          }
          // console.log('wenben', obj)
          arr.push(obj)
        })
      }

      return arr
    },
    useDrugOption (start, end) {
      let vm = this
      let x1 = ''
      let zoomstart = 0
      let zoomend = 100
      if (start) {
        zoomstart = start
      }
      if (end) {
        zoomend = end
      }
      let hours = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00']
      let days = this.xasis
      let Icons = {
        'li': LI,
        'b': B,
        'ccb': CCB,
        'acei': ACEI,
        'arb': ARB
      }
      let option = {
        color: ['#fff'],
        grid: {
          left: '40',
          bottom: '8%',
          right: '40',
          top: 20,
          containLabel: true
        },
        tooltip: {
        // 提示框组件
          backgroundColor: 'rgba(50,50,50,0.2)',

          formatter: function (a) {
            // console.log(a)
            // let befor = ''
            // let after = ''
            // let time = ''
            // if (a.data.value[2] !== '') {
            //   befor = '用药前两小时' + a.data.value[2]
            // }
            // if (a.data.value[3] !== '') {
            //   after = '用药后两小时' + a.data.value[3]
            // }
            // if (a.data.value[4]) {
            //   time = a.data.value[4]
            // }
            return (a.data.value[4] + '<br>' + a.data.value[5])  // ready
            // return (a.data.value[5])
            // console.log(a)
            // let befor = ''
            // let after = ''
            // let time = ''
            // if (a.data.value[2] !== '') {
            //   befor = '用药前两小时' + a.data.value[2]
            // }
            // if (a.data.value[3] !== '') {
            //   after = '用药后两小时' + a.data.value[3]
            // }
            // if (a.data.value[4]) {
            //   time = a.data.value[4]
            // }
            // return (time + '<br>' + befor + '<br>' + after)
          }
        },
        dataZoom: [
          {
            type: 'slider',
            show: false,
            realtime: true,
            start: zoomstart,
            end: zoomend,
            zoomlock: true,
            // minValueSpan: 10,
            yAxisIndex: 0,
            maxValueSpan: 7,
            throttle: 500,
            filterMode: 'empty',
            zoomOnMouseWheel: false,
            showDetail: false,
            showDataShadow: false
            // handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z'
          }
        ],
        yAxis: {
          // type: 'time',
          type: 'category',
          offset: 20,
          // inverse: true,
          data: days,
          // boundaryGap: true,
          // name: 'yyyyy',
          // nameGap: 80,
          // boundaryGap: ['20%', '20%'],
          // padding: 2,
          splitLine: {
            // x轴网格线
            show: false,
            lineStyle: {
              color: '#999',
              type: 'solid'
            }
          },
          axisTick: {
            // 坐标轴刻度
            show: false
            // alignWithLabel: true
          },
          axisLabel: {
            interval: 0, // 显示x轴数据
            showMinLabel: true,
            showMaxLabel: true,
            // align: 'center',
            margin: 20,
            verticalAlign: 'middle',
            // rotate: 0,
            // formatter: function (value, index) {
            //   // 格式化成月/日，只在第一个刻度显示年份
            //   var date = new Date(value)
            //   var texts = [(date.getMonth() + 1), date.getDate()]
            //   if (index === 0) {
            //     texts.unshift(date.getFullYear())
            //   }
            //   return texts.join('-')
            // }
            formatter: function (val) {
              let value
              let time = val.slice(0, 4)
              if (vm._.eq(time, x1)) {
                value = val.slice(5)
                x1 = time
                return value
              } else {
                let arr = []
                arr.push(time)
                arr.push(val.slice(5))
                x1 = time
                return arr.join('\n')
              }
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#999',
              width: 1
            }
          }
        },
        xAxis: [
          {
            type: 'value',
            splitLine: {
              show: false
            },
            show: false,
            minInterval: 1,
            maxInterval: 60,
            min: 0,
            max: 1440
            // boundaryGap: ['50%', '50%']
          },
          {
            show: true,
            splitLine: {
              show: true
            },
            axisTick: {
              show: false
            },
            type: 'category',
            offset: 0,
            position: 'bottom',
            onZeroAsisIndex: 0,
            boundaryGap: false,
            data: hours,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#999',
                width: 1
              }
            }
          },
          {
            splitLine: {
              show: true
            },
            axisTick: {
              show: false
            },
            type: 'category',
            offset: 0,
            position: 'top',
            onZeroAsisIndex: 0,
            boundaryGap: false,
            data: hours,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#999',
                width: 1
              }
            }
          }
        ],
        series: [
          {
            name: 'medicine',
            type: 'scatter',
            symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABLCAYAAAA1fMjoAAAB/UlEQVR4Xu3VsRHAMAzEsHj/pTOBXbB9pFchyLycz0eAwFXgsCFA4C4gEK+DwENAIJ4HAYF4AwSagD9IczM1IiCQkUNbswkIpLmZGhEQyMihrdkEBNLcTI0ICGTk0NZsAgJpbqZGBAQycmhrNgGBNDdTIwICGTm0NZuAQJqbqREBgYwc2ppNQCDNzdSIgEBGDm3NJiCQ5mZqREAgI4e2ZhMQSHMzNSIgkJFDW7MJCKS5mRoREMjIoa3ZBATS3EyNCAhk5NDWbAICaW6mRgQEMnJoazYBgTQ3UyMCAhk5tDWbgECam6kRAYGMHNqaTUAgzc3UiIBARg5tzSYgkOZmakRAICOHtmYTEEhzMzUiIJCRQ1uzCQikuZkaERDIyKGt2QQE0txMjQgIZOTQ1mwCAmlupkYEBDJyaGs2AYE0N1MjAgIZObQ1m4BAmpupEQGBjBzamk1AIM3N1IiAQEYObc0mIJDmZmpEQCAjh7ZmExBIczM1IiCQkUNbswkIpLmZGhEQyMihrdkEBNLcTI0ICGTk0NZsAgJpbqZGBAQycmhrNgGBNDdTIwICGTm0NZuAQJqbqREBgYwc2ppNQCDNzdSIgEBGDm3NJiCQ5mZqREAgI4e2ZhMQSHMzNSIgkJFDW7MJCKS5mRoREMjIoa3ZBATS3EyNCAhk5NDWbAI/whoATO4mYfAAAAAASUVORK5CYII=',
            symbolSize: [40, 40],
            // symbolSize: [10, 10],
            label: {
              normal: {
                show: true,
                color: '#000',
                fontSize: 10,
                align: 'center',
                rich: {
                  normalBg: {
                    // backgroundColor: 'linear-gradient(red, blue)',
                    height: 25,
                    // width: 45,
                    backgroundColor: '#33b2f2',
                    color: '#fff',
                    fontSize: 10,
                    align: 'center',
                    fontWeight: 'bold'
                  },
                  normalheighBg: {
                    height: 25,
                    backgroundColor: '#59d8a1',
                    color: '#fff',
                    fontSize: 10,
                    align: 'center',
                    fontWeight: 'bold'
                  },
                  middleBg: {
                    height: 25,
                    backgroundColor: '#efa13a',
                    color: '#fff',
                    fontSize: 10,
                    align: 'center',
                    fontWeight: 'bold'
                  },
                  middleheighBg: {
                    height: 25,
                    backgroundColor: '#ff7d43',
                    color: '#fff',
                    fontSize: 10,
                    align: 'center',
                    fontWeight: 'bold'
                  },
                  dangerBg: {
                    height: 25,
                    backgroundColor: '#f96767',
                    color: '#fff',
                    fontSize: 10,
                    align: 'center',
                    fontWeight: 'bold'
                  },
                  nullBg: {
                    height: 25,
                    backgroundColor: '#666',
                    color: '#fff',
                    fontSize: 10,
                    align: 'center',
                    fontWeight: 'bold'
                  },
                  bBg: {
                    height: 25,
                    backgroundColor: '#f4e07a',
                    color: '#fff',
                    fontSize: 10,
                    align: 'center',
                    fontWeight: 'bold'
                  // fontWeight: 'blod'
                  },
                  liBg: {
                    height: 25,
                    backgroundColor: '#81cefc',
                    color: '#fff',
                    fontSize: 10,
                    align: 'center',
                    fontWeight: 'bold'
                  // fontWeight: 'blod'
                  },
                  ccbBg: {
                    height: 25,
                    backgroundColor: '#7cedc4',
                    color: '#fff',
                    fontSize: 12,
                    align: 'center',
                    fontWeight: 'bold'
                  // fontWeight: 'blod'
                  },
                  aceiBg: {
                    height: 25,
                    backgroundColor: '#9c9ce2',
                    color: '#fff',
                    fontSize: 10,
                    align: 'center',
                    fontWeight: 'bold'
                  // fontWeight: 'blod'
                  },
                  arbBg: {
                    height: 25,
                    backgroundColor: '#ff8f8f',
                    color: '#fff',
                    fontSize: 10,
                    align: 'center',
                    fontWeight: 'bold'
                  // fontWeight: 'blod'
                  },

                  tc: {
                    align: 'center',
                    color: '#eee'
                  },
                  hr: {
                  // borderColor: '#777',
                    width: '100%',
                  // borderWidth: 0.5,
                    height: 0
                  },
                  li: {
                    height: 10,
                    align: 'center',
                    backgroundColor: {
                      image: Icons.li
                    }
                  },
                  b: {
                    height: 10,
                    align: 'center',
                    backgroundColor: {
                      image: Icons.b
                    }
                  },
                  ccb: {
                    height: 10,
                    align: 'center',
                    backgroundColor: {
                      image: Icons.ccb
                    }
                  },

                  acei: {
                    height: 10,
                    // width: 15,
                    align: 'bottom',
                    backgroundColor: {
                      // image: '<img></img>'
                      image: Icons.acei
                    }
                  },
                  arb: {
                    height: 10,
                    align: 'center',
                    backgroundColor: {
                      image: Icons.arb
                    }
                  }
                }
              }
            },
            data: this.optionData
          // data: [
            //   {
            //     value: [0, 0, '[120/120]', '[120/120]', 'time'],
            //     label: {
            //       normal: {
            //         formatter: [
            //           // '{bBg|[120/120]}{li|}{b|}{liBg|[120/120]}'
            //           '{ccbBg|[120/120]}',
            //           '{hr|}',
            //           '{ccb|} {arb|}',
            //           '{hr|}',
            //           '{arbBg|[120/120]}'
            //         ].join('\n')
            //       }
            //     }
            //   },
            //   {
            //     value: [2, 1, '[120/120][120/120]'],
            //     label: {
            //       normal: {
            //         formatter: [
            //           // '{ccbBg|[120/120]}{ccb|}{arb|}{arbBg|[120/120]}'
            //           '{ccbBg|[120/120]}',
            //           '{hr|}',
            //           '{ccb|} {arb|}',
            //           '{hr|}',
            //           '{arbBg|[120/120]}'
            //         ].join('\n'),
            //         rich: {
            //         }
            //       }
            //     }
            //   }
          // ]
          }
        ]
      }
      return option
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
    useDrugPer () {
      let vm = this
      this.page.currentPage --
      if (this.page.currentPage < 1) {
        this.page.currentPage = 1
      }
      let position = this.computeStartend(vm.page.currentPage, vm.page.pageNum)
      let useDrug = echarts.init(document.getElementById('useDrug'))
      useDrug.setOption(this.useDrugOption(position.start, position.end))
    },
    useDrugNext () {
      let vm = this
      if (vm.page.currentPage > vm.page.pageNum) {
        vm.page.currentPage = vm.page.pageNum
      }
      if (vm.page.currentPage < vm.page.pages) {
        vm.page.currentPage ++
      }
      if (vm.page.pageNum >= vm.page.pages) {
        let position = this.computeStartend(vm.page.pageNum, vm.page.pageNum)
        let useDrug = echarts.init(document.getElementById('useDrug'))
        useDrug.setOption(this.useDrugOption(position.start, position.end))
        return
      }
      vm.page.pageNum ++
      vm.getData(vm.page.pageNum)
    }
  },
  watch: {
    page: {
      handler: function (val) {
        if (val.pages < 2) {
          this.useDrugBtnNext = false
          this.useDrugBtnPre = false
        } else {
          if (val.currentPage === val.pages) {
            this.useDrugBtnNext = false
          } else {
            this.useDrugBtnNext = true
          }
          if (val.currentPage !== 1) {
            this.useDrugBtnPre = true
          } else {
            this.useDrugBtnPre = false
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {
    let vm = this
    vm.getData()
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
  .chart img{
    height: 14px;
  }
  .text-center span{
    display: inline-block;
    height: 35px;
    text-align: center;
    vertical-align: middle;
    line-height: 35px;
    
  }
  .text-center img{
    height: 18px;
    width: 18px;
    vertical-align: middle;
  }
  .chart-head{
    margin-left: 80px;
    margin-top:12px;
    margin-bottom: 10px;
  }
  .chart-head span{
    display: inline-block;
    margin-right: 10px;
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
    bottom:1%;
    /* bottom:50%; */
    left: 25px;
    z-index:99;
  }
  .widthone{
    width: 100%;
  }
</style>
