<template>
  <div class="order-sick">
    <div class="order-sick-head">
      <div class="order-sick-head-left">
        <button :class="{'button':checkOrderBtn,'activebutton':!checkOrderBtn}" @click="checkHistory">预约历史</button>
        <button :class="{'button':!checkOrderBtn,'activebutton':checkOrderBtn}" @click="checkOrder">当前预约</button>
        <el-date-picker
          v-model="currentOrderTime"
          type="week"
          size="small"
          :clearable="false"
          format="yyyy 第 WW 周"
          placeholder="请选择周"
          :picker-options="pickerOptions"
          @change="checkHistoryTime"
          v-show="checkOrderBtn">
        </el-date-picker>
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
    <div v-show="!checkOrderBtn" v-loading="currentOrderLoading" class="loading-min-height">
      <el-card>
        <table>
          <thead>
            <th class="left-time">日期</th>
            <th colspan="3">预约详情</th>
          </thead>
          <tbody class="tbody" v-for="(item,index) in orderList" :key="index">
                <!-- 周数 -->
                <tr>
                  <th :rowspan="item.morninng.length + item.noon.length + 5">
                      <span>{{item.dayTime}} {{item.weekDay}}</span>
                  </th>
                </tr>
                <!-- 上午工作时间 -->
                <tr>
                  <td class="width">
                    <div class="half-day">

                    <span class="span-block">上午 {{ item.morninngTotal===0?'':item.morninngTotal+'人'}}</span>
                    <!-- <span class="span-block">{{item.morninngWork}}</span> -->
                    <!-- <span class="span-block">{{ item.morninngTotal===0?'':item.morninngTotal+'人'}}</span> -->
                    </div>
                  </td>
                  <td v-if="item.morninng.length === 0">
                    <div class="table-content">
                      <!-- <div class="text-center order-time-width">
                        
                      </div> -->
                      <div class="table-content-border min-height no-order">
                        <div class="detials-order">
                          <!-- 姓名 -->
                          <div class="oder-name ">
                          </div>
                          <!-- 就诊项目 -->
                          <div class="flex-item" v-show="item.morninngWork">
                            <span>
                              暂无预约
                            </span>
                          </div>
                          <div class="flex-item error" v-show="!item.morninngWork">
                            <span>
                              未开启预约
                            </span>
                          </div>
                          <!-- 就诊状态 -->
                          <div class="order-status">
                          </div>
                          <!-- 操作 -->
                          <div class="no-order-action">
                            <!-- <button class="contant-btn" @click="openEditTime(item.weekDay,'morning')">编辑时间</button> -->
                            <!-- <button v-if="!item.morninngStop"  :class="{'open-order':!item.morninngStop,'close-order':item.morninngStop}" 
                            @click="closeOrder(item.weekDay,1,index)">{{item.morninngStop?'开启':'关闭'}}预约</button> -->
                            <button :disabled="!item.morninngStop" :class="{'open-order':true}" 
                            @click="closeOpenOrder(item.weekDay,1,index,false)">开启预约</button>
                            <button :disabled="item.morninngStop" :class="{'close-order':true}" 
                            @click="closeOpenOrder(item.weekDay,1,index,true)">关闭预约</button>
                          </div>                         
                        </div>
                      </div>
                    </div>
                  </td>
                  <td v-else class="table-td-div">
                    <div v-for="morning in item.morninng" :key="morning.id" class="table-content">
                      <!-- 预约时间 -->
                      <!-- <div class="text-center order-time-width">
                        <span>
                          {{morning.makeOrderDate.slice(10,16)}}
                        </span>
                      </div> -->
                      <div class="table-content-border min-height ">
                        <div class="detials-order">
                        <!-- <div class="detials-order" v-for="(morningPerson,index) in item.morninng" :key="index"> -->
                          <!-- 姓名 -->
                          <div class="oder-name ">
                            {{morning.name}}
                            <!-- 15899932665 -->
                          </div>
                          <!-- 就诊项目 -->
                          <div class="flex-item">
                            <span>
                              {{morning.seeSpecialty}}
                            </span>
                          </div>
                          <!-- 就诊状态 -->
                          <div class="order-status">
                            <span :style="{'color':computeColor(morning.makeOrderState)}">
                              {{oderStutas(morning.makeOrderState)}}</span>
                          </div>
                          <!-- 操作 -->
                          <div class="order-action">
                            <button class="contant-btn" @click="diagnosis(morning)">会诊</button>
                            <button class="contant-btn" @click="contact(morning.userId,morning.name)">联系</button>
                          </div>                         
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                
                <!-- 下午工作时间 -->
                <tr>
                  <td class="width">
                    <div class="half-day">
                      <span class="span-block">下午 {{item.noonTotal===0?'':item.noonTotal+'人'}}</span>
                      <!-- <span>{{item.noonTotal===0?'':item.noonTotal+'人'}}</span> -->
                      <!-- <span class="span-block">{{item.noonWork}}</span> -->
                    </div>
                  </td>
                  <td v-if="item.noon.length === 0">
                    <div class="table-content">
                      <!-- <div class="text-center order-time-width">
                        
                      </div> -->
                      <div class="table-content-border min-height no-order">
                        <div class="detials-order">
                          <!-- 姓名 -->
                          <div class="oder-name ">
                          </div>
                          <!-- 就诊项目 -->
                          <div class="flex-item" v-show="item.noonWork">
                            <span>
                              暂无预约
                            </span>
                          </div>
                          <div class="flex-item error" v-show="!item.noonWork">
                            <span>
                              未开启预约
                            </span>
                          </div>
                          <!-- 就诊状态 -->
                          <div class="order-status">
                          </div>
                          <!-- 操作 -->
                          <div class="no-order-action">
                            <!-- <button class="contant-btn" @click="openEditTime(item.weekDay,'noon')">编辑时间</button>
                            <button v-if="!item.noonStop" :class="{'open-order':!item.noonStop,'close-order':item.noonStop}"  @click="closeOrder(item.weekDay,2,index)">{{item.noonStop?'开启':'关闭'}}预约</button> -->

                            <button :disabled="!item.noonStop" :class="{'open-order':true}" 
                            @click="closeOpenOrder(item.weekDay,2,index,false)">开启预约</button>
                            <button :disabled="item.noonStop" :class="{'close-order':true}" 
                            @click="closeOpenOrder(item.weekDay,2,index,true)">关闭预约</button>
                          </div>                         
                        </div>
                      </div>
                    </div>
                  </td>
                  <td v-else class="table-td-div">
                    <div v-for="noon in item.noon" :key="noon.id" class="table-content">
                      <!-- 预约时间 -->
                      <!-- <div class="text-center order-time-width">
                        <span>
                          {{noon.startEndPeriodTime}}
                        </span>
                      </div> -->
                      <div class="table-content-border min-height ">
                        <div class="detials-order">
                        <!-- <div class="detials-order" v-for="noonPerson in item.noon" :key="noonPerson.id"> -->
                          <!-- 姓名 -->
                          <div class="oder-name ">
                            {{noon.name}}
                            <!-- 15899932665 -->
                          </div>
                          <!-- 就诊项目 -->
                          <div class="flex-item">
                            <span>
                              {{noon.seeSpecialty}}
                            </span>
                          </div>
                          <!-- 就诊状态 -->
                          <div class="order-status">
                            <span :style="{'color':computeColor(noon.makeOrderState)}"
                            >{{oderStutas(noon.makeOrderState)}}</span>
                          </div>
                          <!-- 操作 -->
                          <div class="order-action">
                            <button class="contant-btn" @click="diagnosis(noon)">会诊</button>
                            <button class="contant-btn" @click="contact(noon.userId,noon.name)">联系</button>
                          </div>                         
                        </div>
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
    <div v-show="checkOrderBtn" v-loading="histroyOrdedrLoading" class="loading-min-height">
      <el-card>
        <table>
          <thead>
            <th class="left-time">日期</th>
            <th colspan="3">预约详情</th>
          </thead>
          <tbody class="tbody" v-for="(item,index) in histroyOrderList" :key="index">
                <!-- 周数 -->
                <tr>
                  <th :rowspan="item.morninng.length + item.noon.length + 5">
                      <span>{{item.dayTime}} {{item.weekDay}}</span>
                  </th>
                </tr>
                <!-- 上午工作时间 -->
                <tr>
                  <td class="width">
                    <div class="half-day">

                    <span class="span-block">上午</span>
                    <!-- <span class="span-block">{{item.morninngWork}}</span> -->
                    </div>
                  </td>
                  <td v-if="item.morninng.length === 0">
                    <div class="table-content">
                      <!-- <div class="text-center order-time-width">
                        
                      </div> -->
                      <div class="table-content-border min-height no-order">
                        <div class="detials-order">
                          <!-- 姓名 -->
                          <div class="oder-name ">
                          </div>
                          <!-- 就诊项目 -->
                          <div class="flex-item">
                            <span>
                              暂无数据
                            </span>
                          </div>
                          <!-- 就诊状态 -->
                          <div class="order-status">
                          </div>
                          <!-- 操作 -->
                          <div class="no-order-action">
                            <!-- <button class="contant-btn">编辑时间</button>
                            <button class="contant-btn">关闭预约</button> -->
                          </div>                         
                        </div>
                      </div>
                    </div>
                  </td>
                  <td v-else class="table-td-div">
                    <div v-for="morning in item.morninng" :key="morning.id" class="table-content">
                      <!-- 预约时间 -->
                      <!-- <div class="text-center order-time-width">
                        <span>
                          {{morning.makeOrderDate.slice(10,16)}}
                        </span>
                      </div> -->
                      <div class="table-content-border min-height ">
                        <div class="detials-order">
                        <!-- <div class="detials-order" v-for="morningPerson in item.morninng" :key="morningPerson.id"> -->
                          <!-- 姓名 -->
                          <div class="oder-name ">
                            {{morning.name}}
                            <!-- 15899932665 -->
                          </div>
                          <!-- 就诊项目 -->
                          <div class="flex-item">
                            <span>
                              {{morning.seeSpecialty}}
                            </span>
                          </div>
                          <!-- 就诊状态 -->
                          <div class="order-status">
                            <span :style="{'color':computeColor(morning.makeOrderState)}">{{oderStutas(morning.makeOrderState)}}</span>
                          </div>
                          <!-- 操作 -->
                          <div class="order-action">
                            <!-- <button class="contant-btn" @click="diagnosis(morning.userId)">会诊</button> -->
                            <button class="contant-btn" @click="contact(morning.userId,morning.name)">联系</button>
                          </div>                         
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                
                <!-- 下午工作时间 -->
                <tr>
                  <td class="width">
                    <div class="half-day">
                      <span class="span-block">下午</span>
                      <!-- <span class="span-block">{{item.noonWork}}</span> -->
                    </div>
                  </td>
                  <td v-if="item.noon.length === 0">
                    <div class="table-content">
                      <!-- <div class="text-center order-time-width">
                        
                      </div> -->
                      <div class="table-content-border min-height no-order">
                        <div class="detials-order">
                          <!-- 姓名 -->
                          <div class="oder-name ">
                          </div>
                          <!-- 就诊项目 -->
                          <div class="flex-item">
                            <span>
                              暂无数据
                            </span>
                          </div>
                          <!-- 就诊状态 -->
                          <div class="order-status">
                          </div>
                          <!-- 操作 -->
                          <div class="no-order-action">
                            <!-- <button class="contant-btn">编辑时间</button>
                            <button class="contant-btn">关闭预约</button> -->
                          </div>                         
                        </div>
                      </div>
                    </div>
                  </td>
                  <td v-else class="table-td-div">
                    <div v-for="noon in item.noon" :key="noon.id" class="table-content">
                      <!-- 预约时间 -->
                      <!-- <div class="text-center order-time-width">
                        <span>
                          {{noon.makeOrderDate.slice(10,16)}}
                        </span>
                      </div> -->
                      <div class="table-content-border min-height ">
                        <div class="detials-order">
                        <!-- <div class="detials-order" v-for="noonPerson in item.noon" :key="noonPerson.id"> -->
                          <!-- 姓名 -->
                          <div class="oder-name ">
                            {{noon.name}}
                            <!-- 15899932665 -->
                          </div>
                          <!-- 就诊项目 -->
                          <div class="flex-item">
                            <span>

                              {{noon.seeSpecialty}}
                            </span>
                          </div>
                          <!-- 就诊状态 -->
                          <div class="order-status">
                            <span :style="{'color':computeColor(noon.makeOrderState)}">{{oderStutas(noon.makeOrderState)}}</span>
                          </div>
                          <!-- 操作 -->
                          <div class="order-action">
                            <!-- <button class="contant-btn" @click="diagnosis(noon.userId)">会诊</button> -->
                            <button class="contant-btn" @click="contact(noon.userId,noon.name)">联系</button>
                          </div>                         
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>

          </tbody>
            <!-- </tr> -->
        </table>
      </el-card>
    </div>
    <el-dialog
    center
    width="500px"
    :visible.sync="settingSingle">
      <span slot="title" class="dialog-title">预约时间设置</span>
      <div class="dialog-main">
        <div v-show="showMorningEdit">
          <span>上午</span>
          <el-time-select
          :style="{'width':'150px'}"
          v-model="settingSingleMorning.start"
          :picker-options="{
            start: '00:00',
            step: '00:30',
            end: '12:00',
          }">
          </el-time-select>
          至
          <el-time-select
          :style="{'width':'150px'}"
          v-model="settingSingleMorning.end"
          :picker-options="{
            start: '00:00',
            step: '00:30',
            end: '12:00',
          }">
          </el-time-select>
        </div>
        <div v-show="showNoonEdit">
          <span>下午</span>
          <el-time-select
          :style="{'width':'150px'}"
          v-model="settingSingleNoon.start"
          :picker-options="{
            start: '12:00',
            step: '00:30',
            end: '24:00',
          }">
          </el-time-select>
          至
          <el-time-select
          :style="{'width':'150px'}"
          v-model="settingSingleNoon.end"
          :picker-options="{
            start: '12:00',
            step: '00:30',
            end: '24:00',
          }">
          </el-time-select>
        </div>
      </div>
      <div slot="footer">
        <el-button @click="settingSingleCancel" type="primary">取消</el-button>
        <el-button @click="settingSingleConfirm" type="primary">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {daybefor, dateFormat} from '@/untils/date.js'
