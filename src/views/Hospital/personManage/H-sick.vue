<template>
  <div>
    <div class="head-edit clear">
      <div class="head-title">患者管理</div>
      <div class="head-edit-wrap">
        <button class="head-edit-button margin-right" @click="addSick">新增患者</button>
        <!-- <button class="head-edit-button delete" @click="deleteSick">删除</button> -->
      </div>
    </div>
    <div class="loading-min-height" v-loading="loading">
      <el-card>
        <!-- 模糊搜索 -->
        <div class="card-head clear">
          <!-- <div class="card-head-left sick-type-btn">
            <button :class="{'sick-type-checked':checkblood}" @click="checkedblood">高血压</button>
            <button :class="{'sick-type-checked':!checkblood}" @click="checkedsuger">糖尿病</button>
          </div> -->
          <div class="search card-head-left">
            <el-input placeholder="账号 \ 姓名 \ 电话" v-model="searchSickMsg" size="small"
            :style="{'padding':'0'}"
            :maxlength="30"
            >
              <el-button slot="append" icon="el-icon-search" @click="selectName"></el-button>
            </el-input>
          </div>
        </div>


        <el-table
        border
        ref="sicklist"
        :data="sickList"
        style="width:100%"
        @selection-change="SickSelectionChange">
          <!-- <el-table-column
          type="selection"
          width="55"
          align="center">
          </el-table-column> -->
          <el-table-column
          label="序号"
          type="index"
          width="55"
          align="center">
          </el-table-column>
          <el-table-column
          prop="realName"
          label="姓名"
          align="center">
          </el-table-column>
          <el-table-column
          prop="sicktype"
          label="患者类型"
          align="center">
          </el-table-column>
          <el-table-column
          prop="mobile"
          label="联系电话"
          align="center">
          </el-table-column>
          <!-- <el-table-column
          prop="email"
          label="严重比例 暂无"
          align="center">
          </el-table-column> -->
          <!-- <el-table-column
          prop="adminNote"
          label="病情 无"
          align="center">
          </el-table-column> -->
          <el-table-column
          prop="joinHospitalTime"
          label="加入时间"
          align="center">
          </el-table-column>
          <!-- <el-table-column
          label="操作"
          align="center"
          width="100">
            <template slot-scope="scope">
              <el-button type="text" @click="editSick(scope.row)">
              <span class="action-text"> <i class="el-icon-edit-outline"></i> 
              编辑</span>
              </el-button>
            </template>
          </el-table-column> -->
        </el-table>
        <!-- 分页 -->
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
      <!-- 编辑患者弹窗 -->
      <el-dialog
        :visible.sync="modifySick"
        width="456px"
        center>
        <div class="input-wrap">
          <span>患者姓名:</span>
          <input type="text" v-model="editSickName">
        </div>
        <div class="input-wrap">
          <span>患者电话:</span>
          <input type="text" v-model="editSickPhone">
        </div>
        <div class="input-wrap">
          <span>患者类型:</span>
          <input type="text" v-model="editSickPerson">
        </div>
        <div class="input-wrap">
          <span>病情:</span>
          <input type="text" v-model="editSickAddress">
        </div>
        <span slot="title" class="dialog-title">修改患者</span>
        <span slot="footer">
          <el-button type="primary" size="small" @click="modifySick = false">确 定</el-button>
          <el-button type="primary" size="small" @click="modifySick = false">取 消</el-button>
        </span>
      </el-dialog>
      <!-- 删除患者弹窗 -->
      <el-dialog
        :visible.sync="confirmDelete"
        width="456px"
        center>
        <span slot="title" class="dialog-title">确定删除该患者记录吗？</span>
        <span slot="footer">
          <el-button  type="primary" size="small" @click="confirmDeleteHandle">确 定</el-button>
          <el-button type="primary" size="small" @click="cancelDeleteHandle">取 消</el-button>
        </span>
      </el-dialog>
      <!-- 添加患者二维码 -->
      <el-dialog
        :visible.sync="showAddSick"
        width="456px"
        center>
        <span slot="title" class="dialog-title">请患者扫描下方二维码</span>
        <div class="add-sick-img">
          <img width="200px" :src="addSickImg" alt="二维码">
        </div>
        <span slot="footer">
          <div class="erocde-btn">
            <el-button size="small" type="primary" @click="confirmAddSick">确 定</el-button>
          </div>
          <!-- <button class="cancel" @click="showAddSick = false">取 消</button> -->
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {getSickListAPI} from '@/api/views/Hospital/BloodHeigh/H-personManage'
import {mapActions} from 'vuex'
export default {
  name: 'sick-manage',
  data () {
    return {
      // 加载动画
      loading: false,
      checkblood: true,
      // sicktype: 'bloodPressureType',
      sickList: [
      ],
      // 删除患者列表
      readyDelete: [],
      // 模糊搜索
      searchSickMsg: null,
      // 分页
      currentPage: 1,
      totalpage: null,
      pageSize: 10,
      // 编辑患者弹窗
      modifySick: false,

      editSickName: '',
      editSickPhone: '',
      editSickPerson: '',
      editSickAddress: '',
      // 删除 患者 弹窗
      confirmDelete: false,
      // 二维码弹窗
      showAddSick: false,
      // 二维码
      addSickImg: ''
    }
  },

  methods: {
    ...mapActions(['setFriendsListActon']),
    /**
     * @description 确认添加患者 更新聊天列表
     */
    confirmAddSick () {
      this.setFriendsListActon()
      this.showAddSick = false
    },
    /**
     * @description 选择高血压列表
     */
    checkedblood () {
      // this.sicktype = 'bloodPressureType'
      this.checkblood = true
      this.currentPage = 1
      this.getSickList()
    },
    /**
     * @description 选择糖尿病列表
     */
    checkedsuger () {
      // this.sicktype = 'diabetesType'
      this.checkblood = false
      this.currentPage = 1
      this.getSickList()
    },
    /**
     * @description 初始化患者列表 转换患者类型
     */
    formatterSickList (list) {
      if (list.length === 0) {
        return list
      } else {
        list.forEach(item => {
          let sickTypelist1 = []
          let sickTypelist2 = []
          // if (item.bloodPressureType) {
          switch (item.bloodPressureType) {
            case 0: {
              sickTypelist1.push('未知')
              break
            }
            case 1: {
              sickTypelist1.push('1级高血压')
              // item.sicktype = '原发性高血压'
              break
            }
            case 2: {
              sickTypelist1.push('2级高血压')
              // item.sicktype = '继发性高血压'
              break
            }
            case 3: {
              sickTypelist1.push('3级高血压')
              // item.sicktype = '正常'
              break
            }
            case 4: {
              sickTypelist1.push('正常')
              // item.sicktype = '正常'
              break
            }
            case 5: {
              sickTypelist1.push('正常高值')
              // item.sicktype = '正常'
              break
            }
            case 6: {
              sickTypelist1.push('低压')
              // item.sicktype = '正常'
              break
            }
            default: {
              sickTypelist1.push('未知')
              // item.sicktype = '未知'
            }
          }
          // }
          // if (item.diabetesType) {
          switch (item.diabetesType) {
            case 0: {
              sickTypelist2.push('未知')
              // item.sicktype = '未知'
              break
            }
            case 1: {
              sickTypelist2.push('1型糖尿病')
              // item.sicktype = '1型糖尿病'
              break
            }
            case 2: {
              sickTypelist2.push('2型糖尿病')
              // item.sicktype = '2型糖尿病'
              break
            }
            case 3: {
              sickTypelist2.push('妊娠型糖尿病')
              // item.sicktype = '妊娠型糖尿病'
              break
            }
            case 4: {
              sickTypelist2.push('特殊型糖尿病')
              // item.sicktype = '特殊型糖尿病'
              break
            }
            case 5: {
              sickTypelist2.push('正常')
              // item.sicktype = '正常'
              break
            }
            default: {
              sickTypelist2.push('未知')
              // item.sicktype = '未知'
            }
          }
          sickTypelist1 = this._.uniqWith(sickTypelist1, this._.isEqual)
          // sickTypelist2 = this._.uniqWith(sickTypelist2, this._.isEqual)
          // item.sicktype = '高血压：' + sickTypelist1.join('、') + '；糖尿病：' + sickTypelist2.join('、')
          item.sicktype = sickTypelist1.join('、')

          // }
        })
      }
      return list
    },
    /**
     * @param {array} selection 选择的列表
     * @description 选择患者
     */
    SickSelectionChange (selection) {
      this.readyDelete = selection
      console.log('deletearr', this.readyDelete)
    },
    /**
     * @description 模糊查询
     */
    selectName () {
      if (!this.searchSickMsg) {
        this.getSickList()
      } else {
        let param = {}
        // if (this._.isNumber(this.searchSickMsg) && this.searchSickMsg.length > 6) {
        //   param.mobile = this.searchSickMsg
        // } else {
        //   param.realName = this.searchSickMsg
        // }
        param.fields = this._.toString(this.searchSickMsg)
        param.pageSize = this.pageSize
        this.$axios(getSickListAPI(param))
        .then(res => {
          this.sickList = []
          this.totalpage = res.data.recordCount
          this.currentPage = res.data.pageNum
          if (res.data.data.length !== 0) {
            res.data.data.forEach(item => {
              this.sickList.push(item)
            })
          }
          this.sickList = this.formatterSickList(this.sickList)
          console.log('sickList', this.sickList)
        })
      }
      console.log('sickList', this.sickList)
      console.log(this.searchSickMsg)
    },
    /**
     * @param {number} val 每页条数
     * @description 每页条数变化
     */
    handleSizeChange (val) {
      this.pageSize = val
      this.getSickList()
      console.log(`每页 ${val} 条`)
    },
    /**
     * @param {number} val 页数
     * @description 页数变化
     */
    handleCurrentChange (val) {
      this.currentPage = val
      this.getSickList()
      console.log(`当前页: ${val}`)
    },
    /**
     * @description 编辑患者弹窗
     */
    editSick (Sick) {
      this.modifySick = true
      console.log(Sick)
    },
    /**
     * @description 打开删除弹窗
     */
    deleteSick () {
      if (this.readyDelete.length !== 0) {
        this.confirmDelete = true
      }
    },
    /**
     * @description 确认删除患者
     */
    confirmDeleteHandle () {
      this.sickList = this._.differenceWith(this.sickList, this.readyDelete, this._.isEqual)
      this.confirmDelete = false
    },
    /**
     * @description 取消删除
     */
    cancelDeleteHandle () {
      this.readyDelete = []
      this.$refs.sicklist.clearSelection()
      this.confirmDelete = false
    },
    /**
     * @description 添加患者二维码
     */
    addSick () {
      this.showAddSick = true
      this.$axios({
        method: 'post',
        url: 'qrcode/url'
      })
      .then(res => {
        this.addSickImg = res.data.data
      })
    },
    /**
     * @description 获取患者列表
     */
    getSickList () {
      this.loading = true
      let param = {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      if (this.searchSickMsg) {
        param.fields = this.searchSickMsg
      }
      this.$axios(getSickListAPI(param))
      .then(res => {
        this.sickList = []
        this.totalpage = res.data.recordCount
        this.currentPage = res.data.pageNum
        if (res.data.data.length !== 0) {
          res.data.data.forEach(item => {
            this.sickList.push(item)
          })
        }
        this.sickList = this.formatterSickList(this.sickList)
        this.loading = false
        console.log('sickList', this.sickList)
      })
      .catch(err => {
        console.log('获取患者列表失败', err)
        this.loading = false
      })
    }

  },
  mounted () {
    this.getSickList()
    // console.log('sickList', this.sickList)
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
//     max-width: 40px !important;
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
  .card-head{
    // display: table-cell;
    // vertical-align: middle;
  }
  .card-head-left{
    float: left;
  }
  .sick-type-btn{
    margin-right: 20px;
    & button{
      width: 80px;
      background-color: #fff;
      height: 33px;
      border-radius: 2px;
      color:#666;
      font-size: 14px;
      cursor: pointer;
    }
    .sick-type-checked{
      background-color: #1991fc;
      color:#fff
    }
  }
  .page{
    margin-top:20px;
  }
  .dialog{
    &-title{
      // color:#041421;
      font-weight: bold;
    }
    .erocde-btn{
      button{
          font-size: 16px;
      }
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
  .add-sick-img{
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }
  .loading-min-height{
    min-height: 400px;
    width: 100%;
  }
</style>
