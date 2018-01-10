<template>
  <div>
    <el-card>
      <div slot="header">
        <span>心血管评估</span>
      </div>
      <el-row>
        <!-- 基础项 -->
        <el-col :xs="24" :lg="12">
          <el-card>
            <div slot="header">
              基础项                
            </div>
            <el-form ref="form" :model="risk" :label-position="risk.labelPosition" label-width="180px" size="mini">
              <el-form-item label="性别">
                <el-radio-group v-model="risk.sex">
                  <el-radio border label="男" ></el-radio>
                  <el-radio border label="女"></el-radio>
                </el-radio-group> 
              </el-form-item> 
              <el-form-item label="年龄">
                <el-input v-model="risk.age" size="small"></el-input>
              </el-form-item>
              <el-form-item label="总胆固醇">
                <el-input v-model="risk.zongdanguchun" size="small"></el-input>
              </el-form-item>
              <el-form-item label="高密度胆固醇">
                <el-input v-model="risk.danguchun" size="small"></el-input>
              </el-form-item>
              <el-form-item label="血压(收缩压)">
                <el-input v-model="risk.xueya" size="small"></el-input>
              </el-form-item>
              <el-form-item label="服用降压药">
                <el-radio-group v-model="risk.usemedicine">
                  <el-radio border  label="有"></el-radio>
                  <el-radio border  label="没有"></el-radio>
                </el-radio-group> 
              </el-form-item>
              <el-form-item label="服用降压药">
                <el-radio-group v-model="risk.smoke">
                  <el-radio border  label="有"></el-radio>
                  <el-radio border  label="没有"></el-radio>
                </el-radio-group> 
              </el-form-item>
              <el-form-item label="服用降压药">
                <el-radio-group v-model="risk.sugerheigh">
                  <el-radio border  label="有"></el-radio>
                  <el-radio border  label="没有"></el-radio>
                </el-radio-group> 
              </el-form-item>
            </el-form>
            <el-row>
              <el-col :span="12">
                <p>心血管疾病风险评估</p>
                <p>（未来10年风险）</p>
              </el-col>
              <el-col :span="12">
                <p>0.38%</p>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <!-- 基础项 end -->
        <!-- 双臂血压计KSG图 -->
        <el-card>
          <div slot="header">
            双臂血压计KSG图
          </div>
          <el-table
          :data="KSG"
          border
          style="width:100%">
            <el-table-column
            prop="KSGname"
            label="名称">
            </el-table-column>
            <el-table-column
            prop="tiane"
            label="天鹅型">
            </el-table-column>
            <el-table-column
            prop="pingtan"
            label="平坦型">
            </el-table-column>
            <el-table-column
            prop="shuangfeng"
            label="双峰型">
            </el-table-column>
            <el-table-column
            prop="buzheng"
            label="不整型">
            </el-table-column>
            <el-table-column
            prop="quexue"
            label="缺血型">
            </el-table-column>
          </el-table>
          <div>
            您当前血压KSG图：双峰型
          </div>
          <div>
            病情预估：心脏疾病  、 年轻型高血压    、肾性高血压   、本态性        高血压
          </div>  
        </el-card>
        <!-- 双臂血压计KSG图 end -->
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'risk',
  data () {
    return {
      risk: {
        labelPosition: 'left',
        sex: '',
        age: '',
        zongdanguchun: '',
        danguchun: '',
        xueya: '',
        usemedicine: '',
        smoke: '',
        sugerheigh: ''
      },
      KSG: [
        {
          KSGname: '图形',
          tiane: '三角',
          pingtan: '0',
          shuangfeng: '1',
          buzheng: '3',
          quexue: '4'
        },
        {
          KSGname: '实际图形',
          tiane: '三角',
          pingtan: '0',
          shuangfeng: '1',
          buzheng: '3',
          quexue: '4'
        },
        {
          KSGname: '症状',
          tiane: '正常 非动脉硬化型高血压',
          pingtan: '老人 肥胖 动脉硬化 缺血 测量时肢下垂',
          shuangfeng: '心脏疾病 年轻型高血压 肾性高血压 本态性高血压',
          buzheng: '心脏疾病 测量时说话 体动',
          quexue: '贫血 低血压 受打击的精神状态 自律神经失调 肥胖 血栓闭塞性脉管炎'
        }
      ]
    }
  }
}
</script>

<style scoped>
  .text-center{
    text-align: center;
  }
</style>
