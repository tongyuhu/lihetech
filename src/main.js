// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import axios from '@/api/axios'
import _ from 'lodash'
import qs from 'qs'
import {store} from './store/store'
import session from './untils/session'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Fbutton from './components/Fbutton.vue'
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

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (session('token')) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
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
