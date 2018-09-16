<template>
    <div class='tatalsick' id="bloodtotal">
      <!-- <el-row> -->
        <el-row type="flex" justify="start">
          <button v-for="(item,index) in checkDate" 
          :key="item.date" 
          class="check-date-btn" 
          :class="{checked:item.isChecked
          }" 
          @click="updateDate(item.value,index)">
            {{item.date}}
          </button>
        </el-row>
        <p class="heightblood-total">血压分布({{ heightbloodTotal }}人)</p>
    
        <el-row :gutter="8">
            <el-col :span='12' v-loading="HBcoverLoading">
              <el-card :body-style="{ padding: '0px' }">
                  <div class="card-header">
                    <p class="title">患者分布</p>
                  </div>
                  <div id='HBcover'  :style="{width:'auto',height:'300px'}"></div>
              </el-card>
            </el-col>
            <el-col :span='12' v-loading="HBtrendLoading">
              <el-card :body-style="{ padding: '0px' }">
                  
                  <div class="card-header">
                    <p class="title">患者走势</p>
                  </div>

                <div class="flex widthone">
                  <div class="flex-btn-left" v-show="showBtn">
                    <el-button @click="trendNext" icon="el-icon-arrow-left" type="text" :style="{'font-size':'16px','color':'#999' ,'background':'#eaeaea'}"></el-button>
                    <!-- <el-button @click="trendPre" icon="el-icon-arrow-left" type="text" :style="{'font-size':'16px','color':'#999' ,'background':'#eaeaea'}"></el-button> -->
                  </div>
                  <div class="chart-min-width">
                    <div id='HBtrend' :style="{width:'auto',height:'300px'}"></div>
                  </div>
                  <div class="flex-btn" v-show="showBtn">
                    <el-button @click="trendPre" icon="el-icon-arrow-right" type="text" :style="{'font-size':'16px','color':'#999','background':'#eaeaea'}"></el-button>
                    <!-- <el-button @click="trendNext" icon="el-icon-arrow-right" type="text" :style="{'font-size':'16px','color':'#999','background':'#eaeaea'}"></el-button> -->
                  </div>
                </div>

                  <!-- <div id='HBtrend' :style="{width:'auto',height:'300px'}"></div> -->
              </el-card>
            </el-col>
        </el-row>
      <!-- </el-row>  -->
    </div>
</template>

