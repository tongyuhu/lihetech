// import hospital from '@/views/Hospital/H-index'
// import booldheigh from '@/views/Hospital/BloodHeigh/H-bloodheigh.vue'

// import sugerheigh from '@/views/Hospital/SugerHeigh/H-sugerheigh.vue'
// import other from '@/views/Hospital/Other/H-other.vue'
// import cases from '@/views/Hospital/Case/H-cases.vue'
// import bloodheighSick from '@/components/BloodheighSickcard/bloodheighSick.vue'
// import sugerheighSick from '@/components/SugerheighSickcard/sugerheighSick.vue'
// import addDoctor from '@/components/addDoctor.vue'
// import healthForm from '@/components/healthForm.vue'
// import accountSetting from '@/components/accountSetting.vue'

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
const routes = [
  {
    path: '/',
    // name: 'hospital',
    component: hospital,
    redirect: 'hospital/booldheigh'
  },
  {
    path: '/hospital/',
    name: 'hospital',
    component: hospital,
    children: [
      {
        path: 'booldheigh',
        name: 'booldheigh',
        component: booldheigh
        // 懒加载
        // component: (resolve) => require(['@/views/Hospital/BloodHeigh/H-bloodheigh.vue'], resolve)
      },
      {
        path: 'sugerheigh',
        name: 'sugerheigh',
        component: sugerheigh
      },
      {
        path: 'other',
        name: 'other',
        component: other
      },
      {
        path: 'cases',
        name: 'cases',
        component: cases
      },
      {
        path: 'bloodheighSick/:sickID',
        name: 'bloodheighSick',
        component: bloodheighSick
      },
      {
        path: 'sugerheighSick',
        name: 'sugerheighSick',
        component: sugerheighSick
      },
      {
        path: 'addDoctor',
        name: 'addDoctor',
        component: addDoctor
      },
      {
        path: 'healthForm',
        name: 'healthForm',
        component: healthForm

      },
      {
        path: 'addSick',
        name: 'addSick',
        component: addSick
      },
      {
        path: 'accountSetting',
        name: 'accountSetting',
        component: accountSetting
      }

    ]
  },
  {
    path: '*',
    redirect: 'hospital/booldheigh'
  }
]
export default routes
