<template>
  <div class="container">
    <div class="container-head">
      <H-Head></H-Head>
    </div>
    <div class="container-sider">
      <H-Sider></H-Sider>
    </div>
    <div class="container-main">
      <router-view></router-view>
    </div>
  </div>

    <!-- <div>
        <el-container >
            <el-header style="height: 80px;" class="header">
                <H-Head></H-Head>
            </el-header>
            <el-container>
                    <el-aside width="250px" class="sider">
                        <H-Sider></H-Sider>
                    </el-aside>
                <el-container>
                    <el-main class="main">
                        <router-view></router-view>
                    </el-main>
                    <el-footer class="footer">
                        @lihetech
                    </el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div> -->
</template>
<script>
    import HHead from './../Hospital/H-Head.vue'
    import HSider from './../Hospital/H-Sider.vue'
    export default {
      name: 'H-index',
      components: {
        HHead,
        HSider
      },
      methods: {
      },
      computed: {
      }
    }
</script>

<style scoped>
    .el-header {
        background-color: #fff;
        /* border-bottom: 1px solid #95b4cf; */
        box-shadow: 0px 4px 4px 0 rgba(66, 53, 53, 0.103);
        padding: 0px;
    }
    .footer{
      text-align: center;
      margin-right: 180px;
    }
    .sider{
      background-color: #1991fc;
      font-size: 16px;
      color: #fff;
      
    }
    main{
      padding: 24px;
      background-color: #f4f6f9;
      /* position: fixed;
      top:80px;
      left: 250px; */
    }
    .header{
      /* position: absolute; */
      /* position: fixed; */
      /* top:0; */
    }
  .container{
    margin: 0;
    padding: 0;
    position: relative;
  }
  .container-head{
    height: 80px;
    width: 100%;
    box-shadow: 0px 4px 4px 0 rgba(66, 53, 53, 0.103);
    /* background-color: cadetblue; */
    /* position: fixed; */
    /* top:0; */
  }
  .container-sider{
    height: 100%;
    background-color: #1991fc;
    width: 250px;
    position: fixed;
    top:0px;
    z-index: 999;
  }
  .container-main{
    /* height: 2800px; */
    /* width: 100%; */
    /* background-color: rgb(157, 170, 230); */
    /* margin-top: 80px; */
    /* padding-left: 250px; */
    /* margin-right: 500px; */
    margin-left: 250px;
    padding: 24px;
    background-color: #f4f6f9;
    /* position: relative; */
    /* left: 250px; */
    /* top:80px; */
    /* right: 0px; */
    /* margin-right: -250px; */
  }
</style>
