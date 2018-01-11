<template>
  <div>
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
              <span>根据过去的3个月</span>
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

    <el-card>
      <div slot="header">
        <span>最新图表</span>
      </div>
      <div>规范图例</div>
      <div id='guifantuli' :style="{width:'750px',height:'250px'}"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'Schart',
  mounted () {
    const guifantuli = echarts.init(document.getElementById('guifantuli'))
    guifantuli.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        // data: ['直接访问', '邮件营销','联盟广告','视频广告']
      },
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
</style>
