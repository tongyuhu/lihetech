<template>
  <div class="inline">
    <div class="food">
      <button :class="{'checked':ischecked}" @click="checked">{{food}}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addfood',
  props: {
    food: {
      type: [String],
      default: ''
    },
    index: {
      type: [Number],
      default: 1
    },
    defaultChecked: {
      type: [Boolean],
      default: false
    }
  },
  data () {
    return {
      ischecked: false
    }
  },
  methods: {
    checked () {
      this.ischecked = !this.ischecked
      // if (this.ischecked) {
      this.$emit('addfood', {food: this.food, add: this.ischecked})
      // }
    }
  },
  mounted () {
    this.ischecked = this.defaultChecked
  }
}
</script>

<style scoped>
  .inline{
    display: inline-block;
    /* align-items: center;
    justify-content:center;
    flex-wrap: wrap */
  }
  .food{
    margin-bottom: 15px;
    margin-right:5px; 
    margin-left:5px; 
    display: inline-block;
  }
  button{
    border:1px solid #eaeaea;
    background-color: #f4f6f9;
    color:#666;
    outline: none;
    /* width: 120px; */
    /* height: 28px; */
    /* line-height: 28px; */
    font-size: 14px;
    text-align: center;
    vertical-align: middle;
    display: inline-block;
    margin:0;
    padding:7px;
    cursor: pointer;
    border-radius: 4px;
  }
  /* button:active{
    border:1px solid #1991fc;
    background-color: #1991fc;
    color:#fff;
  } */
  .checked{
    border:1px solid #1991fc;
    background-color: #1991fc;
    color:#fff;
  }
</style>

