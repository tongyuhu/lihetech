// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import echarts from 'echarts'
import axios from 'axios'

// 按需引入element-ui
import 'element-ui/lib/theme-chalk/index.css'
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
  Input,
  Button,
  Select,
  Option,
  Menu,
  MenuItem,
  Submenu,
  Popover,
  Badge,
  Table,
  TableColumn,
  Carousel,
  CarouselItem,
  Tag,
  RadioGroup,
  RadioButton,
  Radio,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Upload
} from 'element-ui'

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
Vue.use(Input)
Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Popover)
Vue.use(Badge)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Tag)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Radio)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Upload)

// Vue.use(echarts)
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })
new Vue({
  router,
  // store,
  template: '<App/>',
  components: { App }
}).$mount('#app')
