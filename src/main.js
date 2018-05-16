// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import axios from '@/api/axios'
import _ from 'lodash'
import qs from 'qs'
import {store} from './store/store'
// import session from './untils/session'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/ele-variables.scss'
import Fbutton from './components/Fbutton.vue'
import '@/assets/icon/iconfont.css'
Vue.prototype._ = _

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.component('f-button', Fbutton)
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs

// 自定义判断权限指令 为true时显示 false时不显示
Vue.directive('hasRoot', {
  bind: function (el, binding) {
    if (!binding.value) {
      el.parentNode.removeChild(el)
    }
  }
  // inserted: function () {},
  // update: function () {},
  // componentUpdated: function () {},
  // unbind: function () {}
})

Vue.directive('drag', {
  inserted: function (el, binding) {
    let box = el
    let bar = document.getElementById(binding.value)
    let disX
    let disY
    bar.onmousedown = function (ev) {
      if (!event) {
        event = window.event
        // 防止IE文字选中
        bar.onselectstart = function () {
          return false
        }
      }
      let oEvent = ev || event
      oEvent.preventDefault()
      oEvent.stopPropagation()

      // disX=box.offsetLeft;
      // disY=box.offsetTop;
      disX = oEvent.clientX - box.offsetLeft
      disY = oEvent.clientY - box.offsetTop
      // console.log('clientX', oEvent.clientX)
      // console.log('box', document.body.clientWidth)
      // console.log('box', oEvent.currentStyle)
      document.onmousemove = function (ev) {
        let oEvent = ev || event

        let l = oEvent.clientX - disX
        let t = oEvent.clientY - disY
        if (l < 0) {
          l = 0
        } else if (l > document.documentElement.clientWidth - box.offsetWidth) {
          l = document.documentElement.clientWidth - box.offsetWidth
        }
        if (t < 0) {
          t = 0
        } else if (t > document.documentElement.clientHeight - box.offsetHeight) {
          t = document.documentElement.clientHeight - box.offsetHeight
        }
        box.style.left = l + 'px'
        box.style.top = t + 'px'
      }
      document.onmouseup = function () {
        document.onmousemove = null
        document.onmouseup = null // 鼠标抬起来后，onmouseup事件本身也没意义了，所以最好清理掉
      }
      return false // 阻止默认行为，空的div在低版本ff下，第二次拖动手型会变异常
    }
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // if (session('token')) {
      // next()
    // } else {
      // window.location.href = '/BPWatch/admin/login/page'
      // next({
      //   path: '/login',
      //   query: {redirect: to.fullPath}
      // })
    // }
    next()
  } else {
    next()
  }
})
new Vue({
  router,
  store,
  template: '<App/>',
  components: { App }
}).$mount('#app')
