<template>
  <div>
    <!-- <transition :name="goDirection"> -->
      <div v-show="show" class="carousel">
        <slot></slot>
      </div>
     <!-- </transition> -->
  </div>
</template>

<script>
export default {
  name: 'carditem',
  props: {
    // index: {
    //   type: Number,
    //   default: 0
    // }
  },
  data () {
    return {
      goDirection: 'leftarrow',
      show: false,
      index: undefined
    }
  },
  watch: {
    index (val) {
      if (val === 99999) {
        this.show = true
      } else {
        this.show = false
      }
    }
  }
}
</script>

<style scoped>
/* .leftarrow-enter, */
/* .leftarrow-leave-active {
   transition: opacity .5s; */
   
  /* transform: translateY(-50%) translateX(-10px);
  opacity: 0; */
/* } */
/* .rightarrow-enter,
.rightarrow-leave-active {
  transform: translateY(50%) translateX(10px);
  opacity: 0;
} */
  /* .leftarrow-enter-to {
    transition: all 1.5s ease;
    transform: translateX(0);
  } */

  /* .leftarrow-leave-active { */
    /* transition: all 1.5s ease; */
    /* transform: translateX(-100%) */
  /* } */

  /* .leftarrow-enter {
    transform: translateX(100%)
  } */

  /* .leftarrow-leave {
    transform: translateX(0)
  } */
  /* .rightarrow-enter-to {
    transition: all 1.5s ease;
    transform: translateX(0);
  } */

  /* .rightarrow-leave-active { */
    /* transition: all 1.5s ease;
    transform: translateX(100%) */
  /* } */

  /* .rightarrow-enter {
    transform: translateX(-100%)
  } */

  /* .rightarrow-leave {
    transform: translateX(0)
  } */
  /* .carousel{
    float: left;
    width: 100%;
  } */
</style>
