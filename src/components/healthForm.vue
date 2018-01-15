<template>
  <div class="main">
    <div>
      <p class='head'>
        <span>晋晋</span>
        <span>女</span>
        <span>体检日期：2017-12-10</span>
      </p>
    </div>
    <!-- 健康专家指导 -->
    <div>
      <div class="table-title">健康专家指导</div>
      <div>
        <el-table
        border
        style="width: 100%"
        :data="healthDirectData">
          <el-table-column
            type="index"
            :index="indexMethod"
            label="编号"
            width="50">
          </el-table-column>
          <el-table-column
          prop="result"
          label="检查结果">
          </el-table-column>
          <el-table-column
          prop="healthDirect"
          label="健康专家指导"
          :formatter = 'rex'>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 健康专家指导 end -->
    <!-- 一般项目检查（健康小屋） -->
    <div>
      <div class="table-title">一般项目检查（健康小屋）</div>
      <div>
        <el-table
        border
        style="width: 100%"
        :data="normalTestData">
          <!-- <el-table-column
            type="index"
            :index="indexMethod"
            label="编号"
            width="50">
          </el-table-column> -->
          <el-table-column 
          prop="testItem"
          label="检查项目">
          </el-table-column>
          <el-table-column
          prop="result"
          label="结果">
          </el-table-column>
          <el-table-column
          prop="unit"
          label="单位">
          </el-table-column>
          <el-table-column
          prop="normalNum"
          label="正常参考">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 一般项目检查（健康小屋）end -->
    <!-- 双臂血压计 -->
    <div>
      <div class="table-title">双臂血压计</div>
      <div>
        <el-table
        border
        style="width: 100%"
        :data="armBloodData">
          <el-table-column 
          prop="testItem"
          label="检查项目">
          </el-table-column>
          <el-table-column 
          prop="ab"
          label="缩写">
          </el-table-column>
          <el-table-column
          prop="result"
          label="结果">
          </el-table-column>

          <el-table-column
          prop="normalNum"
          label="正常参考">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 双臂血压计 end -->
    <!-- 临床辅助检查 -->
    <div>
      <div class="table-title">临床辅助检查</div>
      <div>
        <el-table
        border
        style="width: 100%"
        :data="bedsupTestData">
          <el-table-column 
          prop="testItem"
          label="检查项目">
          </el-table-column>

          <el-table-column
          prop="result"
          label="结果">
          </el-table-column>

        </el-table>
      </div>
    </div>
    <!-- 临床辅助检查 end-->
    <!-- 生化项目 -->
    <div>
      <div class="table-title">生化项目</div>
      <div>
        <el-table
        border
        style="width: 100%"
        :data="shenghuaData">
          <el-table-column 
          prop="testItem"
          label="检查项目">
          </el-table-column>
          <el-table-column 
          prop="ab"
          label="缩写">
          </el-table-column>

          <el-table-column
          prop="result"
          label="结果">
          </el-table-column>

          <el-table-column
          prop="unit"
          label="单位">
          </el-table-column>

          <el-table-column
          prop="normalNum"
          label="正常参考">
          </el-table-column>

        </el-table>
      </div>
    </div>
    <!-- 生化项目 end -->
    <!-- 临床科室检查 -->
    <div>
      <div class="table-title">临床科室检查</div>
      <div>
        <el-table
        border
        style="width: 100%"
        :data="bedroomTsetData">
          <el-table-column 
          prop="testItem"
          label="检查项目">
          </el-table-column>
      
          <el-table-column
          prop="result"
          label="结果">
          </el-table-column>

        </el-table>
      </div>
    </div>
    <!-- 临床科室检查 end -->
    <!-- 外科 -->
    <div>
      <div class="table-title">外科</div>
      <div>
        <el-table
        border
        style="width: 100%"
        :data="outTestData">
          <el-table-column 
          prop="testItem"
          label="检查项目">
          </el-table-column>
      
          <el-table-column
          prop="result"
          label="结果">
          </el-table-column>
        </el-table>
        <div>
          <span>初步意见</span>
          <span>乳腺增生</span>
        </div>
      </div>
    </div>
    <!-- 外科 end -->
    <!-- 耳鼻喉科 -->
    <div>
      <div class="table-title">耳鼻喉科</div>
      <div>
        <el-table
        border
        style="width: 100%"
        :data="ENTData">
          <el-table-column 
          prop="testItem"
          label="检查项目">
          </el-table-column>
      
          <el-table-column
          prop="result"
          label="结果">
          </el-table-column>
        </el-table>
        <div class="suggest">
          <span>初步意见</span>
          <span>乳腺增生</span>
        </div>
      </div>
    </div>
    <!-- 耳鼻喉科 end -->
    <!-- 口腔科 -->
    <div>
      <div class="table-title">口腔科</div>
      <div>
        <el-table
        border
        style="width: 100%"
        :data="mouthTestData">
          <el-table-column 
          prop="testItem"
          label="检查项目">
          </el-table-column>
      
          <el-table-column
          prop="result"
          label="结果">
          </el-table-column>
        </el-table>
        <div class="suggest">
          <span>初步意见</span>
          <span>阻生齿</span>
        </div>
      </div>
    </div>
    <!-- 口腔科 end -->
    <!-- 尿常规 -->
    <div>
      <!-- <div>
        <span>实验室检查</span>
      </div> -->
      <div class="table-title">
        <span>尿常规</span>
      </div>
      <div>
        <el-table
        border
        style="{width: 100%}"
        :data="peeTestData">
          <el-table-column
          prop="testItem"
          label="检查项目">
          </el-table-column>

          <el-table-column
          prop="ab"
          label="缩写">
          </el-table-column>

          <el-table-column
          prop="result"
          label="结果">
          </el-table-column>

          <el-table-column
          prop="tip"
          label="提示">
          </el-table-column>

          <el-table-column
          prop="normalNum"
          label="正常参考">
          </el-table-column>

          <el-table-column
          prop="unit"
          label="单位">
          </el-table-column>

        </el-table>
      </div>
    </div>
    <!-- 尿常规 end -->
    <!-- 肺瘤筛查 -->
    <div>
      <!-- <div>
        <span>实验室检查</span>
      </div> -->
      <div class="table-title">
        <span>肺瘤筛查</span>
      </div>
      <div>
        <el-table
        border
        style="{width: 100%}"
        :data="bloodTestData">
          <el-table-column
          prop="testItem"
          label="检查项目">
          </el-table-column>

          <el-table-column
          prop="ab"
          label="缩写">
          </el-table-column>

          <el-table-column
          prop="result"
          label="结果">
          </el-table-column>

          <el-table-column
          prop="tip"
          label="提示">
          </el-table-column>

          <el-table-column
          prop="normalNum"
          label="正常参考">
          </el-table-column>

          <el-table-column
          prop="unit"
          label="单位">
          </el-table-column>

        </el-table>
      </div>
    </div>
    <!-- 肺瘤筛查 end -->
    <!-- 超声检查 -->
    <div>
      <div class="table-title">
        <span>超声检查</span>
      </div>
      <div>
        <el-table
        border
        style="{width: 100%}"
        :data="waveTestData">
          <el-table-column
          prop="testItem"
          label="检查项目">
          </el-table-column>

          <el-table-column
          prop="result"
          label="结果">
          </el-table-column>

        </el-table>
      </div>
      <div class="suggest">
        <span>初步意见</span>
        <span>乳腺增生</span>
      </div>
    </div>
    <!-- 超声检查 end -->
    <!-- X线检查 -->
    <div>
        <div class="table-title">
          <span>X线检查</span>
        </div>
        <div>
          <el-table
          border
          style="{width: 100%}"
          :data="XlineTestData">
            <el-table-column
            prop="testItem"
            label="检查项目">
            </el-table-column>

            <el-table-column
            prop="result"
            label="结果">
            </el-table-column>

          </el-table>
        </div>
        <div class="suggest">
          <span>初步意见</span>
          <span>乳腺增生</span>
        </div>
      </div>
    </div>
    <!-- X线检查 end -->
