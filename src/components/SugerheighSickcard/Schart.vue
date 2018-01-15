<template>
  <div>
    <!-- 最新图表 上 start -->
    <div class="margin-bottom">
      <el-card>
        <div slot="header">
          <span>最新图表</span>
        </div>
        <el-row :gutter="20">

          <el-col :span="6">
            <div class="newchart newchart-body">
              <div class="newchart newchart-top-green">
                <div>
                  <span>6.9%</span>
                </div>
                <div>
                  <span>预估HbA1C</span>
                </div>
              </div>
              <div>
                <span>过去的3个月</span>
              </div>
            </div>
          </el-col>

          <el-col :span="6">
            <div class="newchart newchart-body">
              <div class="newchart newchart-top-green">
                <div>
                  <span>19</span>
                </div>
                <div>
                  <span>测量次数</span>
                </div>
              </div>
              <div>
                <span>过去的14天</span>
              </div>
            </div>
          </el-col>

          <el-col :span="6">
            <div class="newchart newchart-body">
              <div class="newchart newchart-top-green">
                <div>
                  <span>2</span>
                </div>
                <div>
                  <span>分享次数</span>
                </div>
              </div>
              <div>
                <span>过去的14天</span>
              </div>
            </div>
          </el-col>

          <el-col :span="6">
            <div class="newchart newchart-body">
              <div class="newchart newchart-top-red">
                <div>
                  <span>6</span>
                </div>
                <div>
                  <span>高危次数</span>
                </div>
              </div>
              <div>
                <span>过去的14天</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <!-- 最新图表 上 end -->

    <!-- 最新图表 下 start -->
    <div class="margin-bottom">
      <el-card>
        <div slot="header">
          <span>最新图表</span>
        </div>
        <div>规范图例</div>
        <div id="chartsbox">
          <div id='guifantuli' :style="{width:'750px',height:'250px'}"></div>
        </div>
      </el-card>
    </div>
    <!-- 最新图表 下 end -->

    <!-- 血糖日趋势 start -->
    <div class="margin-bottom">
      <el-card>
        <div slot="header">
          <span>血糖日趋势</span>
        </div>
        <div class="charts">

          <div id='sugerdaychange' :style="{width:'850px',height:'250px'}"></div>
        </div>
      </el-card>
    </div>
    <!-- 血糖日趋势 end -->

    <div class="margin-bottom">
      <el-card>
        <el-row>
          <!-- 葡萄糖分布 -->
          <el-col  :xs="24"  :lg="12">
            <el-card>
              <div slot="header">
                <span>
                  葡萄糖分布
                </span>
              </div>
              <el-row>
                <el-col :span="4">
                  <el-button size="mini">
                    1天
                  </el-button>
                </el-col>
                <el-col :span="4">
                  <el-button size="mini">
                    1周
                  </el-button>
                  
                </el-col>
                <el-col :span="4">
                  <el-button size="mini">
                    2周
                  </el-button>
                  
                </el-col>
                <el-col :span="4">
                  <el-button size="mini">
                    1个月
                  </el-button>
                  
                </el-col>
                <el-col :span="4">
                  <el-button size="mini">
                    3个月
                  </el-button>
                  
                </el-col>
                <el-col :span="4">
                  <el-button size="mini">
                    6个月
                  </el-button>
                  
                </el-col>
              </el-row>
              <el-row>
                  <div id='sugerfenbu'  :style="{width:'450px',height:'250px'}"></div>
              </el-row>
            </el-card>
          </el-col>
          <!-- 葡萄糖分布 end -->
          <!-- 葡萄糖趋势 -->
          <el-col  :xs="24"  :lg="12">
            <el-card>
              <div slot="header">
                <span>
                  葡萄糖分布
                </span>
              </div>
              <el-row>
                <el-col :span="4">
                  <el-button size="mini">
                    1天
                  </el-button>
                </el-col>
                <el-col :span="4">
                  <el-button size="mini">
                    1周
                  </el-button>
                  
                </el-col>
                <el-col :span="4">
                  <el-button size="mini">
                    2周
                  </el-button>
                  
                </el-col>
                <el-col :span="4">
                  <el-button size="mini">
                    1个月
                  </el-button>
                  
                </el-col>
                <el-col :span="4">
                  <el-button size="mini">
                    3个月
                  </el-button>
                  
                </el-col>
                <el-col :span="4">
                  <el-button size="mini">
                    6个月
                  </el-button>
                  
                </el-col>
              </el-row>
              <el-row>
                  <div id='sugerqushi'  :style="{width:'350px',height:'250px'}"></div>
              </el-row>
            </el-card>
          </el-col>
          <!-- 葡萄糖趋势 end -->
        </el-row>
      </el-card>
    </div>
    <!-- 葡萄糖平均水平 动态葡萄糖图谱 -->
    <div class="margin-bottom">
      <el-row>
        <el-col :xs="24" :lg="12">
          <el-card>
            <div slot="header">
              <span>葡萄糖平均水平</span>
            </div>
              <el-row>
                <el-col :span="4">
                  <el-button size="mini">
                    1天
                  </el-button>
                </el-col>
                <el-col :span="4">
                  <el-button size="mini">
                    1周
                  </el-button>
                  
                </el-col>
                <el-col :span="4">
                  <el-button size="mini">
                    2周
                  </el-button>
                  
                </el-col>
                <el-col :span="4">
                  <el-button size="mini">
                    1个月
                  </el-button>
                  
                </el-col>
                <el-col :span="4">
                  <el-button size="mini">
                    3个月
                  </el-button>
                  
                </el-col>
                <el-col :span="4">
                  <el-button size="mini">
                    6个月
                  </el-button>
                  
                </el-col>
              </el-row>
            <div>
              <div id='sugeraverage'  :style="{width:'450px',height:'250px'}"></div>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-card>
            <div slot="header">
              <span>动态葡萄糖图谱</span>
            </div>
              <el-row>
                <el-col :span="4">
                  <el-button size="mini">
                    1天
                  </el-button>
                </el-col>
                <el-col :span="4">
                  <el-button size="mini">
                    1周
                  </el-button>
                  
                </el-col>
                <el-col :span="4">
                  <el-button size="mini">
                    2周
                  </el-button>
                  
                </el-col>
                <el-col :span="4">
                  <el-button size="mini">
                    1个月
                  </el-button>
                  
                </el-col>
                <el-col :span="4">
                  <el-button size="mini">
                    3个月
                  </el-button>
                  
                </el-col>
                <el-col :span="4">
                  <el-button size="mini">
                    6个月
                  </el-button>
                  
                </el-col>
              </el-row>
            <div>
              <div id='movesuger'  :style="{width:'450px',height:'250px'}"></div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 葡萄糖平均水平 动态葡萄糖图谱 end-->
    <!-- 预估HbA1C走势（过去8周） -->
    <div>
      <el-card>
        <div slot="header">
          <span>预估HbA1C走势（过去8周）</span>
        </div>
        <div>
          <div id='HbA1C'  :style="{width:'850px',height:'250px'}"></div>
        </div>
      </el-card>
    </div>
    <!-- 预估HbA1C走势（过去8周）end -->

    <!-- 最近测量值 -->
      <div>
        <el-card>
          <div slot="header">
            <span>最近测量值</span>
          </div>
          <el-table
          :data="neartestData"
          width="100%"
          border>
          <template v-for = "item in neartestDataCol">
            <el-table-column
            :prop="item.prop"
            :label="item.label"
            :key="item.prop"
            width="55">
            </el-table-column>
          </template>
          </el-table>
        </el-card>
      </div>
    <!-- 最近测量值 end-->
  </div>
