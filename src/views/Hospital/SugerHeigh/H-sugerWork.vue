<template>
  <div class='work'>
    <!-- 工作台 start -->
    <div class="workhead">
      <span>工作台</span>
        <el-button type="text" @click="msgTipBtn" class="work-msg">
          <i class="work-icon" @click="msgTipBtn"></i>
          <i :class="{'workMsgtip':showMsgTip}"></i>
        </el-button>
    </div>
    <el-card :body-style="{padding: '0px'}">
    <!-- 工作台 end -->

      <!-- 患者最新问诊  start -->
      <div class="bottom-margin" id="sugerNew">
        <el-card :body-style="{ padding: '0px' }">
          <div class="card-header">
            <p class="title">患者最新问诊</p>
          </div>
          <div class="table">
            <el-table 
                :data='newsickaskData'
                style="width: 100%"
                row-class-name="table-row">
                <el-table-column
                    prop="realName"
                    label="姓名"
                    label-class-name="tableTitle"
                    class-name="table-col"
                    width="200">
                    <template slot-scope="scope">
                      <el-button type="text" @click="diagnose(scope.row)"
                      :style="{'color':'#1991fc'}">
                        {{scope.row.realName}}
                      </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="问诊时间"
                    label-class-name="tableTitle"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="readme"
                    label="咨询主题"
                    label-class-name="tableTitle">
                </el-table-column>
                <el-table-column
                    prop="action"
                    label=""
                    width="150">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="diagnose(scope.row)"
                        :style="{'width':'72px','backgroundColor':'#1991fc','color':'#fff'}">诊断</el-button>
                    </template>
                </el-table-column>
            </el-table>
          </div>
          <div class="page">
            <el-pagination
              class="el-pagination"
              @size-change="newAskSizeChange"
              @current-change="newAskCurrentChange"
              :current-page.sync="newAskCurrentPage"
              :page-size="newAskPageSize"
              layout="total, prev, pager, next, jumper"
              :total="newAskTotal"
              prev-text="上一页"
              next-text="下一页">
            </el-pagination>
          </div>
        </el-card>
      </div>
      <!-- 患者最新问诊  end -->

      <!-- 严重患者 start -->
      <div class="bottom-margin" id="sugerBad">
        <el-card :body-style="{ padding: '0px' }">
          <div class="card-header">
            <p class="title">严重患者({{badsickTotal }})</p>
          </div>
          <div class="table">
            <el-table 
                :data='badsickData'
                style="width: 100%"
                row-class-name="table-row">
                <el-table-column
                    prop="realName"
                    label="姓名"
                    label-class-name="tableTitle">
                    <template slot-scope="scope">
                      <el-button type="text" @click="diagnose(scope.row)"
                      :style="{'color':'#1991fc'}">
                        {{scope.row.realName}}
                      </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="sicktype"
                    label="患者类型"
                    label-class-name="tableTitle">
                </el-table-column>
                <el-table-column
                    prop="bastThan"
                    label="严重比例"
                    label-class-name="tableTitle">
                    <template slot-scope="scope">   
                      <span v-if="scope.row.bastThan"> {{scope.row.bastThan}}%</span>                                        
                    </template>
                </el-table-column>
                <el-table-column
                    prop="nowCount"
                    label="今日严重次数"
                    label-class-name="tableTitle">
                </el-table-column>
                <el-table-column
                    prop="joinHospitalTime"
                    label="加入时间"
                    label-class-name="tableTitle">
                </el-table-column>
                <el-table-column
                    prop="action"
                    label=""
                    width="275px">
                    <template slot-scope="scope">
                        <el-button 
                        size="mini" 
                        type="primary" 
                        @click.native="isCare(scope.row)" 
                        :key="scope.row.id" 
                        :style="{'width':'80px','backgroundColor':'#1991fc','color':'#fff'}"
                        >
                          <span v-if="scope.row.isDocusOn">取消关注</span>
                          <span v-if="!scope.row.isDocusOn">关注</span>
                        </el-button>
                        <el-button size="mini" type="primary" @click="diagnose(scope.row)" 
                        :style="{'width':'72px','backgroundColor':'#1991fc','color':'#fff'}">诊断</el-button>
                        <button class="telephone-btn" @click="call(scope.row)"><i class="telephone-btn-icon"></i></button>
                        <!-- <el-button size="mini" icon="el-icon-phone-outline" @click="call(scope.row)">电话</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
          </div>
          <!-- <div>
            <mpages :pages="20" @jumpPage="jumppage"></mpages>
          </div> -->
          <div class="page">
            <el-pagination
              class="el-pagination"
              @size-change="badsickSizeChange"
              @current-change="badsickCurrentChange"
              :current-page.sync="badsickCurrentPage"
              :page-size="badsickPageSize"
              layout="total, prev, pager, next, jumper"
              :total="badsickTotal"
              prev-text="上一页"
              next-text="下一页">
            </el-pagination>
          </div>
        </el-card>
      </div>
      <!-- 严重患者结束 end -->

      <!-- 未遵医嘱患者 start -->
      <div class="bottom-margin" id="sugerNolisten">
        <el-card :body-style="{ padding: '0px' }">
          <div class="card-header">
            <p class="title">未遵医嘱患者({{noListenDoctorRate }})</p>
          </div>
          <div class="table">

            <el-table 
                :data='noListenDoctorData'
                style="width: 100%"
                row-class-name="table-row">
                <el-table-column
                    prop="realName"
                    label="姓名"
                    label-class-name="tableTitle">
                      <template slot-scope="scope">
                        <el-button type="text" @click="diagnose(scope.row)"
                        :style="{'color':'#1991fc'}">
                          {{scope.row.realName}}
                        </el-button>
                      </template>
                </el-table-column>
                <el-table-column
                    prop="sicktype"
                    label="患者类型"
                    label-class-name="tableTitle">
                </el-table-column>
                <el-table-column
                    prop="bastThan"
                    label="未遵医嘱比例"
                    label-class-name="tableTitle">
                    <template slot-scope="scope">   
                      <span v-if="scope.row.bastThan"> {{scope.row.bastThan}}%</span>                                        
                    </template>
                </el-table-column>
                <el-table-column
                    prop="notCount"
                    label="未遵医嘱"
                    label-class-name="tableTitle">
                    <template slot-scope="scope">   
                      <span> {{scope.row.notCount}}天（共{{scope.row.count+'天'}}）</span>                                        
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
                    width="275px">
                    <template slot-scope="scope">
                        <el-button 
                        size="mini" 
                        type="primary" 
                        @click.native="isCare(scope.row)" 
                        :key="scope.row.id" 
                        :style="{'width':'80px','backgroundColor':'#1991fc','color':'#fff'}"
                        >
                          <span v-if="scope.row.isDocusOn">取消关注</span>
                          <span v-if="!scope.row.isDocusOn">关注</span>
                        </el-button>
                        <el-button size="mini" type="primary" 
                        @click="diagnose(scope.row)" 
                        :style="{'width':'72px','backgroundColor':'#1991fc','color':'#fff'}">
                        诊断
                        </el-button>
                        <button class="telephone-btn" @click="call(scope.row)"><i class="telephone-btn-icon"></i></button>
                    </template>
                </el-table-column>
            </el-table>
          </div>
          <div class="page">
            <el-pagination
              class="el-pagination"
              @size-change="nolistenSizeChange"
              @current-change="nolistenCurrentchange"
              :current-page.sync="nolistenCurrentPage"
              :page-size="nolistenPageSize"
              layout="total, prev, pager, next, jumper"
              :total="nolistenTotal"
              prev-text="上一页"
              next-text="下一页">
            </el-pagination>
          </div>
          
        </el-card>
      </div>
      <!-- 未遵医嘱患者 end -->

      <!-- 建档不完整患者 start -->
      <div id="sugerUnperfect">
        <el-card :body-style="{ padding: '0px' }">
          <div class="card-header">
            <p class="title">建档不完整患者({{unperfectMsgRate}})</p>
          </div>
          <div class="table">

            <el-table 
                :data='unperfectMsgData'
                row-class-name="table-row"
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="姓名"
                    label-class-name="tableTitle">
                      <template slot-scope="scope">
                        <el-button type="text" @click="diagnose(scope.row)"
                        :style="{'color':'#1991fc'}">
                          {{scope.row.name}}
                        </el-button>
                      </template>
                </el-table-column>
                <el-table-column
                    prop="sicktype"
                    label="sicktype"
                    label-class-name="tableTitle">
                </el-table-column>
                <el-table-column
                    prop="badrate"
                    label="严重比例"
                    label-class-name="tableTitle">
                </el-table-column>
                <el-table-column
                    prop="unperfectMsg"
                    label="不完整程度"
                    label-class-name="tableTitle">
                </el-table-column>
                <el-table-column
                    prop="addtime"
                    label="加入时间"
                    label-class-name="tableTitle">
                </el-table-column>
                <el-table-column
                    prop="action"
                    label=""
                    width="275px">
                    <template slot-scope="scope">
                        <el-button 
                        size="mini" 
                        type="primary" 
                        @click.native="isCare(scope.$index,unperfectMsgData.data)" 
                        :key="scope.row.id" 
                        :style="{'width':'80px','backgroundColor':'#1991fc','color':'#fff'}"
                        >
                          <span v-if="scope.row.isDocusOn">取消关注</span>
                          <span v-if="!scope.row.isDocusOn">关注</span>
                        </el-button>
                        <el-button size="mini" type="primary" @click="diagnose(scope.row)" 
                        :style="{'width':'72px','backgroundColor':'#1991fc','color':'#fff'}">去完善</el-button>
                        <button class="telephone-btn" @click="call(scope.row)"><i class="telephone-btn-icon"></i></button>
                        <!-- <el-button size="mini" icon="el-icon-phone-outline" @click="call(scope.row)">电话</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
          </div>
          <div class="page">
            <el-pagination
              class="el-pagination"
              @size-change="handleSizeChange"
              @current-change="unperfectChangepage"
              :current-page.sync="currentPage"
              :page-size="newsickaskData.pageSize"
              layout="total, prev, pager, next, jumper"
              :total="newsickaskData.totalPage"
              prev-text="上一页"
              next-text="下一页">
            </el-pagination>
          </div>
        </el-card>
      </div>
      <!-- 建档不完整患者 end -->
    </el-card>
    
  </div>
