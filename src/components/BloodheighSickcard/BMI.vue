<template>
  <div>
    <el-card :body-style="{ padding: '0px' }">
      <div class="card-header">
          <p class="title">血压与BMI</p>
      </div>
      <div>
        <el-row type="flex">
          <div class="flex">
            <div class="flex-btn-left">
              <el-button :disabled="BMIBtnNext" @click="bloodBMINext" icon="el-icon-arrow-left"  type="text" :style="{'font-size':'28px','color':'#999','background':'#eaeaea'}"></el-button>
            </div>
            <div class="chart-min-width kaluli-wrap">
              <div id='bloodBMI' :style="{width:'auto',height:'500px'}"></div>
            </div>
            <div class="flex-btn">
              <el-button :disabled="BMIBtnPre" @click="bloodBMIPer" icon="el-icon-arrow-right"  type="text" :style="{'font-size':'28px','color':'#999','background':'#eaeaea'}"></el-button>
            </div>
          </div>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
import {mapState} from 'vuex'
import {BMIApi} from '@/api/components/BloodheighSickcard/BMI'
export default {
  name: 'BMI',
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
      bloodBMIData: {
        x: [],
        systolic: [],
        diastolic: [],
        bpType: [],
        bmi: [],
        pages: 1,
        pageNum: 1,
        currentPage: 1
      },
      BMIBtnPre: true,
      BMIBtnNext: true
    }
  },
  computed: {
    ...mapState(['currentSickInfo'])
  },
  methods: {
    updateBMI () {
      let params = {
        'userId': this.sickID,
        'adminHospitalId': this.hospitalId,
        'pageNum': this.bloodBMIData.pageNum,
        'pageSize': 10
      }
      this.$axios(BMIApi(params))
      .then(res => {
        if (res.data) {
          this.$set(this.bloodBMIData, 'pages', res.data.pages)
          if (res.data.data) {
            if (res.data.data.length !== 0) {
              res.data.data.forEach((item, index) => {
                if (!item.systolic) {
                  item.systolic = 0
                }
                if (!item.diastolic) {
                  item.diastolic = 0
                }
                if (!item.bmi) {
                  console.log('otherposition', this.currentSickInfo)
                  if (this._.has(this.currentSickInfo, 'BMI')) {
                    item.bmi = this.currentSickInfo.BMI
                  } else if (this._.has(this.currentSickInfo, 'userBody')) {
                    if (this._.has(this.currentSickInfo.userBody, 'bmi')) {
                      item.bmi = this.currentSickInfo.userBody.bmi
                    }
                  } else {
                    item.bmi = 0
                  }
                }
                if (!item.bpType) {
                  item.bpType = 0
                }
                this.bloodBMIData.x.push(item.createTime)
                this.bloodBMIData.systolic.push(item.systolic)
                this.bloodBMIData.diastolic.push(item.diastolic)
                this.bloodBMIData.bmi.push(item.bmi)
                this.bloodBMIData.bpType.push(item.bpType)
              })
            }
          }
          this.bloodBMIData.x = this.bloodBMIData.x.reverse()
          this.bloodBMIData.systolic = this.bloodBMIData.systolic.reverse()
          this.bloodBMIData.diastolic = this.bloodBMIData.diastolic.reverse()
          this.bloodBMIData.bmi = this.bloodBMIData.bmi.reverse()
          this.bloodBMIData.bpType = this.bloodBMIData.bpType.reverse()
        }
        let bloodBMI = echarts.init(document.getElementById('bloodBMI'))
        let position = this.computeStartend(this.bloodBMIData.currentPage, this.bloodBMIData.pageNum)
        bloodBMI.setOption(this.bloodBMIOption(position.start, position.end))
      })
    },
    bloodBMIOption (start, end) {
      let vm = this
      let x1 = ''
      let BMISeriesData = []
      BMISeriesData = vm.bloodBMIData.bmi
      let zoomstart = 0
      let zoomend = 100
      if (start) {
        zoomstart = start
      }
      if (end) {
        zoomend = end
      }
      let option = {
        color: ['#8ecefc', 'e6f5fe', '8ecefc'],
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: [0, 1],
            show: false,
            realtime: true,
            start: zoomstart,
            end: zoomend,
            zoomlock: true,
            minValueSpan: 10,
            maxValueSpan: 11,
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
          backgroundColor: 'rgba(250,250,250,0.7)',
          textStyle: {
            color: '#000'
          },
          triggerOn: 'mousemove|click',
          formatter: function (a) {
            a.forEach(item => {
              if (!item['value']) {
                item['value'] = '未知'
              }
            })
            return (
                a[0]['axisValueLabel'] + '<br>' +
                '<span style="display: inline-block; margin-right: 5px; border-radius: 10px; width: 9px; height: 9px; background-color: ' + a[0]['color'] + '"></span>' +
                a[0]['seriesName'] + ': ' + a[0]['value'] + '<br>' +
                '<span style="display: inline-block; margin-right: 5px; border-radius: 10px; width: 9px; height: 9px; background-color: ' + a[1]['color'] + '"></span>' +
                a[1]['seriesName'] + ': ' + a[1]['value'] + '<br>' +
                '<span style="display: inline-block; margin-right: 5px; border-radius: 10px; width: 9px; height: 9px; background-color: ' + a[0]['color'] + '"></span>' +
                a[2]['seriesName'] + ': ' + a[2]['value']
            )
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
        grid: [
          { // 直角坐标系内绘图网格
            top: '8%',
            left: '90px',
            right: '80px',
            width: 'auto',
            height: 'auto',
            bottom: '55%'
          },
          {
            top: '55%',
            left: '90px',
            right: '80px',
            width: 'auto',
            height: 'auto',
            bottom: '40px'
          }
        ],
        xAxis: [
          { // 直角坐标系grid的x轴
            gridIndex: 0,
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              show: false,
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
            symbol: 'circle',
            symbolSize: 6,
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
            data: vm.bloodBMIData.x
          },
          { // 直角坐标系grid的x轴
            type: 'category',
            gridIndex: 1,
            boundaryGap: false,
            symbol: 'circle',
            symbolSize: 6,
            axisLabel: {
              // show: false,
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
            // 分数横坐标
            data: vm.bloodBMIData.x
          }
        ],
        yAxis: [
          { // 直角坐标系grid的y轴
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
            name: 'BMI',
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
            // smooth: true,
            // smoothMonotone: 'x',
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
                  let index = vm.bloodBMIData.bpType[param.dataIndex]
                  return vm.computeDanger(index)
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
            data: vm.bloodBMIData.diastolic
          },
          {
            xAxisIndex: 0,
            yAxisIndex: 0,
            name: '收缩压',
            type: 'line',
            // smooth: true,
            // smoothMonotone: 'x',
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: {
              normal: {
                width: 2,
                color: '#228ec4'
              }
            },
            itemStyle: {
              normal: {
                color: function (param) {
                  let index = vm.bloodBMIData.bpType[param.dataIndex]
                  return vm.computeDanger(index)
                }
              }
            },
            // areaStyle: {
            //   normal: {
            //     color: '#def3f2',
            //     origin: 'auto',
            //     shadowColor: '#def3f2'
            //   }
            // },
            data: vm.bloodBMIData.systolic
          },
          {
            xAxisIndex: 1,
            yAxisIndex: 1,
            name: 'BMI',
            type: 'line',
            // smooth: true,
            // smoothMonotone: 'x',
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: {
              normal: {
                width: 2,
                color: '#228ec4'
              }
            },
            itemStyle: {
              normal: {
                color: function (param) {
                  let index = vm.bloodBMIData.bpType[param.dataIndex]
                  return vm.computeDanger(index)
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
            data: BMISeriesData
          }
        ],
        textStyle: {
          color: '#666',
          fontSize: 12
        }
      }
      return option
    },
    bloodBMIPer () {
      let vm = this
      let bloodBMI = echarts.init(document.getElementById('bloodBMI'))
      this.bloodBMIData.currentPage --
      if (this.bloodBMIData.currentPage < 1) {
        this.bloodBMIData.currentPage = 1
      }
      let position = this.computeStartend(this.bloodBMIData.currentPage, this.bloodBMIData.pageNum)

      bloodBMI.setOption(vm.bloodBMIOption(position.start, position.end))
    },
    bloodBMINext () {
      console.log('position1', this.bloodBMIData.currentPage, this.bloodBMIData.pageNum)
      console.log('position2', this.bloodBMIData.pages, this.bloodBMIData.pageNum)

      let vm = this
      let bloodBMI = echarts.init(document.getElementById('bloodBMI'))
      if (vm.bloodBMIData.currentPage > vm.bloodBMIData.pageNum) {
        vm.bloodBMIData.currentPage = vm.bloodBMIData.pageNum
        // return
      }
      if (vm.bloodBMIData.currentPage < vm.bloodBMIData.pages) {
        vm.bloodBMIData.currentPage ++
      }

      if (!(vm.bloodBMIData.pageNum < vm.bloodBMIData.pages)) {
        let position = this.computeStartend(this.bloodBMIData.currentPage, this.bloodBMIData.pageNum)
        bloodBMI.setOption(vm.bloodBMIOption(position.start, position.end))
        return
      }
      vm.bloodBMIData.pageNum ++

      let params = {
        'userId': vm.sickID,
        'adminHospitalId': vm.hospitalId,
        'bpMeasureTime': vm.bpMeasureTime || '',
        'pageNum': vm.bloodBMIData.pageNum,
        'pageSize': 9
      }
      vm.$axios(BMIApi(params))
        .then(res => {
          // let bloodBMI = echarts.init(document.getElementById('bloodBMI'))
          bloodBMI.showLoading(
            {
              text: '加载中...',
              color: '#1991fc',
              textColor: '#000',
              maskColor: 'rgba(255, 255, 255, 0.8)',
              zlevel: 0
            }
          )
          if (vm.bloodBMIData.pageNum <= res.data.pages) {
            if (res.data.data.length !== 0) {
              res.data.data.forEach((item, index) => {
                if (!item.systolic) {
                  item.systolic = 0
                }
                if (!item.diastolic) {
                  item.diastolic = 0
                }
                if (!item.bmi) {
                  // console.log('otherposition', this.currentSickInfo)
                  if (this._.has(this.currentSickInfo, 'BMI')) {
                    item.bmi = this.currentSickInfo.BMI
                  } else if (this._.has(this.currentSickInfo, 'userBody')) {
                    if (this._.has(this.currentSickInfo.userBody, 'bmi')) {
                      item.bmi = this.currentSickInfo.userBody.bmi
                    }
                  } else {
                    item.bmi = 0
                  }
                }
                if (!item.bpType) {
                  item.bpType = 0
                }
                vm.bloodBMIData.x.unshift(item.createTime)
                vm.bloodBMIData.systolic.unshift(item.systolic)
                vm.bloodBMIData.diastolic.unshift(item.diastolic)
                vm.bloodBMIData.bmi.unshift(item.bmi)
                vm.bloodBMIData.bpType.unshift(item.bpType)
              })
            }
          }
          console.log('position', this.bloodBMIData.currentPage, this.bloodBMIData.pageNum)

          let position = this.computeStartend(this.bloodBMIData.currentPage, this.bloodBMIData.pageNum)
          bloodBMI.setOption(vm.bloodBMIOption(position.start, position.end))
          console.log('positionX', position.start, position.end)
          bloodBMI.hideLoading()
        })
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
          color = '##9ac3e4' // 低血压
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
    bloodBMIData: {
      handler: function (val) {
        if (val.pages < 2) {
          this.BMIBtnNext = true
          this.BMIBtnPre = true
        } else {
          if (val.currentPage === val.pages) {
            this.BMIBtnNext = true
          } else {
            this.BMIBtnNext = false
          }
          if (val.currentPage !== 1) {
            this.BMIBtnPre = false
          } else {
            this.BMIBtnPre = true
          }
        }
      },
      deep: true
    }
  },
  mounted () {
    // this.updateBMI()
    let bloodBMI = echarts.init(document.getElementById('bloodBMI'))
    bloodBMI.setOption(this.bloodBMIOption())
    this.updateBMI()
  }
}
</script>

<style lang="scss" scoped>
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