</template>

<script>
export default {
  name: 'healthForm',
  data () {
    return {
      healthDirectData: [
        {
          result: '尿白细胞阳性、尿镜检白细胞增多',
          healthDirect: '  定期B超复查，如果第一次发现甲状腺结节，应于3个月复查。'
        },
        {
          result: '甲状腺囊性结节',
          healthDirect: '1、定期复查。 2、请到医院就诊，可能需要进行中医治疗和/或乳腺钼靶检查，请遵从临床医师   意见。'
        },
        {
          result: '乳腺小叶增生（也称为乳腺囊性增生病）',
          healthDirect: '常见于泌尿生殖系统疾病，但一次异常往往无重要临床意义，建议复查中段尿，必要时专科诊治。'
        },
        {
          result: '阻生齿',
          healthDirect: ' 1、常见于第三恒磨牙（俗称智牙）及上尖牙（俗称虎牙），可部分萌出或完全不能萌出。2、当智齿反复发炎或因食物嵌塞造成邻牙龋坏时，请及时到口腔科诊治。3、保持口腔清洁，养成早晚刷牙、饭后漱口的良好卫生习惯。每半年或一年进行定期口腔检查。'
        }
      ],
      normalTestData: [
        {
          testItem: '身高',
          result: '178',
          unit: 'CM',
          normalNum: ''
        },
        {
          testItem: '体重',
          result: '178',
          unit: 'CM',
          normalNum: ''
        },
        {
          testItem: '体脂肪',
          result: '178',
          unit: 'CM',
          normalNum: ''
        },
        {
          testItem: 'BMI',
          result: '178',
          unit: 'CM',
          normalNum: ''
        },
        {
          testItem: '体温',
          result: '36',
          unit: '°C',
          normalNum: '37'
        }
      ],
      armBloodData: [
        {
          testItem: '心负荷指数',
          ab: 'P.R.P',
          result: '',
          normalNum: ''
        },
        {
          testItem: '心负荷指数',
          ab: 'P.R.P',
          result: '',
          normalNum: ''
        },
        {
          testItem: '心负荷指数',
          ab: 'P.R.P',
          result: '',
          normalNum: ''
        },
        {
          testItem: '心负荷指数',
          ab: 'P.R.P',
          result: '',
          normalNum: ''
        }
      ],
      bedsupTestData: [
        {
          testItem: '心电图',
          result: '窦性心律 正常心电图'
        }
      ],
      shenghuaData: [
        {
          testItem: '尿素',
          ab: 'URE',
          result: ' 3.0',
          unit: 'mmol/L',
          normalNum: '2.5~7.2'
        },
        {
          testItem: '高密度脂蛋白胆固醇',
          ab: 'HDL-C',
          result: ' 1.74',
          unit: 'mmol/L',
          normalNum: '0.8~1.8'
        }
      ],
      bedroomTsetData: [
        {
          testItem: '病史',
          result: '无'
        },
        {
          testItem: '家族史',
          result: '无特殊'
        }
      ],
      outTestData: [
        {
          testItem: '皮肤',
          result: '未见明显异常'
        }
      ],
      ENTData: [
        {
          testItem: '既往史',
          result: '无特殊'
        },
        {
          testItem: '外耳',
          result: '未见明显异常'
        }
      ],
      mouthTestData: [
        {
          testItem: '唇',
          result: '未见明显异常'
        },
        {
          testItem: '牙齿',
          result: '未见明显异常'
        }
      ],
      bloodTestData: [
        {
          testItem: '大血小板比率',
          ab: 'P-LCR',
          result: '28',
          tip: '',
          normalNum: '10-50',
          unit: '%'
        }
      ],
      peeTestData: [
        {
          testItem: '大血小板比率',
          ab: 'P-LCR',
          result: '28',
          tip: '',
          normalNum: '10-50',
          unit: '%'
        }
      ],
      lungbloodTestData: [
        {
          testItem: '大血小板比率',
          ab: 'P-LCR',
          result: '28',
          tip: '',
          normalNum: '10-50',
          unit: '%'
        }
      ],
      waveTestData: [
        {
          testItem: '肝',
          result: '正常'
        }
      ],
      XlineTestData: [
        {
          testItem: '肝',
          result: '正常'
        }
      ]
    }
  },
  methods: {
    indexMethod (index) {
      return index + 1
    },
    rex (row, column, cellValue) {
      // console.log(row[column.property])

      // console.log(column)
      // if (column === 2) {
      //   return column
      // }
    //   let data = row[column.property]
    //   let wang = data.split('、')
    //   let arr = []
    //   for (var i = 0; i < wang.length; i++) {
    //     let x = '<p>' + wang[i] + '</p>'
    //     arr.push(x)
    //   }
    //   console.log(arr)
    //   return arr
      return cellValue
    }
  }
}
</script>

<style scoped>
  .head span{
    padding-left: 40px;
  }
  .table-title{
    text-align: center;
    font-size: 18px;
    border: 1px solid #ebeef5;
    border-bottom: none;
    height: 50px;
    line-height: 50px;
    font-weight: 600;
  }
  .main > div{
    margin-bottom: 30px;
  }
  .suggest{
    /* text-align: center; */
    font-size: 16px;
    border: 1px solid #ebeef5;
    border-top: none;
    height: 30px;
    line-height: 30px;
    /* font-weight: 600; */
  }
</style>
