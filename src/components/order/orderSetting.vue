<template>
  <div>
    <div class="order-setting">
      <button>周批量设置</button>
      <span>2018-05-01  05-08</span>
    </div>

    <div>
      <el-card>
        <table>
          <thead>
            <th>日期</th>
            <th>编辑</th>
            <th>编辑</th>
          </thead>
          <tbody>
            <tr>
              <td>2018-5-14 周一</td>
              <td>该日预约</td>
              <td>
                <span>上午08:30-12:00</span>
                <span>上午08:30-12:00</span>
                <el-button type="text" icon="el-icon-edit-outline">编辑</el-button>
              </td>
            </tr>
          </tbody>
        </table>
      </el-card>
    </div>

    <el-dialog
    center
    width="500px"
    :visible.sync="settingSingle">
      <span slot="title" class="dialog-title">预约时间设置</span>
      <div class="dialog-main">
        <div>
          <span>上午</span>
          <el-time-picker
          is-range
          v-model="settingSingleMorning"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
          format="HH:mm">
          </el-time-picker>
        </div>
        <div>
          <span>下午</span>
          <el-time-picker
          is-range
          v-model="settingSingleNoon"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
          format="HH:mm">
          </el-time-picker>
        </div>
      </div>
    </el-dialog>
    <el-dialog
    center
    width="500px"
    :visible.sync="settingGroup">
      <span slot="title" class="dialog-title">周批量预约时间设置</span>
      <div class="dialog-main">
        <div>
          <span>日期</span>
          <el-date-picker
            v-model="settingGroupTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="MM-dd">
          </el-date-picker>
        </div>
        <div>
          <span>上午</span>
          <el-time-picker
          is-range
          v-model="settingGroupMorning"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
          format="HH:mm">
          </el-time-picker>
        </div>
        <div>
          <span>下午</span>
          <el-time-picker
          is-range
          v-model="settingGroupNoon"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
          format="HH:mm">
          </el-time-picker>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'orderSetting',
  data () {
    return {
      settingSingle: false,
      settingSingleMorning: '',
      settingSingleNoon: '',
      settingGroup: true,
      settingGroupMorning: '',
      settingGroupNoon: '',
      settingGroupTime: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  span{
    display: inline-block;
    margin-right: 10px;
  }

  table{
    width: 100%;
    color: #666;
    font-size: 14px;
  }
  th{
    color: #041421;
  }
  th,td{
    border:1px solid #eaeaea;
    padding: 10px;
    vertical-align: middle;
    text-align: center;
  }
.order-setting{
  margin-bottom: 20px;
  button{
    border: none;
    background: #1991fc;
    padding: 5px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
    margin-right: 15px;
  }
}
.dialog-title{
  display: inline-block;
  text-align: center;
  color: #041421;
}
.dialog-main{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.dialog-main div{
  margin-top:10px;
}
</style>

