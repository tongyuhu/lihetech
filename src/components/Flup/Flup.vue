<template>
  <div class="flup">
    <div class="head-title">
      <span>本月须随访用户</span>
    </div>
    <div class="gap">
      <!-- 本月待随访用户 -->
      <el-card :body-style="{padding: '20px'}">
        <div>
          <div class="card-head-title unfinished">
            <p>本月待随访用户</p>
          </div>
        </div>
        <div class="table">
          <el-table 
            :data='unfinishedFlupData'
            style="width: 100%"
            v-loading="unfinishedLoading">
                <el-table-column
                    prop="realName"
                    label="姓名"
                    label-class-name="tableTitle"
                    class-name="table-col"
                    width="100"
                    align="left">
                    <template slot-scope="scope">
                      <el-button type="text" @click="diagnose(scope.row)"
                      :style="{'color':'#1991fc','padding':0}">
                        {{scope.row.realName}}
                      </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="dangerLevel"
                    label="危险分层"
                    label-class-name="tableTitle"
                    width="200">
                    <template slot-scope="scope">
                      <span :style="{'color':computeDanger(scope.row.dangerLevel)}">
                        {{layer(scope.row.dangerLevel)}}
                      </span>
                        <!-- {{layer(scope.row.dangerLevel)}} -->
                    </template>
                </el-table-column>
                <el-table-column
                    prop="lately"
                    label="近7日平均血压"
                    label-class-name="tableTitle">
                    <template slot-scope="scope">
                        {{scope.row.systolic}}/{{scope.row.diastolic}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="医生"
                    label-class-name="tableTitle">
                </el-table-column>
                <el-table-column
                    prop="followUpTime"
                    label="随访日期"
                    label-class-name="tableTitle">
                </el-table-column>
                <el-table-column
                    prop="action"
                    label=""
                    width="150">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="flupHandler(scope.row,false)"
                        :style="{'width':'72px','color':'#fff'}">随访</el-button>
                        <button class="telephone-btn" @click="call(scope.row)">
                          <i class="iconfont icon-xiaoxi icon-msg-color"></i>
                        </button>
                    </template>
                </el-table-column>
          </el-table>
        </div>
        <div class="paging">
          <el-pagination
              class="el-pagination"
              @current-change="unfinishedPageChange"
              :current-page.sync="unfinishedCurrentPage"
              :page-size="unfinishedPageSize"
              layout="total, prev, pager, next, jumper"
              :total="unfinishedTotal"
              prev-text="上一页"
              next-text="下一页">
            </el-pagination>
        </div>
      </el-card>
    </div>
    <div>
      <!-- 本月已随访用户 -->
      <el-card :body-style="{padding: '20px'}">
        <div>
          <div class="card-head-title">
            <p>本月已随访用户</p>
          </div>
        </div>
        <div class="table">
          <el-table 
            :data='finishedFlupData'
            style="width: 100%"
            v-loading="finishedLoading">
                <el-table-column
                    prop="realName"
                    label="姓名"
                    label-class-name="tableTitle"
                    class-name="table-col"
                    width="100"
                    align="left">
                    <template slot-scope="scope">
                      <el-button type="text" @click="diagnose(scope.row)"
                      :style="{'color':'#1991fc','padding':0}">
                        {{scope.row.realName}}
                      </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="dangerLevel"
                    label="危险分层"
                    label-class-name="tableTitle"
                    width="200">
                    <template slot-scope="scope">
                      <span :style="{'color':computeDanger(scope.row.dangerLevel)}">
                        {{layer(scope.row.dangerLevel)}}
                      </span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="lately"
                    label="近7日平均血压"
                    label-class-name="tableTitle">
                    <template slot-scope="scope">
                        {{scope.row.systolic}}/{{scope.row.diastolic}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="医生"
                    label-class-name="tableTitle">
                </el-table-column>
                <el-table-column
                    prop="followUpTime"
                    label="随访日期"
                    label-class-name="tableTitle">
                </el-table-column>
                <el-table-column
                    prop="action"
                    label=""
                    width="150">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="flupHandler(scope.row,'useUserId')"
                        :style="{'width':'72px','color':'#fff'}">随访</el-button>
                        <button class="telephone-btn" @click="call(scope.row)">
                          <i class="iconfont icon-xiaoxi icon-msg-color"></i>
                        </button>
                    </template>
                </el-table-column>
          </el-table>
        </div>
        <div class="paging">
          <el-pagination
              class="el-pagination"
              @current-change="finishedPageChange"
              :current-page.sync="finishedCurrentPage"
              :page-size="finishedPageSize"
              layout="total, prev, pager, next, jumper"
              :total="finishedTotal"
              prev-text="上一页"
              next-text="下一页">
            </el-pagination>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import {FlupListApi} from '@/api/components/Flup/Flup.js'
import {mapState, mapMutations} from 'vuex'
import session from '@/untils/session'
export default {
  name: 'Flup',
  data () {
    return {
      // 待随访用户加载动画
      unfinishedLoading: false,
      unfinishedCurrentPage: 1,
      unfinishedPageSize: 10,
      unfinishedTotal: 20,
      // 已随访加载动画
      finishedLoading: false,
      finishedCurrentPage: 1,
      finishedPageSize: 10,
      finishedTotal: 20,
      // 带随访用户数据
      unfinishedFlupData: [
        // {
        //   realName: 'wa',
        //   dangerLayer: 1,
        //   lately: 111,
        //   doctor: '444',
        //   FlupDate: '2104-82-99'

        // }
      ],
      // 已随访用户数据
      finishedFlupData: [
        // {
        //   realName: 'wa',
        //   dangerLayer: 1,
        //   lately: 111,
        //   doctor: '444',
        //   FlupDate: '2104-82-99'

        // }
      ]
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  methods: {
    ...mapMutations(['SET_FLUP_INFO',
      'addChatFriend',
      'changeChatFriend',
      'openChatWindow',
      'SET_CURRENT_SICK_DATA',
      'SET_FLUP_INFO'
    ]),
    /**
     * @description 到随访页面
     * @param {obj} val 用户数据
     * @param {Boolean} flup true随访 false未随访
     */
    flupHandler (val, flup) {
      let obj = {}
      if (flup) {
        obj.isFollowUp = true
      } else {
        obj.isFollowUp = false
      }
      obj.adminIdMainDoctor = val.adminIdMainDoctor
      obj.userId = val.userId
      obj.userFollowUpId = val.id
      obj.userName = val.realName
      obj.userHealthDiaryId = val.userHealthDiaryId
      obj.adminHospitalId = val.adminHospitalId
      this.SET_FLUP_INFO(obj)
      console.log('随访', val, obj)
      this.$router.push({
        name: 'FlupCard'
      })
    },
    /**
     * @param {obj} row 诊断的患者
     * @param {boolean} isuserId 用id或userid
     * @description 诊断患者
     */
    diagnose (row) {
      // 初始化诊断界面选项卡选择为第一个
      console.log('随访病人', row)
      session('sickcardTabIndex', 0)
      let id
      // if (isuserId) {
      id = row.userId
      // } else {
      //   id = row.id
      // }
      // console.log(row)
      this.$router.push({name: 'bloodheighSick',
        params: {
          sickID: id,
          name: row.realName
        }})
      this.SET_CURRENT_SICK_DATA({
        sickID: id,
        hospitalId: row.adminHospitalId
      })
      this.SET_SICK_CARD(false)
    },
    /**
     * @description 获取随访数据
     * @param {boolean} val 已随访 true 未随访 false
     */
    getListData (val) {
      let params = {

      }
      if (val) {
        params.pageNum = this.finishedCurrentPage
        params.pageSize = this.finishedPageSize
        params.isFollowUp = 1
      } else {
        params.pageNum = this.unfinishedCurrentPage
        params.pageSize = this.unfinishedPageSize
        params.isFollowUp = 0
      }
      params.adminIdMainDoctor = this.adminInfo.id
      this.$axios(FlupListApi(params))
      .then(res => {
        if (val) {
          this.finishedFlupData = res.data.data
          this.finishedTotal = res.data.recordCount
          // this.pages = res.data.pages
        } else {
          this.unfinishedFlupData = res.data.data
          this.unfinishedTotal = res.data.recordCount
        }
      })
    },
    /**
     * @description 联系用户
     * @param {obj} row 聊天对象
     */
    call (row) {
      console.log('聊天对象', row)
      let rongId = 'member_' + row.userId
      let sick = {
        userId: rongId,
        userImg: '',
        userName: row.realName || '患者',
        hasMsg: false,
        currentChat: false
      }
      console.log('聊天对象sick', sick)
      this.addChatFriend(sick)
      this.changeChatFriend(sick)
      this.openChatWindow()
    },
    /**
     * @description 带随访用户页数改变
     * @param {number} 当前页数
     */
    unfinishedPageChange (currentpage) {
      this.unfinishedCurrentPage = currentpage
      this.getListData(false)
    },
    /**
     * @description 已随访用户页数改变
     * @param {number} 当前页数
     */
    finishedPageChange (currentpage) {
      this.finishedCurrentPage = currentpage
      this.getListData(true)
    },
    /**
     * @description 分层等级
     * @param {number} val 获取到的分层等级0-6
     */
    layer (val) {
      let layer = ''
      switch (val) {
        case 1:
          layer = '低危'
          break
        case 2:
          layer = '中危'
          break
        case 3:
          layer = '高危'
          break
        case 4:
          layer = '很高危'
          break
        case 5:
          layer = '正常'
          break
        case 6:
          layer = '易患人群'
          break
        case 0:
          layer = '未知'
          break
      }
      return layer
    },
    /**
     * @description 危险等级颜色
     * @param {number} val 危险等级1-5
     */
    computeDanger (val) {
      let type = this._.toNumber(val)
      let color = ''
      switch (type) {
        case 5:
          color = '#33b2f2'// 正常
          break
        case 1:
          color = '#59d8a1'// 低危
          break
        case 2:
          color = '#efa13a'// -中危
          break
        case 3:
          color = '#ff7d43' // 高危
          break
        case 4:
          color = '#f96767' // 很高危
          break
        default:
          color = '#666'
      }
      return color
    }
  },
  mounted () {
    this.getListData(true)
    this.getListData(false)
  }
}
</script>

<style lang="scss" scoped>
  .flup{
    font-size: 14px;
  }
  .head-title{
    font-size: 24px;
    color: #041421;
    margin-left: 30px;
    margin-bottom: 10px;
  }
  .card-head-title{
    border-bottom:1px solid #ebeef5;
    padding-bottom: 10px;
    font-size: 20px;
    padding-left: 10px;
  }
  .unfinished{
    color: #e87070;
  }
  .telephone-btn{
    border: none;
    outline: none;
    background-color: #fff;
    height: 22px;
    width: 30px;
    padding: 0;
    margin:0;
    position: relative;
    cursor: pointer;
    font-size: 0;
    vertical-align: middle;
    /* margin-left: 10px; */
    /* width: 30px; */
  
  }
  .telephone-btn:hover{
    background-color: #f5f7fa;
  }
  .icon-msg-color{
    color: #1991fc;
  }
  .gap{
    margin-bottom: 8px;
  }
  .paging{
    margin-top:24px;
    margin-bottom: 4px;
    margin-right: 30px;
    font-size: 16px !important;
    text-align: right;
    vertical-align: middle;
  }
  
</style>
<style>
  .tableTitle{
    color: #041421;
    font-size:16px;
    margin:8px 0 7px 0;
  }
  .el-table td{
    padding: 5px 0;
  }
</style>



