<template>
  <div >
      <el-row>
          <el-col :span="12">
              <div class="head-left">
                  <p>立阖泰科技</p>
                  <p>立德济世 阖泰天下</p>
              </div>
          </el-col>
          <el-col :span="12">
              <div class="head-right">
                  <p>{{ adminName }}</p>
                  <el-popover
                  ref="H-admin"
                  placement="top"
                  width="145"
                  trigger="click">
                    <el-row :gutter="8" type="flex" justify="center" align="center">    
                      <el-col :span="10" class="admin-icon">
                        <img :src="adminIcon" alt="" width="50px">
                      </el-col>
                      <el-col :span="14">
                        <p>{{ adminRoot }}</p>
                        <el-button size="mini" @click="lookMsg" class="btn">查看消息</el-button> 
                        <el-button size="mini" @click="editDoc" class="btn">编辑资料</el-button> 
                        <el-button size="mini" @click="centerDialogVisible = true" class="btn">密码修改</el-button> 
                        <el-button size="mini" @click="exit" class="btn">退出</el-button>
                      </el-col>
                    </el-row>
                  </el-popover>
                  <el-button v-popover:H-admin size="mini" @click="adminAccount">账户管理</el-button>
              </div>
          </el-col>
      </el-row>
      <el-dialog
        title="修改密码"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <el-form
        :model="changePasswordForm" 
        status-icon 
        :rules="changePasswordRules" 
        ref="ruleForm" 
        label-width="50px" 
        :label-position="labelPosition"
        >
          <el-form-item prop="oldPassword">
            <el-input
              :autofocus="true"
              placeholder="原始密码"
              v-model="changePasswordForm.oldPassword">
              <template slot="prepend"><i class="el-icon-info"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="newPassword1">
            <el-input
              :autofocus="true"
              placeholder="请输入密码"
              v-model="changePasswordForm.newPassword1">
              <template slot="prepend"><i class="el-icon-info"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="newPassword2">
            <el-input
              :autofocus="true"
              placeholder="请再次输入密码"
              v-model="changePasswordForm.newPassword2">
              <template slot="prepend"><i class="el-icon-info"></i></template>
            </el-input>
          </el-form-item>
        </el-form>
        <!-- <span>需要注意的是内容是默认不居中的</span> -->
        <span slot="footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'H-Head',
  data () {
    var checkOldPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原始密码'))
      } else {
        callback()
      }
    }
    var checkNewPassword1 = (rule, value, callback) => {
      // let reg = new RegExp()
      let patrn = /^[a-zA-Z]\w{5,8}$/
      if (patrn.exec(value) === null) {
        callback(new Error('请输入6~9密码，以字母开头,可包含数字和下划线'))
      } else {
        callback()
      }
    }
    var checkNewPassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.changePasswordForm.checkNewPassword1) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      adminName: '胡小方',
      adminRoot: '管理员',
      adminIcon: './../../../static/admin.jpg',
      labelPosition: 'center',
      changePasswordForm: {
        oldPassword: '',
        newPassword1: '',
        newPassword2: ''
      },
      centerDialogVisible: false,
      changePasswordRules: {
        oldPassword: [
            // { required: true, message: '请输入邮箱', trigger: 'blur' }
            { validator: checkOldPassword, trigger: 'blur' }
        ],
        newPassword1: [
            { validator: checkNewPassword1, trigger: 'blur' }
            // { required: true, message: '请输入姓名', trigger: 'blur' },
            // { min: 2, max: 5, message: '请输入正确的姓名', trigger: 'blur' }
        ],
        newPassword2: [
          { validator: checkNewPassword2, trigger: 'blur' }
          //  { required: true, message: '请输入电话', trigger: 'blur' },
          //  {min: 11, message: '请输入正确的电话', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    lookMsg () {
      // this.$router.replace({
      //   name: 'accountSetting'
      // })
      this.$router.push({
        name: 'accountSetting'
      })
    },
    editDoc () {
      this.$router.push({
        name: 'accountSetting'
      })
    },
    changePassword () {

    },
    exit () {
      this.$router.push({
        name: 'login',
        params: {
          from: this.$router.currentRoute.path
        }
      })
      sessionStorage.clear()
    },
    adminAccount () {

    }
  }
}
</script>

<style scoped>
    p{
        margin: 0;
        text-align: center;
    }
    .head-left{
        float: left;
    }
    .head-right{
        float: right;
        text-align: center;
    }
   .el-col-16{
     text-align: center;
   }
   .admin-icon{
     margin-top:25%;
   }
   .btn{
     display: block;
     margin: 0;
     margin-top:5px;
     width: 80px;
   }
</style>