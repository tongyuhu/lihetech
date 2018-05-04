<template>
  <i :class="icon"></i>
</template>

<script>
export default {
  props: ['icon'],
  data () {
    return {
    }
  }
}
</script>

<style scoped>
/* 高血压 */
  .heigh-blood-close{
    position: relative;
    /* font-size: 0; */
    /* display: inline-block; */
  }
  .heigh-blood-close::before{
    /* display: inline-block; */
    top: 0px;
    left: -36px;
    position: absolute;
    content: '';
    width: 23px;;
    height: 28px;
    background: url('~icon/hospital-icon-11.png') no-repeat;
  }
  .heigh-blood-open{
    /* font-size: 0; */
    position: relative;
  }
  .heigh-blood-open::before{
    top: 0px;
    left: -36px;
    position: absolute;
    content: '';
    width: 23px;;
    height: 28px;
    background: url('~icon/hospital-icon-12.png') no-repeat;
  }
/* 糖尿病 */
  .heigh-suger-close{
    /* font-size: 0; */
    position: relative;
  }
  .heigh-suger-close::before{
    top: 0px;
    left: -36px;
    position: absolute;
    content: '';
    width: 23px;;
    height: 28px;
    background: url('~icon/hospital-icon-13.png') no-repeat;
  }
  .heigh-suger-open{
    /* font-size: 0; */
    position: relative;
  }
  .heigh-suger-open::before{
    top: 0px;
    left: -36px;
    position: absolute;
    content: '';
    width: 23px;;
    height: 28px;
    background: url('~icon/hospital-icon-02.png') no-repeat;
  }
/* 其他 */
  .other-close{
    /* font-size: 0; */
    position: relative;
  }
  .other-close::before{
    top: 0px;
    left: -36px;
    position: absolute;
    content: '';
    width: 23px;;
    height: 28px;
    background: url('~icon/hospital-icon-14.png') no-repeat;
  }
  .other-open{
    /* font-size: 0; */
    position: relative;
  }
  .other-open::before{
    top: 0px;
    left: -36px;
    position: absolute;
    content: '';
    width: 23px;;
    height: 28px;
    background: url('~icon/hospital-icon-03.png') no-repeat;
  }
/* 病例库 */
  .cases-close{
    /* font-size: 0; */
    position: relative;
  }
  .cases-close::before{
    top: 0px;
    left: -36px;
    position: absolute;
    content: '';
    width: 23px;;
    height: 28px;
    background: url('~icon/hospital-icon-15.png') no-repeat;
  }
  .cases-open{
    /* font-size: 0; */
    position: relative;
  }
  .cases-open::before{
    top: 0px;
    left: -36px;
    position: absolute;
    content: '';
    width: 23px;;
    height: 28px;
    background: url('~icon/hospital-icon-04.png') no-repeat;
  }
/* 人员管理 */
  .admin-close{
    /* font-size: 0; */
    position: relative;
  }
  .admin-close::before{
    top: 0px;
    left: -36px;
    position: absolute;
    content: '';
    width: 23px;;
    height: 28px;
    background: url('~icon/hospital-icon-16.png') no-repeat;
  }
  .admin-open{
    /* font-size: 0; */
    position: relative;
  }
  .admin-open::before{
    top: 0px;
    left: -36px;
    position: absolute;
    content: '';
    width: 23px;;
    height: 28px;
    background: url('~icon/hospital-icon-05.png') no-repeat;
  }
/* 我的消息 */
  .message-close{
    /* font-size: 0; */
    position: relative;
  }
  .message-close::before{
    top: 0px;
    left: -36px;
    position: absolute;
    content: '';
    width: 23px;;
    height: 28px;
    background: url('~icon/hospital-icon-17.png') no-repeat;
  }
  .message-open{
    /* font-size: 0; */
    position: relative;
  }
  .message-open::before{
    top: 0px;
    left: -36px;
    position: absolute;
    content: '';
    width: 23px;;
    height: 28px;
    background: url('~icon/hospital-icon-06.png') no-repeat;
  }

  .menu-close{
    position: relative;
  }
  .menu-close::before{
    top: 0px;
    right: -20px;;
    position: absolute;
    content: '';
    width: 9px;;
    height: 17px;
    background: url('~icon/hospital-icon-07.png') no-repeat;
  }
  .menu-open{
    /* font-size: 0; */
    position: relative;
    display: inline-block;
  }
  .menu-open::before{
    top: -10px;
    right: -20px;;
    display: inline-block;
    position: absolute;
    content: '';
    width: 17px;;
    height: 9px;
    background: url('~icon/hospital-icon-08.png') no-repeat;
  }
</style>

