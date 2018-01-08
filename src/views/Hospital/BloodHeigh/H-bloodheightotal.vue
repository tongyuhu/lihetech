<template>
    <div class='tatalsick'>
      <el-row>
          <el-col>
              <el-card :body-style="{ padding: '0px' }" class='header'>
                  <span slot='header' class='header'>
                      <p>
                          高血压（{{ bloodheightotal }}人）
                      </p>
                  </span>
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
export default {
  name: 'H-bloodheighttotal',
  data () {
    return {
      bloodheightotal: '1236',
      HBfenbu: {
        'status': ['正常', '偏高', '高', '危险'],
        'value': [123, 55, 554, 454]
      }
    }
  },
  mounted () {
    var HBfenbu = echarts.init(document.getElementById('HBfenbu'))
    var HBzoushi = echarts.init(document.getElementById('HBzoushi'))

    HBfenbu.setOption({
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
        data: this.HBfenbu.status,
        selectedMode: false,
        formatter: (name) => {
          var index = 0
          this.HBfenbu.status.forEach(function (value, i) {
            if (value === name) {
              index = i
            }
          })
          return name + '  共(' + this.HBfenbu.value[index] + '次)'
        }

      },
      series: [
        {
          name: '高血压',
          type: 'pie',
          radius: '70%',
          center: ['60%', '50%'],
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
    HBzoushi.setOption({
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
        left: 'center',
        right: 'center',
        bottom: '3%',
        width: '400',
        height: '220',
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
        // top: 'center',
        data: ['控压走势']
        // selectedMode: false
      },
      xAxis: { // 直角坐标系grid的x轴
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: { // 直角坐标系grid的y轴
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
          data: [1, 11, 15, 13, 12, 13, 10]
        }
      ]
    })
  }
}
</script>
<style >
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
}
.tatalsick {
  margin-top: 20px;
}
</style>
