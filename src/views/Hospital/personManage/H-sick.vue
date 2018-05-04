<template>
  <div>
    <div class="head-edit clear">
      <div class="head-title">患者管理</div>
      <div class="head-edit-wrap">
        <button class="head-edit-button margin-right" @click="addSick">新增患者</button>
        <button class="head-edit-button delete" @click="deleteSick">删除</button>
      </div>
    </div>
    <div>
      <el-card>
        <div class="card-head clear">
          <div class="card-head-left sick-type-btn">
            <button class="sick-type-checked">高血压</button>
            <button>糖尿病</button>
          </div>
          <div class="search card-head-left">
            <el-input placeholder="账号 \ 姓名 \ 电话" v-model="sickName" size="small"
            :style="{'padding':'0'}" 
            @blur="selectName"
            :maxlength="30"
            >
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </div>
        <table v-loading="loading">
          <tr>
            <th width="40px" class="checked"></th>
            <th>序号</th>
            <th>姓名</th>
            <th>患者类型</th>
            <th>联系电话</th>
            <th>严重比例</th>
            <th>病情</th>
            <th>加入时间</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item,index) in sickList" :key="index">
            <td class="checked">
              <el-checkbox  v-model="item.i" @change="SickSelectionChange(item)"></el-checkbox>
            </td>
            <td>序号</td>
            <td>姓名</td>
            <td>患者类型</td>
            <td>联系电话</td>
            <td>严重比例</td>
            <td>病情</td>
            <td>加入时间</td>
            <td>
              <el-button type="text" @click="editSick(item)">
              <span class="action-text"> <i class="el-icon-edit-outline"></i> 
              编辑</span>
              </el-button>
            </td>
          </tr>
          <tr v-if="sickList.length === 0">
            <td colspan="8">暂无数据</td>
          </tr>
        </table>

        <div class="page">
          <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
        </div>
      </el-card>
    </div>
    <div class="dialog">

      <el-dialog
        :visible.sync="modifySick"
        width="456px"
        center>
        <div class="input-wrap">
          <span>医生姓名:</span>
          <input type="text" v-model="editSickName">
        </div>
        <div class="input-wrap">
          <span>联系电话:</span>
          <input type="text" v-model="editSickPhone">
        </div>
        <div class="input-wrap">
          <span>已绑定居民:</span>
          <input type="text" v-model="editSickPerson">
        </div>
        <div class="input-wrap">
          <span>组织站点:</span>
          <input type="text" v-model="editSickAddress">
        </div>
        <span slot="title" class="dialog-title">修改患者</span>
        <span slot="footer" class="dialog-footer">
          <button  type="primary" @click="modifySick = false">确 定</button>
          <button class="cancel" @click="modifySick = false">取 消</button>
        </span>
      </el-dialog>
      <el-dialog
        :visible.sync="confirmDelete"
        width="456px"
        center>
        <span slot="title" class="dialog-title">确定删除该患者记录吗？</span>
        <span slot="footer" class="dialog-footer">
          <button  type="primary" @click="confirmDelete = false">确 定</button>
          <button class="cancel" @click="confirmDelete = false">取 消</button>
        </span>
      </el-dialog>
      <el-dialog
        :visible.sync="showAddSick"
        width="456px"
        center>
        <span slot="title" class="dialog-title">请患者扫描下方二维码</span>
        <div class="add-sick-img">
          <img width="200px" :src="addSickImg" alt="二维码">
        </div>
        <span slot="footer" class="dialog-footer">
          <button  type="primary" @click="showAddSick = false">确 定</button>
          <button class="cancel" @click="showAddSick = false">取 消</button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'accountSetting',
  data () {
    return {
      sickList: [
        {
          loginAccount: '2016-05-03',
          sickName: '王小虎',
          sickPhone: '上海市普陀区金沙江路 1518 弄',
          sickEmail: '上海市普陀区金沙江路 1518 弄',
          sickMark: '上海市普陀区金沙江路 1518 弄'
        },
        {
          loginAccount: '2016-05-03',
          sickName: '王小虎',
          sickPhone: '上海市普陀区金沙江路 1518 弄',
          sickEmail: '上海市普陀区金沙江路 1518 弄',
          sickMark: '上海市普陀区金沙江路 1518 弄'
        },
        {
          loginAccount: '2016-05-03',
          sickName: '王小虎',
          sickPhone: '上海市普陀区金沙江路 1518 弄',
          sickEmail: '上海市普陀区金沙江路 1518 弄',
          sickMark: '上海市普陀区金沙江路 1518 弄'
        },
        {
          loginAccount: '2016-05-03',
          sickName: '王小虎',
          sickPhone: '上海市普陀区金沙江路 1518 弄',
          sickEmail: '上海市普陀区金沙江路 1518 弄',
          sickMark: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      readyDelete: [],
      sickName: '',
      currentPage: 1,
      // checked: false,
      loading: false,
      modifySick: false,
      editSickName: '',
      editSickPhone: '',
      editSickPerson: '',
      editSickAddress: '',
      confirmDelete: false,
      showAddSick: false,
      addSickImg: ''
    }
  },

  methods: {
    formatterSickList (list) {
      if (list.length === 0) {
        return list
      } else {
        list.forEach(item => {
          item.checked = false
        })
      }
      return list
    },
    SickSelectionChange (selection) {
      selection.checked = !selection.checked
      if (selection.checked) {
        this.readyDelete.push(selection)
      }
      if (!selection.checked) {
        if (this._.indexOf(this.readyDelete, selection) !== -1) {
          this.readyDelete.splice(this._.indexOf(this.readyDelete, selection), 1)
        }
      }
      console.log(selection)
      console.log('deletearr', this.readyDelete)
      // this.$mount('#app')
    },
    selectName () {
      console.log(this.sickName)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    editSick (Sick) {
      this.modifySick = true
      console.log(Sick)
    },
    deleteSick () {
      if (this.readyDelete.length !== 0) {
        this.confirmDelete = true
      }
    },
    addSick () {
      this.showAddSick = true
      this.$axios({
        method: 'post',
        url: 'qrcode/url'
      })
      .then(res => {
        // this.addSickImg = process.env.IMG_URL + res.data.data
        this.addSickImg = res.data.data
      })
    }
  },
  mounted () {
    this.sickList = this.formatterSickList(this.sickList)
  }
}
</script>


<style lang="scss" scoped>
table{
  border-collapse:collapse;
  width: 100%;
  font-size: 14px;
  border: 1px solid #eaeaea;
  th, td{
  border: 1px solid #eaeaea;
  text-align: center;
  vertical-align: middle;
  min-height: 40px;
  height: 40px;
  line-height: 28px;
  // min-width: 80px;
  color: #666;
  }
  tr:nth-child(n+2):hover{
    background-color: #f5f7fa;
  }
  .checked{
    max-width: 40px !important;
  }
}

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
  .add-sick-img{
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }
</style>
