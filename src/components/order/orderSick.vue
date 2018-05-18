<template>
  <div>
    <div class="order-sick-head">
      <div class="order-sick-head-left">
        <button class="button">预约历史</button>
        <button class="activebutton">当前预约</button>
      </div>
      <div class="order-sick-head-right">
        <div class="order-sick-head-right-btn">
          <div>

            <el-button type="text" icon="el-icon-setting" :style="{'font-size':'18px'}">预约设置</el-button>
          </div>
        </div>
        <div>
          <span>温馨提示：当前预约人数为0的，才可更改预约时间</span>
        </div>
      </div>
    </div>
    <div>
      <table>
        <thead>
          <th class="left-time">日期</th>
          <th>预约详情</th>
        </thead>
        <tbody>
          <td>
            ds
          </td>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'orderSick',
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  table{
    width: 100%;
  }
  th,td{
    border:1px solid #eaeaea;
    
  }
  
  button{
    border: none;
    outline: none;
  }
  .order-sick-head{
    .button{
      background-color: #1991fc;
      color: #fff;
      padding: 5px;
      border-radius: 2px;
      font-size: 18px;
      cursor: pointer;
      margin-right: 10px;
    }
    .activebutton{
      background-color: transparent;
      color: #666;
      padding: 5px;
      border-radius: 2px;
      font-size: 18px;
      cursor: pointer;
      margin-right: 10px;
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-right{
      display: flex;
      span{
        font-size: 14px;
        color: #041421;
      }
      flex-direction: column;
      &-btn{
        align-self: flex-end;
      }
    }
  }
  .left-time{
    width: 100px;
  }
</style>

