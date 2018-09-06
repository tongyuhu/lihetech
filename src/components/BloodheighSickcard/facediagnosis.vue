<template>
    <div class="face-wrap">
      <div class="case-wrap" v-if="showface">
        <div class="case-head clear">
          <!-- <div class="case-head-btn">
            <el-button type="primary" @click="complete">完成就诊</el-button>
            <el-button type="primary" @click="dayin">打印处方</el-button>
          </div> -->
        </div>

        <div class="face-case">

          <div class="case-left">
            <div class="case-left-img">
              <div class="case-left-img-wrap">
                <img :src="info.img" alt="">
              </div>
            </div>
            <div class="case-left-type">
              <span class="case-left-type-name">{{info.name}}</span>
              <span>性别:{{medication.sex==='man' ? '男' :'女'}}</span>
              <!-- <span class="case-left-type-se">治疗中</span> -->
            </div>
            <div class="case-left-btn">
              <el-button type="primary" @click="histroySickcard" size="mini">历史病历</el-button>
              <el-button type="primary" @click="completeInfo" size="mini">完善信息</el-button>
            </div>
            <div class="case-left-msg">
              <!-- <div class="case-left-msg-single">
                <span class="label">性别：</span>
                <span v-if="!showEditMsg">{{info.sex === 'man' ? '男' : '女'}}</span>

                <el-select class="el-input-cls" v-if="showEditMsg" v-model="copyInfo.sex" size="mini">
                  <el-option label="男" value="man"></el-option>
                  <el-option label="女" value="woman"></el-option>
                </el-select> -->
                <!-- <select v-if="showEditMsg" v-model="copyInfo.sex">
                  <option value="man">男</option>
                  <option value="woman">女</option>
                </select> -->
                <!-- <input type="text" v-if="showEditMsg" v-model="info.sex"> -->
              <!-- </div> -->
              <div class="case-left-msg-single">
                <span v-if="!showEditMsg" class="label">电话：</span>
                <span v-if="!showEditMsg">{{info.phone ? info.phone:''}}</span>

                <numberinput
                v-model="copyInfo.phone"
                v-if="showEditMsg" 
                :leftOffset="40"
                :rightOffset="5"
                :height="28">
                  <template slot="left">
                    <span>
                    电话：
                    </span>
                  </template>
                </numberinput>
                <!-- <el-input class="el-input-cls" v-if="showEditMsg" v-model.number="copyInfo.phone" size="mini"></el-input> -->
                <!-- <input type="text" v-if="showEditMsg" v-model.number="copyInfo.age" class="padding"> -->
              </div>
              <div class="case-left-msg-single">
                <span v-if="!showEditMsg" class="label">年龄：</span>
                <span v-if="!showEditMsg">{{info.age ? info.age+'岁':''}}</span>

                <numberinput
                v-model="copyInfo.age"
                v-if="showEditMsg" 
                :leftOffset="40"
                :rightOffset="20"
                :height="28">
                  <template slot="left">
                    <span>
                    年龄：
                    </span>
                  </template>
                  <template slot="right">
                    <span>
                    岁
                    </span>
                  </template>
                </numberinput>
                <!-- <el-input class="el-input-cls" v-if="showEditMsg" v-model.number="copyInfo.age" size="mini"></el-input> -->
                <!-- <input type="text" v-if="showEditMsg" v-model.number="copyInfo.age" class="padding"> -->
              </div>
              <div class="case-left-msg-single">
                <span v-if="!showEditMsg" class="label">身高：</span>
                <span v-if="!showEditMsg">{{info.heigh ? info.heigh+'cm':''}}</span>
                <numberinput
                v-model="copyInfo.heigh"
                v-if="showEditMsg" 
                :leftOffset="40"
                :rightOffset="20"
                :height="28">
                  <template slot="left">
                    <span>
                    身高：
                    </span>
                  </template>
                  <template slot="right">
                    <span>
                    cm
                    </span>
                  </template>
                </numberinput>
                <!-- <el-input class="el-input-cls" v-if="showEditMsg" v-model.number="copyInfo.heigh" size="mini"></el-input> -->
                <!-- <input type="text" v-if="showEditMsg" v-model.number="copyInfo.heigh" class="padding"> -->
              </div>
              <div class="case-left-msg-single">
                <span v-if="!showEditMsg" class="label">体重：</span>
                <span v-if="!showEditMsg">{{info.weight ? info.weight+'kg':''}}</span>

                <numberinput
                v-model="copyInfo.weight"
                v-if="showEditMsg" 
                :leftOffset="40"
                :rightOffset="20"
                :height="28">
                  <template slot="left">
                    <span>
                    体重：
                    </span>
                  </template>
                  <template slot="right">
                    <span>
                    kg
                    </span>
                  </template>
                </numberinput>
                <!-- <el-input class="el-input-cls" v-if="showEditMsg" v-model.number="copyInfo.weight" size="mini"></el-input> -->
                <!-- <input type="text" v-if="showEditMsg" v-model.number="copyInfo.weight" class="padding"> -->
              </div>
              <div class="case-left-msg-single">
                <span v-if="!showEditMsg" class="label"> BMI： </span>
                <span v-if="!showEditMsg">{{info.BMI}}</span>

                <numberinput
                v-model="copyInfo.BMI"
                v-if="showEditMsg" 
                :leftOffset="40"
                :rightOffset="10"
                :height="28">
                  <template slot="left">
                    <span>
                    BMI：
                    </span>
                  </template>
                  <!-- <template slot="right">
                    <span>
                    kg
                    </span>
                  </template> -->
                </numberinput>
                <!-- <el-input class="el-input-cls" v-if="showEditMsg" v-model.number="copyInfo.BMI" size="mini"></el-input> -->
                <!-- <input type="text" v-if="showEditMsg" v-model.number="copyInfo.BMI" class="padding"> -->
              </div>
              <!-- <div class="case-left-msg-single">
                <span class="label">体温：</span>
                <span v-if="!showEditMsg">{{info.tem ? info.tem+'℃':''}}</span>
                <el-input class="el-input-cls" v-if="showEditMsg" v-model.number="copyInfo.tem" size="mini"></el-input>
              </div> -->
              <div class="case-left-msg-single">
                <span v-if="!showEditMsg" class="label">血压：</span>
                <span v-if="!showEditMsg">{{info.bloodHeigh}}</span>

                <numberinput
                class="gap-bottom-large"
                v-model="copyInfo.bloodHeighBlood"
                v-if="showEditMsg" 
                :leftOffset="40"
                :rightOffset="10"
                :height="28"
                >
                  <template slot="left">
                    <span>
                    高压:
                    </span>
                  </template>
                  <!-- <template slot="right">
                    <span>
                    min
                    </span>
                  </template> -->
                </numberinput>
                <numberinput
                v-model="copyInfo.bloodLowBlood"
                v-if="showEditMsg" 
                :leftOffset="40"
                :rightOffset="10"
                :height="28">
                  <template slot="left">
                    <span>
                    低压:
                    </span>
                  </template>
                  <!-- <template slot="right">
                    <span>
                    min
                    </span>
                  </template> -->
                </numberinput>
                <!-- <el-input class="el-input-cls-xueya" placeholder="高压" v-if="showEditMsg" v-model.number="copyInfo.bloodHeighBlood" size="mini"></el-input>
                <span v-if="showEditMsg">/</span>
                <el-input class="el-input-cls-xueya" placeholder="低压" v-if="showEditMsg" v-model.number="copyInfo.bloodLowBlood" size="mini"></el-input> -->
                <!-- <input type="text" v-if="showEditMsg" v-model.lazy="copyInfo.bloodHeigh" class="padding"> -->
              </div>
              <div class="case-left-msg-single">
                <span v-if="!showEditMsg" class="label">脉搏：</span>
                <span v-if="!showEditMsg">{{info.pulse ? info.pulse+'/min':''}}</span>
                <numberinput
                v-model="copyInfo.pulse"
                v-if="showEditMsg" 
                :leftOffset="40"
                :rightOffset="10"
                :height="28">
                  <template slot="left">
                    <span>
                    脉搏：
                    </span>
                  </template>
                  <template slot="right">
                    <span>
                    min
                    </span>
                  </template>
                </numberinput>
                <!-- <el-input class="el-input-cls" v-if="showEditMsg" v-model.number="copyInfo.pulse" size="mini"></el-input> -->
                <!-- <input type="text" v-if="showEditMsg" v-model.number="copyInfo.pulse" class="padding"> -->
              </div>
            </div>
            <div class="gap-bottom">
              <el-button type="primary" v-if="showEditMsg" size="mini" @click="cancelInfo">取消</el-button>
              <el-button type="primary" v-if="showEditMsg" size="mini" @click="saveInfo">保存</el-button>
            </div>
            <div>
              <el-button @click="openChecklist" type="text" size="mini">体检单</el-button>
              <el-button @click="flupHistory" type="text" size="mini">随访记录</el-button>
            </div>

          </div> 

          <div class="case face">
            <div class="case-main">
              <div class="case-main-content">
                <div class="case-main-title">
                  <span>上海立阖泰医疗统一处方笺</span>
                </div>
                <div>
                  <el-form
                  label-width="45px" 
                  :label-position="labelPosition">
                  <!-- <div class="flex"> -->
                  <div class="fist-line">
                    <div class="line-block  gap-right">
                      <div class="line-block">
                        <span class="iconfont icon-bixutian must"></span>
                      </div>
                      <div class="line-block">
                        <el-form-item label="" label-width="8px">
                          <el-select v-model="medication.isfirst" placeholder="请选择" size="mini" :style="{'width':'100px'}">
                            <el-option label="初诊" value="1"></el-option>
                            <el-option label="复诊" value="0"></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="line-block gap-right">
                      <!-- <el-form-item label="患病时长：" label-width="85px"> -->
                        <el-form-item label="患病开始时间：" label-width="113px">
                          <el-date-picker
                            v-model="medication.bloodPressureSickStart"
                            type="month"
                            size="mini"
                            value-format="yyyy-MM"
                            placeholder="选择月"
                            :style="{'width':'120px'}">
                          </el-date-picker>
                        </el-form-item>
                        
                        <!-- <div class="line-block color-face">
                          患病开始时间：
                        </div>
                        <div class="line-block">
                          <el-date-picker
                            v-model="medication.bloodPressureSickStart"
                            type="month"
                            size="mini"
                            value-format="yyyy-MM"
                            placeholder="选择月">
                          </el-date-picker>
                        </div> -->
                        <!-- <div class="line-block sick-time-width color-face">
                          <numberinput
                          v-model="medication.year"
                          :leftOffset="5"
                          :rightOffset="20"
                          :height="28">
                            <template slot="right">
                              <span>
                              年
                              </span>
                            </template>
                          </numberinput>
                        </div>
                        <div class="line-block sick-time-width color-face">
                          <numberinput
                          v-model="medication.month"
                          :leftOffset="5"
                          :rightOffset="20"
                          :height="28">
                            <template slot="right">
                              <span>
                              月
                              </span>
                            </template>
                          </numberinput>
                        </div>
                        <div class="line-block sick-time-width color-face">
                          <numberinput
                          v-model="medication.day"
                          :leftOffset="5"
                          :rightOffset="20"
                          :height="28">
                            <template slot="right">
                              <span>
                              天
                              </span>
                            </template>
                          </numberinput>
                        </div> -->
                    </div>

                    <div class="line-block color-face">
                      <el-form-item label="" label-width="18px">

                        <div class="line-block  flex flex-between">
                          <div class="flex gap-right">
                            <span>当前分层：</span>
                            <span :style="{'color':computeDanger(medication.dangerLevel)}">{{medication.dangerLevel?danger(medication.dangerLevel):'未分层'}}</span>
                          </div>
                          <div>
                            <span>
                              <el-button @click="goLayer" type="text" size="mini" style="{'height':'24px'}">重新分层</el-button>
                            </span>
                          </div>
                        </div>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="gap-bottom">
                    <el-form-item label="主述：" label-width="101px">
                      <el-input v-model="medication.symptom" size="mini" placeholder="请输入症状"></el-input>
                    </el-form-item>
                  </div>
                  <div class="gap-bottom">
                    <el-form-item label="现病史：" label-width="101px">
                      <div class="el-select-wrap">
                        <el-select size="mini" 
                        v-model="medication.sickHistroy" 
                        multiple 
                        placeholder="请选择病史"
                        :loading="loading"
                        >                
                          <el-option
                            v-for="(item,index) in bingshiList"
                            :key="index"
                            :label="item.illnessName"
                            :value="item.id">
                          </el-option>
                        </el-select>

                      </div>
                    </el-form-item>
                  </div>
                  <div class="gap-bottom">
                    <el-form-item label="遗传史：" label-width="101px">
                      <div class="el-select-wrap">
                        <el-select size="mini" 
                        v-model="medication.inhereHistroy" 
                        multiple 
                        placeholder="请选择遗传史"
                        :loading="loading">
                          <el-option
                            v-for="(item,index) in yichuanshiList"
                            :key="index"
                            :label="item.illnessName"
                            :value="item.id">
                          </el-option>
                        </el-select>

                      </div>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="检查项目：" label-width="101px">
                      <el-select
                        v-model="medication.checkItem"
                        size="mini"
                        :style="{'width':'100%'}"
                        multiple
                        filterable
                        allow-create
                        default-first-option
                        placeholder="请添写项目标签"
                        no-data-text="填写标签按Enter确认">
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="flex">
                    <div>
                      <span class="iconfont icon-bixutian must"></span>
                    </div>
                    <div class="gap-right">
                      <el-form-item label="诊断编码：" label-width="85px">
                        <el-select v-model="bloodSickCode" placeholder="请选择" @change="sickCodeChange" size="mini" :style="{'width':'100%'}">
                          <el-option
                            v-for="item in bloodSickCodeList"
                            :key="item.id"
                            :label="item.diseaseCode"
                            :value="item.id"
                            >
                            <span style="float: left">{{ item.diseaseCode }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.diseaseName }}</span>
                          </el-option>
                        </el-select>
                        <!-- <el-select v-model="medication.isfirst" placeholder="请选择" size="mini">
                          <el-option label="I13.251" value="1"></el-option>
                          <el-option label="I13.908" value="0"></el-option>
                        </el-select> -->
                      </el-form-item>
                    </div>
                    <div class="flex-grow">
                      <el-form-item label="确诊疾病：" label-width="85px">
                        <el-input disabled v-model="medication.sureSick" :style="{'width':'100%'}" size="mini"></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="flex">
                    <div>
                      <span class="iconfont icon-bixutian must"></span>
                    </div>
                    <div class="flex-grow">
                      <el-form-item label="医嘱：" label-width="85px">
                        <el-input v-model="medication.doctorTip" placeholder="请输入医嘱" size="mini"></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  
                  <el-row :gutter="10">
                    <!-- <el-col :span="6">
                      <el-form-item label="姓名">
                        <el-input v-model="medication.name" size="mini"></el-input>
                      </el-form-item>
                    </el-col> -->

                    <!-- <el-col :span="11">
                      <el-form-item label="患病时长" label-width="68px"
                      >
                        <div class="pick-date-wrap">
                              <input v-number-only v-model.number="medication.year" type="text">
                              <span>年</span>
                            <input v-number-only v-model.number="medication.month" type="text">
                            <span>月</span>
                            <input v-number-only v-model.number="medication.day" type="text">
                            <span>天</span>
                        </div>
                      </el-form-item>
                    </el-col> -->

                    <!-- <el-col :span="7">
                      <el-form-item label="电话" label-width="45px">
                        <el-input v-model.number="medication.phone" size="mini"></el-input>
                      </el-form-item>
                    </el-col> -->
                  </el-row>
                  <el-row :gutter="10">
                    <!-- <el-col :span="6">
                      <el-form-item label="性别" label-width="45px">
                        <el-select v-model="medication.sex" placeholder="性别" size="mini">
                          <el-option label="男" value="man"></el-option>
                          <el-option label="女" value="woman"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col> -->

                    <!-- <el-col :span="6">
                      <el-form-item label="" label-width="8px">
                        <el-select v-model="medication.isfirst" placeholder="请选择" size="mini">
                          <el-option label="初诊" value="1"></el-option>
                          <el-option label="复诊" value="0"></el-option>
                        </el-select>
                      </el-form-item>

                    </el-col> -->

                    <!-- <el-col :span="12">
                      <div class="time-picker">
                        <el-form-item label="上次就诊时间" label-width="100px">
                          <el-date-picker
                            size="mini"
                            v-model="medication.lastTime"
                            type="date"
                            placeholder="选择日期">
                          </el-date-picker>
                        </el-form-item>

                      </div>
                    </el-col> -->
                  </el-row>
                  <el-row>
                    <!-- <el-col>
                      <el-form-item label="病史" label-width="60px">
                        <div class="el-select-wrap">
                          <el-select size="mini" 
                          v-model="medication.sickHistroy" 
                          multiple 
                          placeholder="请选择病史"
                          :loading="loading"
                          >                
                            <el-option
                              v-for="(item,index) in bingshiList"
                              :key="index"
                              :label="item.illnessName"
                              :value="item.id">
                            </el-option>
                          </el-select>

                        </div>
                      </el-form-item>
                    </el-col> -->
                  </el-row>
                  <el-row>
                    <!-- <el-col>
                      <el-form-item label="遗传史" label-width="60px">
                        <div class="el-select-wrap">
                          <el-select size="mini" 
                          v-model="medication.inhereHistroy" 
                          multiple 
                          placeholder="请选择遗传史"
                          :loading="loading">
                            <el-option
                              v-for="(item,index) in yichuanshiList"
                              :key="index"
                              :label="item.illnessName"
                              :value="item.id">
                            </el-option>
                          </el-select>

                        </div>
                      </el-form-item>
                    </el-col> -->
                  </el-row>
                  <!-- <el-row>
                    <el-col>
                      <el-form-item label="并发症" label-width="60px">
                        <div class="el-select-wrap">
                          <el-select size="mini" 
                          v-model="medication.complication" 
                          multiple 
                          placeholder="请选择并发症"
                          :loading="loading">
                            <el-option
                              v-for="item in gaoxueyabingfazhengList"
                              :key="item.id"
                              :label="item.illnessName"
                              :value="item.id">
                            </el-option>
                          </el-select>

                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row> -->
  
                  
                  <!-- <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="抽烟情况" label-width="68px">
                        <el-select v-model="medication.smoking" placeholder="抽烟情况" size="mini">
                          <el-option label="抽烟" value="1"></el-option>
                          <el-option label="不抽烟" value="2"></el-option>
                          <el-option label="已戒烟" value="3"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="喝酒情况" label-width="68px">
                        <el-select v-model="medication.drinking" placeholder="请选择" size="mini">
                          <el-option label="从不喝酒" value="1"></el-option>
                          <el-option label="偶尔喝酒" value="2"></el-option>
                          <el-option label="经常喝酒" value="3"></el-option>
                          <el-option label="每天喝酒" value="4"></el-option>
                        </el-select>
                      </el-form-item>

                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="入寝时间" label-width="68px">
                        <el-select v-model="medication.is23Sleep" placeholder="请选择" size="mini">
                          <el-option-group
                          label="是否23点之前休息">
                            <el-option label="23点之前" value="1"></el-option>
                            <el-option label="23点之后" value="0"></el-option>

                          </el-option-group>
                        </el-select>
                      </el-form-item>

                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="睡眠规律" label-width="68px">
                        <el-select v-model="medication.sleepStatus" placeholder="请选择" size="mini">
                          <el-option-group
                          label="睡眠规律不规律">
                            <el-option label="规律" value="1"></el-option>
                            <el-option label="不规律" value="2"></el-option>
                          </el-option-group>
                        </el-select>
                      </el-form-item>

                    </el-col>

                  </el-row> -->

                  <el-row :gutter="10">
                    <!-- <el-col :span="12">
                      <el-form-item label="检查项目" label-width="68px">
                        <el-select
                          v-model="medication.checkItem"
                          size="mini"
                          multiple
                          filterable
                          allow-create
                          default-first-option
                          placeholder="请添写项目标签"
                          no-data-text="填写标签按Enter确认">
                        </el-select>
                      </el-form-item>
                    </el-col> -->
                    <!-- <el-col :span="12">
                      <el-form-item label="确诊疾病" label-width="68px">
                        <el-input v-model="medication.sureSick" size="mini"></el-input>
                      </el-form-item>

                    </el-col> -->
                  </el-row>
                  <el-row>
                    <!-- <el-col>
                      <el-form-item label="自述" label-width="68px">
                        <el-input v-model="medication.symptom" size="mini"></el-input>
                      </el-form-item>
                    </el-col> -->
                  </el-row>
                  <!-- <el-row>
                    <el-col>
                      <el-form-item label="诊断信息" label-width="68px">
                        <el-input v-model="medication.diagnosisMsg" size="mini"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row> -->
                  <el-row>
                    <!-- <el-col>
                      <el-form-item label="医嘱" label-width="68px">
                        <el-input v-model="medication.doctorTip" size="mini"></el-input>
                      </el-form-item>
                    </el-col> -->
                  </el-row>
                  </el-form>
                  <div class="case-main-rp">
                    <div class="case-main-rp-title">
                      <span class="iconfont icon-bixutian must"></span>
                      <span>RP</span>
                      <el-button @click="openAddMedicineDialog" type="primary" size="mini">添加</el-button>
                    </div>
                    <!-- max-height="400" -->
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
                        width="55">
                      </el-table-column>
                      <el-table-column
                        show-overflow-tooltip
                        prop="name"
                        label="名称">
                      </el-table-column>
                      <el-table-column
                        prop="singleuse"
                        label="单次用量"
                        width="100"
                        >
                        <template slot-scope="scope">
                          <numberinput
                          v-model="scope.row.singleuse"
                          :leftOffset="5"
                          :rightOffset="40"
                          :height="28"
                          >
                            <template slot="right">
                              <select slot="suffix" v-model="scope.row.singleuseUnit">
                              <option value="pian">片</option>
                              <option value="li">粒</option>
                              <option value="ke">颗</option>
                              <option value="zhi">支</option>
                            </select>
                            </template>
                          </numberinput>
                          <!-- <input v-number-only  type="text"  v-model.number="scope.row.singleuse" class="table-input use-num single-use">
                          <select class="use-num" v-model="scope.row.singleuseUnit">
                            <option value="pian">片</option>
                            <option value="li">粒</option>
                            <option value="ke">颗</option>
                            <option value="zhi">支</option>
                          </select> -->
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="usemethod"
                        label="用法"
                        width="75">
                        <template slot-scope="scope">
                          <select v-model="scope.row.usemethod">
                            <option value="mouse">口服</option>
                            <option value="in">注射</option>
                            <option value="out">外涂</option>
                          </select>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="usetimes"
                        label="频度"
                        width="100">
                        <template slot-scope="scope">
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
                          <!-- <input v-number-only type="text" v-model.number="scope.row.usetimes" class="table-input use-num single-use">次/天 -->
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="uselong"
                        label="天数"
                        width="95">
                        <template slot-scope="scope">
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
                          <!-- <input v-number-only v-model.number="scope.row.uselong" type="text" class="table-input use-num single-use"> -->
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="usetotal"
                        label="总量"
                        width="95">
                        <template slot-scope="scope">
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
                          <!-- <input v-number-only v-model.number="scope.row.usetotal" type="text" class="table-input use-num single-use">盒 -->
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="tip"
                        label="备注">
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.tip"
                          size="mini"></el-input>
                          <!-- <input v-model="scope.row.tip" type="text" class="table-input  width-tip" > -->
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
                  </div>
                  <div>
                    <div class="case-main-footer">
                      医生：{{adminInfo.name}}
                    </div>
                  </div>
                </div>

                <div class="submit-btn">
                  <el-button type="primary" @click="complete" size="mini">完成就诊</el-button>
                  <el-button type="primary" @click="dayin" size="mini">打印处方</el-button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <el-dialog
        title="西药处方"
        :visible.sync="addMedicineDialog"
        width="50%"
        center>
        <medicine @addMedicine="addMedicineHandler"></medicine>
      </el-dialog>

      <div class="print-wrap">
        <div id="print" class="print">
        <!-- <div id="print"> -->
          <div class="title">
            <p>上海立阖泰科技</p>
            <p>门诊检查单</p>
          </div>
          <div class="bottom-boder cardnum">
            <span>医疗证/医保卡号：</span>
          </div>
          <div class="bottom-boder">
            <div class="base-info">
              <span>姓名：{{info.name}}</span>
              <span>性别：{{info.sex === 'man' ? '男':'女'}}</span>
              <span>年龄：{{info.age?info.age+'岁':''}}</span>
              <!-- <span>科室：{{footerData.type}}</span> -->
              <!-- <span>费别：{{footerData.total}}</span> -->
            </div>
            <!-- <div class="info-card">
              <span>电话：{{medication.phone}}</span>
            </div> -->
            <div class="info-card">
              <span>诊断：{{medication.sureSick}}</span>
              <span>开具时间：{{currentDate}}</span>
            </div>
          </div>
          <div class="bottom-boder diagnos">
            <p>
              <span>主诉：{{medication.symptom}}</span>
            </p>
            <p>
              <span>现病史：{{bingshiStr}}</span>
            </p>
            <p>
              <span>遗传史：{{yichuanshiStr}}</span>
            </p>
            <!-- <p>
              <span>过敏史：</span>
            </p> -->
            <p>
              <span>检查项目：{{jianchaxiangmu}}</span>
            </p>
            <p>
              <span>医嘱：{{medication.doctorTip}}</span>
            </p>
            <p>
              <span>西药处方</span>
            </p>
            <div>
              <table>
                <tr v-for="(item,index) in printdoctorMedicine" :key="index">
                  <td>{{item.name}}</td>
                  <td>{{item.use}}</td>
                  <td>{{item.method}}</td>
                  <td>{{item.times}}</td>
                  <td>{{item.long}}</td>
                  <td>{{item.total}}</td>
                </tr>
              </table>
              <!-- <el-table
              ref="multipleTable"
              :data="printdoctorMedicine"
              tooltip-effect="dark"
              style="width: 100%"
              border
              >
                <el-table-column
                  show-overflow-tooltip
                  prop="name"
                  label="名称"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="use"
                  label="单次用量"
                  width="100"
                  align="center"
                  >
                </el-table-column>
                <el-table-column
                  prop="method"
                  label="用法"
                  width="75"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="times"
                  label="频度"
                  width="100"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="long"
                  label="天数"
                  width="95"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="total"
                  label="总量"
                  width="95"
                  align="center">
                </el-table-column>
              </el-table> -->
            </div>
          </div>
          <div class="print-footer">
            <p>签字医生：{{adminInfo.name}}</p>
          </div>
        </div>
      </div>
    </div>
  <!-- </div> -->
