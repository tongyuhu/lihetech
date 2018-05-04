import { Message, MessageBox } from 'element-ui'
import axios from 'axios'
import qs from 'qs' // formdata序列化
// import router from './../router/index'
// import { Message, MessageBox, Loading } from 'element-ui'
// import Vue from 'vue'
// axios 配置
// 因为js 异步原因  所以这里会拿到null 解决方案 vuex
// Promise.reject 如果不丢出reject 就是每个都要判断 没有返回掉
axios.defaults.timeout = 5000
axios.defaults.baseURL = process.env.API_HOST // api的base_url // api接口地址
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
})

// axios.interceptors.request.use((config) => {
//   if (localStorage.getItem('token')) {
//     config.headers['X-AUTH-TOKEN'] = localStorage.getItem('token')
//     config.headers['X-AUTH-FRESHTOKEN'] = localStorage.getItem('freshToken')
//   }
//   if (config.method === 'post') {
//     config.data = qs.stringify(config.data)
//   }
//   return config
// }, (error) => {
//   console.log('请求头错误参数')
//   return Promise.reject(error)
// })

// axios.interceptors.response.use((res) => {
//   // 解密
//   res.data = JSON.parse(pako.inflate(res.data, { to: 'string' }))
//   console.log(res.data)
//   // session已失效
//   if (res.data.errCode == '1004') {
//     MessageBox.confirm('您的登录时间已失效请重新登录', '确定登出', {
//       confirmButtonText: '重新登录',
//       cancelButtonText: '取消',
//       type: 'warning'
//     }).then(() => {
//       localStorage.removeItem('token')
//       localStorage.removeItem('freshToken')
//       router.push({ path: '/login' })
//       location.reload()
//     })
//     return Promise.reject(res)
//   }
//   // 成功拿到数据
//   if (res.data.errCode != '0000') {
//     Message({
//       type: 'error',
//       message: res.data.errMsg,
//       duration: 5000,
//       showClose: true
//     })
//     return Promise.reject(res)
//   }

//   return res
// }, (error) => {
//   console.log(error)// for debug
//   Message({
//     type: 'error',
//     message: '网络出错，请稍候再次尝试'
//   })
//   if (error.response) {
//     switch (error.response.status) {
//       case 400:
//         Message({
//           type: 'error',
//           message: '用户发出的请求有错误'
//         })
//         break
//       case 404:
//         Message({
//           type: 'error',
//           message: '请求不存在'
//         })
//         break
//       case 500:
//         Message({
//           type: 'error',
//           message: '服务器发生错误'
//         })
//         break
//     }
//   }
//   return Promise.reject(error)
// })
axios.interceptors.response.use(
  res => {
    if (res.data && res.data.code) {
      switch (res.data.code) {
        case '0000':
          break
        case '1001':
          Message({
            type: 'error',
            message: '请求数据失败,请重试',
            duration: 5000,
            showClose: true
          })
          // setTimeout(() => {
            // location.reload()
            // router.go(-1)
          // }, 3000)
          break
        case '1005':
          MessageBox.alert('登录超时,请重新登录', '提示信息', {
            'confirmButtonText': '确定'
          }).then(() => {
            sessionStorage.clear()
            window.location.href = '/BPWatch/admin/login/page'
            // router.push({path: '/login'})
            location.reload()
          })
          break
        case '1006':
          Message({
            type: 'warning',
            message: '对不起，您没有相关权限',
            duration: 5000,
            showClose: true
          })
          break
        default:
      }
    }
    return res
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          break

        case 401:
          sessionStorage.clear()
          window.location.href = '/BPWatch/admin/login/page'
          // router.replace({path: '/login'})
          location.reload()
          err.message = '未授权，请登录'
          break

        case 403:
          err.message = '拒绝访问'
          break

        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`
          break

        case 408:
          err.message = '请求超时'
          break

        case 500:
          err.message = '服务器内部错误'
          break

        case 501:
          err.message = '服务未实现'
          break

        case 502:
          err.message = '网关错误'
          break

        case 503:
          err.message = '服务不可用'
          break

        case 504:
          err.message = '网关超时'
          break

        case 505:
          err.message = 'HTTP版本不受支持'
          break

        default:
      }
    }
    return Promise.reject(err)
  }
)
export default axios
