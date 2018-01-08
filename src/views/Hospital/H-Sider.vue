<template>
  <div>
    <el-menu default-active="1">
      <el-menu-item index="1">
            <span slot="title">
              <router-link :to="{ name: 'booldheigh'}" tag="div">高血压</router-link>
            </span>
      </el-menu-item>
      <el-menu-item index="2">
            <span slot="title">
              糖尿病
              <!-- <router-link :to="{ name: 'diabetes'}" tag="div">糖尿病</router-link> -->
            </span>
      </el-menu-item>
      <el-menu-item index="3">
            <span slot="title">
              其他
              <!-- <router-link :to="{ name: 'others'}" tag="div">其他</router-link> -->
            </span>
      </el-menu-item>
      <el-menu-item index="4">
            <span slot="title">
              病例库
              <!-- <router-link :to="{ name: 'cases'}" tag="div">病例库</router-link> -->
            </span>
      </el-menu-item>
      <el-menu-item index="5">
            <span slot="title">
              <!-- <router-link :to="{ name: 'diasick'}" tag="div">121</router-link> -->
            </span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'H-Sider'
}
</script>

<style>

</style>






