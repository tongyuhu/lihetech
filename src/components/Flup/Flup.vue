<template>
  <div class="flup">
    <div class="head-title">
      <span>本月须随访用户</span>
    </div>
    <div class="gap">
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
                      <el-button type="text" @click="flupHandler(scope.row)"
                      :style="{'color':'#1991fc'}">
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
                        {{layer(scope.row.dangerLevel)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="lately"
                    label="近7日平均血压"
                    label-class-name="tableTitle">
                    <template slot-scope="scope">
                        {{scope.row.systolic7}}/{{scope.row.diastolic7}}
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
                        <el-button size="mini" type="primary" @click="flupHandler(scope.row)"
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
                      <el-button type="text" @click="flupHandler(scope.row,'useUserId')"
                      :style="{'color':'#1991fc'}">
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
                        {{layer(scope.row.dangerLevel)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="lately"
                    label="近7日平均血压"
                    label-class-name="tableTitle">
                    <template slot-scope="scope">
                        {{scope.row.systolic7}}/{{scope.row.diastolic7}}
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
import {mapState} from 'vuex'
export default {
  name: 'Flup',
  data () {
    return {
      unfinishedLoading: false,
      unfinishedCurrentPage: 1,
      unfinishedPageSize: 10,
      unfinishedTotal: 20,
      finishedLoading: false,
      finishedCurrentPage: 1,
      finishedPageSize: 10,
      finishedTotal: 20,
      unfinishedFlupData: [
        {
          realName: 'wa',
          dangerLayer: 1,
          lately: 111,
          doctor: '444',
          FlupDate: '2104-82-99'

        }
      ],
      finishedFlupData: [
        {
          realName: 'wa',
          dangerLayer: 1,
          lately: 111,
          doctor: '444',
          FlupDate: '2104-82-99'

        }
      ]
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  methods: {
    flupHandler (val) {
      this.$router.push({
        name: 'FlupCard'
      })
    },
    /**
     * @description val===true 已随访 反之
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
        params.isFollowUp = this.adminInfo.id
      }
      params.adminIdMainDoctor = 3
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
    call (val) {

    },
    unfinishedPageChange (currentpage) {
      this.unfinishedCurrentPage = currentpage
      this.getListData(false)
    },
    finishedPageChange (currentpage) {
      this.finishedCurrentPage = currentpage
      this.getListData(true)
    },
    layer (val) {
      let layer = ''
      switch (val) {
        case 1:
          layer = '一级'
          break
        case 2:
          layer = '二级'
          break
        case 3:
          layer = '三级'
          break
      }
      return layer
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
    margin-left: 12px;
    margin-bottom: 10px;
  }
  .card-head-title{
    border-bottom:1px solid #ebeef5;
    padding-bottom: 10px;
    font-size: 20px;
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



