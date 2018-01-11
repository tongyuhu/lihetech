import Vue from 'vue'
import Router from 'vue-router'
import hospital from '@/views/Hospital/H-index'
import booldheigh from '@/views/Hospital/BloodHeigh/H-bloodheigh.vue'
import sugerheigh from '@/views/Hospital/SugerHeigh/H-sugerheigh.vue'
import other from '@/views/Hospital/Other/H-other.vue'
import cases from '@/views/Hospital/Case/H-cases.vue'
import bloodheighSick from '@/components/BloodheighSickcard/bloodheighSick.vue'
import sugerheighSick from '@/components/SugerheighSickcard/sugerheighSick.vue'
// import card from '@/components/BloodheighSickcard/card.vue'
// import card from '@/components/BloodheighSickcard/card.vue'

Vue.use(Router)

export default new Router({
  routes: [
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
          component: booldheigh
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
        }

      ]
    }
  ]
})
