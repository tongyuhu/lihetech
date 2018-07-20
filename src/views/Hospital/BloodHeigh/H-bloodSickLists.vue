<template>
  <div class='work'>
    <div class="workhead">
      <span>高血压患者</span>
    </div>
    <div>
    <!--  end -->

      
      <!-- 三级管理  start -->
      <div class="bottom-margin" id="threeLevel">
        <el-card :body-style="{ padding: '0px' }">
          <div class="card-header">
            <p class="title">三级管理</p>
          </div>
          <div class="table">
            <el-table 
            :data='threeLevelData'
            style="width: 100%"
            row-class-name="table-row"
            v-loading="threeLevelLoading">
                <el-table-column
                    prop="realName"
                    label="姓名"
                    width="100"
                    label-class-name="tableTitle">
                    <template slot-scope="scope">
                      <el-button type="text" @click="diagnose(scope.row)"
                      :style="{'color':'#1991fc','padding':0}">
                        {{scope.row.realName}}
                      </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="dangerLevelDisease"
                    label="分层依据"
                    label-class-name="tableTitle">
                    <template slot-scope="scope">   
                      <span> {{scope.row.dangerLevelDisease}}</span>                          
                      <span> {{scope.row.dangerLevelOrgan}}</span>                          
                      <span> {{scope.row.dangerLevelDanger}}</span>                         
                      <!-- <span> {{scope.row.dangerLevelDisease?'临床疾病':''}}</span>                           
                      <span> {{scope.row.dangerLevelOrgan?'靶器官损坏':''}}</span>                           
                      <span> {{scope.row.dangerLevelDanger?'危险因素':''}}</span>                            -->
                    </template>
                </el-table-column>
                <el-table-column
                    prop="dangerousCount"
                    label="近七日严重次数"
                    label-class-name="tableTitle">
                    <!-- <template slot-scope="scope">   
                      <span v-if="scope.row.bastThan"> {{scope.row.bastThan}}%</span>                           
                    </template> -->
                </el-table-column>
                <el-table-column
                    prop="joinHospitalTime"
                    label="加入时间"
                    label-class-name="tableTitle">
                </el-table-column>
                <el-table-column
                    prop="action"
                    label=""
                    width="275px"
                    align="center">
                    <template slot-scope="scope">
                        <el-button 
                        size="mini" 
                        type="primary" 
                        @click.native="isCare(scope.row,badsickData)" 
                        :key="scope.row.id" 
                        :style="{'width':'80px','color':'#fff'}"
                        >
                          <span v-if="scope.row.isDocusOn">取消关注</span>
                          <span v-if="!scope.row.isDocusOn">关注</span>
                        </el-button>
                        <!-- <el-button size="mini" type="primary" @click="diagnose(scope.row)" 
                        :style="{'width':'72px','color':'#fff'}">诊断</el-button> -->

                        <button class="telephone-btn" @click="call(scope.row)">
                          <i class="iconfont icon-xiaoxi icon-msg-color"></i>
                        </button>
                    </template>
                </el-table-column>
            </el-table>
          </div>
          <div class="page">
            <el-pagination
              class="el-pagination"
              @current-change="threeLevelCurrentChange"
              :current-page.sync="threeLevelCurrentPage"
              :page-size="threeLevelPageSize"
              layout="total, prev, pager, next, jumper"
              :total="threeLevelTotal"
              prev-text="上一页"
              next-text="下一页">
            </el-pagination>
          </div>
        </el-card>
      </div>
      <!-- 三级管理  end -->

      <!-- 二级管理 start -->
      <div class="bottom-margin" id="twoLevel">
        <el-card :body-style="{ padding: '0px' }">
          <div class="card-header">
            <p class="title">二级管理</p>
          </div>
          <div class="table">
            <el-table 
            :data='twoLevelData'
            style="width: 100%"
            row-class-name="table-row"
            v-loading="twoLevelLoading">
                <el-table-column
                    prop="realName"
                    label="姓名"
                    width="100"
                    label-class-name="tableTitle">
                    <template slot-scope="scope">
                      <el-button type="text" @click="diagnose(scope.row)"
                      :style="{'color':'#1991fc','padding':0}">
                        {{scope.row.realName}}
                      </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="dangerLevelDisease"
                    label="分层依据"
                    label-class-name="tableTitle">
                    <template slot-scope="scope">   
                      <span> {{scope.row.dangerLevelDisease}}</span>                          
                      <span> {{scope.row.dangerLevelOrgan}}</span>                          
                      <span> {{scope.row.dangerLevelDanger}}</span>                         
                      <!-- <span> {{scope.row.dangerLevelDisease?'临床疾病':''}}</span>                           
                      <span> {{scope.row.dangerLevelOrgan?'靶器官损坏':''}}</span>                           
                      <span> {{scope.row.dangerLevelDanger?'危险因素':''}}</span>                            -->
                    </template>
                </el-table-column>
                <el-table-column
                    prop="dangerousCount"
                    label="近七日严重次数"
                    label-class-name="tableTitle">
                    <!-- <template slot-scope="scope">   
                      <span v-if="scope.row.bastThan"> {{scope.row.bastThan}}%</span>                           
                    </template> -->
                </el-table-column>
                <el-table-column
                    prop="joinHospitalTime"
                    label="加入时间"
                    label-class-name="tableTitle">
                </el-table-column>
                <el-table-column
                    prop="action"
                    label=""
                    width="275px"
                    align="center">
                    <template slot-scope="scope">
                        <el-button 
                        size="mini" 
                        type="primary" 
                        @click.native="isCare(scope.row,badsickData)" 
                        :key="scope.row.id" 
                        :style="{'width':'80px','color':'#fff'}"
                        >
                          <span v-if="scope.row.isDocusOn">取消关注</span>
                          <span v-if="!scope.row.isDocusOn">关注</span>
                        </el-button>
                        <!-- <el-button size="mini" type="primary" @click="diagnose(scope.row)" 
                        :style="{'width':'72px','color':'#fff'}">诊断</el-button> -->

                        <button class="telephone-btn" @click="call(scope.row)">
                          <i class="iconfont icon-xiaoxi icon-msg-color"></i>
                        </button>
                    </template>
                </el-table-column>
            </el-table>
          </div>
          <div class="page">
            <el-pagination
              class="el-pagination"
              @current-change="twoLevelCurrentChange"
              :current-page.sync="twoLevelCurrentPage"
              :page-size="twoLevelPageSize"
              layout="total, prev, pager, next, jumper"
              :total="twoLevelTotal"
              prev-text="上一页"
              next-text="下一页">
            </el-pagination>
          </div>
        </el-card>
      </div>
      <!-- 二级管理结束 end -->

      <!-- 一级管理 start -->
      <div class="bottom-margin" id="oneLevel">
        <el-card :body-style="{ padding: '0px' }">
          <div class="card-header">
            <p class="title">一级管理</p>
          </div>
          <div class="table">
            <el-table 
            :data='oneLevelData'
            style="width: 100%"
            row-class-name="table-row"
            v-loading="oneLevelLoading">
                <el-table-column
                    prop="realName"
                    label="姓名"
                    width="100"
                    label-class-name="tableTitle">
                    <template slot-scope="scope">
                      <el-button type="text" @click="diagnose(scope.row)"
                      :style="{'color':'#1991fc','padding':0}">
                        {{scope.row.realName}}
                      </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="dangerLevelDisease"
                    label="分层依据"
                    label-class-name="tableTitle">
                    <template slot-scope="scope">   
                      <span> {{scope.row.dangerLevelDisease}}</span>                          
                      <span> {{scope.row.dangerLevelOrgan}}</span>                          
                      <span> {{scope.row.dangerLevelDanger}}</span>                         
                      <!-- <span> {{scope.row.dangerLevelDisease?'临床疾病':''}}</span>                           
                      <span> {{scope.row.dangerLevelOrgan?'靶器官损坏':''}}</span>                           
                      <span> {{scope.row.dangerLevelDanger?'危险因素':''}}</span>                            -->
                    </template>
                </el-table-column>
                <el-table-column
                    prop="dangerousCount"
                    label="近七日严重次数"
                    label-class-name="tableTitle">
                    <!-- <template slot-scope="scope">   
                      <span v-if="scope.row.bastThan"> {{scope.row.bastThan}}%</span>                           
                    </template> -->
                </el-table-column>
                <el-table-column
                    prop="joinHospitalTime"
                    label="加入时间"
                    label-class-name="tableTitle">
                </el-table-column>
                <el-table-column
                    prop="action"
                    label=""
                    width="275px"
                    align="center">
                    <template slot-scope="scope">
                        <el-button 
                        size="mini" 
                        type="primary" 
                        @click.native="isCare(scope.row,badsickData)" 
                        :key="scope.row.id" 
                        :style="{'width':'80px','color':'#fff'}"
                        >
                          <span v-if="scope.row.isDocusOn">取消关注</span>
                          <span v-if="!scope.row.isDocusOn">关注</span>
                        </el-button>
                        <!-- <el-button size="mini" type="primary" @click="diagnose(scope.row)" 
                        :style="{'width':'72px','color':'#fff'}">诊断</el-button> -->

                        <button class="telephone-btn" @click="call(scope.row)">
                          <i class="iconfont icon-xiaoxi icon-msg-color"></i>
                        </button>
                    </template>
                </el-table-column>
            </el-table>
          </div>
          <div class="page">
            <el-pagination
              class="el-pagination"
              @current-change="oneLevelCurrentChange"
              :current-page.sync="oneLevelCurrentPage"
              :page-size="oneLevelPageSize"
              layout="total, prev, pager, next, jumper"
              :total="oneLevelTotal"
              prev-text="上一页"
              next-text="下一页">
            </el-pagination>
          </div>
        </el-card>
      </div>
      <!-- 一级管理 end -->

      <!-- 易患人群 start -->
      <div class="workhead">
        <span>易患人群</span>
      </div>
      <div id="easySick">
        <el-card :body-style="{ padding: '0px' }">
          <!-- <div class="card-header">
            <p class="title">易患人群</p>
          </div> -->
          <div class="table">
            <el-table 
            :data='easySickData'
            style="width: 100%"
            row-class-name="table-row"
            v-loading="easySickLoading">
                <el-table-column
                    prop="realName"
                    label="姓名"
                    width="100"
                    label-class-name="tableTitle">
                    <template slot-scope="scope">
                      <el-button type="text" @click="diagnose(scope.row)"
                      :style="{'color':'#1991fc','padding':0}">
                        {{scope.row.realName}}
                      </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="dangerLevelDanger"
                    label="危险因素"
                    label-class-name="tableTitle">
                    <template slot-scope="scope">   
                      <span> {{scope.row.dangerLevelDisease}}</span>                          
                      <span> {{scope.row.dangerLevelOrgan}}</span>                          
                      <span> {{scope.row.dangerLevelDanger}}</span>                         
                      <!-- <span> {{scope.row.dangerLevelDisease?'临床疾病':''}}</span>                           
                      <span> {{scope.row.dangerLevelOrgan?'靶器官损坏':''}}</span>                           
                      <span> {{scope.row.dangerLevelDanger?'危险因素':''}}</span>                            -->
                    </template>
                </el-table-column>
                <el-table-column
                    prop="dangerousCount"
                    label="近7日平均血压"
                    label-class-name="tableTitle">
                    <template slot-scope="scope">   
                      <span v-if="scope.row.bastThan"> 
                        {{scope.row.systolicAvg}}/{{scope.row.systolicAvg}}
                        </span>                           
                    </template>
                </el-table-column>
                <el-table-column
                    prop="joinHospitalTime"
                    label="加入时间"
                    label-class-name="tableTitle">
                </el-table-column>
                <el-table-column
                    prop="action"
                    label=""
                    width="275px"
                    align="center">
                    <template slot-scope="scope">
                        <el-button 
                        size="mini" 
                        type="primary" 
                        @click.native="isCare(scope.row,badsickData)" 
                        :key="scope.row.id" 
                        :style="{'width':'80px','color':'#fff'}"
                        >
                          <span v-if="scope.row.isDocusOn">取消关注</span>
                          <span v-if="!scope.row.isDocusOn">关注</span>
                        </el-button>
                        <!-- <el-button size="mini" type="primary" @click="diagnose(scope.row)" 
                        :style="{'width':'72px','color':'#fff'}">诊断</el-button> -->

                        <button class="telephone-btn" @click="call(scope.row)">
                          <i class="iconfont icon-xiaoxi icon-msg-color"></i>
                        </button>
                    </template>
                </el-table-column>
            </el-table>
          </div>
          <div class="page">
            <el-pagination
              class="el-pagination"
              @current-change="easyCurrentChange"
              :current-page.sync="easySickCurrentPage"
              :page-size="easySickPageSize"
              layout="total, prev, pager, next, jumper"
              :total="easySickTotal"
              prev-text="上一页"
              next-text="下一页">
            </el-pagination>
          </div>
        </el-card>
      </div>
      <!-- 易患人群 end -->

      <!-- 未分层  start -->
      <div class="workhead">
        <span>未分层</span>
      </div>
      <div class="bottom-margin" id="noLevel">
        <el-card :body-style="{ padding: '0px' }">
          <!-- <div class="card-header">
            <p class="title">未分层</p>
          </div> -->
          <div class="table">
            <el-table 
            :data='noLevelData'
            style="width: 100%"
            row-class-name="table-row"
            v-loading="noLevelLoading">
                <el-table-column
                    prop="realName"
                    label="姓名"
                    width="100"
                    label-class-name="tableTitle">
                    <template slot-scope="scope">
                      <el-button type="text" @click="assessmentLayer(scope.row)"
                      :style="{'color':'#1991fc','padding':0}">
                        {{scope.row.realName}}
                      </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="age"
                    label="年龄"
                    label-class-name="tableTitle">
                </el-table-column>
                <el-table-column
                    prop="dangerousCount"
                    label="近7日平均血压"
                    label-class-name="tableTitle">
                    <template slot-scope="scope">   
                      <span v-if="scope.row.bastThan"> 
                        {{scope.row.systolicAvg}}/{{scope.row.systolicAvg}}
                        </span>                           
                    </template>
                </el-table-column>
                <el-table-column
                    prop="joinHospitalTime"
                    label="加入时间"
                    label-class-name="tableTitle">
                </el-table-column>
                <el-table-column
                    prop="action"
                    label=""
                    width="275px"
                    align="center">
                    <template slot-scope="scope">
                        <!-- <el-button 
                        size="mini" 
                        type="primary" 
                        @click.native="isCare(scope.row,badsickData)" 
                        :key="scope.row.id" 
                        :style="{'width':'80px','color':'#fff'}"
                        >
                          <span v-if="scope.row.isDocusOn">取消关注</span>
                          <span v-if="!scope.row.isDocusOn">关注</span>
                        </el-button> -->
                        <el-button size="mini" type="primary" @click="assessmentLayer(scope.row)" 
                        :style="{'width':'72px','color':'#fff'}">分层评估</el-button>

                        <button class="telephone-btn" @click="call(scope.row)">
                          <i class="iconfont icon-xiaoxi icon-msg-color"></i>
                        </button>
                    </template>
                </el-table-column>
            </el-table>
          </div>
          <div class="page">
              <!-- @size-change="badsickSizeChange" -->
            <el-pagination
              class="el-pagination"
              @current-change="noLevelCurrentChange"
              :current-page.sync="noLevelCurrentPage"
              :page-size="noLevelPageSize"
              layout="total, prev, pager, next, jumper"
              :total="noLevelTotal"
              prev-text="上一页"
              next-text="下一页">
            </el-pagination>
          </div>
        </el-card>
      </div>
      <!-- 未分层  end -->
    </div>
    
  </div>
