<template>
  <div>
    <!-- <el-menu 
    class="menu"
    default-active="1" 
    background-color="#1991fc"
    text-color="#ffffff99"
    active-text-color="#fff"
    > -->
      <!-- <el-submenu
      popper-class="popper-menu"
      index="22">
        <template slot="title">
          <i class="el-icon-location"></i>
          <router-link :to="{ name: 'booldheigh'}" tag="span">高血压</router-link>
        </template>
        <el-menu-item index="1" >
          <span slot="title">
             <router-link :to="{ name: 'booldheigh'}" tag="div">高血压</router-link> -->
          <!-- </span>
        </el-menu-item>
      </el-submenu>
        <el-menu-item index="2">
          <span slot="title">
            <router-link :to="{ name: 'menu'}" tag="div">menu</router-link>
          </span>
        </el-menu-item> --> 
      <!-- <el-menu-item index="1">
            <span slot="title">
              <router-link :to="{ name: 'booldheigh'}" tag="div">高血压</router-link>
            </span>
      </el-menu-item>
      <el-menu-item index="2">
            <span slot="title">
              <router-link :to="{ name: 'sugerheigh'}" tag="div">糖尿病</router-link>
            </span>
      </el-menu-item>
      <el-menu-item index="3">
            <span slot="title">
              <router-link :to="{ name: 'other'}" tag="div">其他</router-link>
            </span>
      </el-menu-item>
      <el-menu-item index="4">
            <span slot="title">
              <router-link :to="{ name: 'cases'}" tag="div">病例库</router-link>
            </span>
      </el-menu-item> -->
      <!-- <el-menu-item index="5">
            <span slot="title">
              <router-link :to="{ name: 'bloodheighSick'}" tag="div">高血压病人病历</router-link>
            </span>
      </el-menu-item>
      <el-menu-item index="6">
            <span slot="title">
              <router-link :to="{ name: 'sugerheighSick'}" tag="div">糖尿病病人病历</router-link>
            </span>
      </el-menu-item>
      <el-menu-item index="6">
            <span slot="title">
              <router-link :to="{ name: 'addDoctor'}" tag="div">addDoctor</router-link>
            </span>
      </el-menu-item>
      <el-menu-item index="6">
            <span slot="title">
              <router-link :to="{ name: 'healthForm'}" tag="div">healthForm</router-link>
            </span>
      </el-menu-item>
      <el-menu-item index="6">
            <span slot="title">
              <router-link :to="{ name: 'accountSetting'}" tag="div">accountSetting</router-link>
            </span>
      </el-menu-item>
      <el-menu-item index="6">
            <span slot="title">
              <router-link :to="{ name: 'cardtest'}" tag="div">cardtest</router-link>
            </span>
      </el-menu-item> -->
      <!-- <el-menu-item index="8">
            <span slot="title">
              <router-link :to="{ name: 'medicine'}" tag="div">medicine</router-link>
            </span>
      </el-menu-item>
      <el-menu-item index="18">
            <span slot="title">
              <router-link :to="{ name: 'testmenu'}" tag="div">testmenu</router-link>
            </span>
      </el-menu-item>
      <el-menu-item index="18">
            <span slot="title">
              <router-link :to="{ name: 'Fmenu'}" tag="div">Fmenu</router-link>
            </span>
      </el-menu-item>
      <el-menu-item index="18">
            <span slot="title">
              <router-link :to="{ name: 'FmenuItem'}" tag="div">FmenuItem</router-link>
            </span>
      </el-menu-item>
    </el-menu> -->
    <div class="head-logo">
      <img src="./../../../static/hospitalIcon/诊所-icon-01.png" alt="logo" class="head-logo-img">
    </div>
    <div
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
        <!-- <p>111</p> -->
        <!-- <li is="FmenuItem"></li> -->
        <FmenuItem
        v-for="i in item.child"
        :key="i.title"
        :title="i.title"
        :index="i.index"
        :id="i.id"
        
        @activeitemmenu="goanchor"></FmenuItem>
      </Fmenu>

    </div>
  </div>
</template>

<script>

import Fmenu from './../../components/Fmenu.vue'
import FmenuItem from './../../components/FmenuItem.vue'
export default {
  name: 'H-Sider',
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
  .siader{
    /* background-color: #1991fc; */
  }
  .menu{
    /* position:relative; */
    border: none;
    font-size: 16px;
    color: #fff;
  }
  .head-logo{
    /* float: left; */
    width: 250px;
    background-color: #1991fc;
    height: 80px;
    position:relative;
  }
  .head-logo-img{
    display: block;
    margin-left: 40px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
</style>








