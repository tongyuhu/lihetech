import Vue from 'vue'
import Router from 'vue-router'
import hospital from '@/views/Hospital/H-index'
import booldheigh from '@/views/Hospital/BloodHeigh/H-bloodheigh.vue'
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
        }
      ]
    }
  ]
})
