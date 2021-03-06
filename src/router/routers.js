
const login = (resolve) => require(['@/components/login.vue'], resolve)
const baseroutes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/404',
    name: '404',
    component: (resolve) => require(['../components/404.vue'], resolve)
  },
  {
    path: '/500',
    name: '500',
    component: (resolve) => require(['../components/500.vue'], resolve)
  },
  {
    path: '/401',
    name: '401',
    component: (resolve) => require(['../components/401.vue'], resolve)

  }
]
export default baseroutes
