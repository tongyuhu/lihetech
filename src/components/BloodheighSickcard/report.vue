<template>
  <div>
    <!-- 血压分布  -->
    <div>
      <el-row>
        <el-col :span="12">
          <el-card :body-style="{ padding: '0px' }">
            <div class="card-header">
                <p class="title">血压分布</p>
            </div>
            <div class="check-date">
              <el-row type="flex" justify="start">
                <button v-for="(item,index) in checkDate" 
                :key="item.date" 
                class="check-date-btn" 
                :class="{checked:item.isChecked}" 
                @click="updateDate(item,index)">
                  {{item.date}}
                </button>
              </el-row>
            </div>
            <div id='bloodCover'  :style="{width:'450px',height:'250px'}"></div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card :body-style="{ padding: '0px' }">
            <div class="card-header">
                <p class="title">血压直方图</p>
            </div>
            <div class="check-date">
              <el-row type="flex" justify="start">
                <button v-for="(item,index) in checkDate" 
                :key="item.date" 
                class="check-date-btn" 
                :class="{checked:item.isChecked}" 
                @click="updateDate(item,index)">
                  {{item.date}}
                </button>
              </el-row>
            </div>
            <!-- <div id='bloodAverage'  :style="{width:'450px',height:'250px'}"></div> -->
            <div id='bloodHistogram'  :style="{width:'450px',height:'250px'}"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 血压与饮食 -->
    <div>
      <el-card :body-style="{ padding: '0px' }">
        <div class="card-header">
            <p class="title">血压与饮食</p>
        </div>
        <div class="check-date">
          <el-row type="flex" justify="start">
            <button v-for="(item,index) in checkDate" 
            :key="item.date" 
            class="check-date-btn" 
            :class="{checked:item.isChecked}" 
            @click="updateDate(item,index)">
              {{item.date}}
            </button>
          </el-row>
        </div>
        <div class="clear">
          <div class="float-box">
            <div id='bloodFoodblood' :style="{width:'350px',height:'250px'}"></div>
          </div>
          <div class="float-box">
            <div id='bloodFood' :style="{width:'350px',height:'250px'}"></div>
          </div>
          <div class="float-box">
            <div class="checked-kaluli">
              <span class="check-all-span">
                <button class="check-all-btn" @click="checkAllHandle()">
                  <span :class="{'check-all-btn-icon':!ischeckAll,'check-all-btn-icon-active':ischeckAll}"></span>
                  <span>卡路里</span>
                </button>
              </span>
            </div>
            <div class="checked-score">
              <span class="check-all-span">
                <button class="check-all-btn" @click="checkAllHandle()">
                  <span :class="{'check-all-btn-icon':!ischeckAll,'check-all-btn-icon-active':ischeckAll}"></span>
                  <span>分数</span>
                </button>
              </span>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <!-- 血压与运动 -->
    <div>
      <el-card :body-style="{ padding: '0px' }">
        <div class="card-header">
            <p class="title">血压与运动</p>
        </div>
        <div class="check-date">
          <el-row type="flex" justify="start">
            <button v-for="(item,index) in checkDate" 
            :key="item.date" 
            class="check-date-btn" 
            :class="{checked:item.isChecked}" 
            @click="updateDate(item,index)">
              {{item.date}}
            </button>
          </el-row>
        </div>
        <div class="clear">
          <div class="float-box">
            <div id='bloodSportblood' :style="{width:'350px',height:'250px'}"></div>
          </div>
          <div class="float-box">
            <div id='bloodSport' :style="{width:'350px',height:'250px'}"></div>
          </div>
          <div class="float-box">
            <div class="checked-kaluli">
              <span class="check-all-span">
                <button class="check-all-btn" @click="checkAllHandle()">
                  <span :class="{'check-all-btn-icon':!ischeckAll,'check-all-btn-icon-active':ischeckAll}"></span>
                  <span>卡路里</span>
                </button>
              </span>
            </div>
            <div class="checked-score">
              <span class="check-all-span">
                <button class="check-all-btn" @click="checkAllHandle()">
                  <span :class="{'check-all-btn-icon':!ischeckAll,'check-all-btn-icon-active':ischeckAll}"></span>
                  <span>分数</span>
                </button>
              </span>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      ischeckAll: false,
      status: [
        {
          label: '运动后',
          value: 'aftrSport',
          default: true
        },
        {
          label: '运动后',
          value: 'afterSpot',
          default: true
        },
        {
          label: '运动后',
          value: 'aftrSpodrt',
          default: true
        },
        {
          label: '运动后',
          value: 'affgterSport',
          default: true
        },
        {
          label: '运动后',
          value: 'afterSpourt',
          default: true
        },
        {
          label: '运动后',
          value: 'afteroSport',
          default: true
        },
        {
          label: '运动后',
          value: 'afterSpor5t',
          default: true
        },
        {
          label: '运动后',
          value: 'afterSp7ort',
          default: true
        },
        {
          label: '运动后',
          value: 'afterS8port',
          default: true
        },
        {
          label: '运动后',
          value: 'after3Sport',
          default: true
        },
        {
          label: '运动后',
          value: 'afte33rSport',
          default: true
        },
        {
          label: '运动后',
          value: 'afterSpo356rt',
          default: true
        }
      ],
      sportsType: [
        {
          label: '运动后',
          value: 'after24Sport',
          default: true
        },
        {
          label: '运动后',
          value: 'afte42rSport',
          default: true
        },
        {
          label: '运动后',
          value: 'after7Sport',
          default: true
        },
        {
          label: '运动后',
          value: 'afterSpor56t',
          default: true
        }
      ],
      foodType: [
        {
          label: '运动后',
          value: 'after089Sport',
          default: true
        },
        {
          label: '运动后',
          value: 'afterS890port',
          default: true
        },
        {
          label: '运动后',
          value: 'afterSp0890ort',
          default: true
        },
        {
          label: '运动后',
          value: 'aft879erSport',
          default: true
        },
        {
          label: '运动后',
          value: 'af534terSport',
          default: true
        },
        {
          label: '运动后',
          value: 'after142Sport',
          default: true
        }
      ],
      checkDate: [
        {
          date: '最近',
          value: 'lately',
          isChecked: false
        },
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
          date: '6个月',
          value: 'year',
          isChecked: false
        }
      ],
      Data: [
        {value: 335, name: '正常'},
        {value: 310, name: '偏高'},
        {value: 234, name: '高'},
        {value: 135, name: '危险'}
      ]
    }
  },
  methods: {
    checkAllHandle () {
      this.ischeckAll = !this.ischeckAll
    },
    changeStatus () {

    },
    updateDate (date, index) {
      this.checkDate.forEach(item => {
        item.isChecked = false
      })
      this.checkDate[index].isChecked = true
    },
    bloodCoverOption () {
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
            this.Data.forEach(
              (item, index) => {
                if (item.name === name) {
                  i = index
                  return i
                }
              }
            )
            return name + '（共' + this.Data[i].value + '人）'
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
            data: [
                {value: 335, name: '正常'},
                {value: 310, name: '偏高'},
                {value: 234, name: '高'},
                {value: 135, name: '危险'}
            ],
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
            shadowBlur: 2,
            shadowOffsetX: 0,
            shadowColor: ''
          }
        }
      }
    },
    bloodAverageOption () {
      return {
        grid: {
          show: false,
          top: '30px',
          width: 'auto',
          height: 'auto'
        },
        xAxis: { // 直角坐标系grid的x轴
          type: 'category',
          axisLabel: {
            interval: 0,  // 显示x轴数据
            showMinLabel: true,
            showMaxLabel: true,
            align: 'left',
            rotate: 330
          },
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisTick: {
            show: false
          },
          data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']
        },
        yAxis: { // 直角坐标系grid的y轴
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
          splitLine: {  // y轴网格显示
            show: true
          },
          nameTextStyle: { // 坐标轴名样式
            color: '#666',
            fontSize: 12,
            align: 'left'
          },
          boundaryGap: true,
          splitNumber: 3,  // 坐标轴分割段数
          minInterval: 40, // 自动计算的坐标轴最小间隔大小。例如可以设置成1保证坐标轴分割刻度显示成整数。
          // interval: 50, // 强制设置坐标轴分割间隔。
          data: ['0', '120', '140', '180']
        },
        series: [
          {
            name: '血压平均分布',
            type: 'bar',
            barWidth: '60%',
            label: {
              normal: {
                show: true,
                position: 'top',
                distance: 5,
                formatter: '{c}',
                color: '#999'
              }
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = ['#81cefc', '#7cedc4', '#f4e07a', '#ff8f8f']
                  if (params.data > 170) {
                    return colorList[3]
                  } else if (params.data > 140) {
                    return colorList[2]
                  } else if (params.data > 120) {
                    return colorList[1]
                  } else {
                    return colorList[0]
                  }
                }
              }
            },
            data: [144, 165, 174, 86, 70, 85, 92, 156, 75, 84, 66, 150]
          }
        ]
      }
    },
    bloodHistogramOption () {
      return {
        color: ['#81cefc', '#7cedc4', '#f4e07a', '#ff947b', '#ff5252'],
        tooltip: {
          show: false
        },
        legend: {
          orient: 'vertical',
          right: '0',
          top: 'center',
          selectedMode: false,
          itemWidth: 20,
          itemHeight: 20,
          data: [{
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
          }
          ]
        },
        grid: {
          left: '5%',
          right: '100',
          bottom: '24',
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
          min: 50
        }],
        yAxis: [

          {
            type: 'value',
            name: '高压（收缩压）',
            nameLocation: 'end',
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            min: 60

          }
        ],
        series: [{
          type: 'line',
          name: '正常',
          symbol: 'none',
          lineStyle: {
            normal: {
              width: 0,
              color: '#81cefc'
            }
          },
          areaStyle: {
            normal: {
              color: '#81cefc'
            }
          },
          z: 10,
          connectNulls: true,
          data: [
                [0, 130],
                [85, 130]
          ]

        },
        {
          type: 'line',
          name: '正常高值',
          symbol: 'none',
          lineStyle: {
            normal: {
              width: 0,
              color: '#7cedc4'
            }
          },
          areaStyle: {
            normal: {
              color: '#7cedc4'
            }
          },
          itemStyle: {},
          z: 9,
          connectNulls: true,
          step: true,
          data: [
                [0, 140],
                [90, 140]
          ]

        },
        {
          type: 'line',
          name: '轻度',
          symbol: 'none',
          lineStyle: {
            normal: {
              width: 0,
              color: '#f4e07a'
            }
          },
          areaStyle: {
            normal: {
              color: '#f4e07a'
            }
          },
          z: 8,
          data: [
                [0, 160],
                [100, 160]
          ]
        },
        {
          type: 'line',
          name: '中度',
          symbol: 'none',
          lineStyle: {
            normal: {
              width: 0,
              color: '#ff947b'
            }
          },
          areaStyle: {
            normal: {
              color: '#ff947b'
            }
          },
          z: 7,
          data: [
                [0, 180],
                [110, 180]
          ]
        },
        {
          type: 'line',
          name: '危险',
          symbol: 'none',
          lineStyle: {
            normal: {
              width: 0,
              color: '#e21b1b'
            }
          },
          areaStyle: {
            normal: {
              color: '#e21b1b'
            }
          },
          z: 1,
          data: [
                [0, 210],
                [120, 210]
          ]
        },
        {
          type: 'scatter',
          symbol: 'circle',
          symbolSize: 5,
          itemStyle: {
            normal: {
              color: '#fff'
            }
          },
          z: 20,
          data: [
                [54, 112],
                [80, 120],
                [70, 125],
                [100, 130],
                [90, 128],
                [85, 135],
                [111, 188],
                [116, 200]
          ]
        }
        ]
      }
      // return option
    },
    bloodFoodbloodOption () {
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
        // tooltip: { // 提示框组件
        //   trigger: 'axis',
        //   axisPointer: {
        //     type: 'cross'
        //   },
        //   snap: true,
        //   formatter: '{b} : {c}%'
        // },
        grid: { // 直角坐标系内绘图网格
          show: false,
          // left: '40px',
          top: '30px',
          // bottom: '24px',
          width: 'auto',
          height: 'auto'
          // width: '100%',
          // height: '100%'
          // containLabel: true
        },
      // toolbox: { // 工具栏
        // show: true
        // feature: {
        //   asveAsImage: {}
        // }
      // },
        // legend: { // 图例组件
        //   show: true,
        //   type: 'plain',
        //   orient: 'vertical',
        //   right: 15,
        //   top: 10,
        //   data: [{
        //     name: '控压走势',
        //     icon: 'roundRect',
        //     textStyle: {
        //       fontSize: 14
        //     }
        //   }],
        //   selectedMode: false,
        //   itemWidth: 20,
        //   itemHeight: 20
        // },
        // visualMap: [
        //   {
        //     type: 'piecewise',
        //     pieces: [{gt: 'aa'}]
        //   }
        // ],
        xAxis: { // 直角坐标系grid的x轴
          type: 'category',
          // type: 'time',
          boundaryGap: false,
          // minInterval: 1,
          // interval: 0,
          // nameTextStyle: {
          //   normal: {
          //     color: '#666',
          //     fontSize: 12
          //   }
          // },
          // splitLine: {
          //   show: false
          // },
          axisLabel: {
            interval: 0,  // 显示x轴数据
            showMinLabel: true,
            showMaxLabel: true,
            align: 'left',
            rotate: 330
          },
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          // min: 0,
          axisTick: {
            show: false
          },
          // data: this.sickTrendDataX[this.clickTime]
          // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']
        },
        yAxis: { // 直角坐标系grid的y轴
          name: '血压',
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
          // axisLabel: {
          //   // formatter: '{value}%'
          // },
          splitLine: {  // y轴网格显示
            show: true
          },
          nameTextStyle: { // 坐标轴名样式
            color: '#666',
            fontSize: 12,
            align: 'left'
          },
          boundaryGap: true,
          splitNumber: 3,  // 坐标轴分割段数
          minInterval: 40, // 自动计算的坐标轴最小间隔大小。例如可以设置成1保证坐标轴分割刻度显示成整数。
          // interval: 50, // 强制设置坐标轴分割间隔。
          data: ['0', '120', '140', '180']
        },
        series: [
          {
            name: '舒张压',
            type: 'line',
            smooth: true,
            smoothMonotone: 'x',
            lineStyle: {
              normal: {
                width: 2,
                color: '#8ecefc'
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
            data: [44, 65, 74, 86, 70, 85, 92, 56, 75, 84, 66, 50]
          },
          {
            name: '收缩压',
            type: 'line',
            smooth: true,
            smoothMonotone: 'x',
            lineStyle: {
              normal: {
                width: 2,
                color: '#7cedc4'
              }
            },
            itemStyle: {
              normal: {
                color: '#7cedc4'
              }
            },
            areaStyle: {
              normal: {
                color: '#def3f2',
                origin: 'auto'
              }
            },
            data: [ 34, 55, 54, 76, 60, 75, 72, 16, 55, 74, 36, 10 ]
          }
        ],
        textStyle: {
          color: '#666',
          fontSize: 12
        }
      }
    },
    bloodFoodOption () {
      return {
        grid: { // 直角坐标系内绘图网格
          show: false,
          top: '30px',
          width: 'auto',
          height: 'auto'
        },
        xAxis: { // 直角坐标系grid的x轴
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            interval: 0,  // 显示x轴数据
            showMinLabel: true,
            showMaxLabel: true,
            align: 'left',
            rotate: 330
          },
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisTick: {
            show: false
          },
          data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']
        },
        yAxis: { // 直角坐标系grid的y轴
          name: '行为分数',
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
          splitLine: {  // y轴网格显示
            show: true
          },
          nameTextStyle: { // 坐标轴名样式
            color: '#666',
            fontSize: 12,
            align: 'left'
          },
          boundaryGap: true,
          splitNumber: 3,  // 坐标轴分割段数
          minInterval: 40, // 自动计算的坐标轴最小间隔大小。例如可以设置成1保证坐标轴分割刻度显示成整数。
          // interval: 50, // 强制设置坐标轴分割间隔。
          data: ['0', '120', '140', '180']
        },
        series: [
          {
            name: '舒张压',
            type: 'line',
            smooth: true,
            smoothMonotone: 'x',
            lineStyle: {
              normal: {
                width: 2,
                color: '#8ecefc'
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
            data: [44, 65, 74, 86, 70, 85, 92, 56, 75, 84, 66, 50]
          }

        ],
        textStyle: {
          color: '#666',
          fontSize: 12
        }
      }
    },
    bloodSportbloodOption () {
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
        // tooltip: { // 提示框组件
        //   trigger: 'axis',
        //   axisPointer: {
        //     type: 'cross'
        //   },
        //   snap: true,
        //   formatter: '{b} : {c}%'
        // },
        grid: { // 直角坐标系内绘图网格
          show: false,
          // left: '40px',
          top: '30px',
          // bottom: '24px',
          width: 'auto',
          height: 'auto'
          // width: '100%',
          // height: '100%'
          // containLabel: true
        },
      // toolbox: { // 工具栏
        // show: true
        // feature: {
        //   asveAsImage: {}
        // }
      // },
        // legend: { // 图例组件
        //   show: true,
        //   type: 'plain',
        //   orient: 'vertical',
        //   right: 15,
        //   top: 10,
        //   data: [{
        //     name: '控压走势',
        //     icon: 'roundRect',
        //     textStyle: {
        //       fontSize: 14
        //     }
        //   }],
        //   selectedMode: false,
        //   itemWidth: 20,
        //   itemHeight: 20
        // },
        // visualMap: [
        //   {
        //     type: 'piecewise',
        //     pieces: [{gt: 'aa'}]
        //   }
        // ],
        xAxis: { // 直角坐标系grid的x轴
          type: 'category',
          // type: 'time',
          boundaryGap: false,
          // minInterval: 1,
          // interval: 0,
          // nameTextStyle: {
          //   normal: {
          //     color: '#666',
          //     fontSize: 12
          //   }
          // },
          // splitLine: {
          //   show: false
          // },
          axisLabel: {
            interval: 0,  // 显示x轴数据
            showMinLabel: true,
            showMaxLabel: true,
            align: 'left',
            rotate: 330
          },
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          // min: 0,
          axisTick: {
            show: false
          },
          // data: this.sickTrendDataX[this.clickTime]
          // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']
        },
        yAxis: { // 直角坐标系grid的y轴
          name: '血压',
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
          // axisLabel: {
          //   // formatter: '{value}%'
          // },
          splitLine: {  // y轴网格显示
            show: true
          },
          nameTextStyle: { // 坐标轴名样式
            color: '#666',
            fontSize: 12,
            align: 'left'
          },
          boundaryGap: true,
          splitNumber: 3,  // 坐标轴分割段数
          minInterval: 40, // 自动计算的坐标轴最小间隔大小。例如可以设置成1保证坐标轴分割刻度显示成整数。
          // interval: 50, // 强制设置坐标轴分割间隔。
          data: ['0', '120', '140', '180']
        },
        series: [
          {
            name: '舒张压',
            type: 'line',
            smooth: true,
            smoothMonotone: 'x',
            lineStyle: {
              normal: {
                width: 2,
                color: '#8ecefc'
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
            data: [44, 65, 74, 86, 70, 85, 92, 56, 75, 84, 66, 50]
          },
          {
            name: '收缩压',
            type: 'line',
            smooth: true,
            smoothMonotone: 'x',
            lineStyle: {
              normal: {
                width: 2,
                color: '#7cedc4'
              }
            },
            itemStyle: {
              normal: {
                color: '#7cedc4'
              }
            },
            areaStyle: {
              normal: {
                color: '#def3f2',
                origin: 'auto'
              }
            },
            data: [ 34, 55, 54, 76, 60, 75, 72, 16, 55, 74, 36, 10 ]
          }
        ],
        textStyle: {
          color: '#666',
          fontSize: 12
        }
      }
    },
    bloodSportOption () {
      return {
        grid: { // 直角坐标系内绘图网格
          show: false,
          top: '30px',
          width: 'auto',
          height: 'auto'
        },
        xAxis: { // 直角坐标系grid的x轴
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            interval: 0,  // 显示x轴数据
            showMinLabel: true,
            showMaxLabel: true,
            align: 'left',
            rotate: 330
          },
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisTick: {
            show: false
          },
          data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']
        },
        yAxis: { // 直角坐标系grid的y轴
          name: '行为分数',
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
          splitLine: {  // y轴网格显示
            show: true
          },
          nameTextStyle: { // 坐标轴名样式
            color: '#666',
            fontSize: 12,
            align: 'left'
          },
          boundaryGap: true,
          splitNumber: 3,  // 坐标轴分割段数
          minInterval: 40, // 自动计算的坐标轴最小间隔大小。例如可以设置成1保证坐标轴分割刻度显示成整数。
          // interval: 50, // 强制设置坐标轴分割间隔。
          data: ['0', '120', '140', '180']
        },
        series: [
          {
            name: '舒张压',
            type: 'line',
            smooth: true,
            smoothMonotone: 'x',
            lineStyle: {
              normal: {
                width: 2,
                color: '#8ecefc'
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
            data: [44, 65, 74, 86, 70, 85, 92, 56, 75, 84, 66, 50]
          }

        ],
        textStyle: {
          color: '#666',
          fontSize: 12
        }
      }
    }
  },
  mounted () {
    let bloodCover = echarts.init(document.getElementById('bloodCover'))
    bloodCover.setOption(this.bloodCoverOption())
    // let bloodAverage = echarts.init(document.getElementById('bloodAverage'))
    // bloodAverage.setOption(this.bloodAverageOption())
    let bloodHistogram = echarts.init(document.getElementById('bloodHistogram'))
    bloodHistogram.setOption(this.bloodHistogramOption())
    let bloodFoodblood = echarts.init(document.getElementById('bloodFoodblood'))
    bloodFoodblood.setOption(this.bloodFoodbloodOption())
    let bloodFood = echarts.init(document.getElementById('bloodFood'))
    bloodFood.setOption(this.bloodFoodOption())
    let bloodSportblood = echarts.init(document.getElementById('bloodSportblood'))
    bloodSportblood.setOption(this.bloodSportbloodOption())
    let bloodSport = echarts.init(document.getElementById('bloodSport'))
    bloodSport.setOption(this.bloodSportOption())
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
    background: url('./../../../诊所-高血压/hospitalIcon/诊所-icon-44.png')
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
    float: left;
  }
  .checked-kaluli{
    margin-top: 80px;
  }
  .checked-score{
    margin-top:10px;
  }
</style>
