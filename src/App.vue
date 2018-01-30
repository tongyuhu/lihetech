<template>
  <div id="app">
    <router-view @login="loginDirect"></router-view>
  </div>
</template>

<script>
import session from './untils/session'
import {routeMatch} from './untils/routerMatch'
import fullpath from './router/fullpath'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  methods: {
    loginDirect () {
      // console.log('app')
      let vm = this
      // 检查登录状态
      let localUserMsg = session('token')
      if (!localUserMsg) {
        return vm.$router.push({
          name: 'login',
          params: {
            from: vm.$router.currentRoute.path
          }
        })
      }
      // 设置请求头携带token
      this.$axios.defaults.headers.common['Authorization'] = 'TOKEN' + localUserMsg
      // this.$router.push({name:'login'})

      // 获取用户信息及权限数据 路由信息
      this.$axios({
        method: 'post',
        url: '/route',
        data: {
          token: localUserMsg
        }
      })
      .then(res => {
      // 获取 用户 权限

      // 获取 用户信息

      // 获取 路由信息
      // 若无路由信息 限制访问
        let router = routeMatch(res.data.route, fullpath)
      // 动态注入路由 addroute
        this.$router.addRoutes(router)
      // 路由守卫
        // router.beforeEach((to, form, next) => {
        //   next()
        // })
        this.$router.push({
          name: 'Home'
        })
      })
      .catch()
      // this.$router.beforeEach(to,from,next){

      // }
    }
  },
  created () {
    this.loginDirect()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
