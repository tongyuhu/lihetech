<template>
  <div>
    <div class="head-edit clear">
      <div class="head-title">医生管理</div>
      <div class="head-edit-wrap">
        <button class="head-edit-button margin-right" @click="addDoctor">新增医生</button>
        <button class="head-edit-button delete" @click="deleteDoctor">删除</button>
      </div>
    </div>
    <div>
      <el-card>
        <div class="search">
          <el-input placeholder="账号 \ 姓名 \ 电话" v-model="searchDoctorMsg" size="small"
          :style="{'padding':'0'}" 
          :maxlength="30"
          >
            <el-button slot="append" icon="el-icon-search" @click="selectName"></el-button>
          </el-input>
        </div>
        <!-- <table v-loading="loading">
          <tr>
            <th width="40px" class="checked"></th>
            <th>序号</th>
            <th>登录账号</th>
            <th>医生姓名</th>
            <th>联系电话</th>
            <th>邮箱</th>
            <th>备注</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item,index) in doctorList" :key="index">
            <td class="checked">
              <el-checkbox  v-model="item.checked" @change="doctorSelectionChange(item,index)"></el-checkbox>
            </td>
            <td width="50px">{{index}}</td>
            <td>{{item.username}}</td>
            <td>{{item.name}}</td>
            <td>{{item.mobile}}</td>
            <td>{{item.email}}</td>
            <td>{{item.adminNote}}</td>
            <td>
              <el-button type="text" @click="editDoctor(item)">
              <span class="action-text"> <i class="el-icon-edit-outline"></i> 
              编辑</span>
              </el-button>
            </td>
          </tr>
          <tr v-if="doctorList.length === 0">
            <td colspan="8">暂无数据</td>
          </tr>
        </table> -->
        <el-table
        ref="doctorlist"
        :data="doctorList"
        style="width:100%"
        border
        @selection-change="doctorSelectionChange">
          <el-table-column
          type="selection"
          width="55"
          align="center">
          </el-table-column>
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
          width="100">
            <template slot-scope="scope">
              <el-button type="text" @click="editDoctor(scope.row)">
              <span class="action-text"> <i class="el-icon-edit-outline"></i> 
              编辑</span>
              </el-button>
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
    <div class="dialog">
      <!-- 修改医生 -->
      <el-dialog
        :visible.sync="modifyDoctor"
        width="456px"
        center>
        <div class="input-wrap">
          <span>医生姓名:</span>
          <input type="text" v-model="editDoctorName">
        </div>
        <div class="input-wrap">
          <span>联系电话:</span>
          <input type="text" v-model="editDoctorPhone">
        </div>
        <div class="input-wrap">
          <span>已绑定居民:</span>
          <input type="text" v-model="editDoctorPerson">
        </div>
        <div class="input-wrap">
          <span>组织站点:</span>
          <input type="text" v-model="editDoctorAddress">
        </div>
        <span slot="title" class="dialog-title">修改医生</span>
        <span slot="footer" class="dialog-footer">
          <button  type="primary" @click="editDoctorConfirm">确 定</button>
          <button class="cancel" @click="editDoctorCancel">取 消</button>
        </span>
      </el-dialog>

      <el-dialog
        :visible.sync="confirmDelete"
        width="456px"
        center>
        <span slot="title" class="dialog-title">确定删除该医生记录吗？</span>
        <span slot="footer" class="dialog-footer">
          <button  type="primary" @click="confirmDeleteHandle">确 定</button>
          <button class="cancel" @click="cancelDeleteHandle">取 消</button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {getDoctorListAPI, editDoctorAPI} from '@/api/views/Hospital/BloodHeigh/H-personManage'
