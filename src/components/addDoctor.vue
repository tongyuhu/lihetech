<template>

  <div class="add-doctor">
    <div class="header">
      <span>新增医生</span>
    </div>
    <el-card>
      <div class="form">
        <el-form 
        :model="addDoctorForm" 
        status-icon 
        :rules="rules" 
        ref="ruleForm" 
        label-width="70px" 
        :label-position="labelPosition"
        >
          <el-form-item label="医生姓名" prop="name">
            <el-input type="text" v-model="addDoctorForm.name" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="mobile">
            <el-input type="text" v-model="addDoctorForm.mobile" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="工作邮箱" prop="email">
            <el-input type="email" v-model="addDoctorForm.email" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="登录账号" prop="account">
            <el-input type="text" v-model="addDoctorForm.account" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="初始密码" prop="password">
            <el-input type="password" v-model="addDoctorForm.password" size="medium"></el-input>
          </el-form-item>
          <el-form-item class="submit-btn">
            <button @click.prevent="submitForm('ruleForm')">保存</button>
            <button @click.prevent="resetForm('ruleForm')">取消</button>
            <!-- <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button> -->
            <!-- <el-button @click="resetForm('ruleForm')">取消</el-button> -->
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import {addDoctorApi} from '@/api/components/addDoctor'
export default {
  data () {
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        // callback()
        // return callback(new Error('邮箱不能为空'))
        return true
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
    var checkAccount = (rule, value, callback) => {
      let accountRule = /[a-zA-Z0-9_]{4,15}$/
      if (!value) {
        return callback(new Error('账号不能为空'))
      } else if (!accountRule.exec(value)) {
        return callback(new Error('允许5-16字节，允许字母数字下划线'))
      } else {
        callback()
      }
    }
    var checkmobile = (rule, value, callback) => {
      let mobilerule = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/
      if (!value) {
        return callback(new Error('电话不能为空'))
      } else if (!mobilerule.exec(value)) {
        return callback(new Error('请输入正确的电话'))
      } else {
        callback()
      }
    }
    var checkPass = (rule, value, callback) => {
      let passrule = /^[a-zA-Z]\w{5,8}$/
      if (!value) {
        return callback(new Error('密码不能为空'))
      } else if (!passrule.exec(value)) {
        callback(new Error('请输入6~9密码，以字母开头,可包含数字和下划线'))
      } else {
        callback()
      }
    }
    return {
      labelPosition: 'right',
      addDoctorForm: {
        email: '',
        name: '',
        mobile: null,
        password: '',
        account: ''
      },
      dialogFormVisible: false,
      rules: {
        email: [
            { validator: checkEmail, trigger: 'blur' }
        ],
        name: [
          { validator: checkName, trigger: 'blur' }
        ],
        account: [
          { validator: checkAccount, trigger: 'blur' }
        ],
        mobile: [
          { validator: checkmobile, trigger: 'blur' }
          // {required: false}
        ],
        password: [
          { validator: checkPass, trigger: 'blur' }
          //  { required: true, message: '请输入密码', trigger: 'blur' },
          //  {min: 6, max: 9, message: '请输入6-9位密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.addDoctorForm, 'submit!')
          let doctorMsg = {
            name: this.addDoctorForm.name,
            password: this.addDoctorForm.password,
            email: this.addDoctorForm.email,
            department: null,
            roleId: null,
            mobile: this.addDoctorForm.mobile,
            regionId: 1,                          // 默认未设置
            adminType: 3,
            username: this.addDoctorForm.account,
            address: null
          }
          this.$axios(addDoctorApi(doctorMsg))
          .then()
          .catch()
          // this.$router.replace(this.$route.params.from)
        } else {
          // console.log('error     submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      // this.$router.go(-1)
    }
  },
  mounted () {
    // console.log(this.$route.params.from)
  }
}
</script>

<style scoped>
.add-doctor{
  /* display: flex; */
  /* justify-content: center; */
  /* width: 40%; */
  /* padding-left: 20%; */
  /* padding-right: 20%; */
  /* height: 100%; */
}
.header{
  font-size: 24px;
  color:#041421;
  margin-top:6px;
  margin-bottom: 24px;
}
.form{
  width: 360px;
  color:#666;
  /* margin-left: auto; */
  /* margin-right: auto; */
}
button{
  width: 72px;
  height: 24px;
  background: #1991fc;
  font-size:16px;
  color:#fff;
  outline: none;
  border:none;
  border-radius: 2px;
  margin-right: 20px;
  cursor: pointer;
}
button:hover{
  opacity: 0.9;
}
.submit-btn{
  /* margin-left: 20px; */
}
</style>
