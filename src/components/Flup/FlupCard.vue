<template>
  <div class="flup-card" v-loading="loading">
    <div class="bottom-gap">
      <el-card :body-style="{padding: '18px 20px 0 20px'}">
        <div class="head-title">
          <div>

            <span>{{info.name}}</span>
            <el-button :disabled="upBtn" v-if="!submitBtn" type="primary" size="mini" @click="FlupUp">上次随访</el-button>
            <el-button :disabled="nextBtn" v-if="!submitBtn" type="primary" size="mini" @click="FlupDn">下次随访</el-button>
          </div>
          <div class="head-title-right">
            <el-button @click="call" type="primary" size="mini">语音</el-button>
          </div>
        </div>
        <el-form
        label-width="45px" 
        label-position="left">
          <span class="iconfont icon-bixutian must"></span>
          <div class="inline-block flup-methods-4 right-gap">
            <el-form-item label="随访方式" label-width="68px">
              <el-select v-model="flupMethods" size="small" placeholder="请选择" style="{'width':'60px'}">
                <el-option
                  label="远程随访"
                  :value="1">
                </el-option>
                <el-option
                  label="电话随访"
                  :value="2">
                </el-option>
                <el-option
                  label="社区随访"
                  :value="3">
                </el-option>
                <el-option
                  label="上门随访"
                  :value="4">
                </el-option>
                <el-option
                  label="其他"
                  :value="5">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
            <span class="iconfont icon-bixutian must"></span>
          <div class="inline-block right-gap">
            <el-form-item label="随访时间" label-width="68px">
              <el-date-picker
              v-model="flupTime"
              align="right"
              type="date"
              size="small"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="inline-block">
            <el-form-item label="下次随访时间" label-width="99px">
              <el-date-picker
              v-model="nextFlupTime"
              align="right"
              type="date"
              size="small"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </div>
        </el-form>
      </el-card>
    </div>
    <div class="bottom-gap">
      <el-card>
        <div class="card-head-title">
          <p>身体指标</p>
        </div>
        <div class="bottom-gap">
          <el-row :gutter="20">
            <el-col :span="5">
              <div class="elinput-wrap-small">
                <numberinput
                v-model="body.heighBlood"
                :leftOffset="60"
                :rightOffset="50">
                  <template slot="left">
                    <span class="input-tip">收缩压：</span>
                  </template>
                  <template slot="right">
                    <span class="input-tip">mmHg</span>
                  </template>
                </numberinput>
                <!-- <el-input placeholder="" v-model="body.heighBlood" size="small">
                  <template slot="prefix">
                    <span class="input-tip">收缩压：</span>
                  </template>
                  <template slot="suffix">

                    <span class="input-tip">mmHg</span>
                  </template>
                </el-input> -->
              </div>

            </el-col>
            <el-col :span="5">
              <div class="elinput-wrap-small">
                <numberinput
                v-model="body.lowBlood"
                :leftOffset="60"
                :rightOffset="50">
                  <template slot="left">
                    <span class="input-tip">舒张压：</span>
                  </template>
                  <template slot="right">
                    <span class="input-tip">mmHg</span>
                  </template>
                </numberinput>
                <!-- <el-input placeholder="" v-model="body.lowBlood" size="small">
                  <template slot="prefix">
                    <span class="input-tip">舒张压：</span>
                  </template>
                  <template slot="suffix">
                    <span class="input-tip">mmHg</span>
                  </template>
                </el-input> -->
              </div>

            </el-col>
            <el-col :span="14">
              <div class="radio-box flex-between">
                <div class="flex">
                  <div class="check-box-title">
                    <span class="iconfont icon-bixutian must"></span>
                  危险分层：
                  </div>
                  <div>
                    <el-radio-group 
                      v-model="body.dangerLayer"
                      size="small">
                      <el-radio :label="1">低危</el-radio>
                      <el-radio :label="2">中危</el-radio>
                      <el-radio :label="3">高危</el-radio>
                      <el-radio :label="4">很高危</el-radio>
                      <el-radio :label="5">正常</el-radio>
                      <el-radio :label="0">未分层</el-radio>
                      <!-- <el-radio :label="9">高危</el-radio> -->
                    </el-radio-group>
                  </div>

                </div>
                <div class="question-btn">
                  <!-- <el-button type="text" size="mini"> -->
                    <button
                    @click="dangerLayerHandler">
                      <i class="el-icon-question" :style="{'color':'#999','font-size':'16px','height':'16px'}"></i>
                      分层评估
                    </button>
                  <!-- </el-button> -->
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="elinput-wrap-mini">
              <numberinput
              v-model="body.heigh"
              :leftOffset="45"
              :rightOffset="30">
                <template slot="left">
                  <span class="input-tip">身高：</span>
                </template>
                <template slot="right">
                  <span class="input-tip">cm</span>
                </template>
              </numberinput>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="elinput-wrap-mini">
              <numberinput
              v-model="body.weight"
              :leftOffset="45"
              :rightOffset="30">
                <template slot="left">
                  <span class="input-tip">体重：</span>
                </template>
                <template slot="right">
                  <span class="input-tip">kg</span>
                </template>
              </numberinput>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="elinput-wrap-mini">
              <numberinput
              v-model="body.heart"
              :leftOffset="45"
              :rightOffset="40">
                <template slot="left">
                  <span class="input-tip">心律：</span>
                </template>
                <template slot="right">
                  <span class="input-tip">次/分</span>
                </template>
              </numberinput>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="elinput-wrap-middle">
              <numberinput
              v-model="body.health"
              :leftOffset="75">
                <template slot="left">
                  <span class="input-tip">体质指数：</span>
                </template>
              </numberinput>
            </div>
          </el-col>
        </el-row>
      </el-card>

    </div>
    <div class="bottom-gap">
      <el-card>
        <div class="card-head-title">
          <p>日常情况</p>
        </div>
        <div class="gap">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="elinput-wrap-middle">
                <numberinput
                v-model="daily.smoke"
                :leftOffset="75"
                :rightOffset="20">
                  <template slot="left">
                    <span class="input-tip">日吸烟量：</span>
                  </template>
                  <template slot="right">
                    <span class="input-tip">支</span>
                  </template>
                </numberinput>
              </div>

            </el-col>
            <el-col :span="6">
              <div class="elinput-wrap-middle">
                <numberinput
                v-model="daily.drink"
                :leftOffset="75"
                :rightOffset="20">
                  <template slot="left">
                    <span class="input-tip">日饮酒量：</span>
                  </template>
                  <template slot="right">
                    <span class="input-tip">两</span>
                  </template>
                </numberinput>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="radio-box flex">
                <div class="check-box-title">
                睡眠质量：
                </div>
                <div>
                  <el-radio-group 
                    v-model="daily.sleep"
                    size="small">
                    <el-radio :label="1">良好</el-radio>
                    <el-radio :label="2">一般</el-radio>
                    <el-radio :label="3">差</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="elinput-wrap-middle">
                <numberinput
                v-model="daily.sport"
                :leftOffset="65"
                :rightOffset="60">
                  <template slot="left">
                    <span class="input-tip">运动量：</span>
                  </template>
                  <template slot="right">
                    <span class="input-tip">分钟/次</span>
                  </template>
                </numberinput>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
    <div class="bottom-gap">
      <el-card>
        <div class="card-head-title">
          <p>生活习惯</p>
        </div>
        <div class="bottom-gap">
          <el-form
          label-width="45px" 
          label-position="left">
            <div class="inline-block flup-methods-1 right-gap">
              <el-form-item label="是否按时服药：" label-width="110px">
                <el-select v-model="life.medicine" size="small" placeholder="请选择" style="{'width':'60px'}">
                  <el-option
                    label="是"
                    :value="1">
                  </el-option>
                  <el-option
                    label="否"
                    :value="0">
                  </el-option>
                  <el-option
                    label="不需要服药"
                    :value="2">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="inline-block flup-methods-2 right-gap">
              <el-form-item label="情绪：" label-width="55px">
                <el-select v-model="life.mood" size="small" placeholder="请选择" style="{'width':'60px'}">
                  <el-option
                    label="良好"
                    :value="1">
                  </el-option>
                  <el-option
                    label="一般"
                    :value="2">
                  </el-option>
                  <el-option
                    label="差"
                    :value="3">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="inline-block flup-methods-3 right-gap">
              <el-form-item label="遵医行为：" label-width="85px">
                <el-select v-model="life.doctor" size="small" placeholder="请选择" style="{'width':'60px'}">
                  <el-option
                    label="良好"
                    :value="1">
                  </el-option>
                  <el-option
                    label="一般"
                    :value="2">
                  </el-option>
                  <el-option
                    label="差"
                    :value="3">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="inline-block flup-methods-3 right-gap">
              <el-form-item label="摄盐情况：" label-width="85px">
                <el-select v-model="life.salt" size="small" placeholder="请选择" style="{'width':'60px'}">
                  <el-option
                    label="轻"
                    :value="1">
                  </el-option>
                  <el-option
                    label="中"
                    :value="2">
                  </el-option>
                  <el-option
                    label="重"
                    :value="3">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="radio-box bottom-gap flex">
              <div class="check-box-title">
                目前症状：
              </div>
              <div>
                <el-checkbox-group 
                  v-model="life.symptom"
                  size="small">
                  <el-checkbox :label="1">头晕</el-checkbox>
                  <el-checkbox :label="2">头痛</el-checkbox>
                  <el-checkbox :label="3">烦躁</el-checkbox>
                  <el-checkbox :label="4">面色苍白或潮红</el-checkbox>
                  <el-checkbox :label="5">视力模糊</el-checkbox>
                  <el-checkbox :label="6">以上情况全无</el-checkbox>
                  <!-- <el-checkbox :label="9">高危</el-checkbox> -->
                </el-checkbox-group>
              </div>
            </div>
            <div class="radio-box flex bottom-gap">
              <div class="check-box-title-large">
                并发的临床情况：
              </div>
              <div>
                <el-checkbox-group 
                  v-model="life.bed"
                  size="small">
                  <el-checkbox v-for='i in bingfalinchuang' :key="i.value" :label="i.value">{{i.label}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <div class="radio-box bottom-gap flex flex-between bottom-gap">
              <div class="flex">
                <div class="check-box-title-large">
                  中医辨证分型：
                </div>
                <div>
                  <el-checkbox-group 
                    v-model="life.chinese"
                    size="small">
                    <el-checkbox :label="1">阴虚阳亢证</el-checkbox>
                    <el-checkbox :label="2">气血两虚证</el-checkbox>
                    <el-checkbox :label="3">痰瘀互结证</el-checkbox>
                    <el-checkbox :label="4">肾精不足证</el-checkbox>
                    <el-checkbox :label="5">肾阳亏虚证</el-checkbox>
                    <el-checkbox :label="6">冲任失调证</el-checkbox>
                    <el-checkbox :label="7">以上情况均无</el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
              <div class="question-btn">
                <button @click.prevent="openChinese">
                  <i class="el-icon-question" :style="{'color':'#999','font-size':'16px','height':'16px'}"></i>
                  <span>中医辩证分型判断标准</span>
                </button>
              </div>
            </div>
            <div class="radio-box bottom-gap flex bottom-gap">
              <div class="check-box-title-large">
                非药物治疗情况：
              </div>
              <div>
                <el-checkbox-group 
                  v-model="life.unmedicine"
                  size="small">
                  <el-checkbox :label="1">限盐</el-checkbox>
                  <el-checkbox :label="2">减少吸烟量或戒烟</el-checkbox>
                  <el-checkbox :label="3">减少饮酒量或戒酒</el-checkbox>
                  <el-checkbox :label="4">减少膳食脂肪</el-checkbox>
                  <el-checkbox :label="5">减轻体重</el-checkbox>
                  <el-checkbox :label="6">有规律体育劳动</el-checkbox>
                  <el-checkbox :label="7">放松情绪</el-checkbox>
                  <el-checkbox :label="0">以上全无</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <div class="radio-box bottom-gap flex bottom-gap">
              <div class="check-box-title">
                健康教育：
              </div>
              <div>
                <el-checkbox-group 
                  v-model="life.health"
                  size="small">
                  <el-checkbox :label="1">低盐清淡饮食一食盐摄入每天控制在5克左右</el-checkbox>
                  <el-checkbox :label="2">适当控制饮食，体重不超过标准体重的10%</el-checkbox>
                  <el-checkbox :label="3">养成良好生活习情，如禁烟。限酒、避免紧张与激助及疲劳</el-checkbox>
                  <el-checkbox :label="4">穿戴不宜过紧，弯腰不宜过度，参加有益体育活动</el-checkbox>
                  <el-checkbox :label="5">定期测压</el-checkbox>
                  <el-checkbox :label="6">按时服药-遵医嘱</el-checkbox>
                  <el-checkbox :label="7">出现剧烈头痛、恶心、胸闷、心前区疼痛等症状及时就诊</el-checkbox>
                  <el-checkbox :label="8">定期检验血脂、血糖、尿常规等</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <div class="radio-box bottom-gap flex bottom-gap">
              <div class="check-box-title-large">
                中医保健指导：
              </div>
              <div>
                <el-checkbox-group 
                  v-model="life.direct"
                  size="small">
                  <el-checkbox :label="1">食疗</el-checkbox>
                  <el-checkbox :label="2">茶饮</el-checkbox>
                  <el-checkbox :label="3">耳穴</el-checkbox>
                  <el-checkbox :label="4">足浴</el-checkbox>
                  <el-checkbox :label="5">运动保健</el-checkbox>
                  <el-checkbox :label="6">其他</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <div class="radio-box bottom-gap flex bottom-gap">
              <div class="check-box-title-large">
                健康处方建议：
              </div>
              <div>
                <el-checkbox-group 
                  v-model="life.suggest"
                  size="small">
                  <el-checkbox v-for="item in health" :key="item.value" :label="item.value">{{item.label}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </el-form>
        </div>
      </el-card>
    </div>
    <div class="bottom-gap">
      <el-card>
        <div class="card-head-title">
          <span class="iconfont icon-bixutian must"></span>
          <span>近期用药情况</span>
          <button class="add-btn" @click="addMedicine">添加</button>
        </div>
        <div>
          <el-form>

            <el-table
            ref="multipleTable"
            :data="doctorMedicine"
            tooltip-effect="dark"
            style="width: 100%"
            border
            >
              <el-table-column
                type="index"
                label="序号"
                width="55"
                align="center">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="name"
                label="名称"
                align="center">
              </el-table-column>
              <el-table-column
                prop="singleuse"
                label="单次用量"
                align="center">
                <template slot-scope="scope">
                  <span class="elinput-wrap-onetext">
                    <numberinput
                    v-model="scope.row.singleuse"
                    :leftOffset="5"
                    :rightOffset="40"
                    :height="28">
                      <template slot="right">
                        <select slot="suffix"
                        v-model="scope.row.singleuseUnit">
                        <option value='' disabled selected hidden>单位</option>
                        <option value="pian">片</option>
                        <option value="li">粒</option>
                        <option value="ke">颗</option>
                        <option value="zhi">支</option>
                      </select>
                      </template>
                    </numberinput>
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="usemethod"
                label="用法"
                align="center">
                <template slot-scope="scope">
                  <select v-model="scope.row.usemethod">
                    <option value='' disabled selected hidden>用法</option>
                    <!-- <option value='' disabled selected hidden style='display:none;'>用法</option> -->
                    <option value="mouse">口服</option>
                    <option value="in">注射</option>
                    <option value="out">外涂</option>
                  </select>
                </template>
              </el-table-column>
              <el-table-column
                prop="usetimes"
                label="频度"
                align="center">
                <template slot-scope="scope">
                  <span class="elinput-wrap-onetext">
                    <numberinput
                    v-model="scope.row.usetimes"
                    :leftOffset="5"
                    :rightOffset="40"
                    :height="28">
                      <template slot="right">
                        <span>
                        次/天
                        </span>
                      </template>
                    </numberinput>
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="uselong"
                label="天数"
                align="center">
                <template slot-scope="scope">
                  <span class="elinput-wrap-onetext">
                      <numberinput
                      v-model="scope.row.uselong"
                      :leftOffset="5"
                      :rightOffset="20"
                      :height="28">
                        <template slot="right">
                          <span>
                          天
                          </span>
                        </template>
                      </numberinput>
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="usetotal"
                label="总量"
                align="center">
                <template slot-scope="scope">
                  <span class="elinput-wrap-onetext">
                    <numberinput
                    v-model="scope.row.usetotal"
                    :leftOffset="5"
                    :rightOffset="20"
                    :height="28">
                      <template slot="right">
                        <span>
                        盒
                        </span>
                      </template>
                    </numberinput>
                    <!-- <el-input placeholder="" v-model="scope.row.usetotal" 
                      size="mini"
                      class="input-with-select">
                      <span slot="suffix" class="input-end-text">
                        盒
                      </span>
                    </el-input> -->
                  </span>
                  <!-- <input v-number-only v-model.number="scope.row.usetotal" type="text" class="table-input use-num single-use">盒 -->
                </template>
              </el-table-column>
              <el-table-column
                prop="tip"
                label="备注"
                align="center">
                <template slot-scope="scope">
                  <el-input placeholder="" v-model="scope.row.tip" 
                    size="mini"
                    class="input-with-select">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="delete"
                label="编辑"
                width="100"
                align="center">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="deleteMedicine(scope.$index, doctorMedicine)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </div>
      </el-card>
    </div>
    <div class="submit-btn-wrap" v-if="submitBtn">
      <button class="submit-btn" @click="submitData">提交</button>
    </div>

    <el-dialog
      title="西药处方"
      :visible.sync="addMedicineDialog"
      width="50%"
      center>
      <medicine @addMedicine="addMedicineHandler"></medicine>
    </el-dialog>
    <el-dialog
      title="高血压病中医辩证分型表"
      :visible.sync="chineseMedicineDialog"
      width="50%"
      center>
      <el-table
        ref="chineseMedicineref"
        :data="chineseMedicine"
        tooltip-effect="dark"
        style="width: 100%"
        border
        @selection-change="chineseMedicineSelectionChange">
        <el-table-column
          type="selection"
          width="55"
          label="s">
        </el-table-column>
        <el-table-column
          label="辨证类型"
          prop="type"
          width="120"
          align="center"
          >
          <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
        </el-table-column>
        <el-table-column
          prop="main"
          label="主症"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="unmain"
          label="次症"
          align="center">
        </el-table-column>
      </el-table>
      <div>
        <span>注：以上凡具备一项主症和两项次症症状，即可诊断该证候成立，采取相应的中医药随访指导。</span>
      </div>
    </el-dialog>
  </div> 
</template>

<script>
import medicine from '@/components/medicine/medicine.vue'
import numberinput from './number'
import {FlupCardApi, submitFlupApi} from '@/api/components/Flup/Flup.js'
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'FlupCard',

  components: {
    medicine,
    numberinput
  },
  data () {
    return {
      loading: false,
      addMedicineDialog: false,
      chineseMedicineDialog: false,
      flupMethods: null,
      flupTime: null,
      nextFlupTime: null,
      page: {
        pageNum: 1,
        minPageNum: 1,
        pageSize: 5,
        pages: 1
      },
      nextBtn: false,
      upBtn: false,
      info: {
        name: null
      },
      body: {
        heighBlood: null,
        lowBlood: null,
        dangerLayer: 0,
        heigh: null,
        weight: null,
        heart: null,
        health: null
      },
      daily: {
        smoke: null,
        drink: null,
        sleep: null,
        sport: null

      },
      life: {
        medicine: null,
        mood: null,
        doctor: null,
        salt: null,
        symptom: [],
        bed: [],
        chinese: [],
        unmedicine: [],
        health: [],
        direct: [],
        suggest: []
      },
      doctorMedicine: [
        // {
        //   drugSpec: '5毫克x7',
        //   id: 1,
        //   kucun: 1,
        //   medicineId: 111,
        //   medicineName: '瑞泰',
        //   name: '瑞泰(雷米普利片)',
        //   price: 8,
        //   singleuse: '',
        //   singleuseUnit: 'pian',
        //   spec: '5毫克x7',
        //   tip: '',
        //   uselong: '',
        //   usemethod: 'mouse',
        //   usetimes: '',
        //   usetotal: ''
        // }
      ],
      bingfalinchuang: [
        {
          label: '糖尿病',
          value: 1
        },
        {
          label: '肾功能衰竭(血酐肌：男性>=1.5mg/dL,女性>=1.4mg/dL,蛋白质>=300mg/24h)',
          value: 2
        },
        {
          label: '心肌梗死',
          value: 3
        },
        {
          label: '心绞痛',
          value: 4
        },
        {
          label: '冠状动脉血运重建史',
          value: 5
        },
        {
          label: '慢性心力衰竭',
          value: 6
        },
        {
          label: '外周血管疾病',
          value: 7
        },
        {
          label: '脑出血',
          value: 8
        },
        {
          label: '缺血性卒中',
          value: 9
        },
        {
          label: '短暂性脑出血发作(TIA)',
          value: 10
        },
        {
          label: '视网膜病变(出血或渗出，视乳头水肿)',
          value: 11
        },
        {
          label: '以上情况全无',
          value: 0
        }
      ],
      health: [
        {
          label: '去医院确定治疗方案',
          value: 1
        },
        {
          label: '坚持按医嘱服药',
          value: 2
        },
        {
          label: '需要调整方案',
          value: 3
        },
        {
          label: '去医院进一步确诊',
          value: 4
        },
        {
          label: '定期测量血压',
          value: 5
        },
        {
          label: '增加测量血压频率',
          value: 6
        },
        {
          label: '接受技能指导(血压监测)',
          value: 7
        },
        {
          label: '阅读发放的宣传材料',
          value: 8
        },
        {
          label: '限制烟量或戒烟',
          value: 9
        },
        {
          label: '戒烟',
          value: 10
        },
        {
          label: '避免被动吸烟',
          value: 11
        },
        {
          label: '减少或不要饮酒',
          value: 12
        },
        {
          label: '限钠盐 (1斤/3人*月) ',
          value: 13
        },
        {
          label: '减少脂肪食品摄入 ',
          value: 14
        },
        {
          label: '增加鱼、禽、奶制品摄入',
          value: 15
        },
        {
          label: '增加新鲜水果蔬柔摄入',
          value: 16
        },
        // {
        //   label: '增加鱼、禽、奶制品摄入',
        //   value: 17
        // },
        {
          label: '减少谷类、面制品摄入',
          value: 17
        },
        {
          label: '开始低强度的运动',
          value: 18
        },
        {
          label: '接受技能指导（运动方法知识）',
          value: 19
        },
        {
          label: '逐步增加运动强度或延长运动时间',
          value: 20
        },
        {
          label: '逐步减少运动强度或缩短运动时间',
          value: 21
        },
        {
          label: '放松心情，调节睡眠。注意休息',
          value: 22
        }
      ],
      chineseMedicine: [
        {
          type: '阴虚阳亢证',
          main: '头部胀痛、烦躁易怒、腰膝痠软',
          unmain: '面红目赤，胁痛口苦，便秘溲黄，五心烦热，口干口渴，失眠梦遗',
          value: 1
        },
        {
          type: '气血两虚证',
          main: '头晕时作、少气乏力',
          unmain: '动则气短，头部空痛，自汗或盗汗、心悸失眠',
          value: 2
        },
        {
          type: '痰瘀互结证',
          main: '头重或痛',
          unmain: '头重如裹，胸脘痞闷，胸痛心悸，纳呆恶心，身重困倦，手足麻木',
          value: 3
        },
        {
          type: '肾精不足证',
          main: '心烦不寐、耳鸣腰酸',
          unmain: '心悸健忘、失眠梦遗、口干口渴等症',
          value: 4
        },
        {
          type: '肾阳亏虚证',
          main: '背寒恶风，腰膝酸软',
          unmain: '头痛遇冷加重，手足发冷，夜尿频数',
          value: 5
        },
        {
          type: '冲任失调证',
          main: '妇女月经来潮或更年期前后出现头痛、头晕',
          unmain: '心烦、失眠、胁痛',
          value: 6
        }
      ],
      submitBtn: false
    }
  },
  computed: {
    ...mapState(['FlupInfo'])
  },
  watch: {
    page: {
      handler: function (val) {
        if (this.FlupInfo.isFollowUp) {
          if (val.pages === 1) {
            this.nextBtn = true
            this.upBtn = true
          } else if (val.pages === 0) {
            this.nextBtn = true
            this.upBtn = true
          } else {
            if (val.pageNum === val.pages) {
              this.nextBtn = true
              this.upBtn = false
            }
            if (val.pageNum === 1) {
              this.upBtn = false
              this.nextBtn = true
            }
          }
        }
        // if (!this.FlupInfo.isFollowUp) {
        //   if (val.pageNum === 0) {
        //     this.nextBtn = true
        //     this.upBtn = false
        //     this.submitBtn = true
        //   } else {
        //     this.submitBtn = false
        //     if (val.pageNum === val.pages) {
        //       this.nextBtn = false
        //       this.upBtn = true
        //     } else {
        //       this.nextBtn = false
        //       this.upBtn = false
        //     }
        //   }
        //   // if (val.pages === 1) {
        //     // this.nextBtn = true
        //     // this.upBtn = true
        //   // } else if (val.pages === 0) {
        //   //   this.nextBtn = true
        //   //   this.upBtn = true
        //   // } else {
        //     // if (val.pageNum === val.pages) {
        //     //   this.nextBtn = true
        //     //   this.upBtn = false
        //     // }
        //     // if (val.pageNum === 0) {
        //     //   this.upBtn = false
        //     //   this.nextBtn = true
        //     // }
        //   // }
        // }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    ...mapMutations([
      'addChatFriend',
      'changeChatFriend',
      'openChatWindow'
    ]),
    addMedicine () {
      this.addMedicineDialog = true
    },
    addMedicineHandler (medicinelist) {
      this.doctorMedicine = this._.concat(this.doctorMedicine, medicinelist)
      this.addMedicineDialog = false
    },
    deleteMedicine (index, rows) {
      rows.splice(index, 1)
    },
    openChinese () {
      this.chineseMedicineDialog = true
    },
    inputchange (value) {
      console.log('input', value)
    },
    chineseMedicineSelectionChange (val) {
      let list = []
      console.log('zhongyi', val)
      if (val.length > 0) {
        val.forEach(item => {
          list.push(item.value)
        })
      }
      this.life.chinese = list
    },
    dangerLayerHandler () {
      this.$router.push({
        name: 'dangerLayer'
      })
    },
    medicineunit (val) {
      let unit = ''
      switch (val) {
        case 'pian': {
          unit = '片'
          break
        }
        case 'li': {
          unit = '粒'
          break
        }
        case 'ke': {
          unit = '颗'
          break
        }
        case 'zhi': {
          unit = '支'
          break
        }
        case 'mouse': {
          unit = '口服'
          break
        }
        case 'in': {
          unit = '注射'
          break
        }
        case 'out': {
          unit = '外服'
          break
        }
        case '片': {
          unit = 'pian'
          break
        }
        case '粒': {
          unit = 'li'
          break
        }
        case '颗': {
          unit = 'ke'
          break
        }
        case '支': {
          unit = 'zhi'
          break
        }
        case '口服': {
          unit = 'mouse'
          break
        }
        case '注射': {
          unit = 'in'
          break
        }
        case '外服': {
          unit = 'out'
          break
        }
      }
      return unit
    },
    getFlupCardData () {
      console.log('FlupInfo', this.FlupInfo)
      this.loading = true
      this.initData()
      let params = {}
      params.adminIdMainDoctor = this.FlupInfo.adminIdMainDoctor
      params.userFollowUpId = this.FlupInfo.userFollowUpId
      params.userId = this.FlupInfo.userId
      params.pageNum = this.page.pageNum
      params.pageSize = this.page.pageSize
      this.$axios(FlupCardApi(params))
      .then(res => {
        if (res.data.data.length > 0) {
          // if (this._.has(res.data.data[0], 'realName')) {
          //   this.info.name = res.data.data[0].realName
          // }
          if (this._.has(res.data.data[0], 'followUpWay')) {
            this.flupMethods = this._.toNumber(res.data.data[0].followUpWay)
          }
          if (this._.has(res.data.data[0], 'followUpTime')) {
            this.flupTime = res.data.data[0].followUpTime
          }
          if (this._.has(res.data.data[0], 'followUpUnderTime')) {
            this.nextFlupTime = res.data.data[0].followUpUnderTime
          }
          if (this._.has(res.data.data[0], 'systolic')) {
            this.body.heighBlood = res.data.data[0].systolic
          }
          if (this._.has(res.data.data[0], 'diastolic')) {
            this.body.lowBlood = res.data.data[0].diastolic
          }
          if (this._.has(res.data.data[0], 'dangerLevel')) {
            this.body.dangerLayer = this._.toNumber(res.data.data[0].dangerLevel)
          }
          if (this._.has(res.data.data[0], 'height')) {
            this.body.heigh = this._.toNumber(res.data.data[0].height)
          }
          if (this._.has(res.data.data[0], 'weight')) {
            this.body.weight = this._.toNumber(res.data.data[0].weight)
          }
          if (this._.has(res.data.data[0], 'pulse')) {
            this.body.heart = this._.toNumber(res.data.data[0].pulse)
          }
          if (this._.has(res.data.data[0], 'bmi')) {
            this.body.health = this._.toNumber(res.data.data[0].bmi)
          }
          if (this._.has(res.data.data[0], 'userHealthDiary')) {
            if (this._.has(res.data.data[0].userHealthDiary, 'smokingToday')) {
              this.daily.smoke = this._.toNumber(res.data.data[0].userHealthDiary.smokingToday)
            }
            if (this._.has(res.data.data[0].userHealthDiary, 'drinkingToday')) {
              this.daily.drink = this._.toNumber(res.data.data[0].userHealthDiary.drinkingToday)
            }
            if (this._.has(res.data.data[0].userHealthDiary, 'sleepToday')) {
              this.daily.sleep = this._.toNumber(res.data.data[0].userHealthDiary.sleepToday)
            }
            if (this._.has(res.data.data[0].userHealthDiary, 'movementToday')) {
              this.daily.sport = this._.toNumber(res.data.data[0].userHealthDiary.movementToday)
            }
            if (this._.has(res.data.data[0].userHealthDiary, 'isOntimeMedicat')) {
              this.life.medicine = this._.toNumber(res.data.data[0].userHealthDiary.isOntimeMedicat)
            }
            if (this._.has(res.data.data[0].userHealthDiary, 'moodToday')) {
              this.life.mood = this._.toNumber(res.data.data[0].userHealthDiary.moodToday)
            }
            // if (this._.has(res.data.data[0].userHealthDiary, 'moodToday')) {
            //   this.life.doctor = res.data.data[0].userHealthDiary.moodToday
            // }
            if (this._.has(res.data.data[0].userHealthDiary, 'eatSaltToday')) {
              this.life.salt = this._.toNumber(res.data.data[0].userHealthDiary.eatSaltToday)
            }
            if (this._.has(res.data.data[0].userHealthDiary, 'presentSymptoms')) {
              this.life.symptom = (res.data.data[0].userHealthDiary.presentSymptoms + '').split(',').map(item => {
                return this._.toNumber(item)
              })
            }
            if (this._.has(res.data.data[0].userHealthDiary, 'andhairClinical')) {
              this.life.bed = (res.data.data[0].userHealthDiary.andhairClinical + '').split(',').map(item => {
                return this._.toNumber(item)
              })
            }
            if (this._.has(res.data.data[0].userHealthDiary, 'inDoctoeIdentify')) {
              this.life.chinese = (res.data.data[0].userHealthDiary.inDoctoeIdentify + '').split(',').map(item => {
                return this._.toNumber(item)
              })
            }
            if (this._.has(res.data.data[0].userHealthDiary, 'nonMedicineTreatment')) {
              this.life.unmedicine = (res.data.data[0].userHealthDiary.nonMedicineTreatment + '').split(',').map(item => {
                return this._.toNumber(item)
              })
            }
            if (this._.has(res.data.data[0].userHealthDiary, 'inDoctoeCare')) {
              this.life.direct = (res.data.data[0].userHealthDiary.inDoctoeCare + '').split(',').map(item => {
                return this._.toNumber(item)
              })
            }
            if (this._.has(res.data.data[0].userHealthDiary, 'healthPrescriptionAdvice')) {
              this.life.suggest = (res.data.data[0].userHealthDiary.healthPrescriptionAdvice + '').split(',').map(item => {
                return this._.toNumber(item)
              })
            }
          }
          if (this._.has(res.data.data[0], 'userFollowUpMedicationList')) {
            if (res.data.data[0].userFollowUpMedicationList.length > 0) {
              let medicinelist = []
              res.data.data[0].userFollowUpMedicationList.forEach(item => {
                let obj = {}
                if (this._.has(item, 'id')) {
                  obj.changeid = item.id
                }
                // else {
                //   obj.changeid = null
                // }
                if (this._.has(item, 'medicineType')) {
                  obj.medicineType = item.medicineType
                } else {
                  obj.medicineType = null
                }
                if (this._.has(item, 'medicineName')) {
                  obj.name = item.medicineName
                } else {
                  obj.name = null
                }
                if (this._.has(item, 'medicineId')) {
                  obj.medicineId = item.medicineId
                } else {
                  obj.medicineId = null
                }
                if (this._.has(item, 'everyDosage')) {
                  obj.singleuse = item.everyDosage
                  obj.everyDosage = item.everyDosage
                } else {
                  obj.singleuse = null
                  obj.everyDosage = null
                }
                if (this._.has(item, 'unit')) {
                  obj.singleuseUnit = this.medicineunit(item.unit)
                } else {
                  obj.singleuseUnit = ''
                }
                if (this._.has(item, 'usageOff')) {
                  obj.usemethod = this.medicineunit(item.usageOff)
                } else {
                  obj.usemethod = ''
                }
                if (this._.has(item, 'usageTimes')) {
                  obj.usetimes = item.usageTimes
                } else {
                  obj.usetimes = null
                }
                if (this._.has(item, 'totalNumber')) {
                  obj.usetotal = item.totalNumber
                } else {
                  obj.usetotal = null
                }
                if (this._.has(item, 'remark')) {
                  obj.tip = item.remark
                } else {
                  obj.tip = null
                }
                medicinelist.push(obj)
                // if (this._.has(item, 'totalNumber')) {
                //   obj.uselong = item.totalNumber
                // }
              })
              this.doctorMedicine = medicinelist
            }
          }
        }
        // console.log('随访卡数据', this.body, this.info, this.daily, this.life)
        console.log('随访卡数据111', this.$data)
        this.page.pages = res.data.pages
        this.loading = false
        // this.page.pageSize = res.data.pages * res.data.recordCount
      })
    },
    initData () {
      // Object.assign(this.$data, this.$options.data())
      this.flupMethods = null
      this.flupTime = null
      this.nextFlupTime = null

      this.body = {
        heighBlood: null,
        lowBlood: null,
        dangerLayer: 0,
        heigh: null,
        weight: null,
        heart: null,
        health: null
      }
      this.daily = {
        smoke: null,
        drink: null,
        sleep: null,
        sport: null

      }
      this.life = {
        medicine: null,
        mood: null,
        doctor: null,
        salt: null,
        symptom: [],
        bed: [],
        chinese: [],
        unmedicine: [],
        health: [],
        direct: [],
        suggest: []
      }
      this.doctorMedicine = [
      ]
    },
    submitData () {
      let submitObj = {}
      submitObj.isFollowUp = false
      submitObj.userHealthDiaryId = this.FlupInfo.userHealthDiaryId
      submitObj.userId = this.FlupInfo.userId
      submitObj.adminIdMainDoctor = this.FlupInfo.adminIdMainDoctor
      submitObj.userFollowUpId = this.FlupInfo.userFollowUpId
      // submitObj.dangerLevel = this.body.dangerLayer
      // submitObj.followUpDay = this.flupTime      //废弃不传
      // submitObj.userHealthDiaryId = this.body.flupTime
      // submitObj.userId = this.body.flupTime
      // submitObj.adminIdMainDoctor = this.body.flupTime
      // submitObj.userFollowUpId = this.body.flupTime
      submitObj.dangerLevel = this.body.dangerLayer
      submitObj.followUpWay = this.flupMethods
      submitObj.presentSymptoms = this.life.symptom.join(',')
      submitObj.presentSymptoms = this.flupMethods
      submitObj.moodToday = this.life.mood
      submitObj.sleepToday = this.daily.sleep
      submitObj.movementToday = this.daily.sport
      submitObj.eatSaltToday = this.life.salt
      submitObj.smokingToday = this.daily.smoke
      submitObj.drinkingToday = this.daily.drink
      // submitObj.isHealthEducation = this.daily.drink
      submitObj.andhairClinical = this.life.bed.join(',')
      submitObj.inDoctoeIdentify = this.life.chinese.join(',')
      submitObj.nonMedicineTreatment = this.life.unmedicine.join(',')
      submitObj.healthEducation = this.life.health.join(',')
      submitObj.inDoctoeCare = this.life.direct.join(',')
      submitObj.healthPrescriptionAdvice = this.life.suggest.join(',')
      submitObj.systolic = this.body.heighBlood
      submitObj.diastolic = this.body.lowBlood
      submitObj.pulse = this.body.heart
      submitObj.height = this.body.heigh
      submitObj.weight = this.body.weight
      submitObj.bmi = this.body.health
      submitObj.isOntimeMedicat = this.life.medicine

      let medicine = []
      console.log('用药', this.doctorMedicine)
      this.doctorMedicine.forEach(item => {
        let obj = {}
        obj.medicineId = item.medicineId
        if (this._.has(item, 'changeid')) {
          obj.id = item.changeid
        }
        obj.medicineType = item.medicineType
        obj.medicineName = item.name
        obj.everyDosage = this._.isNaN(parseInt(item.singleuse)) ? null : parseInt(item.singleuse) + ''
        obj.unit = this.medicineunit(item.singleuseUnit)
        obj.usageTimes = this._.isNaN(parseInt(item.usetimes)) ? null : parseInt(item.usetimes) + ''
        obj.usageOff = this.medicineunit(item.usemethod)
        item.uselong = this._.isNaN(parseInt(item.uselong)) ? 0 : parseInt(item.uselong)
        obj.totalNumber = this._.isNaN(parseInt(item.usetotal)) ? null : parseInt(item.usetotal) + '盒'
        // obj.medicineId = item.id
        obj.remark = item.tip
        // if (this._.has(item, 'uselong')) {
        // } else {
        //   item.uselong = 0
        // }
        // obj.everyDosage = item.singleuse
        // obj.usageTimes = item.usetimes
        // obj.totalNumber = item.usetotal + '盒'

        medicine.push(obj)
        // obj.totalNumber
      })
      console.log('用药Submit', medicine)
      console.log('Submit随访', submitObj)
      submitObj.userFollowUpMedicationJson = JSON.stringify(medicine)
      this.$axios(submitFlupApi(submitObj))
      .then(res => {
        if (res.data.code === '0000') {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          this.$router.go(-1)
        } else {
          this.$message({
            message: res.data.msg,
            type: 'warning'
          })
        }
      })
    },
    FlupUp () {
      if (this.page.pageNum < this.page.pages) {
        this.page.pageNum ++
        this.getFlupCardData()
      } else {
        this.page.pageNum = this.page.pages
        // this.upBtn = false
      }
    },
    FlupDn () {
      // Object.assign(this.$data, this.$options.data())
      // if (!this.isFollowUp) {
      //   if (this.page.pageNum > 0) {
      //     this.page.pageNum --
      //     this.getFlupCardData()
      //   } else {
      //     this.page.pageNum = 0
      //   }
      // } else {
      if (this.page.pageNum > 1) {
        this.page.pageNum --
        this.getFlupCardData()
      } else {
        this.page.pageNum = 1
      }
      // }
    },
    call () {
      // console.log('聊天对象', )
      let rongId = 'member_' + this.FlupInfo.userId
      let sick = {
        userId: rongId,
        userImg: '',
        userName: this.info.name || '患者',
        hasMsg: false,
        currentChat: false
      }
      console.log('聊天对象sick', sick)
      this.addChatFriend(sick)
      this.changeChatFriend(sick)
      this.openChatWindow()
    }
  },
  mounted () {
    this.info.name = this.FlupInfo.userName
    this.getFlupCardData()
    if (this.FlupInfo.isFollowUp) {
      this.submitBtn = false
    } else {
      this.submitBtn = true
      // this.page.pageNum = 0
    }
  }
}
</script>

<style lang="scss" scoped>
  .flup-card{
    font-size: 14px;
  }
  .head-title{
    font-size: 24px;
    color: #041421;
    // margin-left: 12px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }
  .head-title-right{
    // ju
  }
  .voice-btn{
    background: #1991fc;
    outline: none;
    border:none;
    color: #fff;
    border-radius: 2px;
    padding: 3px;
    width: 60px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    // box-shadow: 2px 2px 2px 0px rgb(180, 184, 187);
  }
  .voice-btn:hover{
    opacity: 0.8;
  }
  .card-head-title{
    border-bottom:1px solid #ebeef5;
    padding-bottom: 10px;
    font-size: 20px;
    margin-bottom: 15px;
    color: #666;
  }
  .input-tip{
    display: inline-block;
    color: #041421;
    font-size: 14px;
    line-height: 32px;
    // width: 100px;
  }
  .elinput-wrap .el-input--prefix .el-input__inner {
    padding-left: 65px;
  }
  .elinput-wrap .el-input--suffix .el-input__inner {
    padding-right: 65px;
  }
  .bottom-gap{
    margin-bottom: 8px;
  }
  .right-gap{
    margin-right: 15px;
  }
  .flex{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
  }
  .flex-between{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
  }
  .inline-block {
    display: inline-block;
    // width: 220px;
    // margin-right: 15px;
  }
  .flup-methods-1{
    width: 250px;
  }
  .flup-methods-2{
    width: 195px;
  }
  .flup-methods-3{
    width: 225px;
  }
  .flup-methods-4{
    width: 218px;
  }
  .inline-block .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 150px;
  }
  .radio-box{
    border:1px solid #dcdfe6;
    // height: 30px;
    border-radius: 4px;
    // line-height: 32px;
    line-height: 1;
    width: 97%;
    padding: 0 10px;
    padding: 7px 5px;
  }
  .question-btn{
    // align-self: flex-end;
    // justify-self: flex-end;
    padding-right:10px;
    button{
      background: transparent;
      border:none;
      outline: none;
      cursor: pointer;
      padding: 0;
      color: #606266;
    }
  }
  .check-box-title{
    min-width: 75px;
  }
  .check-box-title-large{
    min-width: 115px;
  }
  .radio-box .el-checkbox,.radio-box .el-checkbox+.el-checkbox{
    margin-left:10px;
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
    width: 200px;
    height: 30px;
  }
  .add-btn{
    background: #1991fc;
    outline: none;
    border:none;
    color: #fff;
    border-radius: 2px;
    padding: 3px;
    width: 60px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
  }
  select{
    // width: 100%;
    // height: 28px;
    // border:1px solid #606266;
    border: none;
    // border-radius: 2px;
    outline: none;
    /*很关键：将默认的select选择框样式清除*/
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
    background: url('~icon/hospital-icon-199.png') no-repeat scroll right 3px center transparent;
    /*为下拉小箭头留出一点位置，避免被文字覆盖*/
    padding-right: 20px;
    padding-left: 4px;
    background-color:transparent;
    font-size: 14px;
    cursor: pointer;
    color: #606266;
    line-height: 1;
    // text-align: center;
  }
  /*清除ie的默认选择框样式清除，隐藏下拉箭头*/
  select::-ms-expand { display: none; }
  .input-end-text{
    display: inline-block;
    color: #606266;
    font-size: 14px;
    height: 28px;
    line-height: 28px;
  }
  .must{
    color: #f96767;
    // font-size: 18px;
  }
  // .my-input{
  //   border:none;
  //   outline: none;
  //   background: transparent;
  //   font-size: 14px;
  //   height: 28px;
  //   border:1px solid #dcdfe6;
  //   border-radius: 4px;
  //   width: 100%;
  //   padding-left: 60px;
  // }
  // .my-input-wrap{
  //   position: relative;
  //   max-width: 1080px;
  //   // border:1px solid #dcdfe6;
  // }
  // // .my-input:focus .my-input-wrap{
  // //   border:1px solid #1991fc;
  // //   border-radius: 4px;
  // // }
  // .my-input:focus {
  //   border:1px solid #1991fc;
  //   border-radius: 4px;
  // }
  // .my-input-q{
  //   position: absolute;
  //   top:0;
  //   left: 5px;
  //   height: 100%;
  //   text-align: center;
  //   line-height: 1;
  //   vertical-align: baseline;
  //   display: inline-block;
  //   font-size: 14px;
  //   padding-top: 10px;
  //   // display: table-cell;
  // }
  // .my-input-h{
  //   position: absolute;
  //   right: 5px;
  //   top:0;
  //   height: 100%;
  //   font-size: 14px;
  //   padding-top: 10px;
  // }
  // .my-input:focus .my-input-wrap{
  //   border:1px solid #1991fc;
  //   border-radius: 4px;
  // }
</style>
<style lang="scss">
  .elinput-wrap-onetext .el-input--suffix .el-input__inner {
    padding-right: 40px;
  }
  .elinput-wrap-small .el-input--prefix .el-input__inner {
    padding-left: 60px;
  }
  .elinput-wrap-small .el-input--suffix .el-input__inner {
    padding-right: 60px;
  }
  .elinput-wrap-middle .el-input--prefix .el-input__inner {
    padding-left: 75px;
  }
  .elinput-wrap-middle .el-input--suffix .el-input__inner {
    padding-right: 70px;
  }
  .elinput-wrap-mini .el-input--prefix .el-input__inner {
    padding-left: 45px;
  }
  .elinput-wrap-mini .el-input--suffix .el-input__inner {
    padding-right: 45px;
  }
  .inline-block.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 150px;
  }
  .radio-box .el-checkbox{
    margin-left:10px;
  }
</style>


