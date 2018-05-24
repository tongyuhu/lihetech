<template>
  <div class="order-sick">
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
            <th colspan="3">预约详情</th>
          </thead>
          <tbody class="tbody" v-for="item in 2" :key="item.i">
                <tr>
                  <th :rowspan="dataweek.morninng.length + dataweek.noon.length+3">
                      <span>2018-5-14 周一</span>
                  </th>
                </tr>
                <tr>
                  <td class="width" :rowspan="dataweek.morninng.length+1">
                    <span>上午</span>
                  </td>
                </tr>

                <tr>
                  <td class="width">
                    <span>{{dataweek.morninng[0].orderTime}}</span>
                  </td>
                  <td>
                    <div class="table-details">
                      <!-- <div>08:30-09:00</div> -->
                      <div>张磊</div>
                      <div>高血压并发症</div>
                      <div>已就诊</div>
                      <div>
                        <button @click="diagnosis">会诊</button>
                        <button>联系</button>
                      </div>
                    </div>
                    <div class="table-details">
                      <!-- <div>08:30-09:00</div> -->
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
                    <span>{{dataweek.morninng[0].orderTime}}</span>
                  </td>
                  <td>
                    <div class="table-details">
                      <!-- <div>08:30-09:00</div> -->
                      <div>张磊</div>
                      <div>高血压并发症</div>
                      <div>已就诊</div>
                      <div>
                        <button>会诊</button>
                        <button>联系</button>
                      </div>
                    </div>
                    <div class="table-details">
                      <!-- <div>08:30-09:00</div> -->
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
                  <td :rowspan="dataweek.noon.length+1">下午</td>
                </tr>

                <tr>
                  <td class="width">
                    <span>{{dataweek.morninng[0].orderTime}}</span>
                  </td>
                  <td>
                    <div class="table-details">
                      <!-- <div>08:30-09:00</div> -->
                      <div>张磊</div>
                      <div>高血压并发症</div>
                      <div>已就诊</div>
                      <div>
                        <button>会诊</button>
                        <button>联系</button>
                      </div>
                    </div>
                    <div class="table-details">
                      <!-- <div>08:30-09:00</div> -->
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
                    <span>{{dataweek.morninng[0].orderTime}}</span>
                  </td>
                  <td>
                    <div class="table-details">
                      <!-- <div>08:30-09:00</div> -->
                      <div>张磊</div>
                      <div>高血压并发症</div>
                      <div>已就诊</div>
                      <div>
                        <button>会诊</button>
                        <button>联系</button>
                      </div>
                    </div>
                    <div class="table-details">
                      <!-- <div>08:30-09:00</div> -->
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
                    <span>{{dataweek.morninng[0].orderTime}}</span>
                  </td>
                  <td>
                    <div class="table-details">
                      <!-- <div>08:30-09:00</div> -->
                      <div>张磊</div>
                      <div>高血压并发症</div>
                      <div>已就诊</div>
                      <div>
                        <button>会诊</button>
                        <button>联系</button>
                      </div>
                    </div>
                    <div class="table-details">
                      <!-- <div>08:30-09:00</div> -->
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
            <!-- </tr> -->
        </table>
      </el-card>
    </div>

    <!-- 历史预约 checkOrderBtn -->
    <div v-show="checkOrderBtn">
      <el-card>
        <table>
          <thead>
            <th class="left-time">日期</th>
            <th colspan="3">预约详情</th>
          </thead>
          <!-- <tbody> -->
            <!-- <tr class="tbody" v-for="item in 2" :key="item.i"> -->

          <!-- <tbody> -->
          <tbody class="tbody" v-for="item in 2" :key="item.i">
                <tr>
                  <th :rowspan="dataweek.morninng.length + dataweek.noon.length+3">
                      <span>2018-5-14 周一</span>
                  </th>
                </tr>

                <tr>
                  <td class="width" :rowspan="dataweek.morninng.length+1">
                    <span>上午</span>
                  </td>
                </tr>

                <tr>
                  <td class="width">
                    <span>{{dataweek.morninng[0].orderTime}}</span>
                  </td>
                  <td>
                    <div class="table-details">
                      <!-- <div>08:30-09:00</div> -->
                      <div>张磊</div>
                      <div>高血压并发症</div>
                      <div>已就诊</div>
                      <div>
                        <button>联系</button>
                      </div>
                    </div>
                    <div class="table-details">
                      <!-- <div>08:30-09:00</div> -->
                      <div>张磊</div>
                      <div>高血压并发症</div>
                      <div>已就诊</div>
                      <div>
                        <button>联系</button>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td class="width">
                    <span>{{dataweek.morninng[0].orderTime}}</span>
                  </td>
                  <td>
                    <div class="table-details">
                      <!-- <div>08:30-09:00</div> -->
                      <div>张磊</div>
                      <div>高血压并发症</div>
                      <div>已就诊</div>
                      <div>
                        <button>联系</button>
                      </div>
                    </div>
                    <div class="table-details">
                      <!-- <div>08:30-09:00</div> -->
                      <div>张磊</div>
                      <div>高血压并发症</div>
                      <div>已就诊</div>
                      <div>
                        <button>联系</button>
                      </div>
                    </div>
                  </td>
                </tr>
                
                <tr>
                  <td :rowspan="dataweek.noon.length+1">下午</td>
                </tr>

                <tr>
                  <td class="width">
                    <span>{{dataweek.morninng[0].orderTime}}</span>
                  </td>
                  <td>
                    <div class="table-details">
                      <!-- <div>08:30-09:00</div> -->
                      <div>张磊</div>
                      <div>高血压并发症</div>
                      <div>已就诊</div>
                      <div>
                        <button>联系</button>
                      </div>
                    </div>
                    <div class="table-details">
                      <!-- <div>08:30-09:00</div> -->
                      <div>张磊</div>
                      <div>高血压并发症</div>
                      <div>已就诊</div>
                      <div>
                        <button>联系</button>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td class="width">
                    <span>{{dataweek.morninng[0].orderTime}}</span>
                  </td>
                  <td>
                    <div class="table-details">
                      <!-- <div>08:30-09:00</div> -->
                      <div>张磊</div>
                      <div>高血压并发症</div>
                      <div>已就诊</div>
                      <div>
                        <button>联系</button>
                      </div>
                    </div>
                    <div class="table-details">
                      <!-- <div>08:30-09:00</div> -->
                      <div>张磊</div>
                      <div>高血压并发症</div>
                      <div>已就诊</div>
                      <div>
                        <button>联系</button>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td class="width">
                    <span>{{dataweek.morninng[0].orderTime}}</span>
                  </td>
                  <td>
                    <div class="table-details">
                      <!-- <div>08:30-09:00</div> -->
                      <div>张磊</div>
                      <div>高血压并发症</div>
                      <div>已就诊</div>
                      <div>
                        <button>联系</button>
                      </div>
                    </div>
                    <div class="table-details">
                      <!-- <div>08:30-09:00</div> -->
                      <div>张磊</div>
                      <div>高血压并发症</div>
                      <div>已就诊</div>
                      <div>
                        <button>联系</button>
                      </div>
                    </div>
                  </td>
                </tr>
          </tbody>
            <!-- </tr> -->
        </table>
      </el-card>
    </div>

  </div>
