<template>

  <div class="add-doctor">
    <div class="header">
      <h2>添加医生</h2>
    </div>
    <div class="form">
      <el-form 
      :model="addDoctorForm" 
      status-icon 
      :rules="rules" 
      ref="ruleForm" 
      label-width="50px" 
      :label-position="labelPosition">
        <el-form-item label="姓名" prop="name">
          <el-input type="text" v-model="addDoctorForm.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="职责" prop="adminNote">
          <el-input type="text" v-model="addDoctorForm.adminNote" size="small"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input type="text" v-model="addDoctorForm.mobile" size="small"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="addDoctorForm.email" size="small"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addDoctorForm.password" size="small"></el-input>
        </el-form-item>
        <el-form-item class="submit-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form 
      :model="addDoctorForm" 
      status-icon 
      :rules="rules" 
      ref="ruleForm" 
      label-width="50px" 
      :label-position="labelPosition">
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="addDoctorForm.email" size="small"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input type="text" v-model="addDoctorForm.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input type="text" v-model="addDoctorForm.mobile" size="small"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addDoctorForm.password" size="small"></el-input>
        </el-form-item>
        <el-form-item class="submit-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>


      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import {addDoctorApi} from './../api/components/addDoctor'
export default {
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
    var checkAdminNote = (rule, value, callback) => {
      let namerule = /^.{3,20}$/
      if (!value) {
        return callback(new Error('职责不能为空'))
      } else if (!namerule.exec(value)) {
        return callback(new Error('请输入正确的职责'))
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
        adminNote: ''
      },
      dialogFormVisible: false,
      rules: {
        email: [
            { validator: checkEmail, trigger: 'blur' }
        ],
        name: [
          { validator: checkName, trigger: 'blur' }
        ],
        adminNote: [
          { validator: checkAdminNote, trigger: 'blur' }
        ],
        mobile: [
          { validator: checkmobile, trigger: 'blur' }
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
          console.log(this.addDoctorForm, 'submit!')
          let doctorMsg = {
            username: this.addDoctorForm.name,
            password: this.addDoctorForm.password,
            email: this.addDoctorForm.email,
            department: null,
            name: this.addDoctorForm.name,
            roleId: null,
            mobile: this.addDoctorForm.mobile,
            regionId: 1,                          // 默认未设置
            adminType: 3,
            adminNote: this.addDoctorForm.adminNote,
            address: null
          }
          this.$axios(addDoctorApi(doctorMsg))
          .then()
          .catch()
          this.$router.replace(this.$route.params.from)
        } else {
          // console.log('error     submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
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
  width: 40%;
  padding-left: 20%;
  padding-right: 20%;
  /* height: 100%; */
}
.header{
  text-align: center;
}
.form{
  width: 320px;
  margin-left: auto;
  margin-right: auto;
}
.submit-btn{
  margin-left: 20px;
}
</style>
