<template>
  <div class="box">
      <div class="left-arrow">
        <el-button @click="next()" icon="el-icon-arrow-left" type="text" class="arrow"></el-button>
      </div>
      <div class="right-arrow">
        <el-button @click="pre()" icon="el-icon-arrow-right" type="text" class="arrow"></el-button>
      </div>
      <i class="new"></i>
      <slot></slot>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeindex: 99999,
      defaultactive: 0,
      isNew: true
    }
  },
  methods: {
    getItems () {
      return this.$children.filter(item => {
        return item.$options.name === 'carditem'
      })
    },
    setCardGoDirection (index, Direction) {
      this.getItems()[index].goDirection = Direction
    },
    setactive (active) {
      this.getItems().forEach((card, index) => {
        card.index = index
        if (index === active) {
          card.index = this.activeindex
        }
      })
    },
    pre () {
      this.defaultactive += 1
      if (this.defaultactive >= (this.getItems().length)) {
        this.defaultactive = 0
      }
      this.setCardGoDirection(this.defaultactive, 'leftarrow')
      this.setactive(this.defaultactive)
      console.log('前', this.defaultactive)
    },
    next () {
      this.defaultactive -= 1
      if (this.defaultactive < 0) {
        this.defaultactive = this.getItems().length - 1
      }
      this.setCardGoDirection(this.defaultactive, 'rightarrow')
      this.setactive(this.defaultactive)
      console.log('hou', this.defaultactive)
    }
  },
  mounted () {
    this.getItems()[this.defaultactive].index = this.activeindex
  }
}
</script>

<style scoped>
  /* .leftarrow-enter-to {
    transition: all 1.5s ease;
    transform: translateX(0);
  } */

  /* .leftarrow-leave-active {
    transition: all 1.5s ease;
    transform: translateX(-100%)
  } */

  .leftarrow-enter {
    transform: translateX(100%)
  }

  .leftarrow-leave {
    transform: translateX(0)
  }
  .rightarrow-enter-to {
    transition: all 1.5s ease;
    transform: translateX(0);
  }

  .rightarrow-leave-active {
    transition: all 1.5s ease;
    transform: translateX(100%)
  }

  .rightarrow-enter {
    transform: translateX(-100%)
  }

  .rightarrow-leave {
    transform: translateX(0)
  }

  .box{
    margin-top:8px;
    /* overflow: hidden; */
    /* float: none; */
    position: relative;
    background-color: #fff;
    padding:0px 50px 24px 50px;
    /* margin:0 50px; */
    margin-bottom: 8px;
    /* float: left; */
  }
  .arrow{
    font-size: 24px;
    color:#666;
  }
  .left-arrow{
    position: absolute;
    top:150px;
    left: 10px;
  }
  .right-arrow{
    position: absolute;
    top:150px;
    right: 10px;
  }
  .new{
    position: relative;
  }
  .new::before{
    z-index: 22222222222222;
    top:0;
    left: -50px;
    position: absolute;
    content: '';
    width: 64px;
    height: 44px;
    /* display: block; */
    /* vertical-align: middle; */
    background: url('./../../hospitalImage/hospitalIcon/诊所-icon-31.png') no-repeat;
  }
</style>
