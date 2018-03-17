<template>
  <div class="wrap">
    <el-carousel :autoplay="false" 
    arrow="always" 
    height="400px" 
    @change="changecard"
    indicator-position="none"
    >
      <el-carousel-item v-for="(item,index) in card" :key="item.createTime">
        <sickcard 
        :index="index"
        :totalCard="4"
        :ref="'card'+index"
        :cardData="item"
        ></sickcard>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import sickcard from './sickcard.vue'
import Fcard from './Fcard.vue'
import FcardItem from './FcardItem.vue'
export default {
  components: {
    sickcard,
    Fcard,
    FcardItem
  },
  props: {
    cardsData: {}
  },
  data () {
    return {
      height: 500,
      currentCard: 0
    }
  },
  computed: {
    card () {
      return this.cardsData.data
    }
  },
  methods: {
    prev (index) {
      console.log(this.currentCard)
    },
    next (index) {

    },
    getitemheight () {
      var vm = this
      let arr
      // this.$nextTick(function () {
      arr = vm.$refs.card
      // })
      return arr
    },
    changecard (index, preindex) {
      if (index > preindex) {
        this.next(index)
      } else {
        this.prev(index)
      }
      this.currentCard = index
      // console.log(index, preindex)
    }
  },
  mounted () {
    // let index = this.currentCard
    // console.log(this.currentCard)
    // console.log('height', this.getitemheight()[0].$el.offsetHeight)
    // console.log('index', this.getitemheight())
    // console.log('sickcard', this.$refs.card0[0].$el.clientHeight)
  }
}
</script>

<style scoped>
.wrap{
  /* margin-top:8px; */
  overflow: hidden;
  position: relative;
  background-color: #fff;
  /* padding:8px 50px 28px 50px; */
  margin-bottom: 8px;
  /* height: 200px; */
  width: 100%;
}
.arrow{
  font-size: 24px;
  color:#666;
}
.left-arrow{
  position: absolute;
  top:45%;
  left: 10px;
}
.right-arrow{
  position: absolute;
  top:45%;
  right: 10px;
}
ul{
  height: 100%;
  weight:100%;
  list-style: none;
}
ul li{
  float: left;
}
.red{
  float: left;
  display: inline-block;
  height: 100%;
  width: 100%;
  background-color: red;
}
.blue{
  float: left;
  display: inline-block;
  height: 100%;
  width: 100%;
  background-color: blue;
}
.flex{
  /* display: flex; */
  /* overflow: hidden; */
  position: relative;
  height: 500px;
}
.flex-o{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: inline-block;
    overflow: hidden;
    z-index: 0;
    transition: transform 2s;
/* width: 100%; */
/* height: 100%; */
}
.flex-t{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: inline-block;
    overflow: hidden;
    z-index: 0;
    transition: transform 2s;
}
</style>
<style>
.el-carousel__arrow {
    border: none;
    outline: 0;
    padding: 0;
    margin: 0;
    height: 36px;
    width: 36px;
    cursor: pointer;
    -webkit-transition: .3s;
    transition: .3s;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0);
    position: absolute;
    top: 50%;
    z-index: 10;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    text-align: center;
    font-size: 28px;
    color: #999;
    }
.el-carousel__arrow:hover {
    background-color: rgba(255, 255, 255, 0);
}
</style>

