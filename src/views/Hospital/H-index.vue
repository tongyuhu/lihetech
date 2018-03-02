// err

<template>
    <div>
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
                    <!-- <el-footer class="footer">
                        @lihetech
                    </el-footer> -->
                </el-container>
            </el-container>
        </el-container>
    </div>
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
</style>
