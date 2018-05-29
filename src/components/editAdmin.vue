<template>
  <div >
    <el-card>
      <div class="clear flex">
        <div class="left">
          <div class="left-img">

            <div class="left-img-wrap">
              <a class="a-upload">

                <input type="file" accept="image/jpg" @change="submitPhoto($event)">
                <div class="img-photo-wrap">

                  <img class="img-photo" src="~/icon/hospital-icon2-16.png" alt="">
                </div>
                <img :src="imgSrc ? imgSrc :'./static/admin.jpg'" >
              </a>
            </div>
          </div>
        </div>
        <div class="left">
            <div>
              <el-form class="from" ref="editAdminForm" :model="form" label-width="100px" :rules="rule">
                <div class="right-form-wrap">
                  <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <!-- <el-form-item label="性别" prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择性别" >
                      <el-option label="男" value="man"></el-option>
                      <el-option label="女" value="woman"></el-option>
                    </el-select>
                  </el-form-item> -->
                  <el-form-item label="登录账号" prop="account">
                    <el-input v-model="form.account"></el-input>
                  </el-form-item>
                  <el-form-item label="电话" prop="mobile">
                    <el-input v-model="form.mobile"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email"></el-input>
                  </el-form-item>
                </div>
                <el-form-item label="职称" prop="type">
                  <el-checkbox-group v-model="form.type">
                    <el-checkbox label="内分泌教授" name="1"></el-checkbox>
                    <el-checkbox label="副主任医师" name="2"></el-checkbox>
                    <el-checkbox label="高血压专家" name="3"></el-checkbox>
                    <el-checkbox label="糖尿病专家" name="4"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="可预约项目" prop="order">
                  <el-checkbox-group v-model="form.order">
                    <el-checkbox label="内分泌科" name="1"></el-checkbox>
                    <el-checkbox label="心血管疾病" name="2"></el-checkbox>
                    <el-checkbox label="高血压诊断" name="3"></el-checkbox>
                    <el-checkbox label="糖尿病管理" name="4"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <div class="right-form-wrap">
                  <el-form-item label="医生简介" prop="introduction">
                    <el-input type="textarea" v-model="form.introduction"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit('editAdminForm')" :style="{'width':'220px','height':'40px'}">提交</el-button>
                    <!-- <el-button>取消</el-button> -->
                  </el-form-item>
                </div>
              </el-form>
            </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {editAdminApi, uploadFileApi} from '@/api/components/editAdmin.js'