</template>

<script>
import {daybefor, computeWeekday} from '@/untils/date.js'
// import {dateFormat, daybefor, computeWeekday} from '@/untils/date.js'
// import Bus from '@/bus.js'
import {mapMutations} from 'vuex'
export default {
  name: 'orderSick',
  data () {
    return {
      checkOrderBtn: false,
      currentOrder: [],
      dataweek: {
        morninng: [
          {
            orderTime: '08:30-09:00',
            orderPerson: [
              {
                name: 'w0ng'
              },
              {
                name: '123'
              }
            ]
          },
          {
            orderTime: '01:30-11:00',
            orderPerson: [
              {
                name: 'w0ng'
              },
              {
                name: '123'
              }
            ]
          }
        ],
        noon: [
          {
            orderTime: '08:30-09:00',
            orderPerson: [
              {
                name: 'w0ng'
              },
              {
                name: '123'
              }
            ]
          },
          {
            orderTime: '08:30-09:00',
            orderPerson: [
              {
                name: 'w0ng'
              },
              {
                name: '123'
              }
            ]
          },
          {
            orderTime: '08:30-09:00',
            orderPerson: [
              {
                name: 'w0ng'
              },
              {
                name: '123'
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(
      ['SET_SICK_CARD',
        'addChatFriend',
        'changeChatFriend',
        'openChatWindow'
      ]),
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
    },
    nextSunday () {
      let today = new Date()
      let befor = -7
      let arr = []
      let befortoday = daybefor(today, befor, true)
      let week = computeWeekday(befortoday)
      if (week === '周日') {
        return today
      } else {
        while (week !== '周日') {
          befor--
          befortoday = daybefor(today, befor, true)
          week = computeWeekday(befortoday)
        }
      }
      // return [befortoday, week]
      while (!(befor > 0)) {
        // console.log(befor)
        arr.push(befortoday + ' ' + week)
        befor++
        befortoday = daybefor(today, befor, true)
        week = computeWeekday(befortoday)
      }
      return arr.reverse()
    },
    computeColor () {

    },
    diagnosis () {
      this.$router.push({
        name: 'bloodheighSick',
        params: {
          sickID: 12,
          hospitalId: 2
        }})
      // Bus.$emit('huizhen', true)
      this.SET_SICK_CARD(true)
      // console.log('$refs', this.$refs.sickcard)
    },
    contact () {
      let sick = {
        userId: '5277',
        userImg: '',
        userName: '患者',
        hasMsg: false,
        currentChat: false
      }
      this.addChatFriend(sick)
      this.changeChatFriend(sick)
      this.openChatWindow()
    }
  },
  mounted () {
    this.nextSunday().forEach(item => {
      let obj = {}
      obj.today = item
      this.currentOrder.push(obj)
    })
    console.log('星期几', this.nextSunday())
  }
}
</script>

<style lang="scss" scoped>
.order-sick{
  table{
    width: 100%;
    color: #666;
    // margin-top:20px;
  }
  thead{
    box-shadow: 0 4px #eaeaea;
  }
  tbody:nth-last-child(n+2){
    box-shadow: 0 4px #eaeaea;
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
    width: 100px;
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
  .tbody{
    margin-top:4px;
  }
}
</style>