export default {
  name: 'accountSetting',
  data () {
    return {
      doctorList: [
        // {
        //   loginAccount: '2016-05-03',
        //   doctorName: '王小虎',
        //   doctorPhone: '上海市普陀区金沙江路 1518 弄',
        //   doctorEmail: '上海市普陀区金沙江路 1518 弄',
        //   doctorMark: '上海市普陀区金沙江路 1518 弄'
        // },
        // {
        //   loginAccount: '2016-059-03',
        //   doctorName: '王小虎',
        //   doctorPhone: '上海市普陀区金沙江路 1518 弄',
        //   doctorEmail: '上海市普陀区金沙江路 1518 弄',
        //   doctorMark: '上海市普陀区金沙江路 1518 弄'
        // }
        // {
        //   loginAccount: '2016-05-03',
        //   doctorName: '王小虎',
        //   doctorPhone: '上海市普陀区金沙江路 1518 弄',
        //   doctorEmail: '上海市普陀区金沙江路 1518 弄',
        //   doctorMark: '上海市普陀区金沙江路 1518 弄'
        // },
        // {
        //   loginAccount: '2016-05-03',
        //   doctorName: '王小虎',
        //   doctorPhone: '上海市普陀区金沙江路 1518 弄',
        //   doctorEmail: '上海市普陀区金沙江路 1518 弄',
        //   doctorMark: '上海市普陀区金沙江路 1518 弄'
        // }
      ],
      readyDelete: [],
      searchDoctorMsg: null,
      currentPage: 1,
      pageSize: 10,
      totalpage: null,
      loading: false,
      modifyDoctor: false,
      editDoctorName: '',
      editDoctorPhone: '',
      editDoctorPerson: '',
      editDoctorAddress: '',
      doctorId: '',
      roleId: '',
      confirmDelete: false
    }
  },

  methods: {
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
    // 选择要删除的医生
    doctorSelectionChange (selection) {
      this.readyDelete = selection
      console.log('delete', this.readyDelete)
    },
    // 模糊搜索医生
    selectName () {
      if (!this.searchDoctorMsg) {
        this.getDoctorList()
      } else {
        let param = {}
        if (this._.isNumber(this.searchDoctorMsg) && this.searchDoctorMsg.length > 6) {
          param.param = this.searchDoctorMsg
        } else {
          param.name = this.searchDoctorMsg
        }
        param.pageSize = this.pageSize
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
    // 编辑医生打开弹窗 信息
    editDoctor (doctor) {
      this.editDoctorName = doctor.name
      this.editDoctorPhone = ''
      this.editDoctorAddress = doctor.address
      this.doctorId = doctor.id
      this.roleId = doctor.roleId
      this.modifyDoctor = true

      console.log(doctor)
    },
    editDoctorCancel () {
      this.editDoctorName = ''
      this.editDoctorPhone = ''
      this.editDoctorAddress = ''
      this.doctorId = ''
      this.roleId = ''
      this.modifyDoctor = false
    },
    editDoctorConfirm () {
      let params = {
        'id': this.doctorId,
        'username': this.editDoctorName,
        'mobile': this.editDoctorPhone,
        'regionId': this.editDoctorAddress,
        'roleId': this.roleId
      }
      console.log('params', params)
      this.$axios(editDoctorAPI(params))
      .then(res => {
        if (res.data.code !== '0000') {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        }
        this.modifyDoctor = false
      })
    },
    // 删除打开弹窗
    deleteDoctor () {
      if (this.readyDelete.length !== 0) {
        this.confirmDelete = true
      }
    },
    // 确认删除
    confirmDeleteHandle () {
      this.doctorList = this._.differenceWith(this.doctorList, this.readyDelete, this._.isEqual)
      this.confirmDelete = false
    },
    // 取消删除
    cancelDeleteHandle () {
      this.readyDelete = []
      this.$refs.doctorlist.clearSelection()
      // this.doctorList = this.formatterDoctorList(this.doctorList)
      this.confirmDelete = false
    },
    // 添加医生 跳转路由
    addDoctor () {
      this.$router.push({
        name: 'addDoctor'
      })
    },
    // 获取医生列表
    getDoctorList () {
      let param = {
        pageNum: this.currentPage,
        pageSize: this.pageSize
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
        // this.doctorList = this.formatterDoctorList(this.doctorList)
      })
    }
  },
  mounted () {
    this.getDoctorList()
  },
  updated () {

  }
}
</script>



<style lang="scss" scoped>
// table{
//   border-collapse:collapse;
//   width: 100%;
//   font-size: 14px;
//   border: 1px solid #eaeaea;
//   th, td{
//   border: 1px solid #eaeaea;
//   text-align: center;
//   vertical-align: middle;
//   min-height: 40px;
//   height: 40px;
//   line-height: 28px;
//   // min-width: 80px;
//   color: #666;
//   }
//   tr:nth-child(n+2):hover{
//     background-color: #f5f7fa;
//   }
//   .checked{
//     // max-width: 40px !important;
//     text-align: center;

//     // margin:0 auto;
//     &>div{
//       cursor: pointer;
//       width: 20px;
//       height: 20px;
//     }
//     & button{
//       cursor: pointer;
//       // width: 20px;
//       // height: 20px;
//       padding: 0;
//       margin:0;
//       background: #fff;
//       // font-size: 0;
//     }
//     .checked-default{
//        position: relative;
//       cursor: pointer;
//     }
//     .checked-default::before{
//       left: 0;
//       cursor: pointer;
//       bottom:0;
//       position: absolute;
//       content: '';
//       display: block;
//       width: 20px;
//       height: 20px;
//       background: url("~icon/hospital-icon-45.png") no-repeat;
//     }
//     .checked-icon{
//       position: relative;
//       cursor: pointer;
//     }
//     .checked-icon::before{
//       left: 0;
//       cursor: pointer;
//       bottom:0;
//       position: absolute;
//       content: '';
//       display: block;
//       width: 20px;
//       height: 20px;
//       background: url("~icon/hospital-icon-44.png") no-repeat;
//     }

//   }
// }

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
      border:1px solid #1991fc;
      &:hover{
        opacity: 1;
      }
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
</style>
<style>
.el-input-group__append, .el-input-group__prepend{
  background-color: #fff;
}
/* .el-input__inner{
  border-right:none;
} */
</style>
