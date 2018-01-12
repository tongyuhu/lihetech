<template>
  <div>
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
  </div>
</template>

<script>
export default {
  name: 'SoldData',
  data () {
    return {
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
