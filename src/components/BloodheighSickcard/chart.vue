<template>
  <div>
    <!-- 血压趋势 -->
    <el-card>
      <!-- 表头 start -->
      <div slot="header">
        <p>
          血压趋势
        </p>
      </div>
      <!-- 表头 end -->
      <!-- 日期选择 start -->
      <el-row>
        <el-col :span="2">
          <el-button size="mini" type="text">
            最近
          </el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="mini" type="text">
            日
          </el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="mini" type="text">
            周
          </el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="mini" type="text">
            月
          </el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="mini" type="text">
            6个月
          </el-button>
        </el-col>
      </el-row>
      <!-- 日期选择 end -->
      <!-- 折线图 start -->
      <div></div>
      <div id='xueyaqushi' :style="{width:'700px',height:'250px'}"></div>
      <!-- 折线图 end -->
      <!-- 统计 -->
      <el-row>
        <el-col :span="6">
          <h3>23次</h3>
          <p>总测量次数</p>
        </el-col>
        <el-col :span="6">
          <h3>23次</h3>
          <p>总测量次数</p>
          <p>12/4/8</p>
        </el-col>
        <el-col :span="6">
          <h3>23次</h3>
          <p>总测量次数</p>
          <p>12/4/8</p>
        </el-col>
        <el-col :span="6">
          <h3>23次</h3>
          <p>总测量次数</p>
          <p>12/4/8</p>
        </el-col>
      </el-row>
      <!-- 统计 end -->
      <!-- 标签 -->
      <el-row>
        <el-row>
          <el-col :span="4">
            <el-tag type="success">日常</el-tag>
          </el-col>
          <el-col :span="4">
            <el-tag type="success">日常</el-tag>
          </el-col>
          <el-col :span="4">
            <el-tag type="success">日常</el-tag>
          </el-col>
          <el-col :span="4">
            <el-tag type="success">日常</el-tag>
          </el-col>
          <el-col :span="4">
            <el-tag type="success">日常</el-tag>
          </el-col>
          <el-col :span="4">
            <el-tag type="success">日常</el-tag>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-tag type="success">日常</el-tag>
          </el-col>
          <el-col :span="4">
            <el-tag type="success">日常</el-tag>
          </el-col>
          <el-col :span="4">
            <el-tag type="success">日常</el-tag>
          </el-col>
          <el-col :span="4">
            <el-tag type="success">日常</el-tag>
          </el-col>
          <el-col :span="4">
            <el-tag type="success">日常</el-tag>
          </el-col>
          <el-col :span="4">
            <el-tag type="success">日常</el-tag>
          </el-col>
        </el-row>
      </el-row>
      <!-- 标签 end -->
    </el-card>
    <!-- 血压趋势 end -->
    <!-- 血压分布 血压平均水平 -->
    <el-card>
      <el-row>
        <!-- 血压分布 -->
        <el-col  :xs="24"  :lg="12">
          <el-card>
            <div slot="header">
              <span>
                血压分布
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
              <el-col :span="12">
                <div></div>
                <div id='xueyafenbu'  :style="{width:'450px',height:'250px'}"></div>
              </el-col>
              <el-col :span="12">
                <div></div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <!-- 血压分布 end -->
        <!-- 血压平均水平 -->
        <el-col  :xs="24"  :lg="12">
          <el-card>
            <div slot="header">
              <span>血压平均水平</span>
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
            <div id='xueyapingjunshuiping' :style="{width:'350px',height:'250px'}"></div>
          </el-card>
        </el-col>
        <!-- 血压平均水平 end -->
      </el-row>
    </el-card>
    <!-- 血压分布 血压平均水平 end-->
    <!-- 血压与饮食 血压与运动 -->
    <el-card>
      <el-row>
        <!-- 血压与饮食 -->
        <el-col :lg="12" :xs="24">
          <el-card>
            <div slot="header">
              <span>血压与饮食</span>
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
            <div id='xueyaandfood' :style="{width:'450px',height:'250px'}"></div>
            <el-row>
              <el-col :span="4">肉类</el-col>
              <el-col :span="4">腌制类</el-col>
              <el-col :span="4">油炸类</el-col>
              <el-col :span="4">水果类</el-col>
              <el-col :span="4">豆类</el-col>
              <el-col :span="4">主食类</el-col>
            </el-row>
          </el-card>
        </el-col>
        <!-- 血压与饮食 end -->
        <!-- 血压与运动 -->
        <el-col :lg="12" :xs="24">
          <el-card>
            <div slot="header">
              <span>血压与运动</span>
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
            <div id='xueyaandsport' :style="{width:'450px',height:'250px'}"></div>
            <el-row>
              <el-col :span="6">轻度运动</el-col>
              <el-col :span="6">最轻运动</el-col>
              <el-col :span="6">强度运动</el-col>
              <el-col :span="6">中度运动</el-col>
            </el-row>
          </el-card>
        </el-col>
        <!-- 血压与运动 end -->
      </el-row>
    </el-card>
    <!-- 血压与饮食 血压与运动 end -->
    <!-- 用药 -->
    <el-card>
      <div slot="header">
        <el-row type="flex" justify="space-between">
          <div>
            <span>用药</span>           
          </div>
          <div>
            <el-button icon="el-icon-arrow-left" type="text"></el-button>
            <span>本周</span>
            <el-button icon="el-icon-arrow-right" type="text"></el-button>
          </div>
        </el-row>
      </div>
      <div height="400px">
        <h1>用药图</h1>
      </div>
    </el-card>
    <!-- 用药 end -->
    <!-- 心血管风险评估 -->
    <risk></risk>
    <!-- 心血管风险评估 end -->
  </div>
