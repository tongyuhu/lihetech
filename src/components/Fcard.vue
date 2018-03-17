<template>
  <div class="box">
      <div class="left-arrow">
        <el-button @click="goleft()" icon="el-icon-arrow-left" type="text" class="arrow"></el-button>
      </div>
      <div class="right-arrow">
        <el-button @click="goright()" icon="el-icon-arrow-right" type="text" class="arrow"></el-button>
      </div>
      <slot></slot>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeindex: 99999,
      defaultactive: 0
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
    goleft () {
      this.defaultactive += 1
      if (this.defaultactive >= (this.getItems().length)) {
        this.defaultactive = 0
      }
      this.setCardGoDirection(this.defaultactive, 'leftarrow')
      this.setactive(this.defaultactive)
    },
    goright () {
      this.defaultactive -= 1
      if (this.defaultactive < 0) {
        this.defaultactive = this.getItems().length - 1
      }
      this.setCardGoDirection(this.defaultactive, 'rightarrow')
      this.setactive(this.defaultactive)
      console.log(this.defaultactive)
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
    overflow: hidden;
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
</style>
