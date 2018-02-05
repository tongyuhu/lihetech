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
                <el-button size="mini" type="primary" @click="editDoctor(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="deleteDoctor(scope.$index)">删除</el-button>
              </template>
            </el-table-column>

          </el-table>
        </div>
      </el-card>
      <el-dialog
        title="修改信息"
        :visible.sync="editDoctorShow"
        width="30%"
        center>
        <el-form
        :model="doctorForm" 
        status-icon 
        :rules="editDoctorRules" 
        ref="ruleForm" 
        label-width="50px" 
        :label-position="labelPosition"
        >
          <el-form-item label="姓名" prop="name">
            <el-input
              :autofocus="true"
              placeholder="修改姓名"
              v-model="doctorForm.name">
              <template slot="prepend"><i class="el-icon-info"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item label="职责" prop="work">
            <el-input
              :autofocus="true"
              placeholder="修改职责"
              v-model="doctorForm.work">
              <template slot="prepend"><i class="el-icon-info"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input
              :autofocus="true"
              placeholder="修改电话"
              v-model="doctorForm.phone">
              <template slot="prepend"><i class="el-icon-info"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              :autofocus="true"
              placeholder="修改邮箱"
              v-model="doctorForm.email">
              <template slot="prepend"><i class="el-icon-info"></i></template>
            </el-input>
          </el-form-item>
        </el-form>
        <!-- <span>需要注意的是内容是默认不居中的</span> -->
        <span slot="footer">
          <el-button @click="editDoctorShow = false">取 消</el-button>
          <el-button type="primary" @click="editDoctorShow = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
// import addDoctor from './addDoctor.vue'
export default {
  name: 'accountSetting',
  // components: {
  //   addDoctor
  // },
  data () {
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      } else {
        callback()
      }
    }
    var checkName = (rule, value, callback) => {
      let namerule = /^.{3,20}$/
      if (!value) {
        return callback(new Error('姓名不能为空'))
      } else if (!namerule.exec(value)) {
        return callback(new Error('请输入正确的姓名'))
      } else {
        callback()
      }
    }
    var checkPhone = (rule, value, callback) => {
      let phonerule = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/
      if (!value) {
        return callback(new Error('电话不能为空'))
      } else if (!phonerule.exec(value)) {
        return callback(new Error('请输入正确的电话'))
      } else {
        callback()
      }
    }
    var checkWork = (rule, value, callback) => {
      let phonerule = /^.{3,20}$/
      if (!value) {
        return callback(new Error('职责不能为空'))
      } else if (!phonerule.exec(value)) {
        return callback(new Error('请输入正确的职责'))
      } else {
        callback()
      }
    }
    return {
      editDoctorShow: false,
      labelPosition: 'left',
      doctorListData: [
        {
          name: '张医生',
          work: '糖尿病管理',
          phone: '13526421302',
          email: '12456977415@qq.com'
        },
        {
          name: '张医生',
          work: '糖尿病管理',
          phone: '13526421302',
          email: '12456977415@qq.com'
        },
        {
          name: '张医生',
          work: '糖尿病管理',
          phone: '13526421302',
          email: '12456977415@qq.com'
        }
      ],
      doctorForm: {
        name: '',
        work: '',
        phone: '',
        email: ''
      },
      editDoctorRules: {
        email: [
            { validator: checkEmail, trigger: 'blur' }
        ],
        password: [
          { validator: checkWork, trigger: 'blur' }
        ],
        name: [
          { validator: checkName, trigger: 'blur' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    addDoctor () {
      this.$router.push({
        name: 'addDoctor',
        params: {
          from: this.$router.currentRoute.path
        }
      })
    },
    editDoctor (index) {
      this.doctorForm = index
      this.editDoctorShow = true
      console.log(index)
    },
    deleteDoctor (index) {
      // console.log(index)
      this.doctorListData.splice(index, 1)
    }
    // editDoctorRules () {

    // }
  },
  mounted () {
    // console.log(this.$router.currentRoute.path, 11)
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
