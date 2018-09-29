<template>
  <div>
    <searchMedicine
    @medicineList="changeMedicineList"></searchMedicine>
    <!-- 药物列表 -->
    <div class="medicenelist">
      <el-table
      ref="medicinemultipleTable"
      :data="medicineList"
      tooltip-effect="dark"
      style="width: 100%"
      max-height="550"
      @selection-change="handleSelectionChange"
      >
      <!-- @setCurrentRow="handleSelectionChange" -->
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="spec"
          label="规格"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="kucun"
          label="库存"
          width="65"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="price"
          label="单价"
          width="65"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加按钮 -->
    <div class="submit-btn-wrap">
      <button class="submit-btn" @click="addsure">确认添加</button>
    </div>
  </div>
</template>

<script>
import searchMedicine from '@/components/searchMedicine.vue'
export default {
  name: 'medicine',
  components: {
    searchMedicine
  },
  data () {
    return {
      medicineList: [],  // 药物列表
      multipleSelection: [], // 选择的药物列表
      doctorMedicine: [] // 要添加的药物
    }
  },
  methods: {
    /**
     * @description 搜索的到的药物列表添加到药物列表
     * @param {array} list 搜索到的药物
     */
    changeMedicineList (list) {
      let vm = this
      vm.medicineList = []
      this._.forEach(list, (item, index) => {
        // let obj = {}
        item.name = item.medicineName
        // item.spec = item.drugSpec
        // item.kucun = item.id
        // item.price = item.medicineId
        vm.medicineList.push(item)
      })
      // this.multipleSelection = []
      // this.$refs.medicinemultipleTable.clearSelection()
      // console.log('this.changeMedicineList', this.medicineList)
    },
    /**
     * @description 选择的药物
     * @param {array} val 选择的药物
     */
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log('val', val)
    },
    /**
     * @description 确认添加
     */
    addsure () {
      if (this.multipleSelection.length !== 0) {
        this.multipleSelection.forEach(item => {
          item.singleuse = ''
          item.singleuseUnit = 'pian'
          item.usemethod = 'mouse'
          item.usetimes = ''
          item.uselong = ''
          item.usetotal = ''
          item.tip = ''
          this.doctorMedicine.push(item)
          console.log('要添加的药品item', item)
          console.log('要添加的药品', this.doctorMedicine)
        })
      }
      this.doctorMedicine = this._.uniqWith(this.doctorMedicine, this._.isEqual)  // 去除重复
      this.$emit('addMedicine', this.doctorMedicine)  // 向父组件提交
      // 清楚选择数据
      this.multipleSelection = []
      this.doctorMedicine = []
      this.$refs.medicinemultipleTable.clearSelection()
    }
  }
}
</script>

<style scoped>
  .medicenelist{
    margin-top: 8px;
    margin-bottom: 8px;
  }
  .submit-btn-wrap{
    margin: 0 auto;
    text-align: center;
  }
  .submit-btn{
    background: #1991fc;
    box-sizing: border-box;
    line-height: 1;
    white-space: nowrap;
    border:1px solid #1991fc;
    border-radius: 2px;
    cursor: pointer;
    outline: none;
    color: #fff;
    width: 100px;
    height: 30px;
  }
  .submit-btn:hover{
    opacity: 0.9;
  }
</style>
