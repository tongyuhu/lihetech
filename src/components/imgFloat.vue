<template>
  <!-- <div class="img-message-wrap"  v-if="showBigImg"> -->
  <div class="img-message-wrap" :style="{'background':backgroundColor}">
  <!-- <div class="img-message-wrap"  v-on:click.self.stop="closeBig()"> -->
    
    <div class="rotate-btn">
      <button @click="rotate">
        <span class="iconfont icon-xuanzhuan xuanzhuan"></span>
      </button>
      <button @click="enlargeHandler" v-if="enlarge">
        <span class="el-icon-zoom-in xuanzhuan"></span>
      </button>
      <button @click="reduceHandler" v-if="reduce">
        <span class="el-icon-zoom-out xuanzhuan"></span>
      </button>
    </div>
    <div class="close-btn">
      <button @click="closeBig">
        <span class="el-icon-close xuanzhuan"></span>
      </button>
    </div>
    <div class="img-wrap">
      <img ref="bigimg" :style="{'transform':'rotate('+imgrotate+'deg)'}" :src="imgsrc" alt="无法获取图片">
    </div>
  </div>
</template>

<script>
// import Bus from '@/bus.js'
// const screenW = document.documentElement.offsetWidth || document.body.offsetWidth
// const screenH = document.documentElement.offsetHeight || document.body.offsetHeight
const screenW = document.documentElement.clientWidth || document.body.clientWidth
const screenH = document.documentElement.clientHeight || document.body.clientHeight
// const ratio = [0.1, 0.2, 0.3, 0.4, 0.5, 0.7, 0.8, 0.9,1]
const ratio = [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1]
export default {
  name: 'imgfloat',
  props: {
    imgsrc: {
      type: [String],
      default: ''
    },
    backgroundColor: {
      type: String,
      default: 'rgba(65, 61, 61, 0.452)'
    },
    enlarge: {
      type: Boolean,
      default: false
    },
    reduce: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      // showBigImg: this.show,
      imgrotate: 0 // 旋转角度
    }
  },
  methods: {
    /**
     * @description 关闭大图
     */
    closeBig () {
      // this.showBigImg = false
      this.$emit('close')
    },
    /**
     * @description 旋转
     */
    rotate (val) {
      if (val === 0) {
        this.imgrotate = val
      } else {
        this.imgrotate += 90
      }
      // console.log('width', this.$refs.bigimg.naturalWidth, 'height', this.$refs.bigimg.naturalHeight)
      // let width = this.$refs.bigimg.width
      // let height = this.$refs.bigimg.height
      if (this.imgrotate % 180 === 0) {
        console.log('180')
        this.imgdeg0()
      } else {
        this.imgdeg1()
      }
      console.log('naturalWidth', this.$refs.bigimg.naturalWidth, 'naturalHeight', this.$refs.bigimg.naturalHeight)
      console.log('width', this.$refs.bigimg.width, 'height', this.$refs.bigimg.height)
    },
    /**
     * @description 旋转 180 360
     */
    imgdeg0 () {
      let vm = this
      this.$nextTick(function () {
        for (let item of ratio) {
          if (vm.$refs.bigimg.naturalWidth * item < screenW && vm.$refs.bigimg.naturalHeight * item < screenH - 160) {
            vm.$refs.bigimg.width = vm.$refs.bigimg.naturalWidth * item
            vm.$refs.bigimg.height = vm.$refs.bigimg.naturalHeight * item
            break
          }
        }
      })
    },
    /**
     * @description 旋转 90 270
     */
    imgdeg1 () {
      for (let item of ratio) {
        if (this.$refs.bigimg.naturalWidth * item < screenH - 160 && this.$refs.bigimg.naturalHeight * item < screenW) {
          this.$refs.bigimg.width = this.$refs.bigimg.naturalWidth * item
          this.$refs.bigimg.height = this.$refs.bigimg.naturalHeight * item
          break
        }
      }
    },
    /**
     * @description 放大
     */
    enlargeHandler () {
      this.$nextTick(function () {
        this.$refs.bigimg.width = (this.$refs.bigimg.width) * 1.3
        this.$refs.bigimg.height = (this.$refs.bigimg.height) * 1.3
        // this.$refs.bigimg.left = '50%'
        // this.$refs.bigimg.top = '50%'
        // this.bigimg.marginLeft = -(this.$refs.bigimg.offsetWidth) / 2
        // this.bigimg.marginTop = -(this.$refs.bigimg.offsetHeight) / 2
      })
    },
    /**
     * @description 缩小
     */
    reduceHandler () {
      this.$nextTick(function () {
        this.$refs.bigimg.width = (this.$refs.bigimg.width) * 0.7
        this.$refs.bigimg.height = (this.$refs.bigimg.height) * 0.7
        // this.$refs.bigimg.left = '50%'
        // this.$refs.bigimg.top = '50%'
        // this.bigimg.marginLeft = -(this.$refs.bigimg.offsetWidth) / 2
        // this.bigimg.marginTop = -(this.$refs.bigimg.offsetHeight) / 2
      })
    }
  },
  mounted () {
    let vm = this
    this.$nextTick(function () {
      vm.$refs.bigimg.onload = function () {
        for (let item of ratio) {
          if (vm.$refs.bigimg.naturalWidth * item < screenW && vm.$refs.bigimg.naturalHeight * item < screenH - 160) {
            vm.$refs.bigimg.width = vm.$refs.bigimg.naturalWidth * item
            vm.$refs.bigimg.height = vm.$refs.bigimg.naturalHeight * item
            break
          }
        }
      }
    })
    console.log('width', this.$refs.bigimg.width, 'height', this.$refs.bigimg.height)
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
  // display: flex;
  // margin-top:50%;
  // justify-content: center;
  // align-items: center;
  text-align: center;
  z-index: 9999999999;
  width: 100%;
  height: 100%;
  background: rgba(65, 61, 61, 0.452);
  .img-wrap{
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    position: absolute;
  }
  img{
    transition:all 0.5s;
  }
}
.rotate-btn{
  position: absolute;
  bottom:10px;
  margin-bottom: 10px;
  left: 50%;
  transform:translateX(-50%);
  z-index: 99999999999999;
}
.close-btn{
  position: absolute;
  top:10px;
  margin-top: 10px;
  right:20px;
  z-index: 99999999999999;
}
.xuanzhuan{
  font-size: 30px;
}
button{
  background: transparent;
  border:none;
  outline: none;
  cursor: pointer;
  color: rgb(228, 220, 220);
}
</style>
