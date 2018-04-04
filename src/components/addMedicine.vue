<template>
  <div class="add-medicine">
    <div class="add-medicine-top">
      <div>
        <el-cascader
          :options="options"
          :show-all-levels="false"
          @active-item-change="sickTypeChange"
          @change="getMedicine"
          placeholder="请选择药物类型"
          size="mini"
        ></el-cascader>
        <div style="display:inline-block">

          <el-input
            placeholder="搜索药物"
            prefix-icon="el-icon-search"
            v-model="searchMedicine"
            size="mini">
          </el-input>
        </div>
      </div>
      <!-- 历史用药 -->
      <div class="margin-bottom" v-if="clearHistroy">
        <p class="histroy">历史用药</p>
        <div class="medicine-list">
          <div class="medice-msg" v-for="(item,index) in histroyMedicine" :key="index">
            <div class="medice-msg-item">
              <img :src="item.medicineImgUrl" alt="暂无药物图片" width="100px">
            </div>
            <div class="medice-msg-item">
              <div >
                <div class="medicine-name">
                  <span>{{item.medicineName}}</span>
                  <span>{{item.drugSpec}}</span>
                </div>
                <div class="medicine-address">
                  <span>{{item.makeEnterprise}}</span>
                </div>
              </div>
            </div>
            <div class="medice-msg-item">
              <count
              :index="index"
              :initNum="item.useNum"
              type="histroy"
              unit="粒/次"
              @numChange="useNum"></count>
            </div>
            <div class="medice-msg-item">
              <count
              :index="index"
              :initNum="item.useTimes"
              type="histroy"
              unit="次/日"
              @numChange="useTimes"></count>
            </div>
            <div>
              <button class="add-medicine-btn" @click="addMedicine('history',index)">添加</button>
            </div>
          </div>
        </div>
        <div class="clear-histroy">
          <button @click="clearHistroyHandle"><span>清除历史</span></button>
        </div>
      </div>
    </div>
    <!-- 搜索列表 -->
    <div class="add-medicine-bottom">
      <div class="medicine-list">
        <div class="medice-msg" v-for="(item,index) in medicineList" :key="item.id">
          <div class="medice-msg-item">
            <img :src="item.medicineImgUrl" alt="暂无药物图片" width="100px">
          </div>
          <div class="medice-msg-item">
            <div >
              <div class="medicine-name">
                <span>{{item.medicineName}}</span>
                <span>{{item.drugSpec}}</span>
              </div>
              <div class="medicine-address">
                <span>{{item.makeEnterprise}}</span>
              </div>
            </div>
          </div>
          <div class="medice-msg-item">
            <count
            :index="index"
            :initNum="1"
            type="search"
            unit="粒/次"
            @numChange="useNum"></count>
          </div>
          <div class="medice-msg-item">
            <count
            :index="index"
            :initNum="3"
            type="search"
            unit="次/日"
            @numChange="useTimes"></count>
          </div>
          <div>
            <button class="add-medicine-btn" @click="addMedicine('search',index)">添加</button>
          </div>
        </div>
      </div>
    </div>
    <!-- <div >2</div> -->
  </div>
</template>

