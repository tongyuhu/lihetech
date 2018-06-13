<template>
  <div class="img-message-wrap"  v-if="showBigImg" v-on:click.self.stop="closeBig()">
    <img :src="imgsrc" alt="无法获取图片">
  </div>
</template>

<script>
import Bus from '@/bus.js'
export default {
  name: 'imgfloat',
  props: {
    imgsrc: {
      type: [String],
      default: ''
    }
  },
  data () {
    return {
      showBigImg: false
    }
  },
  methods: {
    closeBig () {
      this.showBigImg = false
    },
    showBig () {
      this.showBigImg = true
    }
  },
  mounted () {
    let vm = this
    Bus.$on('showbigimg', () => {
      vm.showBig()
    })
  }
}
</script>

<style lang="scss" scoped>
.img-message-wrap{
  position: fixed;
  z-index: 9999999999999;
  // margin-top: 80px;
  top:0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 9999999999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  img{
    max-width: 80%;
    max-height: 90%;
    // width: 80%;
  }
}
</style>
