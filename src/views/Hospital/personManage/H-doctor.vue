<template>
  <div>
    <div class="head-edit clear">
      <div class="head-title">医生管理</div>
      <div class="head-edit-wrap">
        <button v-if="showEnabled" class="head-edit-button margin-right" @click="addDoctor">新增医生</button>
      </div>
    </div>
    <!-- 医生管理列表 -->
    <div class="loading-min-height" v-loading="loading">
      <el-card>
        <div class="search">
          <el-input placeholder="账号 \ 姓名 \ 电话" v-model="searchDoctorMsg" size="small"
          :style="{'padding':'0'}" 
          :maxlength="30"
          >
            <el-button slot="append" icon="el-icon-search" @click="selectName"></el-button>
          </el-input>
        </div>
        <el-table
        ref="doctorlist"
        :data="doctorList"
        style="width:100%"
        border
        @selection-change="doctorSelectionChange">
          <el-table-column
          label="序号"
          type="index"
          width="55"
          align="center">
          </el-table-column>
          <el-table-column
          prop="username"
          label="登录账号"
          align="center">
          </el-table-column>
          <el-table-column
          prop="name"
          label="医生姓名"
          align="center">
          </el-table-column>
          <el-table-column
          prop="mobile"
          label="联系电话"
          align="center">
          </el-table-column>
          <el-table-column
          prop="email"
          label="邮箱"
          align="center">
          </el-table-column>
          <el-table-column
          prop="adminNote"
          label="备注"
          align="center">
          </el-table-column>
          <el-table-column
          label="操作"
          align="center"
          :width="doctorEditCellWidth">
            <template slot-scope="scope">
              <el-button type="text" @click="editDoctor(scope.row)">
              <span class="action-text"> <i class="el-icon-edit-outline"></i> 
              编辑</span>
              </el-button>
            </template>
          </el-table-column>
          <!-- 医院权限 -->
          <el-table-column
          prop=""
          label="启/停用"
          align="center"
          width="70"
          v-if="showEnabled">
            <template slot-scope="scope">
              <el-switch
              v-model="scope.row.enabled"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :width="40"
              @change="doctorEnabled(scope.row)">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
          v-if="locked"
          prop=""
          label="锁定提示"
          align="center"
          width="70"
          >
            <template slot-scope="scope">
              <el-popover
                ref="popoverTip"
                placement="top-start"
                width="200"
                trigger="hover"
                content="请修改密码以解除锁定状态">
              </el-popover>
              <el-button type="text" :style="{color:'#e87070'}" v-popover:popoverTip>查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalpage">
        </el-pagination>
        </div>
      </el-card>
    </div>
    <!-- 修改信息 -->
    <div class="dialog">
      <!-- 修改医生 -->
      <el-dialog
        :visible.sync="modifyDoctor"
        width="456px"
        center>

        <el-form 
        :model="editDoctorForm" 
        status-icon 
        :rules="editDoctorRules" 
        ref="editDoctorFormref" 
        label-width="90px" 
        :label-position="labelPosition"
        >
          <el-form-item label="医生姓名" prop="name">
            <el-input type="text" v-model="editDoctorForm.name" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="mobile">
            <el-input type="text" v-model="editDoctorForm.mobile" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input type="email" v-model="editDoctorForm.email" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="editDoctorForm.password" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="adminNote">
            <el-input type="text" v-model="editDoctorForm.adminNote" size="medium"></el-input>
          </el-form-item>
          <el-form-item class="submit-btn"
          label-width="0px" >
            <el-button type="primary" size="small" @click.prevent="editDoctorConfirm('editDoctorFormref')">保存</el-button>
            <el-button type="primary" size="small" @click.prevent="editDoctorCancel('editDoctorFormref')">取消</el-button>
          </el-form-item>
        </el-form>

        <span slot="title" class="dialog-title">修改医生</span>
        <!-- <span slot="footer" class="dialog-footer"> -->
          <!-- <button  type="primary" @click="editDoctorConfirm">确 定</button> -->
          <!-- <button class="cancel" @click="editDoctorCancel">取 消</button> -->
        <!-- </span> -->
      </el-dialog>

      <el-dialog
        :visible.sync="confirmDelete"
        width="456px"
        center>
        <span slot="title" class="dialog-title">确定删除该医生记录吗？</span>
        <span slot="footer">
          <el-button type="primary" size="small" @click="confirmDeleteHandle">确 定</el-button>
          <el-button type="primary" size="small" @click="cancelDeleteHandle">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {getDoctorListAPI, editDoctorAPI, doctorEnabledAPI} from '@/api/views/Hospital/BloodHeigh/H-personManage'
