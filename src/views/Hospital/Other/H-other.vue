<template>
    <div class='other'>
      <el-row>
          <el-col>
              <el-card :body-style="{ padding: '0px' }" class='header'>
                  <span slot='header' class='header'>
                      <p>
                        共{{ otherTotal }}名
                      </p>
                  </span>
                  <el-row>
                      <el-col :span='12' >
                        <el-card>
                            <span slot='header'>
                                <p>
                                    整体分布
                                </p>
                            </span>
                            <div id='HBfenbu'  :style="{width:'450px',height:'250px'}">
                              
                            </div>
                            <div class="total-rbtn">
                              <!-- <el-button size="medium" icon="el-icon-arrow-right" type="text"></el-button> -->
                              <button class="total-btn">
                                <i class="el-icon-arrow-right"></i>
                              </button>
                            </div>
                        </el-card>
                      </el-col>
                      <el-col :span='12'>
                        <el-card>
                            <span slot='header'>
                                <p>
                                    患者走势
                                </p>
                            </span>
                            <div id='HBhanzhezoushi' :style="{width:'360px',height:'250px'}"></div>
                            <div class="total-rbtn">
                              <!-- <el-button size="medium" icon="el-icon-arrow-right" type="text"></el-button> -->
                              <button class="total-btn">
                                <i class="el-icon-arrow-right"></i>
                              </button>
                            </div>
                        </el-card>
                      </el-col>
                  </el-row>
              </el-card>
          </el-col>
      </el-row> 
      <div>
        <HOthertype></HOthertype>
      </div>
    </div>
</template>

<script>
import echarts from 'echarts'
import HOthertype from './H-othertype.vue'
export default {
  name: 'H-bloodheighttotal',
  components: {
    HOthertype
  },
  data () {
    return {
      otherTotal: 1236,
      HBfenbu: {
        'status': ['正常', '偏高', '高', '危险'],
        'value': [123, 55, 554, 454]
      }
    }
  },
  mounted () {
    var HBfenbu = echarts.init(document.getElementById('HBfenbu'))
    var HBhanzhezoushi = echarts.init(document.getElementById('HBhanzhezoushi'))

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
        selectedMode: false
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
    HBhanzhezoushi.setOption({
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
        height: '180',
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
        right: 'right',
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
  .other {
    margin-top: 20px;
    margin-right:30px;
    /* position: relative; */
  }
  .total-btn{
    background-color: #ffffff;
    border: none;
    pandding: 0;
    margin: 0;
    cursor: pointer;
  }
  .total-rbtn{
    float: right;
    margin-top: -30px;
    margin-right: -20px;
    z-index: 99;
  }
  .total-btn:focus{
    border: none;
  }
  .total-rbtn i{
    font-size: 30px;
  }
  .total-rbtn i :focus{
    font-size: 30px;
    border:none;
  }
  .total-rbtn :focus{
    border: none;
  }
  /* .total-rbtn el-button--text{
    font-size: 28px;
  } */
</style>
