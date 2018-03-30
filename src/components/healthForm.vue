<template>
  <div class="health-form">
    <div>
      <el-card :body-style="{ padding: '0px' }">
        <p class='head'>
          <span>晋晋</span>
          <span>女</span>
          <span>体检日期：2017-12-10</span>
        </p>
      </el-card>
    </div>
    <!-- 健康专家指导 -->
    <div>
      <div class="table-title">健康专家指导</div>
      <div>
        <el-card :body-style="{ padding: '16px 16px 30px 16px'}">
          <div class="card-head">
            <span class="icon-heart"></span>
            <span class="card-head-title">心电图</span>
          </div>
          <el-table
          style="width: 100%"
          border
          :data="healthDirectData"
          :header-row-class-name="tableRowClassName"
          :header-cell-class-name="cellClassName">
            <el-table-column
              type="index"
              :index="indexMethod"
              label="编号"
              width="50"
              align="center"
              label-class-name="tableTitle"
              class-name="table-col">
            </el-table-column>
            <el-table-column
            prop="result"
            label="检查结果"
            align="center">
            </el-table-column>
            <el-table-column
            prop="healthDirect"
            label="健康专家指导"
            align="center"
            :formatter = 'rex'>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </div>
    <!-- 健康专家指导 end -->
    <!-- 一般项目检查（健康小屋） -->
    <div>
      <div class="table-title">一般项目检查（健康小屋）</div>
      <div>
        <el-card>
          <el-table
          border
          style="width: 100%"
          :data="normalTestData"
          :header-row-class-name="tableRowClassName"
          :header-cell-class-name="cellClassName">
            <!-- <el-table-column
              type="index"
              :index="indexMethod"
              label="编号"
              width="50">
            </el-table-column> -->
            <el-table-column
            align="center" 
            prop="testItem"
            label="检查项目">
            </el-table-column>
            <el-table-column
            align="center"
            prop="result"
            label="结果">
            </el-table-column>
            <el-table-column
            align="center"
            prop="unit"
            label="单位">
            </el-table-column>
            <el-table-column
            align="center"
            prop="normalNum"
            label="正常参考">
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </div>
    <!-- 一般项目检查（健康小屋）end -->
    <!-- 双臂血压计 -->
    <div>
      <div class="table-title">双臂血压计</div>
      <div>
        <el-card :body-style="{ padding: '16px 16px 30px 16px'  }">
          <div class="card-head">
            <span class="icon-heart"></span>
            <span class="card-head-title">双臂血压计</span>
          </div>
          <el-table
          border
          style="width: 100%"
          :data="armBloodData"
          :header-row-class-name="tableRowClassName"
          :header-cell-class-name="cellClassName">
            <el-table-column 
            align="center"
            prop="testItem"
            label="检查项目">
            </el-table-column>
            <el-table-column 
            align="center"
            prop="ab"
            label="缩写">
            </el-table-column>
            <el-table-column
            align="center"
            prop="result"
            label="结果">
            </el-table-column>

            <el-table-column
            align="center"
            prop="normalNum"
            label="正常参考">
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </div>
    <!-- 双臂血压计 end -->
    <!-- 临床辅助检查 -->
    <div>
      <div class="table-title">临床辅助检查</div>
      <div>
        <el-card :body-style="{ padding: '16px 16px 30px 16px'  }">
          <el-table
          border
          style="width: 100%"
          :data="bedsupTestData"
          :header-row-class-name="tableRowClassName"
          :header-cell-class-name="cellClassName">
            <el-table-column 
            align="center"
            prop="testItem"
            label="检查项目">
            </el-table-column>

            <el-table-column
            align="center"
            prop="result"
            label="结果">
            </el-table-column>

          </el-table>
        </el-card>
      </div>
    </div>
    <!-- 临床辅助检查 end-->
    <!-- 生化项目 -->
    <div>
      <div class="table-title">生化项目</div>
      <div>
        <el-card :body-style="{ padding: '16px 16px 30px 16px'  }">
          <el-table
          border
          style="width: 100%"
          :data="shenghuaData"
          :header-row-class-name="tableRowClassName"
          :header-cell-class-name="cellClassName">
            <el-table-column 
            align="center"
            prop="testItem"
            label="检查项目">
            </el-table-column>
            <el-table-column
            align="center" 
            prop="ab"
            label="缩写">
            </el-table-column>

            <el-table-column
            align="center"
            prop="result"
            label="结果">
            </el-table-column>

            <el-table-column
            align="center"
            prop="unit"
            label="单位">
            </el-table-column>

            <el-table-column
            align="center"
            prop="normalNum"
            label="正常参考">
            </el-table-column>

          </el-table>
        </el-card>
      </div>
    </div>
    <!-- 生化项目 end -->
    <!-- 临床科室检查 -->
    <div>
      <div class="table-title">临床科室检查</div>
      <el-row :gutter="8">
        <!-- 内科 -->
        <el-col :span="12">
          <div class="card-bottom">
            <el-card :body-style="{ padding: '16px 16px 30px 16px'  }">
              <div class="card-head">
                <span class="icon-heart"></span>
                <span class="card-head-title">内科</span>
              </div>
              <el-table
              border
              style="width: 100%"
              :data="bedroomTsetData"
              :header-row-class-name="tableRowClassName"
              :header-cell-class-name="cellClassName">
                <el-table-column 
                align="center"
                prop="testItem"
                label="检查项目">
                </el-table-column>
            
                <el-table-column
                prop="result"
                label="结果">
                </el-table-column>

              </el-table>
            </el-card>
          </div>
        </el-col>
        <!-- 内科 end-->
        <el-col :span="12">

          <!-- 外科 -->
          <div class="card-bottom">
            <el-card :body-style="{ padding: '16px 16px 30px 16px'}">
              <div class="card-head">
                <span class="icon-heart"></span>
                <span class="card-head-title">外科</span>
              </div>
              <el-table
              border
              style="width: 100%"
              :data="outTestData"
              :header-row-class-name="tableRowClassName"
              :header-cell-class-name="cellClassName">
                <el-table-column 
                align="center"
                prop="testItem"
                label="检查项目">
                </el-table-column>
            
                <el-table-column
                prop="result"
                label="结果">
                </el-table-column>
              </el-table>
            </el-card>
            
          </div>
          <!-- 外科 end -->
        </el-col>
      </el-row>
    </div>
    <!-- 临床科室检查 end -->
    <el-row :gutter="8">
      <el-col :span="12">
        <!-- 耳鼻喉科 -->
        <el-card :body-style="{ padding: '16px 16px 30px 16px'}">
          <div class="card-head">
            <span class="icon-heart"></span>
            <span class="card-head-title">耳鼻喉科</span>
          </div>
          <el-table
          border
          style="width: 100%"
          :data="ENTData"
          :header-row-class-name="tableRowClassName"
          :header-cell-class-name="cellClassName">
            <el-table-column 
            align="center"
            prop="testItem"
            label="检查项目">
            </el-table-column>
        
            <el-table-column
            align="center"
            prop="result"
            label="结果">
            </el-table-column>
          </el-table>
        </el-card>
        <!-- 耳鼻喉科 end -->
      </el-col>
      <el-col :span="12">
        <!-- 口腔科 -->
        <el-card :body-style="{ padding: '16px 16px 30px 16px'}">
          <div class="card-head">
            <span class="icon-heart"></span>
            <span class="card-head-title">口腔科</span>
          </div>
          <el-table
          border
          style="width: 100%"
          :data="mouthTestData"
          :header-row-class-name="tableRowClassName"
          :header-cell-class-name="cellClassName">
            <el-table-column 
            align="center"
            prop="testItem"
            label="检查项目">
            </el-table-column>
        
            <el-table-column
            align="center"
            prop="result"
            label="结果">
            </el-table-column>
          </el-table>
        </el-card>
        <!-- 口腔科 end -->
      </el-col>
    </el-row>
    <!-- 血常规 -->
    <div class="card-bottom">
      <div class="table-title">实验室检查</div>
      <div>
        <el-card :body-style="{ padding: '16px 16px 30px 16px'}">
          <div class="card-head">
            <span class="icon-heart"></span>
            <span class="card-head-title">血常规</span>
          </div>
          <el-table
          border
          style="{width: 100%}"
          :data="peeTestData"
          :header-row-class-name="tableRowClassName"
          :header-cell-class-name="cellClassName">
            <el-table-column
            align="center"
            prop="testItem"
            label="检查项目">
            </el-table-column>

            <el-table-column
            align="center"
            prop="ab"
            label="缩写">
            </el-table-column>

            <el-table-column
            align="center"
            prop="result"
            label="结果">
            </el-table-column>

            <el-table-column
            align="center"
            prop="tip"
            label="提示">
            </el-table-column>

            <el-table-column
            align="center"
            prop="normalNum"
            label="正常参考">
            </el-table-column>

            <el-table-column
            align="center"
            prop="unit"
            label="单位">
            </el-table-column>

          </el-table>
        </el-card>
      </div>
    </div>
    <!-- 血常规 end -->
    <!-- 尿常规 -->
    <div class="card-bottom">
      <el-card :body-style="{ padding: '16px 16px 30px 16px'}">
        <div class="card-head">
          <span class="icon-heart"></span>
          <span class="card-head-title">尿常规</span>
        </div>
        <el-table
        border
        style="{width: 100%}"
        :data="peeTestData"
        :header-row-class-name="tableRowClassName"
        :header-cell-class-name="cellClassName">
          <el-table-column
          align="center"
          prop="testItem"
          label="检查项目">
          </el-table-column>

          <el-table-column
          align="center"
          prop="ab"
          label="缩写">
          </el-table-column>

          <el-table-column
          align="center"
          prop="result"
          label="结果">
          </el-table-column>

          <el-table-column
          align="center"
          prop="tip"
          label="提示">
          </el-table-column>

          <el-table-column
          align="center"
          prop="normalNum"
          label="正常参考">
          </el-table-column>

          <el-table-column
          align="center"
          prop="unit"
          label="单位">
          </el-table-column>

        </el-table>
      </el-card>
    </div>
    <!-- 尿常规 end -->
    <!-- 肺瘤筛查 -->
    <div>
      <el-card :body-style="{ padding: '16px 16px 30px 16px'}">
        <div class="card-head">
          <span class="icon-heart"></span>
          <span class="card-head-title">肺瘤筛查</span>
        </div>
        <el-table
        border
        style="{width: 100%}"
        :data="bloodTestData"
        :header-row-class-name="tableRowClassName"
        :header-cell-class-name="cellClassName">
          <el-table-column
          align="center"
          prop="testItem"
          label="检查项目">
          </el-table-column>

          <el-table-column
          align="center"
          prop="ab"
          label="缩写">
          </el-table-column>

          <el-table-column
          align="center"
          prop="result"
          label="结果">
          </el-table-column>

          <el-table-column
          align="center"
          prop="tip"
          label="提示">
          </el-table-column>

          <el-table-column
          align="center"
          prop="normalNum"
          label="正常参考">
          </el-table-column>

          <el-table-column
          align="center"
          prop="unit"
          label="单位">
          </el-table-column>

        </el-table>
      </el-card>
    </div>
    <!-- 肺瘤筛查 end -->
    <!-- 超声检查 -->
    <div>
      <div class="table-title">
        <span>临床辅助检查</span>
      </div>
      <!-- 心电图 -->
      <div class="card-bottom">
        <el-card :body-style="{ padding: '16px 16px 30px 16px'}">
          <div class="card-head">
            <span class="icon-heart"></span>
            <span class="card-head-title">心电图</span>
          </div>
          <el-table
          border
          style="{width: 100%}"
          :data="waveTestData"
          :header-row-class-name="tableRowClassName"
          :header-cell-class-name="cellClassName">
            <el-table-column
            align="center"
            prop="testItem"
            label="检查项目">
            </el-table-column>

            <el-table-column
            align="center"
            prop="result"
            label="结果">
            </el-table-column>

          </el-table>
        </el-card>
      </div>
      <!-- 超声图 -->
      <div class="card-bottom">
        <el-card :body-style="{ padding: '16px 16px 30px 16px'}">
          <div class="card-head">
            <span class="icon-heart"></span>
            <span class="card-head-title">超声检查</span>
          </div>
          <el-table
          border
          style="{width: 100%}"
          :data="waveTestData"
          :header-row-class-name="tableRowClassName"
          :header-cell-class-name="cellClassName">
            <el-table-column
            align="center"
            prop="testItem"
            label="检查项目">
            </el-table-column>

            <el-table-column
            align="center"
            prop="result"
            label="结果">
            </el-table-column>

          </el-table>
        </el-card>
      </div>
    </div>
    <!-- 超声检查 end -->
    <!-- X线检查 -->
    <div>
      <el-card :body-style="{ padding: '16px 16px 30px 16px'}">
        <div class="card-head">
          <span class="icon-heart"></span>
          <span class="card-head-title">X线检查</span>
        </div>
        <el-table
        border
        style="{width: 100%}"
        :data="XlineTestData"
        :header-row-class-name="tableRowClassName"
        :header-cell-class-name="cellClassName">
          <el-table-column
          align="center"
          prop="testItem"
          label="检查项目">
          </el-table-column>

          <el-table-column
          align="center"
          prop="result"
          label="结果">
          </el-table-column>
          <!-- <el-table-column
          label="ss"
          prop="suggest"
          >
          </el-table-column> -->
          
        </el-table>
        <table>
          <tr>
            <td>
              <span>初步意见:</span>
              <span>乳腺增生</span>
            </td>
          </tr>
        </table>
      </el-card>
    </div>
    </div>
    <!-- X线检查 end -->