</template>

<script>
// import from './../../../../hospitalImage/hospitalIcon/诊所-icon-21.png'
import { mapState } from 'vuex'
// import {careText, care} from './../../../untils/untils'
import {
  newsickaskDataApi,
  badsickDataApi,
  noListenDoctorDataApi,
  careApi} from './../../../api/views/Hospital/BloodHeigh/H-work'
import mpages from './../../../components/cutpage.vue'
export default {
  name: 'H-work',
  components: {
    mpages
  },
  data () {
    return {
      showMsgTip: true,    // 初始化时需设置为false
      badSickRate: '',
      noListenDoctorRate: '',
      unperfectMsgRate: '',
      unperfectMsgData: [],
      currentPage: 1,
      totalSize: 15,
      // 整理后数据
      newsickaskData: [],
      badsickData: [],
      // badsickTotal:'',
      noListenDoctorData: [],

      adminHospitalId: '',
      // careState: '',
      // 分页数据
      newAskCurrentPage: 1,
      newAskPageSize: 5,
      newAskTotal: 1,

      badsickCurrentPage: 1,
      badsickPageSize: 5,
      badsickTotal: 1,

      nolistenCurrentPage: 1,
      nolistenPageSize: 5,
      nolistenTotal: 1
    }
  },
  computed: {
    ...mapState({
      admin: state => state.adminInfo
    })
  },
  methods: {
    // jumppage (page) {
    //   // console.log(page, 266)
    // },
    // careText (boolean) {
    //   if (boolean) {
    //     return '取消关注'
    //   } else {
    //     return '关注'
    //   }
    // },
    isCare (val) {
      let sickid = '1'
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
        }
        if (res.data.code === '1001') {
        }
      })
    },
    newAskRequest (params) {
      params.hospitalId = params.hospitalId || this.adminHospitalId
      this.$axios(newsickaskDataApi(
        params.hospitalId, params.currentPage, params.pageSize
      )).then(res => {
        if (res.data) {
          if (res.data.data.length !== 0) {
            this.newsickaskData = res.data.data
          }
        }
        this.newAskTotal = res.data.recordCount
        this.newAskPageSize = res.data.pageSize
      })
    },
    newAskSizeChange (val) {  // 患者最新问诊  每页显示数量变化
      console.log(`每页 ${val} 条`)
    },
    newAskCurrentChange (val) {   // 患者最新问诊页数变化
      this.newAskRequest({
        hospitalId: this.adminHospitalId,
        currentPage: val,
        pageSize: this.newAskPageSize
      })
    },

    badsickRequest (params) {
      params.hospitalId = params.hospitalId || this.adminHospitalId
      this.$axios(badsickDataApi(
        params.hospitalId, params.currentPage, params.pageSize
      )).then(res => {
        if (res.data && res.data.data.length !== 0) {
          this.badsickData = res.data.data
        }
        this.badsickTotal = res.data.recordCount
        this.badsickPageSize = res.data.pageSize
      })
    },

    badsickSizeChange (val) {},

    badsickCurrentChange (val) {
      this.badsickRequest({
        hospitalId: this.adminHospitalId,
        currentPage: val,
        pageSize: this.badsickPageSize
      })
    },

    nolistenRequest (params) {
      params.hospitalId = params.hospitalId || this.adminHospitalId
      this.$axios(noListenDoctorDataApi(
        params.hospitalId, params.currentPage, params.pageSize
      )).then(res => {
        this.noListenDoctorData = res.data.data
        this.nolistenTotal = res.data.recordCount
        this.nolistenPageSize = res.data.pageSize
      })
    },
    nolistenSizeChange (val) {},
    nolistenCurrentchange (val) {
      this.nolistenRequest({
        hospitalId: this.adminHospitalId,
        currentPage: val,
        pageSize: this.nolistenPageSize
      })
    },
    handleSizeChange () {},

    unperfectChangepage (val) {   // 患者最新问诊页数变化
      console.log(`当前页: ${val}`)
    },
    msgTipBtn () {
      this.$router.push({
        name: 'accountSetting'
      })
    },
    diagnose (row) {
      console.log(row)
      this.$router.push({name: 'bloodheighSick',
        params: {
          sickID: row.id,
          hospitalId: row.adminHospitalId
        }})
    },
    call (row) {
      console.log(row.mobile)
    },
    handlePersonMsg (row, column, cell, event) {
    }
  },
  mounted () {
    if (this.admin && this.admin.adminHospitalId) {
      this.adminHospitalId = this.admin.adminHospitalId
    }
    this.newAskRequest({
      hospitalId: this.adminHospitalId,
      currentPage: this.newAskCurrentPage,
      pageSize: this.newAskPageSize
    })
    this.badsickRequest({
      hospitalId: this.adminHospitalId,
      currentPage: this.badsickCurrentPage,
      pageSize: this.badsickPageSize
    })
    this.nolistenRequest({
      hospitalId: this.adminHospitalId,
      currentPage: this.nolistenCurrentPage,
      pageSize: this.nolistenPageSize
    })
  }
}
</script>

