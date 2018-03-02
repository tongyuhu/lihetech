<template>
<div>
  <ul>
    <li class="fmenu" :class="{'fmenuactive':fmenuactive}">
      <!-- <slot name="1icon"> -->
        <!-- <i class="fmenu-icon"></i> -->
        <!-- <fi :icon="iconNamehidden"></fi> -->
        <fi v-if="showicon" :icon="iconNameclose"></fi>
        <fi v-else :icon="iconNameopen"></fi>
      <!-- </slot> -->
      <div @click.stop="toggle">
        <router-link :to="{name:pathname}" tag="div">{{title}}</router-link>
      </div>
    </li>
    <el-collapse-transition>
      <ul class="fmenu-item" v-show="open">
        <slot></slot>
        <!-- <li class="fmenu-item-li" @click="itemHandle" v-for="item in menuitem" :key="item.id">
          <i v-show="showitemicon" class="fmenu-item-icon"></i>
          {{item.title}}
        </li> -->
      </ul>
    </el-collapse-transition>
  </ul>
</div>
</template>

<script>
import fi from './icon.vue'
import FmenuItem from './FmenuItem.vue'
import Bus from './../bus'
export default {
  name: 'Fmenu',
  components: {
    fi,
    FmenuItem
  },
  props: {
    iconName: {
      default: 'heigh-blood'
    },
    title: {
      default: '导航名'
    },
    pathname: {
      default: 'Home'
    },
    index: ''
    // menuitem: []
  },
  data () {
    return {
      open: false,
      fmenuactive: false,
      showicon: true,
      showitemicon: false,
      menuitem: [
        {
          id: 1,
          title: '整体分布'
        },
        {
          id: 2,
          title: '最新问诊'
        },
        {
          id: 3,
          title: '严重患者'
        }
      ]
      // iconName: 'height-blood'
    }
  },
  methods: {
    toggle (event) {
      event.stopPropagation()
      // this.iconName =
      this.open = !this.open
      this.fmenuactive = !this.fmenuactive
      this.showicon = !this.showicon
      Bus.$emit('resetmenu', this.index)
      // console.log(this.index)
    },
    itemHandle () {
      this.showitemicon = !this.showitemicon
    }
  },
  computed: {
    iconNameclose () {
      let iconclass = this.iconName + '-close'
      return iconclass
    },
    iconNameopen () {
      let iconclass = this.iconName + '-open'
      return iconclass
    }
  },
  mounted () {
    Bus.$on('resetmenu', (val) => {
      if (this.index === val) {

      } else {
        this.open = false
        this.fmenuactive = false
        this.showicon = true
      }
      // console.log(val)
    })
  }
}
</script>

<style scoped>
 ul{
   list-style: none;
   margin: 0;
   padding: 0;
 }
 li{
   margin: 0;
   padding: 0;
   outline: none;
   cursor: pointer;
 }
 .fmenu{
   background-color: #1991fc;
   color: #ffffff99;
   padding-left: 76px;
   padding-top: 25px;
   padding-bottom: 25px;
   font-size: 16px;
 }
 .fmenuactive{
   background-color: #1579d2;
   color: #fff;
   position: relative;
   /* padding-bottom: 15px; */
 }
 .fmenuactive::before{
  top: 25px;
  left: 5px;
  position: absolute;
  content: '';
  width: 2px;;
  height: 20px;
  /* border: 10px solid transparent; */
  background-color: #fff;
  /* border-left:2px solid #fff; */
  /* border-bottom: 10px solid #f78989; */
 }
 li:hover{
   color: #fff;
   background-color: #1579d2;
 }
 .fmenu-item-icon{
    position: relative;
 }
/* .fmenu-item-icon::before{
  bottom: 9px;
  left: -28px;
  position: absolute;
  content: '';
  width: 1px;;
  height: 50px;
  background-color: #ffffff99;
  background: url('./../../诊所-高血压/hospitalIcon/诊所-icon-09.png') no-repeat;
} */
.fmenu-item-icon::after{
  top: 3px;
  left: -28px;
  position: absolute;
  content: '';
  width: 14px;;
  height: 15px;
  background-color: #ffffff99;
  background: url('./../../诊所-高血压/hospitalIcon/诊所-icon-09.png') no-repeat;
  z-index: 999;
}
 .fmenu-item{
   /* background-color: #199; */
   background-color: #1579d2;
   color: #ffffff99;
   padding-left: 76px;
 }
 .fmenu-item li:nth-child(1){
   padding-top:0px;
 }
 .fmenu-item-li{
   padding-top: 15px;
   padding-bottom: 15px;
 }
 .fmenu-content{
   height: 76px;
 }
</style>
