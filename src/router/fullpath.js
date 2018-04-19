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
// const medicine = (resolve) => require(['@/components/medicine/medicine.vue'], resolve)
const sickManage = (resolve) => require(['@/views/Hospital/personManage/H-sick.vue'], resolve)
const doctorManage = (resolve) => require(['@/views/Hospital/personManage/H-doctor.vue'], resolve)
const personManage = (resolve) => require(['@/views/Hospital/personManage/personManage.vue'], resolve)
// const addDoctor = (resolve) => require(['@/views/Hospital/personManage/addDoctor.vue'], resolve)

export default[
  {
    path: '/',
    name: 'Home',
    meta: {
      name: '主页',
      requireAuth: true,
      role: ['admin', 'doctor']
    },
    redirect: '/Hospital'
  },
  {
    path: '/Hospital/',
    name: 'hospital',
    component: hospital,
    redirect: 'hospital/booldheigh',
    meta: {
      requireAuth: true,
      name: '诊所主页',
      role: ['admin', 'doctor']
    },
    children: [
      {
        path: 'booldheigh',
        name: 'booldheigh',
        component: booldheigh,
        meta: {
          requireAuth: true,
          name: '高血压',
          role: ['admin', 'doctor']
        }
      },
      {
        path: 'sugerheigh',
        name: 'sugerheigh',
        component: sugerheigh,
        meta: {
          requireAuth: true,

          name: '糖尿病',
          role: ['admin', 'doctor']
        }
      },
      {
        path: 'other',
        name: 'other',
        component: other,
        meta: {
          requireAuth: true,
          name: '其他',
          role: ['admin', 'doctor']
        }
      },
      {
        path: 'cases',
        name: 'cases',
        component: cases,
        meta: {
          requireAuth: true,
          name: '病例库',
          role: ['admin', 'doctor']
        }
      },
      {
        path: 'personManage',
        name: 'personManage',
        component: personManage,
        meta: {
          requireAuth: true,
          name: '人员管理',
          role: ['admin', 'doctor']
        },
        redirect: { name: 'doctorManage' },
        children: [
          {
            path: 'addDoctor',
            name: 'addDoctor',
            component: addDoctor,
            meta: {
              requireAuth: true,
              name: '添加医生',
              role: ['admin', 'doctor']
            }
          },
          {
            path: 'doctorManage',
            name: 'doctorManage',
            component: doctorManage,
            meta: {
              requireAuth: true,
              name: '医生管理',
              role: ['admin', 'doctor']
            }
            // children: [
              // {
              //   path: 'addDoctor',
              //   name: 'addDoctor',
              //   component: addDoctor,
              //   meta: {
              //     requireAuth: true,
              //     name: '添加医生',
              //     role: ['admin', 'doctor']
              //   }
              // }
            // ]
          },
          {
            path: 'sickManage',
            name: 'sickManage',
            component: sickManage,
            meta: {
              requireAuth: true,
              name: '患者管理',
              role: ['admin', 'doctor']
            }
          }
        ]
      },
      {
        path: 'bloodheighSick/:sickID',
        name: 'bloodheighSick',
        component: bloodheighSick,
        meta: {
          requireAuth: true,
          name: '高血压病人',
          role: ['admin', 'doctor']
        }
      },
      {
        path: 'sugerheighSick',
        name: 'sugerheighSick',
        component: sugerheighSick,
        meta: {
          requireAuth: true,
          name: '糖尿病病人',
          role: ['admin', 'doctor']
        }
      },
      {
        path: 'addDoctor',
        name: 'addDoctor',
        component: addDoctor,
        meta: {
          requireAuth: true,
          name: '添加医生',
          role: ['admin', 'doctor']
        }
      },
      {
        path: 'healthForm',
        name: 'healthForm',
        component: healthForm,
        meta: {
          requireAuth: true,
          name: '病历',
          role: ['admin', 'doctor']
        }
      },
      {
        path: 'addSick',
        name: 'addSick',
        component: addSick,
        meta: {
          requireAuth: true,
          name: '添加病人',
          role: ['admin', 'doctor']
        }
      },
      {
        path: 'accountSetting',
        name: 'accountSetting',
        component: accountSetting,
        meta: {
          requireAuth: true,
          name: '账户设置',
          role: ['admin', 'doctor']
        }
      }
      // {
      //   path: 'medicine',
      //   name: 'medicine',
      //   component: medicine,
      //   meta: {
      //     requireAuth: true,
      //     scrollToTop: true,
      //     name: '44',
      //     role: ['admin', 'doctor']
      //   }
      // }
    ]
  }
]