</template>
<style>
.el-table .table-row{
    color: black;
    padding: 0;
    line-height: 47px;
    background-color: #def2ff;
  }
.health-form .el-table__body-wrapper {
    overflow: auto;
    overflow-x: hidden;
    /* overflow-y: auto; */
    position: relative;}
</style>
<script>
// './../../诊所-高血压/hospitalIcon'
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
          // suggest: '正常'
        },
        {
          testItem: '肝',
          result: '正常'
        }
      ],
      row: 0
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
    },
    tableRowClassName ({row, rowIndex}) {
      // console.log('ib', rowIndex)
      if (rowIndex === 0) {
        return 'table-row'
      }
    },
    cellClassName ({row, column, rowIndex, columnIndex}) {
      if (rowIndex === 0) {
        return 'table-row'
      }
      return 'table-row'
    }
  }
}
</script>

<style scoped>
  .head{
    font-size:24px;
    color:#041421;
    padding:30px 0 30px 12px;
  }
  .head span{
    display: inline-block;
    padding-left:10px;
  }
  .table-title{
    font-size: 24px;
    color:#041421;
    margin:30px 0 10px 12px;
  }
  .card-head{
    color:#666;
    font-size:20px;
    padding-top:8px;
    padding-bottom:12px;
    margin-bottom:16px;
    border-bottom:1px solid #eaeaea;
  }
  .card-head-title{
    display: inline-block;
    margin-left:34px;
  }
  .card-bottom{
    margin-bottom:8px;
  }
  table{
    border:1px solid rgb(235, 238, 245);
    width:100%;
    border-top:none;
  }
  table td{
    padding:12px;
    color:#666;
    text-align:center;
  }
  table tr:hover{
    background-color:#fbfbfb;
  }
  .icon-heart{
    position: relative;
  }
  .icon-heart::before{
    top: 0px;
    /* left: 36px; */
    position: absolute;
    content: '';
    width: 24px;;
    height: 21px;
    background: url('./../../诊所-高血压/hospitalIcon/诊所-icon-67.png')
  }
  .icon-normal-test{
    position: relative;
  }
  .icon-normal-test::before{
    top: 0px;
    /* left: 36px; */
    position: absolute;
    content: '';
    width: 24px;;
    height: 21px;
    background: url('./../../诊所-高血压/hospitalIcon/诊所-icon-73.png')
  }
  .icon-arm{
    position: relative;
  }
  .icon-arm::before{
    top: 0px;
    /* left: 36px; */
    position: absolute;
    content: '';
    width: 24px;;
    height: 21px;
    background: url('./../../诊所-高血压/hospitalIcon/诊所-icon-68.png')
  }
  .icon-bio{
    position: relative;
  }
  .icon-bio::before{
    top: 0px;
    /* left: 36px; */
    position: absolute;
    content: '';
    width: 24px;;
    height: 21px;
    background: url('./../../诊所-高血压/hospitalIcon/诊所-icon-75.png')
  }
  .icon-in{
    position: relative;
  }
  .icon-in::before{
    top: 0px;
    /* left: 36px; */
    position: absolute;
    content: '';
    width: 24px;;
    height: 21px;
    background: url('./../../诊所-高血压/hospitalIcon/诊所-icon-63.png')
  }
  .icon-out{
    position: relative;
  }
  .icon-out::before{
    top: 0px;
    /* left: 36px; */
    position: absolute;
    content: '';
    width: 24px;;
    height: 21px;
    background: url('./../../诊所-高血压/hospitalIcon/诊所-icon-64.png')
  }
  .icon-ears{
    position: relative;
  }
  .icon-ears::before{
    top: 0px;
    /* left: 36px; */
    position: absolute;
    content: '';
    width: 24px;;
    height: 21px;
    background: url('./../../诊所-高血压/hospitalIcon/诊所-icon-69.png')
  }
  .icon-mouth{
    position: relative;
  }
  .icon-mouth::before{
    top: 0px;
    /* left: 36px; */
    position: absolute;
    content: '';
    width: 24px;;
    height: 21px;
    background: url('./../../诊所-高血压/hospitalIcon/诊所-icon-74.png')
  }
  .icon-blood{
    position: relative;
  }
  .icon-blood::before{
    top: 0px;
    /* left: 36px; */
    position: absolute;
    content: '';
    width: 24px;;
    height: 21px;
    background: url('./../../诊所-高血压/hospitalIcon/诊所-icon-74.png')
  }
  .icon-urine{
    position: relative;
  }
  .icon-urine::before{
    top: 0px;
    /* left: 36px; */
    position: absolute;
    content: '';
    width: 24px;;
    height: 21px;
    background: url('./../../诊所-高血压/hospitalIcon/诊所-icon-72.png')
  }
  .icon-tumour{
    position: relative;
  }
  .icon-tumour::before{
    top: 0px;
    /* left: 36px; */
    position: absolute;
    content: '';
    width: 24px;;
    height: 21px;
    background: url('./../../诊所-高血压/hospitalIcon/诊所-icon-65.png')
  }
  .icon-sound{
    position: relative;
  }
  .icon-sound::before{
    top: 0px;
    /* left: 36px; */
    position: absolute;
    content: '';
    width: 24px;;
    height: 21px;
    background: url('./../../诊所-高血压/hospitalIcon/诊所-icon-71.png')
  }
  .icon-x{
    position: relative;
  }
  .icon-x::before{
    top: 0px;
    /* left: 36px; */
    position: absolute;
    content: '';
    width: 24px;;
    height: 21px;
    background: url('./../../诊所-高血压/hospitalIcon/诊所-icon-70.png')
  }
</style>


