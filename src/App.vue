<template>
  <div id="app">
    <router-view></router-view>
    <!-- <router-view @login="loginDirect"></router-view> -->
  </div>
</template>

<script>
// import session from './untils/session'
import {getAdminInfo} from '@/api/components/login'
import {routerRoleMatch} from './untils/routerMatch'
// import {routeMatch, roleMatch, routerRoleMatch} from './untils/routerMatch'
import fullpath from '@/router/fullpath'
// import baseroutes from '@/router/routers'
// import { newsickaskDataApi } from './api/views/Hospital/BloodHeigh/H-work'
// import Bus from './bus'
// import qs form 'qs'
export default {
  name: 'app',
  data () {
    return {
      adminInfo: {}
    }
  },
  methods: {
    loginDirect () {
      let vm = this
      // 检查登录状态
      // let localUserMsg = session('token')
      let localUserMsg = '111111111111'
      if (!localUserMsg) {
        window.location.href = '/BPWatch/admin/login/page'
        // return vm.$router.push({
        //   name: 'login',
        //   params: {
        //     from: vm.$router.currentRoute.path
        //   }
        // })
      } else {
        // 设置请求头携带token
        this.$axios.defaults.headers.common['token'] = localUserMsg
        // 添加请求拦截器
        // this.$axios.interceptors.request.use(function (config) {
        // // 在发送请求之前做些什么
        //   return config
        // }, function (error) {
        // // 对请求错误做些什么
        //   return Promise.reject(error)
        // })

        // 获取用户信息及权限数据 路由信息
        this.$axios(getAdminInfo())
        .then(res => {
        // 获取 用户信息
          // vm.$store.state.adminInfo = res.data.data
          if (res.data.data) {
            vm.adminInfo = res.data.data
          }
          // vm.$store.commit('SET_ADMIN_INFO', vm.adminInfo)
          // Bus.$emit('adminInfo', vm.adminInfo)
        // 获取 路由信息
        // 若无路由信息 限制访问
          let role = ''
          if (res.data && res.data.data && res.data.data.adminType) {
            switch (res.data.data.adminType) {
              case 1:
                role = 'admin'
                vm.adminInfo.adminHospitalId = ''
                break
              case 2:
                role = 'hospital'
                vm.adminInfo.adminHospitalId = 2
                break
              case 3:
                role = 'doctor'
                break
              case 4:
                role = 'nurse'
                break
              default:
                role = null
            }
            vm.$store.commit('SET_ADMIN_INFO', vm.adminInfo)
            // let router = routeMatch(res.data.route, fullpath)
            // let router = roleMatch(role, fullpath)
            let router = []
            router = routerRoleMatch(role, fullpath)
            // 动态注入路由 addroute
            // this.$router = baseroutes
            console.log(router)
            this.$router.addRoutes(router)
            this.$router.replace({
              name: 'Home'
            })
          } else {
            window.location.href = '/BPWatch/admin/login/page'
            // this.$router.replace({
            //   name: 'login'
            // })
          }
        })
        .catch()
      }
    }
  },
  mounted () {
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
  .clear::after{
    display:block;
    clear:both;
    content:"";
    visibility:hidden;
    height:0;
    width: 0;
  }
  /* 解决element table出现横向滚动条 */
  .el-table__body-wrapper, .el-table__footer-wrapper, .el-table__header-wrapper{
    width: 101% !important; 
  }

</style>
