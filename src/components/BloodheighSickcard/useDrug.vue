<template>
  <div>
    <el-card :body-style="{ padding: '0px' }">
      <div class="card-header">
        <p class="title">用药</p>
      </div>
      <!-- 图例 -->
      <div class="chart-head">
        <span class="text-center">
          <img src="./../../../hospitalImage/hospitalIcon/诊所-icon-34.png" alt="">
          <span>利尿剂</span> 
        </span>
        <span class="text-center">
          <img src="./../../../hospitalImage/hospitalIcon/诊所-icon-35.png" alt="">
          <span>β受体阻滞剂</span> 
        </span>
        <span class="text-center">
          <img src="./../../../hospitalImage/hospitalIcon/诊所-icon-36.png" alt="">
          <span>钙通道拮抗剂(CCB)</span> 
        </span>
        <span class="text-center">
          <img src="./../../../hospitalImage/hospitalIcon/诊所-icon-37.png" alt="">
          <span>血管紧张素抑制剂(ACEI)</span> 
        </span>
        <span class="text-center">
          <img src="./../../../hospitalImage/hospitalIcon/诊所-icon-38.png" alt="">
          <span>血管紧张素二受体阻滞剂(ARB)</span> 
        </span>
      </div>
      <!-- 图表 -->
      <div class="chart">
        <div id='useDrug'  :style="{width:'1000px',height:'680px'}"></div>
      </div>
      <table>
       
      </table>
    </el-card>
  </div>
</template>

