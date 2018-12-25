<template>
  <div class="sider">
    <div class="head-logo">
      <!-- logo -->
      <img src="~icon/hospital-icon-01.png" alt="logo" class="head-logo-img" @click="goHome">
    </div>
    <!-- <div
    v-for="item in menu"
    :key="item.id"
    class="menu"
    > -->
    <!-- <wmenu
    :menu="menu"> -->
    <!-- 左侧导航 -->
    <wmenu-group 
      v-for="(item,index) in menu"
      :key="item.id"
      :iconName="item.iconName"
      :title="item.title"
      :routerName="item.routerName"
      :open="item.open"
      :hasMsg="item.hasMsg"
      :index="index"
      @checked="checkedMenu">
      <wmenuitem
      v-for="i in item.child"
      :key="i.title"
      :title="i.title"
      :id="i.id"
      :routerName="i.routerName"
      @activeitemmenu="goanchor"></wmenuitem>
    </wmenu-group>
    <!-- </wmenu> -->
    <!-- </div> -->
  </div>
</template>

<script>

// import wmenu from '@/components/wmenu.vue'
import wmenuGroup from '@/components/wmenuGroup.vue'
import wmenuitem from '@/components/wmenuitem.vue'
import {mapState} from 'vuex'
import {session} from '@/untils/untils'
export default {
  name: 'H-Sider',
  components: {
    wmenuGroup,
    // wmenu,
    wmenuitem
  },
  data () {
    return {
      // 高血压管理
      bloodHeighMenu: {
        iconName: 'heigh-blood',
        title: '高血压管理',
        routerName: 'booldheigh',
        open: false
        // child: [
        //   {
        //     id: 'threeLevel',
        //     title: '三级管理'
        //   },
        //   {
        //     id: 'twoLevel',
        //     title: '二级管理'
        //   },
        //   {
        //     id: 'oneLevel',
        //     title: '一级管理'
        //   },
        //   {
        //     id: 'easySick',
        //     title: '易患人群'
        //   },
        //   {
        //     id: 'noLevel',
        //     title: '未分层'
        //   }
        // ]
      },
      // 问诊
      diagonseMenu: {
        iconName: 'diagonse',
        title: '问诊',
        routerName: 'diagonse',
        open: false
        // child: [
        //   {
        //     id: 'bloodtotal',
        //     title: '总体趋势'
        //   },
        //   {
        //     id: 'bloodnew',
        //     title: '最新问诊'
        //   },
        //   {
        //     id: 'bloodbad',
        //     title: '严重患者'
        //   },
        //   {
        //     id: 'bloodnolisten',
        //     title: '未遵医嘱'
        //   }
        //     // {
        //     //   id: 'bloodunperfect',
        //     //   title: '建档不完善'
        //     // },
        //     // {
        //     //   id: 'bloodcases',
        //     //   title: '患者列表'
        //     // }
        // ]
      },
      // 预约管理
      orderMenu: {
          // id: 4,
        iconName: 'order',
        title: '预约管理',
        routerName: 'order',
        open: false
      },
      // 人员管理
      personManage: {
        id: 5,
        iconName: 'admin',
        title: '人员管理',
        routerName: 'personManage',
        open: false,
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
      // 随访
      FlupMenu: {
        iconName: 'flup',
        title: '随访',
        routerName: 'Flup',
        open: false
      },
      menu: []
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  methods: {
    /**
     * @description 选择二级菜单
     */
    goanchor (obj) {
      if (this._.has(obj, 'id')) {
        let id = obj.id
        let fatherRoutername
        this.menu.forEach((item, index) => {
          if (this._.has(item, 'child')) {
            item.child.forEach((child, i) => {
              if (this._.has(child, 'id')) {
                if (child.id === id) {
                  fatherRoutername = this.menu[index].routerName
                }
              }
            })
          }
        })
        if (fatherRoutername) {
          this.$router.push({
            name: fatherRoutername
          })
        }
        console.log('父级路由', fatherRoutername)
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
      }
      if (this._.has(obj, 'routerName')) {
        let routerName = obj.routerName
        this.$router.push({
          name: routerName
        })
      }
      session('itemtab', obj)
      // console.log(step)
    },
    /**
     * @description 选择一级菜单
     */
    checkedMenu (val) {
      // 设置session 一级
      session('tabindex', val.index)
      // 设置session 二级
      session('itemtab', '')
    },
    goHome () {
      // this.$router.push({
      //   name: 'Home'
      // })
    }
  },
  mounted () {
    // 权限管理
    // console.log('医生信息', this.adminInfo)
    //  1-超级管理员 2-医院诊所 3-医生 4-护士
    if (this._.has(this.adminInfo, 'adminType')) {
      if (this.adminInfo.adminType === 3) {
        this.bloodHeighMenu.open = true
        this.menu.push(this.bloodHeighMenu)
        this.menu.push(this.orderMenu)
        this.menu.push(this.diagonseMenu)
        this.menu.push(this.FlupMenu)
        this.menu.push(this.personManage)
      }
      if (this.adminInfo.adminType === 1 || this.adminInfo.adminType === 2) {
        this.bloodHeighMenu.open = true
        this.menu.push(this.bloodHeighMenu)
        // this.menu.push(this.diagonseMenu)
        this.menu.push(this.personManage)
        this.menu.push(this.FlupMenu)
      }
      if (this.adminInfo.adminType === 4) {
        // this.menu.push(this.orderMenu)
        this.bloodHeighMenu.open = true
        this.menu.push(this.bloodHeighMenu)
        this.menu.push(this.FlupMenu)
        this.menu.push(this.personManage)
      }
    }
    let tabindex = session('tabindex')
    let tabitem = session('itemtab')
    if (tabitem) {
      this.menu[0].open = false
      this.menu[tabindex].open = true
      this.goanchor(tabitem)
    } else if (tabindex) {
      this.menu[0].open = false
      this.menu[tabindex].open = true
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
    cursor: default;
  }
</style>








