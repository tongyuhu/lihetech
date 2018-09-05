<template>
  <div class="head clear">
        <div class="head-left">
            <p>立德济世 阖泰天下</p>
        </div>
        
        <div class="dropdown head-right ma" @click.self="show">
          <span @click.self="show" class="setting"><i class="el-icon-setting setting"></i>账户设置</span>
          <div class="shade" v-show="showshade" @click="isshowshade"></div>
          <div class="dropdown-content" :class="{show:isshow}">
            <button class="setting-btn" @click="lookMsg">我的二维码</button>
            <button class="setting-btn" @click="editDoc">编辑资料</button>
            <button class="setting-btn" @click="changePasswordDialogHandle">密码修改</button>
            <button class="setting-btn" @click="exit">退出</button>
          </div>
        </div>

        
        <div class="head-right ma">
          <span class="head-right">{{ adminName }}</span>
        </div>
        <div class="head-right">
            <img :src="adminHeadImg" alt=""  class="admin-icon" width="34px" height="34px">
        </div>
  
      <el-dialog
        title="修改密码"
        :visible.sync="changePasswordDialog"
        width="50%"
        center>
        <el-form
        :model="changePasswordForm" 
        status-icon 
        :rules="changePasswordRules" 
        :validateField="validateFieldForm('oldPassword')"
        ref="changpasswordRef" 
        label-width="90px" 
        :label-position="labelPosition"
        >
          <!-- <el-form-item prop="oldPassword" label="原始密码">
            <el-input
              :autofocus="true"
              placeholder="原始密码"
              v-model="changePasswordForm.oldPassword">
            </el-input>
          </el-form-item> -->
          <el-form-item prop="newPassword1" label="新密码">
            <el-input
              :autofocus="true"
              placeholder="请输入密码"
              v-model="changePasswordForm.newPassword1">
              <!-- <template slot="prepend"><i class="el-icon-info"></i></template> -->
            </el-input>
          </el-form-item>
          <el-form-item prop="newPassword2" label="确认密码">
            <el-input
              :autofocus="true"
              placeholder="请再次输入密码"
              v-model="changePasswordForm.newPassword2">
            </el-input>
          </el-form-item>
        </el-form>
        <!-- <span>需要注意的是内容是默认不居中的</span> -->
        <span slot="footer">
          <el-button @click="changePasswordDialog = false">取 消</el-button>
          <el-button type="primary" @click="changePassword('changpasswordRef')">确 定</el-button>
        </span>
      </el-dialog>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import {editAdminApi} from '@/api/components/editAdmin.js'
import {imgExists} from '@/untils/untils.js'
// import publicStatic from '@/publicData/const.js'
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
        callback(new Error('请输入6~9密码,以字母开头,可包含数字和下划线'))
      } else {
        callback()
      }
    }
    var checkNewPassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.changePasswordForm.newPassword1) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      // adminName: '胡小方',
      // adminRoot: '管理员',
      isshow: false,
      showshade: false,
      adminIcon: null,
      labelPosition: 'center',
      changePasswordForm: {
        oldPassword: '',
        newPassword1: '',
        newPassword2: ''
      },
      changePasswordDialog: false,
      changePasswordRules: {
        oldPassword: [
            // { required: true, message: '请输入邮箱', trigger: 'blur' }
            // { required: true, message: '请输入原始密码', trigger: 'blur', enum: [this.labelPosition] }
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
      },
      adminHeadImg: ''
    }
  },
  computed: {
    ...mapState(['adminInfo', 'adminImg']),
    adminName () {
      if (!this.$store.state.adminInfo.username) {
        if (!this.$store.state.adminInfo.name) {
          return '暂无用户名'
        }
      } else {
        return this.$store.state.adminInfo.name || this.$store.state.adminInfo.username
      }
    },
    adminRoot () {
      let adminRoot = ''
      switch (this.$store.state.adminInfo.adminType) {
        case 1:
          adminRoot = '超级管理员'
          break
        case 2:
          adminRoot = '医院诊所'
          break
        case 3:
          adminRoot = '医生'
          break
        case 4:
          adminRoot = '护士'
          break
        default:
          adminRoot = this.$store.state.adminInfo.username
      }
      return adminRoot
    }
  },
  methods: {
    validateFieldForm (val) {
      console.log('密码修改', val)
    },
    imgExists (url, errurl) {
      return imgExists(url, errurl)
    },
    show () {
      this.isshow = !this.isshow
      this.showshade = true
    },
    isshowshade () {
      this.isshow = false
      this.showshade = false
    },
    lookMsg () {
      // this.$router.replace({
      //   name: 'accountSetting'
      // })
      this.isshowshade()
      this.$router.push({
        name: 'accountSetting'
      })
    },
    editDoc () {
      this.isshowshade()
      this.$router.push({
        name: 'editAdmin'
      })
    },
    changePasswordDialogHandle () {
      this.isshowshade()
      this.changePasswordDialog = true
      setTimeout(() => {
        this.$refs['changpasswordRef'].resetFields()
      }, 50)
      // changpasswordRef
    },
    changePassword (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = {}
          obj.id = this.adminInfo.id
          obj.password = this.changePasswordForm.newPassword1
          this.$axios(editAdminApi(obj))
          .then(res => {
            if (res.data.code === '0000') {
              this.$message({
                showClose: true,
                message: '修改成功',
                type: 'success'
              })
            } else {
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: 'warning'
              })
            }
          })
          // alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    exit () {
      this.isshowshade()
      this.$axios({
        method: 'post',
        url: '/login/out'
      }).then(res => {
        if (res.data.code === '0000') {
          window.location.href = '/BPWatch/admin/login/page'
        }
      })
      // window.location.href = '/BPWatch/admin/login/page'
      // this.$router.push({
      //   name: 'login',
      //   params: {
      //     from: this.$router.currentRoute.path
      //   }
      // })
      // sessionStorage.clear()
    },
    adminAccount () {
    }
  },
  mounted () {
    console.log('headPortraitUrl', this.adminInfo.headPortraitUrl)
    if (this._.has(this.adminInfo, 'headPortraitUrl')) {
      if (this.adminInfo.headPortraitUrl.length !== 0) {
        this.adminIcon = process.env.IMG_URL + this.adminInfo.headPortraitUrl
      }
    } else {
      this.adminIcon = null
    }
    this.adminHeadImg = this.imgExists(process.env.IMG_URL + this.adminImg, process.env.IMG_URL_LOCALHOST + '/static/admin.jpg')
  }
}
</script>

