<template>
  <div>
    <el-card :body-style="{ padding: '0px' }">
      <div class="card-header">
        <p class="title">ABPM统计表 动态分析报告</p>
      </div>
      <div class="table-box">
        <table>
          <tr>
            <th rowspan="2"></th>
            <th colspan="3">白天清醒时段 06:20  - 23:00</th>
            <th colspan="3">夜间睡眠时段 23:00  - 06:20  </th>
            <th colspan="3">起床后清醒时段 06:20  - 08:20 </th>
            <th colspan="3">24小时</th>
          </tr>
          <tr>
            <th>
              <p>收缩压</p>
              <p>(mmHg)</p>
            </th>
            <th>
              <p>舒张压</p>
              <p>(mmHg)</p>
            </th>
            <th>
              <p>脉搏次数</p>
              <p>(次/分)</p>
            </th>
            <th>
              <p>收缩压</p>
              <p>(mmHg)</p>
            </th>
            <th>
              <p>舒张压</p>
              <p>(mmHg)</p>
            </th>
            <th>
              <p>脉搏次数</p>
              <p>(次/分)</p>
            </th>
            <th>
              <p>收缩压</p>
              <p>(mmHg)</p>
            </th>
            <th>
              <p>舒张压</p>
              <p>(mmHg)</p>
            </th>
            <th>
              <p>脉搏次数</p>
              <p>(次/分)</p>
            </th>
            <th>
              <p>收缩压</p>
              <p>(mmHg)</p>
            </th>
            <th>
              <p>舒张压</p>
              <p>(mmHg)</p>
            </th>
            <th>
              <p>脉搏次数</p>
              <p>(次/分)</p>
            </th>


          </tr>
          <!--均值 -->
          <tr>
            <th>均值</th>
            <td>{{ABPM.day.avgSystolic}}</td>
            <td>{{ABPM.day.avgDiastolic }}</td>
            <td>{{ABPM.day.avgPulse}}</td>
            <td>{{ABPM.night.avgSystolic }}</td>
            <td>{{ABPM.night.avgDiastolic}}</td>
            <td>{{ABPM.night.avgPulse}}</td>
            <td>{{ABPM.moring.avgSystolic }}</td>
            <td>{{ABPM.moring.avgDiastolic}}</td>
            <td>{{ABPM.moring.avgPulse}}</td>
            <td>{{ABPM.oneday.avgSystolic }}</td>
            <td>{{ABPM.oneday.avgDiastolic}}</td>
            <td>{{ABPM.oneday.avgPulse}}</td>
          </tr>
          <!-- 标准差 -->
          <tr>
            <th>标准差</th>
            <td>{{ABPM.day.stdSystolic}}</td>
            <td>{{ABPM.day.stdDiastolic}}</td>
            <td>{{ABPM.day.stdPulse}}</td>
            <td>{{ABPM.night.stdSystolic}}</td>
            <td>{{ABPM.night.stdDiastolic}}</td>
            <td>{{ABPM.night.stdPulse}}</td>
            <td>{{ABPM.moring.stdSystolic}}</td>
            <td>{{ABPM.moring.stdDiastolic}}</td>
            <td>{{ABPM.moring.stdPulse}}</td>
            <td>{{ABPM.oneday.stdSystolic}}</td>
            <td>{{ABPM.oneday.stdDiastolic}}</td>
            <td>{{ABPM.oneday.stdPulse}}</td>
          </tr>
          <!-- 最大值 -->
          <tr>
            <th>最大值</th>
            <td>{{ABPM.day.maxSystolic}}</td>
            <td>{{ABPM.day.maxDiastolic}}</td>
            <td>{{ABPM.day.maxPulse}}</td>
            <td>{{ABPM.night.maxSystolic}}</td>
            <td>{{ABPM.night.maxDiastolic}}</td>
            <td>{{ABPM.night.maxPulse}}</td>
            <td>{{ABPM.moring.maxSystolic}}</td>
            <td>{{ABPM.moring.maxDiastolic}}</td>
            <td>{{ABPM.moring.maxPulse}}</td>
            <td>{{ABPM.oneday.maxSystolic}}</td>
            <td>{{ABPM.oneday.maxDiastolic}}</td>
            <td>{{ABPM.oneday.maxPulse}}</td>
          </tr>
          <!-- 中位数 -->
          <tr>
            <th>中位数</th>
            <td>{{ABPM.day.medianNumSystolic}}</td>
            <td>{{ABPM.day.medianNumDiastolic}}</td>
            <td>{{ABPM.day.medianNumPulse}}</td>
            <td>{{ABPM.night.maxPulse}}</td>
            <td>{{ABPM.night.medianNumSystolic}}</td>
            <td>{{ABPM.night.medianNumDiastolic}}</td>
            <td>{{ABPM.moring.medianNumPulse}}</td>
            <td>{{ABPM.moring.maxPulse}}</td>
            <td>{{ABPM.moring.medianNumSystolic}}</td>
            <td>{{ABPM.oneday.medianNumDiastolic}}</td>
            <td>{{ABPM.oneday.medianNumPulse}}</td>
            <td>{{ABPM.oneday.maxPulse}}</td>
          </tr>
          <!-- 最小值 -->
          <tr>
            <th>最小值</th>
            <td>{{ABPM.day.minSystolic}}</td>
            <td>{{ABPM.day.minDiastolic}}</td>
            <td>{{ABPM.day.minPulse}}</td>
            <td>{{ABPM.night.minSystolic}}</td>
            <td>{{ABPM.night.minDiastolic}}</td>
            <td>{{ABPM.night.minPulse}}</td>
            <td>{{ABPM.moring.minSystolic}}</td>
            <td>{{ABPM.moring.minDiastolic}}</td>
            <td>{{ABPM.moring.minPulse}}</td>
            <td>{{ABPM.oneday.minSystolic}}</td>
            <td>{{ABPM.oneday.minDiastolic}}</td>
            <td>{{ABPM.oneday.minPulse}}</td>
          </tr>
          <!-- 血压负荷 -->
          <tr>
            <th>血压负荷</th>
            <td>{{ABPM.day.loadBloodPress}}</td>
            <td></td>
            <td></td>
            <td>{{ABPM.night.loadBloodPress}}</td>
            <td></td>
            <td></td>
            <td>{{ABPM.moring.loadBloodPress}}</td>
            <td></td>
            <td></td>
            <td>{{ABPM.oneday.loadBloodPress}}</td>
            <td></td>
            <td></td>
          </tr>
          <!-- 夜间血压下降率 -->
          <tr>
            <th>夜间血压下降率</th>
            <td>{{ABPM.day.nightLowRatioSystolic}}</td>
            <td>{{ABPM.day.nightLowRatioDiastolic}}</td>
            <td></td>
            <td>{{ABPM.night.nightLowRatioSystolic}}</td>
            <td>{{ABPM.night.nightLowRatioDiastolic}}</td>
            <td></td>
            <td>{{ABPM.moring.nightLowRatioSystolic}}</td>
            <td>{{ABPM.moring.nightLowRatioDiastolic}}</td>
            <td></td>
            <td>{{ABPM.oneday.nightLowRatioSystolic}}</td>
            <td>{{ABPM.oneday.nightLowRatioDiastolic}}</td>
            <td></td>
          </tr>
          <!-- 血压晨峰 -->
          <tr>
            <th>血压晨峰</th>
            <td>{{ABPM.day.moringTopSystolic}}</td>
            <td>{{ABPM.day.moringTopDiastolic}}</td>
            <td></td>
            <td>{{ABPM.night.moringTopSystolic}}</td>
            <td>{{ABPM.night.moringTopDiastolic}}</td>
            <td></td>
            <td>{{ABPM.moring.moringTopSystolic}}</td>
            <td>{{ABPM.moring.moringTopDiastolic}}</td>
            <td></td>
            <td>{{ABPM.oneday.moringTopSystolic}}</td>
            <td>{{ABPM.oneday.moringTopDiastolic}}</td>
            <td></td>
          </tr>
          <!-- 变异系数 -->
          <tr>
            <th>变异系数</th>
            <td>{{ABPM.day.sickRadioSystolic?ABPM.day.sickRadioSystolic.toFixed(2):''}}</td>
            <td>{{ABPM.day.sickRadioDiastolic?ABPM.day.sickRadioDiastolic.toFixed(2):''}}</td>
            <td></td>
            <td>{{ABPM.night.sickRadioSystolic?ABPM.night.sickRadioSystolic.toFixed(2):''}}</td>
            <td>{{ABPM.night.sickRadioDiastolic?ABPM.night.sickRadioDiastolic.toFixed(2):''}}</td>
            <td></td>
            <td>{{ABPM.moring.sickRadioSystolic?ABPM.moring.sickRadioSystolic.toFixed(2):''}}</td>
            <td>{{ABPM.moring.sickRadioDiastolic?ABPM.moring.sickRadioDiastolic.toFixed(2):""}}</td>
            <td></td>
            <td>{{ABPM.oneday.sickRadioSystolic?ABPM.oneday.sickRadioSystolic.toFixed(2):''}}</td>
            <td>{{ABPM.oneday.sickRadioDiastolic?ABPM.oneday.sickRadioDiastolic.toFixed(2):""}}</td>
            <td></td>
          </tr>
          <!-- 动脉硬化指数 -->
          <tr>
            <th>动脉硬化指数</th>
            <td colspan="3">{{ABPM.day.hardRatio}}</td>
            <td colspan="3">{{ABPM.night.hardRatio}}</td>
            <td colspan="3">{{ABPM.moring.hardRatio}}</td>
            <td colspan="3">{{ABPM.oneday.hardRatio}}</td>
          </tr>
          <!-- 盐敏感可能性 -->
          <tr>
            <th>盐敏感可能性</th>
            <td colspan="12">{{salt}}</td>
          </tr>
        </table>
      </div>
      <div class="table-box">
        <table>
          <tr>
            <th></th>
            <th>收缩压/舒张压 均值</th>
            <th>正常度</th>
            <th>正常 参考值</th>
          </tr>
          <tr>
            <th>24小时</th>
            <td>{{ABPM.oneday.avgSystolic}}/{{ABPM.oneday.avgDiastolic}}</td>
            <td>{{bptype(ABPM.oneday.bpType)}}</td>
            <td>{{ABPM.oneday.referValue}}</td>
          </tr>
          <tr>
            <th>白天</th>
            <td>{{ABPM.day.avgSystolic}}/{{ABPM.day.avgDiastolic}}</td>
            <td>{{bptype(ABPM.day.bpType)}}</td>
            <td>{{ABPM.day.referValue}}</td>
          </tr>
          <tr>
            <th>夜间</th>
            <td>{{ABPM.night.avgSystolic}}/{{ABPM.night.avgDiastolic}}</td>
            <td>{{bptype(ABPM.night.bpType)}}</td>
            <td>{{ABPM.night.referValue}}</td>
          </tr>
          <tr>
            <th>清晨</th>
            <td>{{ABPM.moring.avgSystolic}}/{{ABPM.moring.avgDiastolic}}</td>
            <td>{{bptype(ABPM.moring.bpType)}}</td>
            <td>{{ABPM.moring.referValue}}</td>
          </tr>
        </table>
      </div>
    </el-card>
    <div class="analysis-wrap">
      <el-card :body-style="{ padding: '0px'}">
        <div class="analysis">
          <div class="summary">
            <span class="summary-title">总的分析：</span>
            <span>{{summary}}</span>
          </div>
          <div class="risk">
            <span class="summary-title">心血管疾病评估(未来十年风险)：</span>
            <span class="risk-text">{{risk}}</span>
          </div>
        </div>
        <div></div>
      </el-card>
    </div>
  </div>