<style scoped>
.work {
  margin-top: 30px;
}
.workhead {
  margin-left: 24px;
  margin-bottom: 10px;
  font-size: 24px;
  color: #041421;
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
.work-icon{
  position: relative;
  width: 10px;
  display: block;
}
.work-icon::after{
    top: -18px;
    right: -25px;
    position: absolute;
    content: '';
    width: 30px;
    height: 27px;
    background: url('./../../../../hospitalImage/hospitalIcon/诊所-icon-21.png') no-repeat;
}
.workMsgtip::after{
  top: -10px;
  right: -30px;
  position: absolute;
  content: '';
  width: 15px;
  height: 15px;
  background: url('./../../../../hospitalImage/hospitalIcon/诊所-icon-10.png') no-repeat;
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
  font-size:14px;
}
.telephone-btn{
  border: none;
  outline: none;
  background-color: #fff;
  height: 21px;
  width: 21px;
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
  background: url('./../../../../hospitalImage/hospitalIcon/诊所-icon-23.png') no-repeat;
}
</style>
<style>
.tableTitle{
  /* height: 18px; */
  color: #041421;
  font-size:14px;
  margin:8px 0 7px 0;
}
.table-row td{
  /* background-color:#111; */
  padding:5px;
}
/* .table-col{
  color:#1991fc;
} */
/* .el-table thead {
    color: #041421;
    font-size:14px;
    } */
</style>
