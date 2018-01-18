import hospital from '@/views/Hospital/H-index'
// import booldheigh from '@/views/Hospital/BloodHeigh/H-bloodheigh.vue'
import sugerheigh from '@/views/Hospital/SugerHeigh/H-sugerheigh.vue'
import other from '@/views/Hospital/Other/H-other.vue'
import cases from '@/views/Hospital/Case/H-cases.vue'
import bloodheighSick from '@/components/BloodheighSickcard/bloodheighSick.vue'
import sugerheighSick from '@/components/SugerheighSickcard/sugerheighSick.vue'
import addDoctor from '@/components/addDoctor.vue'
import healthForm from '@/components/healthForm.vue'
import accountSetting from '@/components/accountSetting.vue'
const routes = [
  {
    path: '/',
    // name: 'hospital',
    component: hospital
  },
  {
    path: '/hospital/',
    name: 'hospital',
    component: hospital,
    children: [
      {
        path: 'hospital/booldheigh',
        name: 'booldheigh',
        // component: booldheigh
        // 懒加载
        component: (resolve) => require(['@/views/Hospital/BloodHeigh/H-bloodheigh.vue'], resolve)
      },
      {
        path: 'hospital/sugerheigh',
        name: 'sugerheigh',
        component: sugerheigh
      },
      {
        path: 'hospital/other',
        name: 'other',
        component: other
      },
      {
        path: 'hospital/cases',
        name: 'cases',
        component: cases
      },
      {
        path: 'hospital/bloodheighSick',
        name: 'bloodheighSick',
        component: bloodheighSick
      },
      {
        path: 'hospital/sugerheighSick',
        name: 'sugerheighSick',
        component: sugerheighSick
      },
      {
        path: 'hospital/addDoctor',
        name: 'addDoctor',
        component: addDoctor
      },
      {
        path: 'hospital/healthForm',
        name: 'healthForm',
        component: healthForm

      },
      {
        path: 'hospital/accountSetting',
        name: 'accountSetting',
        component: accountSetting

      }

    ]
  }
]
export default routes
