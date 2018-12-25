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
import {findComponentsDownward} from '@/untils/untils'
export default {
  name: 'wmenu-group',
  components: {
    fi
  },
  props: {
    routerName: {  // router名
      type: String
    },
    iconName: {  // icon名 配合icon.vue
      type: String,
      default: 'heigh-blood'
    },
    title: {  // 导航名
      type: String,
      default: '导航名'
    },
    open: {  // 打开状态
      type: Boolean,
      default: false
    },
    hasMsg: {  // 有消息提示加红点  废弃
      type: Boolean,
      default: false
    },
    index: {  // 菜单顺序序列号 必须
      type: Number
    }
  },
  data () {
    return {
      afterClose: 'menu-close',  // 标题后三角图标
      icon: '',  // 完整的icon名
      isopen: this.open,
      before: true,  // 标题前的竖线
      checked: false, // 选择状态
      fontcolor: false // 字体颜色 选中和未选择状态
    }
  },
  computed: {
  },
  methods: {
    /**
     * @description 点击菜单进入相应路由
     */
    toggle () {
      this.$router.push({
        name: this.routerName
      })
      // this.isopen = true
      this.isopen = !this.isopen
      this.openChild() // 打开子菜单
      let arr = this.findBrothersComponents(this, 'wmenu-group')
      arr.forEach(item => {  // 关闭同级菜单
        item.isopen = false
        item.closeChild()
      })
      let childs = findComponentsDownward(this, 'wmenuitem')
      childs.forEach(item => {  // 子菜单选择状态置为false
        item.isChecked = false
      })
      if (this.isopen) {  // 选中提交
        this.$emit('checked', {'routerName': this.routerName, 'index': this.index})
      }
      console.log('执行父级')
    },
    /**
     * @description 完善标题前icon css名称
     * @param {string} name 图标名称
     * @param {boolean} type 打开或关闭状态
     */
    completeIconName (name, type) {
      if (type) {
        return name + '-open'
      } else {
        return name + '-close'
      }
    },
    /**
     * @description 打开子菜单
     */
    openChild () {
      this.icon = this.completeIconName(this.iconName, true)
      this.afterClose = 'menu-open'
      this.fontcolor = true
      this.before = true
    },
    /**
     * @description 关闭子菜单
     */
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
    }
    // check () {
    //   this.isopen = false
    //   this.openChild()
    //   this.fontcolor = true
    //   this.before = true
    //   this.afterClose = 'menu-close'
    // }
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
    // Bus.$on('closemenu', (val) => {
    //   if (this.routerName === val) {
    //     this.check()
    //   }
    // })
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
      // color: #fff;
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
      background: url(~icon/hospital-icon-22.png) no-repeat;
      margin-left: 5px;
  }
</style>