export default {
  name: 'editAdmin',
  data () {
    var checkName = (rule, value, callback) => {
      let namerule = /^.{1,20}$/
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
    var checkMobile = (rule, value, callback) => {
      let mobilerule = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/
      if (!value) {
        return callback(new Error('电话不能为空'))
      } else if (!mobilerule.exec(value)) {
        return callback(new Error('请输入正确的电话'))
      } else {
        callback()
      }
    }
    var checkEmail = (rule, value, callback) => {
      let emailrule = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      } else if (!emailrule.exec(value)) {
        return callback(new Error('请输入正确的邮箱'))
      } else {
        callback()
      }
    }
    var checkSex = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请选择性别'))
      } else {
        callback()
      }
    }
    var checkType = (rule, value, callback) => {
      if (value.length === 0) {
        return callback(new Error('请选择职称'))
      } else {
        callback()
      }
    }
    var checkOrder = (rule, value, callback) => {
      if (value.length === 0) {
        return callback(new Error('请选择预约项目'))
      } else {
        callback()
      }
    }
    var checkIntroduction = (rule, value, callback) => {
      // let emailrule = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if (!value) {
        // callback()
        return callback(new Error('请填写医生信息'))
        // return true
      } else {
        callback()
      }
    }
    return {
      form: {
        name: '',
        sex: '',
        account: '',
        mobile: '',
        email: '',
        type: [],
        order: [],
        introduction: ''
      },
      rule: {
        name: [
            { validator: checkName, trigger: 'blur' }
        ],
        sex: [
            { validator: checkSex, trigger: 'change' }
        ],
        account: [
            { validator: checkAccount, trigger: 'blur' }
        ],
        mobile: [
            { validator: checkMobile, trigger: 'blur' }
        ],
        email: [
            { validator: checkEmail, trigger: 'blur' }
        ],
        type: [
            { type: 'array', validator: checkType, trigger: 'change' }
        ],
        order: [
            { type: 'array', validator: checkOrder, trigger: 'change' }
        ],
        introduction: [
            { validator: checkIntroduction, trigger: 'blur' }
        ]
      },
      imgSrc: '',
      uploadSrc: null
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  methods: {
    onSubmit (formName) {
      console.log('submit', this.adminInfo)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          // console.log(' submit!!')

          console.log('submit', this.form)
          let obj = {}
          obj.id = this.adminInfo.id
          obj.mobile = this.form.mobile
          obj.email = this.form.email
          obj.adminNote = this.form.introduction
          obj.specialty = this.form.order.join('、')
          obj.department = this.form.type.join('、')
          obj.username = this.form.account
          obj.name = this.form.name
          if (this.uploadSrc) {
            obj.headPortraitUrl = this.uploadSrc
          }

          this.axios(editAdminApi(obj))
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
          // obj.sex = this.form.name
        } else {
          console.log('error submit!!')
          return false
        }
      })
      // console.log('submit!')
    },
    submitPhoto: function (e) {
      let files = e.target.files[0]
      let obj = {}
      if (this.imgSrc) {
        obj.saveFile = this.imgSrc
      }
      obj.files = files
      this.$axios(uploadFileApi(obj))
      .then(res => {
        if (res.data.code === '0000') {
          this.imgSrc = res.data.seeFile
          this.uploadSrc = res.data.saveFile
        }
      })
      console.log(files)
    }
  },
  mounted () {
    if (this._.has(this.adminInfo, 'headPortraitUrl')) {
      if (this.adminInfo.headPortraitUrl.length !== 0) {
        this.imgSrc = process.env.IMG_URL + this.adminInfo.headPortraitUrl
      } else {
        this.imgSrc = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .flex{
    display: flex;
    .a-upload {
      /* padding: 4px 10px; */
      height: 150px;
      width: 150px;
      // display: ;
      // line-height: 32px;
      position: relative;
      cursor: pointer;
      color: #888;
      /* background: #fafafa; */
      /* border: 1px solid #ddd; */
      /* border-radius: 4px; */
      // overflow: hidden;
      display: inline-block;
      // *display: inline;
      // z-index: 10;
      *zoom: 1
    }

    .a-upload  input {
      position: absolute;
      font-size: 100px;
      right: 0;
      top: 0;
      z-index: 100;
      opacity: 0;
      filter: alpha(opacity=0);
      cursor: pointer
    }
    .img-photo-wrap{
        width: 150px;
        height: 150px;
        background: rgba(0, 0, 0, 0);
        position: absolute;
      }
      .img-photo{
        position: absolute;
        opacity: 0;
        background: rgba(0, 0, 0, 0);
        top:50px;
        left: 50px;
        width: 50px;
      }
    .a-upload:hover {
      text-decoration: none;
      .img-photo-wrap{
        width: 150px;
        height: 150px;
        background: rgba(0, 0, 0, 0.4);
        position: absolute;
      }
      .img-photo{
        position: absolute;
        opacity: 1;
        top:50px;
        left: 50px;
        width: 50px;
      }
    }
  }
  .left{
    float: left;
  }
  .left-img{
    width: 180px;
    z-index: 10;
    
    &-wrap{
      width: 150px;
      position: relative;
      &:hover{
        // position: absolute;
        // top:0;
        // background: rgb(172, 81, 81); 
        z-index: 10;
      }
    }
    img{
      width: 150px;
      
    }
  }
  .right-form-wrap{
    // width: 500px;
    width: 320px;
    .el-select{
      width: 100%;
    }
  }
  .from{
    // width: 460px;
  }
</style>

