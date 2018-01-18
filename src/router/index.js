import Vue from 'vue'
import Router from 'vue-router'
import Routers from './routers'

Vue.use(Router)
const RouterConfig = {
  mode: 'history',
  routes: Routers
}

export default new Router(RouterConfig)
