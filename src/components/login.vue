<template>
  <div>
    <div class="g-center login-page" @keyup.enter="login">
      <el-form class="login-form">
        <!-- <h1 class="main-title"><a href="http://refined-x.com/2017/11/28/Vue2.0%E7%94%A8%E6%88%B7%E6%9D%83%E9%99%90%E6%8E%A7%E5%88%B6%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88/" target="_blank">Vue-Access-Control</a></h1> -->
        <!-- <p class="des">Frontend access control framework based Vue</p> -->
        <el-form-item>
          <el-input
            :autofocus="true"
            placeholder="请输入账号"
            v-model="username">
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
    <div>
      数量
      <el-button type="primary"
      @click="add">
        +
      </el-button>
      <el-button type="primary"
      @click="reduce">
        -
      </el-button>
      {{num}}
      <br>
      <br>
      价格
      <el-button type="primary"
      @click="addp">
        +
      </el-button>
      <el-button type="primary"
      @click="reducep">
        -
      </el-button>
       {{price}}
      
      
     
    </div>
  </div>
</template>


<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      btnText: '登录',
      password: '',
      username: '',
      isBtnLoading: false
    }
  },
  computed: {
    ...mapState({
      num: state => state.num,
      price: 'price'
    }),
    num () {
      return this.$store.state.num
    },
    price () {
      return this.$store.state.price
    }
  },
  methods: {
    login () {
      let vm = this
      if (!vm.username) {
        vm.$message({
          showClose: true,
          message: '请填写用户名',
          type: 'error'
        })
      }
      if (!vm.password) {
        vm.$message({
          showClose: true,
          message: '请填写密码',
          type: 'error'
        })
      }
      let loginParams = {
        name: vm.username,
        password: vm.password
      }
      // vm.isBtnLoading = true
      // vm.$axios(sendUserMsg(loginParams))
      // .then(res => {
      //   vm.isBtnLoading = false
      //   if (res.data.token) {
      //     // 加载主页路由
      //   } else {
      //     return Promise.reject({
      //       message: '登录异常！'
      //     })
      //   }
      // })
      // .catch(err => {
      //   console.log(err)
      // })
    },
    ...mapMutations([
      'ADD_NUM',
      'REDUCE_NUM',
      'ADD_PRICE',
      'REDUCE_PRICE'
    ]),
    add () {
      // return this.$store.commit('ADD_NUM')
      return this.ADD_NUM()
    },
    reduce () {
      return this.$store.commit('REDUCE_NUM')
    },
    addp () {
      return this.$store.commit('ADD_PRICE')
    },
    reducep () {
      // return this.$store.commit('REDUCE_PRICE')
      return this.$store.dispatch('reduce')
    }
  }
}
</script>

<style scoped>
  #app{display: table;width:100%;}
  .main-title{text-align: center;}
  .des{text-align: center;color:#999;margin-bottom: 2em;}
  .login-form{width: 400px;margin:13% auto 0;}
  .login-page{background:#fff;}
</style>
