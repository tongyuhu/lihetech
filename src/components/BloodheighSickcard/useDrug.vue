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
            <el-button size="mini" :disabled="!useDrugBtnNext" icon="el-icon-arrow-left" @click="useDrugNext" type="text" :style="{'font-size':'18px','color':'#999','background':'#eaeaea'}"></el-button>
            <!-- <el-button size="mini" :disabled="!useDrugBtnPre" icon="el-icon-arrow-left" @click="useDrugPer" type="text" :style="{'font-size':'18px','color':'#999','background':'#eaeaea'}"></el-button> -->
          </div>
          <div class="chart-min-width">
            <div v-loading="loading" id='useDrug'  :style="{width:'auto',height:'650px'}"></div>
          </div>
          <div class="flex-btn">
            <el-button size="mini" :disabled="!useDrugBtnPre" icon="el-icon-arrow-right" @click="useDrugPer" type="text" :style="{'font-size':'18px','color':'#999','background':'#eaeaea'}"></el-button>
            <!-- <el-button size="mini" :disabled="!useDrugBtnNext" icon="el-icon-arrow-right" @click="useDrugNext" type="text" :style="{'font-size':'18px','color':'#999','background':'#eaeaea'}"></el-button> -->
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {useDrugApi} from './../../api/components/BloodheighSickcard/useDrug'
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
        pageSize: 15,
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
      befor: {
        takeMedicineTime: '00000000000'
      }

    }
  },
  methods: {
    // 获取数据
    getData (pagenum) {
      let vm = this
      vm.loading = true
      if (!pagenum) { pagenum = 1 }
      let params = {
        'userId': vm.sickID,
        'adminHospitalId': vm.hospitalId,
        'pageNum': pagenum,
        'pageSize': this.page.pageSize
      }
      vm.$axios(useDrugApi(params))
      .then(res => {
        // vm.loading = true
        console.log('vm.loading', vm.loading)
        if (res.data.data) {
          let copydata = res.data.data
          copydata = vm._.filter(copydata, function (item) {
            let hasBlood
            let hasBD = vm._.has(item, 'beforeDiastolic2')
            let hasBS = vm._.has(item, 'beforeSystolic2')
            let hasAS = vm._.has(item, 'afterSystolic')
            let hasAD = vm._.has(item, 'afterDiastolic')
            let hasT = vm._.has(item, 'takeMedicineTime')
            if (hasBD || hasBS || hasAS || hasAD) {
              hasBlood = true
            } else {
              hasBlood = false
            }
            return hasT && hasBlood
          })
          let merge = function (item) {
            let obj = {
              beforeDiastolic2: 'null',
              beforeSystolic2: 'null',
              bpTypeBefore: 'null',
              afterSystolic: 'null',
              afterDiastolic: 'null',
              bpTypeAfter: 'null',
              sysMedicineId: 'null'
            }
            return vm._.merge(obj, item)
          }
          copydata = vm._.map(copydata, merge)
          copydata = vm._.sortBy(copydata, function (item) {
            return item.takeMedicineTime
          })
          // copydata = copydata.reverse()
          this.sourData = vm._.concat(copydata, this.sourData)
          let useDrugData = vm.formatter(this.sourData)
          let theX = vm.axisX(copydata)
          vm.optionData = vm.seriesItem(useDrugData)
          // vm.optionData = vm._.concat(vm.seriesItem(useDrugData), vm.optionData)
          vm.xasis = vm._.uniq(vm._.concat(theX, vm.xasis))
          // vm.optionData = vm._.concat(vm.optionData, vm.seriesItem(useDrugData))
          // vm.xasis = vm._.uniq(vm._.concat(vm.xasis, theX))
          vm.optionData = vm.optionData
          vm.xasis = vm.xasis
        }

        vm.loading = false
        let position = this.computeStartend(vm.page.currentPage, vm.page.pageNum)
        let useDrug = echarts.init(document.getElementById('useDrug'))
        useDrug.setOption(this.useDrugOption(position.start, position.end))
        this.page.pageNum = res.data.pageNum
        this.page.pages = res.data.pages
      })
    },
    // 格式化数据 计算x，y轴坐标
    formatter (arr) {
      let vm = this
      let readyarr = []
      let befor = {
        takeMedicineTime: '00000000000'
      }
      let initX = -1
      vm._(arr).forEach(function (value, index) {
        // if (index === 0) {
          // value.x = 0
        // } else {
        let time = value.takeMedicineTime.slice(0, 10)
        let befortime = befor.takeMedicineTime.slice(0, 10)
        if (vm._.eq(time, befortime)) {
          value.x = initX
        } else {
          initX++
          value.x = initX
        }
        // }
        value.y = vm.axisY(value.takeMedicineTime)
        readyarr.push(value)
        befor = value
      })
      return readyarr
    },
    // 计算X轴坐数据
    axisX (arr) {
      let vm = this
      let x = []
      vm._(arr).forEach(function (item, index) {
        x.push(item.takeMedicineTime.slice(0, 10))
      })
      x = vm._.uniq(x)
      return x
    },
    // 计算Y轴坐标
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
          let befor = ''
          let befordata = ''
          let after = ''
          let afterdata = ''
          let icon = ''
          if (item.beforeDiastolic2 !== 'null' && item.beforeSystolic2 !== 'null') {
            let bg = this.colorBg(item.bpTypeBefore)
            befor = '{' + bg + '|' + '[' + item.beforeSystolic2 + '/' + item.beforeDiastolic2 + ']' + '}'
            // befordata = '[' + item.beforeDiastolic2 + '/' + item.beforeSystolic2 + ']'
            befordata = '[' + item.beforeSystolic2 + '/' + item.beforeDiastolic2 + ']'
          }
          if (item.afterDiastolic !== 'null' && item.afterSystolic !== 'null') {
            let bg = this.colorBg(item.bpTypeAfter)
            after = '{' + bg + '|' + '[' + item.afterSystolic + '/' + item.afterDiastolic + ']' + '}'
            afterdata = '[' + item.afterSystolic + '/' + item.afterDiastolic + ']'
            // afterdata = '[' + item.afterDiastolic + '/' + item.afterSystolic + ']'
          }
          if (item.sysMedicineId !== 'null') {
            if (item.sysMedicineId.split(',').indexOf('1') !== -1) {
              // console.log('item.sysMedicineId.split(', ')', item.sysMedicineId.split(','))
              icon += '{acei|}'
            }
            if (item.sysMedicineId.split(',').indexOf('2') !== -1) {
              icon += '{ccb|}'
            }
            if (item.sysMedicineId.split(',').indexOf('3') !== -1) {
              icon += '{arb|}'
            }
            if (item.sysMedicineId.split(',').indexOf('4') !== -1) {
              icon += '{b|}'
            }
            if (item.sysMedicineId.split(',').indexOf('6') !== -1) {
              icon += '{li|}'
            }
          }
          let obj = {
            value: [item.x, item.y, befordata, afterdata, item.takeMedicineTime],
            label: {
              normal: {
                formatter: [
                  befor,
                  '{hr|}',
                  icon,
                  '{hr|}',
                  after
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
      let vm = this
      let x1 = ''
      let zoomstart = 0
      let zoomend = 100
      console.log('888888')
      if (start) {
        zoomstart = start
      }
      if (end) {
        zoomend = end
      }
      // if (this.xasis.length <= 6) {
      //   zoomend = 98
      // }
      let hours = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']
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
          left: '80',
          bottom: '8%',
          right: '80',
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
            // xAxisIndex: [0, 1],
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
            // type: 'slider',
            // show: true,
            // showDataShadow: false,
            // start: zoomstart,
            // end: zoomend,
            // // start: 0,
            // // end: 10,
            // // handleSize: 50,
            // showDetail: false,
            // // minValueSpan: 98,
            // // maxValueSpan: 98,
            // handleIcon: 'M8.2,13.6V3.9H6.3v9.7H3.1v14.9h3.3v9.7h1.8v-9.7h3.3V13.6H8.2z M9.7,24.4H4.8v-1.4h4.9V24.4z M9.7,19.1H4.8v-1.4h4.9V19.1z',
            // // handleSize: '30%',
            // handleStyle: {
            //   color: '#80cbc4'
            // },
            // fillerColor: '#d8faf4',
            // borderColor: '#b1b1b1',
            // minValueSpan: 6,
            // maxValueSpan: 6,
            // zoomlock: true
          }
        ],
        xAxis: {
          type: 'category',
          data: days,
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
          axisLabel: {
            interval: 0, // 显示x轴数据
            showMinLabel: true,
            showMaxLabel: true,
            align: 'center',
            rotate: 0,
            formatter: function (val) {
              let value
              let time = val.slice(0, 4)
              // console.log('time', time)
              // console.log('x1', x1)
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
        series: [
          {
            name: 'medicine',
            xAxisIndex: 0,
            type: 'scatter',
            symbol: 'rect',
            symbolSize: [60, 15],
            label: {
              normal: {
                show: true,
                color: '#000',
                fontSize: 12,
                align: 'center',
                rich: {
                  normalBg: {
                    backgroundColor: '#33b2f2',
                    color: '#fff',
                    fontSize: 12,
                    align: 'center',
                    fontWeight: 'bold'
                  },
                  middleBg: {
                    backgroundColor: '#32b77a',
                    color: '#fff',
                    fontSize: 12,
                    align: 'center',
                    fontWeight: 'bold'
                  },
                  normalheighBg: {
                    backgroundColor: '#efa13a',
                    color: '#fff',
                    fontSize: 12,
                    align: 'center',
                    fontWeight: 'bold'
                  },
                  middleheighBg: {
                    backgroundColor: '#ff7d43',
                    color: '#fff',
                    fontSize: 12,
                    align: 'center',
                    fontWeight: 'bold'
                  },
                  dangerBg: {
                    backgroundColor: '#f96767',
                    color: '#fff',
                    fontSize: 12,
                    align: 'center',
                    fontWeight: 'bold'
                  },
                  nullBg: {
                    backgroundColor: '#666',
                    color: '#fff',
                    fontSize: 12,
                    align: 'center',
                    fontWeight: 'bold'
                  },
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
                    fontSize: 12,
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
    bottom:50%;
    left: 25px;
    z-index:99;
  }
  .widthone{
    width: 100%;
  }
</style>
