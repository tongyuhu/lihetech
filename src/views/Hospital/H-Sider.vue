<template>
  <div>
    <el-menu 
    class="menu"
    default-active="1" 
    background-color="#1991fc"
    text-color="#fff"
    active-text-color="#ffd04b"
    >
      <el-menu-item index="1">
            <span slot="title">
              <router-link :to="{ name: 'booldheigh'}" tag="div">高血压</router-link>
            </span>
      </el-menu-item>
      <el-menu-item index="2">
            <span slot="title">
              <router-link :to="{ name: 'sugerheigh'}" tag="div">糖尿病</router-link>
            </span>
      </el-menu-item>
      <el-menu-item index="3">
            <span slot="title">
              <router-link :to="{ name: 'other'}" tag="div">其他</router-link>
            </span>
      </el-menu-item>
      <el-menu-item index="4">
            <span slot="title">
              <router-link :to="{ name: 'cases'}" tag="div">病例库</router-link>
            </span>
      </el-menu-item>
      <!-- <el-menu-item index="5">
            <span slot="title">
              <router-link :to="{ name: 'bloodheighSick'}" tag="div">高血压病人病历</router-link>
            </span>
      </el-menu-item>
      <el-menu-item index="6">
            <span slot="title">
              <router-link :to="{ name: 'sugerheighSick'}" tag="div">糖尿病病人病历</router-link>
            </span>
      </el-menu-item>
      <el-menu-item index="6">
            <span slot="title">
              <router-link :to="{ name: 'addDoctor'}" tag="div">addDoctor</router-link>
            </span>
      </el-menu-item>
      <el-menu-item index="6">
            <span slot="title">
              <router-link :to="{ name: 'healthForm'}" tag="div">healthForm</router-link>
            </span>
      </el-menu-item>
      <el-menu-item index="6">
            <span slot="title">
              <router-link :to="{ name: 'accountSetting'}" tag="div">accountSetting</router-link>
            </span>
      </el-menu-item>
      <el-menu-item index="6">
            <span slot="title">
              <router-link :to="{ name: 'cardtest'}" tag="div">cardtest</router-link>
            </span>
      </el-menu-item> -->
      <el-menu-item index="8">
            <span slot="title">
              <router-link :to="{ name: 'medicine'}" tag="div">medicine</router-link>
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

<style scoped>
  .siader{
    background-color: #1991fc;
  }
  .menu{
    border: none;
  }
</style>