</template>

<script>
import {layerSickApi, easyApi} from '@/api/components/bloodPersonManage/bloodPerson.js'
import {careApi} from '@/api/views/Hospital/BloodHeigh/H-work'
// import mpages from '@/components/cutpage.vue'
import {mapMutations, mapState} from 'vuex'
// import Bus from '@/bus.js'
export default {
  name: 'H-layer',
  // components: {
  //   mpages
  // },
  data () {
    return {
      adminHospitalId: null,
      // 未分层
      noLevelData: [],
      noLevelLoading: false,
      noLevelPageSize: 5,
      noLevelTotal: 1,
      noLevelCurrentPage: 1,
      // 三级管理
      threeLevelData: [],
      threeLevelLoading: false,
      threeLevelPageSize: 5,
      threeLevelTotal: 1,
      threeLevelCurrentPage: 1,
      // 二级管理
      twoLevelData: [],
      twoLevelLoading: false,
      twoLevelPageSize: 5,
      twoLevelTotal: 1,
      twoLevelCurrentPage: 1,
      // 一级管理
      oneLevelData: [],
      oneLevelLoading: false,
      oneLevelPageSize: 5,
      oneLevelTotal: 1,
      oneLevelCurrentPage: 1,
      // 易患
      easySickData: [],
      easySickLoading: false,
      easySickPageSize: 5,
      easySickTotal: 1,
      easySickCurrentPage: 1

    }
  },
  computed: {
    ...mapState({
      admin: state => state.adminInfo,
      userCasesCardId: state => state.userCasesCardId
    })
  },
  methods: {
    ...mapMutations(
      ['SET_SICK_CARD',
        'addChatFriend',
        'changeChatFriend',
        'openChatWindow',
        'setuserCasesCardId',
        'SET_CURRENT_SICK_DATA',
        'SET_FLUP_INFO'
      ]),
    sortSickList (arr) {
      let copyArr = arr
      let topArr = []
      copyArr.forEach((item, index) => {
        if (!item.isDocusOn) {
          topArr.push(item)
          // copyArr.splice(index, 1)
        } else {
          topArr.unshift(item)
        }
      })
      return topArr
    },
    isCare (val, data, isuserId) {
      let arr = data
      console.log(arr)
      let sickid = ''
      let hospitalid = ''
      let care = ''
      if (val && val.id) {
        sickid = val.id
      }
      if (val && val.adminHospitalId) {
        hospitalid = val.adminHospitalId
      }
      if (val && val.isDocusOn) {
        care = !val.isDocusOn + ''
      } else {
        if (val && !val.isDocusOn) {
          care = !val.isDocusOn + ''
        }
      }
      let params = {
        'adminHospitalId': hospitalid,
        'userId': sickid,
        'isDocusOn': care
      }
      this.$axios(careApi(params))
      .then(res => {
        if (res.data.code === '0000') {
          val.isDocusOn = !val.isDocusOn
          this.noLevelData = this.sortSickList(this.noLevelData)
          this.threeLevelData = this.sortSickList(this.threeLevelData)
          this.twoLevelData = this.sortSickList(this.twoLevelData)
          this.oneLevelData = this.sortSickList(this.oneLevelData)
          this.easySickData = this.sortSickList(this.easySickData)
        }
        if (res.data.code === '1001') {
        }
      })
    },
    noLevelCurrentChange (val) {   // 未分层页数变化
      this.getlayerData({
        dangerLevel: 0,
        pageNum: val,
        pageSize: this.noLevelPageSize
      })
    },
    threeLevelCurrentChange (val) {   // 三级管理页数变化
      this.getlayerData({
        dangerLevel: 3,
        pageNum: val,
        pageSize: this.noLevelPageSize
      })
    },
    twoLevelCurrentChange (val) {   // 未分层页数变化
      this.getlayerData({
        dangerLevel: 2,
        pageNum: val,
        pageSize: this.noLevelPageSize
      })
    },
    oneLevelCurrentChange (val) {   // 未分层页数变化
      this.getlayerData({
        dangerLevel: 1,
        pageNum: val,
        pageSize: this.noLevelPageSize
      })
    },
    easyCurrentChange (val) {   // 未分层页数变化
      this.easySickLoading = true
      this.$axios(easyApi({
        pageNum: val,
        pageSize: this.easySickPageSize
      }))
      .then(res => {
        if (res.data.data.length > 0) {
          this.easySickData = res.data.data
        }
        this.easySickLoading = false
      })
      .catch(err => {
        console.log(err)
        this.easySickLoading = false
      })
    },
    getlayerData (params) {
      if (params.dangerLevel === 0) {
        this.noLevelLoading = true
      }
      if (params.dangerLevel === 1) {
        this.oneLevelLoading = true
      }
      if (params.dangerLevel === 2) {
        this.twoLevelLoading = true
      }
      if (params.dangerLevel === 3) {
        this.threeLevelLoading = true
      }
      this.$axios(layerSickApi({
        dangerLevel: params.dangerLevel,
        pageNum: params.pageNum,
        pageSize: params.pageSize
      }))
      .then(res => {
        if (res.data.data.length > 0) {
          if (params.dangerLevel === 0) {
            this.noLevelData = res.data.data
            this.noLevelLoading = false
          }
          if (params.dangerLevel === 1) {
            this.oneLevelData = res.data.data
            this.oneLevelLoading = false
          }
          if (params.dangerLevel === 2) {
            this.twoLevelData = res.data.data
            this.twoLevelLoading = false
          }
          if (params.dangerLevel === 3) {
            this.threeLevelData = res.data.data
            this.threeLevelLoading = false
          }
        }
        if (params.dangerLevel === 0) {
          this.noLevelLoading = false
        }
        if (params.dangerLevel === 1) {
          this.oneLevelLoading = false
        }
        if (params.dangerLevel === 2) {
          this.twoLevelLoading = false
        }
        if (params.dangerLevel === 3) {
          this.threeLevelLoading = false
        }
      })
      .catch(err => {
        console.log(err)
        if (params.dangerLevel === 0) {
          this.noLevelLoading = false
        }
        if (params.dangerLevel === 1) {
          this.oneLevelLoading = false
        }
        if (params.dangerLevel === 2) {
          this.twoLevelLoading = false
        }
        if (params.dangerLevel === 3) {
          this.threeLevelLoading = false
        }
      })
    },
    // newdiagnose (row, val) {
    //   let userId
    //   userId = row.userId
    //   this.$router.push({name: 'bloodheighSick',
    //     params: {
    //       sickID: userId
    //     }})
    //   this.SET_CURRENT_SICK_DATA({
    //     sickID: userId,
    //     hospitalId: row.adminHospitalId
    //   })
    // },
    diagnose (row, isuserId) {
      let id
      if (isuserId) {
        id = row.userId
      } else {
        id = row.id
      }
      console.log(row)
      this.$router.push({name: 'bloodheighSick',
        params: {
          sickID: id
        }})
      this.SET_CURRENT_SICK_DATA({
        sickID: id,
        hospitalId: row.adminHospitalId
      })
    },
    call (row, isuserId) {
      console.log('聊天对象', row)
      let rongId
      if (isuserId) {
        rongId = 'member_' + row.userId
      } else {
        rongId = 'member_' + row.id
      }
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
    assessmentLayer (val) {
      let obj = {}
      obj.isFollowUp = false
      obj.adminIdMainDoctor = null
      obj.userId = val.id
      obj.userFollowUpId = val.id
      obj.userName = val.realName
      obj.userHealthDiaryId = null
      obj.adminHospitalId = val.adminHospitalId
      console.log('分层评估', obj)
      this.SET_FLUP_INFO(obj)
      this.$router.push({
        name: 'dangerLayer'
      })
    }
  },
  mounted () {
    if (this.admin && this.admin.adminHospitalId) {
      this.adminHospitalId = this.admin.adminHospitalId
    }
    this.noLevelCurrentChange(1)
    this.threeLevelCurrentChange(1)
    this.twoLevelCurrentChange(1)
    this.oneLevelCurrentChange(1)
    this.easyCurrentChange(1)
  }
}
</script>

<style scoped>
.work {
  margin-top: 30px;
}
.workhead {
  margin-left: 24px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 24px;
  color: #041421;
  /* background: #f4f6f9; */
}

.page {
  margin-top:26px;
  margin-bottom: 24px;
  margin-right: 30px;
  font-size: 16px !important;
  text-align: right;
  vertical-align: middle;
}
.el-pagination{
  font-size: 16px;
}
.work-msg{
  position: relative;
  
}
.iconfont-tip{
  color: #666;
  font-size: 30px;
}
.work-icon{
  position: relative;
  width: 10px;
  height: 20px;
  display: block;
}
.work-icon::after{
    /* top: -18px; */
    right: -25px;
    position: absolute;
    content: '';
    width: 30px;
    height: 27px;
    background: url('~icon/hospital-icon-21.png') no-repeat;
}
.workMsgtip::after{
  top: 5px;
  right: -20px;
  position: absolute;
  content: '';
  width: 15px;
  height: 15px;
  background: url('~icon/hospital-icon-10.png') no-repeat;
}
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
.table{
  margin: 8px 20px 0 20px;
}
.bottom-margin{
  margin-bottom: 8px;
}
.tableTitle{
  height: 20px;
  color: #041421;
  font-size:16px;
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
.telephone-btn-icon::after{
  cursor: pointer;
  position: absolute;
  /* top:3px;  */
  bottom:0;
  content: '';
  width: 21px;
  height: 21px;
  background: url('~icon/hospital-icon-23.png') no-repeat;
}
.icon-msg-color{
  color: #1991fc;
  font-size: 20px;
  margin-left: 8px;
}
</style>
<style>
.tableTitle{
  /* height: 18px; */
  color: #041421;
  font-size:16px;
  margin:8px 0 7px 0;
}
.table-row td{
  /* background-color:#111; */
  padding: 5px 0;
}
.el-button{
  /* font-size:14px; */
  padding:7px 10px;
  border-radius:2px;
}
/* .table-col{
  color:#1991fc;
} */
/* .el-table thead {
    color: #041421;
    font-size:16px;
    } */
</style>
