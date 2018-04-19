import Vue from 'vue'
// import login from '@/components/login'
import login from './../../../src/components/login'
import ElementUI from 'element-ui'
Vue.use(ElementUI)

describe('login.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(login)
    const vm = new Constructor().$mount()
    expect(vm.password)
    .toEqual('123456')
  })
})
