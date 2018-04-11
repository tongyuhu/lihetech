<template>
  <div class="tabs">
    <div class="tabs-bar">
      <div
      v-for="(item,index) in navList"
      :class="tabCls(item)"
      :key="index"
      @click="handleChange(index)">
        {{item.label}}
      </div>
      <div class="has-suger" v-if="hassuger">
        <el-button size="small" type="primary" :style="{'width':'100px'}" @click="seeSuger">查看血糖</el-button>
      </div>
    </div>
    <div class="tab-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number]
    },
    hassuger: {
      type: Boolean
    }
  },
  data () {
    return {
      currentValue: this.value,
      navList: []
    }
  },
  methods: {
    tabCls (item) {
      return ['tabs-tab', {
        'tabs-tab-active': item.name === this.currentValue
      }]
    },
    getTabs () {
      // 获取组件名为 pane的子组件
      return this.$children.filter(function (item) {
        return item.$options.name === 'pane'
      })
    },
    updateNav () {
      this.navList = []
      let vm = this
      this.getTabs().forEach((pane, index) => {
        vm.navList.push({
          label: pane.label,
          name: pane.name || index
        })
        if (!pane.name) {
          pane.name = index
        }
        if (index === 0) {
          if (!vm.currentValue) {
            vm.currentValue = pane.name || index
          }
        }
      })
      this.updateStatus()
    },
    updateStatus () {
      let tabs = this.getTabs()
      let vm = this
      tabs.forEach((tab) => {
        // vm.$refs.pane.name
        tab.show = (tab.name === vm.currentValue)
      })
    },
    handleChange: function (index) {
      let nav = this.navList[index]
      let name = nav.name
      this.currentValue = name
      this.$emit('input', name)
      // this.$emit('on-click', name)
    },
    seeSuger () {
      this.$emit('checkSuger')
    }
  },
  watch: {
    value: function (val) {
      this.currentValue = val
    },
    currentValue: function () {
      this.updateStatus()
    }
  }
}
</script>

<style scoped>
  [v-cloak]{
    display: none;
  }
  .tabs{
    margin-top:24px;
    position: relative;
    /* font-size:20px;
    color:#666;
    background-color: #fff; */
  }
  .tabs-bar{
    font-size:20px;
    color:#666;
    background-color: #fff;
  }
  .tabs-bar::after{
    content:'';
    display: block;
    width: 100%;
    height: 1px;
    /* background-color: #d7dde4; */
    /* margin-top:-1px; */
  }
  .tabs-tab{
    display: inline-block;
    padding: 20px 0 10px 0;
    /* margin:20px 0px 10px 24px; */
    margin-left: 24px;
    margin-right: 34px;
    /* background-color: #fff; */
    /* border:1px solid #d7dde4; */
    cursor: pointer;
    position: relative;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .tabs-tab-active{
    color: #1991fc;
    /* border-top:1px solid #1991fc; */
    /* border-bottom:1px solid #1991fc; */
  }
  .tabs-tab-active::before{
    content: "";
    display:block;
    height: 2px;
    width: 100%;
    background-color: #3399ff;
    position: absolute;
    bottom:0;
    margin: 0 auto;
    /* transform: translateX(25%); */
    /* left:50%; */
    /* margin-left: -50%; */
    /* right:0; */
  }
  .tab-content{
    margin-top:12px;
  }
  .has-suger{
    display: inline-block;
    padding-bottom: 12px;
    padding-top: 12px;
    padding-left: 24px;
  }
</style>
