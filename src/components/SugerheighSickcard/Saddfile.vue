<template>
  <div>
    <el-card>
      <div slot="header">
        添加血糖连续测量源文件
      </div>
      <div class="flex">
        <el-upload
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .flex{
    display: flex;
    justify-content: center;
    text-align: center
  }
  .center{

  }
</style>
