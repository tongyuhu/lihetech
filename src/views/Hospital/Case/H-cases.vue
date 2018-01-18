<template>
  <div>
      <el-card>
        <!-- 选择患病类型 start-->
        <el-row type="flex" justify="end" class="sicktype">
            <el-button type="primary">高血压</el-button>
            <el-button type="primary">糖尿病</el-button>
        </el-row>
        <!-- 选择患病类型 end-->
        <el-row >
        <!-- 筛选患者 start-->
            <div class="filter-sick">
              <el-row type="flex" align-item="flex-start">
                  <el-col :span="6">
                      <div class="sick-text">
                          <p>高血压病例汇总</p>
                      </div>
                  </el-col>  
                  <el-col :span="4">
                      <div>
                          <el-select v-model="value1" placeholder="请选择患者类型" size="mini">
                              <el-option
                              v-for="item in leixingOptions"
                              :key="item.value"
                              :value="item.value"
                              :label="item.label"
                              >
                              </el-option>
                          </el-select>
                      </div>
                  </el-col>  
                  <el-col :span="4">
                      <div>
                          <el-select v-model="value2" placeholder="并发症" size="mini">
                              <el-option
                              v-for="item in bingfazhengOptions"
                              :key="item.value"
                              :value="item.value"
                              :label="item.label"
                              >
                              </el-option>
                          </el-select>
                      </div>
                  </el-col>  
                  <el-col :span="4">
                      <div>
                          <el-select v-model="value3" placeholder="用药" size="mini">
                              <el-option
                              v-for="item in usemedicineOptions"
                              :key="item.value"
                              :value="item.value"
                              :label="item.label"
                              >
                              </el-option>
                          </el-select>
                      </div>
                  </el-col>  
                  <el-col :span="4">
                      <div>
                          <el-select v-model="value4" placeholder="症状" size="mini">
                              <el-option
                              v-for="item in zhengzhuangOptions"
                              :key="item.value"
                              :value="item.value"
                              :label="item.label"
                              >
                              </el-option>
                          </el-select>
                      </div>
                  </el-col>   
              </el-row>
            </div>
            <!-- 筛选患者 end -->
            <!-- 患者列表 start-->
            <el-row>
                <el-col :span="24">
                    <div>
                        <el-table
                        :data="casesData"
                        border
                        style="width: 100%">
                          <el-table-column
                          prop="name"
                          label="姓名">
                            <template slot-scope="scope">
                              <el-button type="text" @click="diagnose(scope.row)">
                                {{scope.row.name}}
                              </el-button>
                            </template>
                          </el-table-column>
                          <el-table-column
                          prop="newtime"
                          label="最新病例时间">
                          </el-table-column>
                          <el-table-column
                          prop="sicktype"
                          label="患者类型">
                          </el-table-column>
                          <el-table-column
                          prop="totalsick"
                          label="总病例数">
                          </el-table-column>
                          <el-table-column
                          prop="status"
                          label="病情">
                          </el-table-column>
                          <el-table-column
                          prop="action"
                          width="100px"
                          min-width="80px"
                          align="center"
                          >
                            <template slot-scope="scope">
                              <el-button size="mini" type="primary" @click="diagnose(scope.row)">查看</el-button>
                            </template>
                          </el-table-column>
                        </el-table>
                    </div>
                </el-col>
            </el-row>
            <!-- 患者列表 end-->
        </el-row>
      </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      leixingOptions: [
        {
          value: '1',
          label: '原发性高血压'
        },
        {
          value: '2',
          label: '收缩期高血压'
        },
        {
          value: '3',
          label: '舒张期高血压'
        }
      ],
      bingfazhengOptions: [
        {
          value: '4',
          label: '头疼'
        },
        {
          value: '5',
          label: '疼'
        }
      ],
      usemedicineOptions: [],
      zhengzhuangOptions: [],
      casesData: [
        {
          name: '公共',
          newtime: '2017/12/01 11:32',
          sicktype: 'I型糖尿病',
          totalsick: '5',
          status: '恶化'
        },
        {
          name: '公共',
          newtime: '2017/12/01 11:32',
          sicktype: 'I型糖尿病',
          totalsick: '5',
          status: '恶化'
        },
        {
          name: '公共',
          newtime: '2017/12/01 11:32',
          sicktype: 'I型糖尿病',
          totalsick: '5',
          status: '恶化'
        },
        {
          name: '公共',
          newtime: '2017/12/01 11:32',
          sicktype: 'I型糖尿病',
          totalsick: '5',
          status: '恶化'
        },
        {
          name: '公共',
          newtime: '2017/12/01 11:32',
          sicktype: 'I型糖尿病',
          totalsick: '5',
          status: '恶化'
        },
        {
          name: '公共',
          newtime: '2017/12/01 11:32',
          sicktype: 'I型糖尿病',
          totalsick: '5',
          status: '恶化'
        }
      ],
      value1: '',
      value2: '',
      value3: '',
      value4: ''
    }
  },
  methods: {
    diagnose (row) {
      console.log(row.name)
    },
    care (row) {
      console.log(row.care)
    },
    call (row) {
      console.log(row.id)
    }
  }
}
</script>

<style scoped>
  .sicktype{
    margin-bottom: 20px;
  }
  .sick-text p{
    margin: 0;
  }
  .filter-sick{
    margin-bottom: 20px;
  }
  .table-col{
    cursor: pointer;
    color:rgb(29, 52, 155);
  }
  .table-col-label{
    cursor: none;
    color: rgb(13, 13, 14);
  }
</style>










