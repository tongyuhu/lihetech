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
          <tr>
            <th>均值</th>
            <td>112</td>
            <td>113</td>
            <td>114</td>
            <td>115</td>
            <td>116</td>
            <td>117</td>
            <td>118</td>
            <td>91</td>
            <td>1110</td>
            <td>111</td>
            <td>112</td>
            <td>60</td>
          </tr>
          <tr>
            <th>盐敏感可能性</th>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
            <td>8</td>
            <td>9</td>
            <td>10</td>
            <td>11</td>
            <td>12</td>
            <td>12</td>
          </tr>
          <tr>
            <th>动脉硬化指数</th>
            <td colspan="3">白天清醒时段 06:20  - 23:00</td>
            <td colspan="3">夜间睡眠时段 23:00  - 06:20  </td>
            <td colspan="3">起床后清醒时段 06:20  - 08:20 </td>
            <td colspan="3">24小时</td>
          </tr>
          <tr>
            <th>盐敏感可能性</th>
            <td colspan="12">盐敏感可能性中度</td>
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
            <td>139/86</td>
            <td>139/86</td>
            <td>139/86</td>
          </tr>
        </table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 10) {
        if (columnIndex === 1) {
          return [1, 3]
        }
        if (columnIndex === 2) {
          return [1, 3]
        }
        if (columnIndex === 3) {
          return [1, 3]
        } if (columnIndex === 4) {
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
  .table-box{
      margin:20px;
    /* padding:20px;
    overflow:hidden; */
    /* width: 100%； */
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
    color:#666;
    font-size:14px;
  }
</style>
