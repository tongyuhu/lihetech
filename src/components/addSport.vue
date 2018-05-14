<template>
  <div class="sport">
    <div class="inline">
      <div>
        <div class="sport-strength">
          <!-- <i class="sport-strength-icon" :class="color(index)"></i> -->
          {{title}}
          <span class="text-6">({{subtitle}})</span>
          
        </div>
        <div class="sport-type">
          <span class="text-6">
          {{item}}
          </span>
        </div>
      </div>
      <div class="inline">
        <div>
          <count
            :index="1"
            :initNum="initNum"
            type="sport"
            unit="min"
            :step="step"
            @numChange="sportTime"></count>
        </div>
        <!-- <div>
          2000千卡
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import count from './../components/count.vue'

export default {
  name: 'addsport',
  props: {
    title: {
      type: String,
      default: '最轻运动'
    },
    subtitle: {
      type: String,
      default: '80千卡/30min'
    },
    itemlist: {
      type: [Array],
      default: []
    },
    step: {
      type: [Number],
      default: 10
    },
    initNum: {
      type: [Number],
      default: 30
    },
    index: {
      type: [Number],
      default: 1
    }
  },
  components: {
    count
  },
  data () {
    return {
      // color: 'one'
    }
  },
  computed: {
    item () {
      if (this.itemlist.length !== 0) {
        return this.itemlist.join(' ')
      } else {
        return ''
      }
    }
  },
  methods: {
    sportTime (val) {
      // {num: this.num, index: this.index, type: this.type}
      // console.log('sportnum', val)
      this.$emit('addsport', {num: val.num, index: this.index})
    },
    color (index) {
      if (index === 0) {
        return 'one'
      }
      if (index === 1) {
        return 'two'
      }
      if (index === 2) {
        return 'three'
      }
      if (index === 3) {
        return 'four'
      }
    }
  }
}
</script>

<style scoped>
.sport{
  width: 100%;
}
.sport>div{
  padding-bottom:16px;
  padding-top:16px;
  border-bottom:1px solid #ebeef5;
  width: 100%;
}
.sport>div:nth-last-child(1){
  border-bottom:none;
}
.inline{
  display: flex;
  align-items: center;
  justify-content:space-between;
}
.sport-strength{
  margin-left: 20px;
  margin-bottom: 10px;
  color: #041421;
}
.sport-type{
  margin-left: 20px;

}
.sport-strength-icon{
  position: relative;
  /* display: flex; */
}
.sport-strength-icon::before{
  position: absolute;
  content: '';
  display: inline-block;
  width: 15px;
  height: 15px;
  line-height: 15px;
  font-size: 0;
  border-radius: 50%;
  left: -20px;
  top: 50%;
  transform: translateY(-50%);
  vertical-align: middle;
  /* background-color: #7cedc4; */
}
.one::before{
  background-color: #7cedc4;
}
.two::before{
  background-color: #4279ee;
}
.three::before{
  background-color: #c2b56a;
}
.four::before{
  background-color: #ee7753;
}
.text-6{
  color: #666;
}
</style>
