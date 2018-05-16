<template>
    <div class='tatalsick' id="bloodtotal">
      <!-- <el-row> -->
        <el-row type="flex" justify="start">
          <button v-for="(item,index) in checkDate" 
          :key="item.date" 
          class="check-date-btn" 
          :class="{checked:item.isChecked}" 
          @click="updateDate(item,index)">
            {{item.date}}
          </button>
        </el-row>
        <p class="heightblood-total">高血压患者({{ heightbloodTotal }}人)</p>
    
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
                  <div id='HBtrend' :style="{width:'auto',height:'300px'}"></div>
              </el-card>
            </el-col>
        </el-row>
      <!-- </el-row>  -->
    </div>
</template>

<script>
import echarts from 'echarts'
// import {sickDistributionDataApi, sickTrendDataApi} from './../../../api/views/Hospital/BloodHeigh/H-bloodheightotal'
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
        {
          'value': 36,
          'name': '正常'
        },
        {
          'value': 38,
          'name': '偏高'
        },
        {
          'value': 3,
          'name': '高'
        },
        {
          'value': 83,
          'name': '危险'
        }

      ],
      sickTrendData: [
        92,
        55,
        47,
        47,
        0,
        49,
        98,
        89,
        36,
        78,
        48,
        86,
        1
      ],
      heightbloodTotal: 1236,
      sickTrendDataX: [
        ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
        ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        [ '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月' ]
      ],
      clickTime: 0,
      HBcoverLoading: false,
      HBtrendLoading: false
    }
  },
  methods: {
    HBcoverOption () {
      let vm = this
      return {
        // 提示框 在饼图上显示数据
        // tooltip: {
        //   trigger: 'item',
        //   formatter: '{a} <br/>{b} : {c}人 <br/> {d}%'
        // },
        color: ['#81cefc', '#7cedc4', '#f4e07a', '#ff8f8f'],
        legend: {
          orient: 'vertical',
          left: '50%',
          top: 'center',
          data: ['正常', '偏高', '高', '危险'],
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
                  if (vm._.toNumber(params.value) === 0) {
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
    HBtrendOption () {
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
          triggerOn: 'click',
          snap: true,
          formatter: '{b} : {c}%'
        },
        grid: { // 直角坐标系内绘图网格
          show: false,
          // left: 'auto',
          // right: 'auto',
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
            interval: 0
          },
          min: 0,
          // data: this.sickTrendDataX[this.clickTime]
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
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
            smooth: true,
            smoothMonotone: 'x',
            symbol: 'circle',
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
            areaStyle: {
              normal: {
                color: '#e6f5fe',
                origin: 'auto',
                shadowColor: '#e6f5fe'
              }
            },
            data: this.sickTrendData
          }
        ],
        textStyle: {
          color: '#666',
          fontSize: 12
        }
      }
    },

    updateDate (date, index) {
      this.checkDate.forEach(item => {
        item.isChecked = false
      })
      this.checkDate[index].isChecked = true
      console.log('更新整体患者分布与走势时间')
    }
  },

  mounted () {
    // 初始化选择时间为日
    this.checkDate[0].isChecked = true

    let HBcover = echarts.init(document.getElementById('HBcover'))
    HBcover.setOption(this.HBcoverOption())
    let HBtrend = echarts.init(document.getElementById('HBtrend'))
    HBtrend.setOption(this.HBtrendOption())
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
  margin: 0 20px 0 20px;
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
  border:none;
  background-color:#f4f6f9;
  cursor: pointer;
  font-size:18px;
  color:#666;
  width:64px;
  height: 36px;
  outline:none;
}
.checked{
  background-color:#1991fc;
  color:#fff;
  border-radius:2px;
}
.HBtrend{
  z-index: 9;
}
</style>
