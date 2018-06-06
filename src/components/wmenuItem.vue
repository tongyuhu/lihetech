<template>
  <li class="menu-item" :class="{'color':color}" @click.stop="checkMenuItem">
    <i :class="{'menu-item-icon':icon}"></i>
    <span>
      {{title}}
    </span>
  </li>
</template>

<script>
export default {
  name: 'wmenuitem',
  props: {
    title: {
      default: '子菜单',
      type: String
    },
    id: {
      type: String
    },
    routerName: {
      type: String
    }
  },
  data () {
    return {
      color: false,
      isChecked: false,
      icon: false
    }
  },
  methods: {
    checkMenuItem () {
      if (this.routerName) {
        // this.$router.push({
        //   name: this.routerName
        // })
        this.$emit('activeitemmenu', {routerName: this.routerName})
      }
      this.isChecked = true
      let arr = this.findBrothersComponents(this, 'wmenuitem')
      arr.forEach(item => {
        item.isChecked = false
      })
      if (this.id) {
        this.$emit('activeitemmenu', {id: this.id})
      }
    },
    findBrothersComponents (context, componentName) {
      let res = context.$parent.$children.filter(item => {
        return item.$options.name === componentName
      })
      let index = res.indexOf(context)
      res.splice(index, 1)
      return res
    }
  },
  watch: {
    isChecked (val) {
      if (val) {
        this.color = true
        this.icon = true
      } else {
        this.color = false
        this.icon = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$url:'./../../hospitalImage/hospitalIcon/';
.menu-item{
  display:block;
  // display: table-cell;
  // vertical-align:middle;
  background-color: #1579d2;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  // line-height: 76px;
  padding-left: 80px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 16px;
  cursor: pointer;
  &::before{
    content: " ";
    display: inline-block;
    height: 100%;
    width: 0;
    vertical-align: middle;
  }
  &:hover{
    color: #fff;
  }
  &-icon{
    position: relative;
    &::after{
      top: 2px;
      left: -28px;
      position: absolute;
      content: '';
      width: 14px;;
      height: 15px;
      background-color: #ffffff99;
      background: url('~icon/hospital-icon-09.png') no-repeat;
      z-index: 999;
    }
  }
}
.color{
  color: #fff;
}


</style>