</template>

<script>
import echarts from 'echarts'
import risk from './risk'
export default {
  name: 'chart',
  components: {
    risk
  },
  data () {
    return {
      xueyafenbu: {
        'status': ['正常', '偏高', '高', '危险'],
        'value': [123, 55, 554, 454]
      }
    }
  },
  mounted () {
    const xueyaqushi = echarts.init(document.getElementById('xueyaqushi'))
    const xueyafenbu = echarts.init(document.getElementById('xueyafenbu'))
    const xueyapingjunshuiping = echarts.init(document.getElementById('xueyapingjunshuiping'))
    const xueyaandfood = echarts.init(document.getElementById('xueyaandfood'))
    const xueyaandsport = echarts.init(document.getElementById('xueyaandsport'))
    xueyaqushi.setOption({
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
        right: 'center',
        // top: 'center',
        selectedMode: false,
        data: ['控压走势', '控糖走势']
        // selectedMode: false
      },
      xAxis: { // 直角坐标系grid的x轴
        type: 'category',

        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: { // 直角坐标系grid的y轴
        type: 'value',
        // axisLine: {onZero: false},
        axisLabel: {
          formatter: '{value}%'
        },
        boundaryGap: false,
        data: ['0', '25', '50', '75', '100']
      },
      series: [
        {
          name: '控压走势',
          type: 'line',
          lineStyle: {
            normal: {
              width: 3,
              shadowColor: 'rgba(0,0,0,0.4)',
              shadowBlur: 5,
              shadowOffsetY: 5
            }
          },
          data: [5, 10, 15, 25, 30, 35, 40]
        },
        {
          name: '控糖走势',
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
    xueyafenbu.setOption({
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
        data: this.xueyafenbu.status,
        selectedMode: false,
        formatter: (name) => {
          var index = 0
          this.xueyafenbu.status.forEach(function (value, i) {
            if (value === name) {
              index = i
            }
          })
          return name + '  共(' + this.xueyafenbu.value[index] + '次)'
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
    xueyapingjunshuiping.setOption({
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
    xueyaandfood.setOption({
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
        width: '350',
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
        data: ['饮食(卡路里)', '收缩压', '舒张压']
      },
      xAxis: { // 直角坐标系grid的x轴
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: { // 直角坐标系grid的y轴
        type: 'value',
        // axisLine: {onZero: false},
        axisLabel: {
          formatter: '{value}'
        },
        boundaryGap: false,
        data: ['0', '120', '140', '180']
      },
      series: [
        {
          name: '饮食(卡路里)',
          type: 'line',
          lineStyle: {
            normal: {
              width: 3,
              shadowColor: 'rgba(0,0,0,0.4)',
              shadowBlur: 5,
              shadowOffsetY: 5
            }
          },
          data: [95, 110, 115, 125, 130, 135, 140]
        },
        {
          name: '收缩压',
          type: 'line',
          lineStyle: {
            normal: {
              width: 3,
              shadowColor: 'rgba(0,0,0,0.4)',
              shadowBlur: 5,
              shadowOffsetY: 5
            }
          },
          data: [91, 132, 145, 115, 115, 118, 119]
        },
        {
          name: '舒张压',
          type: 'line',
          lineStyle: {
            normal: {
              width: 3,
              shadowColor: 'rgba(0,0,0,0.4)',
              shadowBlur: 5,
              shadowOffsetY: 5
            }
          },
          data: [111, 232, 145, 151, 115, 181, 119]
        }
      ]
    })
    xueyaandsport.setOption({
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
        width: '350',
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
        data: ['运动(卡路里)', '收缩压', '舒张压']
      },
      xAxis: { // 直角坐标系grid的x轴
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: { // 直角坐标系grid的y轴
        type: 'value',
        // axisLine: {onZero: false},
        axisLabel: {
          formatter: '{value}'
        },
        boundaryGap: false,
        data: ['0', '120', '140', '180']
      },
      series: [
        {
          name: '运动(卡路里)',
          type: 'line',
          lineStyle: {
            normal: {
              width: 3,
              shadowColor: 'rgba(0,0,0,0.4)',
              shadowBlur: 5,
              shadowOffsetY: 5
            }
          },
          data: [95, 110, 115, 125, 130, 135, 140]
        },
        {
          name: '收缩压',
          type: 'line',
          lineStyle: {
            normal: {
              width: 3,
              shadowColor: 'rgba(0,0,0,0.4)',
              shadowBlur: 5,
              shadowOffsetY: 5
            }
          },
          data: [91, 132, 145, 115, 115, 118, 119]
        },
        {
          name: '舒张压',
          type: 'line',
          lineStyle: {
            normal: {
              width: 3,
              shadowColor: 'rgba(0,0,0,0.4)',
              shadowBlur: 5,
              shadowOffsetY: 5
            }
          },
          data: [111, 232, 145, 151, 115, 181, 119]
        }
      ]
    })
  }
}
</script>

<style scoped>
  p{
    margin: 0;
    padding: 0;
  }
</style>
