// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import Vuex from 'vuex'
import echarts from 'echarts'
import axios from './api/axios'
// import axios from 'axios'
import qs from 'qs'
import {store} from './store/store'
import session from './untils/session'
// 按需引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Fbutton from './components/Fbutton.vue'
// import {
//   Container,
//   Header,
//   Aside,
//   Main,
//   Footer,
//   Row,
//   Col,
//   Card,
//   Form,
//   FormItem,
//   Input,
//   Button,
//   Select,
//   Option,
//   Menu,
//   MenuItem,
//   Submenu,
//   Popover,
//   Badge,
//   Table,
//   TableColumn,
//   Carousel,
//   CarouselItem,
//   Tag,
//   RadioGroup,
//   RadioButton,
//   Radio,
//   Dropdown,
//   DropdownMenu,
//   DropdownItem,
//   Upload,
//   MessageBox,
//   Message,
//   Pagination,
//   Dialog,
//   Loading
// } from 'element-ui'

Vue.config.productionTip = false
Vue.use(ElementUI)
// Vue.use(Vuex)
// 全局使用element-ui
// Vue.use(Container)
// Vue.use(Header)
// Vue.use(Aside)
// Vue.use(Main)
// Vue.use(Footer)
// Vue.use(Row)
// Vue.use(Col)
// Vue.use(Card)
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(Input)
// Vue.use(Button)
// Vue.use(Select)
// Vue.use(Option)
// Vue.use(Menu)
// Vue.use(MenuItem)
// Vue.use(Submenu)
// Vue.use(Popover)
// Vue.use(Badge)
// Vue.use(Table)
// Vue.use(TableColumn)
// Vue.use(Carousel)
// Vue.use(CarouselItem)
// Vue.use(Tag)
// Vue.use(RadioGroup)
// Vue.use(RadioButton)
// Vue.use(Radio)
// Vue.use(Dropdown)
// Vue.use(DropdownMenu)
// Vue.use(DropdownItem)
// Vue.use(Upload)
// Vue.use(Pagination)
// Vue.use(Dialog)
// Vue.use(Loading)
Vue.component('f-button', Fbutton)
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
// Vue.prototype.$msgbox = MessageBox
// Vue.prototype.$alert = MessageBox.alert
// Vue.prototype.$confirm = MessageBox.confirm
// Vue.prototype.$prompt = MessageBox.prompt
// Vue.prototype.$message = Message
/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })
// const store = new Vuex.Store({
//   state: {
//     aaa: 555

//   }
// })
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