<script>
import count from './../components/count.vue'
import {sickTypeApi, medicineTypeApi} from './../api/components/addMedicine'
export default {
  props: {
    // histroyMedicine: []
  },
  components: {
    count
  },
  data () {
    return {
      options: [
        {
          value: 1,
          label: '高血压',
          children: [{
            value: 'loading',
            label: '加载中...',
            disabled: true
          }]
        },
        {
          value: 2,
          label: '糖尿病',
          children: [{
            value: 'loading',
            label: '加载中...',
            disabled: true
          }]
        }
      ],
      histroyMedicine: [
        {
          'id': 1,
          'createTime': '2018-01-30 16:04:14',
          'modifyTime': null,
          'medicineId': 8,
          'medicineName': '瑞泰(雷米普利片)',
          'medicineCompost': '本品主要成份为雷米普利。',
          'function': '原发性高血压；急性心肌梗死2-9天后出现的轻-中度心力衰竭（NYHA II和III）。',
          'applyCroed': '高血压患者',
          'drugSpec': '5毫克x7',
          'usageDosage': '1  单剂量和每天给药量的剂量学注意：在雷米普利片治疗初期可能会引起血压过度降低，尤其是患者伴有盐和/或体液流失（如呕吐/腹泻，利尿治疗），心衰－尤其是心肌梗死后－或严重高血压。如果可能，开始用雷米普利片治疗前，应纠正盐和/或体液流失，减少或停用现正使用的利尿剂（在心衰患者，必须权衡容量负荷过重的风险）。这些患者的治疗应当以最低单剂量开始，早晨服用1.25mg雷米普利。首剂后，每当雷米普利片和/或利尿剂剂量增加时，这些病人应给予医疗监护至少8小时，以免发生难以控制的低血压反应。患有恶性高血压或心衰的患者－尤其是急性心肌梗死后－用雷米普利片治疗时应住院。除非另有医嘱，以下剂量推荐适用于肾功能正常的患者：原发性高血压起始剂量一般为2.5mg雷米普利片晨服，如果该剂量血压不能恢复正常，可增加至每天5mg。增加剂量时应该有最小3周的间隔。维持剂量一般为每日2.5-5mg，最大剂量不超过每日10mg。急性心肌梗死后（2-9天）轻中度心衰（NYHA II和III）的治疗注意：用药剂量的调整只能在血流动力学稳定的病人住院的情况下进行。同时服用其他抗高血压药物的患者，必须小心监测，以免发生低血压。起始每日剂量一般为2.5mg，早晚分服。如果此起始剂量患者耐受不了(如血压过低)，应该降低到1.25mg，早晚分服。根据患者的情况，剂量可增加。间隔1-2天剂量可加倍，至每日最大剂量5mg雷米普利，早晚分服。中度肾功能损害患者（肌酐清除率30-60ml/min或血清肌酐浓度>1.2且<1.8mg/dl），老年患者（超过65岁）或糖尿病患者的剂量起始剂量为1.25mg晨服（见起始剂量注意事项），维持量通常为每天2.5mg雷米普利片。每天最大剂量不能超过5mg雷米普利片。2  给药方法和持续时间不管什么时候就餐，足量液体吞服即可。依适应证和剂量的不同，指定的每日剂量可在早晨一次完全服用或分成两次（早晚各一次）服用。加服利尿剂可增强雷米普利片的降压效果。对急性心肌梗死后出现心衰的患者，不得早于梗死后2日内开始服用雷米普利片，但也不应迟于梗死后10天才开始服用。另外建议给予雷米普利片至少15个月。',
          'makeEnterprise': '赛诺菲(北京)制药有限公司',
          'useTaboo': '有血管神经性水肿病史的患者，双侧肾动脉狭窄或单肾且伴肾动脉狭窄患者，左心室血液输入或输出减少，低血压或循环状况不稳定的患者，妊娠及哺乳妇女。',
          'freeGuide': '本应用所有药品仅供参考，不做推荐使用。患者如需购买或服用药品，请遵照医嘱。由患者自行决定购买或服用药品而造成后果的，本应用概不负责。特此声明。',
          'medicineDetails': '<b>【药品名称】</b> ',
          'medicinePrice': null,
          'medicineImgUrl': '/upload/medicine/344_img.jpg'
        },
        {
          'id': 1,
          'createTime': '2018-01-30 16:04:14',
          'modifyTime': null,
          'medicineId': 8,
          'medicineName': '瑞泰(雷米普利片)',
          'medicineCompost': '本品主要成份为雷米普利。',
          'function': '原发性高血压；急性心肌梗死2-9天后出现的轻-中度心力衰竭（NYHA II和III）。',
          'applyCroed': '高血压患者',
          'drugSpec': '5毫克x7',
          'usageDosage': '1  单剂量和每天给药量的剂量学注意：在雷米普利片治疗初期可能会引起血压过度降低，尤其是患者伴有盐和/或体液流失（如呕吐/腹泻，利尿治疗），心衰－尤其是心肌梗死后－或严重高血压。如果可能，开始用雷米普利片治疗前，应纠正盐和/或体液流失，减少或停用现正使用的利尿剂（在心衰患者，必须权衡容量负荷过重的风险）。这些患者的治疗应当以最低单剂量开始，早晨服用1.25mg雷米普利。首剂后，每当雷米普利片和/或利尿剂剂量增加时，这些病人应给予医疗监护至少8小时，以免发生难以控制的低血压反应。患有恶性高血压或心衰的患者－尤其是急性心肌梗死后－用雷米普利片治疗时应住院。除非另有医嘱，以下剂量推荐适用于肾功能正常的患者：原发性高血压起始剂量一般为2.5mg雷米普利片晨服，如果该剂量血压不能恢复正常，可增加至每天5mg。增加剂量时应该有最小3周的间隔。维持剂量一般为每日2.5-5mg，最大剂量不超过每日10mg。急性心肌梗死后（2-9天）轻中度心衰（NYHA II和III）的治疗注意：用药剂量的调整只能在血流动力学稳定的病人住院的情况下进行。同时服用其他抗高血压药物的患者，必须小心监测，以免发生低血压。起始每日剂量一般为2.5mg，早晚分服。如果此起始剂量患者耐受不了(如血压过低)，应该降低到1.25mg，早晚分服。根据患者的情况，剂量可增加。间隔1-2天剂量可加倍，至每日最大剂量5mg雷米普利，早晚分服。中度肾功能损害患者（肌酐清除率30-60ml/min或血清肌酐浓度>1.2且<1.8mg/dl），老年患者（超过65岁）或糖尿病患者的剂量起始剂量为1.25mg晨服（见起始剂量注意事项），维持量通常为每天2.5mg雷米普利片。每天最大剂量不能超过5mg雷米普利片。2  给药方法和持续时间不管什么时候就餐，足量液体吞服即可。依适应证和剂量的不同，指定的每日剂量可在早晨一次完全服用或分成两次（早晚各一次）服用。加服利尿剂可增强雷米普利片的降压效果。对急性心肌梗死后出现心衰的患者，不得早于梗死后2日内开始服用雷米普利片，但也不应迟于梗死后10天才开始服用。另外建议给予雷米普利片至少15个月。',
          'makeEnterprise': '赛诺菲(北京)制药有限公司',
          'useTaboo': '有血管神经性水肿病史的患者，双侧肾动脉狭窄或单肾且伴肾动脉狭窄患者，左心室血液输入或输出减少，低血压或循环状况不稳定的患者，妊娠及哺乳妇女。',
          'freeGuide': '本应用所有药品仅供参考，不做推荐使用。患者如需购买或服用药品，请遵照医嘱。由患者自行决定购买或服用药品而造成后果的，本应用概不负责。特此声明。',
          'medicineDetails': '<b>【药品名称】</b> ',
          'medicinePrice': null,
          'medicineImgUrl': '/upload/medicine/344_img.jpg'
        }
      ],
      sickType: null,
      searchMedicine: '',
      medicineList: [],
      clearHistroy: true
      // useNum: ''
    }
  },
  methods: {
    sickTypeChange (val) {
      let value = null
      if (isNaN(val[0])) {
        val = parseInt(val[0])
      }
      value = val[0]
      this.sickType = value
      this.getMedicineData(value)
    },
    getMedicineData (value) {
      this.$axios(sickTypeApi(value))
      .then(res => {
        // console.log('data', res.data.data)
        // console.log('value', value)
        let arr = []
        // let children = []
        if (res.data) {
          if (res.data.data) {
            if (res.data.data.length !== 0) {
              arr = []
              res.data.data.forEach((item, index) => {
                let msg = {
                  children: []
                }
                msg.value = item.id
                msg.label = item.medicineName
                arr.push(msg)
                // console.log(item.list)
                if (item.list) {
                  if (item.list.length !== 0) {
                    item.list.forEach((medicine, index) => {
                      let twoEelect = {}
                      twoEelect.value = medicine.id
                      twoEelect.label = medicine.medicineName
                      msg.children.push(twoEelect)
                    })
                  }
                }
              })
            }
          }
        }
        if (value === 1) {
          this.options[0].children = arr
        }
        if (value === 2) {
          this.options[1].children = arr
        }
      })
    },
    getMedicine (val) {
      let value = null
      if (val) {
        if (val.length !== 0) {
          if (val[2]) {
            value = val[2]
          }
        }
      }
      // value = val
      console.log('id', value)
      console.log('type', this.sickType)
      // this.getMedicineList(val[0], val[2])
      this.getMedicineList(value, this.sickType)
    },
    getMedicineList (val, type) {
      this.$axios(medicineTypeApi(val, type))
      .then(res => {
        let arr = []
        if (res.data) {
          // console.log('data', res.data)
          if (res.data.data) {
            if (res.data.data.length !== 0) {
              res.data.data.forEach((item, index) => {
                let obj = {}
                obj.medicineName = item.medicineName
                obj.drugSpec = item.drugSpec
                obj.id = item.id
                obj.medicineId = item.medicineId
                obj.makeEnterprise = item.makeEnterprise
                obj.medicineImgUrl = 'http://10.7.6.131:80/BPWatch' + item.medicineImgUrl
                arr.push(obj)
              })
            }
          }
        }
        this.medicineList = arr
        this.formetterMedicineList(this.medicineList)
        console.log('list', this.medicineList)
        console.log('arr', arr)
      })
    },
    clearHistroyHandle () {
      this.clearHistroy = false
    },
    addMedicine (type, index) {
      console.log('add', type)
      console.log('add', index)
      if (type === 'history') {
        this.$emit('addMedicine', {list: this.histroyMedicine[index]})
        // this.histroyMedicine
      }
      if (type === 'search') {
        this.$emit('addMedicine', {list: this.medicineList[index]})
      }
    },
    formetterMedicineList (arr) {
      if (arr.liength === 0) {
        return arr
      } else {
        arr.forEach((item, index) => {
          item.useNum = 1
          item.useTimes = 3
          item.showDelete = false
        })
        // return arr
      }
    },
    useNum (payload) {
      if (payload.type === 'histroy') {
        this.histroyMedicine[payload.index].useNum = payload.num
      }
      if (payload.type === 'search') {
        this.medicineList[payload.index].useNum = payload.num
      }
      console.log('p', payload)
    },
    useTimes (payload) {
      // console.log('p', payload)
      if (payload.type === 'histroy') {
        this.histroyMedicine[payload.index].useTimes = payload.num
      }
      if (payload.type === 'search') {
        this.medicineList[payload.index].useTimes = payload.num
      }
      // console.log(this.histroyMedicine[payload.index])
    }
  },
  created () {
    this.formetterMedicineList(this.histroyMedicine)
  },
  mounted () {
  }

}
</script>