</template>

<script>
// import echarts from 'echarts'

export default {
  name: 'Schart',
  data () {
    return {
      sugerfenbu: {
        'status': ['正常', '偏高', '高', '危险'],
        'value': [123, 55, 554, 454]
      },
      neartestDataCol: [
        {
          prop: 'time',
          label: '日期'
        },
        {
          prop: 'beforbreakfast',
          label: '早餐前'
        },
        {
          prop: 'afterbreakfast',
          label: '早餐后'
        },
        {
          prop: 'beforlunch',
          label: '午餐前'
        },
        {
          prop: 'afterlunch',
          label: '午餐后'
        },
        {
          prop: 'befordinner',
          label: '晚餐前'
        },
        {
          prop: 'afterdinner',
          label: '晚餐后'
        },
        {
          prop: 'badtime',
          label: '睡觉时间'
        },
        {
          prop: 'night',
          label: '午夜'
        },
        {
          prop: 'basicsHbA1C',
          label: '基础胰岛素'
        },
        {
          prop: 'morringHbA1C',
          label: '早晨胰岛素'
        },
        {
          prop: 'noonHbA1C',
          label: '中午胰岛素'
        },
        {
          prop: 'nightHbA1C',
          label: '晚上胰岛素'
        },
        {
          prop: 'rightHbA1C',
          label: '纠正注射量'
        },
        {
          prop: 'todayHbA1C',
          label: '今日注射总量'
        },
        {
          prop: 'tip',
          label: '备注'
        }
      ],
      neartestData: [
        {
          time: '2017/12/03',
          beforbreakfast: '207',
          afterbreakfast: '121',
          beforlunch: '233',
          afterlunch: '149',
          befordinner: '139',
          afterdinner: '209',
          badtime: '',
          night: '',
          basicsHbA1C: '20',
          morringHbA1C: '14',
          noonHbA1C: '15',
          nightHbA1C: '17',
          todayHbA1C: '',
          tip: '66'
        }
      ]
    }
  },
  methods: {
    resizeCharts (box, echarts, HtoW) {
      let boxWith = box.clientWidth
      let boxHeight = box.clientWidth * HtoW

      echarts.style.width = boxWith + 'px'
      echarts.firstChild.style.width = boxWith + 'px'
      echarts.firstChild.firstChild.style.width = boxWith + 'px'
      echarts.clientWidth = boxWith + 'px'

      echarts.style.height = boxHeight + 'px'
      echarts.firstChild.style.height = boxHeight + 'px'
      echarts.firstChild.firstChild.style.height = boxHeight + 'px'
    }
  },
  computed: {
  },
  mounted () {
    var guifantuliID = this.$echarts.init(document.getElementById('guifantuli'))
    const sugerdaychange = this.$echarts.init(document.getElementById('sugerdaychange'))
    const sugerfenbu = this.$echarts.init(document.getElementById('sugerfenbu'))
    const sugerqushi = this.$echarts.init(document.getElementById('sugerqushi'))
    const sugeraverage = this.$echarts.init(document.getElementById('sugeraverage'))
    const movesuger = this.$echarts.init(document.getElementById('movesuger'))
    const HbA1C = this.$echarts.init(document.getElementById('HbA1C'))
    let guifantulichart = document.getElementById('guifantuli')
    let chartBox = document.getElementById('chartsbox')
    window.onload = window.onresize = () => {
      this.resizeCharts(chartBox, guifantulichart, 0.25)
    }
    guifantuliID.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      // legend: {
      //   // data: ['直接访问', '邮件营销','联盟广告','视频广告']
      // },
      grid: {
        left: '5%',
        // right: 'center',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: ['正餐后', '正餐前']
      },
      series: [
        {
          name: '直接访问',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [320, 302]
        },
        {
          name: '邮件营销',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [120, 132]
        },
        {
          name: '联盟广告',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [220, 182]
        },
        {
          name: '视频广告',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [150, 212]
        }
      ]
    })
    sugerdaychange.setOption({
      title: {
        // text: '折线图堆叠'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        orient: 'vertical',
        right: '20',
        top: 'top',
        data: ['2017-12-05', '2017-12-06', '2017-12-07', '2017-12-08', '2017-12-09']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },

      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['0', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '00:00', '02:00', '04:00']
      },
      yAxis: {

        // type: 'category',
        type: 'value',
        name: 'mg/gl',
        nameLocation: 'end',
        boundaryGap: false,
        data: ['0', '25', '50', '75', '100']

      },
      series: [
        {
          name: '2017-12-05',
          type: 'line',
            // stack: '总量',
            // smooth: true,
          data: [100, 132, 101, 134, 90, 112, 142]
        },
        {
          name: '2017-12-06',
          type: 'line',
            // smooth: true,
            // stack: '总量',
          data: [120, 182, 191, 134, 120, 150, 110]
        },
        {
          name: '2017-12-07',
          type: 'line',
            // stack: '总量',
          data: [150, 132, 201, 154, 190, 130, 110]
        },
        {
          name: '2017-12-08',
          type: 'line',
            // stack: '总量',
          data: [120, 132, 101, 134, 190, 130, 120]
        },
        {
          name: '2017-12-09',
          type: 'line',
            // stack: '总量',
          data: [120, 132, 101, 134, 190, 130, 120]
        }
      ]
    })
    sugerfenbu.setOption({
      title: {
        // text: '患者分布',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      color: ['Sienna', 'LightSalmon', 'Coral', 'OrangeRed'],
      legend: {
        orient: 'vertical',
        left: 'left',
        top: 'top',
        data: this.sugerfenbu.status,
        selectedMode: false,
        formatter: (name) => {
          var index = 0
          this.sugerfenbu.status.forEach(function (value, i) {
            if (value === name) {
              index = i
            }
          })
          return name + '  共(' + this.sugerfenbu.value[index] + '次)'
        }

      },
      series: [
        {
          name: '高血压',
          type: 'pie',
          radius: '50%',
          center: ['40%', '60%'],
          data: [
            { value: 332, name: '正常' },
            { value: 75, name: '偏高' },
            { value: 555, name: '高' },
            { value: 44, name: '危险' }
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
              show: false
            }
          }
        }
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: ''
        }
      }
    })
    sugerqushi.setOption({
      title: {
        text: '葡萄糖趋势'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        data: ['11-12', '11-13', '11-14', '11-15', '11-16', '11-17', '11-18', '11-19']
      },
      yAxis: {
            // splitLine: {
            //     show: false
            // }
      },
        // toolbox: {
        //     left: 'center',
        //     feature: {
        //         dataZoom: {
        //             yAxisIndex: 'none'
        //         },
        //         restore: {},
        //         saveAsImage: {}
        //     }
        // },
        // dataZoom: [{
        //     startValue: '2014-06-01'
        // }, {
        //     type: 'inside'
        // }],
      visualMap: {
        show: false,
        // top: 10,
        // left: 'left',
        // right: 10,
        pieces: [{
          gt: 0,
          lte: 50,
          color: '#096'
        }, {
          gt: 50,
          lte: 100,
          color: '#ffde33'
        }, {
          gt: 100,
          lte: 150,
          color: '#ff9933'
        }, {
          gt: 150,
          lte: 200,
          color: '#cc0033'
        }, {
          gt: 200,
          lte: 300,
          color: '#660099'
        }, {
          gt: 300,
          color: '#7e0023'
        }],
        outOfRange: {
          color: '#999'
        }
      },
      series: {
        name: '葡萄糖趋势',
        type: 'line',
        data: ['121', '131', '157', '123', '156', '136', '164', '99']
            // markLine: {
            //     silent: true,
            //     data: [{
            //         yAxis: 50
            //     }, {
            //         yAxis: 100
            //     }, {
            //         yAxis: 150
            //     }, {
            //         yAxis: 200
            //     }, {
            //         yAxis: 300
            //     }]
            // }
      }
    })
    sugeraverage.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: 'left',
        // right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '血压水平',
          type: 'bar',
          barWidth: '30%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    })
    movesuger.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: 'left',
        // right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '血压水平',
          type: 'bar',
          barWidth: '30%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    })
    HbA1C.setOption({
      title: {
        // text: '糖尿病',
        // subtext: '副标题',
        x: 'center'
      },
      tooltip: { // 提示框组件
        trigger: 'axis',
        formatter: '{b} : {c}'
      },
      grid: { // 直角坐标系内绘图网格
        left: 'left',
        right: 'center',
        bottom: '3%',
        width: '600',
        height: '200',
        containLabel: true
      },
      toolbox: { // 工具栏
        show: true
        // feature: {
        //   asveAsImage: {}
        // }
      },
      legend: { // 图例组件
        // orient: 'vertical',
        // left: 'left',
        // right: 'center',
        // top: 'center',
        // selectedMode: false,
        // data: ['控压走势', '控糖走势']
        // selectedMode: false
      },
      xAxis: { // 直角坐标系grid的x轴
        type: 'category',

        boundaryGap: false,
        data: ['一', '二', '三', '四', '五', '六', '七']
      },
      yAxis: { // 直角坐标系grid的y轴
        type: 'value',
        // name: ''
        // axisLine: {onZero: false},
        axisLabel: {
          formatter: '{value}%'
        },
        boundaryGap: false,
        data: ['0', '25', '50', '75', '100']
      },
      series: [
        // {
        //   name: '控压走势',
        //   type: 'line',
        //   lineStyle: {
        //     normal: {
        //       width: 3,
        //       shadowColor: 'rgba(0,0,0,0.4)',
        //       shadowBlur: 5,
        //       shadowOffsetY: 5
        //     }
        //   },
        //   data: [5, 10, 15, 25, 30, 35, 40]
        // },
        {
          name: 'HbA1C',
          type: 'line',
          lineStyle: {
            normal: {
              width: 3,
              shadowColor: 'rgba(0,0,0,0.4)',
              shadowBlur: 5,
              shadowOffsetY: 5
            }
          },
          data: [1, 32, 45, 15, 15, 18, 19]
        }
      ]
    })
    window.onresize = () => {
      this.resizeCharts(chartBox, guifantulichart, 0.4)
    }
  },
  created () {

    // window.onresize = () => {
    //   let guifantulichart = document.getElementById('guifantuli')
    //   let chartBox = document.getElementById('chartsbox')
    //   this.resizeCharts(chartBox, guifantulichart, 0.4)
    // }
  }
}
</script>

<style>
  .newchart{
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .newchart span{
    display: block;
    padding: 20px;
  }
  .newchart-body{
    border: 1px solid rgb(231, 190, 190);
    margin: 10px;
  }
  .newchart-top-green{
    background-color: rgb(97, 173, 97);
    color: #fff;
    border-bottom: 1px solid rgb(231, 190, 190);
    /* padding: 30px */
  }
  .newchart-top-red{
    background-color: rgb(233, 56, 50);
    color: #fff;
    border-bottom: 1px solid rgb(231, 190, 190);
    /* padding: 30px */
  }
  .margin-bottom{
    margin-bottom: 20px;
  }
</style>
