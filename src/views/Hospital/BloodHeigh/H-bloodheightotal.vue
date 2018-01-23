<template>
    <div class='tatalsick'>
      <el-row>
          <el-col>
              <el-card :body-style="{ padding: '0px' }" class='header'>
                  <div slot='header' class='header'>
                      <p>
                          高血压患者({{ heightbloodTotal }}人)
                      </p>

                  <el-row type="flex" justify="end">
                    <el-button :type="checkTime[0]" size="medium" @click.native="updateYear">年</el-button>
                    <el-button :type="checkTime[1]" size="medium" @click="updateMounth">月</el-button>
                    <el-button :type="checkTime[2]" size="medium" @click="updateWeek">周</el-button>
                    <el-button :type="checkTime[3]" size="medium" @click="updateDay">日</el-button>
                  </el-row>
                  </div>
                  <el-row>
                      <el-col :span='12' >
                        <el-card>
                            <span slot='header'>
                                <p>
                                    患者分布
                                </p>
                            </span>
                            <div id='HBfenbu'  :style="{width:'450px',height:'250px'}"></div>
                        </el-card>
                      </el-col>
                      <el-col :span='12'>
                        <el-card>
                            <span slot='header'>
                                <p>
                                    患者走势
                                </p>
                            </span>
                            <div id='HBzoushi' :style="{width:'450px',height:'250px'}"></div>
                        </el-card>
                      </el-col>
                  </el-row>
              </el-card>
          </el-col>
      </el-row> 
    </div>
</template>

