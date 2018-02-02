import Vue from 'vue'
import Router from 'vue-router'
import baseroutes from './routers'

Vue.use(Router)

const RouterConfig = {
  // mode: 'history',
  routes: baseroutes
}

export default new Router(RouterConfig)
