<template>
  <div>
    <!-- 动态血压分析报告 -->
    <el-card>
      <div slot="header">
        <span>动态血压分析报告</span>
      </div>

      <el-table
      style="width: 100%"
      :data="bloodtableData"
      :span-method="arraySpanMethod">
        <el-table-column label="正餐后"
        width="65"
        prop="afterfood">
        </el-table-column>

        <el-table-column
        label="白天清醒时段 06:20  - 23:00"
        align="center">
          <el-table-column
          label="收缩压 (mmHg)"
          prop="Bshousuo"
          align="center">
          </el-table-column>
          <el-table-column
          label="舒张压(mmHg)"
          prop="Bshuzhang"
          align="center">
          </el-table-column>
          <el-table-column
          label="脉搏次数(次/分)"
          prop="Bmaibo"
          align="center">
          </el-table-column>
        </el-table-column>

        <el-table-column
        label="夜间睡眠时段 23:00  - 06:20  "
        align="center">
          <el-table-column
          label="收缩压 (mmHg)"
          prop="Yshousuo"
          align="center">
          </el-table-column>
          <el-table-column
          label="舒张压(mmHg)"
          prop="Yshuzhang"
          align="center">
          </el-table-column>
          <el-table-column
          label="脉搏次数(次/分)"
          prop="Ymaibo"
          align="center">
          </el-table-column>
        </el-table-column>

        <el-table-column
        label="起床后清醒时段 06:20  - 08:20    "
        align="center">
          <el-table-column
          label="收缩压 (mmHg)"
          prop="Qshousuo"
          align="center">
          </el-table-column>
          <el-table-column
          label="舒张压(mmHg)"
          prop="Qshuzhang"
          align="center">
          </el-table-column>
          <el-table-column
          label="脉搏次数(次/分)"
          prop="Qmaibo"
          align="center">
          </el-table-column>
        </el-table-column>

        <el-table-column
        label="24小时"
        align="center">
          <el-table-column
          label="收缩压 (mmHg)"
          prop="Dshousuo"
          align="center">
          </el-table-column>
          <el-table-column
          label="舒张压(mmHg)"
          prop="Dshuzhang"
          align="center">
          </el-table-column>
          <el-table-column
          label="脉搏次数(次/分)"
          prop="Dmaibo"
          align="center">
          </el-table-column>
        </el-table-column>

        


      
      </el-table>

      <el-row>
        <el-col :xs="24" :lg="12">
          <p>血压分布</p>
          <div id='Xueyafenbu' :style="{width:'450px',height:'250px'}"></div>
        </el-col>
        <el-col :xs="24" :lg="12">
          <p>平均血压统计</p>
          <el-table
          style="width: 100%"
          :data="averageData"
          border>
            <el-table-column label="" prop="whentime"></el-table-column>
            <el-table-column label="收缩压/舒张压 均值" prop="average"></el-table-column>
            <el-table-column label="正常度" prop="normal"></el-table-column>
            <el-table-column label="正常参考值" prop="normalline"></el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <el-card>
        <el-row>
          <el-col :span="4">
            <h3>报告医生评估</h3>
          </el-col>
          <el-col :span="20">
            <p>降压治疗后，24小时、白天清醒时段、
              夜间睡眠时段扔表现为高血压。建议筛查引起血压升高的原因，
              加强降压药物治疗。建议可考虑在苯磺酸氨地平基础上，
              加上ACEI/ARB类药物，一天一次，早晨口服。
            </p>
          </el-col>
        </el-row>
      </el-card>

    </el-card>
    <!-- 动态血压分析报告 end-->
    <!-- 原始测量值 -->
    <div class="flex-center">
      <div>
        <h3>原始测量值</h3>
      </div>
      <div class="selecttime">
        <el-dropdown trigger="click">
          <el-button type="text" icon="el-icon-arrow-down el-icon--right">
            2017-8
            <!-- <h3>2017-8</h3> -->
          </el-button>
          
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>2017-9</el-dropdown-item>
            <el-dropdown-item>2017-5</el-dropdown-item>
            <el-dropdown-item>2017-7</el-dropdown-item>
            <el-dropdown-item>2017-1</el-dropdown-item>
            <el-dropdown-item>2017-6</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-table
    :data="oldmeterData"
    border>
      <el-table-column label="日期" prop="whenday"></el-table-column>
      <el-table-column label="血压值" prop="bloodnum"></el-table-column>
      <el-table-column label="血压类型" prop="bloodtype"></el-table-column>
      <el-table-column label="测量类型" prop="testtype"></el-table-column>
      <el-table-column label="测量时间" prop="testtime"></el-table-column>
    </el-table>
    <!-- 原始测量值 end -->
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'bloodtable',
  data () {
    return {
      bloodtableData: [
        {
          afterfood: '均值',
          Bshousuo: 143,
          Bshuzhang: 89,
          Bmaibo: 85,
          Yshousuo: 143,
          Yshuzhang: 89,
          Ymaibo: 85,
          Qshousuo: 143,
          Qshuzhang: 89,
          Qmaibo: 85,
          Dshousuo: 143,
          Dshuzhang: 89,
          Dmaibo: 85
        },
        {
          afterfood: '均值',
          Bshousuo: 143,
          Bshuzhang: 89,
          Bmaibo: 85,
          Yshousuo: 143,
          Yshuzhang: 89,
          Ymaibo: 85,
          Qshousuo: 143,
          Qshuzhang: 89,
          Qmaibo: 85,
          Dshousuo: 143,
          Dshuzhang: 89,
          Dmaibo: 85
        },
        {
          afterfood: '标准差',
          Bshousuo: 143,
          Bshuzhang: 89,
          Bmaibo: 85,
          Yshousuo: 143,
          Yshuzhang: 89,
          Ymaibo: 85,
          Qshousuo: 143,
          Qshuzhang: 89,
          Qmaibo: 85,
          Dshousuo: 143,
          Dshuzhang: 89,
          Dmaibo: 85
        },
        {
          afterfood: '最大值',
          Bshousuo: 143,
          Bshuzhang: 89,
          Bmaibo: 85,
          Yshousuo: 143,
          Yshuzhang: 89,
          Ymaibo: 85,
          Qshousuo: 143,
          Qshuzhang: 89,
          Qmaibo: 85,
          Dshousuo: 143,
          Dshuzhang: 89,
          Dmaibo: 85
        },
        {
          afterfood: '中位数',
          Bshousuo: 143,
          Bshuzhang: 89,
          Bmaibo: 85,
          Yshousuo: 143,
          Yshuzhang: 89,
          Ymaibo: 85,
          Qshousuo: 143,
          Qshuzhang: 89,
          Qmaibo: 85,
          Dshousuo: 143,
          Dshuzhang: 89,
          Dmaibo: 85
        },
        {
          afterfood: '最小值',
          Bshousuo: 143,
          Bshuzhang: 89,
          Bmaibo: 85,
          Yshousuo: 143,
          Yshuzhang: 89,
          Ymaibo: 85,
          Qshousuo: 143,
          Qshuzhang: 89,
          Qmaibo: 85,
          Dshousuo: 143,
          Dshuzhang: 89,
          Dmaibo: 85
        },
        {
          afterfood: '血压负荷',
          Bshousuo: 143,
          Bshuzhang: 89,
          Bmaibo: 85,
          Yshousuo: 143,
          Yshuzhang: 89,
          Ymaibo: 85,
          Qshousuo: 143,
          Qshuzhang: 89,
          Qmaibo: 85,
          Dshousuo: 143,
          Dshuzhang: 89,
          Dmaibo: 85
        },
        {
          afterfood: '夜间血压下降率',
          Bshousuo: 143,
          Bshuzhang: 89,
          Bmaibo: 85,
          Yshousuo: 143,
          Yshuzhang: 89,
          Ymaibo: 85,
          Qshousuo: 143,
          Qshuzhang: 89,
          Qmaibo: 85,
          Dshousuo: 143,
          Dshuzhang: 89,
          Dmaibo: 85
        },
        {
          afterfood: '血压晨峰',
          Bshousuo: 143,
          Bshuzhang: 89,
          Bmaibo: 85,
          Yshousuo: 143,
          Yshuzhang: 89,
          Ymaibo: 85,
          Qshousuo: 143,
          Qshuzhang: 89,
          Qmaibo: 85,
          Dshousuo: 143,
          Dshuzhang: 89,
          Dmaibo: 85
        },
        {
          afterfood: '变异系数',
          Bshousuo: 143,
          Bshuzhang: 89,
          Bmaibo: 85,
          Yshousuo: 143,
          Yshuzhang: 89,
          Ymaibo: 85,
          Qshousuo: 143,
          Qshuzhang: 89,
          Qmaibo: 85,
          Dshousuo: 143,
          Dshuzhang: 89,
          Dmaibo: 85
        },
        {
          afterfood: '变异系数',
          Bshousuo: 1,
          Bshuzhang: 2,
          Bmaibo: 3
        },
        {
          afterfood: '盐敏感可能性',
          Bshousuo: '盐敏感可能性“中度”'
        }
      ],
      averageData: [
        {
          whentime: '24小时',
          average: '139/86',
          normal: '偏高',
          normalline: '<130/80'
        },
        {
          whentime: '白天',
          average: '139/86',
          normal: '偏高',
          normalline: '<130/80'
        },
        {
          whentime: '夜间',
          average: '139/86',
          normal: '偏高',
          normalline: '<130/80'
        },
        {
          whentime: '清晨',
          average: '139/86',
          normal: '偏高',
          normalline: '<130/80'
        }
      ],
      oldmeterData: [
        {
          whenday: '2017/12/03',
          bloodnum: '119/90',
          bloodtype: '正常',
          testtype: '运动后',
          testtime: '14:28:10'
        },
        {
          whenday: '2017/12/03',
          bloodnum: '119/90',
          bloodtype: '正常',
          testtype: '运动后',
          testtime: '14:28:10'
        },
        {
          whenday: '2017/12/03',
          bloodnum: '119/90',
          bloodtype: '正常',
          testtype: '运动后',
          testtime: '14:28:10'
        },
        {
          whenday: '2017/12/03',
          bloodnum: '119/90',
          bloodtype: '正常',
          testtype: '运动后',
          testtime: '14:28:10'
        },
        {
          whenday: '2017/12/03',
          bloodnum: '119/90',
          bloodtype: '正常',
          testtype: '运动后',
          testtime: '14:28:10'
        }
      ]
    }
  },
  methods: {
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 10) {
        if (columnIndex === 1) {
          return [1, 3]
        }
        if (columnIndex === 2) {
          return [1, 6]
        }
        if (columnIndex === 3) {
          return [1, 3]
        } else if (columnIndex === 1) {
          return [0, 0]
        }
      }
      if (rowIndex === 11) {
        if (columnIndex === 1) {
          return [1, 12]
        }
      }
    }
  },
  mounted () {
    var Xueyafenbu = echarts.init(document.getElementById('Xueyafenbu'))
    Xueyafenbu.setOption({
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

<style scoped>
  .flex-center{
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .selecttime{
    margin-left: 80px
  }
</style>
