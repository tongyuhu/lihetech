<template>
  <div :class="{'has-videomessage-animation':hasVideoMsg,'connect-btn':true}">
    <div class="tip">xxx来电</div>
    <div class="btn-wrap">
      <div>
        <button class="ok" @click="connect">接通</button>
      </div>
      <div>
        <button class="no" @click="reject">拒绝</button>
      </div>

    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'connectbtn',
  data () {
    return {

    }
  },
  computed: {
    ...mapState([
      'hasVideoMsg'
    ])
  },
  methods: {
    ...mapMutations([
      'closeVideoMsg',
      'getVideoMsg'
    ]),
    connect () {
      this.$emit('connect')
    },
    reject () {
      this.$emit('reject')
    }
  },
  mounted () {
    // this.getVideoMsg()
  }
}
</script>

<style lang="scss" scoped>
.connect-btn{
  z-index: 9999999999;
    width: 200px;
    height: 110px;
    background: #fff;
    position: fixed;
    bottom:50px;
    left: 50%;
    border-radius: 90px;
    box-shadow: 0 0 18px 0px rgba(0, 0, 0, 0.3);
}
.tip{
  text-align: center;
  height: 30px;
  line-height: 30px;
}
.btn-wrap{
  text-align: center;
  display: flex;
  justify-content: space-around;
  button{
    border: none;
    outline: none;
    color: #fff;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
  }
  .ok{
    background: #1991fc;
  }
  .no{
    background: #e87070;
  }
}

.has-videomessage-animation{
    animation: hasvideomsg 1.2s infinite;
    /* -webkit-animation:hasmsg .5s infinite; */
    /* // padding-bottom:100px; */
  }
  @keyframes hasvideomsg {
    to {transform:none;}50%{transform:scale(1.1)}
  }
</style>

