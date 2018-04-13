<template>
  <div>
    <div class="menu" :class="{'color':fontcolor}" @click.stop="toggle">
      <!-- <fi v-if="showicon" :icon="z"></fi> -->
      <i :class="{'before':before}"></i>
      <div class="menu-icon">
        <fi :icon="icon"></fi>
        <div class="menu-name">
          <span>{{title}}</span>
          <i :class="{'has-message':hasMsg}"></i>
          <!-- <router-link :to="{name:routerName}" tag="span">{{title}}</router-link> -->
        </div>
      </div>
        <fi :icon="afterClose"></fi>
    </div>
    <el-collapse-transition>
      <ul v-show="isopen">
        <slot></slot>
      </ul>
    </el-collapse-transition>
  </div>
</template>

<script>
import fi from './icon.vue'
import Bus from '@/bus'
import {findComponentsDownward} from './../untils/untils'
export default {
  name: 'wmenu',
  components: {
    fi
  },
  props: {
    routerName: {
      type: String
    },
    iconName: {
      type: String,
      default: 'heigh-blood'
    },
    title: {
      type: String,
      default: '导航名'
    },
    open: {
      type: Boolean,
      default: false
    },
    hasMsg: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      afterClose: 'menu-close',
      icon: '',
      isopen: this.open,
      before: true,
      checked: false,
      fontcolor: false
    }
  },
  computed: {
  },
  methods: {
    toggle () {
      this.$router.push({
        name: this.routerName
      })
      this.isopen = true
      this.openChild()
      let arr = this.findBrothersComponents(this, 'wmenu')
      arr.forEach(item => {
        item.isopen = false
        item.closeChild()
      })
      let childs = findComponentsDownward(this, 'wmenuitem')
      childs.forEach(item => {
        item.isChecked = false
      })
    },
    completeIconName (name, type) {
      if (type) {
        return name + '-open'
      } else {
        return name + '-close'
      }
    },
    openChild () {
      this.icon = this.completeIconName(this.iconName, true)
      this.afterClose = 'menu-open'
      this.fontcolor = true
      this.before = true
    },
    closeChild () {
      this.icon = this.completeIconName(this.iconName, false)
      this.afterClose = 'menu-close'
      this.fontcolor = false
      this.before = false
    },
    findBrothersComponents (context, componentName) {
      let res = context.$parent.$children.filter(item => {
        return item.$options.name === componentName
      })
      let index = res.indexOf(context)
      res.splice(index, 1)
      return res
    },
    check () {
      this.isopen = false
      this.openChild()
      this.fontcolor = true
      this.before = true
      this.afterClose = 'menu-close'
    }
  },
  watch: {
  },
  beforeMount () {
    if (this.open) {
      this.afterClose = 'menu-open'
      this.openChild()
    } else {
      this.afterClose = 'menu-close'
      this.closeChild()
    }
    if (this.checked) {
      this.openChild()
    }
  },
  mounted () {
    Bus.$on('closemenu', (val) => {
      if (this.routerName === val) {
        this.check()
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  ul{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li{
    margin: 0;
    padding: 0;
    outline: none;
    // cursor: pointer;
  }
  $bgcolor:#1991fc; 
  $bgcoloropen:#1579d2; 
  .color{
    color: #fff !important;
    background-color: $bgcoloropen !important; 
  }
  $height:76px;
  .menu{
    box-sizing: border-box;
    display: table-cell;
    vertical-align:middle;
    background-color: $bgcolor;
    height: $height;
    padding-left: 58px;
    line-height: $height;
    width: 250px;
    // width: 100%;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.6);
    // color: #fff;
    cursor: pointer;
    &:hover{
      color: #fff;
      background-color: $bgcoloropen ; 
    }
    &-name{
      display: inline-block;
      width: 100px;
    }
    &-icon{
      display: inline-block;
      padding-left: 20px;
    }
  }
  .before{
    position: relative;
    &:before{
      top: 0;
      right: 50px;
      display: inline-block;
      position: absolute;
      content: '';
      width: 2px;
      height: 20px;
      background-color: #fff;
    }
  }
  .has-message{
      display: inline-block;
      width: 12px;
      height: 13px;
      background: url(~icon/诊所-icon-22.png) no-repeat;
      margin-left: 5px;
  }
</style>