import {orderApi, orderSettingApi, closeorderApi} from '@/api/components/order/order.js'
// import {dateFormat, daybefor, computeWeekday} from '@/untils/date.js'
// import Bus from '@/bus.js'
import {mapMutations} from 'vuex'
import session from '@/untils/session'
export default {
  name: 'orderSick',
  data () {
    return {
      currentOrderLoading: false,
      histroyOrdedrLoading: false,
      // 显示上午预约
      showMorningEdit: true,
      // 显示下午预约
      showNoonEdit: true,
      // 当前编辑周数 index+1
      index: null,
      // 当前预约/预约历史
      checkOrderBtn: false,

      // currentOrder: [],
      // 预约历史选择周
      firstDayOfWeek: 1,
      pickerOptions: {
        firstDayOfWeek: 1
      },
      // 预约历史选择的周一时间
      currentOrderTime: '',
      // 当前预约列表
      orderList: [],
      // 历史预约列表
      histroyOrderList: [],
      // 是否打开编辑时间窗口
      settingSingle: false,
      // 设置的上午预约时间
      settingSingleMorning: {
        start: '',
        end: ''
      },
      // 下午预约时间
      settingSingleNoon: {
        start: '',
        end: ''
      }
    }
  },
  methods: {
    ...mapMutations(
      ['SET_SICK_CARD',
        'addChatFriend',
        'changeChatFriend',
        'openChatWindow',
        'setuserMakeOrderDoctorId',
        'SET_CURRENT_SICK_DATA',
        'setuserCasesCardId'
      ]),
    checkHistory () {
      this.checkOrderBtn = true
      let today = new Date()
      // 初始化历史预约时间选择
      this.checkHistoryTime(daybefor(today, 6, true), true)
    },
    checkOrder () {  // 选择当前预约
      this.checkOrderBtn = false
    },
    orderSetting () {  // 预约设置
      this.$router.push({
        name: 'orderSetting'
      })
    },
    // 预约状态颜色设置
    computeColor (val) {
      let color
      switch (val) {
        case 1: // 已预约
          color = '#4cc191'
          break
        case 2: // 已就诊
          color = '#33b2f2'
          break
        case 3: // 已取消
          color = '#efa13a'
          break
        case 4: // 失约
          color = '#ff7d43'
          break
        case 5: // -已评论
          color = '#999'
          break
        default:
          color = '#59d8a1'
          break
      }
      return color
    },
    // 会诊
    diagnosis (val) {
      console.log('会诊信息', val)
      session('sickcardTabIndex', 0)
      this.SET_CURRENT_SICK_DATA({
        sickID: val.userId,
        hospitalId: val.adminHospitalId
      })
      this.setuserCasesCardId(null)
      this.$router.push({
        name: 'bloodheighSick',
        params: {
          sickID: val.userId,
          hospitalId: val.adminHospitalId
        }})
      this.setuserMakeOrderDoctorId(val.id)
      if (val.makeOrderState === 1) {
        this.SET_SICK_CARD(true)
      }
    },
    // 联系
    contact (id, name) {
      let sick = {
        userId: 'member_' + id,
        userImg: '',
        userName: name,
        hasMsg: false,
        currentChat: false
      }
      this.addChatFriend(sick)
      this.changeChatFriend(sick)
      this.openChatWindow()
    },
    // 获取预约数据
    getOrderData (params, histroy) {
      this.currentOrderLoading = true
      this.histroyOrdedrLoading = false
      if (histroy) {
        this.histroyOrdedrLoading = true
        this.currentOrderLoading = false
      }
      this.$axios(orderApi(params))
      .then(res => {
        if (res.data.data) {
          if (histroy) {
            this.histroyOrderList = []
            this.histroyOrderList = this.formmater(res.data.data)
            this.histroyOrdedrLoading = false
            console.log('历史预约列表', this.histroyOrderList)
          } else {
            this.orderList = []
            this.orderList = this.formmater(res.data.data)
            console.log('预约列表', this.orderList)
            this.currentOrderLoading = false
          }
        }
      })
      .catch(err => {
        console.log(err)
        this.currentOrderLoading = false
        this.histroyOrdedrLoading = false
      })
    },
    // 计算周几
    week (val) {
      val = this._.toNumber(val)
      let week = ''
      switch (val) {
        case 1:
          week = '周一'
          break
        case 2:
          week = '周二'
          break
        case 3:
          week = '周三'
          break
        case 4:
          week = '周四'
          break
        case 5:
          week = '周五'
          break
        case 6:
          week = '周六'
          break
        case 7:
          week = '周日'
          break
      }
      return week
    },
    // 上下午？
    morninngNoon (val) {
      val = this._.toNumber(val)
      let time
      switch (val) {
        case 1:
          time = '上午'
          break
        case 2:
          time = '下午'
          break
      }
      return time
    },
    // 判断预约状态
    oderStutas (val) {
      val = this._.toNumber(val)
      let type
      switch (val) {
        case 1:
          type = '已预约'
          break
        case 2:
          type = '已就诊'
          break
        case 3:
          type = '已取消'
          break
        case 4:
          type = '失约'
          break
        case 5:
          type = '已评论'
          break
        default:
          type = '未知'
      }
      return type
    },
    // 将返回数据格式化为表格数据
    // formmater (data) {
      //   let vm = this
      //   data.forEach(item => {
      //     item.weekDay = vm.week(item.weekDay)
      //     if (!(this._.has(item, 'adminMakeOrderTotalList'))) {
      //       item.adminMakeOrderTotalList = []
      //     }
      //     if (item.adminMakeOrderTotalList.length === 0) {
      //       item.morninng = []
      //       item.noon = []
      //       item.morninngStop = true
      //       item.noonStop = true
      //       item.morninngWork = ''
      //       item.noonWork = ''
      //     } else if (item.adminMakeOrderTotalList.length === 2) {
      //       item.adminMakeOrderTotalList.forEach(half => {
      //         if (half.slotType === 1) {
      //           item.morninng = half.slotTypeList
      //           item.morninngWork = half.startEndPeriodTime
      //           item.morninngStop = half.isStop
      //         }
      //         if (half.slotType === 2) {
      //           item.noon = half.slotTypeList
      //           item.noonWork = half.startEndPeriodTime
      //           item.noonStop = half.isStop
      //         }
      //       })
      //     } else if (item.adminMakeOrderTotalList.length === 1) {
      //       if (item.adminMakeOrderTotalList[0].slotType === 1) {
      //         item.morninng = item.adminMakeOrderTotalList[0].slotTypeList
      //         item.noon = []
      //         item.morninngWork = item.adminMakeOrderTotalList[0].startEndPeriodTime
      //         item.noonWork = ''
      //         item.morninngStop = item.adminMakeOrderTotalList[0].isStop
      //         item.noonStop = true
      //       } else {
      //         item.noon = item.adminMakeOrderTotalList[0].slotTypeList
      //         item.morninng = []
      //         item.noonWork = item.adminMakeOrderTotalList[0].startEndPeriodTime
      //         item.morninngWork = ''
      //         item.noonStop = item.adminMakeOrderTotalList[0].isStop
      //         item.morninngStop = true
      //       }
      //     }
      //   })
      //   return data
    // },
    formmater (data) {
      let vm = this
      data.forEach(item => {
        item.weekDay = vm.week(item.weekDay)
        if (!(this._.has(item, 'adminMakeOrderTotalList'))) {
          item.adminMakeOrderTotalList = []
        }
        if (item.adminMakeOrderTotalList.length === 0) {
          item.morninng = []
          item.noon = []
          item.morninngStop = true
          item.noonStop = true
          item.morninngWork = ''
          item.noonWork = ''
          item.morninngTotal = 0
          item.noonTotal = 0
        } else if (item.adminMakeOrderTotalList.length === 2) {
          item.adminMakeOrderTotalList.forEach(half => {
            if (half.slotType === 1) {
              if (this._.has(half, 'userMakeOrderDoctorList')) {
                item.morninng = half.userMakeOrderDoctorList
              } else {
                item.morninng = []
              }
              item.morninngWork = half.startEndPeriodTime
              item.morninngStop = half.isStop
              item.morninngTotal = half.totalNumber
            }
            if (half.slotType === 2) {
              if (this._.has(half, 'userMakeOrderDoctorList')) {
                item.noon = half.userMakeOrderDoctorList
              } else {
                item.noon = []
              }
              // item.noon = half.userMakeOrderDoctorList
              item.noonWork = half.startEndPeriodTime
              item.noonTotal = half.totalNumber
              item.noonStop = half.isStop
            }
          })
        } else if (item.adminMakeOrderTotalList.length === 1) {
          if (item.adminMakeOrderTotalList[0].slotType === 1) {
            if (this._.has(item.adminMakeOrderTotalList[0], 'userMakeOrderDoctorList')) {
              item.morninng = item.adminMakeOrderTotalList[0].userMakeOrderDoctorList
            } else {
              item.morninng = []
            }
            // item.morninng = item.adminMakeOrderTotalList[0].userMakeOrderDoctorList
            item.morninngWork = item.adminMakeOrderTotalList[0].startEndPeriodTime
            item.morninngStop = item.adminMakeOrderTotalList[0].isStop
            item.morninngTotal = item.adminMakeOrderTotalList[0].totalNumber
            item.noon = []
            item.noonWork = ''
            item.noonTotal = 0
            item.noonStop = true
          } else {
            // item.noon = item.adminMakeOrderTotalList[0].userMakeOrderDoctorList
            if (this._.has(item.adminMakeOrderTotalList[0], 'userMakeOrderDoctorList')) {
              item.noon = item.adminMakeOrderTotalList[0].userMakeOrderDoctorList
            } else {
              item.noon = []
              // item.noonWork = item.adminMakeOrderTotalList[0].startEndPeriodTime
              // item.morninngWork = ''
              // item.noonStop = item.adminMakeOrderTotalList[0].isStop
              // item.morninngStop = true
            }
            item.noonWork = item.adminMakeOrderTotalList[0].startEndPeriodTime
            item.noonStop = item.adminMakeOrderTotalList[0].isStop
            item.noonTotal = item.adminMakeOrderTotalList[0].totalNumber
            item.morninng = []
            item.morninngWork = ''
            item.morninngStop = true
            item.morninngTotal = 0
          }
        }
      })
      return data
    },
    checkHistoryTime (val, init) {
      console.log(this.currentOrderTime, '周起始日11')
      console.log(dateFormat(val, 0, true), '周起始日')
      val = dateFormat(val, 0, true)
      let nowDay = new Date()
      let time = {
      }
      nowDay = dateFormat(nowDay, 0, true)
      // nowDay = daybefor(nowDay, 1, true)
      if (this._.gt(val, nowDay)) {
        this.$message({
          showClose: true,
          message: '请选择小于当前日期的值',
          type: 'error'
        })
        this.currentOrderTime = ''
      } else {
        let weekday = daybefor(val, -5, true)
        if (this._.gt(weekday, nowDay)) {
          weekday = nowDay
        }
        time.start = daybefor(val, 1, true)
        time.end = weekday
      }
      if (this.currentOrderTime !== '' || init) {
        this.getOrderData({
          startTime: time.start,
          endTime: time.end,
          type: 1
        }, true)
      }
    },
    // 打开预约编辑
    openEditTime (val, MN) {
      if (val === '周一') {
        this.index = 1
      }
      if (val === '周二') {
        this.index = 2
      }
      if (val === '周三') {
        this.index = 3
      }
      if (val === '周四') {
        this.index = 4
      }
      if (val === '周五') {
        this.index = 5
      }
      if (val === '周六') {
        this.index = 6
      }
      if (val === '周日') {
        this.index = 7
      }
      if (MN === 'morning') {
        this.showMorningEdit = true
        this.showNoonEdit = false
        // 下午预约时间
        this.settingSingleNoon = {
          start: '',
          end: ''
        }
      }
      if (MN === 'noon') {
        // 设置的上午预约时间
        this.settingSingleMorning = {
          start: '',
          end: ''
        }
        this.showMorningEdit = false
        this.showNoonEdit = true
      }
      this.settingSingle = true
    },
    // 取消编辑预约时间
    settingSingleCancel () {
      this.settingSingleMorning.start = ''
      this.settingSingleMorning.end = ''
      this.settingSingleNoon.start = ''
      this.settingSingleNoon.end = ''
      this.settingSingle = false
    },
    // 确认编辑时间
    settingSingleConfirm () {
      let parmars = {}
      let morning = this._.gt(this.settingSingleMorning.start, this.settingSingleMorning.end)
      let noon = this._.gt(this.settingSingleNoon.start, this.settingSingleNoon.end)
      if (morning || noon) {
        this.$message({
          message: '起始时间不能大于结束时间,请重新设置',
          type: 'warning'
        })
        this.settingSingleMorning.start = ''
        this.settingSingleMorning.end = ''
        this.settingSingleNoon.start = ''
        this.settingSingleNoon.end = ''
      } else {
        // this.order[this.index].morning = this.settingSingleMorning.start + '-' + this.settingSingleMorning.end
        // this.order[this.index].noon = this.settingSingleNoon.start + '-' + this.settingSingleNoon.end
        let noon = null
        if (this.settingSingleNoon.start && this.settingSingleNoon.end) {
          noon = this.settingSingleNoon.start + '-' + this.settingSingleNoon.end
        } else {
          noon = null
        }
        let morning = null
        if (this.settingSingleMorning.start && this.settingSingleMorning.end) {
          morning = this.settingSingleMorning.start + '-' + this.settingSingleMorning.end
        } else {
          morning = null
        }
        if (morning) {
          parmars.startEndPeriodTimeMor = morning
        }
        if (noon) {
          parmars.startEndPeriodTimeAftn = noon
        }
        parmars.weeks = this.index
        this.$axios(orderSettingApi(parmars))
          .then(res => {
            if (res.data.code === '1001') {
              this.$message({
                showClose: true,
                message: '设置失败！',
                type: 'warning'
              })
            }
            if (res.data.code === '0000') {
              this.$message({
                showClose: true,
                message: '设置成功！',
                type: 'success'
              })
              this.getOrderData({type: 0})
            }
          })
        this.settingSingle = false
      }
    },
    // 关闭预约
    closeOrder (day, val, index) {
      let week
      if (day === '周一') {
        week = 1
      }
      if (day === '周二') {
        week = 2
      }
      if (day === '周三') {
        week = 3
      }
      if (day === '周四') {
        week = 4
      }
      if (day === '周五') {
        week = 5
      }
      if (day === '周六') {
        week = 6
      }
      if (day === '周日') {
        week = 7
      }
      let stop
      if (val === 1) {
        stop = !this.orderList[index].morninngStop
      }
      if (val === 2) {
        stop = !this.orderList[index].noonStop
      }

      let params = {
        'weekDay': week,
        'slotType': val,
        'isStop': stop
      }
      this.$axios(closeorderApi(params))
      .then(res => {
        if (res.data.code === '0000') {
          this.$message({
            showClose: true,
            message: '设置成功',
            type: 'success'
          })
          let list = this.orderList
          if (val === 1) {
            list[index].morninngStop = !list[index].morninngStop
          }
          if (val === 2) {
            list[index].noonStop = !list[index].noonStop
          }
          this.getOrderData({type: 0})
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: 'warning'
          })
        }
      })
      // closeorderApi
    },
    closeOpenOrder (day, val, index, state) {
      let week
      if (day === '周一') {
        week = 1
      }
      if (day === '周二') {
        week = 2
      }
      if (day === '周三') {
        week = 3
      }
      if (day === '周四') {
        week = 4
      }
      if (day === '周五') {
        week = 5
      }
      if (day === '周六') {
        week = 6
      }
      if (day === '周日') {
        week = 7
      }
      let stop
      if (state) {
        stop = true
      } else {
        stop = false
      }

      let params = {
        'weekDay': week,
        'slotType': val,
        'isStop': stop
      }
      this.$axios(closeorderApi(params))
      .then(res => {
        if (res.data.code === '0000') {
          this.$message({
            showClose: true,
            message: '设置成功',
            type: 'success'
          })
          let list = this.orderList
          if (val === 1) {
            list[index].morninngStop = state
          }
          if (val === 2) {
            list[index].noonStop = state
          }
          this.getOrderData({type: 0})
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: 'warning'
          })
        }
      })
      // closeorderApi
    }
  },
  mounted () {
    // this.nextSunday().forEach(item => {
    //   let obj = {}
    //   obj.today = item
    //   this.currentOrder.push(obj)
    // })
    this.getOrderData({type: 0})
    // let today = new Date()
    // daybefor(today,6,true)
    // this.checkHistoryTime(daybefor(today, 6, true))
  }
}
</script>

