import axios from 'axios'
import qs from 'qs' // formdata序列化
import { Message, MessageBox, Loading } from 'element-ui'
import Vue from 'vue'
// import router from './router'
// axios 配置
// 因为js 异步原因  所以这里会拿到null 解决方案 vuex ？
// Promise.reject 如果不丢出reject 就是每个都要判断 没有返回掉
axios.defaults.timeout = 100000
axios.defaults.baseURL = ' https://easy-mock.com/mock/5a5ffcab4a073a3a0e0e9eed/hospital' // api接口地址
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    // headers: { 'Content-type': 'application/x-www-form-urlencoded' }

// process.env.API_ROOT
// http://apimanager.arbexpress.cn/arbmanager
// http://116.62.63.96:8081/arbmanager
// http://192.168.1.120:8086/arbmanager

// axios.defaults.headers.common['X-AUTH-SOURCE'] = 0
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

export default axios