<script>
import echarts from 'echarts'
import {checkDateBtn} from './../../../untils/untils'
import {sickDistributionDataApi, sickTrendDataApi} from './../../../api/views/Hospital/BloodHeigh/H-bloodheightotal'
export default {
  name: 'H-bloodheighttotal',
  data () {
    return {
      sickDistributionData: [],
      sickTrendData: [],
      checkTime: ['primary', 'primary', 'success', 'primary'],
      heightbloodTotal: 1236,
      sickTrendDataX: [
        ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
        ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        [ '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月' ]
      ],
      clickTime: 1
    }
  },
  methods: {
    sickDistribution (time) {
      switch (time) {
        case 'week':
          return this.$axios(sickDistributionDataApi('week'))
          break
        case 'month':
          return this.$axios(sickDistributionDataApi('month'))
          break
        case 'year':
          return this.$axios(sickDistributionDataApi('year'))
          break
        case 'day':
          return this.$axios(sickDistributionDataApi('day'))
          break
        default:
          return this.$axios(sickDistributionDataApi('week'))
          break
      }
      // return this.$axios(sickDistributionDataApi)
    },
    sickTrend (time) {
      switch (time) {
        case 'week':
          return this.$axios(sickTrendDataApi('week'))
          break
        case 'month':
          return this.$axios(sickTrendDataApi('month'))
          break
        case 'year':
          return this.$axios(sickTrendDataApi('year'))
          break
        case 'day':
          return this.$axios(sickTrendDataApi('day'))
          break
        default:
          return this.$axios(sickTrendDataApi('week'))
          break
      }
      // return this.$axios(sickTrendDataApi)
    },
    HBfenbuOption () {
      return {

        // title: {
        //   // text: '患者分布',
        //   x: 'center'
        // },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}人 <br/> {d}%'
        },
        color: ['#008B00', '#4169E1', '#EE6363', '#EE2C2C'],
        legend: {
          orient: 'vertical',
          left: 'left',
          top: 'top',
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
          }

        },
        series: [
          {
            name: '高血压',
            type: 'pie',
            radius: '70%',
            center: ['60%', '50%'],
            data: this.sickDistributionData,
            label: {
              normal: {
                position: 'inner',
                formatter: '{d}%',
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
            shadowBlur: 50,
            shadowOffsetX: 0,
            shadowColor: ''
          }
        }
      }
    },
    HBzoushiOption () {
      return {
        title: {
        // text: '控压走势',
          subtext: '控压走势',
          subtextStyle: {
            color: '#111'
          },
        // x: 'center'
          right: '20',
          top: '-10'
        },
        tooltip: { // 提示框组件
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          snap: true,
          formatter: '{b} : {c}%'
        },
        grid: { // 直角坐标系内绘图网格
          left: 'left',
          right: 'center',
          top: '30px',
          bottom: '3%',
          width: '430',
          height: '220',
          containLabel: true
        },
      // toolbox: { // 工具栏
        // show: true
        // feature: {
        //   asveAsImage: {}
        // }
      // },
      // legend: { // 图例组件
        // show: true,
        // orient: 'vertical',
        // left: 'left',
        // top: 'center',
        // data: ['控压走势']
        // selectedMode: false
      // },
        xAxis: { // 直角坐标系grid的x轴
          type: 'category',
          // type: 'time',
          boundaryGap: false,
          minInterval: 0.5,
          data: this.sickTrendDataX[this.clickTime]
        },
        yAxis: { // 直角坐标系grid的y轴
          name: '控制率',
          nameLocation: 'end',
          type: 'value',
          axisLine: {onZero: false},
          axisLabel: {
            formatter: '{value}%'
          },
          boundaryGap: false,
          data: ['0', '25', '50', '75', '100']
        },
        series: [
          {
            name: '患者走势',
            type: 'line',
            lineStyle: {
              normal: {
                width: 3,
                shadowColor: 'rgba(0,0,0,0.4)',
                shadowBlur: 5,
                shadowOffsetY: 5
              }
            },
            data: this.sickTrendData
          }
        ]
      }
    },
    updateYear () {
      checkDateBtn(0, this.checkTime, 'primary', 'success')
      this.clickTime = 3
      let HBfenbu = echarts.init(document.getElementById('HBfenbu'))
      let HBzoushi = echarts.init(document.getElementById('HBzoushi'))
      this.$axios.all([this.sickDistribution('year'), this.sickTrend('year')])
      .then(this.$axios.spread((sickDistribution, sickTrend) => {
        let sickD = sickDistribution.data.sickDistributionData
        this.sickDistributionData = sickD
        HBfenbu.setOption(this.HBfenbuOption())

        this.sickTrendData = sickTrend.data.sickTrendData
        HBzoushi.setOption(this.HBzoushiOption())
      }))
      .catch(err => {
        return err
      })
      // this.$options.methods.getChartsData(this.$options.methods.sickDistribution(), this.$options.methods.sickTrend())
      // console.log(this.$options.methods.getChartsData())
    },
    updateMounth () {
      checkDateBtn(1, this.checkTime, 'primary', 'success')
      this.clickTime = 2
      let HBfenbu = echarts.init(document.getElementById('HBfenbu'))
      let HBzoushi = echarts.init(document.getElementById('HBzoushi'))
      this.$axios.all([this.sickDistribution('month'), this.sickTrend('month')])
      .then(this.$axios.spread((sickDistribution, sickTrend) => {
        let sickD = sickDistribution.data.sickDistributionData
        this.sickDistributionData = sickD
        HBfenbu.setOption(this.HBfenbuOption())

        this.sickTrendData = sickTrend.data.sickTrendData
        HBzoushi.setOption(this.HBzoushiOption())
      }))
      .catch(err => {
        return err
      })
    },
    updateWeek () {
      checkDateBtn(2, this.checkTime, 'primary', 'success')
      this.clickTime = 1
      let HBfenbu = echarts.init(document.getElementById('HBfenbu'))
      let HBzoushi = echarts.init(document.getElementById('HBzoushi'))
      this.$axios.all([this.sickDistribution('week'), this.sickTrend('week')])
      .then(this.$axios.spread((sickDistribution, sickTrend) => {
        let sickD = sickDistribution.data.sickDistributionData
        this.sickDistributionData = sickD
        HBfenbu.setOption(this.HBfenbuOption())

        this.sickTrendData = sickTrend.data.sickTrendData
        HBzoushi.setOption(this.HBzoushiOption())
      }))
      .catch(err => {
        return err
      })
    },
    updateDay () {
      checkDateBtn(3, this.checkTime, 'primary', 'success')
      this.clickTime = 0
      let HBfenbu = echarts.init(document.getElementById('HBfenbu'))
      let HBzoushi = echarts.init(document.getElementById('HBzoushi'))
      this.$axios.all([this.sickDistribution('day'), this.sickTrend('day')])
      .then(this.$axios.spread((sickDistribution, sickTrend) => {
        let sickD = sickDistribution.data.sickDistributionData
        this.sickDistributionData = sickD
        HBfenbu.setOption(this.HBfenbuOption())

        this.sickTrendData = sickTrend.data.sickTrendData
        HBzoushi.setOption(this.HBzoushiOption())
      }))
      .catch(err => {
        return err
      })
    }
  },
  watch: {

  },
  mounted () {
    let HBfenbu = echarts.init(document.getElementById('HBfenbu'))
    let HBzoushi = echarts.init(document.getElementById('HBzoushi'))
    this.$axios.all([this.sickDistribution('week'), this.sickTrend('week')])
    .then(this.$axios.spread((sickDistribution, sickTrend) => {
      let sickD = sickDistribution.data.sickDistributionData
      this.sickDistributionData = sickD
      HBfenbu.setOption(this.HBfenbuOption())

      this.sickTrendData = sickTrend.data.sickTrendData
      HBzoushi.setOption(this.HBzoushiOption())
    }))
    .catch(err => {
      return err
    })

    // HBzoushi.setOption(
    //   {
    //     title: {
    //     // text: '控压走势',
    //       subtext: '控压走势',
    //       subtextStyle: {
    //         color: '#111'
    //       },
    //     // x: 'center'
    //       right: '20',
    //       top: '-10'
    //     },
    //     tooltip: { // 提示框组件
    //       trigger: 'axis',
    //       axisPointer: {
    //         type: 'cross'
    //       },
    //       snap: true,
    //       formatter: '{b} : {c}%'
    //     },
    //     grid: { // 直角坐标系内绘图网格
    //       left: 'left',
    //       right: 'center',
    //       top: '30px',
    //       bottom: '3%',
    //       width: '430',
    //       height: '220',
    //       containLabel: true
    //     },
    //   // toolbox: { // 工具栏
    //     // show: true
    //     // feature: {
    //     //   asveAsImage: {}
    //     // }
    //   // },
    //   // legend: { // 图例组件
    //     // show: true,
    //     // orient: 'vertical',
    //     // left: 'left',
    //     // top: 'center',
    //     // data: ['控压走势']
    //     // selectedMode: false
    //   // },
    //     xAxis: { // 直角坐标系grid的x轴
    //       type: 'category',
    //       boundaryGap: false,
    //       data: this.heightbloodLineData.labelData
    //     },
    //     yAxis: { // 直角坐标系grid的y轴
    //       name: '控制率',
    //       nameLocation: 'end',
    //       type: 'value',
    //       axisLine: {onZero: false},
    //       axisLabel: {
    //         formatter: '{value}%'
    //       },
    //       boundaryGap: false,
    //       data: ['0', '25', '50', '75', '100']
    //     },
    //     series: [
    //       {
    //         name: '患者走势',
    //         type: 'line',
    //         lineStyle: {
    //           normal: {
    //             width: 3,
    //             shadowColor: 'rgba(0,0,0,0.4)',
    //             shadowBlur: 5,
    //             shadowOffsetY: 5
    //           }
    //         },
    //         data: this.heightbloodLineData.valueData
    //       }
    //     ]
    //   }
    // )
  }
}
</script>
<style scoped>
.header .el-card__header {
  padding: 10px !important;
  border-bottom: 1px solid #ebeef5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
  text-align: center;
}
</style>
<style scoped>
p {
  margin: 5px;
  text-align:center;
}
.tatalsick {
  margin-top: 20px;
}
.btn{
  float: right;
  overflow: hidden;
}
</style>
