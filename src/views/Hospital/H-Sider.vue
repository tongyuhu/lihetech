<template>
  <div class="sider">
    <div class="head-logo">
      <img src="~icon/诊所-icon-01.png" alt="logo" class="head-logo-img">
    </div>
    <!-- <div
    v-for="item in menu"
    :key="item.id"
    class="menu"
    >
      <Fmenu 
        :iconName="item.iconName"
        :title="item.title"
        :pathname="item.pathname"
        :index="item.id"
        :isOpen="item.open">
        <FmenuItem
        v-for="i in item.child"
        :key="i.title"
        :title="i.title"
        :index="i.index"
        :id="i.id"
        @activeitemmenu="goanchor">
        </FmenuItem>
      </Fmenu>
    </div> -->
    <div
    v-for="item in menu"
    :key="item.id"
    class="menu"
    >
      <wmenu 
        :iconName="item.iconName"
        :title="item.title"
        :routerName="item.pathname"
        :open="item.open">
        <wmenuitem
        v-for="i in item.child"
        :key="i.title"
        :title="i.title"
        :id="i.id"
        :routerName="i.pathname"
        @activeitemmenu="goanchor"></wmenuitem>
      </wmenu>
    </div>
  </div>
</template>

<script>

import Fmenu from './../../components/Fmenu.vue'
import FmenuItem from './../../components/FmenuItem.vue'
import wmenu from './../../components/wmenu.vue'
import wmenuitem from './../../components/wmenuitem.vue'
export default {
  name: 'H-Sider',
  components: {
    Fmenu,
    FmenuItem,
    wmenu,
    wmenuitem
  },
  data () {
    return {
      menu: [
        {
          id: 1,
          iconName: 'heigh-blood',
          title: '高血压',
          pathname: 'booldheigh',
          open: true,
          child: [
            {
              id: 'bloodtotal',
              title: '总体趋势',
              index: 1
            },
            {
              id: 'bloodnew',
              title: '最新问诊',
              index: 2
            },
            {
              id: 'bloodbad',
              title: '严重患者',
              index: 3
            },
            {
              id: 'bloodnolisten',
              title: '未遵医嘱',
              index: 4
            },
            {
              id: 'bloodunperfect',
              title: '建档不完善',
              index: 5
            },
            {
              id: 'bloodcases',
              title: '患者列表',
              index: 6
            }
          ]
        },
        {
          id: 2,
          iconName: 'heigh-suger',
          title: '糖尿病',
          pathname: 'sugerheigh',
          child: [
            {
              id: 'sugerTotal',
              title: '总体趋势',
              index: 1
            },
            {
              id: 'sugerNew',
              title: '最新问诊',
              index: 2
            },
            {
              id: 'sugerBad',
              title: '严重患者',
              index: 3
            },
            {
              id: 'sugerNolisten',
              title: '未遵医嘱',
              index: 4
            },
            {
              id: 'sugerUnperfect',
              title: '建档不完整',
              index: 5
            },
            {
              id: 'sugerCases',
              title: '患者列表',
              index: 6
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
          pathname: 'personManage',
          child: [
            {
              // id: 'sugerCases',
              pathname: 'doctorManage',
              title: '医生',
              index: 1
            },
            {
              // id: 'sugerCases',
              pathname: 'sickManage',
              title: '患者',
              index: 2
            }
          ]
        },
        {
          id: 6,
          iconName: 'message',
          title: '我的消息',
          pathname: 'accountSetting'
        }
      ]
    }
  },
  methods: {
    goanchor (id) {
      // console.log(id)
      this.$nextTick(function () {
        let anchor = document.getElementById(id)
        let scrollrange = anchor.offsetTop
        let currentanchor = document.documentElement.scrollTop
        let i = currentanchor
        let step = Math.abs((scrollrange - currentanchor) / 50)
        if (scrollrange > currentanchor) {
          let scroll = setInterval(() => {
            i += step
            window.scrollTo(0, i)
            if (i >= scrollrange) {
              clearInterval(scroll)
            }
          }, 10)
        }
        if (scrollrange < currentanchor) {
          let scroll = setInterval(() => {
            i -= step
            window.scrollTo(0, i)
            if (i <= scrollrange) {
              clearInterval(scroll)
            }
          }, 10)
        }
      })
      // console.log(step)
    }
  }
}
</script>

<style scoped>
  .sider{
    /* background-color: #1991fc; */
    /* overflow-y: auto; */
    /* overflow-x: hidden; */
  }
  .menu{
    /* position:relative; */
    border: none;
    font-size: 16px;
    color: #fff;
  }
  .head-logo{
    /* float: left; */
    /* width: 250px; */
    width: 100%;
    background-color: #1991fc;
    height: 80px;
    position:relative;
  }
  .head-logo-img{
    display: block;
    padding-left: 40px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
</style>








