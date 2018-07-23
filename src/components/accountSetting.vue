<template>
  <div  class="accountsetting">
    <div class="head">
      <span>我的二维码</span>
    </div>
    <el-card :body-style="{ padding: '0px' }">
      <div>
        <div class="add-sick-img" v-loading="ercodeimg">
          <img v-show="!ercodeimg" width="250px" :src="addSickImg" alt="二维码图片加载失败">
        </div>
        <!-- <img src="" alt=""> -->
      </div>
    </el-card>
    <!-- <div class="head">
      <span>张江高科诊所</span>
    </div>
    <el-card class="msg" :body-style="{ padding: '0px' }">
      <div class="msg-title">
        <span>消息列表</span>
        <button @click="editTips" v-if="showEdit" :disabled="tipData.length===0">编辑</button>
        <button @click="cancelEdit" v-if="!showEdit">取消</button>
        <button @click="deleteTips" class="delete" v-if="!showEdit">删除</button>
      </div>
      <div class="msg-wrap">
        <div class="msg-container" v-for="(tip,index) in tipData" :key="index">
          <div class="msg-tip">
            <button v-if="!showEdit" @click="checkTip(index)" :class="{'checked':tip.checked}"></button>
            <span class="msg-tip-circle" v-if="showEdit"></span>
          </div>
          <div class="msg-tip">
            <span class="msg-tip-type">高血压</span>
          </div>
          <div>
            <div class="msg-tip-text">今天你所管理的患者，糖尿病出现了较为明显的波动， 控糖没有达到理想的状态， 主要患者有：张丽曼、王二、刘二涛、吴大明请及时跟踪这些患者</div>
            <div class="msg-tip-time">2017-12-21 12:00</div>
          </div>
        </div>
        <p class="no-tip" v-if="tipData.length===0">暂无消息</p>
      </div>
    </el-card> -->
  </div>
</template>

