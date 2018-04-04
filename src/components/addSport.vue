<template>
  <div class="sport">
    <div class="inline" v-for="(item,index) in 4" :key="index">
      <div>
        <div class="sport-strength">
          <i class="sport-strength-icon" :class="color(index)"></i>
          最轻运动
        </div>
        <div class="sport-type">
          散步 打太极
        </div>
      </div>
      <div class="inline">
        <div>
          <count
            :index="1"
            :initNum="10"
            type="sport"
            unit="min"
            :step="10"
            @numChange="sportTime"></count>
        </div>
        <div>
          2000千卡
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import count from './../components/count.vue'

export default {
  components: {
    count
  },
  data () {
    return {
      // color: 'one'
    }
  },
  methods: {
    sportTime () {

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
.sport>div{
  padding-bottom:16px;
  padding-top:16px;
  border-bottom:1px solid #eaeaea;
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
</style>
