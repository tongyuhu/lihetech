<template>
  <div>
    <div>
      <el-select 
      v-model="sickType" 
      placeholder="患病类型"
      @change="sickTypeHandle"
      >
      <!-- clearable  -->
        <el-option
        v-for="item in sickTypeOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select v-model="medicineType"  placeholder="药品种类" @change="Handle">
        <el-option
          v-for="item in medicineTypeOptions"
          :key="item.id"
          :label="item.medicineName" 
          :value="item.id">
        </el-option>
      </el-select>
    </div>
    <div>
      <!-- <div v-if="!(medicineLists.length>0)">暂无数据</div> -->
      <div 
     
      v-loading="loading"
      element-loading-text="拼命加载中"
      class="medicine-lists"
      >
        <div v-if="!(medicineLists.length>0)">暂无数据</div>
        <el-row
        >
          <el-col 
          :span="4"
          v-for="item in medicineLists" 
          :key="item.id" 
          class="medicine">
          <div class="medicine-div">
            <div class="medicine-msg clear">
              <div></div>
              <div class="medicine-msg-btn">
                <el-button size="mini" @click="medicineMsgHandle(item)">详情</el-button>
              </div>
            </div>
            
            <img :src="'http://139.196.204.123:80/BPWatch'+item.medicineImgUrl" alt="暂无图片" class="medicine-img">
            
            <p class="medicine-name">{{item.medicineName}}</p>
            <p v-if="!item.medicinePrice" class="price">暂无参考价格</p>
            <p v-else class="price">￥{{item.medicinePrice}}</p>
          </div>
          </el-col>
        </el-row>
        <el-dialog 
        title="药品详情" 
        :visible.sync="showMedicineMsg"
        :custom-class="dialog"
        width="70%"  
        >
          <div class="dialog-msg clear">
            <div class="dialog-img">
                <img :src="'http://139.196.204.123:80/BPWatch'+medicineMsg.medicineImgUrl" alt="暂无图片" class="medicine-img-diolog">
            </div>
            <div class="dialog-status">
              <div>
                <span class="medicine-name">{{medicineMsg.medicineName}}</span> 
                <span v-if="!medicineMsg.medicinePrice" class="price">暂无参考价格</span>
                <span v-else class="price">￥{{medicineMsg.medicinePrice}}</span>
              </div>
              <div>
                <p>{{medicineMsg.makeEnterprise}}</p>
              </div>
            </div>
          </div>
          <div v-html="medicineMsg.medicineDetails" class="dialog-html"></div>
        </el-dialog>
        <!-- {{medicineList}} -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialog: 'dialog',
      sickTypeOptions: [
        {
          value: 'heightBlood',
          label: '高血压'
        }, {
          value: 'heightSuger',
          label: '糖尿病'
        }],
      medicine: [
        {
          value: 'heightBlood',
          label: '高血压'
        }, {
          value: 'heightSuger',
          label: '糖尿病'
        }],
      sickType: '',
      medicineType: '',
      medicines: [],  // 获取的一级药品列表
      medicineId: [],  // 药品列表id
      medicineLists: [], // 获取的药品列表
      medicineTypeOptions: [], // 药品目录类型
      showMedicineMsg: false, // 弹出层
      medicineMsg: {}, // 弹出层内容
      loading: false
    }
  },
  methods: {
    sickTypeHandle (val) {
      let id = ''
      if (val === 'heightBlood') {
        id = 1
      } else {
        id = 2
      }
      this.medicineType = ''
      this.$axios({
        method: 'post',
        url: '/medicine/directory/list',
        data: {
          medicineType: id
        }
      })
      .then(res => {
        this.medicines = res.data.data
        this.medicineId = []
        this.medicineTypeOptions = []
        this.medicines.forEach(item => {
          let obj = {}
          obj.id = item.id
          obj.medicineName = item.medicineName
          this.medicineTypeOptions.push(obj)
          if (item.list) {
            item.list.forEach(i => {
              this.medicineId.push(i.id)
            })
          }
        })
      })
      .catch()
    },
    Handle (val) {
      this.medicineLists = []
      let url = ''
      if (this.sickType === 'heightBlood') {
        url = '/medicine/blood/list'
      } else {
        url = '/medicine/urine/list'
      }
      let arr = []
      this.medicines.forEach(item => {
        if (item.id === val) {
          arr = item.list
        }
      })
      for (let i = 0; i < arr.length; i++) {
        this.loading = true
        this.$axios({
          method: 'post',
          url: url,
          data: {
            medicineId: arr[i].id
          }
        })
        .then(res => {
          this.medicineLists.push(...res.data.data)
          // this.medicineLists = this.medicineLists.concat(res.data.data)
          this.medicineLists.sort(function (a, b) {
            return b.id - a.id
          })
          this.loading = false
        })
      }
      console.log(this.medicineLists)
    },
    medicineMsgHandle (val) {
      this.showMedicineMsg = true
      this.medicineMsg = val
    }
  },
  computed: {

  }
  // watch: {
  //   medicineList: function (newval, oldval) {
  //     if (!this.medicineList) {
  //       this.medicineList = '暂无数据'
  //     }
  //     console.log(newval, oldval)
  //   }
  // }
  // mounted () {
  //   this.$axios({
  //     method: 'post',
  //     url: '/medicine/directory/list',
  //     data: {
  //       medicineType: 1
  //     }
  //   })
  //     .then(res => {
  //       // let ree = []
  //       this.medicines = res.data.data
  //       // this.medicineclass = this.medicines
  //       // let ree = res.data.data
  //       // ree.forEach(item => {

  //       // })
  //     })
  //     .catch()
  //   this.$axios({
  //     method: 'post',
  //     url: '/medicine/blood/list',
  //     data: {
  //       medicineId: 8
  //     }
  //   })
  //     .then(res => {
  //       // let ree = []
  //       this.meds = res.data.data
  //       // let ree = res.data.data
  //       // ree.forEach(item => {

  //       // })
  //     })
  //     .catch()
  // }
}
</script>

<style scoped>
  .medicine-lists{
    height: 600px;
  }
  .medicine{
    /* box-sizing:border-box; */
  }
  .medicine-div{
    height: 250px;
    margin: 10px;
    border: 1px solid #dddddd;

  }
  .medicine p{
    text-align: center
  }
  .medicine-img{
    /* width: 90px; */
    height: 90px;
    display: block;
    margin: 0 auto;
    text-align: center;
  }
  .medicine-img{
    width: 90%
  }
  .clear::after{
    display:block;
    clear:both;
    content:"";
    visibility:hidden;
    height:0
  }
  .medicine-msg-btn{
    float: right;
    margin: 5px;
  }
  .dialog-img{
    display: block;
    margin: 0 auto;
    width: 50%;
    float: left;
  }
  .dialog-msg{
    position:relative;
    text-align: center;
  }
  .dialog-img img{
    width: 90%;
  }
  .dialog-status{
    width: 50%;
    float: left;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%);
  }
  .medicine-name{
    font-weight: bold;
  }
  .price{
    color: #FC5568;
    font-weight: bold;
  }
</style>
<style>
  .dialog{
    box-shadow: 0 1px 0px rgba(245, 231, 231, 0.3) !important;
  }
  .dialog-html b{
    color:blueviolet;
  }
</style>
