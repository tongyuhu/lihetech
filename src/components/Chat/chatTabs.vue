<template>
  <div>
    <div class="tabs">
      <ul class="clear">
        <li v-for="(item,index) in panes" :key="index" @click="checkPane(index,item)">
          <!-- <span :class="['iconfont',item.icon]" :title="item.title"></span> -->
          <!-- <div :class="active(item,inedx)"> -->

            <span :class="active(item)" :title="item.title" ></span>
          <!-- </div> -->
        </li>
      </ul>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'imtabs',
  props: {
    index: {
      type: [Number],
      default: 0
    }
  },
  data () {
    return {
      panes: [],
      currentIndex: 0
    }
  },
  methods: {
    findComponentsDownward (context, componentName) {
      return context.$children.reduce((components, child) => {
        if (child.$options.name === componentName) components.push(child)
        const foundChilds = this.findComponentsDownward(child, componentName)
        return components.concat(foundChilds)
      }, [])
    },
    findBrothersComponents (context, componentName) {
      let res = context.$parent.$children.filter(item => {
        return item.$options.name === componentName
      })
      let index = res.indexOf(context)
      res.splice(index, 1)
      return res
    },
    getPanes () {
      return this.findComponentsDownward(this, 'impane')
    },
    initPanes () {
      let panes = this.getPanes()
      panes.forEach((pane, index) => {
        if (!pane.index) { pane.index = index }
      })
      return panes
    },
    panesArr () {
      this.initPanes().forEach(item => {
        let obj = {}
        obj.name = item.name
        obj.title = item.title
        obj.icon = item.icon
        obj.index = item.index
        this.panes.push(obj)
        obj = {}
      })
    },
    checkPane (index, item) {
      this.currentIndex = index
      let pane = this.getPanes()[index]
      pane.show = true
      let bothers = this.findBrothersComponents(pane, 'impane')
      bothers.forEach(item => {
        item.show = false
      })
    },
    active (item) {
      let active = item.icon + '-active'
      if (item.index === this.currentIndex) {
        return 'border ' + active
      } else {
        return item.icon
      }
    }
  },
  mounted () {
    this.panesArr()
    this.checkPane(this.index)
    // console.log(this.initPanes())
  }
}
</script>

<style lang="scss" scoped>
.tabs{
  ul{
    list-style: none;
    padding: 0;
    margin: 0;
    margin-top:10px;
    text-align: center;
    // margin-bottom: 10px;
  }
  li{
    display: inline-block;
    width: 30%;
    text-align: center;
    cursor: pointer;
    span{
      color: rgb(65, 59, 59);
      display: block;
      font-size: 30px;
    }
  }
  .border{
    // border-width: 20px;
    border-bottom:2px solid #1991fc;
  }
  .icon{
    // border-bottom:2px solid #1991fc;
    display: inline-block;
    width: 34px;
    height: 34px;
    background: url(~icon/hospital-icon-98.png) no-repeat center;
    // margin-bottom: 5px;
  }
  .icon-friend{
    // border-bottom:2px solid #1991fc;
    display: inline-block;
    width: 34px;
    height: 34px;
    background: url(~icon/hospital-icon-98.png) no-repeat center;
    // margin-bottom: 5px;
  }
  .icon-friend-active{
    display: inline-block;
    width: 34px;
    height: 34px;
    background: url(~icon/hospital-icon2-06.png) no-repeat center;
    // margin-bottom: 5px;
  }
  .icon-group{
    // border-bottom:2px solid #1991fc;
    display: inline-block;
    width: 34px;
    height: 34px;
    background: url(~icon/hospital-icon-99.png) no-repeat center;
    // margin-bottom: 5px;
  }
  .icon-group-active{
    display: inline-block;
    width: 34px;
    height: 34px;
    background: url(~icon/hospital-icon2-07.png) no-repeat center;
    // margin-bottom: 5px;
  }
  .icon-msg{
    // border-bottom:2px solid #1991fc;
    display: inline-block;
    width: 34px;
    height: 34px;
    background: url(~icon/hospital-icon-100.png) no-repeat center;
    // margin-bottom: 5px;
  }
  .icon-msg-active{
    display: inline-block;
    width: 34px;
    height: 34px;
    background: url(~icon/hospital-icon2-01.png) no-repeat center;
    // margin-bottom: 5px;
  }
}
</style>

