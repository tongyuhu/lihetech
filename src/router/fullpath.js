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
// const medicine = (resolve) => require(['@/components/medicine/medicine.vue'], resolve)
const sickManage = (resolve) => require(['@/views/Hospital/personManage/H-sick.vue'], resolve)
const doctorManage = (resolve) => require(['@/views/Hospital/personManage/H-doctor.vue'], resolve)
const personManage = (resolve) => require(['@/views/Hospital/personManage/personManage.vue'], resolve)
const order = (resolve) => require(['@/components/order/order.vue'], resolve)
const orderSick = (resolve) => require(['@/components/order/orderSick.vue'], resolve)
const orderSetting = (resolve) => require(['@/components/order/orderSetting.vue'], resolve)
const editAdmin = (resolve) => require(['@/components/editAdmin.vue'], resolve)
const Flup = (resolve) => require(['@/components/Flup/Flup.vue'], resolve)
const FlupCard = (resolve) => require(['@/components/Flup/FlupCard.vue'], resolve)
// const addDoctor = (resolve) => require(['@/views/Hospital/personManage/addDoctor.vue'], resolve)
let routers = null
let superAdminRouters = [
  {
    path: '/',
    name: 'Home',
    meta: {
      name: '主页',
      requireAuth: true,
      role: ['admin', 'doctor', 'hospital', 'nurse']
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
      role: ['admin', 'doctor', 'hospital', 'nurse']
    },
    children: [
      {
        path: 'booldheigh',
        name: 'booldheigh',
        component: booldheigh,
        meta: {
          requireAuth: true,
          name: '高血压',
          role: ['admin', 'doctor', 'hospital', 'nurse']
        }
      },
      {
        path: 'Flup',
        name: 'Flup',
        component: Flup,
        meta: {
          requireAuth: true,
          name: '随访',
          role: ['admin', 'doctor', 'hospital', 'nurse']
        }
      },
      {
        path: 'FlupCard',
        name: 'FlupCard',
        component: FlupCard,
        meta: {
          requireAuth: true,
          name: '随访',
          role: ['admin', 'doctor', 'hospital', 'nurse']
        }
      },
      {
        path: 'sugerheigh',
        name: 'sugerheigh',
        component: sugerheigh,
        meta: {
          requireAuth: true,

          name: '糖尿病',
          role: ['admin', 'doctor', 'hospital', 'nurse']
        }
      },
      {
        path: 'other',
        name: 'other',
        component: other,
        meta: {
          requireAuth: true,
          name: '其他',
          role: ['admin', 'doctor', 'hospital', 'nurse']
        }
      },
      {
        path: 'order',
        name: 'order',
        component: order,
        meta: {
          requireAuth: true,
          name: '预约管理',
          role: ['admin', 'doctor', 'hospital', 'nurse']
        },
        redirect: {name: 'orderSick'},
        children: [
          {
            path: 'orderSick',
            name: 'orderSick',
            components: {
              default: orderSick,
              setting: orderSetting
            },
            meta: {
              requireAuth: true,
              name: '预约',
              role: ['admin', 'doctor', 'hospital', 'nurse']
            }
          },
          {
            path: 'orderSetting',
            name: 'orderSetting',
            components: {
              default: orderSetting,
              setting: orderSick
            },
            meta: {
              requireAuth: true,
              name: '预约',
              role: ['admin', 'doctor', 'hospital', 'nurse']
            }
          }
        ]
      },
      {
        path: 'cases',
        name: 'cases',
        component: cases,
        meta: {
          requireAuth: true,
          name: '病例库',
          role: ['admin', 'doctor', 'hospital', 'nurse']
        }
      },
      {
        path: 'personManage',
        name: 'personManage',
        component: personManage,
        meta: {
          requireAuth: true,
          name: '人员管理',
          role: ['admin', 'doctor', 'hospital', 'nurse']
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
              role: ['admin', 'doctor', 'hospital', 'nurse']
            }
          },
          {
            path: 'doctorManage',
            name: 'doctorManage',
            component: doctorManage,
            meta: {
              requireAuth: true,
              name: '医生管理',
              role: ['admin', 'doctor', 'hospital', 'nurse']
            }
          },
          {
            path: 'sickManage',
            name: 'sickManage',
            component: sickManage,
            meta: {
              requireAuth: true,
              name: '患者管理',
              role: ['admin', 'doctor', 'hospital', 'nurse']
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
          role: ['admin', 'doctor', 'hospital', 'nurse']
        }
      },
      {
        path: 'sugerheighSick',
        name: 'sugerheighSick',
        component: sugerheighSick,
        meta: {
          requireAuth: true,
          name: '糖尿病病人',
          role: ['admin', 'doctor', 'hospital', 'nurse']
        }
      },
      {
        path: 'healthForm',
        name: 'healthForm',
        component: healthForm,
        meta: {
          requireAuth: true,
          name: '病历',
          role: ['admin', 'doctor', 'hospital', 'nurse']
        }
      },
      {
        path: 'accountSetting',
        name: 'accountSetting',
        component: accountSetting,
        meta: {
          requireAuth: true,
          name: '账户设置',
          role: ['admin', 'doctor', 'hospital', 'nurse']
        }
      },
      {
        path: 'editAdmin',
        name: 'editAdmin',
        component: editAdmin,
        meta: {
          requireAuth: true,
          name: '管理员资料编辑',
          role: ['admin', 'doctor', 'hospital', 'nurse']
        }
      }

    ]
  }
  // {
  //   path: '*',
  //   meta: {
  //     name: '主页',
  //     requireAuth: true,
  //     role: ['admin', 'doctor','hospital','nurse']
  //   },
  //   redirect: '/'
  // }
]
let hospitalRouters = superAdminRouters
let doctorRouters = superAdminRouters
let nurseRouters = superAdminRouters

