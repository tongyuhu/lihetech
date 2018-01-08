// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

// 按需引入element-ui
import {
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Row,
  Col,
  Card,
  Form,
  FormItem,
  Button,
  Select,
  Menu,
  MenuItem,
  Submenu,
  Popover,
  Badge,
  Table,
  TableColumn
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(Vuex)
// 全局使用element-ui
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Select)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Popover)
Vue.use(Badge)
Vue.use(Table)
Vue.use(TableColumn)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
