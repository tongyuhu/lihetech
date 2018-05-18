<template>
  <div class="sider">
    <div class="head-logo">
      <img src="~icon/hospital-icon-01.png" alt="logo" class="head-logo-img">
    </div>
    <div
    v-for="item in menu"
    :key="item.id"
    class="menu"
    >
      <wmenu 
        :iconName="item.iconName"
        :title="item.title"
        :routerName="item.routerName"
        :open="item.open"
        :hasMsg="item.hasMsg">
        <wmenuitem
        v-for="i in item.child"
        :key="i.title"
        :title="i.title"
        :id="i.id"
        :routerName="i.routerName"
        @activeitemmenu="goanchor"></wmenuitem>
      </wmenu>
    </div>
  </div>
</template>

<script>

import wmenu from '@/components/wmenu.vue'
import wmenuitem from '@/components/wmenuitem.vue'
export default {
  name: 'H-Sider',
  components: {
    wmenu,
    wmenuitem
  },
  data () {
    return {
      menu: [
        {
          iconName: 'heigh-blood',
          title: '高血压',
          routerName: 'booldheigh',
          open: true,
          child: [
            {
              id: 'bloodtotal',
              title: '总体趋势'
            },
            {
              id: 'bloodnew',
              title: '最新问诊'
            },
            {
              id: 'bloodbad',
              title: '严重患者'
            },
            {
              id: 'bloodnolisten',
              title: '未遵医嘱'
            },
            {
              id: 'bloodunperfect',
              title: '建档不完善'
            },
            {
              id: 'bloodcases',
              title: '患者列表'
            }
          ]
        },
        {
          id: 2,
          iconName: 'heigh-suger',
          title: '糖尿病',
          routerName: 'sugerheigh',
          child: [
            {
              id: 'sugerTotal',
              title: '总体趋势'
            },
            {
              id: 'sugerNew',
              title: '最新问诊'
            },
            {
              id: 'sugerBad',
              title: '严重患者'
            },
            {
              id: 'sugerNolisten',
              title: '未遵医嘱'
            },
            {
              id: 'sugerUnperfect',
              title: '建档不完整'
            },
            {
              id: 'sugerCases',
              title: '患者列表'
            }
          ]
        },
        {
          id: 3,
          iconName: 'other',
          title: '其他',
          routerName: 'other',
          child: [
            {
              id: 'othertotal',
              title: '整体趋势'
            },
            {
              id: 'respire',
              title: '呼吸道'
            },
            {
              id: 'cancer',
              title: '癌症'
            },
            {
              id: 'infection',
              title: '传染病'
            },
            {
              id: 'tumour',
              title: '肿瘤'
            }
          ]
        },
        {
          // id: 4,
          iconName: 'order',
          title: '预约管理',
          routerName: 'order'
        },
        {
          id: 4,
          iconName: 'cases',
          title: '病例库',
          routerName: 'cases'
        },
        {
          id: 5,
          iconName: 'admin',
          title: '人员管理',
          routerName: 'personManage',
          child: [
            {
              // id: 'sugerCases',
              routerName: 'doctorManage',
              title: '医生'
            },
            {
              // id: 'sugerCases',
              routerName: 'sickManage',
              title: '患者'
            }
          ]
        },
        {
          id: 6,
          iconName: 'message',
          hasMsg: true,
          title: '我的消息',
          routerName: 'accountSetting'
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








