<template>
  <button
  :class="{'stutas-btn':!defaultChecked,'stutas-btn-active':defaultChecked}" 
  :style="{width:width+'px',height:height+'px'}"
  @click="stutasHandle()"
  >
  <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    isChecked: {
      type: Boolean
    }
  },
  data () {
    return {
      defaultChecked: this.isChecked
    }
  },
  methods: {
    stutasHandle () {
      this.defaultChecked = !this.defaultChecked
      this.$emit('checked')
    }
  },
  watch: {
    isChecked (val) {
      this.defaultChecked = val
    }
  },
  mounted () {
    this.defaultChecked = this.isChecked
  }
}
</script>

<style scoped>
button{
  padding: 0;
  vertical-align: baseline;
}
.stutas-btn{
  border: 1px solid #eaeaea;
  border-radius: 2px;
  background-color: #fff;
  outline: none;
  color: #666;
  text-align: center;
  vertical-align: middle;
  font-size: 14px;
  cursor: pointer;
  padding-bottom: 1px;
}
.stutas-btn-active{
  border: 1px solid #1991fc;
  border-radius: 2px;
  background-color: #1991fc;
  outline: none;
  color: #fff;
  text-align: center;
  vertical-align: middle;
  font-size: 14px;
  cursor: pointer;
  padding-bottom: 1px;
}
</style>