let routerarr = [
  {
    path: '/',
    name: 'Home',
    meta: {
      name: '主页',
      requireAuth: true,
      role: ['admin', 'doctor', 'hospital', 'nurse']
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
      role: ['admin', 'doctor', 'hospital', 'nurse']
    },
    children: [
      {
        path: 'booldheigh',
        name: 'booldheigh',
        component: booldheigh,
        meta: {
          requireAuth: true,
          name: '高血压',
          role: ['admin', 'doctor', 'hospital', 'nurse']
        }
      },
      {
        path: 'sugerheigh',
        name: 'sugerheigh',
        component: sugerheigh,
        meta: {
          requireAuth: true,

          name: '糖尿病',
          role: ['admin', 'doctor', 'hospital', 'nurse']
        }
      },
      {
        path: 'other',
        name: 'other',
        component: other,
        meta: {
          requireAuth: true,
          name: '其他',
          role: ['admin', 'doctor', 'hospital', 'nurse']
        }
      },
      {
        path: 'order',
        name: 'order',
        component: order,
        meta: {
          requireAuth: true,
          name: '预约管理',
          role: ['admin', 'doctor', 'hospital', 'nurse']
        },
        redirect: {name: 'orderSick'},
        children: [
          {
            path: 'orderSick',
            name: 'orderSick',
            components: {
              default: orderSick,
              setting: orderSetting
            },
            meta: {
              requireAuth: true,
              name: '预约',
              role: ['admin', 'doctor', 'hospital', 'nurse']
            }
          },
          {
            path: 'orderSetting',
            name: 'orderSetting',
            components: {
              default: orderSetting,
              setting: orderSick
            },
            meta: {
              requireAuth: true,
              name: '预约',
              role: ['admin', 'doctor', 'hospital', 'nurse']
            }
          }
        ]
      },
      {
        path: 'cases',
        name: 'cases',
        component: cases,
        meta: {
          requireAuth: true,
          name: '病例库',
          role: ['admin', 'doctor', 'hospital', 'nurse']
        }
      },
      {
        path: 'personManage',
        name: 'personManage',
        component: personManage,
        meta: {
          requireAuth: true,
          name: '人员管理',
          role: ['admin', 'doctor', 'hospital', 'nurse']
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
              role: ['admin', 'doctor', 'hospital', 'nurse']
            }
          },
          {
            path: 'doctorManage',
            name: 'doctorManage',
            component: doctorManage,
            meta: {
              requireAuth: true,
              name: '医生管理',
              role: ['admin', 'doctor', 'hospital', 'nurse']
            }
          },
          {
            path: 'sickManage',
            name: 'sickManage',
            component: sickManage,
            meta: {
              requireAuth: true,
              name: '患者管理',
              role: ['admin', 'doctor', 'hospital', 'nurse']
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
          role: ['admin', 'doctor', 'hospital', 'nurse']
        }
      },
      {
        path: 'sugerheighSick',
        name: 'sugerheighSick',
        component: sugerheighSick,
        meta: {
          requireAuth: true,
          name: '糖尿病病人',
          role: ['admin', 'doctor', 'hospital', 'nurse']
        }
      },
      {
        path: 'healthForm',
        name: 'healthForm',
        component: healthForm,
        meta: {
          requireAuth: true,
          name: '病历',
          role: ['admin', 'doctor', 'hospital', 'nurse']
        }
      },
      {
        path: 'accountSetting',
        name: 'accountSetting',
        component: accountSetting,
        meta: {
          requireAuth: true,
          name: '账户设置',
          role: ['admin', 'doctor', 'hospital', 'nurse']
        }
      },
      {
        path: 'editAdmin',
        name: 'editAdmin',
        component: editAdmin,
        meta: {
          requireAuth: true,
          name: '管理员资料编辑',
          role: ['admin', 'doctor', 'hospital', 'nurse']
        }
      }

    ]
  }
]

const fullRouter = function (role) {
  switch (role) {
    case 1:
      routers = superAdminRouters
      break
    case 2:
      routers = hospitalRouters
      break
    case 3:
      routers = doctorRouters
      break
    case 4:
      routers = nurseRouters
      break
  }
  return routers
}

export default fullRouter
