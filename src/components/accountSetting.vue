<template>
  <div>
    <div class="head">
      <span>张江高科诊所</span>
    </div>

    <el-card class="msg">
      <div class="msg-title">
        <span>消息列表</span>
      </div>
      <el-row class="action">
        <el-col :span="3" :offset="21">
          <el-button size="mini" type="primary">编辑</el-button>
        </el-col>
      </el-row>
      <el-row class="msg-list">
        <el-col :span="2" class="msg-tip">
          <span>
          糖
          </span>
        </el-col>
        <el-col :span="18" class="msg-content">
          今天你所管理的患者，糖尿病出现了较为明显的波动，
          控糖没有达到理想的状态，
          主要患者有：张丽曼、王二、刘二涛、吴大明请及时跟踪这些患者。
        </el-col>
        <el-col :span="3" class="msg-time">
          <span>2017-12-21 12:00</span>
        </el-col>
      </el-row>
      <el-row class="msg-list">
        <el-col :span="2" class="msg-tip">
          <span>
          糖
          </span>
        </el-col>
        <el-col :span="18" class="msg-content">
          今天你所管理的患者，糖尿病出现了较为明显的波动，
          控糖没有达到理想的状态，
          主要患者有：张丽曼、王二、刘二涛、吴大明请及时跟踪这些患者。
        </el-col>
        <el-col :span="3" class="msg-time">
          <span>2017-12-21 12:00</span>
        </el-col>
      </el-row>
    </el-card>

    <div>
      <el-card>
        <div>
          <div class="msg-title">医生列表</div>
          <div class="add-doctor-btn">
            <el-button type="primary" @click="addDoctor">添加医生</el-button>
          </div>
          <el-table
          border
          :data="doctorListData">
            <el-table-column 
            label="姓名"
            prop="name">
            </el-table-column>

            <el-table-column 
            label="职责"
            prop="work">
            </el-table-column>
            
            <el-table-column 
            label="联系方式"
            prop="phone">
            </el-table-column>

            <el-table-column 
            label="邮箱"
            prop="email">
            </el-table-column>

            <el-table-column 
            prop="action"
            width="150">
              <template slot-scope="scope">
                <el-button size="mini" type="primary">编辑</el-button>
                <el-button size="mini" type="danger">删除</el-button>
              </template>
            </el-table-column>

          </el-table>
        </div>
      </el-card>
    </div>

  </div>
</template>

<script>
export default {
  name: 'accountSetting',
  data () {
    return {
      doctorListData: [
        {
          name: '张医生',
          work: '糖尿病管理',
          phone: '13526421302',
          email: '12456977415@qq.com'
        }
      ]
    }
  },
  methods: {
    addDoctor () {
      this.$router.push({
        name: 'addDoctor'
      })
    }
  }
}
</script>

<style scoped>
  .head{
    padding-bottom: 10px;
    padding-left: 5px;
  }
  .msg{
    margin-bottom: 20px;
  }
  .msg-title{
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    font-weight: 700;
  }
  .msg-list{
    border: 2px dotted #e3e8f3;
    border-radius: 10px;
    /* padding: 20px; */
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }
  .msg-tip{
    border: 2px solid #ebeef5;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
  }
  .msg-time{
    text-align: center;
  }
  .msg-content{
    padding: 10px;
  }
  .action{
    margin-bottom: 10px;
  }
  .add-doctor-btn{
    margin-bottom: 10px;
    margin-left: 5px;
  }
</style>
