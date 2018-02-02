<template>
  <div >
      <el-row>
          <el-col :span="12">
              <div class="head-left">
                  <p>立阖泰科技</p>
                  <p>立德济世 阖泰天下</p>
              </div>
          </el-col>
          <el-col :span="12">
              <div class="head-right">
                  <p>{{ adminName }}</p>
                  <el-popover
                  ref="H-admin"
                  placement="top"
                  width="145"
                  trigger="click">
                    <el-row :gutter="8" type="flex" justify="center" align="center">    
                      <el-col :span="10" class="admin-icon">
                        <img :src="adminIcon" alt="" width="50px">
                      </el-col>
                      <el-col :span="14">
                        <p>{{ adminRoot }}</p>
                        <el-button size="mini" @click="lookMsg" class="btn">查看消息</el-button> 
                        <el-button size="mini" @click="editDoc" class="btn">编辑资料</el-button> 
                        <el-button size="mini" @click="changePassword" class="btn">密码修改</el-button> 
                        <el-button size="mini" @click="exit" class="btn">退出</el-button>
                      </el-col>
                    </el-row>
                  </el-popover>
                  <el-button v-popover:H-admin size="mini" @click="adminAccount">账户管理</el-button>
              </div>
          </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  name: 'H-Head',
  data () {
    return {
      adminName: '胡小方',
      adminRoot: '管理员',
      adminIcon: './../../../static/admin.jpg'
    }
  },
  methods: {
    lookMsg () {

    },
    editDoc () {

    },
    changePassword () {

    },
    exit () {
      this.$router.push({
        name: 'login',
        params: {
          from: this.$router.currentRoute.path
        }
      })
      sessionStorage.clear()
    },
    adminAccount () {

    }
  }
}
</script>

<style scoped>
    p{
        margin: 0;
        text-align: center;
    }
    .head-left{
        float: left;
    }
    .head-right{
        float: right;
        text-align: center;
    }
   .el-col-16{
     text-align: center;
   }
   .admin-icon{
     margin-top:25%;
   }
   .btn{
     display: block;
     margin: 0;
     margin-top:5px;
     width: 80px;
   }
</style>