</template>

<script>
import tabs from '@/components/tabs.vue'
import pane from '@/components/pane.vue'
import medicine from '@/components/medicine/medicine.vue'
import addMedicine from '@/components/addMedicine.vue'
import addSport from '@/components/addSport.vue'
import addFood from '@/components/addFood.vue'
import searchMedicine from '@/components/searchMedicine.vue'
import numberinput from './../../components/Flup/number'
import {bloodheighSickApi, sickApi, modifyCardApi, sickCodeApi} from '@/api/components/BloodheighSickcard/bloodheighSick'
import {mapState, mapMutations} from 'vuex'
// import Bus from '@/bus.js'
import {dateFormat} from './../../untils/date.js'
import { print } from '@/untils/print.js'
// import {bloodheighSickDataApi, bloodheighSickApi, sickApi} from '@/api/components/BloodheighSickcard/bloodheighSick'
export default {
  name: 'facediagnosis',
  directives: {
    numberOnly: {
      bind: function (el) {
        el.handler = function () {
          el.value = el.value.replace(/\D+/, '')
        }
        el.addEventListener('input', el.handler)
      },
      // update: function (el) {
      //   el.handler = function () {
      //     el.value = el.value.replace(/\D+/, '')
      //   }
      //   el.addEventListener('input', el.handler)
      // }
      unbind: function (el) {
        el.removeEventListener('input', el.handler)
      }
    }
  },
  components: {
    tabs,
    pane,
    medicine,
    addMedicine,
    searchMedicine,
    addSport,
    addFood,
    numberinput
  },
  props: {
    sickID: {
      type: [Number, String],
      default: null
    },
    hospitalId: {
      type: [Number, String],
      default: null
    }
  },
  data () {
    return {
      currentDate: '',
      labelPosition: 'right',
      rightlabel: 'right',
      cardData: {},
      activeIndex: 1,
      showEditMsg: false,
      showface: true,
      medicineList: [
        // {
        //   name: '王小虎',
        //   spec: '上海市普陀',
        //   kucun: '上海市普陀',
        //   price: '上海市普518 弄'
        // }
      ],
      multipleSelection: [],
      info: {
        name: '',
        sex: 'man',
        age: '',
        heigh: null,
        weight: null,
        BMI: null,
        tem: null,
        // bloodHeigh: '',
        pulse: '',
        img: '',
        bloodHeighBlood: null,
        bloodLowBlood: null,
        phone: ''
      },
      copyInfo: {},
      medication: {
        name: '',
        sickDuration: '',
        year: null,
        month: null,
        day: null,
        phone: '',
        sex: 'man',
        isfirst: '1',
        sickHistroy: [],
        inhereHistroy: [],
        habit: '',
        checkItem: [],
        complication: [],
        sureSick: '',
        lastTime: '',
        symptom: '',
        hospitalMsg: '',
        doctorTip: '',
        smoking: '',
        drinking: '',
        is23Sleep: '',
        sleepStatus: '',
        diagnosisMsg: '',
        dangerLevel: '',
        bloodPressureSickStart: ''
      },
      doctorMedicine: [],
      printdoctorMedicine: [],
      footerData: {
        doctor: '',
        type: '',
        total: ''
      },
      addSportData: [
        {
          title: '最轻运动',
          subtitle: '80千卡/30min',
          itemlist: ['散步', '购物', '散步', '购物'],
          initNum: 30,
          step: 10,
          num: null
        },
        {
          title: '最轻运动',
          subtitle: '80千卡/20min',
          itemlist: ['散步', '购物', '散步', '购物'],
          initNum: 20,
          step: 5,
          num: null

        },
        {
          title: '最轻运动',
          subtitle: '80千卡/10min',
          itemlist: ['散步', '购物', '购物', '散步', '购物'],
          initNum: 10,
          step: 5,
          num: null
        },
        {
          title: '最轻运动',
          subtitle: '80千卡/5min',
          itemlist: ['散步', '购物', '散步', '购物', '散步', '购物'],
          initNum: 5,
          step: 5,
          num: null
        }
      ],
      addFoodData: [
        {
          food: '减少钠盐',
          isChoose: false
        },
        {
          food: '多食优质蛋白质',
          isChoose: false
        },
        {
          food: '限制饮酒',
          isChoose: false
        },
        {
          food: '低脂饮食',
          isChoose: false
        },
        {
          food: '多吃蔬菜水果',
          isChoose: false
        },
        {
          food: '补充维生素C',
          isChoose: false
        }
      ],
      foodlist: [],
      bingshiList: [
      ],
      yichuanshiList: [],
      gaoxueyabingfazhengList: [],
      bingshi: [],
      yichuanshi: [],
      bingshiStr: '',
      yichuanshiStr: '',
      jianchaxiangmu: '',
      loading: false,
      // // 添加或修改病历
      // modify: false,
      // 病历卡id
      id: null,
      year: [],
      month: [],
      day: [],
      canPrint: false,
      addMedicineDialog: false,
      adminHospitalId: null,
      bloodSickCodeList: [],
      bloodSickCode: null,
      sugerSickCodeList: [],
      adminIdMainDoctor: null
    }
  },
  watch: {
    info: {
      handler: function () {

      },
      deep: true,
      immediate: true
    },
    medication: {
      handler: function (val) {
        if (this.medication.sickHistroy.length !== 0) {
          this.medication.sickHistroy.forEach(item => {
            if (item) {
              let i = this._.findIndex(this.bingshiList, function (o) {
                return o.id === item
              })
              if (i !== -1) {
                this.bingshi.push(this.bingshiList[i].illnessName)
              }
            }
          })
        }
        if (this.medication.inhereHistroy.length !== 0) {
          this.medication.inhereHistroy.forEach(item => {
            if (item) {
              let i = this._.findIndex(this.yichuanshiList, function (o) {
                return o.id === item
              })
              if (i !== -1) {
                this.yichuanshi.push(this.yichuanshiList[i].illnessName)
              }
            }
          })
        }
        if (this.medication.checkItem.length !== 0) {
          // this._.ui
          // this.jianchaxiangmu = this._.uniqWith(this.jianchaxiangmu, this._.isEqual)
          this.jianchaxiangmu = this.medication.checkItem.join(',')
        }
        this.bingshi = this._.uniqWith(this.bingshi, this._.isEqual)
        this.yichuanshi = this._.uniqWith(this.yichuanshi, this._.isEqual)
        this.bingshiStr = this.bingshi.join(',')
        this.yichuanshiStr = this.yichuanshi.join(',')
      },
      deep: true,
      immediate: true
    },
    doctorMedicine: {
      handler: function (val) {
        if (val.length > 0) {
          val.forEach(item => {
            console.log('item.singleuse', item.singleuse)
            let a = parseInt(item.singleuse)
            if (this._.isNaN(a)) {
              item.singleuse = ''
            } else {
              item.singleuse = a
            }
          })
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations(['setuserCasesCardId', 'setuserMakeOrderDoctorId', 'SET_FLUP_INFO', 'changeCurrentSickInfo']),
    handleInput (e) {
      this.val = e.target.value.replace(/-?[1-9]\d*/g, '')
      // e.target.value = e.target.value.replace(/-?[1-9]\d*/g, '')
    },
    // 获取病历卡信息
    getData () {
      // if()
      let params = {
        userId: this.sickID,
        adminHospitalId: this.hospitalId,
        userCasesCardId: this.userCasesCardId
      }
      // if (this.id) {
      // console.log('this.id', this.id)
      // params.userCasesCardId = this.$route.params.userCasesCardId
      // }
      this.$axios(bloodheighSickApi(params))
      .then(res => {
        if (res.data) {
          if (res.data.data) {
            if (this._.has(res.data.data, 'adminHospitalId')) {
              this.adminHospitalId = res.data.data.adminHospitalId
            }
            if (this._.has(res.data.data, 'adminIdMainDoctor')) {
              this.adminIdMainDoctor = res.data.data.adminIdMainDoctor
            }
            if (this._.has(res.data.data, 'realName')) {
              this.info.name = res.data.data.realName
              this.medication.name = res.data.data.realName
            }
            if (this._.has(res.data.data, 'userImage')) {
              this.info.img = process.env.IMG_URL + res.data.data.userImage
            }
            if (this._.has(res.data.data, 'sex')) {
              if (res.data.data.realName.sex === 0) {
                this.info.sex = '女'
              }
              if (res.data.data.realName.sex === 1) {
                this.info.sex = '男'
              }
            }
            if (this._.has(res.data.data, 'mobile')) {
              this.medication.phone = res.data.data.mobile
              this.info.phone = res.data.data.mobile
            }
            if (this._.has(res.data.data, 'dangerLevel')) {
              this.medication.dangerLevel = res.data.data.dangerLevel
            }
            if (this._.has(res.data.data, 'birthDate')) {
              let b = dateFormat(new Date())
              let a = dateFormat(res.data.data.birthDate, 0, true)
              b = parseInt(b.slice(0, 4))
              a = parseInt(a.slice(0, 4))
              this.info.age = (b - a) + ''
            }
            if (this._.has(res.data.data, 'userBody')) {
              if (this._.has(res.data.data.userBody, 'height')) {
                this.info.heigh = res.data.data.userBody.height
              }
              if (this._.has(res.data.data.userBody, 'weight')) {
                this.info.weight = res.data.data.userBody.weight
              }
              if (this._.has(res.data.data.userBody, 'bmi')) {
                this.info.BMI = res.data.data.userBody.bmi
              }
              if (this._.has(res.data.data.userBody, 'sysIllnessHistoryIdDisease')) {
                let sicklist1 = (res.data.data.userBody.sysIllnessHistoryIdDisease + '').split(',')
                sicklist1 = this._.uniqWith(sicklist1, this._.isEqual)
                this.medication.sickHistroy = sicklist1
              }
              if (this._.has(res.data.data.userBody, 'sysIllnessHistoryIdGenetic')) {
                let sicklist2 = (res.data.data.userBody.sysIllnessHistoryIdGenetic + '').split(',')
                sicklist2 = this._.uniqWith(sicklist2, this._.isEqual)
                this.medication.inhereHistroy = sicklist2
              }
              if (this._.has(res.data.data.userBody, 'bloodPressureSickStart')) {
                this.medication.bloodPressureSickStart = res.data.data.userBody.bloodPressureSickStart
              }
            }
            if (this._.has(res.data.data, 'userCasesCard')) {
              if (this._.has(res.data.data.userCasesCard, 'yearsSick')) {
                this.medication.year = res.data.data.userCasesCard.yearsSick
              }
              if (this._.has(res.data.data.userCasesCard, 'monthSick')) {
                this.medication.month = res.data.data.userCasesCard.monthSick
              }
              if (this._.has(res.data.data.userCasesCard, 'daySick')) {
                this.medication.day = res.data.data.userCasesCard.daySick
              }
              if (this._.has(res.data.data.userCasesCard, 'readme')) {
                this.medication.symptom = res.data.data.userCasesCard.readme
              }
            }

            // if (this._.has(res.data.data, 'realName')) {
            //   this.medication.habit = res.data.data.realName
            // }
            // if (this._.has(res.data.data, 'realName')) {
            //   this.medication.complication = res.data.data.realName
            // }
            this.cardData = {}
            this.cardData = Object.assign({}, res.data.data)
            // this.info.name = this.name
            // this.info.img = process.env.IMG_URL + this.img
            // this.info.sex = (this.sex === '男' ? 'man' : 'woman')
            // this.info.age = this.age
            // this.info.heigh = this.height
            // this.info.weight = this.weight
            // this.medication.name = this.name
            // this.medication.sex = (this.sex === '男' ? 'man' : 'woman')
            // this.medication.phone = this.mobile
            // this.medication.sickHistroy = this.sysIllnessHistoryNameDisease
            // this.medication.inhereHistroy = this.sysIllnessHistoryNameGenetic
            // this.medication.habit = this.habits
            // this.medication.complication = this.sysIllnessHistoryNameBpConcurrent
            // this.medication.sureSick = this.doctorDiagnos
            // this.medication.symptom = this.readme
            // this.medication.lastTime = this.lastDate
            // this.medication.year = this.longtimeyear ? this.longtimeyear : null
            // this.medication.month = this.longtimemonth ? this.longtimemonth : null
            // this.medication.day = this.longtimeday ? this.longtimeday : null
            let userDetectReportList = []
            if (this._.has(this.cardData, 'userDetectReportList')) {
              if (this.cardData.userDetectReportList.length > 0) {
                this.cardData.userDetectReportList.forEach(item => {
                  let obj = {}
                  obj.url = process.env.IMG_URL + item.reportUrl
                  obj.id = item.id
                  userDetectReportList.push(obj)
                })
              }
            }
            this.$emit('faceData', {
              sex: this.sex,
              age: this.age,
              mobile: this.mobile,
              'userDetectReportList': userDetectReportList
            })
            // this.medication.lastTime = this.lastDate
            this.changeCurrentSickInfo(this.cardData)
          }
        }
      })
    },
    changeTab () {

    },
    // addMedicineHandle () {},
    // 药物搜索
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log('val', val)
    },
    /**
    *@description select选择
    *@augments 选择的药物列表
    */
    changeMedicineList (list) {
      let vm = this
      vm.medicineList = []
      this._.forEach(list, (item, index) => {
        // let obj = {}
        item.name = item.medicineName
        item.spec = item.drugSpec
        item.kucun = item.id
        item.price = item.medicineId
        vm.medicineList.push(item)
      })
      // this.changeMedicineList = list
      console.log('this.changeMedicineList', this.medicineList)
    },
    // 完善信息
    completeInfo () {
      this.copyInfo = this._.cloneDeep(this.info)
      this.showEditMsg = true
    },
    // 取消完善信息
    cancelInfo () {
      this.copyInfo = {}
      this.showEditMsg = false
    },
    // 保存完善信息
    saveInfo () {
      this.info = this.copyInfo
      this.showEditMsg = false
    },
    // 确认添加药物
    addsure () {
      if (this.multipleSelection.length !== 0) {
        this.multipleSelection.forEach(item => {
          // let medicine = {}
          // medicine.name = item.name
          item.singleuse = ''
          item.singleuseUnit = 'pian'
          item.usemethod = 'mouse'
          item.usetimes = ''
          item.uselong = ''
          item.usetotal = ''
          item.tip = ''
          this.doctorMedicine.push(item)
          console.log('this.doctorMedicine', this.doctorMedicine)
        })
      }
      this.doctorMedicine = this._.uniqWith(this.doctorMedicine, this._.isEqual)
      this.$refs.multipleTable.clearSelection()
    },
    // 删除药物
    deleteMedicine (index, rows) {
      rows.splice(index, 1)
    },
    // 完成就诊
    complete () {
      let vm = this
      let obj = {}
      obj.userId = this.sickID
      // obj.doctorDiagnos = this.medication.diagnosisMsg
      obj.doctorDiagnos = this.medication.doctorTip
      obj.lastTime = dateFormat(this.medication.lastTime, 0, true)
      // obj.yearsSick = this._.isNaN(parseInt(this.medication.year)) ? null : parseInt(this.medication.year)
      // obj.monthSick = this._.isNaN(parseInt(this.medication.month)) ? null : parseInt(this.medication.month)
      // obj.daySick = this._.isNaN(parseInt(this.medication.day)) ? null : parseInt(this.medication.day)
      obj.confirmDisease = this.medication.sureSick
      obj.bloodPressureSickStart = this.medication.bloodPressureSickStart
      obj.isBoth = this.medication.isfirst
      obj.height = this.tonumber(this.copyInfo.heigh) || this.info.weight
      obj.weight = this.tonumber(this.copyInfo.weight) || this.info.heigh
      obj.sysIllnessHistoryIdDisease = this.medication.sickHistroy.join(',')
      obj.sysIllnessHistoryIdGenetic = this.medication.inhereHistroy.join(',')
      obj.sysIllnessHistoryIdBpConcurrent = this.medication.complication.join(',')
      obj.smoking = this.medication.smoking
      obj.drinking = this.medication.drinking
      obj.is23Sleep = this.medication.is23Sleep
      obj.sleepStatus = this.medication.sleepStatus
      obj.sysNationalDiseaseId = this.bloodSickCode
      // obj.sleepStatus = this.medication.sleepStatus
      obj.checkItem = this.medication.checkItem.join(',')
      let medicine = []
      this.doctorMedicine.forEach(item => {
        let obj = {}
        obj.medicineType = 1
        obj.medicineName = item.name
        obj.medicineId = item.id
        // obj.medicineId =
        obj.unit = this.medicineunit(item.singleuseUnit)

        obj.remark = item.tip
        if (this._.has(item, 'uselong')) {
        } else {
          item.uselong = 0
        }
        // item.singleuse = item.singleuse.replace(/-?[1-9]\d*/g, '')
        // item.usetimes = item.usetimes.replace(/-?[1-9]\d*/g, '')
        // item.totalNumber = item.totalNumber.replace(/-?[1-9]\d*/g, '')
        // item.uselong = item.uselong.replace(/-?[1-9]\d*/g, '')
        //  item.uselong
        obj.everyDosage = item.singleuse
        obj.usageTimes = item.usetimes
        obj.totalNumber = item.usetotal + '盒'

        item.uselong = this._.isNaN(parseInt(item.uselong)) ? 0 : parseInt(item.uselong)
        obj.everyDosage = this._.isNaN(parseInt(item.singleuse)) ? null : parseInt(item.singleuse)
        obj.usageTimes = this._.isNaN(parseInt(item.usetimes)) ? null : parseInt(item.usetimes)
        obj.totalNumber = this._.isNaN(parseInt(item.usetotal)) ? null : parseInt(item.usetotal) + '盒'
        obj.usageOff = this.medicineunit(item.usemethod)
        medicine.push(obj)
        // obj.totalNumber
      })

      let sort = this._.sortBy(this.doctorMedicine, function (i) {
        if (vm._.has(i, 'uselong')) {
          return i.uselong
        }
      })

      if (this._.has(sort[sort.length - 1], 'uselong')) {
        obj.days = sort[sort.length - 1].uselong || 0
      } else {
        obj.days = 0
      }
      obj.json = JSON.stringify(medicine)
      console.log('JSON.stringify(medicine)', obj.list)
      obj.userMakeOrderDoctorId = this.userMakeOrderDoctorId || null
      obj.userCasesCardId = this.userCasesCardId || null
      // console.log('userCasesCardId', this.$route.params.userCasesCardId)
      if (!obj.doctorDiagnos) {
        this.$message({
          showClose: true,
          message: '请填写完整信息',
          type: 'warning'
        })
      } else {
        this.$axios(modifyCardApi(obj))
          .then(res => {
            if (res.data.code === '0000') {
              this.$emit('complete', '1')
              this.canPrint = true
              this.$message({
                showClose: true,
                message: '提交成功',
                type: 'success'
              })
            } else {
              let errmsg = res.data.msg
              if (res.data.msg === '失败！') {
                errmsg = '请填写完整信息'
              }
              this.$message({
                showClose: true,
                message: errmsg,
                type: 'warning'
              })
            }
          })
      }
      console.log('面诊数据', obj)
      // this.showface = false
    },
    addsports (obj) {
      console.log(obj.num)
      console.log(obj.index)
      this.addSportData[obj.index].num = obj.num
    },
    addfoods (food) {
      if (food.add) {
        this.foodlist.push(food.food)
      }
      if (!food.add) {
        let index = this._.indexOf(this.foodlist, food.food)
        if (index !== -1) {
          this.foodlist.splice(index, 1)
        }
      }
      console.log('foodlist', this.foodlist)
    },
    histroySickcard () {
      this.$emit('openSickCard')
    },
    searchSicktype (type) {
      this.loading = true
      let list = []
      this.$axios(sickApi(type))
      .then(res => {
        if (res.data.data.length !== 0) {
          list = res.data.data
          list.forEach(item => {
            item = this._.toString(item)
          })
          return list
        }
      })
      // sickApi
    },
    getbingshiList (val) {
      // if (val) {
      this.loading = true
      this.$axios(sickApi(3))
      .then(res => {
        if (res.data.data.length !== 0) {
          res.data.data.forEach(item => {
            item.id = this._.toString(item.id)
          })
          this.bingshiList = res.data.data
          this.loading = false
        }
      })
      // }
      console.log('面诊', val)
      console.log('bingshiList', this.bingshiList)
      console.log('sickHistroy', this.medication.sickHistroy)
    },
    getyichuanshiList (val) {
      this.$axios(sickApi(4))
      .then(res => {
        if (res.data.data.length !== 0) {
          res.data.data.forEach(item => {
            item.id = this._.toString(item.id)
          })
          this.yichuanshiList = res.data.data
          // this.loading = false
        }
      })
    },
    getgaoxueyabingfazhengList (val) {
      this.$axios(sickApi(6))
      .then(res => {
        if (res.data.data.length !== 0) {
          res.data.data.forEach(item => {
            item.id = this._.toString(item.id)
          })
          this.gaoxueyabingfazhengList = res.data.data
          // this.loading = false
        }
      })
    },
    // 打印病历
    dayin () {
      this.printdoctorMedicine = []
      this.doctorMedicine.forEach(item => {
        let obj = {}
        obj.name = item.medicineName
        obj.use = item.singleuse ? item.singleuse + this.medicineunit(item.singleuseUnit) : ''
        // obj.use = item.singleuse ? item.singleuse + this.medicineunit(item.singleuseUnit) : ''
        obj.method = item.usemethod ? this.medicineunit(item.usemethod) : ''
        obj.times = item.usetimes ? item.usetimes + '次/天' : ''
        obj.long = item.uselong ? item.uselong + '天' : ''
        obj.total = item.usetotal ? item.usetotal + '盒' : ''
        obj.tip = item.tip ? item.tip : ''
        this.printdoctorMedicine.push(obj)
      })
      console.log('打印药品', this.printdoctorMedicine)
      this.$nextTick(function () {
        // let el = document.getElementById('print')
        // let el = document.getElementById('print').innerHTML
        // var windows = print(el)
        // windows.close()
        printJS({
          printable: 'print',
          type: 'html',
          // 继承原来的所有样式
          targetStyles: ['*']
        })
      })
      // // this.complete()
      // // if (this.canPrint) {
      // var headhtml = '<html><head></head><body>'
      // var foothtml = '</body>'
      //   // 获取div中的html内容
      //   // var newhtml = document.all.item(printpage).innerHTML;
      // var newhtml = document.getElementById('print').innerHTML
      //   // 获取div中的html内容，jquery写法如下
      //   // var newhtml= $("#" + printpage).html();

      //   // 获取原来的窗口界面body的html内容，并保存起来
      // var oldhtml = document.body.innerHTML

      //   // 给窗口界面重新赋值，赋自己拼接起来的html内容
      // document.body.innerHTML = headhtml + newhtml + foothtml
      //   // 调用window.print方法打印新窗口
      // window.print()
      // window.location.reload()
      //   // this.$router.push({name: 'bloodheighSick',
      //   //   params: {
      //   //     sickID: this.sickID,
      //   //     hospitalId: this.adminHospitalId
      //   //   }})
      //   // 将原来窗口body的html值回填展示
      // document.body.innerHTML = oldhtml
      // return false
      // // }
    },
    tonumber (val) {
      if (this._.isNaN(parseInt(val))) {
        return parseInt(val)
      }
    },
    // medicineUnit (val) {
    //   let unit
    //   switch (val) {
    //     case 'pian':
    //       unit = '片'
    //       break
    //     case 'li':
    //       unit = '粒'
    //       break
    //     case 'ke':
    //       unit = '颗'
    //       break
    //     case 'zhi':
    //       unit = '支'
    //       break
    //     case 'mouse':
    //       unit = '口服'
    //       break
    //     case 'in':
    //       unit = '注射'
    //       break
    //     case 'out':
    //       unit = '外涂'
    //       break
    //     default:
    //       unit = null
    //       break
    //   }
    //   return unit
    // },
    openChecklist () {
      this.$emit('openchecklist')
    },
    openAddMedicineDialog () {
      this.addMedicineDialog = true
    },
    addMedicineHandler (list) {
      this.doctorMedicine = this._.concat(this.doctorMedicine, list)
      console.log('药品列表', this.doctorMedicine)
      this.addMedicineDialog = false
    },
    danger (val) {
      val = this._.toNumber(val)
      let text = ''
      switch (val) {
        case 5:
          text = '正常'// 正常
          break
        case 1:
          text = '低危'// 低危
          break
        case 2:
          text = '中危'// -中危
          break
        case 3:
          text = '高危' // 高危
          break
        case 4:
          text = '很高危' // 很高危
          break
        default:
          text = '未知'
      }
      return text
    },
    computeDanger (val) {
      let type = this._.toNumber(val)
      let color = ''
      switch (type) {
        case 5:
          color = '#33b2f2'// 正常
          break
        case 1:
          color = '#59d8a1'// 低危
          break
        case 2:
          color = '#efa13a'// -中危
          break
        case 3:
          color = '#ff7d43' // 高危
          break
        case 4:
          color = '#f96767' // 很高危
          break
        default:
          color = '#666'
      }
      return color
    },
    goLayer () {
      let obj = {}
      obj.isFollowUp = null
      obj.adminIdMainDoctor = null
      obj.userId = this.sickID
      obj.userFollowUpId = null
      obj.userName = this.info.name
      obj.userHealthDiaryId = null
      obj.adminHospitalId = this.adminHospitalId
      this.SET_FLUP_INFO(obj)
      console.log('重新分层', obj)
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
    sickCodeChange (val) {
      this.bloodSickCodeList.forEach(item => {
        if (item.id === val) {
          this.medication.sureSick = item.diseaseName
        }
      })
      console.log('诊断编码', val)
    },
    flupHistory () {
      let obj = {}
      obj.isFollowUp = true
      obj.adminIdMainDoctor = this.adminIdMainDoctor
      obj.userId = this.sickID
      obj.userFollowUpId = null
      obj.userName = this.info.name
      obj.userHealthDiaryId = null
      obj.adminHospitalId = this.adminHospitalId
      this.SET_FLUP_INFO(obj)
      // console.log('随访', val, obj)
      this.$router.push({
        name: 'FlupCard'
      })
    }
  },
  computed: {
    // sickID () {
    //   return this.$route.params.sickID
    // },
    // hospitalId () {
    //   return this.$route.params.hospitalId
    // },
    ...mapState(['adminInfo', 'userCasesCardId', 'userMakeOrderDoctorId'])
    // 姓名
    // name () {
    //   if (this.cardData) {
    //     if (this._.has(this.cardData, 'realName')) {
    //       return this.cardData.realName
    //     } else {
    //       return null
    //     }
    //   }
    // },
    // // 头像
    // img () {
    //   if (this.cardData) {
    //     if (this._.has(this.cardData, 'userImage')) {
    //       return this.cardData.userImage
    //     } else {
    //       return ''
    //     }
    //   }
    // },
    // // 性别this._.has()
    // sex () {
    //   if (this.cardData) {
    //     if (this._.has(this.cardData, 'sex')) {
    //       if (this.cardData.sex === 1) {
    //         return '男'
    //       }
    //       if (this.cardData.sex === 0) {
    //         return '女'
    //       }
    //     } else {
    //       return '男'
    //     }
    //   }
    // },
    // // 年龄
    // age () {
    //   if (this.cardData) {
    //     if (this._.has(this.cardData, 'birthDate')) {
    //       let b = dateFormat(new Date())
    //       let a = dateFormat(this.cardData.birthDate, 0, true)
    //       b = parseInt(b.slice(0, 4))
    //       a = parseInt(a.slice(0, 4))
    //       console.log('age', b - a)
    //       // return this.cardData.age
    //       return (b - a) + ''
    //     } else {
    //       return null
    //     }
    //   }
    // },
    // // 电话
    // mobile () {
    //   if (this.cardData) {
    //     if (this._.has(this.cardData, 'mobile')) {
    //       return this.cardData.mobile
    //     } else {
    //       return null
    //     }
    //   }
    // },
    // // 医生诊断
    // doctorDiagnos () {
    //   if (this.cardData) {
    //     if (this._.has(this.cardData, 'doctorDiagnos')) {
    //       return this.cardData.doctorDiagnos
    //     } else {
    //       return null
    //     }
    //   }
    // },
    // // 身高
    // height () {
    //   if (this.cardData) {
    //     if (this._.has(this.cardData, 'userBody')) {
    //       if (this._.has(this.cardData.userBody, 'height')) {
    //         return this.cardData.userBody.height
    //       } else {
    //         return null
    //       }
    //     } else {
    //       return null
    //     }
    //   }
    // },
    // // 体重
    // weight () {
    //   if (this.cardData) {
    //     if (this._.has(this.cardData, 'userBody')) {
    //       if (this._.has(this.cardData.userBody, 'weight')) {
    //         return this.cardData.userBody.weight
    //       } else {
    //         return null
    //       }
    //     } else {
    //       return null
    //     }
    //   }
    // },
    // // 疾病史
    // sysIllnessHistoryNameDisease () {
    //   // this.cardData
    //   console.log('this.cardData', this.cardData)
    //   if (this.cardData) {
    //     if (this._.has(this.cardData, 'userBody')) {
    //       if (this._.has(this.cardData.userBody, 'sysIllnessHistoryIdDisease')) {
    //         // let list = []
    //         // this.
    //         let sicklist = this.cardData.userBody.sysIllnessHistoryIdDisease.split(',')
    //         // console.log('sysIllnessHistoryIdDisease', sicklist)
    //         sicklist = this._.uniqWith(sicklist, this._.isEqual)
    //         return sicklist
    //         // return this.cardData.userBody.sysIllnessHistoryNameDisease
    //       } else {
    //         return []
    //       }
    //     } else {
    //       return []
    //     }
    //   }
    // },
    // // 家族遗传史
    // sysIllnessHistoryNameGenetic () {
    //   if (this.cardData) {
    //     if (this._.has(this.cardData, 'userBody')) {
    //       if (this._.has(this.cardData.userBody, 'sysIllnessHistoryIdGenetic')) {
    //         let sicklist = this.cardData.userBody.sysIllnessHistoryIdGenetic.split(',')
    //         sicklist = this._.uniqWith(sicklist, this._.isEqual)
    //         return sicklist
    //       } else {
    //         return []
    //       }
    //     } else {
    //       return []
    //     }
    //   }
    // },
    // // 生活喜好
    // habits () {
    //   let habits = []
    //   let str = ''
    //   if (this.cardData) {
    //     if (this._.has(this.cardData, 'userBody')) {
    //       // if (this._.has(this.cardData.userBody, 'highSaltStatus')) {
    //       //   if (this.cardData.userBody.highSaltStatus === 1) {
    //       //     habits.push('长期膳食高盐')
    //       //   }
    //       //   if (this.cardData.userBody.highSaltStatus === 2) {
    //       //     habits.push('无长期膳食高盐')
    //       //   }
    //       // }
    //       if (this._.has(this.cardData.userBody, 'sleepStatus')) {
    //         if (this.cardData.userBody.sleepStatus === 1) {
    //           this.medication.sleepStatus = '1'
    //           habits.push('睡眠规律')
    //         }
    //         if (this.cardData.userBody.sleepStatus === 2) {
    //           this.medication.sleepStatus = '2'
    //           habits.push('睡眠不规律')
    //         }
    //       }
    //       if (this._.has(this.cardData.userBody, 'smoking')) {
    //         if (this.cardData.userBody.smoking === 1) {
    //           this.medication.smoking = '1'
    //           habits.push('抽烟')
    //         }
    //         if (this.cardData.userBody.smoking === 2) {
    //           this.medication.smoking = '2'
    //           habits.push('不抽烟')
    //         }
    //         if (this.cardData.userBody.smoking === 3) {
    //           this.medication.smoking = '3'
    //           habits.push('已戒烟')
    //         }
    //       }
    //       if (this._.has(this.cardData.userBody, 'is23Sleep')) {
    //         if (this.cardData.userBody.is23Sleep) {
    //           this.medication.is23Sleep = '1'
    //           habits.push('23点前睡觉')
    //         }
    //         if (!this.cardData.userBody.is23Sleep) {
    //           this.medication.is23Sleep = '0'
    //           habits.push('没有23点前睡觉')
    //         }
    //       }
    //       // if (this._.has(this.cardData.userBody, 'dietStatus')) {
    //       //   if (this.cardData.userBody.dietStatus === 1) {
    //       //     habits.push('饮食规律')
    //       //   }
    //       //   if (this.cardData.userBody.dietStatus === 2) {
    //       //     habits.push('饮食不规律')
    //       //   }
    //       // }
    //       // if (this._.has(this.cardData.userBody, 'medicineStatus')) {
    //       //   if (this.cardData.userBody.medicineStatus === 1) {
    //       //     habits.push('长期服用止痛药或镇定催眠药')
    //       //   }
    //       //   if (this.cardData.userBody.medicineStatus === 2) {
    //       //     habits.push('没有长期服用止痛药或镇定催眠药')
    //       //   }
    //       // }
    //       // if (this._.has(this.cardData.userBody, 'urineStatus')) {
    //       //   if (this.cardData.userBody.urineStatus === 1) {
    //       //     habits.push('大小便正常')
    //       //   }
    //       //   if (this.cardData.userBody.urineStatus === 2) {
    //       //     habits.push('大小便不正常')
    //       //   }
    //       // }
    //       if (this._.has(this.cardData.userBody, 'drinking')) {
    //         if (this.cardData.userBody.drinking === 1) {
    //           this.medication.drinking = '1'
    //           habits.push('从不饮酒')
    //         }
    //         if (this.cardData.userBody.drinking === 2) {
    //           this.medication.drinking = '2'
    //           habits.push('偶尔饮酒')
    //         }
    //         if (this.cardData.userBody.drinking === 3) {
    //           this.medication.drinking = '3'
    //           habits.push('经常饮酒')
    //         }
    //         if (this.cardData.userBody.drinking === 4) {
    //           this.medication.drinking = '4'
    //           habits.push('每天饮酒')
    //         }
    //       }
    //     }
    //   }
    //   if (habits.length !== 0) {
    //     str = habits.join('、')
    //   }
    //   return str
    // },
    // // 血压并发症
    // sysIllnessHistoryNameBpConcurrent () {
    //   if (this.cardData) {
    //     if (this._.has(this.cardData, 'userBody')) {
    //       if (this._.has(this.cardData.userBody, 'sysIllnessHistoryIdBpConcurrent')) {
    //         let sicklist = this.cardData.userBody.sysIllnessHistoryIdBpConcurrent.split(',')
    //         sicklist = this._.uniqWith(sicklist, this._.isEqual)
    //         return sicklist
    //       } else {
    //         return []
    //       }
    //     } else {
    //       return []
    //     }
    //   }
    // },
    // createTime () {
    //   if (this.cardData) {
    //     if (this._.has(this.cardData, 'userBody')) {
    //       if (this._.has(this.cardData.userBody, 'createTime')) {
    //         return this.cardData.userBody.createTime
    //       } else {
    //         return ''
    //       }
    //     } else {
    //       return ''
    //     }
    //   }
    // },
    // readme () {
    //   if (this.cardData) {
    //     if (this._.has(this.cardData, 'userCasesCard')) {
    //       if (this._.has(this.cardData.userCasesCard, 'readme')) {
    //         // let sicklist = this.cardData.userBody.sysIllnessHistoryIdBpConcurrent.split(',')
    //         // sicklist = this._.uniqWith(sicklist, this._.isEqual)
    //         // return sicklist
    //         return this.cardData.userCasesCard.readme
    //       } else {
    //         return null
    //       }
    //     } else {
    //       return null
    //     }
    //   }
    // },
    // longtimeyear () {
    //   if (this.cardData) {
    //     if (this._.has(this.cardData, 'userCasesCard')) {
    //       if (this._.has(this.cardData.userCasesCard, 'yearsSick')) {
    //         // let sicklist = this.cardData.userBody.sysIllnessHistoryIdBpConcurrent.split(',')
    //         // sicklist = this._.uniqWith(sicklist, this._.isEqual)
    //         // return sicklist
    //         return this.cardData.userCasesCard.yearsSick
    //       } else {
    //         return null
    //       }
    //     } else {
    //       return null
    //     }
    //   }
    // },
    // longtimemonth () {
    //   if (this.cardData) {
    //     if (this._.has(this.cardData, 'userCasesCard')) {
    //       if (this._.has(this.cardData.userCasesCard, 'monthSick')) {
    //         // let sicklist = this.cardData.userBody.sysIllnessHistoryIdBpConcurrent.split(',')
    //         // sicklist = this._.uniqWith(sicklist, this._.isEqual)
    //         // return sicklist
    //         return this.cardData.userCasesCard.monthSick
    //       } else {
    //         return null
    //       }
    //     } else {
    //       return null
    //     }
    //   }
    // },
    // longtimeday () {
    //   if (this.cardData) {
    //     if (this._.has(this.cardData, 'userCasesCard')) {
    //       if (this._.has(this.cardData.userCasesCard, 'daySick')) {
    //         // let sicklist = this.cardData.userBody.sysIllnessHistoryIdBpConcurrent.split(',')
    //         // sicklist = this._.uniqWith(sicklist, this._.isEqual)
    //         // return sicklist
    //         return this.cardData.userCasesCard.daySick
    //       } else {
    //         return null
    //       }
    //     } else {
    //       return null
    //     }
    //   }
    // },
    // lastDate () {
    //   if (this.cardData) {
    //     if (this._.has(this.cardData, 'userCasesCard')) {
    //       if (this._.has(this.cardData.userCasesCard, 'lastTime')) {
    //         // let sicklist = this.cardData.userBody.sysIllnessHistoryIdBpConcurrent.split(',')
    //         // sicklist = this._.uniqWith(sicklist, this._.isEqual)
    //         // return sicklist
    //         return this.cardData.userCasesCard.lastTime
    //       } else {
    //         return null
    //       }
    //     } else {
    //       return null
    //     }
    //   }
    // }
  },
  mounted () {
    console.log('this.router', this.$route)
    this.id = this.userCasesCardId
    this.currentDate = dateFormat(new Date(), 0, true)
    let vm = this
    // 从最新问诊过来
    // Bus.$on('modifySickCard', function (val) {
    //   if (val.modify) {
    //     this.modify = true
    //   }
    // })
    let promise1 = new Promise(function (resolve, reject) {
      vm.$axios(sickApi(3))
      .then(res => {
        if (res.data.data.length !== 0) {
          res.data.data.forEach(item => {
            item.id = vm._.toString(item.id)
          })
          vm.bingshiList = res.data.data
          console.log('bingshiList', vm.bingshiList)
          resolve('1')
        }
      })
    })
    let promise2 = new Promise(function (resolve, reject) {
      vm.$axios(sickApi(4))
      .then(res => {
        if (res.data.data.length !== 0) {
          res.data.data.forEach(item => {
            item.id = vm._.toString(item.id)
          })
          vm.yichuanshiList = res.data.data
          resolve('2')
        }
      })
    })
    let promise3 = new Promise(function (resolve, reject) {
      vm.$axios(sickApi(6))
      .then(res => {
        if (res.data.data.length !== 0) {
          res.data.data.forEach(item => {
            item.id = vm._.toString(item.id)
          })
          vm.gaoxueyabingfazhengList = res.data.data
          resolve('3')
        }
      })
    })
    let promise4 = new Promise(function (resolve, reject) {
      vm.$axios(sickCodeApi({
        diseaseType: 1
      }))
      .then(res => {
        if (res.data.data.length !== 0) {
          // res.data.data.forEach(item => {
          //   item.id = vm._.toString(item.id)
          // })
          vm.bloodSickCodeList = res.data.data
          resolve('4')
        }
      })
      vm.$axios(sickCodeApi({
        diseaseType: 2
      }))
      .then(res => {
        if (res.data.data.length !== 0) {
          res.data.data.forEach(item => {
            item.id = vm._.toString(item.id)
          })
          vm.sugerSickCodeList = res.data.data
          resolve('4')
        }
      })
    })

    Promise.all([promise1, promise2, promise3, promise4]).then(function (results) {
      vm.getData()
    })
    // this.getbingshiList()
    // this.getyichuanshiList()
    // this.getgaoxueyabingfazhengList()
    // this.getData()
    console.log('this.adminInfo.name', this.adminInfo.name)
  },
  beforeDestroy () {
    // console.log('销毁前', this.info)
  },
  destroyed () {
    // console.log('销毁后', this.info)
    // this.setuserCasesCardId(null)
    // this.setuserMakeOrderDoctorId(null)
    // console.log('销毁后', this.userCasesCardId)
    // console.log('销毁后', this.userMakeOrderDoctorId)
  }

}
</script>

<style lang="scss" scoped>
  // $border-color-input:#dcdfe6;#ebeef5
  $border-color-input:#eaeaea;
  // $border-color-input:#ebeef5;
  $border-radius:4px;
  .face-wrap{
    position: relative;
  }
  .print-wrap{
    position: absolute;
    width: 100%;
    top:0;
    z-index: -999;
  }
  .must{
    color:#f96767;
  }
  input{
    border:1px solid $border-color-input;
    // padding: 5px;
  }
  .padding{padding:5px;}
  .input-group{
    line-height: normal;
    display: inline-table;
    width: 100%;
    border-collapse: separate;
    position: relative;
    font-size: 14px;
    $input-height:30px;
    div{
      color: #041421;
      vertical-align: middle;
      display: table-cell;
      position: relative;
      border: 1px solid $border-color-input;
      border-radius: $border-radius;
      padding: 0 5px;
      width: 1px;
      white-space: nowrap;
      border-right: 0;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      background-color: #fff;
    }
    input{
      -webkit-appearance: none;
      background-color: #fff;
      background-image: none;
      border-radius:0 $border-radius $border-radius 0;
      border: 1px solid $border-color-input;
      padding-left: 5px;
      box-sizing: border-box;
      color: #041421;
      display: inline-block;
      font-size: inherit;
      height: $input-height;
      line-height: $input-height;
      outline: none;
      // padding: 0 15px;
      // transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 100%;
      // border-left: none;
    }
  }
  .times{
    width: 20px;
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
  // select{
  //   // width: 100%;
  //   height: 30px;
  //   border:1px solid $border-color-input;
  //   border-radius: $border-radius;
  //   outline: none;
  //   /*很关键：将默认的select选择框样式清除*/
  //   appearance:none;
  //   -moz-appearance:none;
  //   -webkit-appearance:none;
  //   background: url('~icon/hospital-icon-199.png') no-repeat scroll right 3px center transparent;
  //   /*为下拉小箭头留出一点位置，避免被文字覆盖*/
  //   padding-right: 20px;
  //   padding-left: 4px;
  //   background-color: #fff;
  //   font-size: 14px;
  //   cursor: pointer;
  //   // text-align: center;
  // }
  // /*清除ie的默认选择框样式清除，隐藏下拉箭头*/
  // select::-ms-expand { display: none; }
  $left-width:216px;
  $right-width:420px;

  .case-head{
    // border-bottom:8px solid #f4f6f9;
    background: #f4f6f9;
    &-btn{
      float: right;
      margin:15px;
    }
  }
  .face-case{
    width: 100%;
    // overflow: auto;
    display: flex;
    height: 100%;
    // min-height: 1000px;
    // flex-flow: wrap;
  }
  .case{
    min-width: 630px;
    width: 100%;
    height:100%;
  }
  .pane-bg{
    height: 8px;
    background-color:#f4f6f9;
    width: 100%;
    // margin-top: 20px;
  }
  .pane-bgc{
    background-color: #fff;
    height: 100%;
    // width: 100%;
    padding:10px 15px 20px 15px;
  }
  .searchMedicine-title{
    vertical-align: middle;
  }
  .searchMedicine{
    display: inline-block;
  }
  .medicenelist{
    padding:10px;
  }
  .add-sure{
    padding-left:15px;
  }
  .table-input{
    width: 80%;
    height: 25px;
    border: 1px solid $border-color-input;
    text-align: center;
    // max-width: 60px;
    display: inline-block;

  }
  .use-num{
    display: inline-block;
    // width: 40px;
    // height: 20px;
    
  }
  .width-tip{
    width: 100%;
      -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #666;
    display: inline-block;
    font-size: inherit;
    line-height: 1;
    outline: none;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    // width: 100%;
    &:focus{
      outline: none;
      border-color: #1991fc;
    }
  }
  .single-use{
    width: 25px;
    height: 28px;
      -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #666;
    display: inline-block;
    font-size: inherit;
    line-height: 1;
    outline: none;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    // width: 100%;
    &:focus{
      outline: none;
      border-color: #1991fc;
    }
  }
  .total{
    width: 25px;
  }
  .border{
    border:1px solid $border-color-input;
    height: 70%;
  }
  // .case-main{ margin:0 $right-width 0 $left-width;  height:100%; }  
  // .case-left {float: left;margin-left: -100%;height: 500px;width: $left-width; background-color: #1991fc}  
  // .case-right{float: left;margin-left: -$right-width;height: 500px;width: $right-width;background-color: #69dada}
  .case-main{height:100%; min-height: 750px;}  
  .case-left {
  height: 100%;
  min-height: 750px;
  min-width: $left-width; 
  background-color: #fff;
  }  
  .case-right{height: 770px;min-height: 750px;min-width: $right-width;background-color: #fff;}
  .margin-top{
    margin-top:20px;
  }
  .case-wrap{
    margin-bottom: 8px;
    background: #fff;
    .el-form-item{
      margin: 0;
    }
  }
  .case-left{
    $font-color:#041421;
    $border-color:#a19696;
    text-align: center;
    // padding-bottom: 20px;
    height: inherit;
    color: #666;
    min-height: 750px;
    min-width: $left-width; 
    max-width: 250px; 
    background-color: #fff;
    input{
      width: 80px;
    }
    .label{
      display: inline-block;
      width: 50px;
    }
    img{
      width: 120px;
      // height: 120px;
      border-radius: 120px;
    }
    &-img{
      margin-top:36px;
      text-align: center;
      &-wrap{
        // border-radius: 50%;
      }
    }
    &-type{
      margin: 10px 0 20px 0;
      &-name{
        font-size: 24px;
        color:$font-color;
        display: inline-block;
      }
      &-se{
        display: inline-block;
        padding:2px 5px 2px 5px;
        border:1px solid $border-color;
        border-radius: $border-radius;
        color:#666;
        margin-left: 5px;
      }
    }
    &-btn{
      margin-bottom: 20px;
    }
    &-msg{
      margin-bottom: 20px;
      text-align: left;
      margin-left: 24px;
      margin-right: 24px;
      &-single{
        margin-bottom: 20px;
        color: $font-color;
      }
    }
  }
  .case-main{
    height: inherit;
    border-left:8px solid #f4f6f9;
    .label-width{
      // width: 100px;
    }
    .submit-btn{
      text-align: right;
      padding-bottom: 20px;
      padding-right: 20px;
    }
    &-content{
      // margin:0 8px;
      background-color: #fff;
      padding:15px;
      // border-left:8px solid #f4f6f9;
      // border-right:8px solid #f4f6f9;
    }
    &-title{
      text-align: center;
      font-size: 24px;
      line-height: 60px;
      height: 60px;
    }
    &-rp{
      &-title{
        font-size: 20px;
        color: #1991fc;
        border-bottom: 1px solid $border-color-input;
        padding:30px 0 15px 0;
        margin-bottom: 20px;
      }
      table{
        border:1px solid $border-color-input;
        width: 100%;
        td,th{
          border:1px solid $border-color-input;
          text-align: center;
          vertical-align: middle;
          height: 42px;
        }
      }
    }
    &-footer{
      margin-top:20px;
      &-left{
        float: left;
        div{
          display: inline-block;
          margin-right: 30px;
        }
      }
      &-right{
        float: right;
        margin-right: 20px;
        &-total{
          font-size: 20px;
          color: #041421;
        }
        &-money{
          font-size: 20px;
          color: #1991fc;
          font-weight: bold;
        }
      }
    }
  }
  .case-right{
    height: inherit;
    &-main{
      margin: 0 auto;
    }
  }
  .print{
    // display: none;
    z-index: -1000;
    .title{
      font-size: 24px;
      text-align: center;
      padding-top: 66px;
      padding-bottom: 30px;
    }
    .title p{
      margin-bottom: 15px;
    }
    td{
      padding:7px;
    }
    div:nth-last-child(n+2){
      border-bottom: 1px solid #eaeaea;
    }
    padding-bottom: 30px;
    position: relative;
    span{
      display: inline-block;
      margin-top:15px;
      margin-bottom:15px;
      margin-right: 30px;
    }
    .print-footer{
      // position: absolute;
      margin-top:15px;
      text-align: right;
      width: 100%;
      // bottom: 25px;
      // right: 150px;
    }
  }
  @media print {
    .print{
      div:nth-last-child(n+2){
        border-bottom: 1px solid #eaeaea;
      }
      padding-bottom: 30px;position: relative;
      span{
        display: inline-block;margin-top:10px;margin-bottom:10px;margin-right: 30px;
      }
      &-footer{
        position: absolute;bottom: 5px;right: 150px;
      }
    }
  }
  .face{
    position: relative;
  }
  .face::before{
    box-sizing: border-box; border: 0; margin: 0; padding: 0;
    /* z-index: 22222222222222; */
    /* top:0px; */
    left: 10px;
    position: absolute;
    content: '';
    width: 64px;
    height: 44px;
    display: block;
    background: url('~icon/hospital-icon-93.png') no-repeat;
  }
  .vip{
    position: relative;
    line-height: 0;
    height: 0;
    font-size: 0;
    box-sizing: border-box; border: 0; margin: 0; padding: 0
  }
  .vip::before{
    box-sizing: border-box; border: 0; margin: 0; padding: 0;
    /* z-index: 22222222222222; */
    /* top:0px; */
    left: 10px;
    position: absolute;
    content: '';
    width: 64px;
    height: 44px;
    display: block;
    background: url('~icon/hospital-icon-93.png') no-repeat;
  }

  .el-select-wrap > .el-select{
    width: 100%;
  }
  .time-picker  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 150px;
}
.el-input-cls{
  display: inline-block;
  width: 90px;
}
.el-input-cls-xueya{
  display: inline-block;
  width: 45px;
}
.pick-date-wrap{
  display: flex;
  align-items: center;
  input{
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 28px;
    line-height: 1;
    outline: none;
    padding: 0 15px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
    &:focus{
      outline: none;
      border-color: #1991fc;
    }
  }
  /* justify-content: space-around; */
}
.pick-date-wrap div{
  width: 56px;
  padding-right: 5px;
  /* justify-content: space-around; */
}
.line-block{
  display: inline-block;
}
.sick-time-width{
  max-width: 100px;
  min-width: 60px;
  // width: 120px;
}
.gap-right{
  margin-right: 10px;
}
.color-face{
  color: #606266;
  font-size: 14px;
}
.flex{
  display: flex;
  align-items: center;
}
.flex-between{

  justify-content: space-between;
}
.flex-grow{
  flex-grow:1
}
.margin7{
  margin-top: 7px;
}
.box-border{
  box-sizing: border-box;
}
.layer-box{
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  height: 28px;
  padding: 0 10px;
  box-sizing: border-box;
  // width: inherit;
  width: 100%;
}
.gap-bottom{
  margin-bottom: 10px;
}
.gap-bottom-large{
  margin-bottom: 20px;
}
.fist-line{
  padding-left: 75px;
}
</style>


<style>
@media print {
    /* .print{ */
  .title{
    font-size: 24px;
    text-align: center;
    padding-top: 66px;
    padding-bottom: 30px;
  }
  .title h1{
    margin-bottom: 5px;
  }
  .print{
    padding-bottom: 30px;position: relative;
  }
  .bottom-boder{
    border-bottom: 1px solid #eaeaea;
  }
  .diagnos{
    margin-top:20px;
    padding-left: 20px;
  }
  .diagnos p{
    margin-bottom: 20px;
  }
  .cardnum{
    padding-bottom: 20px;
    padding-left: 20px;
  }
  .print-footer{
    position: absolute;bottom: 5px;right: 150px;
  }
  .base-info{
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
  }
  .base-info span{
    display: inline-block;
    width: 18%;
  }
  .info-card{
    padding-bottom: 20px;
    padding-left: 20px;
  }
  .info-card span{
    display: inline-block;
    width: 40%;
  }
}

</style>