<script>
import {useDrugApi} from './../../api/components/BloodheighSickcard/useDrug'
import {dateFormat} from './../../untils/date'
// import {deepcopy} from './../../untils/untils'
import echarts from 'echarts'
import LI from './../../../hospitalImage/hospitalIcon/诊所-icon-34.png'
import B from './../../../hospitalImage/hospitalIcon/诊所-icon-35.png'
import CCB from './../../../hospitalImage/hospitalIcon/诊所-icon-36.png'
import ACEI from './../../../hospitalImage/hospitalIcon/诊所-icon-37.png'
import ARB from './../../../hospitalImage/hospitalIcon/诊所-icon-38.png'
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
          'sysMedicineName': 'ACEI',
          'takeMedicineTime': '2018-03-07 18:46:50'
        },
        {
          'sysMedicineName': 'ACEI',
          'takeMedicineTime': '2018-03-07 12:25:43'

        },
        {
          'sysMedicineName': 'ACEI',
          'takeMedicineTime': '2018-03-07 08:25:43'
        },
        {
          'sysMedicineName': 'ACEI',
          'takeMedicineTime': '2018-03-08 18:46:50'
        },
        {
          'sysMedicineName': 'ACEI',
          'takeMedicineTime': '2018-03-09 12:25:43'

        },
        {
          'sysMedicineName': 'ACEI',
          'takeMedicineTime': '2018-03-10 18:25:43'
        },
        {
          'sysMedicineName': 'ACEI',
          'takeMedicineTime': '2018-03-08 08:46:50'
        },
        {
          'sysMedicineName': 'ACEI',
          'takeMedicineTime': '2018-03-09 02:25:43'

        },
        {
          'sysMedicineName': 'ACEI',
          'takeMedicineTime': '2018-03-10 18:25:43'
        }
      ],
      optionData: [],
      xasis: [],
      pageNum: 1,
      pageSize: 5
    }
  },
  methods: {
    getData (pagenum) {
      let pageNum = 1
      if (pagenum) {
        pageNum = pagenum
      }
      let vm = this
      let params = {
        'userId': vm.sickID,
        'adminHospitalId': vm.hospitalId,
        'bpMeasureTime': vm.bpMeasureTime || '',
        'pageNum': pageNum,
        'pageSize': vm.pageSize
      }
      this.$axios(useDrugApi(params))
      .then(res => {
        // console.log(res.data)
        if (res.data.data) {
          res.data.data.forEach((item, index) => {
            this.$set(this.data, index, item)
          })
          this.data = res.data.data
          // this.optionData = this.formatterDate(this.data)
          this.optionData = this.optionData.push.apply(this.optionData, res.data.data)
        }
        // console.log(this.optionData)
        // console.log(this.data)
        this.pages = res.data.pages
        let useDrug = echarts.init(document.getElementById('useDrug'))
        useDrug.setOption(this.useDrugOption())
      })
    },
    formatterDate (date) {
      let arr = date
      let xasis = []
      // let arr = deepcopy(date)

      if (arr.length <= 1) return date
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
        // 获取第一个值和后一个值比较
          let cur = dateFormat(arr[i].takeMedicineTime, 0)
          if (cur < dateFormat(arr[j].takeMedicineTime, 0)) {
        // 因为需要交换值，所以会把后一个值替换，我们要先保存下来
            let index = arr[j]
          // 交换值
            arr[j] = arr[i]
            arr[i] = index
          }
        }
      }
      let index = 0

      for (let n = 0; n < arr.length - 1; n++) {
        if (dateFormat(arr[n].takeMedicineTime, 0, 1) === dateFormat(arr[n + 1].takeMedicineTime, 0, 1)) {
          arr[n].x = index
          arr[n + 1].x = index
          if (xasis.indexOf(dateFormat(arr[n].takeMedicineTime, 0, 1)) === -1) {
            xasis.push(dateFormat(arr[n].takeMedicineTime, 0, 1))
          }
        } else {
          if (xasis.indexOf(dateFormat(arr[n].takeMedicineTime, 0, 1)) === -1) {
            xasis.push(dateFormat(arr[n].takeMedicineTime, 0, 1))
          }
          index++
          arr[n + 1].x = index
        }
      }
      for (let m = 0; m < arr.length; m++) {
        let dateSlice = arr[m].takeMedicineTime.slice(0, 11)
        let a0 = dateSlice + '00:00'
        let a2 = dateSlice + '02:00'
        let a4 = dateSlice + '04:00'
        let a6 = dateSlice + '06:00'
        let a8 = dateSlice + '08:00'
        let a10 = dateSlice + '10:00'
        let a12 = dateSlice + '12:00'
        let a14 = dateSlice + '14:00'
        let a16 = dateSlice + '16:00'
        let a18 = dateSlice + '18:00'
        let a20 = dateSlice + '20:00'
        let a22 = dateSlice + '22:00'
        let a24 = dateSlice + '24:00'
        if (!this.sortDate(arr[m].takeMedicineTime, a0)) {
          arr[m].y = 12
        } else if (!this.sortDate(arr[m].takeMedicineTime, a2)) {
          arr[m].y = 0
        } else if (!this.sortDate(arr[m].takeMedicineTime, a4)) {
          arr[m].y = 1
        } else if (!this.sortDate(arr[m].takeMedicineTime, a6)) {
          arr[m].y = 2
        } else if (!this.sortDate(arr[m].takeMedicineTime, a8)) {
          arr[m].y = 3
        } else if (!this.sortDate(arr[m].takeMedicineTime, a10)) {
          arr[m].y = 4
        } else if (!this.sortDate(arr[m].takeMedicineTime, a12)) {
          arr[m].y = 5
        } else if (!this.sortDate(arr[m].takeMedicineTime, a14)) {
          arr[m].y = 6
        } else if (!this.sortDate(arr[m].takeMedicineTime, a16)) {
          arr[m].y = 7
        } else if (!this.sortDate(arr[m].takeMedicineTime, a18)) {
          arr[m].y = 8
        } else if (!this.sortDate(arr[m].takeMedicineTime, a20)) {
          arr[m].y = 9
        } else if (!this.sortDate(arr[m].takeMedicineTime, a22)) {
          arr[m].y = 10
        } else if (!this.sortDate(arr[m].takeMedicineTime, a24)) {
          arr[m].y = 11
        }
      }

      arr = this.seriesItem(arr)
      // this.xasis = xasis
      this.xasis = this.xasis.push.apply(this.xasis, xasis)
      return arr
    },
    sortDate (date1, date2) {
      let oDate1 = new Date(date1)
      let oDate2 = new Date(date2)
      if (oDate1.getTime() > oDate2.getTime()) {
        return true
      } else {
        return false
      }
    },
    seriesItem (data) {
      let arr = []

      data.forEach(item => {
        let befor = ''
        let after = ''
        let icon = ''
        if (item.beforeDiastolic2 && item.beforeSystolic2) {
          befor = '[' + item.beforeDiastolic2 + '/' + item.beforeSystolic2 + ']'
        }
        if (item.adterSystolic && item.afterDiastolic) {
          after = '[' + item.beforeDiastolic2 + '/' + item.beforeSystolic2 + ']'
        }
        if (item.sysMedicineId) {
          if (item.sysMedicineId.split(',').indexOf('1') !== -1) {
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
          value: [item.x, item.y, befor, after, item.takeMedicineTime],
          label: {
            normal: {
              formatter: [
                '{bBg|' + befor + '}' + icon + '{liBg|' + after + '}'
              ].join('\n')
              // rich: {

              // }
            }
          }
        }
        arr.push(obj)
      })

      return arr
    },
    useDrugOption (start, end) {
      let zoomstart = 0
      let zoomend = 50
      if (start) {
        zoomstart = start
      }
      if (end) {
        zoomend = end
      }
      let hours = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00']
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
        title: {
          text: ''
        },
        legend: {
          data: ['Punch Card'],
          left: 'center',
          selectedMode: false
        },
        tooltip: {
        // 提示框组件
          backgroundColor: 'rgba(50,50,50,0.2)',

          formatter: function (a) {
            let befor = ''
            let after = ''
            let time = ''
            if (a.data.value[2]) {
              befor = '用药前两小时' + a.data.value[2]
            }
            if (a.data.value[3]) {
              after = '用药后两小时' + a.data.value[3]
            }
            if (a.data.value[4]) {
              time = a.data.value[4]
            }
            return (time + '<br>' + befor + '<br>' + after)
          }
        },
        grid: {
          left: '2%',
          bottom: '8%',
          right: '10%',
          top: 0,
          containLabel: true
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            start: zoomstart,
            end: zoomend,
            // handleSize: 50,
            minValueSpan: 6,
            maxValueSpan: 6
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
            width: 500
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
        series: [{
        // name: 'Punch Card',
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
          //     value: [1, 0, '[120/120][120/120]'],
          //     label: {
          //       normal: {
          //         formatter: [
          //           '{bBg|[120/120]}{li|}{b|}{liBg|[120/120]}'
          //           // '{blackBg|[120/120]}',
          //           // '{hr|}',
          //           // '{li|} {b|}',
          //           // '{hr|}',
          //           // '[120/120]'
          //         ].join('\n'),
          //         rich: {

          //         }
          //       }
          //     }
          //   },
          //   {
          //     value: [3, 2, '[120/120][120/120]'],
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
    useDrug.setOption(this.useDrugOption())
    this.getData()
    useDrug.on('datazoom', function (chartsparams) {
      if (chartsparams.end === 100) {
        if (vm.pageNum >= vm.pages) {
          return
        }
        vm.pageNum++
        vm.getData(vm.pageNum)
        useDrug.setOption(this.useDrugOption(50, 80))
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
