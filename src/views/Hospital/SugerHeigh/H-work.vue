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
        <el-card>
          <div slot="header">
            <span>患者最新问诊</span>
          </div>
          <el-table 
              :data='newaskData'
              stripe
              style="width: 100%"
              @cell-click="handlePersonMsg">
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
        </el-card>
      </div>
      <!-- 患者最新问诊  end -->

      <!-- 严重患者 start -->
      <div>
        <el-card>
          <div slot="header">
            <span>严重患者（{{ badSickRate }}）</span>
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
                      <el-button size="mini" type="primary" @click="care(scope.row)">关注</el-button>
                      <el-button size="mini" type="primary" @click="diagnose(scope.row)">诊断</el-button>
                      <el-button size="mini" icon="el-icon-phone-outline" @click="call(scope.row)">电话</el-button>
                  </template>
              </el-table-column>
          </el-table>
        </el-card>
      </div>
      <!-- 严重患者结束 end -->

      <!-- 未遵医嘱患者 start -->
      <div>
        <el-card>
          <div slot="header">
            <span>未遵医嘱患者（{{ noListenDoctorRate }}）</span>
          </div>
          <el-table 
              :data='noListenDoctorData'
              stripe
              style="width: 100%"
              @cell-click="handlePersonMsg">
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
                      <el-button size="mini" type="primary" @click="care(scope.row)">关注</el-button>
                      <el-button size="mini" type="primary" @click="diagnose(scope.row)">诊断</el-button>
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
            <span>建档不完整患者（45%）</span>
          </div>
          <el-table 
              :data='unperfectMsgData'
              stripe
              style="width: 100%"
              @cell-click="handlePersonMsg">
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
                      <el-button size="mini" type="primary" @click="care(scope.row)">关注</el-button>
                      <el-button size="mini" type="primary" @click="diagnose(scope.row)">诊断</el-button>
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
export default {
  name: 'H-work',
  data () {
    return {
      msgTip: 5,
      badSickRate: '55%',
      noListenDoctorRate: '22%',
      newaskData: [
        {
          name: 'John Brown',
          asktime: '2017/12/01 11:32',
          asktopic: 'New York No. 1 Lake Park'
        },
        {
          name: 'Jim Green',
          asktime: '2017/12/01 11:32',
          asktopic: 'London No. 1 Lake Park'
        },
        {
          name: 'Joe Black',
          asktime: '2017/12/01 11:32',
          asktopic: 'Sydney No. 1 Lake Park'
        },
        {
          name: 'Jon Snow',
          asktime: '2017/12/01 11:32',
          asktopic: 'Ottawa No. 2 Lake Park'
        }
      ],
      badsickData: [
        {
          name: '万万',
          sicktype: '高血压',
          badrate: '20%',
          todaytimes: 2,
          addtime: '2015-8-9',
          care: true,
          id: 123456
        },
        {
          name: '天天',
          sicktype: '高血压',
          badrate: '40%',
          todaytimes: 5,
          addtime: '2017-8-9',
          care: false,
          id: 123456
        }
      ],
      noListenDoctorData: [
        {
          name: '万万',
          sicktype: '高血压',
          badrate: '20%',
          noListenDoctor: '21天(共50天)',
          addtime: '2015-8-9',
          care: true,
          id: 123456
        },
        {
          name: '天天',
          sicktype: '高血压',
          badrate: '40%',
          noListenDoctor: '21天(共50天)',
          addtime: '2017-8-9',
          care: true,
          id: 123456
        }
      ],
      unperfectMsgData: [
        {
          name: '万万',
          sicktype: '高血压',
          badrate: '20%',
          unperfectMsg: '36%',
          addtime: '2015-8-9',
          care: true,
          id: 123456
        },
        {
          name: '天天',
          sicktype: '高血压',
          badrate: '40%',
          unperfectMsg: '36%',
          addtime: '2017-8-9',
          care: true,
          id: 123456
        }
      ]

    }
  },
  methods: {
    msgTipBtn () {

    },
    diagnose (row) {
      console.log(row.name)
    },
    care (row) {
      console.log(row.care)
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
    }
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
</style>
