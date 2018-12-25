<template>
  <div class="tabs-wrap">
    <div class="tabs-bar"
    :style="css">
      <div
      v-for="(item,index) in navList"
      :class="tabCls(item)"
      :key="index"
      @click="handleChange(index)"
      :style="tabcss"
      >
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
    value: {  // 初始化打开pane序列号
      type: [Number, String]
    },
    hassuger: {
      type: Boolean
    },
    css: null,
    tabcss: null
  },
  data () {
    return {
      navList: [] // pane集合
    }
  },
  computed: {
    currentValue: {
      get: function () {
        return this._.toNumber(this.value)
      },
      set: function (val) {
        return this._.toNumber(val)
      }
    }
  },
  methods: {
    /**
     * @description 根据选择的pane更新css
     */
    tabCls (item) {
      return ['tabs-tab', {
        'tabs-tab-active': item.panename === this.currentValue
      }]
    },
    /**
     * @description 遍历子组件获取名为pane的子组件
     */
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
        if (!pane.panename) {  // 如果pane没name设置为indx+1
          pane.panename = index + 1
        }
        vm.navList.push({
          label: pane.label,
          panename: pane.panename || index + 1
        })
        if (index === 0) { // 初始化选择
          if (!vm.currentValue) {
            vm.currentValue = pane.panename || index + 1
          }
        }
      })
      this.updateStatus()
    },
    /**
     * @description 选择pane更新显示pane 并向父组件提交
     */
    updateStatus () {
      let tabs = this.getTabs()
      let vm = this
      tabs.forEach((tab, index) => {
        tab.show = (tab.panename === vm.currentValue)
        if (tab.show) {
          this.$emit('checkd', index)
        }
      })
    },
    /**
     * @description 选择pane触发事件
     * @param {number} index 选择的序列号 起始0
     */
    handleChange: function (index) {
      let nav = this.navList[index]
      let panename = nav.panename
      this.currentValue = panename
      this.$emit('input', panename)
    },
    seeSuger () {
      this.$emit('checkSuger')
    }
  },
  watch: {
    value: function (val) {
      this.currentValue = val
    },
    currentValue: function () {  // 选择pane更新 currentValue 触发updateStatus
      this.updateStatus()
    }
  }
}
</script>

<style scoped>
  [v-cloak]{
    display: none;
  }
  .tabs-wrap{
    /* margin-top:24px; */
    position: relative;
    /* padding: 0 20px; */
    /* font-size:20px;
    color:#666;
    background-color: #fff; */
  }
  .tabs-bar{
    padding:0 20px;
    font-size:20px;
    color:#666;
    background-color: #fff;
    border-bottom: 1px solid #eaeaea;
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
    /* margin-left: 24px; */
    margin-right: 20px;
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
    bottom:-2px;
    margin: 0 auto;
    /* transform: translateX(25%); */
    /* left:50%; */
    /* margin-left: -50%; */
    /* right:0; */
  }
  .tab-content{
    /* margin:0 20px; */
    margin-top:12px;
  }
  .has-suger{
    display: inline-block;
    padding-bottom: 12px;
    padding-top: 12px;
    padding-left: 24px;
  }
</style>
