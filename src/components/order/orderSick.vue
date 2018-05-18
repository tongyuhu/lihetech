<template>
  <div>
    <div class="order-sick-head">
      <div class="order-sick-head-left">
        <button :class="{'button':checkOrderBtn,'activebutton':!checkOrderBtn}" @click="checkHistory">预约历史</button>
        <button :class="{'button':!checkOrderBtn,'activebutton':checkOrderBtn}" @click="checkOrder">当前预约</button>
      </div>
      <div class="order-sick-head-right">
        <div class="order-sick-head-right-btn">
          <div>

            <el-button @click="orderSetting" type="text" icon="el-icon-setting" :style="{'font-size':'18px'}">预约设置</el-button>
          </div>
        </div>
        <div>
          <span>温馨提示：当前预约人数为0的，才可更改预约时间</span>
        </div>
      </div>
    </div>
    <!-- 当前预约 -->
    <div v-show="!checkOrderBtn">
      <el-card>
        <table>
          <thead>
            <th class="left-time">日期</th>
            <th colspan="2">预约详情</th>
          </thead>
          <tbody v-for="item in 5" :key="item.i">
                <tr>
                  <th rowspan="2">
                      <span>2018-5-14 周一</span>
                  </th>
                  <td class="width">
                    <span>上午</span>
                  </td>
                  <td>
                    <div class="table-details">
                      <div>08:30-09:00</div>
                      <div>张磊</div>
                      <div>高血压并发症</div>
                      <div>已就诊</div>
                      <div>
                        <button>会诊</button>
                        <button>联系</button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="width">
                    <span>下午</span>
                  </td>
                  <td class="table-main-wrap">
                    <div class="table-details">
                      <div>08:30-09:00</div>
                      <div>张磊</div>
                      <div>高血压并发症</div>
                      <div>已就诊</div>
                      <div>
                        <button>会诊</button>
                        <button>联系</button>
                      </div>
                    </div>
                    <div class="table-details">
                      <div>08:30-09:00</div>
                      <div>张磊</div>
                      <div>高血压并发症</div>
                      <div>已就诊</div>
                      <div>
                        <button>会诊</button>
                        <button>联系</button>
                      </div>
                    </div>
                  </td>
                </tr>
          </tbody>
        </table>
      </el-card>
    </div>

    <!-- 历史预约 -->
    <div v-show="checkOrderBtn">
      <el-card>
        <table>
          <thead>
            <th class="left-time">日期</th>
            <th colspan="2">预约详情</th>
          </thead>
          <tbody v-for="item in 2" :key="item.i">
                <tr>
                  <th rowspan="2">
                      <span>2018-5-14 周一</span>
                  </th>
                  <td class="width">
                    <span>上午</span>
                  </td>
                  <td>
                    <div class="table-details">
                      <div>08:30-09:00</div>
                      <div>张磊</div>
                      <div>高血压并发症</div>
                      <div>已就诊</div>
                      <div>
                        <button>会诊</button>
                        <button>联系</button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="width">
                    <span>下午</span>
                  </td>
                  <td class="table-main-wrap">
                    <div class="table-details">
                      <div>08:30-09:00</div>
                      <div>张磊</div>
                      <div>高血压并发症</div>
                      <div>已就诊</div>
                      <div>
                        <button>会诊</button>
                        <button>联系</button>
                      </div>
                    </div>
                    <div class="table-details">
                      <div>08:30-09:00</div>
                      <div>张磊</div>
                      <div>高血压并发症</div>
                      <div>已就诊</div>
                      <div>
                        <button>会诊</button>
                        <button>联系</button>
                      </div>
                    </div>
                  </td>
                </tr>
          </tbody>
        </table>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'orderSick',
  data () {
    return {
      checkOrderBtn: false
    }
  },
  methods: {
    checkHistory () {
      this.checkOrderBtn = true
    },
    checkOrder () {
      this.checkOrderBtn = false
    },
    orderSetting () {
      this.$router.push({
        name: 'orderSetting'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  table{
    width: 100%;
    color: #666;
    // margin-top:20px;
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
  .width{
    width: 120px;
  }
  .black{
    color:#041421;
  }
  button{
    border: none;
    outline: none;
  }
  .order-sick-head{
    margin-bottom: 20px;
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
    width: 220px;
  }
  .table-details{
    display: flex;
    justify-content: space-around;
    align-items: center;
    // margin-top:10px;
    padding: 5px 0;
    div{
      width: 20%;
    }
    // vertical-align: middle;
    button{
      padding: 5px;
      background: #1991fc;
      border-radius: 2px;
      cursor: pointer;
      color: #fff;
    }
  }
  .table-main-wrap div:nth-child(n+2){
    // baseline:middle;
  }
</style>

