// err

<template>
    <div>
        <el-container>
            <el-header>
                <H-Head></H-Head>
            </el-header>
            <el-container>
                    <el-aside width="150px" class="sider">
                        <H-Sider></H-Sider>
                    </el-aside>
                <el-container>
                    <el-main>
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
        background-color: #95b4cf;
        border-bottom: 1px solid #95b4cf;
        color: #fff;
    }
    .footer{
      text-align: center;
      margin-right: 180px;
    }
    .sider{
      background-color: #1991fc;
      /* height: 100%; */
    }
</style>