<script>
import echarts from 'echarts'
import {dateFormat, daybefor} from '@/untils/date.js'
import {sickDistributionDataApi, sickTrendDataApi} from '@/api/views/Hospital/BloodHeigh/H-bloodheightotal'
export default {
  name: 'H-bloodheighttotal',
  data () {
    return {
      checkDate: [
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
        },
        {
          date: '年',
          value: 'year',
          isChecked: false
        }
      ],
      sickDistributionData: [
        // {
        //   'value': 36,
        //   'name': '正常'
        // },
        // {
        //   'value': 38,
        //   'name': '偏高'
        // },
        // {
        //   'value': 3,
        //   'name': '高'
        // },
        // {
        //   'value': 83,
        //   'name': '危险'
        // }

      ],
      sickTrendData: [
      ],
      heightbloodTotal: 0,
      sickTrendDataX: [
      ],
      clickTime: 0,
      HBcoverLoading: false,
      HBtrendLoading: false,
      showBtn: false
    }
  },
  methods: {
    HBcoverOption () {
      let vm = this
      let count = 0
      let color = ['#81cefc', '#9ac3e4', '#7cedc4', '#f4e07a', '#ff8f8f']
      let hascolor = ['#81cefc', '#9ac3e4', '#7cedc4', '#f4e07a', '#ff8f8f']
      let nocolor = ['#eaeaea', '#eaeaea', '#eaeaea', '#eaeaea', '#eaeaea']
      vm.sickDistributionData.forEach(item => {
        if (item.value === 0) {
          count++
        }
      })
      if (count === 5) {
        color = nocolor
      } else {
        color = hascolor
      }
      return {
        // 提示框 在饼图上显示数据
        // tooltip: {
        //   trigger: 'item',
        //   formatter: '{a} <br/>{b} : {c}人 <br/> {d}%'
        // },
        color: color,
        legend: {
          orient: 'vertical',
          left: '50%',
          top: 'center',
          data: ['正常', '正常高压', '轻度高血压', '中度高血压', '危险'],
          selectedMode: false,
          formatter: (name) => {
            let i = 0
            this.sickDistributionData.forEach(
              (item, index) => {
                if (item.name === name) {
                  i = index
                  return i
                }
              }
            )
            return name + '  共(' + this.sickDistributionData[i].value + '人)'
          },
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
            data: this.sickDistributionData,
            label: {
              normal: {
                position: 'inner',
                formatter: function (params) {
                  if (params.value === 0) {
                    return ''
                  } else {
                    return params.percent + '%'
                  }
                },
                fontSize: 10
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
            shadowBlur: 2,
            shadowOffsetX: 0,
            shadowColor: ''
          }
        }
      }
    },
    HBtrendOption (start, end) {
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
      // if (this.sickTrendDataX.length < 5) {
      //   zoomend = 100
      // } else {
      //   zoomend = 50
      // }
      return {
        title: {
        // text: '控压走势',
          // subtext: '控压走势',
          // subtextStyle: {
          //   color: '#111'
          // },
        // x: 'center'
          // right: '20',
          // top: '-10'
        },
        tooltip: { // 提示框组件
          backgroundColor: 'rgba(50,50,50,0.2)',
          triggerOn: 'mousemove|click',
          snap: true,
          formatter: '{b} : {c}%'
        },
        grid: { // 直角坐标系内绘图网格
          show: false,
          left: '100',
          right: '80',
          // left: '10%',
          // top: '40px',
          // bottom: '24px',
          width: 'auto',
          height: 'auto'
          // containLabel: true
        },
        legend: { // 图例组件
          show: true,
          type: 'plain',
          orient: 'vertical',
          right: 15,
          top: 10,
          data: [{
            name: '控压走势',
            icon: 'roundRect',
            textStyle: {
              fontSize: 14
            }
          }],
          selectedMode: false,
          itemWidth: 20,
          itemHeight: 20
        },
        dataZoom: [
          {
            type: 'slider',
            show: false,
            realtime: true,
            start: zoomstart,
            end: zoomend,
            zoomlock: true,
            minValueSpan: 15,
            maxValueSpan: 15,
            throttle: 500,
            filterMode: 'empty',
            zoomOnMouseWheel: false
          }
        ],
        xAxis: { // 直角坐标系grid的x轴
          type: 'category',
          // type: 'time',
          boundaryGap: false,
          // minInterval: 1,
          interval: 0,
          // nameTextStyle: {
          //   normal: {
          //     color: '#666',
          //     fontSize: 12
          //   }
          // },
          splitLine: {
            show: false
          },
          axisLabel: {
            interval: 0, // 显示x轴数据
            showMinLabel: true,
            showMaxLabel: true,
            align: 'center',
            rotate: 0,
            formatter: function (val) {
              let value
              if (val.length < 11) {
                let time = val.slice(0, 4)
                if (vm._.eq(time, x1)) {
                  value = val.slice(5)
                  x1 = time
                  return value
                } else {
                  let arr = []
                  arr.push(val.slice(5))
                  arr.push(time)
                  x1 = time
                  return arr.join('\n')
                }
              } else {
                let start = val.slice(5, 11)
                if (vm._.eq(start, x1)) {
                  value = val.slice(11)
                  x1 = start
                  return value + '时'
                } else {
                  let arr = []
                  arr.push((val.slice(11) + '时'))
                  arr.push(start)
                  x1 = start
                  return arr.join('\n')
                }
              }
                // return value
            }
          },
          min: 0,
          data: this.sickTrendDataX
          // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: { // 直角坐标系grid的y轴
          name: '控制率',
          nameLocation: 'end',
          type: 'value',
          axisLine: {onZero: false},
          axisLabel: {
            formatter: '{value}%'
          },
          splitLine: {  // y轴网格显示
            show: false
          },
          nameTextStyle: { // 坐标轴名城样式
            color: '#666',
            fontSize: 12,
            align: 'left'
          },
          boundaryGap: false,
          splitNumber: 2,  // 坐标轴分割段数
          data: ['0', '50', '100']
        },
        series: [
          {
            name: '控压走势',
            type: 'line',
            // smooth: true,
            // smoothMonotone: 'x',
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: {
              normal: {
                width: 2,
                color: '#8ecefc'
                // shadowColor: '#8ecefc',
                // shadowBlur: 5,
                // shadowOffsetY: 5
              }
            },
            itemStyle: {
              normal: {
                color: '#8ecefc'
              }
            },
            // areaStyle: {
            //   normal: {
            //     color: '#e6f5fe',
            //     origin: 'auto',
            //     shadowColor: '#e6f5fe'
            //   }
            // },
            data: this.sickTrendData
          }
        ],
        textStyle: {
          color: '#666',
          fontSize: 12
        }
      }
    },
    startendDate (date) {
      let obj = {}
      let now = Date()
      switch (date) {
        case 'day':
          obj.endTime = dateFormat(now, 0, true)
          obj.startTime = dateFormat(now, 0, true)
          break
        case 'week':
          obj.endTime = dateFormat(now, 0, true)
          obj.startTime = daybefor(now, 6, true)
          break
        case 'month':
          obj.endTime = dateFormat(now, 0, true)
          obj.startTime = dateFormat(now, 1, true)
          break
        case 'year':
          obj.endTime = dateFormat(now, 0, true)
          obj.startTime = dateFormat(now, 12, true)
          break
      }
      return obj
    },
    updateDate (date, index) {
      this.checkDate.forEach(item => {
        item.isChecked = false
      })
      this.checkDate[index].isChecked = true
      // console.log(this.startendDate(date))
      // let time = this.startendDate(date)
      let trendtime = this.trendcheck(date)
      this.getCoverData(trendtime)
      this.getTrendData(trendtime)
      // console.log('更新整体患者分布与走势时间', this.sickDistributionData)
    },
    getCoverData (params) {
      let obj = {
        periodTime: params
      }
      this.$axios(sickDistributionDataApi(obj))
      .then(res => {
        this.sickDistributionData = []
        if (res.data) {
          if (res.data.data) {
            this.heightbloodTotal = res.data.data.count
            let coverData = res.data.data
            // let obj = {}
            this.sickDistributionData.push({
              'value': coverData.normalCount,
              'name': '正常'
            })
            this.sickDistributionData.push({
              'value': coverData.normalHighCount,
              'name': '正常高压'
            })
            this.sickDistributionData.push({
              'value': coverData.moderateHighCount,
              'name': '中度高血压'
            })
            this.sickDistributionData.push({
              'value': coverData.mildHighCount,
              'name': '轻度高血压'
            })
            this.sickDistributionData.push({
              'value': coverData.dangerCount,
              'name': '危险'
            })
          }
        }
        let HBcover = echarts.init(document.getElementById('HBcover'))
        HBcover.setOption(this.HBcoverOption())
      })
    },
    trendcheck (date) {
      let periodTime = null
      switch (date) {
        case 'day':
          periodTime = 1
          break
        case 'week':
          periodTime = 2
          break
        case 'month':
          periodTime = 3
          break
        case 'year':
          periodTime = 4
          break
      }
      return periodTime
    },
    getTrendData (periodTime) {
      let vm = this
      let params = {
        pageNum: 1,
        pageSize: 31,
        'periodTime': periodTime
      }
      vm.$axios(sickTrendDataApi(params))
      .then(res => {
        if (res.data.data) {
          // let x =[]
          let HBtrend = echarts.init(document.getElementById('HBtrend'))
          vm.sickTrendDataX = []
          vm.sickTrendData = []
          res.data.data.forEach(item => {
            if (vm._.has(item, 'normalBase')) {
              vm.sickTrendDataX.push(item.measureTimeDay)
              vm.sickTrendData.push(item.normalBase)
            }
          })
          vm.sickTrendDataX = vm.sickTrendDataX.reverse()
          vm.sickTrendData = vm.sickTrendData.reverse()
          if (vm.sickTrendDataX.length < 16) {
            vm.showBtn = false
            HBtrend.setOption(this.HBtrendOption())
          } else {
            vm.showBtn = true
            HBtrend.setOption(this.HBtrendOption(0, 50))
          }
        }
      })
    },
    trendPre () {
      let HBtrend = echarts.init(document.getElementById('HBtrend'))
      HBtrend.setOption(this.HBtrendOption(50, 100))
    },
    trendNext () {
      let HBtrend = echarts.init(document.getElementById('HBtrend'))
      HBtrend.setOption(this.HBtrendOption(0, 50))
    }
  },

  mounted () {
    // 初始化选择时间为日
    this.updateDate(this.checkDate[0].value, 0)

    // let HBcover = echarts.init(document.getElementById('HBcover'))
    // HBcover.setOption(this.HBcoverOption())
    // let HBtrend = echarts.init(document.getElementById('HBtrend'))
    // HBtrend.setOption(this.HBtrendOption())
  }
}
</script>
<style scoped>
.header .el-card__header {
  padding: 10px !important;
  border-bottom: 1px solid #ebeef5;
  /* -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
  text-align: center; */
}
</style>
<style scoped>
p {
  margin: 0px;
  padding:0;
  /* text-align:center; */
}
.title{
  /* margin-left:20px; */
  margin-top:24px;
  margin-bottom:2px;
  font-size:20px;
  color:#666
}
.card-header{
  margin: 0 20px 0 26px;
  border-bottom:1px solid #ebeef5;
  height: 28px;
}
.tatalsick {
  margin-top: 20px;
}
.btn{
  float: right;
  overflow: hidden;
}
.heightblood-total{
  margin:30px 0 10px 25px;
  padding:0;
  text-align:left;
  font-size:24px;
  color:#041421;
}
.check-date-btn{
  box-sizing: border-box;
  border:1px solid #f4f6f9;
  background-color:#f4f6f9;
  line-height:1;
  white-space: nowrap;
  cursor: pointer;
  font-size:18px;
  color:#666;
  width:64px;
  height: 36px;
  outline:none;
  border-radius:2px;
}
.check-date-btn:hover{
  opacity: 0.9;
  /* box-sizing: border-box;
  border:1px solid #f4f6f9;
  background-color:#f4f6f9;
  line-height:1;
  white-space: nowrap;
  cursor: pointer;
  font-size:18px;
  color:#666;
  width:64px;
  height: 36px;
  outline:none;
  border-radius:2px; */
}
.checked{
  background-color:#1991fc;
  border-color:#1991fc;
  color:#fff;
  border-radius:2px;
}
.HBtrend{
  z-index: 9;
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