<style lang="scss" scoped>
button[disabled]{
  cursor: not-allowed;
  // not-allowed
}
.order-sick{
  font-size: 14px;
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
    padding: 20px;
    font-size: 16px;
  }
  th,td{
    border:1px solid #eaeaea;
    // padding: 10px;
    vertical-align: middle;
    text-align: center;
    box-sizing: border-box;
    
  }
  td{
    min-height: 60px;
    height: 45px;
  }
  .width{
    width: 120px;
  }
  .black{
    color:#041421;
  }
  button{
    // border: none;
    outline: none;
  }
  .order-sick-head{
    margin-bottom: 20px;
    .button{
      box-sizing: border-box;
      line-height: 1;
      white-space: nowrap;
      border:1px solid #1991fc;
      background-color: #1991fc;
      color: #fff;
      padding: 7px 8px;
      border-radius: 2px;
      font-size: 16px;
      cursor: pointer;
      margin-right: 10px;
      border: none;
    }
    button:hover{
      opacity: 0.9;
    }
    .activebutton{
      background-color: transparent;
      color: #666;
      border: none;
      padding: 7px 8px;
      border-radius: 2px;
      font-size: 16px;
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
    div{
      box-sizing: border-box;
    }
  }
  .span-block{
    display: block;
    padding-bottom: 3px;
    padding-top: 3px;
    // padding:5px;
  }
  .table-content{
  display:flex;
  // justify-content: center;
  align-items: center;
}
.half-day{
  padding:8px;
  min-height: 65px;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  width: inherit;
}
.table-content-border{
  border-left:1px solid #eaeaea;
  // padding-left:10px;
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.table-td-div>div:nth-last-child(n+2){
  border-bottom:1px solid #eaeaea;
}
.table-td-div{
  text-align: center;
  // width: 100%;
}
.text-center{
  text-align: center;
}
.order-time-width{
  width: 130px;
  span{
    padding:10px;
    display: inline-block;
  }
}
.no-order{
  display: flex;
  align-items: center;
  justify-content: center;
}
.min-height{
  min-height: 65px;
}
.detials-order{
  display: flex;
  // justify-content: space-around;
  width: 100%;
  align-items: center;
  padding: 5px;
}
.oder-name{
  min-width: 150px;
}
.flex-item{
  flex-grow:1;
}
.order-status{
  min-width: 100px;
}
.contant-btn{
  box-sizing: border-box;
  padding: 5px 5px;
  background: #1991fc;
  border-radius: 2px;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  color: #fff;
  width: 72px;
  font-size: 14px;
  border:1px solid #1991fc;
}
.contant-btn:hover{
  opacity: 0.9;
}
.order-action{
  min-width: 155px;
  text-align: left;
}
.no-order-action{
  min-width: 155px;
  text-align: left;
  // padding:0 5px;

}
.success{
  color: #4cc191;
}
.error{
  color:#e87070;
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
.open-order{
  box-sizing: border-box;
  border:1px solid #1991fc;
  line-height: 1;
  white-space: nowrap;
  padding: 5px 5px;
  background: #1991fc;
  border-radius: 2px;
  cursor: pointer;
  color: #fff;
  width: 72px;
  font-size: 14px;
}
.open-order:hover{
  opacity: 0.9;
  // box-sizing: border-box;
  // border:1px solid #1991fc;
  // line-height: 1;
  // white-space: nowrap;
  // padding: 5px 5px;
  // background: #1991fc;
  // border-radius: 2px;
  // cursor: pointer;
  // color: #fff;
  // width: 72px;
  // font-size: 14px;
}
.close-order{
  padding: 5px 5px;
  box-sizing: border-box;
  line-height: 1;
  white-space: nowrap;
  border:1px solid #e87070;
  border-radius: 2px;
  cursor: pointer;
  color: #fff;
  width: 72px;
  font-size: 14px;
  background: #e87070;
}
.close-order:hover{
  opacity: 0.9;
  // padding: 5px 5px;
  // box-sizing: border-box;
  // line-height: 1;
  // white-space: nowrap;
  // border:1px solid #e87070;
  // border-radius: 2px;
  // cursor: pointer;
  // color: #fff;
  // width: 72px;
  // font-size: 14px;
  // background: #e87070;
}
.loading-min-height{
  min-height: 700px;
  width: 100%;
}
</style>

