<template>
    <div class='tatalsick'>
      <el-row>
          <el-col>
              <el-card :body-style="{ padding: '0px' }" class='header'>
                  <div slot='header' class='header'>
                      <p>
                          高血压患者（{{ heightbloodTotal }}人）
                      </p>

                  <el-row type="flex" justify="end">
                    <el-button :type="checkTime[0]" size="medium" @click="updateYear">年</el-button>
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
import {checkDateBtn} from './../../../untils/checkDateBtn'
export default {
  name: 'H-bloodheighttotal',
  data () {
    return {
      checkTime: ['success', 'primary', 'primary', 'primary'],
      heightbloodTotal: 1236,
      heightbloodPieData: [
        { value: 332, name: '正常' },
        { value: 75, name: '偏高' },
        { value: 555, name: '高' },
        { value: 44, name: '危险' }
      ],
      heightbloodLineData: {
        labelData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        valueData: [1, 11, 15, 13, 12, 13, 10]
      }
    }
  },
  methods: {
    // checktime: function (btn) {
    //   let self = this
    //   if (self.checkTime[btn] === 'primary') {
    //     for (let i = 0; i < self.checkTime.length; i++) {
    //       self.checkTime.splice(i, 1, 'primary')
    //     }
    //     self.checkTime.splice(btn, 1, 'success')
    //   }
    // },
    updateYear () {
      checkDateBtn(0, this.checkTime, 'primary', 'success')
      // console.log(this.heightbloodTotal)
      this.heightbloodLineData = {
        labelData: ['0', '2', '4', '6', '8', '10', '12'],
        valueData: [3, 8, 5, 13, 12, 5, 6]
      }
    },
    updateMounth () {
      checkDateBtn(1, this.checkTime, 'primary', 'success')
    },
    updateWeek () {
      checkDateBtn(2, this.checkTime, 'primary', 'success')
    },
    updateDay () {
      checkDateBtn(3, this.checkTime, 'primary', 'success')
    }
  },
  watch: {

  },
  mounted () {
    let HBfenbu = echarts.init(document.getElementById('HBfenbu'))
    let HBzoushi = echarts.init(document.getElementById('HBzoushi'))
    HBfenbu.setOption({
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
        selectedMode: false
        // formatter: (name) => {
        //   var index = 0
        //   this.HBfenbu.status.forEach(function (value, i) {
        //     if (value === name) {
        //       index = i
        //     }
        //   })
        //   return name + '  共(' + this.HBfenbu.value[index] + '次)'
        // }

      },
      series: [
        {
          name: '高血压',
          type: 'pie',
          radius: '70%',
          center: ['60%', '50%'],
          data: this.heightbloodPieData,
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
    })
    HBzoushi.setOption({
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
        boundaryGap: false,
        data: this.heightbloodLineData.labelData
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
          data: this.heightbloodLineData.valueData
        }
      ]
    })
    // this.updateYear()
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
