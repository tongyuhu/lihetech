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
    font-size: 0;
  }
  .heigh-blood-close::before{
    top: 0px;
    left: -36px;
    position: absolute;
    content: '';
    width: 23px;;
    height: 28px;
    background: url('./../../hospitalImage/hospitalIcon/诊所-icon-11.png') no-repeat;
  }
  .heigh-blood-open{
    font-size: 0;
    position: relative;
  }
  .heigh-blood-open::before{
    top: 0px;
    left: -36px;
    position: absolute;
    content: '';
    width: 23px;;
    height: 28px;
    background: url('./../../hospitalImage/hospitalIcon/诊所-icon-12.png') no-repeat;
  }
/* 糖尿病 */
  .heigh-suger-close{
    font-size: 0;
    position: relative;
  }
  .heigh-suger-close::before{
    top: 0px;
    left: -36px;
    position: absolute;
    content: '';
    width: 23px;;
    height: 28px;
    background: url('./../../hospitalImage/hospitalIcon/诊所-icon-13.png') no-repeat;
  }
  .heigh-suger-open{
    font-size: 0;
    position: relative;
  }
  .heigh-suger-open::before{
    top: 0px;
    left: -36px;
    position: absolute;
    content: '';
    width: 23px;;
    height: 28px;
    background: url('./../../hospitalImage/hospitalIcon/诊所-icon-02.png') no-repeat;
  }
/* 其他 */
  .other-close{
    font-size: 0;
    position: relative;
  }
  .other-close::before{
    top: 0px;
    left: -36px;
    position: absolute;
    content: '';
    width: 23px;;
    height: 28px;
    background: url('./../../hospitalImage/hospitalIcon/诊所-icon-14.png') no-repeat;
  }
  .other-open{
    font-size: 0;
    position: relative;
  }
  .other-open::before{
    top: 0px;
    left: -36px;
    position: absolute;
    content: '';
    width: 23px;;
    height: 28px;
    background: url('./../../hospitalImage/hospitalIcon/诊所-icon-03.png') no-repeat;
  }
/* 病例库 */
  .cases-close{
    font-size: 0;
    position: relative;
  }
  .cases-close::before{
    top: 0px;
    left: -36px;
    position: absolute;
    content: '';
    width: 23px;;
    height: 28px;
    background: url('./../../hospitalImage/hospitalIcon/诊所-icon-15.png') no-repeat;
  }
  .cases-open{
    font-size: 0;
    position: relative;
  }
  .cases-open::before{
    top: 0px;
    left: -36px;
    position: absolute;
    content: '';
    width: 23px;;
    height: 28px;
    background: url('./../../hospitalImage/hospitalIcon/诊所-icon-04.png') no-repeat;
  }
/* 人员管理 */
  .admin-close{
    font-size: 0;
    position: relative;
  }
  .admin-close::before{
    top: 0px;
    left: -36px;
    position: absolute;
    content: '';
    width: 23px;;
    height: 28px;
    background: url('./../../hospitalImage/hospitalIcon/诊所-icon-16.png') no-repeat;
  }
  .admin-open{
    font-size: 0;
    position: relative;
  }
  .admin-open::before{
    top: 0px;
    left: -36px;
    position: absolute;
    content: '';
    width: 23px;;
    height: 28px;
    background: url('./../../hospitalImage/hospitalIcon/诊所-icon-05.png') no-repeat;
  }
  /* 我的消息 */
  .message-close{
    font-size: 0;
    position: relative;
  }
  .message-close::before{
    top: 0px;
    left: -36px;
    position: absolute;
    content: '';
    width: 23px;;
    height: 28px;
    background: url('./../../hospitalImage/hospitalIcon/诊所-icon-17.png') no-repeat;
  }
  .message-open{
    font-size: 0;
    position: relative;
  }
  .message-open::before{
    top: 0px;
    left: -36px;
    position: absolute;
    content: '';
    width: 23px;;
    height: 28px;
    background: url('./../../hospitalImage/hospitalIcon/诊所-icon-06.png') no-repeat;
  }
</style>