<script>
// import {deepcopy} from '@/untils/untils'
// import {getSickListAPI} from '@/api/views/Hospital/BloodHeigh/H-personManage'
export default {
  name: 'accountSetting',
  data () {
    return {
      deleteTipsArr: [],
      showEdit: true,
      tipData: [{'checked': false}, {'checked': false}, {'checked': false}],
      addSickImg: '',
      ercodeimg: false
    }
  },
  methods: {
    isExist (arr, element) {
      for (var i = 0; i < this.length; i++) {
        if (this._.eq(arr[i], element)) {
          return i
        } else {
          return -1
        }
      }
    },
    deleteCommonItem (soureArr, arr) {
      if (soureArr.length === 0) {
        return []
      } else if (arr.length === 0) {
        return soureArr
      } else {
        arr.forEach(item => {
          let index = this.isExist(soureArr, item)
          if (index !== -1) {
            soureArr.splice(index, 1)
          }
        })
        return soureArr
      }
    },
    editTips () {
      this.deleteTipsArr = []
      this.showEdit = false
    },
    tipDataInit (arr) {
      if (arr.length !== 0) {
        arr.forEach(item => {
          if (!this._.isObject(item)) {
            item = {}
          }
          item.checked = false
        })
      }
      return arr
    },
    cancelEdit () {
      this.showEdit = true
      this.deleteTipsArr = []
      this.tipDataInit(this.tipData)
    },
    deleteTips () {
      this.showEdit = true
      this.tipData = this.deleteCommonItem(this.tipData, this.deleteTipsArr)
      this.deleteTipsArr = []
    },
    checkTip (index) {
      this.tipData[index].checked = !this.tipData[index].checked
      let ready = this.tipData[index]
      if (ready.checked) {
        this.deleteTipsArr.push(ready)
      }
      if (!ready.checked) {
        if (this._.indexOf(this.deleteTipsArr, ready) !== -1) {
          this.deleteTipsArr.splice(this._.indexOf(this.deleteTipsArr, ready), 1)
        }
      }
    }
  },
  mounted () {
    this.ercodeimg = true
    this.$axios({
      method: 'post',
      url: 'qrcode/url'
    })
    .then(res => {
      this.addSickImg = res.data.data
      this.ercodeimg = false
    })
    .catch(err => {
      // if (err) {
      this.ercodeimg = false
      // }
    })
  }
  // data () {
  //   var checkEmail = (rule, value, callback) => {
  //     let emailrule = /^\w+((-\w+)|(\.\w+))*\\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
  //     if (!value) {
  //       return callback(new Error('邮箱不能为空'))
  //     } else if (!emailrule.exec(value)) {
  //       return callback(new Error('邮箱格式不正确'))
  //     } else {
  //       callback()
  //     }
  //   }
  //   var checkName = (rule, value, callback) => {
  //     let namerule = /^.{3,20}$/
  //     if (!value) {
  //       return callback(new Error('姓名不能为空'))
  //     } else if (!namerule.exec(value)) {
  //       return callback(new Error('请输入正确的姓名'))
  //     } else {
  //       callback()
  //     }
  //   }
  //   var checkPhone = (rule, value, callback) => {
  //     let phonerule = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/
  //     if (!value) {
  //       return callback(new Error('电话不能为空'))
  //     } else if (!phonerule.exec(value)) {
  //       return callback(new Error('请输入正确的电话'))
  //     } else {
  //       callback()
  //     }
  //   }
  //   var checkWork = (rule, value, callback) => {
  //     let workrule = /^.{3,20}$/
  //     if (!value) {
  //       return callback(new Error('职责不能为空'))
  //     } else if (!workrule.exec(value)) {
  //       return callback(new Error('请输入正确的职责'))
  //     } else {
  //       callback()
  //     }
  //   }
  //   return {
  //     // isDeleteTip: false,
  //     editTipsShow: false,
  //     editDoctorShow: false,
  //     labelPosition: 'left',
  //     hasTips: true,
  //     doctorListData: [
  //       {
  //         name: '张医生',
  //         work: '糖尿病管理',
  //         phone: '13526421302',
  //         email: '12456977415@qq.com',
  //         id: 1
  //       },
  //       {
  //         name: '张医生',
  //         work: '糖尿病管理',
  //         phone: '13526421302',
  //         email: '12456977415@qq.com'
  //       },
  //       {
  //         name: '张医生',
  //         work: '糖尿病管理',
  //         phone: '13526421302',
  //         email: '12456977415@qq.com'
  //       }
  //     ],
  //     doctorForm: {
  //       name: '',
  //       work: '',
  //       phone: '',
  //       email: ''
  //     },
  //     changeDoctorMsg: '',
  //     editDoctorRules: {
  //       name: [
  //         { validator: checkName, trigger: 'change' }
  //       ],
  //       work: [
  //         { validator: checkWork, trigger: 'change' }
  //       ],
  //       phone: [
  //         { validator: checkPhone, trigger: 'change' }
  //       ],
  //       email: [
  //           { validator: checkEmail, trigger: 'change' }
  //       ]
  //     },
  //     tips: []
  //     // tips: [
  //     //   {
  //     //     type: '糖',
  //     //     msg: '今天你所管理的患者，糖尿病出现了较为明显的波动， 控糖没有达到理想的状态， 主要患者有：张丽曼、王二、刘二涛、吴大明请及时跟踪这些患者',
  //     //     time: '2017-12-21 12:00',
  //     //     read: false,
  //     //     show: true
  //     //   },
  //     //   {
  //     //     type: '糖',
  //     //     msg: '今天你所管理的患者，糖尿病出现了较为明显的波动， 控糖没有达到理想的状态， 主要患者有：张丽曼、王二、刘二涛、吴大明请及时跟踪这些患者',
  //     //     time: '2017-12-21 12:0',
  //     //     read: false,
  //     //     show: true
  //     //   },
  //     //   {
  //     //     type: '糖',
  //     //     msg: '今天你所管理的患者，糖尿病出现了较为明显的波动， 控糖没有达到理想的状态， 主要患者有：张丽曼、王二、刘二涛、吴大明请及时跟踪这些患者',
  //     //     time: '217-12-21 12:00',
  //     //     read: false,
  //     //     show: true
  //     //   }
  //     // ]
  //   }
  // },
  // methods: {
  //   addDoctor () {
  //     this.$router.push({
  //       name: 'addDoctor',
  //       params: {
  //         from: this.$router.currentRoute.path
  //       }
  //     })
  //   },
  //   editDoctor (msg, formname, index) {
  //     this.editDoctorShow = true
  //     setTimeout(() => {
  //       this.$refs[formname].clearValidate()
  //     }, 50)
  //     let copy = deepcopy(msg)
  //     this.doctorForm = copy
  //     this.changeDoctorMsg = index
  //   },
  //   deleteDoctor (index, msg) {
  //     // console.log(index)
  //     this.doctorListData.splice(index, 1)
  //   },
  //   editDoctorConfirm () {
  //     this.doctorListData[this.changeDoctorMsg].name = this.doctorForm.name
  //     this.doctorListData[this.changeDoctorMsg].work = this.doctorForm.work
  //     this.doctorListData[this.changeDoctorMsg].phone = this.doctorForm.phone
  //     this.doctorListData[this.changeDoctorMsg].email = this.doctorForm.email
  //     // console.log(this.doctorListData[this.changeDoctorMsg])
  //     // this.doctorForm
  //     this.editDoctorShow = false
  //   },
  //   editTips (box) {
  //     if (box === 'box') {
  //       this.editTipsShow = false
  //     } else {
  //       this.editTipsShow = !this.editTipsShow
  //     }
  //   },
  //   deleteTip (tip, index) {
  //     tip.show = false
  //     this.tips.splice(index, 1)
  //   }
  //   // showDeleteTip () {
  //   //   this.editTipsShow = true
  //   // }
  //   // editDoctorRules () {
  //   // }
  // },
  // computed: {
  //   // hasTips () {
  //   //   if (this.tips.length === 0) {
  //   //     return false
  //   //   } else {
  //   //     return true
  //   //   }
  //   // }
  // },
  // watch: {
  //   tips: {
  //     handler: function (val, oldval) {
  //       if (val.length === 0) {
  //         this.hasTips = false
  //       } else {
  //         this.hasTips = true
  //       }
  //     },
  //     deep: true
  //   }
  // }
}
</script>

