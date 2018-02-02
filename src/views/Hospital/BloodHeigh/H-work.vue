<template>
  <div class='work'>
    <el-card :body-style="{padding: '0px', paddingTop: '15px'}">
      <!-- 工作台 start -->
      <div class="workhead">
        <el-badge :value="msgTip" :max="99" class="item">
          <el-button  icon="el-icon-message" type="primary" @click="msgTipBtn"></el-button>
        </el-badge>
        <span>工作台</span>
      </div>
      <!-- 工作台 end -->

      <!-- 患者最新问诊  start -->
      <div>
        <el-card :body-style="{ paddingBottom: '10px' }">
          <div slot="header">
            <span>患者最新问诊</span>
          </div>
          <el-table 
              :data='newsickaskData.sickList'
              stripe
              style="width: 100%">
              <el-table-column
                  prop="name"
                  label="姓名">
                  <template slot-scope="scope">
                    <el-button type="text" @click="diagnose(scope.row)">
                      {{scope.row.name}}
                    </el-button>
                  </template>
              </el-table-column>
              <el-table-column
                  prop="asktime"
                  label="问诊时间">
              </el-table-column>
              <el-table-column
                  prop="asktopic"
                  label="咨询主题">
              </el-table-column>
              <el-table-column
                  prop="action"
                  label=""
                  width="90">
                  <template slot-scope="scope">
                      <el-button size="mini" type="primary" @click="diagnose(scope.row)">诊断</el-button>
                  </template>
              </el-table-column>
          </el-table>
          <div class="page">
            <!-- <span>
              共{{totalSize}}
            </span> -->
            <el-pagination
              class="el-pagination"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="newsickaskData.pageSize"
              layout="total, prev, pager, next, jumper"
              :total="newsickaskData.totalPage">
            </el-pagination>
          </div>
        </el-card>
      </div>
      <!-- 患者最新问诊  end -->

      <!-- 严重患者 start -->
      <div>
        <el-card>
          <div slot="header">
            <span>严重患者({{ badSickRate }})</span>
          </div>
          <el-table 
              :data='badsickData'
              stripe
              style="width: 100%">
              <el-table-column
                  prop="name"
                  label="姓名"
                  class-name="table-col"
                  label-class-name="table-col-label">
                  <template slot-scope="scope">
                    <el-button type="text" @click="diagnose(scope.row)">
                      {{scope.row.name}}
                    </el-button>
                  </template>
              </el-table-column>
              <el-table-column
                  prop="sicktype"
                  label="患者类型">
              </el-table-column>
              <el-table-column
                  prop="badrate"
                  label="严重比例">
              </el-table-column>
              <el-table-column
                  prop="todaytimes"
                  label="今日严重次数">
              </el-table-column>
              <el-table-column
                  prop="addtime"
                  label="加入时间">
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
                      :style="{'width':'80px'}"
                      v-if="scope.row.care">
                        {{careText(scope.row.care)}}
                      </el-button>
                      <el-button 
                      v-else
                      size="mini" 
                      type="plain" 
                      @click.native="care(scope.$index,badsickData)" 
                      :key="scope.row.id" :style="{'width':'80px'}"
                      >
                        {{careText(scope.row.care)}}
                      </el-button>
                      <el-button size="mini" type="primary" @click="diagnose(scope.row)" >诊断</el-button>
                      <el-button size="mini" icon="el-icon-phone-outline" @click="call(scope.row)">电话</el-button>
                  </template>
              </el-table-column>
          </el-table>
          <div>
            <mpages :pages="20" @jumpPage="jumppage"></mpages>
          </div>
        </el-card>
      </div>
      <!-- 严重患者结束 end -->

      <!-- 未遵医嘱患者 start -->
      <div>
        <el-card>
          <div slot="header">
            <span>未遵医嘱患者({{noListenDoctorRate }})</span>
          </div>
          <el-table 
              :data='noListenDoctorData'
              stripe
              style="width: 100%">
              <el-table-column
                  prop="name"
                  label="姓名">
                    <template slot-scope="scope">
                      <el-button type="text" @click="diagnose(scope.row)">
                        {{scope.row.name}}
                      </el-button>
                    </template>
              </el-table-column>
              <el-table-column
                  prop="sicktype"
                  label="sicktype">
              </el-table-column>
              <el-table-column
                  prop="badrate"
                  label="严重比例">
              </el-table-column>
              <el-table-column
                  prop="noListenDoctor"
                  label="未遵医嘱">
              </el-table-column>
              <el-table-column
                  prop="addtime"
                  label="加入时间">
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
                      :style="{'width':'80px'}"
                      v-if="scope.row.care">
                        {{careText(scope.row.care)}}
                      </el-button>
                      <el-button 
                      v-else
                      size="mini" 
                      type="plain" 
                      @click.native="care(scope.$index,noListenDoctorData)" 
                      :key="scope.row.id" :style="{'width':'80px'}"
                      >
                        {{careText(scope.row.care)}}
                      </el-button>
                      <el-button size="mini" type="primary" @click="diagnose(scope.row)" >诊断</el-button>
                      <el-button size="mini" icon="el-icon-phone-outline" @click="call(scope.row)">电话</el-button>
                  </template>
              </el-table-column>
          </el-table>
        </el-card>
      </div>
      <!-- 未遵医嘱患者 end -->

      <!-- 建档不完整患者 start -->
      <div>
        <el-card>
          <div slot="header">
            <span>建档不完整患者({{unperfectMsgRate}})</span>
          </div>
          <el-table 
              :data='unperfectMsgData'
              stripe
              style="width: 100%">
              <el-table-column
                  prop="name"
                  label="姓名">
                    <template slot-scope="scope">
                      <el-button type="text" @click="diagnose(scope.row)">
                        {{scope.row.name}}
                      </el-button>
                    </template>
              </el-table-column>
              <el-table-column
                  prop="sicktype"
                  label="sicktype">
              </el-table-column>
              <el-table-column
                  prop="badrate"
                  label="严重比例">
              </el-table-column>
              <el-table-column
                  prop="unperfectMsg"
                  label="不完整程度">
              </el-table-column>
              <el-table-column
                  prop="addtime"
                  label="加入时间">
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
                      :style="{'width':'80px'}"
                      v-if="scope.row.care">
                        {{careText(scope.row.care)}}
                      </el-button>
                      <el-button 
                      v-else
                      size="mini" 
                      type="plain" 
                      @click.native="care(scope.$index,unperfectMsgData)" 
                      :key="scope.row.id" :style="{'width':'80px'}"
                      >
                        {{careText(scope.row.care)}}
                      </el-button>
                      <el-button size="mini" type="primary" @click="diagnose(scope.row)" >诊断</el-button>
                      <el-button size="mini" icon="el-icon-phone-outline" @click="call(scope.row)">电话</el-button>
                  </template>
              </el-table-column>
          </el-table>
        </el-card>
      </div>
      <!-- 建档不完整患者 end -->
    </el-card>
  </div>
</template>

<script>
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
      msgTip: '',
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
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
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
  margin-left: 48%;
  margin-bottom: 10px;
  font-size: 18px;
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
  margin-right: 20px;
}
.page {
  margin-top:10px;
  /* height: 60px; */
  /* line-height: 60px; */
  font-size: 16px !important;
  text-align: right;
  vertical-align: middle;
}
.el-pagination{
  font-size: 16px;
}
</style>