import {mapState} from 'vuex'
export default {
  name: 'accountSetting',
  data () {
    // email检查
    var checkEmail = (rule, value, callback) => {
      let emailrule = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if (!value) {
        callback()
        // return callback(new Error('请输入邮箱'))
        // return true
      } else if (!emailrule.exec(value)) {
        return callback(new Error('请输入正确的邮箱'))
        // callback()
      } else {
        callback()
      }
    }
    // 姓名检查
    var checkName = (rule, value, callback) => {
      let namerule = /^.{1,20}$/
      if (!value) {
        callback()
        // return callback(new Error('请输入姓名'))
      } else if (!namerule.exec(value)) {
        return callback(new Error('请输入正确的姓名'))
      } else {
        callback()
      }
    }
    // 手机号
    var checkMobile = (rule, value, callback) => {
      let mobilerule = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/
      if (!value) {
        callback()
        // return callback(new Error('请输入电话'))
      } else if (!mobilerule.exec(value)) {
        return callback(new Error('请输入正确的电话'))
      } else {
        callback()
      }
    }
    // 备注
    var checkAdminNote = (rule, value, callback) => {
      // let accountRule = /[a-zA-Z0-9_]{4,15}$/
      let adminNoteRule = /^.{1,20}$/
      if (!value) {
        callback()
      // return callback(new Error(''))
      } else if (!adminNoteRule.exec(value)) {
        return callback(new Error('允许1-20个字符'))
      } else {
        callback()
      }
    }
    // 密码
    var checkPass = (rule, value, callback) => {
      let passrule = /^[a-zA-Z]\w{5,8}$/
      if (!value) {
        callback()
        // return callback(new Error('密码不能为空'))
      } else if (!passrule.exec(value)) {
        callback(new Error('请输入6~9密码，以字母开头,可包含数字和下划线'))
      } else {
        callback()
      }
    }
    return {
      // 编辑单元格宽度
      doctorEditCellWidth: 100,
      // 医院权限
      // 新增医生 医生启用  停用
      showEnabled: false,
      // 是否有账户锁定
      locked: false,
      // 医生列表
      doctorList: [
      ],
      // 选择要删除的医生
      readyDelete: [],
      // 模糊搜索医生
      searchDoctorMsg: null,
      // 页码
      currentPage: 1,
      pageSize: 10,
      totalpage: 0,
      // 加载动画
      loading: false,
      // 修改医生弹窗显示
      modifyDoctor: false,
      // 医生id
      doctorId: '',
      roleId: '',
      confirmDelete: false,
      // 修改医生label位置
      labelPosition: 'right',
      // 修改医生表单数据
      editDoctorForm: {
        'id': null,
        'name': null,
        'mobile': null,
        // 'regionId': null,
        // 'roleId': null,
        'email': null,
        'adminNote': null,
        'password': null
      },
      // 修改医生表单验证规则
      editDoctorRules: {
        name: [
          { validator: checkName, trigger: 'blur' }
        ],
        mobile: [
          { validator: checkMobile, trigger: 'blur' }
          // {required: false}
        ],
        email: [
            { validator: checkEmail, trigger: 'blur' }
        ],
        adminNote: [
          { validator: checkAdminNote, trigger: 'blur' }
        ],
        password: [
          { validator: checkPass, trigger: 'blur' }
          //  { required: true, message: '请输入密码', trigger: 'blur' },
          //  {min: 6, max: 9, message: '请输入6-9位密码', trigger: 'blur'}
        ]
      },
      // 医生的默认基本信息
      editDoctorMsg: {
        'id': null,
        'name': null,
        'mobile': null,
        'email': null,
        'adminNote': null,
        'password': null
      }
    }
  },
  computed: {
    ...mapState([
      'adminInfo'
    ])
  },
  methods: {
    /**
     * @description 初始化医生列表选择状态为false
     */
    formatterDoctorList (list) {
      if (list.length === 0) {
        return list
      } else {
        list.forEach(item => {
          item.checked = false
        })
      }
      return list
    },
    /**
     * @param {array} selection 选择的医生列表
     * @description 选择医生
     */
    doctorSelectionChange (selection) {
      this.readyDelete = selection
      console.log('delete', this.readyDelete)
    },
    /**
     * @description 模糊搜索医生
     */
    selectName () {
      if (!this.searchDoctorMsg) {
        this.getDoctorList()
      } else {
        let param = {}
        param.pageSize = this.pageSize
        param.fields = this._.toString(this.searchDoctorMsg)
        this.$axios(getDoctorListAPI(param))
        .then(res => {
          this.doctorList = []
          this.totalpage = res.data.recordCount
          this.currentPage = res.data.pageNum
          if (res.data.data.length !== 0) {
            res.data.data.forEach(item => {
              this.doctorList.push(item)
            })
          }
        })
      }
    },
    // 页数变化
    handleSizeChange (val) {
      this.pageSize = val
      this.getDoctorList()
      console.log(`每页 ${val} 条`)
    },
    // 当前页变化
    handleCurrentChange (val) {
      this.currentPage = val
      this.getDoctorList()
      console.log(`当前页: ${val}`)
    },
    /**
     * @param {object} doctor 医生信息
     * @description 打开编辑医生弹窗 初始化医生信息
     */
    editDoctor (doctor) {
      this.editDoctorForm.id = doctor.id
      this.editDoctorForm.name = doctor.name || ''
      this.editDoctorForm.mobile = doctor.mobile || ''
      this.editDoctorForm.email = doctor.email || ''
      this.editDoctorForm.adminNote = doctor.adminNote || ''
      this.editDoctorForm.password = doctor.password || ''

      this.editDoctorMsg.id = doctor.id
      this.editDoctorMsg.name = doctor.name || ''
      this.editDoctorMsg.mobile = doctor.mobile || ''
      this.editDoctorMsg.email = doctor.email || ''
      this.editDoctorMsg.adminNote = doctor.adminNote || ''
      this.editDoctorMsg.password = doctor.password || ''
      this.modifyDoctor = true
      console.log(doctor)
    },
    /**
     * @description 取消编辑医生
     */
    editDoctorCancel () {
      this.editDoctorName = ''
      this.editDoctorPhone = ''
      this.editDoctorAddress = ''
      this.doctorId = ''
      this.roleId = ''
      this.modifyDoctor = false
    },
    /**
     * @param {string} formName 表单ref
     * @description 确认编辑医生
     */
    editDoctorConfirm (formName) {
      let vm = this
      vm.$refs[formName].validate((valid) => {
        if (valid) {
          if (vm.editDoctorForm.id === vm.editDoctorMsg.id) {
            // vm.editDoctorMsg.id
          }
          if (vm.editDoctorForm.name === vm.editDoctorMsg.name) {
            vm.editDoctorMsg.name = ''
          } else {
            vm.editDoctorMsg.name = vm.editDoctorForm.name
          }
          if (vm.editDoctorForm.mobile === vm.editDoctorMsg.mobile) {
            vm.editDoctorMsg.mobile = ''
          } else {
            vm.editDoctorMsg.mobile = vm.editDoctorForm.mobile
          }
          if (vm.editDoctorForm.email === vm.editDoctorMsg.email) {
            vm.editDoctorMsg.email = ''
          } else {
            vm.editDoctorMsg.email = vm.editDoctorForm.email
          }
          if (vm.editDoctorForm.adminNote === vm.editDoctorMsg.adminNote) {
            vm.editDoctorMsg.adminNote = ''
          } else {
            vm.editDoctorMsg.adminNote = vm.editDoctorForm.adminNote
          }
          console.log('editDoctorMsg', vm.editDoctorMsg)
          vm.$axios(editDoctorAPI(vm.editDoctorMsg))
          .then(res => {
            if (res.data.code !== '0000') {
              vm.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
            if (res.data.code === '0000') {
              vm.$message({
                message: '修改成功',
                type: 'success'
              })
              this.getDoctorList()
              vm.modifyDoctor = false
            }
          })
        } else {
          return false
        }
      })
    },
    /**
     * @description 删除医生打开确认弹窗
     */
    deleteDoctor () {
      if (this.readyDelete.length !== 0) {
        this.confirmDelete = true
      }
    },
    /**
     * @description 确认删除
     */
    confirmDeleteHandle () {
      this.doctorList = this._.differenceWith(this.doctorList, this.readyDelete, this._.isEqual)
      this.confirmDelete = false
    },
    /**
     * @description  取消删除
     */
    cancelDeleteHandle () {
      this.readyDelete = []
      this.$refs.doctorlist.clearSelection()
      this.confirmDelete = false
    },
    /**
     * @description 添加医生 跳转到添加页面
     */
    addDoctor () {
      this.$router.push({
        name: 'addDoctor'
      })
    },
    /**
     * @description 获取医生列表
     */
    getDoctorList () {
      this.loading = true
      let param = {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      if (this.searchDoctorMsg) {
        param.fields = this.searchDoctorMsg
      }
      this.$axios(getDoctorListAPI(param))
      .then(res => {
        this.doctorList = []
        this.totalpage = res.data.recordCount
        this.currentPage = res.data.pageNum
        if (res.data.data.length !== 0) {
          res.data.data.forEach(item => {
            this.doctorList.push(item)
          })
        }
        this.doctorList.forEach(item => {
          if (this._.has(item, 'locked')) {
            if (item.locked) {
              this.locked = true
            }
          }
        })
        this.loading = false
        console.log('doctorList', this.doctorList)
      })
      .catch(err => {
        console.log(err, '获取医生列表失败')
        this.loading = false
      })
    },
    /**
     * @param {obj} val 医生信息
     * @description 停用、启用医生账号
     */
    doctorEnabled (val, doctor) {
      console.log('停用', val, doctor)
      let param = {
        id: val.id,
        enabled: val.enabled
      }
      let msg = '停用'
      if (val.enabled) {
        msg = '启用'
      }
      this.$axios(doctorEnabledAPI(param))
      .then(res => {
        if (res.data.code === '0000') {
          this.$message({
            message: msg + '成功',
            type: 'success'
          })
        } else {
          this.getDoctorList()
        }
      })
    }
  },
  mounted () {
    /**
     * 权限 医院有停用启用医生账号权限
     */
    if (this.adminInfo.adminType === 1 || this.adminInfo.adminType === 2) {
      this.doctorEditCellWidth = 250
      this.showEnabled = true
    }
    this.getDoctorList()
  }
}
</script>



<style lang="scss" scoped>
input{
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 35px;
    line-height: 35px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    // width: 100%;
    &:hover{
      border: 1px solid #1991fc;
    }
}
.input-wrap{
  margin-bottom: 15px;
  margin-left: 25px;
  & span{
    display: inline-block;
    width: 80px;
  }
}
button{
  border:none;
  outline: none;
}
.head-title{
  float: left;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-top:6px;
  font-size: 24px;
  color:#041421;
}
.head{
  padding-bottom: 10px;
  padding-left: 15px;
  padding-top:6px;
  font-size: 24px;
  color:#041421;
  &-edit{
    margin-bottom: 20px;
    &-wrap{
      float: right;
    }
    .margin-right{
      margin-right: 15px;
    }
    &-button{
      width: 130px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      font-size: 18px;
      color:#fff;
      opacity: 0.9;
      background-color: #1991fc;
      cursor: pointer;
      border-radius: 2px;
      &:hover{
        opacity: 1;
      }
    }
    .delete{
      background-color: #e87070;
    }
  }
}
.tableTitle{
  height: 20px;
  color: #041421;
  font-size:16px;
}
.action-text{
  color: #1991fc;
  font-size: 14px;
}
.table-height{
  height: 40px;
  color: #e87070;
}
.search{
  width: 200px;
  margin-bottom: 15px;
}
.page{
  margin-top:20px;
}
.dialog{
  &-title{
    // color:#041421;
    font-weight: bold;
  }
  button{
    font-size: 14px;
  }
  .cancel{
    background-color: #fff;
    color:#1991fc;
    border:1px solid #1991fc;
    margin-left: 20px;
  }
}
.input{
  width:300px;
  display:flex;
}
.submit-btn{
  text-align: center;
}
// .submit-btn button{
//   margin-left: 10px;
//   margin-right:10px;
// }
.loading-min-height{
  min-height: 400px;
  width: 100%;
}
</style>
<style>
.el-input-group__append, .el-input-group__prepend{
  background-color: #fff;
}
/* .el-input__inner{
  border-right:none;
} */
</style>
