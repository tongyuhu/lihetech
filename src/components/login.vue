<template>
  <div class="login">
    <div class="g-center login-page" @keyup.enter="login">
      <el-form class="login-form">
        <el-form-item>
          <el-input
            :autofocus="true"
            placeholder="请输入账号"
            v-model="userAccount">
            <template slot="prepend"><i class="el-icon-mobile-phone"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入密码"
            type="password"
            v-model="password">
            <template slot="prepend"><i class="el-icon-info"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" @click.native="login" type="primary" :loading="isBtnLoading">{{btnText}}</el-button>
        </el-form-item>
      </el-form>
      
    </div>
      {{password}}
      {{userAccount}}
  </div>
</template>


<script>
import {sendUserMsg} from './../api/components/login'
import session from './../untils/session'

export default {
  data () {
    return {
      password: '123456',
      userAccount: 'chen11',
      isBtnLoading: false
    }
  },
  computed: {
    btnText () {
      if (this.isBtnLoading) return '登录中...'
      return '登录'
    }
  },
  methods: {
    login () {
      let vm = this
      vm.isBtnLoading = true
      if (!vm.userAccount) {
        vm.$message({
          showClose: true,
          message: '请填写用户名',
          type: 'error'
        })
        vm.isBtnLoading = false
      } else if (!vm.password) {
        vm.$message({
          showClose: true,
          message: '请填写密码',
          type: 'error'
        })
        vm.isBtnLoading = false
      } else {
        let loginParams = {
          username: vm.userAccount,
          password: vm.password
        }
        // this.$axios.defaults.headers.common = '4550b8ecfbe54b038c260913bb9b3bf3'
        // this.$axios.defaults.headers.common['X-AUTH-SOURCE'] = 'serrrrrr'
        this.$axios(sendUserMsg(loginParams))
          .then(res => {
            vm.isBtnLoading = true
            if (res.data.data) {
              if (res.data.data.admin_token && res.data.data.admin_token.length !== 0) {
                // 保存token到本地
                session('token', res.data.data.admin_token)
                vm.$emit('login', vm.$router.currentRoute.path)
              }
            } else {
              vm.isBtnLoading = false
              vm.$message({
                showClose: true,
                message: res.data.msg,
                type: 'error'
              })
            }
          })
          .catch(err => {
            vm.isBtnLoading = false
            console.log(err)
          })
      }
    }
  },
  created () {
    sessionStorage.clear()
  }
}
</script>

<style scoped>
  .login{
    background:#f4f6f9;
    width: 100%;
    height: 100%;
  }
  #app{display: table;width:100%;}
  .main-title{text-align: center;}
  .des{text-align: center;color:#999;margin-bottom: 2em;}
  .login-form{width: 400px;margin:13% auto 0;}
  .login-page{background:#f4f6f9;}
</style>