<style lang="scss" scoped>
  button{
    border:none;
    outline: none;
  }
  .accountsetting{
    height: 100%;
  }
  .head{
    padding-bottom: 10px;
    padding-left: 15px;
    padding-top:6px;
    font-size: 24px;
    color:#041421;
  }
  .msg{
    &-title{
      margin: 0 20px 10px 20px;
      border-bottom:1px solid #ebeef5;
      padding-bottom: 10px;
      // height: 28px;
      button{
        width: 60px;
        height: 20px;
        color:#fff;
        background-color: #1991fc;
        opacity:0.95;
        cursor: pointer;
        // width: 60px;
        // height: 20px;
        border-radius: 2px;
        &:hover{
          opacity:1;
          // background-color: #1579d2;
          // box-shadow: 
        }
      }
      .delete{
        background-color: #e87070;
      }
    }
    &-title>span{
      display: inline-block;
      margin-top:24px;
      margin-bottom:2px;
      margin-right: 10px;
      font-size:20px;
      color:#666;
    }
    
    &-wrap{
      margin:0 20px 30px 20px;
      // padding-bottom: 20px;
    }
    &-container{
      display: flex;
      align-items: center;
      padding:20px 0 20px 0;
      border-bottom:1px solid #eaeaea;
    }
    &-tip{
      margin-right: 10px;
      button{
        width: 21px;
        height: 21px;
        background-color: #fff;
        // background: url($url+'hospital-icon-47.png');
        background: url(~icon/hospital-icon-47.png);
        cursor: pointer;
      }
      .checked{
        background: url('~icon/hospital-icon-46.png');
      }
      &-circle{
        display: inline-block;
        height: 10px;
        width: 10px;
        background-color: #1991fc;
        border-radius: 50%;
      }
      &-type{
        display: inline-block;
        width: 70px;
        height: 70px;
        line-height: 70px;
        background-color: #def2ff;
        border-radius: 50%;
        text-align: center;
        color:#1991fc;
        // margin: 0 auto;
      }
      &-text{
        font-size: 14px;
        line-height: 20px;
      }
      &-time{
        font-size:12px;
        color:#666;
        line-height: 20px;
      }
    }
  }
.new-tip{
  color: #041421;
}
.no-tip{
  text-align: center;
  font-size: 16px;
  color: #666;
  margin-top:30px;
}
  // .msg{
  //   margin-bottom: 20px;
  // }
  // .msg-title{
  //   text-align: center;
  //   height: 40px;
  //   line-height: 40px;
  //   font-size: 16px;
  //   font-weight: 700;
  // }
  // .msg-list{
  //   position: relative;
  //   border: 2px dotted #e3e8f3;
  //   border-radius: 10px;
  //   /* padding: 20px; */
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   margin-bottom: 10px;
  // }
  // .msg-tip{
  //   border: 2px solid #ebeef5;
  //   border-radius: 50%;
  //   width: 50px;
  //   height: 50px;
  //   text-align: center;
  //   line-height: 50px;
  // }
  // .msg-time{
  //   text-align: center;
  // }
  // .msg-content{
  //   padding: 10px;
  // }
  // .action{
  //   margin-bottom: 10px;
  // }
  // .add-doctor-btn{
  //   margin-bottom: 10px;
  //   margin-left: 5px;
  // }
  // .no-tip{
  //   text-align: center;
  //   font-size: 24px;
  // }
  // .unread-tip::after{
  //   bottom: 0;
  //   right: 0;
  //   position: absolute;
  //   content: '';
  //   width: 0;
  //   height: 0;
  //   border: 10px solid transparent;
  //   border-right: 10px solid #f78989;
  //   border-bottom: 10px solid #f78989;
  // }
  .add-sick-img{
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    min-height: 250px;
    width: 100%;
  }
</style>
