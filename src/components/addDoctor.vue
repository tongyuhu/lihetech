<template>
  <div class="add-doctor">
    <div class="header">
      <h2>添加医生</h2>
    </div>
    <div class="form">
      <el-form :model="addDoctorForm" status-icon :rules="rules" ref="ruleForm" label-width="50px" :label-position="labelPosition">
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="addDoctorForm.email" size="small"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input type="text" v-model="addDoctorForm.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input type="text" v-model="addDoctorForm.phone" size="small"></el-input>
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
  </div>
</template>

<script>
export default {
  data () {
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
    }
    return {
      labelPosition: 'right',
      addDoctorForm: {
        email: '',
        name: '',
        phone: null,
        password: ''
      },
      rules: {
        email: [
            // { required: true, message: '请输入邮箱', trigger: 'blur' }
            { validator: checkEmail, trigger: 'blur' }
        ],
        name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 5, message: '请输入正确的姓名', trigger: 'blur' }
        ],
        phone: [
           { required: true, message: '请输入电话', trigger: 'blur' },
           {min: 11, message: '请输入正确的电话', trigger: 'blur'}
        ],
        password: [
           { required: true, message: '请输入密码', trigger: 'blur' },
           {min: 6, max: 9, message: '请输入6-9位密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.addDoctorForm, 'submit!')
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
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
}
.header{
  text-align: center;
}
.form{
  width: 250px;
  margin-left: auto;
  margin-right: auto;
}
.submit-btn{
  margin-left: 20px;
}
</style>
