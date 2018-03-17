<template>
  <div>
    <el-card :body-style="{ padding: '0px' }">
      <div class="card-header">
        <p class="title">用药</p>
      </div>
      <!-- 图例 -->
      <div class="chart-head">
        <span class="text-center">
          <img src="./../../../诊所-高血压/hospitalIcon/诊所-icon-34.png" alt="">
          <span>利尿剂</span> 
        </span>
        <span class="text-center">
          <img src="./../../../诊所-高血压/hospitalIcon/诊所-icon-35.png" alt="">
          <span>利尿剂</span> 
        </span>
        <span class="text-center">
          <img src="./../../../诊所-高血压/hospitalIcon/诊所-icon-36.png" alt="">
          <span>利尿剂</span> 
        </span>
        <span class="text-center">
          <img src="./../../../诊所-高血压/hospitalIcon/诊所-icon-37.png" alt="">
          <span>利尿剂</span> 
        </span>
        <span class="text-center">
          <img src="./../../../诊所-高血压/hospitalIcon/诊所-icon-38.png" alt="">
          <span>利尿剂</span> 
        </span>
      </div>
      <!-- 图表 -->
      <div class="chart">
        <div id='useDrug'  :style="{width:'1000px',height:'680px'}"></div>
      </div>
      <table>
       
      </table>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
import LI from './../../../诊所-高血压/hospitalIcon/诊所-icon-34.png'
import B from './../../../诊所-高血压/hospitalIcon/诊所-icon-35.png'
import CCB from './../../../诊所-高血压/hospitalIcon/诊所-icon-36.png'
import ACEI from './../../../诊所-高血压/hospitalIcon/诊所-icon-37.png'
import ARB from './../../../诊所-高血压/hospitalIcon/诊所-icon-38.png'
export default {
  data () {
    return {

    }
  },
  methods: {
    useDrugOption () {
      var hours = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']

      var days = ['2017/12/06', '2017/12/07', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06', '2017/12/08', '2017/12/09', '2017/12/10', '2017/12/11', '2017/12/06']
      var Icons = {
        'li': LI,
        'b': B,
        'ccb': CCB,
        'acei': ACEI,
        'arb': ARB
      }

      let option = {
        title: {
          text: ''
        },
        legend: {
          data: ['Punch Card'],
          left: 'center',
          selectedMode: false
        },
        tooltip: {
        // 提示框组件
        },
        grid: {
          left: '2%',
          bottom: '8%',
          right: '10%',
          top: 0,
          containLabel: true
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            start: 0,
            end: 8,
            // handleSize:50,
            minValueSpan: 6,
            maxValueSpan: 6
          }
        ],
        xAxis: {
          type: 'category',
          data: days,
          boundaryGap: true,
          // padding: 2,
          splitLine: {
            // x轴网格线
            show: false,
            lineStyle: {
              color: '#999',
              type: 'solid'
            }
          },
          axisTick: {
            // 坐标轴刻度
            show: false,
            alignWithLabel: true
          },
          axisLabel: {
            width: 500
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#999',
              width: 1
            }
          }
        },
        yAxis: {
        // type: 'category',
          boundaryGap: true,
          data: hours,
          splitLine: {
            show: true
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            margin: 8,
            verticalAlign: 'top'
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#999',
              width: 1
            }
          }
        },
        series: [{
        // name: 'Punch Card',
          type: 'scatter',
          symbolSize: 1,
          label: {
            normal: {
              show: true,
              color: '#000',
              fontSize: 10,
              align: 'center',
              rich: {
                bBg: {
                  backgroundColor: '#f4e07a',
                  color: '#fff',
                  fontSize: 10,
                  align: 'center',
                  fontWeight: 'bold'
                  // fontWeight: 'blod'
                },
                liBg: {
                  backgroundColor: '#81cefc',
                  color: '#fff',
                  fontSize: 10,
                  align: 'center',
                  fontWeight: 'bold'
                  // fontWeight: 'blod'
                },
                ccbBg: {
                  backgroundColor: '#7cedc4',
                  color: '#fff',
                  fontSize: 10,
                  align: 'center',
                  fontWeight: 'bold'
                  // fontWeight: 'blod'
                },
                aceiBg: {
                  backgroundColor: '#9c9ce2',
                  color: '#fff',
                  fontSize: 10,
                  align: 'center',
                  fontWeight: 'bold'
                  // fontWeight: 'blod'
                },
                arbBg: {
                  backgroundColor: '#ff8f8f',
                  color: '#fff',
                  fontSize: 10,
                  align: 'center',
                  fontWeight: 'bold'
                  // fontWeight: 'blod'
                },

                tc: {
                  align: 'center',
                  color: '#eee'
                },
                hr: {
                  // borderColor: '#777',
                  width: '100%',
                  // borderWidth: 0.5,
                  height: 0
                },
                li: {
                  height: 15,
                  align: 'center',
                  backgroundColor: {
                    image: Icons.li
                  }
                },
                b: {
                  height: 15,
                  align: 'center',
                  backgroundColor: {
                    image: Icons.b
                  }
                },
                ccb: {
                  height: 15,
                  align: 'center',
                  backgroundColor: {
                    image: Icons.ccb
                  }
                },
                acei: {
                  height: 15,
                  align: 'center',
                  backgroundColor: {
                    image: Icons.acei
                  }
                },
                arb: {
                  height: 15,
                  align: 'center',
                  backgroundColor: {
                    image: Icons.arb
                  }
                }
              }
            }
          },
          data: [
            {
              value: [1, 0, '[120/120][120/120]'],
              label: {
                normal: {
                  formatter: [
                    '{bBg|[120/120]}{li|}{b|}{liBg|[120/120]}'
                    // '{blackBg|[120/120]}',
                    // '{hr|}',
                    // '{li|} {b|}',
                    // '{hr|}',
                    // '[120/120]'
                  ].join('\n'),
                  rich: {

                  }
                }
              }
            },
            {
              value: [3, 2, '[120/120][120/120]'],
              label: {
                normal: {
                  formatter: [
                    // '{ccbBg|[120/120]}{ccb|}{arb|}{arbBg|[120/120]}'
                    '{ccbBg|[120/120]}',
                    '{hr|}',
                    '{ccb|} {arb|}',
                    '{hr|}',
                    '{arbBg|[120/120]}'
                  ].join('\n'),
                  rich: {

                  }
                }
              }
            }
          ]
        }]
      }
      return option
    }
  },
  mounted () {
    let useDrug = echarts.init(document.getElementById('useDrug'))
    useDrug.setOption(this.useDrugOption())
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
  .chart img{
    height: 14px;
  }
  .text-center span{
    display: inline-block;
    height: 35px;
    text-align: center;
    vertical-align: middle;
    line-height: 35px;
    
  }
  .text-center img{
    height: 18px;
    width: 18px;
    vertical-align: middle;
  }
  .chart-head{
    margin-left: 80px;
    margin-top:12px;
    margin-bottom: 10px;
  }
  .chart-head span{
    display: inline-block;
    margin-right: 10px;
  }


</style>
