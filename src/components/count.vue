<template>
   <div class="count">
    <button class="add-btn" @click="reduce"><span class="reduce"></span></button>
    <button class="medinice-num">{{num}}{{countUnit}}</button>
    <button class="add-btn" @click="add">
      <span class="add"></span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    initNum: {
      type: Number
    },
    maxNum: {
      type: Number
    },
    unit: {
      type: String
    }
  },
  data () {
    return {
      num: 1,
      countUnit: '粒/次',
      max: Infinity
    }
  },
  watch: {
    initNum (val) {
      if (val) {
        this.num = val
      }
    },
    maxNum (val) {
      if (val) {
        this.max = val
      }
    },
    unit (val) {
      if (val) {
        this.countUnit = val
      }
    }
  },
  methods: {
    reduce () {
      if (this.num > 1) {
        this.num--
      }
      this.$emit('numChange', this.num)
    },
    add () {
      if (this.num < this.max) {
        this.num++
      }
      this.$emit('numChange', this.num)
    }
  },
  mounted () {
    if (this.initNum) {
      this.num = this.initNum
    }

    if (this.maxNum) {
      this.max = this.maxNum
    }

    if (this.unit) {
      this.countUnit = this.unit
    }
  }
}
</script>

<style scoped>
.count{
  margin-right: 14px;
  display: flex;
  align-items: center;
}
.add-btn{
  font-size: 20px;
  outline: none;
  border:none;
  cursor: pointer;
  background: #fff;
  display: inline-block;
  width: 28px;
  height: 30px;
  line-height: 30px;
  margin:0;
  padding:0;
  text-align: center;
  transition: all 0.1s
}
.add-btn:active{
  /* font-size: 30px; */
  opacity: 0.3;
}
.add{
  padding-top:2px;
}
.medinice-num{
  font-size: 14px;
  display: inline-block;
  padding: 0;
  margin:0;
  outline: none;
  border:none;
  background: #f4f6f9;
  width: 70px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: #041421;
  /* vertical-align: middle; */
}
.add-btn>span{
  height: 12px;
  width: 15px;
  display: inline-block;
  position: relative;
  } 

.add:before, .add:after{
  content:''; 
  height:2px; 
  width:14px; 
  display:inline-block; 
  background:#041421; 
  border-radius:9px;
  position:absolute; 
  top:6px;
  left:0px;
  -webkit-border-radius:9px;
  -moz-border-radius:9px; 
 }

.add:after{height:14px; width:2px; top:0; left:6px; }
.reduce:before, .reduce:after{
  content:''; 
  height:2px; 
  width:14px; 
  display:inline-block; 
  background:#041421; 
  border-radius:9px;
  position:absolute; 
  top:6px;
  left:0px;
  -webkit-border-radius:9px;
  -moz-border-radius:9px; 
 }
</style>
