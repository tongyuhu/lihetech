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
                  <p>张江高科</p>
                  <el-popover
                  ref="H-admin"
                  placement="top"
                  width="145"
                  trigger="click">
                    <el-row :gutter="8" type="flex" justify="center" align="center">    
                      <el-col :span="10">
                        <img src="./../../icons/admin.jpg" alt="" width="50px">
                      </el-col>
                      <el-col :span="14">
                        <p>管理员</p>
                        <el-button size="mini">查看消息</el-button> <br>
                        <el-button size="mini">编辑资料</el-button> <br>
                        <el-button size="mini">密码修改</el-button> <br>
                        <el-button size="mini">退出草莓</el-button>
                      </el-col>
                    </el-row>
                  </el-popover>
                  <el-button v-popover:H-admin size="mini">账户管理</el-button>
              </div>
          </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  name: 'H-Head'
}
</script>

<style scoped>
    p{
        margin: 0;
    }
    .head-left{
        float: left;
    }
    .head-right{
        float: right;
    }
   .el-col-16{
     text-align: center;
   }
</style>