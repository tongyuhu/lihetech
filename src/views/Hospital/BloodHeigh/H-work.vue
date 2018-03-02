<template>
  <div class='work'>
    <!-- 工作台 start -->
    <div class="workhead">
      <span>工作台</span>
      <!-- <i class="work-icon"></i> -->
      <!-- <el-badge :value="msgTip" :max="99" class="item" is-dot> -->
        <el-button type="text" @click="msgTipBtn" class="work-msg">
          <!-- 。。 -->
          <i class="work-icon" @click="msgTipBtn"></i>
          <i :class="{workMsgtip:showMsgTip}"></i>
        </el-button>
         <!-- <button><i class="work-icon"></i></button> -->
      <!-- </el-badge> -->
    </div>
    <el-card :body-style="{padding: '0px'}">
    <!-- 工作台 end -->

      <!-- 患者最新问诊  start -->
      <div class="bottom-margin">
        <el-card :body-style="{ padding: '0px' }">
          <div class="card-header">
            <p class="title">患者最新问诊</p>
          </div>
          <div class="table">
            <el-table 
                :data='newsickaskData.sickList'
                style="width: 100%"
                row-class-name="table-row">
                <el-table-column
                    prop="name"
                    label="姓名"
                    label-class-name="tableTitle"
                    class-name="table-col"
                    width="200">
                    <template slot-scope="scope">
                      <el-button type="text" @click="diagnose(scope.row)"
                      :style="{'color':'#1991fc'}">
                        {{scope.row.name}}
                      </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="asktime"
                    label="问诊时间"
                    label-class-name="tableTitle"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="asktopic"
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
              @size-change="handleSizeChange"
              @current-change="newaskChangepage"
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
      <!-- 患者最新问诊  end -->

      <!-- 严重患者 start -->
      <div class="bottom-margin">
        <el-card :body-style="{ padding: '0px' }">
          <div class="card-header">
            <p class="title">严重患者({{ badSickRate }})</p>
          </div>
          <div class="table">

            <el-table 
                :data='badsickData'
                style="width: 100%"
                row-class-name="table-row">
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
                    label="患者类型"
                    label-class-name="tableTitle">
                </el-table-column>
                <el-table-column
                    prop="badrate"
                    label="严重比例"
                    label-class-name="tableTitle">
                </el-table-column>
                <el-table-column
                    prop="todaytimes"
                    label="今日严重次数"
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
                        @click.native="care(scope.$index,badsickData)" 
                        :key="scope.row.id" 
                        :style="{'width':'80px','backgroundColor':'#1991fc','color':'#fff'}"
                        v-if="scope.row.care">
                          {{careText(scope.row.care)}}
                        </el-button>
                        <el-button 
                        v-else
                        size="mini" 
                        type="plain" 
                        @click.native="care(scope.$index,badsickData)" 
                        :key="scope.row.id" :style="{'width':'80px','backgroundColor':'#1991fc','color':'#fff'}"
                        >
                          {{careText(scope.row.care)}}
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
              @size-change="handleSizeChange"
              @current-change="badsickChangepage"
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
      <!-- 严重患者结束 end -->

      <!-- 未遵医嘱患者 start -->
      <div class="bottom-margin">
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
                    prop="noListenDoctor"
                    label="未遵医嘱"
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
                        @click.native="care(scope.$index,noListenDoctorData)" 
                        :key="scope.row.id" 
                        :style="{'width':'80px','backgroundColor':'#1991fc','color':'#fff'}"
                        v-if="scope.row.care">
                          {{careText(scope.row.care)}}
                        </el-button>
                        <el-button 
                        v-else
                        size="mini" 
                        type="primary" 
                        @click.native="care(scope.$index,noListenDoctorData)" 
                        :key="scope.row.id" :style="{'width':'80px','backgroundColor':'#1991fc','color':'#fff'}"
                        >
                          {{careText(scope.row.care)}}
                        </el-button>
                        <el-button size="mini" type="primary" @click="diagnose(scope.row)" 
                        :style="{'width':'72px','backgroundColor':'#1991fc','color':'#fff'}">诊断</el-button>
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
              @current-change="nolistenChangepage"
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
      <!-- 未遵医嘱患者 end -->

      <!-- 建档不完整患者 start -->
      <div>
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
                        @click.native="care(scope.$index,unperfectMsgData)" 
                        :key="scope.row.id" 
                        :style="{'width':'80px','backgroundColor':'#1991fc','color':'#fff'}"
                        v-if="scope.row.care">
                          {{careText(scope.row.care)}}
                        </el-button>
                        <el-button 
                        v-else
                        size="mini" 
                        type="plain" 
                        @click.native="care(scope.$index,unperfectMsgData)" 
                        :key="scope.row.id" :style="{'width':'80px','backgroundColor':'#1991fc','color':'#fff'}"
                        >
                          {{careText(scope.row.care)}}
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
// import from './../../../../诊所-高血压/hospitalIcon/诊所-icon-21.png'
import {careText, care} from './../../../untils/untils'
import {
  newsickaskDataApi,
  badsickDataApi,
  noListenDoctorDataApi,
  unperfectMsgDataApi} from './../../../api/views/Hospital/BloodHeigh/H-work'
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
      newsickaskData: {},
      badsickData: [],
      noListenDoctorData: [],
      unperfectMsgData: [],
      currentPage: 1,
      // page: 'page'
      totalSize: 15
    }
  },
  methods: {
    jumppage (page) {
      console.log(page, 266)
    },
    careText,
    care,
    handleSizeChange (val) {  // 患者最新问诊
      console.log(`每页 ${val} 条`)
    },
    newaskChangepage (val) {   // 患者最新问诊页数变化
      console.log(`当前页: ${val}`)
      this.newsickaskDataRUS()
    },
    badsickChangepage (val) {   // 患者最新问诊页数变化
      console.log(`当前页: ${val}`)
      this.newsickaskDataRUS()
    },
    nolistenChangepage (val) {   // 患者最新问诊页数变化
      console.log(`当前页: ${val}`)
      this.newsickaskDataRUS()
    },
    unperfectChangepage (val) {   // 患者最新问诊页数变化
      console.log(`当前页: ${val}`)
      this.newsickaskDataRUS()
    },
    // diagnose,
    msgTipBtn () {
      this.$router.push({
        name: 'accountSetting'
      })
    },
    diagnose (row) {
      this.$router.push({name: 'bloodheighSick',
        params: {
          sickID: row.id
          // sickName: row.name,
          // sickId: row.id
        }})
    },
    call (row) {
      console.log(row.id)
    },
    handlePersonMsg (row, column, cell, event) {
      // console.log(row, column, cell, event)
      // console.log(row)
      // console.log(column)
      // console.log(cell)
      // console.log(event)
      // console.log(row.name)
    },
    newsickaskDataRUS  () {
      return this.$axios(newsickaskDataApi(this.currentPage))
    },
    badsickDataRUS  () {
      return this.$axios(badsickDataApi)
    },
    noListenDoctorDataRUS  () {
      return this.$axios(noListenDoctorDataApi)
    },
    unperfectMsgDataRUS  () {
      return this.$axios(unperfectMsgDataApi)
    }
  },
  mounted () {
    this.$axios.all([
      this.newsickaskDataRUS(),
      this.badsickDataRUS(),
      this.noListenDoctorDataRUS(),
      this.unperfectMsgDataRUS()])
    .then(this.$axios.spread((a, b, c, d) => {
      this.newsickaskData = a.data

      this.badSickRate = b.data.badSickRate
      this.badsickData = b.data.sickList

      this.noListenDoctorRate = c.data.noListenDoctorRate
      this.noListenDoctorData = c.data.sickList

      this.unperfectMsgRate = d.data.unperfectMsgRate
      this.unperfectMsgData = d.data.sickList

      // console.log(a)
      // console.log(b)
      // console.log(c)
      // console.log(d)
      // 两个请求现在都执行完成
    }))
    .catch(err => {
      console.log(err)
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
/* .table-col{
  cursor: pointer;
  color:rgb(29, 52, 155);
}
.table-col-label{
  cursor: none;
  color: rgb(13, 13, 14);
} */
.item{
  /* margin-right: 20px; */
}
.page {
  margin-top:26px;
  margin-bottom: 24px;
  margin-right: 30px;
  /* height: 60px; */
  /* line-height: 60px; */
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
    background: url('./../../../../诊所-高血压/hospitalIcon/诊所-icon-21.png') no-repeat;
}
.workMsgtip::after{
  top: -10px;
  right: -30px;
  position: absolute;
  content: '';
  width: 15px;
  height: 15px;
  background: url('./../../../../诊所-高血压/hospitalIcon/诊所-icon-10.png') no-repeat;
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
  height: 28px;
  padding: 0;
  margin:0;
  position: relative;
  cursor: pointer;
  margin-left: 10px;
}
.telephone-btn-icon::after{
  position: absolute;
  content: '';
  width: 30px;
  height: 27px;
  background: url('./../../../../诊所-高血压/hospitalIcon/诊所-icon-23.png') no-repeat;
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
