import Vue from 'vue'
import Router from 'vue-router'
import baseroutes from '@/router/routers'

Vue.use(Router)
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}
// const scrollBehavior = (to, from, savedPosition) => {
//   if (savedPosition) {
//     // savedPosition is only available for popstate navigations.
//     return savedPosition
//   } else {
//     const position = {}
//     // new navigation.
//     // scroll to anchor by returning the selector
//     if (to.hash) {
//       position.selector = to.hash
//     }
//     // check if any matched route config has meta that requires scrolling to top
//     if (to.matched.some(m => m.meta.scrollToTop)) {
//       // cords will be used if no selector is provided,
//       // or if the selector didn't match any element.
//       position.x = 0
//       position.y = 0
//     }
//     // if the returned position is falsy or an empty object,
//     // will retain current scroll position.
//     return position
//   }
// }
const RouterConfig = {
  mode: 'history',
  scrollBehavior,
  routes: baseroutes
}

export default new Router(RouterConfig)
