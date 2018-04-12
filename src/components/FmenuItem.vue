<template>
  <!-- <ul class="fmenu-item" v-show="open"> -->
    <li class="fmenu-item-li" @click.stop="itemHandle"  :class="{'background':back}">
      <i v-show="showitemicon" class="fmenu-item-icon"></i>
      {{title}}
      <!-- 11111 -->
    </li>
  <!-- </ul> -->
</template>

<script>
import Bus from '@/bus.js'
export default {
  name: 'FmenuItem',
  props: {
    title: {
      default: '子菜单'
    },
    id: '',
    index: ''
  },
  data () {
    return {
      showitemicon: false,
      // open: true,
      back: false
    }
  },
  methods: {
    itemHandle (event) {
      event.stopPropagation()
      this.showitemicon = true
      this.back = !this.back
      this.$emit('activeitemmenu', this.id)
      Bus.$emit('resetmenuitem', this.index)
      // console.log(this.index)
    }
  },
  mounted () {
    // this.showitemicon = false
    // this.back = false
    Bus.$on('resetmenuitem', (val) => {
      if (val === this.index) {
      } else {
        this.showitemicon = false
        this.back = false
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
 li:hover{
   color: #fff;
   background-color: #1579d2;
 }
 .fmenu-item-icon{
    position: relative;
    font-size: 16px;
 }
/* .fmenu-item-icon::before{
  bottom: 9px;
  left: -28px;
  position: absolute;
  content: '';
  width: 1px;;
  height: 50px;
  background-color: #ffffff99;
  background: url('~icon/诊所-icon-09.png') no-repeat;
} */
.fmenu-item-icon::after{
  top: 2px;
  left: -28px;
  position: absolute;
  content: '';
  width: 14px;;
  height: 15px;
  background-color: #ffffff99;
  background: url('~icon/诊所-icon-09.png') no-repeat;
  z-index: 999;
}
 .fmenu-item{
   /* background-color: #199; */
   background-color: #1579d2;
   color: #ffffff99;
   padding-left: 76px;
 }
 /* .fmenu-item li:nth-child(1){
   padding-top:0px;
 } */
 .fmenu-item-li{
   padding: 15px 0;
   /* padding-top: 15px; */
   /* padding-bottom: 15px; */
 }
 .background{
   color: #fff;
 }
</style>

