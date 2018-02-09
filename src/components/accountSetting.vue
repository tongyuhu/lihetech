<template>
  <div @click.stop="editTips('box')">
    <div class="head">
      <span>张江高科诊所</span>
    </div>

    <el-card class="msg">
      <div class="msg-title">
        <span>消息列表</span>
      </div>
      <el-row class="action" v-show="hasTips">
        <el-col :span="3" :offset="21">
          <el-button size="mini" type="primary" @click.stop="editTips">编辑</el-button>
        </el-col>
      </el-row>
      <p class="no-tip" v-if="!hasTips">暂无消息</p>
      <el-row class="msg-list unread-tip" v-for="(tip,index) in tips" :key="tip.time" v-if="tip.show">
        <el-col :span="2" class="msg-tip">
          <span>
          {{tip.type}}
          </span>
        </el-col>
        <el-col :span="17" class="msg-content">
          {{tip.msg}}
        </el-col>
        <el-col :span="3" class="msg-time">
          <span>{{tip.time}}</span>
        </el-col>
        <el-col :span="2" v-if="editTipsShow" align="center">
          <el-button size="mini" type="danger" @click.stop="deleteTip(tip,index)">删除</el-button>
        </el-col>
        <!-- <div class="unread-tip">
        </div> -->
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
            width="150"
            align="center">
              <template slot-scope="scope">
                <!-- <p>1</p> -->
                <el-button size="mini" type="primary" @click="editDoctor(scope.row,'editDoctorForm',scope.$index)" v-hasRoot='scope.row.root'>编辑</el-button>
                <el-button size="mini" type="danger" @click="deleteDoctor(scope.$index,scope.row)" v-hasRoot='scope.row.delete'>删除</el-button>
              </template>
            </el-table-column>

          </el-table>
        </div>
      </el-card>
      <el-dialog
        title="修改信息"
        :visible.sync="editDoctorShow"
        width="40%"
        center>
        <el-form
        :model="doctorForm" 
        status-icon 
        :rules="editDoctorRules" 
        ref="editDoctorForm" 
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
          <el-button type="primary" @click="editDoctorConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
// import addDoctor from './addDoctor.vue'
import {deepcopy} from './../untils/untils'
import {tipsApi} from './../api/components/accountSetting'
export default {
  name: 'accountSetting',
  // components: {
  //   addDoctor
  // },
  data () {
    var checkEmail = (rule, value, callback) => {
      let emailrule = /^\w+((-\w+)|(\.\w+))*\\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      } else if (!emailrule.exec(value)) {
        return callback(new Error('邮箱格式不正确'))
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
      let workrule = /^.{3,20}$/
      if (!value) {
        return callback(new Error('职责不能为空'))
      } else if (!workrule.exec(value)) {
        return callback(new Error('请输入正确的职责'))
      } else {
        callback()
      }
    }
    return {
      // isDeleteTip: false,
      editTipsShow: false,
      editDoctorShow: false,
      labelPosition: 'left',
      hasTips: true,
      doctorListData: [
        {
          name: '张医生',
          work: '糖尿病管理',
          phone: '13526421302',
          email: '12456977415@qq.com',
          id: 1
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
      changeDoctorMsg: '',
      editDoctorRules: {
        name: [
          { validator: checkName, trigger: 'change' }
        ],
        work: [
          { validator: checkWork, trigger: 'change' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'change' }
        ],
        email: [
            { validator: checkEmail, trigger: 'change' }
        ]
      },
      tips: []
      // tips: [
      //   {
      //     type: '糖',
      //     msg: '今天你所管理的患者，糖尿病出现了较为明显的波动， 控糖没有达到理想的状态， 主要患者有：张丽曼、王二、刘二涛、吴大明请及时跟踪这些患者',
      //     time: '2017-12-21 12:00',
      //     read: false,
      //     show: true
      //   },
      //   {
      //     type: '糖',
      //     msg: '今天你所管理的患者，糖尿病出现了较为明显的波动， 控糖没有达到理想的状态， 主要患者有：张丽曼、王二、刘二涛、吴大明请及时跟踪这些患者',
      //     time: '2017-12-21 12:0',
      //     read: false,
      //     show: true
      //   },
      //   {
      //     type: '糖',
      //     msg: '今天你所管理的患者，糖尿病出现了较为明显的波动， 控糖没有达到理想的状态， 主要患者有：张丽曼、王二、刘二涛、吴大明请及时跟踪这些患者',
      //     time: '217-12-21 12:00',
      //     read: false,
      //     show: true
      //   }
      // ]
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
    editDoctor (msg, formname, index) {
      this.editDoctorShow = true
      setTimeout(() => {
        this.$refs[formname].clearValidate()
      }, 50)
      let copy = deepcopy(msg)
      this.doctorForm = copy
      this.changeDoctorMsg = index
    },
    deleteDoctor (index, msg) {
      // console.log(index)
      this.doctorListData.splice(index, 1)
    },
    editDoctorConfirm () {
      this.doctorListData[this.changeDoctorMsg].name = this.doctorForm.name
      this.doctorListData[this.changeDoctorMsg].work = this.doctorForm.work
      this.doctorListData[this.changeDoctorMsg].phone = this.doctorForm.phone
      this.doctorListData[this.changeDoctorMsg].email = this.doctorForm.email
      // console.log(this.doctorListData[this.changeDoctorMsg])
      // this.doctorForm
      this.editDoctorShow = false
    },
    editTips (box) {
      if (box === 'box') {
        this.editTipsShow = false
      } else {
        this.editTipsShow = !this.editTipsShow
      }
    },
    deleteTip (tip, index) {
      tip.show = false
      this.tips.splice(index, 1)
    }
    // showDeleteTip () {
    //   this.editTipsShow = true
    // }
    // editDoctorRules () {
    // }
  },
  computed: {
    // hasTips () {
    //   if (this.tips.length === 0) {
    //     return false
    //   } else {
    //     return true
    //   }
    // }
  },
  watch: {
    tips: {
      handler: function (val, oldval) {
        if (val.length === 0) {
          this.hasTips = false
        } else {
          this.hasTips = true
        }
      },
      deep: true
    }
  },
  mounted () {
    this.$axios(tipsApi)
    .then(res => {
      this.tips = res.data.tips
    })
    if (this.$store.state.adminInfo) {
      if (this.$store.state.adminInfo.adminType === 1 || this.$store.state.adminInfo.adminType === 2) {
        this.doctorListData.forEach(item => {
          item.root = true
          item.delete = true
        })
      }
      if (this.$store.state.adminInfo.adminType === 3 || this.$store.state.adminInfo.adminType === 4) {
        // this.doctorListData.indexOf
        this.doctorListData.forEach(item => {
          if (item.id === this.$store.state.adminInfo.id) {
            item.root = true
            item.delete = false
          }
        })
      }
    }
    // console.log(this.$router.currentRoute.path, 11)
  }
}
</script>

<style scoped>
.item{
  bottom: -25px;
  right: -30px;
  /* margin-top: 10px; */
  /* margin-right: 40px; */
}
  .head{
    padding-bottom: 10px;
    padding-left: 5px;
    /* text-align: center; */
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
    position: relative;
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
  .no-tip{
    text-align: center;
    font-size: 24px;
  }
  .unread-tip::after{
    bottom: 0;
    right: 0px;
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-right: 10px solid #f78989;
    border-bottom: 10px solid #f78989;
  }
</style>
