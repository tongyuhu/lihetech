<template>
  <div>
    <el-card :body-style="{ padding: '0px' }">
        <div class="card-header">
          <p class="title">原始数据</p>
        </div>
        <div class="original">
          <div>
            <el-date-picker
              v-model="month"
              type="month"
              :clearable='false'
              size="mini"
              :style="{width:'120px'}"
              placeholder="选择月">
            </el-date-picker>
          </div>
          <div class="original-table">
            <table>
              <tr>
                <th>日期</th>
                <th>血压值</th>
                <th>血压类型</th>
                <th>测量类型</th>
                <th>测量时间</th>
              </tr>
              <tr>
                <th>2017-11-23</th>
                <td><p>139/86</p></td>
                <td><p>正常</p></td>
                <td><p>运动后</p></td>
                <td><p>14:28:10</p></td>
              </tr>
            </table>
          </div>
        </div>
    </el-card>
  </div>
</template>

<script>
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
      month: ''
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
  .original{
    margin:20px;
  }
  p{
    color:#666;
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
  .original-table{
    margin-top:20px;
  }
</style>
