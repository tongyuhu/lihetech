const hospital = (resolve) => require(['@/views/Hospital/H-index'], resolve)
const booldheigh = (resolve) => require(['@/views/Hospital/BloodHeigh/H-bloodheigh.vue'], resolve)
const sugerheigh = (resolve) => require(['@/views/Hospital/SugerHeigh/H-sugerheigh.vue'], resolve)
const other = (resolve) => require(['@/views/Hospital/Other/H-other.vue'], resolve)
const cases = (resolve) => require(['@/views/Hospital/Case/H-cases.vue'], resolve)
const bloodheighSick = (resolve) => require(['@/components/BloodheighSickcard/bloodheighSick.vue'], resolve)
const sugerheighSick = (resolve) => require(['@/components/SugerheighSickcard/sugerheighSick.vue'], resolve)
const addDoctor = (resolve) => require(['@/components/addDoctor.vue'], resolve)
const accountSetting = (resolve) => require(['@/components/accountSetting.vue'], resolve)
const healthForm = (resolve) => require(['@/components/healthForm.vue'], resolve)
const addSick = (resolve) => require(['@/components/addSick.vue'], resolve)
const cardtest = (resolve) => require(['@/components/sickcard.vue'], resolve)
const login = (resolve) => require(['@/components/login.vue'], resolve)
// const '404' = (resolve) => require(['@/components/404.vue'], resolve)
// const '401' = (resolve) => require(['@/components/401.vue'], resolve)
export default[
  {
    path: '/',
    name: 'Home',
    meta: {
      name: '主页',
      role: ['admin', 'doctor']
    },
    redirect: '/hospital'
  },
  {
    path: '/hospital/',
    name: 'hospital',
    component: hospital,
    redirect: 'hospital/booldheigh',
    meta: {
      name: '主页',
      role: ['admin', 'doctor']
    },
    children: [
      {
        path: 'booldheigh',
        name: 'booldheigh',
        component: booldheigh,
        meta: {
          name: '主页',
          role: ['admin', 'doctor']
        }
      },
      {
        path: 'sugerheigh',
        name: 'sugerheigh',
        component: sugerheigh,
        meta: {
          name: '主页',
          role: ['admin', 'doctor']
        }
      },
      {
        path: 'other',
        name: 'other',
        component: other,
        meta: {
          name: '主页',
          role: ['admin', 'doctor']
        }
      },
      {
        path: 'cases',
        name: 'cases',
        component: cases,
        meta: {
          name: '主页',
          role: ['admin', 'doctor']
        }
      },
      {
        path: 'bloodheighSick/:sickID',
        name: 'bloodheighSick',
        component: bloodheighSick,
        meta: {
          name: '主页',
          role: ['admin', 'doctor']
        }
      },
      {
        path: 'sugerheighSick',
        name: 'sugerheighSick',
        component: sugerheighSick,
        meta: {
          name: '主页',
          role: ['admin', 'doctor']
        }
      },
      {
        path: 'addDoctor',
        name: 'addDoctor',
        component: addDoctor,
        meta: {
          name: '主页',
          role: ['admin', 'doctor']
        }
      },
      {
        path: 'healthForm',
        name: 'healthForm',
        component: healthForm,
        meta: {
          name: '主页',
          role: ['admin', 'doctor']
        }
      },
      {
        path: 'addSick',
        name: 'addSick',
        component: addSick,
        meta: {
          name: '主页',
          role: ['admin', 'doctor']
        }
      },
      {
        path: 'accountSetting',
        name: 'accountSetting',
        component: accountSetting,
        meta: {
          name: '主页',
          role: ['admin', 'doctor']
        }
      }
      // {
      //   path: 'cardtest',
      //   name: 'cardtest',
      //   component: cardtest
      // }
    ]
  }
]
