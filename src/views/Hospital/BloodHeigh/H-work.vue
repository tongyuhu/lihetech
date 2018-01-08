<template>
  <div class='work'>
    <el-card :body-style="{padding: '0px', paddingTop: '15px'}">
      <div class="workhead">
        <el-badge :value="12" :max="99" class="item">
          <el-button class="share-button" icon="el-icon-message" type="primary"></el-button>
        </el-badge>
        <span>工作台</span>
      </div>
      <!-- 患者最新问诊开始 -->
      <div>
        <el-card>
          <div slot="header">
            <span>患者最新问诊</span>
          </div>
          <el-table 
              :data='newask'
              stripe
              style="width: 100%">
              <el-table-column
                  prop="name"
                  label="姓名"
                  @cell-click="handlePersonMsg">
                  <!-- <template slot-scope="scope">
                    <a>{{ scope.row.name }}</a>
                    <a @click="handlePersonMsg">{{ scope.row.name }}</a>
                  </template> -->
              </el-table-column>
              <el-table-column
                  prop="asktime"
                  label="问诊时间">
              </el-table-column>
              <el-table-column
                  prop="asktopic"
                  label="姓名">
              </el-table-column>
              <el-table-column
                  prop="action"
                  label=""
                  width="90">
                  <template slot-scope="scope">
                      <el-button>诊断</el-button>
                  </template>
              </el-table-column>
          </el-table>
        </el-card>
      </div>
      <div></div>
      <div></div>
      <div></div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'H-work',
  data () {
    return {
      newask: [
        {
          name: 'John Brown',
          asktime: 18,
          asktopic: 'New York No. 1 Lake Park'
        },
        {
          name: 'Jim Green',
          asktime: 24,
          asktopic: 'London No. 1 Lake Park'
        },
        {
          name: 'Joe Black',
          asktime: 30,
          asktopic: 'Sydney No. 1 Lake Park'
        },
        {
          name: 'Jon Snow',
          asktime: 26,
          asktopic: 'Ottawa No. 2 Lake Park'
        }
      ]
    }
  },
  methods: {
    handlePersonMsg (row, column, cell, event) {
      alert('单元格点击事件')
      // return true
    }
  }
}
</script>

<style>
.work {
  margin-top: 30px;
}
.workhead {
  margin-left: 48%;
  margin-bottom: 10px;
  font-size: 18px;
}
</style>
