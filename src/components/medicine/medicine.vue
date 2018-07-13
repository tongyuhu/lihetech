<template>
  <div>
    <searchMedicine
    @medicineList="changeMedicineList"></searchMedicine>
    <div class="medicenelist">
      <el-table
      ref="multipleTable"
      :data="medicineList"
      tooltip-effect="dark"
      style="width: 100%"
      max-height="550"
      @selection-change="handleSelectionChange">
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
      medicineList: [],
      multipleSelection: [],
      doctorMedicine: []
    }
  },
  methods: {
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
      // console.log('this.changeMedicineList', this.medicineList)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log('val', val)
    },
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
          console.log('要添加的药品', this.doctorMedicine)
        })
      }
      this.doctorMedicine = this._.uniqWith(this.doctorMedicine, this._.isEqual)
      this.$emit('addMedicine', this.doctorMedicine)
      this.$refs.multipleTable.clearSelection()
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
    border:none;
    border-radius: 2px;
    cursor: pointer;
    outline: none;
    color: #fff;
    width: 100px;
    height: 30px;
  }
</style>