<style scoped>
  .ma{
    margin-right: 30px;
  }
  .clear::after{
    display:block;
    clear:both;
    content:"";
    visibility:hidden;
    height:0
  }
    .head{
      height: 80px;
      position:relative;
      box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.1);
      background-color: #fff;
    }
    .head-logo{
      float: left;
      width: 250px;
      background-color: #1991fc;
      height: 80px;
      position:relative;
    }
    .head-logo-img{
      display: block;
      margin-left: 40px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    p{
        margin: 0;
        text-align: center;
    }
    .head-left{
      float: left;
      vertical-align: middle;
      margin-left: 24px;
      position: absolute;
      top: 50%;
      left: 250px;
      transform: translateY(-50%);
      font-size: 14px;
    }
    .head-right{
      font-size: 14px;
      float: right;
      text-align: center;
      color: #666;
      vertical-align: middle;
      line-height: 80px;
      /* position: absolute;
      top: 50%;
      right: 250px;
      transform: translateY(-50%); */
    }
    /* .admin-icon-wrap{
      width: 34px;
      height: 34px;
    } */
   .admin-icon{
      /* width: 34px; */
      /* height: 34px; */
      border-radius: 50%;
      border:1px solid #dedede;
      /* box-shadow: 0 0 0 1px #dedede; */
      display:inline;
      vertical-align:middle;
      margin-right: 5px;
   }
   /* .btn{
     color: #fff;
     display: block;
     margin: 0;
     margin-top:5px;
     width: 80px;
     text-align: center;
   } */
   .setting{
     color: #666;
   }
   .el-dropdown-link{
     cursor: pointer;
   }
   .el-dropdown-menu{
     background-color: 
       #1991fc;
     /* color: #1991fc; */
   }
   .dropdown {
      position: relative;
      display: inline-block;
      cursor: pointer;
    }
.dropdown-content {
  display: none;
  position: absolute;
  top:70px;
  right: -20px;
  background-color: #1991fc;
  min-width: 100px;
  line-height: 30px;
  z-index: 9999;
}
.dropdown-content::before{
    top: -20px;
    right: 40px;
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-bottom: 10px solid #1991fc;
}
.show{
  display: block;
}
.shade{
  position: fixed;
  top:0;
  left: 0;
  height: 100%;
  width: 100%;
  /* background-color: black; */
  z-index: 998;
  cursor: default;
}
.setting{
  padding-right: 5px;
}
.setting-btn{
  border:none;
  background-color: #1991fc;
  color: #fff;
  width: 100%;
  height: 30px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  line-height: 30px;
  margin: 5px 0;
}
.setting-btn:hover{
  border:none;
  background-color: #1475cc;
  color: #fff;
}
</style>
<style>
  .popper__arrow::after {
    top: 1px;
    margin-left: -6px;
    border-top-width: 0;
    border-bottom-color: #1991fc;
  }
</style>
