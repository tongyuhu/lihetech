<template>
  <div>
    <div class="table-top clear">
      <span class="table-top-span">今日笔记</span>
      <span>2017年4月12日 星期四</span>
      <span class="check-date">
      
      <el-date-picker
        v-model="noteDate"
        type="date"
        placeholder="选择日期"
        size="mini"
        :style="{'width':'150px'}">
      </el-date-picker>
      </span>
    </div>
    <div class="table">
      <table>
        <tr>
          <th>笔记种类</th>
          <th>医生建议</th>
          <th>实际</th>
          <th>评分</th>
        </tr>
        <tr>
          <th>饮食</th>
          <td>
            <p>早餐：蔬菜 水果 524千卡</p>
            <p>早餐：蔬菜 水果 524千卡</p>
            <p>早餐：蔬菜 水果 524千卡</p>
          </td>
          <td>
            <p>早餐：蔬菜 水果 524千卡</p>
            <p>早餐：蔬菜 水果 524千卡</p>
            <p>早餐：蔬菜 水果 524千卡</p>
          </td>
          <td>
            <p>-3</p>
            <p>-8</p>
            <p>-5</p>
          </td>
        </tr>
        <tr>
          <th>运动</th>
          <td>
            <p>早餐：蔬菜 水果 524千卡</p>
            <p>早餐：蔬菜 水果 524千卡</p>
            <p>早餐：蔬菜 水果 524千卡</p>
          </td>
          <td>
            <p>早餐：蔬菜 水果 524千卡</p>
            <p>早餐：蔬菜 水果 524千卡</p>
            <p>早餐：蔬菜 水果 524千卡</p>
          </td>
          <td>
            <p>-3</p>
            <p>-8</p>
            <p>-5</p>
          </td>
        </tr>
        <tr>
          <th>用药</th>
          <td>
            <div>
              <p>早餐：蔬菜 水果 524千卡</p>
              <p>早餐：蔬菜 水果 524千卡</p>
              <p>早餐：蔬菜 水果 524千卡</p>
            </div>
            <!-- <p></p> -->
          </td>
          <td>
            <p>早餐：蔬菜 水果 524千卡</p>
            <p>早餐：蔬菜 水果 524千卡</p>
            <p>早餐：蔬菜 水果 524千卡</p>
          </td>
          <td>
            <p>-3</p>
            <p>-8</p>
            <p>-5</p>
          </td>
        </tr>
        <tr>
          <th>体重</th>
          <td>
            <p>早餐：蔬菜 水果 524千卡</p>
            <p>早餐：蔬菜 水果 524千卡</p>
            <p>早餐：蔬菜 水果 524千卡</p>
          </td>
          <td>
            <p>早餐：蔬菜 水果 524千卡</p>
            <p>早餐：蔬菜 水果 524千卡</p>
            <p>早餐：蔬菜 水果 524千卡</p>
          </td>
          <td><p :class="{'red-text':true}">未遵医嘱</p></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      noteDate: ''
    }
  }
}
</script>

<style scoped>
  .table-top{
    height: 46px;
    padding-top:16px;
    padding-left: 200px;
    /* line-height: 62px; */
    text-align: center;
    font-size: 14px;
    color:#666;
    background-color: #fff;
  }
  .table-top-span{
    font-size: 20px;
    color:#041421;
    /* line-height: 28px; */
    vertical-align:baseline;
    /* padding-top:5px; */
  }
  .check-date{
    display: inline-block;
    padding-right: 50px;
    float: right;
  }
  .table{
    padding: 0 50px 24px 50px;
    background-color: #fff;
  }
  table{
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
  .red-text{
    color:#e87070;
  }
  table p{
    font-size: 14px;
    color: #666;
    margin: 0;
    padding: 0;
    padding-bottom: 10px;
  }
</style>