</template>

<script>
import {alldayHeighBloodApi} from '@/api/components/BloodheighSickcard/alldayheighblood'
import {daybefor} from '@/untils/date.js'
export default {
  props: {
    sickID: {
      default: 0
    },
    hospitalId: {
      default: 0
    }
  },
  data () {
    return {
      ABPM: {
        day: {
          maxDiastolic: '',
          avgSystolic: '',
          stdDiastolic: '',
          minPulse: '',
          num: '',
          stdSystolic: '',
          stdPulse: '',
          medianNumSystolic: '',
          maxSystolic: '',
          medianNumDiastolic: '',
          avg3Systolic: '',
          avgPulse: '',
          maxPulse: '',
          minDiastolic: '',
          hardRatio: '',
          medianNumPulse: '',
          avgDiastolic: '',
          minSystolic: '',
          loadBloodPress: '',
          nightLowRatioSystolic: '',
          moringTopDiastolic: '',
          sickRadioDiastolic: '',
          sickRadioSystolic: '',
          moringTopSystolic: '',
          nightLowRatioDiastolic: '',
          bptype: '',
          referValue: ''
        },
        night: {
          maxDiastolic: '',
          avgSystolic: '',
          stdDiastolic: '',
          minPulse: '',
          num: '',
          stdSystolic: '',
          stdPulse: '',
          medianNumSystolic: '',
          maxSystolic: '',
          medianNumDiastolic: '',
          avg3Systolic: '',
          avgPulse: '',
          maxPulse: '',
          minDiastolic: '',
          hardRatio: '',
          medianNumPulse: '',
          avgDiastolic: '',
          minSystolic: '',
          loadBloodPress: '',
          nightLowRatioSystolic: '',
          moringTopDiastolic: '',
          sickRadioDiastolic: '',
          sickRadioSystolic: '',
          moringTopSystolic: '',
          nightLowRatioDiastolic: '',
          bptype: '',
          referValue: ''
        },
        moring: {
          maxDiastolic: '',
          avgSystolic: '',
          stdDiastolic: '',
          minPulse: '',
          num: '',
          stdSystolic: '',
          stdPulse: '',
          medianNumSystolic: '',
          maxSystolic: '',
          medianNumDiastolic: '',
          avg3Systolic: '',
          avgPulse: '',
          maxPulse: '',
          minDiastolic: '',
          hardRatio: '',
          medianNumPulse: '',
          avgDiastolic: '',
          minSystolic: '',
          loadBloodPress: '',
          nightLowRatioSystolic: '',
          moringTopDiastolic: '',
          sickRadioDiastolic: '',
          sickRadioSystolic: '',
          moringTopSystolic: '',
          nightLowRatioDiastolic: '',
          bptype: '',
          referValue: ''
        },
        oneday: {
          maxDiastolic: '',
          avgSystolic: '',
          stdDiastolic: '',
          minPulse: '',
          num: '',
          stdSystolic: '',
          stdPulse: '',
          medianNumSystolic: '',
          maxSystolic: '',
          medianNumDiastolic: '',
          avg3Systolic: '',
          avgPulse: '',
          maxPulse: '',
          minDiastolic: '',
          hardRatio: '',
          medianNumPulse: '',
          avgDiastolic: '',
          minSystolic: '',
          loadBloodPress: '',
          nightLowRatioSystolic: '',
          moringTopDiastolic: '',
          sickRadioDiastolic: '',
          sickRadioSystolic: '',
          moringTopSystolic: '',
          nightLowRatioDiastolic: '',
          bptype: '',
          referValue: ''
        }
      },
      summary: null,
      risk: null,
      salt: ''
    }
  },
  methods: {
    bptype (val) {
      let type = ''
      val = parseInt(val)
      switch (val) {
        case 1:
          type = '正常血压'
          break
        case 2:
          type = '正常高值'
          break
        case 3:
          type = '轻度高血压'
          break
        case 4:
          type = '中度高血压'
          break
        case 5:
          type = '危险血压'
          break
        case 6:
          type = '低血压'
          break
        default:
          type = ''
          break
      }
      return type
    }
  },
  mounted () {
    let date = new Date()
    let yesterday = daybefor(date, 1, true)
    let today = daybefor(date, 0, true)
    let start = today + ' 06:20:00'
    let end = yesterday + ' 23:00:00'
    let params = {
      'userId': this.sickID,
      // 'userId': 11,
      // 'adminHospitalId': 2,
      'adminHospitalId': this.hospitalId,
      'getupTime': start,
      'sleepTime': end
    }
    // 获取24小时动态报告
    this.$axios(alldayHeighBloodApi(params))
    .then(res => {
      let data = res.data.data
      if (data.day) {
        for (let key in data.day) {
          this.$set(this.ABPM.day, key, data.day[key])
        }
      }
      if (data.night) {
        for (let key in data.night) {
          this.$set(this.ABPM.night, key, data.night[key])
        }
      }
      if (data.morning) {
        for (let key in data.morning) {
          this.$set(this.ABPM.moring, key, data.morning[key])
        }
      }
      if (data.oneday) {
        for (let key in data.oneday) {
          this.$set(this.ABPM.oneday, key, data.oneday[key])
        }
      }
      this.summary = res.data.data.summary
      // this.risk = res.data.data.ICVDRisk
      if (res.data.data.ICVDRisk === '年龄要大于35！') {
        this.risk = '年龄要大于35！'
      } else if (res.data.data.ICVDRisk === '请先完善个人档案！') {
        this.risk = '请先完善个人档案！'
      } else {
        this.risk = res.data.data.ICVDRisk + '%' || ''
      }
    })
  }
}
</script>

<style scoped>
  /* 卡片头部标题 */
  .card-header{
    margin: 0 20px 0 20px;
    border-bottom:1px solid #ebeef5;
    height: 28px;
  }
  .title{
  /* margin-left:20px; */
  margin-top:24px;
  margin-bottom:2px;
  font-size:20px;
  color:#666
  }
  /* 表格容器 上边距 */
  .table-box{
      margin:20px;
    /* padding:20px;
    overflow:hidden; */
    /* width: 100%； */
  }
  /* 表格 */
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
    color:#666;
    font-size:14px;
  }
  /* 分析容器 */
  .analysis-wrap{
    margin-top:8px;
  }
  .analysis{
    padding:20px;
  }
  /* 总分析 */
  .summary{
    line-height: 1.5;
  }
  /* 评估容器 */
  .risk{
    line-height: 1.5;
  }
  .summary-title{
    font-weight: bold;
  }
  .risk-text{
    color: #e87070;
  }
</style>
