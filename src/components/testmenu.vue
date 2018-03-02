<template>
<div class="menu">
  <div
  v-for="item in menu"
  :key="item.id"
  class="menu"
  >
    <Fmenu 
      :iconName="item.iconName"
      :title="item.title"
      :pathname="item.pathname"
      :index="item.id">
      <!-- <p>111</p> -->
      <!-- <li is="FmenuItem"></li> -->
      <FmenuItem
      v-for="i in item.child"
      :key="i.title"
      :title="i.title"
      :index="i.index"></FmenuItem>
    </Fmenu>

  </div>
</div>
</template>

<script>
import Fmenu from './Fmenu.vue'
import FmenuItem from './FmenuItem.vue'
export default {
  name: 'testmenu',
  components: {
    Fmenu,
    FmenuItem
  },
  data () {
    return {
      menu: [
        {
          id: 1,
          iconName: 'heigh-blood',
          title: '高血压',
          pathname: 'booldheigh',
          child: [
            {
              title: '总体趋势',
              index: 1
            },
            {
              title: '总体',
              index: 2
            },
            {
              title: '总体分布',
              index: 3
            }
          ]
        },
        {
          id: 8,
          iconName: 'heigh-suger',
          title: '糖尿病',
          pathname: 'sugerheigh',
          child: [
            {
              title: '总体趋势',
              index: 1
            },
            {
              title: '总体',
              index: 2
            },
            {
              title: '总体分布',
              index: 3
            }
          ]
        },
        {
          id: 3,
          iconName: 'other',
          title: '其他',
          pathname: 'other'
        },
        {
          id: 4,
          iconName: 'cases',
          title: '病例库',
          pathname: 'cases'
        },
        {
          id: 5,
          iconName: 'admin',
          title: '人员管理',
          pathname: 'booldheigh'
        },
        {
          id: 6,
          iconName: 'message',
          title: '我的消息',
          pathname: 'booldheigh'
        }
      ]
    }
  }
}
</script>

<style scoped>
  .menu{
    height: 100%;
    background-color: #1991fc;
    /* background-color: #1991fc99; */
    color: #fff;
  }
</style>
