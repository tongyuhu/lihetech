<template>
  <div >
    <el-card>
      <div class="clear flex">
        <div class="left">
        <!-- <div class="left"> -->
          <div class="left-img">

            <div class="left-img-wrap" >
              <a class="a-upload">
                
                  <input type="file" accept="image/jpg" @change="uploadImg($event)">
                <form action="" enctype="multipart/form-data">
                  <!-- <input type="file" accept="image/jpg" @change="submitPhoto($event)"> -->
                </form>
                <div class="img-photo-wrap">

                  <img class="img-photo" src="~/icon/hospital-icon2-16.png" alt="">
                </div>
                <div class="img-wrap">
                  <div>
                    <img :src="imgSrc ? imgSrc :'./static/admin.jpg'" >
                  </div>
                </div>
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
                  <!-- <el-form-item label="登录账号" prop="account">
                    <el-input v-model="form.account"></el-input>
                  </el-form-item> -->
                  <el-form-item label="电话" prop="mobile">
                    <el-input v-model="form.mobile"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email"></el-input>
                  </el-form-item>
                </div>
                <el-form-item label="职称">
                  <el-select
                    v-model="form.type"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    placeholder="请添写职称标签"
                    no-data-text="填写标签按Enter确认">
                  </el-select>
                </el-form-item>
                <el-form-item label="可预约项目">
                  <el-select
                    v-model="form.order"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    placeholder="请添写职称标签"
                    no-data-text="填写标签按Enter确认">
                  </el-select>
                </el-form-item>
                <!-- <el-form-item label="职称" prop="type">
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
                </el-form-item> -->
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
import {mapState, mapActions} from 'vuex'
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
        return callback(new Error('请填写职称'))
      } else {
        callback()
      }
    }
    var checkOrder = (rule, value, callback) => {
      console.log('检测项', value)
      if (value.length === 0) {
        return callback(new Error('请填写预约项目'))
      } else {
        callback()
      }
    }
    var checkIntroduction = (rule, value, callback) => {
      // let emailrule = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if (!value) {
        callback()
        // return callback(new Error('请填写医生信息'))
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
      uploadSrc: null,
      uploadImgdata: {},
      headers: {
        'Content-Disposition': 'form-data',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*'
      }
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  methods: {
    ...mapActions(['updateAdminInfo']),
    uploadImg (e) {
      //   // 如果提供了事件对象，则这是一个非IE浏览器
      // if (e && e.preventDefault) {
      //   // 阻止默认浏览器动作(W3C)
      //   e.preventDefault()
      // } else {
      //   // IE中阻止函数器默认动作的方式
      //   window.event.returnValue = false
      // }
      var vm = this
      let file = e.target.files[0]
      var formdata = new FormData()
      formdata.append('files', file)
      formdata.append('saveFile', vm.imgSrc)
      console.log('formdata', formdata.get('files'))
      console.log('saveFile', formdata.get('saveFile'))
      this.$axios(uploadFileApi(formdata))
      .then(res => {
        if (res.data.code === '0000') {
          this.imgSrc = res.data.data.seeFile
          this.uploadSrc = res.data.data.saveFile
          console.log('上传图片', res.data.data.saveFile, res.data.data.seeFile)
        }
        return false
      })
    },
    onSubmit (formName) {
      // console.log('submit', this.adminInfo)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          // console.log(' submit!!')

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
          console.log('修改的医生信息', this.form)

          this.$axios(editAdminApi(obj))
          .then(res => {
            if (res.data.code === '0000') {
              this.$message({
                showClose: true,
                message: '修改成功',
                type: 'success'
              })
              this.updateAdminInfo()
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
        // 如果提供了事件对象，则这是一个非IE浏览器
      if (e && e.preventDefault) {
        // 阻止默认浏览器动作(W3C)
        e.preventDefault()
      } else {
        // IE中阻止函数器默认动作的方式
        window.event.returnValue = false
      }
      var vm = this
      // var imgLimit = 1024
      var files = e.target.files
      var image = new Image()
      let dd
      // let base64
      if (files.length > 0) {
        dd = 0
        image.src = window.URL.createObjectURL(files.item(dd))
        image.onload = function () {
          var w = image.width
          var h = image.height
          var scale = w / h
          w = 200
          h = w / scale
                  // 默认图片质量为0.7，quality值越小，所绘制出的图像越模糊
          var quality = 0.9
                  // 生成canvas
          var canvas = document.createElement('canvas')
          var ctx = canvas.getContext('2d')
                  // 创建属性节点
          var anw = document.createAttribute('width')
          anw.nodeValue = w
          var anh = document.createAttribute('height')
          anh.nodeValue = h
          canvas.setAttributeNode(anw)
          canvas.setAttributeNode(anh)
          ctx.drawImage(image, 0, 0, w, h)
          var ext = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase()// 图片格式
            // var base64 = canvas.toDataURL('image/' + ext, quality)
          var base64 = canvas.toDataURL('image/' + ext, quality)
          console.log('base64', base64)
          console.log('files[0]', files[0])
          let base = base64.split(',')
          let obj = {}
            // obj.saveFile = ''
          if (vm.imgSrc) {
            obj.saveFile = vm.imgSrc
          }
          var formdata = new FormData()
          formdata.append('files', files[0], files[0].name)
          formdata.append('saveFile', vm.imgSrc)
          formdata.append('saveFiless', 'vm.imgSrc')
          console.log('formdata', formdata.get('files'))
          let config = {
            headers: {'Content-Type': 'multipart/form-data',
              'Access-Control-Allow-Origin': '*'}
          }
      //     headers: {
      //   'Content-Disposition': 'form-data',
      //   'Content-Type': 'application/x-www-form-urlencoded',
      //   'Access-Control-Allow-Origin': '*'
      // }
          // vm.$axios.post('http://192.168.2.131:80/BPWatch/admin/file/upload/commons', formdata, config)
          // obj.files = formdata
          // console.log('file', files)
          // console.log('file', files)
          // console.log('files.item(dd)', files.item(dd))
          // console.log('base', base)
          vm.$axios(uploadFileApi(formdata))
          .then(res => {
            if (res.data.code === '0000') {
              vm.imgSrc = res.data.seeFile
              vm.uploadSrc = res.data.saveFile
            } else {
              // alert('error')
            }
            // return false
          })
          console.log(files)
        }
      }

      var formdata = new FormData()
      formdata.append('file', files[0])
      // let files = e.target.files[0]

      return false
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
    if (this._.has(this.adminInfo, 'name')) {
      this.form.name = this.adminInfo.name
    }
    if (this._.has(this.adminInfo, 'mobile')) {
      this.form.mobile = this.adminInfo.mobile
    }
    if (this._.has(this.adminInfo, 'email')) {
      this.form.email = this.adminInfo.email
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
    .img-wrap{
        position: absolute;
        width: 150px;
        height: 150px;
        text-align: center;
        // vertical-align: middle;
        // line-height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          // width: 150px;
          min-width: 90px;
          max-width: 150px;
          max-height: 150px;
        }
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
      .img-wrap{
        z-index: -1;
        // width: 150px;
        // width: 150px;
        // height: 150px;
        // background: rgba(0, 0, 0, 0.4);
        // position: absolute;
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
  .avatar-uploader{
    position: absolute;
    width: 150px;
    height: 150px;
    z-index: 66;
    // top:50px;
    // left: 50px;
  }
</style>

