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
      <div class="chart" v-loading="loading">
        <div id='useDrug'  :style="{width:'auto',height:'650px'}"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {useDrugApi} from './../../api/components/BloodheighSickcard/useDrug'
// import {dateFormat} from './../../untils/date'
// import {deepcopy} from './../../untils/untils'
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
      data: [
        {
          'takeMedicineTime': '2018-04-29 10:25:31',
          'sysMedicineName': 'ACEI',
          'sysMedicineId': '1',
          'id': 236,
          'userId': 12
        },
        {
          'beforeDiastolic2': 93,
          'beforeSystolic2': 155,
          'takeMedicineTime': '2018-04-26 16:26:26',
          'sysMedicineName': 'ACEI',
          'sysMedicineId': '1',
          'id': 199,
          'userId': 12
        },
        {
          'beforeDiastolic2': 83,
          'beforeSystolic2': 138,
          'takeMedicineTime': '2018-04-25 17:18:39',
          'sysMedicineName': 'ACEI',
          'sysMedicineId': '1',
          'id': 187,
          'userId': 12
        },
        {
          'beforeDiastolic2': 83,
          'beforeSystolic2': 138,
          'takeMedicineTime': '2018-04-25 17:18:22',
          'sysMedicineName': 'ACEI',
          'sysMedicineId': '1',
          'id': 186,
          'userId': 12
        },
        {
          'beforeDiastolic2': 83,
          'beforeSystolic2': 138,
          'takeMedicineTime': '2018-04-25 17:18:20',
          'sysMedicineName': 'ACEI',
          'sysMedicineId': '1',
          'id': 184,
          'userId': 12
        }
      ],
      optionData: [],
      xasis: [],
      pageNum: 1,
      pageSize: 5,
      pages: 1,
      initX: 0,
      loading: true
    }
  },
  methods: {
    getData (pagenum) {
      let vm = this
      if (!pagenum) { pagenum = 1 }
      let params = {
        'userId': vm.sickID,
        'adminHospitalId': vm.hospitalId,
        'pageNum': pagenum,
        'pageSize': this.pageSize
      }
      this.$axios(useDrugApi(params))
      .then(res => {
        this.loading = true
        if (res.data.data) {
          let copydata = res.data.data
          copydata = this._.filter(copydata, function (item) {
            let hasBlood
            if (item.beforeDiastolic2 || item.beforeSystolic2 || item.adterSystolic || item.afterDiastolic) {
              hasBlood = true
            } else {
              hasBlood = false
            }
            return item.takeMedicineTime && hasBlood
          })
          copydata = this._.sortBy(copydata, function (item) {
            return item.takeMedicineTime
          })
          // this.formatter(copydata)
          // this.formatter(copydata)
          // console.log('copydata', copydata)
          // console.log('optiondata', this.formatter(copydata))
          // console.log('date', this.dateX(copydata))
          // console.log('ot', this.seriesItem(this.formatter(copydata)))
          // copydata.
          this.optionData = this._.concat(this.optionData, this.seriesItem(this.formatter(copydata)))
          this.xasis = this._.concat(this.xasis, this.dateX(copydata))
          console.log(this.optionData)
          console.log(this.xasis)
        }
        let useDrug = echarts.init(document.getElementById('useDrug'))
        useDrug.setOption(this.useDrugOption())
        this.pageNum = res.data.pageNum
        this.pages = res.data.pages
        this.loading = false
        // console.log(res.data)
      })
    },
    formatter (arr) {
      let vm = this
      let optionarr = []
      if (arr.length > 0) {
        // let initX = 0
        // let initY = 0
        for (let i = 0; i < arr.length - 1; i++) {
          let readyarr = [] // 准备加入option的数组
          let X = arr[i].takeMedicineTime.slice(0, 11)
          let afterX = arr[i + 1].takeMedicineTime.slice(0, 11)
          if (this._.eq(X, afterX)) {
            readyarr.push(vm.initX)
            readyarr.push(this.axisY(arr[i].takeMedicineTime))

            // initY += 1
            if (!this._.isUndefined(arr[i].beforeDiastolic2)) {
              readyarr.push(arr[i].beforeDiastolic2)  // 低压
            } else {
              readyarr.push('未测量')  // 低压
            }
            if (!this._.isUndefined(arr[i].beforeSystolic2)) {
              readyarr.push(arr[i].beforeSystolic2)
            } else {
              readyarr.push('未测量')
            }
            if (!this._.isUndefined(arr[i].adterSystolic)) {
              readyarr.push(arr[i].adterSystolic)
            } else {
              readyarr.push('未测量')
            }
            if (!this._.isUndefined(arr[i].afterDiastolic)) {
              readyarr.push(arr[i].afterDiastolic)
            } else {
              readyarr.push('未测量')
            }
            readyarr.push(arr[i].takeMedicineTime)
            readyarr.push(arr[i].sysMedicineId)
            optionarr.push(readyarr)
          } else {
            if (vm.initX === 0) {
              readyarr.push(vm.initX)

              readyarr.push(this.axisY(arr[i].takeMedicineTime))
              if (!this._.isUndefined(arr[i].beforeDiastolic2)) {
                readyarr.push(arr[i].beforeDiastolic2)  // 低压
              } else {
                readyarr.push('未测量')  // 低压
              }
              if (!this._.isUndefined(arr[i].beforeSystolic2)) {
                readyarr.push(arr[i].beforeSystolic2)
              } else {
                readyarr.push('未测量')
              }
              if (!this._.isUndefined(arr[i].adterSystolic)) {
                readyarr.push(arr[i].adterSystolic)
              } else {
                readyarr.push('未测量')
              }
              if (!this._.isUndefined(arr[i].afterDiastolic)) {
                readyarr.push(arr[i].afterDiastolic)
              } else {
                readyarr.push('未测量')
              }
              readyarr.push(arr[i].takeMedicineTime)
              readyarr.push(arr[i].sysMedicineId)
              optionarr.push(readyarr)
            } else {
              vm.initX = vm.initX + 1
              // initY = 0
              readyarr.push(vm.initX)
              readyarr.push(this.axisY(arr[i].takeMedicineTime))
              // initY += 1
              if (!this._.isUndefined(arr[i].beforeDiastolic2)) {
                readyarr.push(arr[i].beforeDiastolic2)  // 低压
              } else {
                readyarr.push('未测量')  // 低压
              }
              if (!this._.isUndefined(arr[i].beforeSystolic2)) {
                readyarr.push(arr[i].beforeSystolic2)
              } else {
                readyarr.push('未测量')
              }
              if (!this._.isUndefined(arr[i].adterSystolic)) {
                readyarr.push(arr[i].adterSystolic)
              } else {
                readyarr.push('未测量')
              }
              if (!this._.isUndefined(arr[i].afterDiastolic)) {
                readyarr.push(arr[i].afterDiastolic)
              } else {
                readyarr.push('未测量')
              }
              readyarr.push(arr[i].takeMedicineTime)
              readyarr.push(arr[i].sysMedicineId)
              optionarr.push(readyarr)
            }
          }
        }
        // let last = arr[i].takeMedicineTime.slice(0, 11)
        if (this._.eq(arr[arr.length - 1].takeMedicineTime.slice(0, 11), arr[arr.length - 2].takeMedicineTime.slice(0, 11))) {
          let readyarr = []
          readyarr.push(vm.initX)
          readyarr.push(this.axisY(arr[arr.length - 1].takeMedicineTime))
          if (!this._.isUndefined(arr[arr.length - 1].beforeDiastolic2)) {
            readyarr.push(arr[arr.length - 1].beforeDiastolic2)  // 低压
          } else {
            readyarr.push('未测量')  // 低压
          }
          if (!this._.isUndefined(arr[arr.length - 1].beforeSystolic2)) {
            readyarr.push(arr[arr.length - 1].beforeSystolic2)
          } else {
            readyarr.push('未测量')
          }
          if (!this._.isUndefined(arr[arr.length - 1].adterSystolic)) {
            readyarr.push(arr[arr.length - 1].adterSystolic)
          } else {
            readyarr.push('未测量')
          }
          if (!this._.isUndefined(arr[arr.length - 1].afterDiastolic)) {
            readyarr.push(arr[arr.length - 1].afterDiastolic)
          } else {
            readyarr.push('未测量')
          }
          readyarr.push(arr[arr.length - 1].takeMedicineTime)
          readyarr.push(arr[arr.length - 1].sysMedicineId)
          optionarr.push(readyarr)
        } else {
          let readyarr = []
          vm.initX = vm.initX + 1
          readyarr.push(vm.initX)
          readyarr.push(this.axisY(arr[arr.length - 1].takeMedicineTime))
          if (!this._.isUndefined(arr[arr.length - 1].beforeDiastolic2)) {
            readyarr.push(arr[arr.length - 1].beforeDiastolic2)  // 低压
          } else {
            readyarr.push('未测量')  // 低压
          }
          if (!this._.isUndefined(arr[arr.length - 1].beforeSystolic2)) {
            readyarr.push(arr[arr.length - 1].beforeSystolic2)
          } else {
            readyarr.push('未测量')
          }
          if (!this._.isUndefined(arr[arr.length - 1].adterSystolic)) {
            readyarr.push(arr[arr.length - 1].adterSystolic)
          } else {
            readyarr.push('未测量')
          }
          if (!this._.isUndefined(arr[arr.length - 1].afterDiastolic)) {
            readyarr.push(arr[arr.length - 1].afterDiastolic)
          } else {
            readyarr.push('未测量')
          }
          readyarr.push(arr[arr.length - 1].takeMedicineTime)
          readyarr.push(arr[arr.length - 1].sysMedicineId)
          optionarr.push(readyarr)
        }
        vm.initX += 1
        // if(arr[arr.length-1])
      }
      return optionarr
        // arr[m].takeMedicineTime.slice(0, 11)
    },
    dateX (arr) {
      let time = []
      if (arr.length > 0) {
        for (let i = 0; i < arr.length - 1; i++) {
          let X = arr[i].takeMedicineTime.slice(0, 11)
          let afterX = arr[i + 1].takeMedicineTime.slice(0, 11)
          if (!this._.eq(X, afterX)) {
            // if (i === 0) {
            time.push(X)
            // }
          }
        }
        if (!this._.eq(arr[arr.length - 1].takeMedicineTime.slice(0, 11), arr[arr.length - 2].takeMedicineTime.slice(0, 11))) {
          time.push(arr[arr.length - 1].takeMedicineTime.slice(0, 11))
        }
        // if(arr[arr.length-1].takeMedicineTime.slice(0, 11))
      }
      return time
    },
    axisY (str) {
      let time = str.slice(11, -1)
      let y
      let a0 = '00:00'
      let a2 = '02:00'
      let a4 = '04:00'
      let a6 = '06:00'
      let a8 = '08:00'
      let a10 = '10:00'
      let a12 = '12:00'
      let a14 = '14:00'
      let a16 = '16:00'
      let a18 = '18:00'
      let a20 = '20:00'
      let a22 = '22:00'
      if (this._.gte(time, a22)) {
        y = 11
      } else if (this._.gte(time, a20)) {
        y = 10
      } else if (this._.gte(time, a18)) {
        y = 9
      } else if (this._.gte(time, a16)) {
        y = 8
      } else if (this._.gte(time, a14)) {
        y = 7
      } else if (this._.gte(time, a12)) {
        y = 6
      } else if (this._.gte(time, a10)) {
        y = 5
      } else if (this._.gte(time, a8)) {
        y = 4
      } else if (this._.gte(time, a6)) {
        y = 3
      } else if (this._.gte(time, a4)) {
        y = 2
      } else if (this._.gte(time, a2)) {
        y = 1
      } else if (this._.gte(time, a0)) {
        y = 0
      }
      return y
    },
    // getData (pagenum) {
    //   let pageNum = 1
    //   if (pagenum) {
    //     pageNum = pagenum
    //   }
    //   let vm = this
    //   let params = {
    //     'userId': vm.sickID,
    //     'adminHospitalId': vm.hospitalId,
    //     // 'bpMeasureTime': vm.bpMeasureTime || '',
    //     'pageNum': pageNum,
    //     'pageSize': vm.pageSize
    //   }
    //   this.$axios(useDrugApi(params))
    //   .then(res => {
    //     if (res.data.data) {
    //       res.data.data.forEach((item, index) => {
    //         this.data.push(item)
    //         this.optionData.push(item)
    //         // this.$set(this.data, index, item)
    //       })
    //       // this.data = res.data.data
    //       // this.optionData = this.formatterDate(this.data)
    //       // this.optionData = this.optionData.push.apply(this.optionData, res.data.data)
    //     }
    //     this.pages = res.data.pages
    //     let useDrug = echarts.init(document.getElementById('useDrug'))
    //     useDrug.setOption(this.useDrugOption())
    //   })
    // },
    // formatterDate (date) {
    //   let arr = date
    //   let xasis = []
    //   // let arr = deepcopy(date)
    //   if (arr.length <= 1) return date
    //   for (let i = 0; i < arr.length; i++) {
    //     for (let j = 0; j < arr.length; j++) {
    //     // 获取第一个值和后一个值比较
    //       let cur = dateFormat(arr[i].takeMedicineTime, 0)
    //       if (cur < dateFormat(arr[j].takeMedicineTime, 0)) {
    //     // 因为需要交换值，所以会把后一个值替换，我们要先保存下来
    //         let index = arr[j]
    //       // 交换值
    //         arr[j] = arr[i]
    //         arr[i] = index
    //       }
    //     }
    //   }
    //   let index = 0

    //   for (let n = 0; n < arr.length - 1; n++) {
    //     if (dateFormat(arr[n].takeMedicineTime, 0, 1) === dateFormat(arr[n + 1].takeMedicineTime, 0, 1)) {
    //       arr[n].x = index
    //       arr[n + 1].x = index
    //       if (xasis.indexOf(dateFormat(arr[n].takeMedicineTime, 0, 1)) === -1) {
    //         xasis.push(dateFormat(arr[n].takeMedicineTime, 0, 1))
    //       }
    //     } else {
    //       if (xasis.indexOf(dateFormat(arr[n].takeMedicineTime, 0, 1)) === -1) {
    //         xasis.push(dateFormat(arr[n].takeMedicineTime, 0, 1))
    //       }
    //       index++
    //       arr[n + 1].x = index
    //     }
    //   }
    //   for (let m = 0; m < arr.length; m++) {
    //     let dateSlice = arr[m].takeMedicineTime.slice(0, 11)
    //     let a0 = dateSlice + '00:00'
    //     let a2 = dateSlice + '02:00'
    //     let a4 = dateSlice + '04:00'
    //     let a6 = dateSlice + '06:00'
    //     let a8 = dateSlice + '08:00'
    //     let a10 = dateSlice + '10:00'
    //     let a12 = dateSlice + '12:00'
    //     let a14 = dateSlice + '14:00'
    //     let a16 = dateSlice + '16:00'
    //     let a18 = dateSlice + '18:00'
    //     let a20 = dateSlice + '20:00'
    //     let a22 = dateSlice + '22:00'
    //     // let a24 = dateSlice + '24:00'
    //     if (!this.sortDate(arr[m].takeMedicineTime, a0)) {
    //       arr[m].y = 12
    //     } else if (!this.sortDate(arr[m].takeMedicineTime, a2)) {
    //       arr[m].y = 0
    //     } else if (!this.sortDate(arr[m].takeMedicineTime, a4)) {
    //       arr[m].y = 1
    //     } else if (!this.sortDate(arr[m].takeMedicineTime, a6)) {
    //       arr[m].y = 2
    //     } else if (!this.sortDate(arr[m].takeMedicineTime, a8)) {
    //       arr[m].y = 3
    //     } else if (!this.sortDate(arr[m].takeMedicineTime, a10)) {
    //       arr[m].y = 4
    //     } else if (!this.sortDate(arr[m].takeMedicineTime, a12)) {
    //       arr[m].y = 5
    //     } else if (!this.sortDate(arr[m].takeMedicineTime, a14)) {
    //       arr[m].y = 6
    //     } else if (!this.sortDate(arr[m].takeMedicineTime, a16)) {
    //       arr[m].y = 7
    //     } else if (!this.sortDate(arr[m].takeMedicineTime, a18)) {
    //       arr[m].y = 8
    //     } else if (!this.sortDate(arr[m].takeMedicineTime, a20)) {
    //       arr[m].y = 9
    //     } else if (!this.sortDate(arr[m].takeMedicineTime, a22)) {
    //       arr[m].y = 10
    //     }
    //     // else if (!this.sortDate(arr[m].takeMedicineTime, a24)) {
    //     //   arr[m].y = 11
    //     // }
    //   }

    //   arr = this.seriesItem(arr)
    //   // this.xasis = xasis
    //   xasis.forEach(item => {
    //     this.xasis.push(item)
    //   })
    //   // this.xasis = this.xasis.push.apply(this.xasis, xasis)
    //   return arr
    // },
    // sortDate (date1, date2) {
    //   let oDate1 = new Date(date1)
    //   let oDate2 = new Date(date2)
    //   if (oDate1.getTime() > oDate2.getTime()) {
    //     return true
    //   } else {
    //     return false
    //   }
    // },
    seriesItem (data) {
      let arr = []
      if (data.length > 0) {
        data.forEach(item => {
          let befor = ''
          let after = ''
          let icon = ''
          // if (item.beforeDiastolic2 && item.beforeSystolic2) {
          befor = '[' + item[2] + '/' + item[3] + ']'
          // }
          if (item[4] !== '未测量' && item[5] !== '未测量') {
            after = '[' + item[4] + '/' + item[5] + ']'
          }
          if (item[7]) {
            if (item[7].split(',').indexOf('1') !== -1) {
              icon += '{acei|}'
            }
            if (item[7].split(',').indexOf('2') !== -1) {
              icon += '{ccb|}'
            }
            if (item[7].split(',').indexOf('3') !== -1) {
              icon += '{arb|}'
            }
            if (item[7].split(',').indexOf('4') !== -1) {
              icon += '{b|}'
            }
            if (item[7].split(',').indexOf('6') !== -1) {
              icon += '{li|}'
            }
          }
          let obj = {
            value: [item[0], item[1], befor, after, item[6]],
            label: {
              normal: {
                formatter: [
                  '{bBg|' + befor + '}',
                  '{hr|}',
                  icon,
                  '{hr|}',
                  '{liBg|' + after + '}'
                ].join('\n'),
                rich: {
                }
              }
            }
          }
          arr.push(obj)
        })
      }

      return arr
    },
    useDrugOption (start, end) {
      let zoomstart = 0
      let zoomend = 17
      if (start) {
        zoomstart = start
      }
      if (end) {
        zoomend = end
      }
      if (this.xasis.length <= 6) {
        zoomend = 98
      }
      // console.log('zoomend', zoomend)
      let hours = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']
      // let days = ['2017/12/06', '2017/12/07', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06']
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
          left: '2%',
          bottom: '8%',
          right: '10%',
          top: 0,
          containLabel: true
        },
        tooltip: {
        // 提示框组件
          backgroundColor: 'rgba(50,50,50,0.2)',

          formatter: function (a) {
            // console.log(a)
            let befor = ''
            let after = ''
            let time = ''
            if (a.data.value[2] !== '') {
              befor = '用药前两小时' + a.data.value[2]
            }
            if (a.data.value[3] !== '') {
              after = '用药后两小时' + a.data.value[3]
            }
            if (a.data.value[4]) {
              time = a.data.value[4]
            }
            return (time + '<br>' + befor + '<br>' + after)
          }
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            showDataShadow: false,
            start: zoomstart,
            end: zoomend,
            // start: 0,
            // end: 10,
            // handleSize: 50,
            showDetail: false,
            // minValueSpan: 98,
            // maxValueSpan: 98,
            handleIcon: 'M8.2,13.6V3.9H6.3v9.7H3.1v14.9h3.3v9.7h1.8v-9.7h3.3V13.6H8.2z M9.7,24.4H4.8v-1.4h4.9V24.4z M9.7,19.1H4.8v-1.4h4.9V19.1z',
            // handleSize: '30%',
            handleStyle: {
              color: '#80cbc4'
            },
            fillerColor: '#d8faf4',
            borderColor: '#b1b1b1',
            minValueSpan: 6,
            maxValueSpan: 6,
            zoomlock: true
          }
        ],
        xAxis: {
          type: 'category',
          data: days,
          // data: ['2017/12/06', '2017/12/07', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06'],
          boundaryGap: true,
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
            show: false,
            alignWithLabel: true
          },
          // axisLabel: {
          //   width: 500
          // },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#999',
              width: 1
            }
          }
        },
        yAxis: {
          type: 'category',
          boundaryGap: true,
          data: hours,
          splitLine: {
            show: true
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            margin: 8,
            verticalAlign: 'top'
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#999',
              width: 1
            }
          }
        },
        series: [{
        // name: 'medicine',
          type: 'scatter',
          symbol: 'rect',
          symbolSize: [60, 15],
          label: {
            normal: {
              show: true,
              color: '#000',
              fontSize: 10,
              align: 'center',
              rich: {
                bBg: {
                  backgroundColor: '#f4e07a',
                  color: '#fff',
                  fontSize: 10,
                  align: 'center',
                  fontWeight: 'bold'
                  // fontWeight: 'blod'
                },
                liBg: {
                  backgroundColor: '#81cefc',
                  color: '#fff',
                  fontSize: 10,
                  align: 'center',
                  fontWeight: 'bold'
                  // fontWeight: 'blod'
                },
                ccbBg: {
                  backgroundColor: '#7cedc4',
                  color: '#fff',
                  fontSize: 10,
                  align: 'center',
                  fontWeight: 'bold'
                  // fontWeight: 'blod'
                },
                aceiBg: {
                  backgroundColor: '#9c9ce2',
                  color: '#fff',
                  fontSize: 10,
                  align: 'center',
                  fontWeight: 'bold'
                  // fontWeight: 'blod'
                },
                arbBg: {
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
                  height: 15,
                  align: 'center',
                  backgroundColor: {
                    image: Icons.li
                  }
                },
                b: {
                  height: 15,
                  align: 'center',
                  backgroundColor: {
                    image: Icons.b
                  }
                },
                ccb: {
                  height: 15,
                  align: 'center',
                  backgroundColor: {
                    image: Icons.ccb
                  }
                },
                acei: {
                  height: 15,
                  align: 'center',
                  backgroundColor: {
                    image: Icons.acei
                  }
                },
                arb: {
                  height: 15,
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
        }]
      }
      return option
    }
  },
  mounted () {
    let vm = this
    let useDrug = echarts.init(document.getElementById('useDrug'))
    useDrug.setOption(vm.useDrugOption())
    vm.getData()
    // console.log('medicine', this.getData())
    useDrug.on('datazoom', function (chartsparams) {
      if (chartsparams.end === 100) {
        if (vm.pageNum >= vm.pages) {
          // return
        } else {
          // console.log(vm.pages)
          vm.loading = false
          vm.pageNum++
          vm.getData(vm.pageNum)
          useDrug.setOption(vm.useDrugOption())
          vm.loading = true
        }
      }
    })
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


</style>
