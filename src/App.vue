<template>
  <div id="app">
    <router-view @login="loginDirect"></router-view>
  </div>
</template>

<script>
import session from './untils/session'
import {routeMatch, roleMatch} from './untils/routerMatch'
import fullpath from './router/fullpath'
import { newsickaskDataApi } from './api/views/Hospital/BloodHeigh/H-work'
// import qs form 'qs'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  methods: {
    loginDirect () {
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
      } else {
        // 设置请求头携带token
        this.$axios.defaults.headers.common['token'] = localUserMsg
        // this.$axios.defaults.headers.common['X-AUTH-SOURCE'] = 0
        // this.$router.push({name: 'login'})
        // 添加请求拦截器
        this.$axios.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
          return config
        }, function (error) {
        // 对请求错误做些什么
          return Promise.reject(error)
        })

        // 设置http response拦截
        this.$axios.interceptors.response.use(
          response => {
            return response
          },
          error => {
            if (error.response) {
              switch (error.response.status) {
                case 401:
                  sessionStorage.clear()
                  this.$router.replace({
                    path: '/401',
                    query: {redirect: this.$router.currentRoute.fullpath}
                  })
              }
            }
            return Promise.reject(error.response.data)
          }
        )
        // this.$router.beforeEach((to, from, next) => {
        //   if (to.meta.requireAuth) {
        //     if (session('token')) {
        //       next()
        //     } else {
        //       next({
        //         path: '/login',
        //         query: {redirect: to.fullPath}
        //       })
        //     }
        //   } else {
        //     next()
        //   }
        // })
        // 获取用户信息及权限数据 路由信息
        this.$axios({
          method: 'post',
          url: '/info',
          data: {
            // token: localUserMsg
          }
        })
        .then(res => {
        // 获取 用户 权限

        // 获取 用户信息

        // 获取 路由信息
        // 若无路由信息 限制访问
          let role = ''
          if (res.data.data.adminType === 1) {
            role = 'admin'
          }
          // let router = routeMatch(res.data.route, fullpath)
          let router = roleMatch(role, fullpath)
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
    }
  },
  mounted () {
    let vm = this
    // const data = vm.$qs.stringify()
    // vm.$axios.interceptors.request.use((config) => {
    //   if (config.method === 'post') {
    //     config.data = vm.$qs.stringify(config.data)
    //   }
    //   return config
    // })
    console.log(process.env.API_HOST)
    vm.$axios({
      method: 'post',
      url: '/login',
      headers: {
        // 'token': 'dfabac808ccd494d901d2091534409f1',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // 'Access-Control-Allow-Origin': '*'
        // 'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,PATCH,PUT'
      },
      data: {
        username: 'chen',
        password: '123456'
        // email: null,
        // department: null,
        // name: null,
        // roleId: null
        // token: 'dd8dcb2583182ab2f67c0aaab6e314e5'
      }
    })
    .then(res => {
      console.log(res.data)
    })
    .catch()
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
