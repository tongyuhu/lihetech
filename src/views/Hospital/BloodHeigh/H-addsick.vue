<template>
  <div>
      <el-row type="flex" justify="space-between">
          <el-col :span="8">
              <p>{{ hospital }}</p>
              <el-button size="small" type="primary">添加病人</el-button>
          </el-col>
          <el-col :span="16">
            <div class='add-sick-right'>
              <p>2017-12-8</p>
              <p>诊所位于{{ hospitalAddress }},{{ hospitalDoctor }}名医生,{{hospitalNana}}名护士</p>
            </div>
          </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  name: 'H-addsick',
  data () {
    return {
      hospital: '张江高科诊所',
      date: '2017-12-8',
      hospitalAddress: '诊所位于祖冲之路887弄72-73号',
      hospitalDoctor: '4',
      hospitalNana: 3
    }
  }
}
</script>

<style scoped>
  .add-sick-right{
    text-align: right;
  }
</style>
