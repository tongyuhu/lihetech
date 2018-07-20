<template>
  <div>
    <!-- <div class="menu" 
    v-for="(item,index) in menuarr" 
    :key="index"> -->
      <slot>

      </slot>
    <!-- </div> -->
  </div>
</template>

<script>
import {findComponentsDownward} from '@/untils/untils'
export default {
  name: 'wmenu',
  components: {
  },
  props: {
    menu: {
      type: Array,
      default: function () {
        return []
      },
      required: true
    }
  },
  data () {
    return {
    }
  },
  computed: {
    menuarr () {
      return this.menu
    }
  },
  methods: {
    toggle () {
      this.$router.push({
        name: this.routerName
      })
      // this.isopen = true
      this.isopen = !this.isopen
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
      console.log('执行父级')
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
  .menu{
    /* position:relative; */
    border: none;
    font-size: 16px;
    color: #fff;
  }
</style>


