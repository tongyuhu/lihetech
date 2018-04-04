<template>
  <div class="inline">
    <div v-for="(i,index) in arr" :key="index" class="food">
      <button :class="{'checked':false}">减少钠盐</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      arr: [
        {}, {}, {}, {}, {}
      ]
    }
  },
  methods: {
    checked (index) {

    },
    init () {

    }
  }
}
</script>

<style scoped>
  .inline{
    display: flex;
    align-items: center;
    justify-content:center;
    flex-wrap: wrap
  }
  .food{
    margin-bottom: 15px;
    margin-right:5px; 
    margin-left:5px; 
  }
  button{
    border:1px solid #eaeaea;
    background-color: #fff;
    color:#666;
    outline: none;
    width: 150px;
    height: 28px;
    font-size: 14px;
    text-align: center;
    line-height: 24px;
    vertical-align: middle;
    display: inline-block;
    margin:0;
    padding:0;
    cursor: pointer;
    border-radius: 2px;
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