<style scoped>
.margin-bottom{
  margin-bottom: 4px;
}
.add-medicine{
  background: #eaeaea;
  /* width: 100%; */
}
.add-medicine-top{
  background: #fff;
  /* margin-bottom: 4px; */
}
.add-medicine-bottom{
  background: #fff;
}
.medice-msg{
  display: flex;
  align-items: center;
  justify-content:space-between;
   /* flex-wrap: nowrap ; */
  padding-top:14px;
  padding-bottom:16px;
  border-bottom: 1px solid #eaeaea;
}
.medice-msg-item{
  margin-right: 14px;
  display: flex;
  align-items: center;
}
.medice-msg-item span{
  display: inline-block;
}
.medicine-name{
  color: #041421;
  font-size: 16px;
}
.medicine-address{
  color: #666;
  font-size: 14px;
}
button{
  outline: none;
  border: none;
  background: #fff;
  cursor: pointer;
  color:#666;
  font-size: 16px;
  text-align: center;
}
.clear-histroy{
  text-align: center;
  padding-bottom: 16px;
}
.medice-msg:nth-last-child(1){
  border:none
}
.add-medicine-btn{
  background: #1991fc;
  color: #fff;
  width: 72px;
  height: 24px;
  line-height: 24px;
  border-radius: 2px;
}
.add-medicine-btn:active{
  background: #1974c4;
  color: #fff;
  width: 72px;
  height: 24px;
}
.histroy{
  font-size:16px;
  color:#666;
  margin-top:14px;
}
</style>
