<template>
    <div class="case-wrap" v-if="showface">
      <div class="case-head clear">
        <div class="case-head-btn">
          <el-button type="primary" @click="complete">完成就诊</el-button>
          <el-button type="primary" @click="dayin">打印处方</el-button>
        </div>
      </div>

      <div class="face-case">

        <div class="case-left">
          <div class="case-left-img">
            <img :src="info.img" alt="">
          </div>
          <div class="case-left-type">
            <span class="case-left-type-name">{{info.name}}</span>
            <span class="case-left-type-se">治疗中</span>
          </div>
          <div class="case-left-btn">
            <el-button type="primary" @click="histroySickcard">历史病历</el-button>
            <el-button type="primary" @click="completeInfo">完善信息</el-button>
          </div>
          <div class="case-left-msg">
            <div class="case-left-msg-single">
              <span class="label">性别：</span>
              <span v-if="!showEditMsg">{{info.sex === 'man' ? '男' : '女'}}</span>
              <select v-if="showEditMsg" v-model="copyInfo.sex">
                <option value="man">男</option>
                <option value="woman">女</option>
              </select>
              <!-- <input type="text" v-if="showEditMsg" v-model="info.sex"> -->
            </div>
            <div class="case-left-msg-single">
              <span class="label">年龄：</span>
              <span v-if="!showEditMsg">{{info.age ? info.age+'岁':''}}</span>
              <input type="text" v-if="showEditMsg" v-model.number="copyInfo.age" class="padding">
            </div>
            <div class="case-left-msg-single">
              <span class="label">身高：</span>
              <span v-if="!showEditMsg">{{info.heigh ? info.heigh+'cm':''}}</span>
              <input type="text" v-if="showEditMsg" v-model.number="copyInfo.heigh" class="padding">
            </div>
            <div class="case-left-msg-single">
              <span class="label">体重：</span>
              <span v-if="!showEditMsg">{{info.weight ? info.weight+'kg':''}}</span>
              <input type="text" v-if="showEditMsg" v-model.number="copyInfo.weight" class="padding">
            </div>
            <div class="case-left-msg-single">
              <span class="label"> BMI： </span>
              <span v-if="!showEditMsg">{{info.BMI}}</span>
              <input type="text" v-if="showEditMsg" v-model.number="copyInfo.BMI" class="padding">
            </div>
            <div class="case-left-msg-single">
              <span class="label">体温：</span>
              <span v-if="!showEditMsg">{{info.tem ? info.tem+'℃':''}}</span>
              <input type="text" v-if="showEditMsg" v-model.number="copyInfo.tem" class="padding">
            </div>
            <div class="case-left-msg-single">
              <span class="label">血压：</span>
              <span v-if="!showEditMsg">{{info.bloodHeigh}}</span>
              <input type="text" v-if="showEditMsg" v-model.lazy="copyInfo.bloodHeigh" class="padding">
            </div>
            <div class="case-left-msg-single">
              <span class="label">脉搏：</span>
              <span v-if="!showEditMsg">{{info.pulse ? info.pulse+'/min':''}}</span>
              <input type="text" v-if="showEditMsg" v-model.number="copyInfo.pulse" class="padding">
            </div>
            <el-button type="primary" v-if="showEditMsg" size="mini" @click="cancelInfo">取消</el-button>
            <el-button type="primary" v-if="showEditMsg" size="mini" @click="saveInfo">保存</el-button>
          </div>
          <div>
            <el-button type="primary">体检表</el-button>
            <el-button type="primary">体检单</el-button>
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
                <el-row :gutter="10">
                  <el-col :span="6">
                    <el-form-item label="姓名">
                      <el-input v-model="medication.name" size="mini"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="患病时长" label-width="68px">
                      <div class="pick-date-wrap">
                        <div>
                          <el-input placeholder="年" v-model.number="medication.year" size="mini"></el-input>
                        </div>
                        <div>
                          <el-input placeholder="月" v-model.number="medication.month" size="mini"></el-input>
                        </div>
                        <div>
                          <el-input placeholder="天数" v-model.number="medication.day" size="mini"></el-input>
                        </div>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="电话" label-width="45px">
                      <el-input v-model.number="medication.phone" size="mini"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="6">
                    <el-form-item label="性别" label-width="45px">
                      <el-select v-model="medication.sex" placeholder="性别" size="mini">
                        <el-option label="男" value="man"></el-option>
                        <el-option label="女" value="woman"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="" label-width="8px">
                      <el-select v-model="medication.isfirst" placeholder="请选择" size="mini">
                        <el-option label="初诊" value="1"></el-option>
                        <el-option label="复诊" value="0"></el-option>
                      </el-select>
                    </el-form-item>

                  </el-col>
                  <el-col :span="12">
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
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item label="病史" label-width="60px">
                      <div class="el-select-wrap">
                        <el-select size="mini" 
                        v-model="medication.sickHistroy" 
                        multiple 
                        placeholder="请选择病史"
                        :loading="loading"
                        >                
                        <!-- @visible-change="getbingshiList" -->
                          <el-option
                            v-for="(item,index) in bingshiList"
                            :key="index"
                            :label="item.illnessName"
                            :value="item.id">
                          </el-option>
                        </el-select>

                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
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
                  </el-col>
                </el-row>
                <el-row>
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
                </el-row>

                
                <el-row :gutter="10">
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
                          <el-option label="是" value="1"></el-option>
                          <el-option label="否" value="0"></el-option>

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

                </el-row>

                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="检查项目" label-width="68px">
                      <el-select
                        v-model="medication.checkItem"
                        size="mini"
                        multiple
                        filterable
                        allow-create
                        default-first-option
                        placeholder="请添写项目标签">
                        <!-- <el-option
                          v-for="item in options5"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option> -->
                      </el-select>
                      <!-- <el-select v-model="medication.checkItem" placeholder="抽烟情况" size="mini">
                        <el-option label="抽烟" value="1"></el-option>
                        <el-option label="不抽烟" value="2"></el-option>
                        <el-option label="已戒烟" value="3"></el-option>
                      </el-select> -->
                      <!-- <el-input v-model="medication.checkItem" size="mini"></el-input> -->
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="确诊疾病" label-width="68px">
                      <el-input v-model="medication.sureSick" size="mini"></el-input>
                    </el-form-item>

                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item label="自述" label-width="68px">
                      <el-input v-model="medication.symptom" size="mini"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item label="诊断信息" label-width="68px">
                      <el-input v-model="medication.diagnosisMsg" size="mini"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item label="医嘱" label-width="68px">
                      <el-input v-model="medication.doctorTip" size="mini"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                </el-form>
                <div class="case-main-rp">
                  <div class="case-main-rp-title">
                    <span>RP</span>
                  </div>
                  <el-table
                  ref="multipleTable"
                  :data="doctorMedicine"
                  tooltip-effect="dark"
                  style="width: 100%"
                  max-height="400">
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
                      width="100">
                      <template slot-scope="scope">
                        <input  type="text" v-model="scope.row.singleuse" class="table-input use-num single-use">
                        <select class="use-num" v-model="scope.row.singleuseUnit">
                          <option value="pian">片</option>
                          <option value="li">粒</option>
                          <option value="ke">颗</option>
                          <option value="zhi">支</option>
                        </select>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="usemethod"
                      label="用法"
                      width="65">
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
                      width="80">
                      <template slot-scope="scope">
                        <input type="text" v-model="scope.row.usetimes" class="table-input use-num single-use">次/天
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="uselong"
                      label="天数"
                      width="50">
                      <template slot-scope="scope">
                        <input v-model="scope.row.uselong" type="text" class="table-input use-num single-use">
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="usetotal"
                      label="总量"
                      width="65">
                      <template slot-scope="scope">
                        <input v-model="scope.row.usetotal" type="text" class="table-input use-num single-use">盒
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="tip"
                      label="备注">
                      <template slot-scope="scope">
                        <input v-model="scope.row.tip" type="text" class="table-input">
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="delete"
                      label="编辑"
                      width="100">
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
            </div>
          </div>
        </div>


        <!-- <div class="case face">  
            <div  class="case-main">
              <div class="case-main-content">
                <div class="case-main-title">
                  <span>上海立阖泰医疗统一处方笺</span>
                </div>
                <el-row :gutter="10">
                  <el-col :span="6" :lg="6" :md="24" :sm="24" :sx="24" class="margin-top">
                    <div class="input-group">
                      <div for="name">姓名:</div>
                      <input type="text" v-model="medication.name">
                    </div>
                  </el-col>
                  <el-col :span="6" :lg="6" :md="24" :sm="24" :sx="24" class="margin-top">
                    <div class="input-group">
                      <div>患病时长:</div>
                      <input type="text" v-model="medication.sickDuration">
                    </div>
                  </el-col>
                  <el-col :span="7" :lg="7" :md="24" :sm="24" :sx="24" class="margin-top">
                    <div class="input-group">
                      <div>电话号码:</div>
                      <input type="text" v-model="medication.phone">
                    </div>
                  </el-col>
                  <el-col :span="5" :lg="5" :md="24" :sm="24" :sx="24" class="margin-top">
                    <select v-model="medication.sex">
                      <option value="man">男</option>
                      <option value="woman">女</option>
                    </select>
                    <select style="{'width':'40px'}" v-model="medication.isfirst">
                      <option value="first">初诊</option>
                      <option value="nofirst">复诊</option>
                    </select>

                  </el-col>
                </el-row>
                <div>
                  <div>病史:</div>
                  <el-select size="mini" 
                  v-model="medication.sickHistroy" 
                  multiple 
                  placeholder="请选择"
                  :loading="loading"
                  @visible-change="searchSick">
                    <el-option
                      v-for="item in bingshiList"
                      :key="item.id"
                      :label="item.illnessName"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
                <el-row :gutter="10">
                  
                  <el-col :span="6" :lg="6" :md="12" :sm="24" :sx="24" class="margin-top">
                    <div class="input-group">
                      <div for="name">遗传史:</div>
                      <input type="text" v-model="medication.inhereHistroy">
                    </div>
                  </el-col>
                  <el-col :span="12" :lg="12" :md="12" :sm="24" :sx="24" class="margin-top">
                    <div class="input-group">
                      <div for="name">生活习惯:</div>
                      <input type="text" v-model="medication.habit">
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12" :lg="12" :md="12" :sm="24" :sx="24" class="margin-top">
                    <div class="input-group">
                      <div for="name">检查项目:</div>
                      <input type="text" v-model="medication.checkItem">
                    </div>
                  </el-col>
                  <el-col :span="12" :lg="12" :md="12" :sm="24" :sx="24" class="margin-top">
                    <div class="input-group">
                      <div for="name">并发症:</div>
                      <input type="text" v-model="medication.complication">
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12" :lg="12" :md="12" :sm="24" :sx="24" class="margin-top">
                    <div class="input-group">
                      <div for="name">确诊疾病:</div>
                      <input type="text" v-model="medication.sureSick">
                    </div>
                  </el-col>
                  <el-col :span="12" :lg="12" :md="12" :sm="24" :sx="24" class="margin-top">
                    <div class="input-group" >
                      <div for="name">上次就诊时间:</div>
                      <input type="text" v-model="medication.lastTime">
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="margin-top">
                  <el-col>
                    <div class="input-group">
                      <div for="name">症状:</div>
                      <input type="text" v-model="medication.symptom">
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="margin-top">
                  <el-col>
                    <div class="input-group">
                      <div for="name">诊所信息:</div>
                      <input type="text" v-model="medication.hospitalMsg">
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="margin-top">
                  <el-col>
                    <div class="input-group">
                      <div for="name">医嘱:</div>
                      <input type="text" v-model="medication.doctorTip">
                    </div>
                  </el-col>
                </el-row>
                <div class="case-main-rp">
                  <div class="case-main-rp-title">
                    <span>RP</span>
                  </div>
                  <el-table
                  ref="multipleTable"
                  :data="doctorMedicine"
                  tooltip-effect="dark"
                  style="width: 100%"
                  max-height="400">
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
                      width="100">
                      <template slot-scope="scope">
                        <input  type="text" class="table-input use-num single-use">
                        <select class="use-num">
                          <option value="pian">片</option>
                          <option value="li">粒</option>
                          <option value="ke">颗</option>
                          <option value="zhi">支</option>
                        </select>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="usemethod"
                      label="用法"
                      width="65">
                      <template slot-scope="scope">
                        <select>
                          <option value="mouse">口服</option>
                          <option value="in">注射</option>
                          <option value="out">外涂</option>
                        </select>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="usetimes"
                      label="频度"
                      width="80">
                      <template slot-scope="scope">
                        <input type="text" class="table-input use-num single-use">次/天
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="uselong"
                      label="天数"
                      width="50">
                      <template slot-scope="scope">
                        <input type="text" class="table-input use-num single-use">
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="usetotal"
                      label="总量"
                      width="65">
                      <template slot-scope="scope">
                        <input type="text" class="table-input use-num single-use">盒
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="tip"
                      label="备注">
                      <template slot-scope="scope">
                        <input type="text" class="table-input">
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="delete"
                      label="编辑"
                      width="100">
                      <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="deleteMedicine(scope.$index, doctorMedicine)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="case-main-footer clear">
                  <div class="case-main-footer-left">
                    <div>
                      <span>医生</span>
                      <select name="" id="">
                        <option value="">周医生</option>
                        <option value="">王医生</option>
                        <option value="">赵医生</option>
                      </select>
                    </div>
                    <div>
                      <span>科室</span>
                      <select name="" id="">
                        <option value="">内科</option>
                        <option value="">外科</option>
                        <option value="">心脑血管</option>
                      </select>
                    </div>
                  </div>
                  <div class="case-main-footer-right">
                    <span class="case-main-footer-right-total">总计：</span>
                    <span class="case-main-footer-right-money">89元</span>
                  </div>
                </div>
              </div>
            </div>  
        </div>   -->
        
        <div class="case-right">
          <div class="case-right-main">
            <tabs
            v-model="activeIndex"
            @checkd="changeTab">
              <pane
              label="西药处方">
                <div class="pane-bg">
                </div>
                <div class="pane-bgc">
                  <searchMedicine
                  @medicineList="changeMedicineList"></searchMedicine>
                </div>
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
                <div class="add-sure">
                  <el-button type="primary" @click="addsure">确认添加</el-button>
                </div>
              </pane>
              <!-- <pane
              label="运动">
                <div class="pane-bg">
                </div>
                <div class="pane-bgc">
                  <div
                  v-for="(sport,index) in addSportData" :key="index">
                    <addSport
                    :title="sport.title"
                    :subtitle="sport.subtitle"
                    :itemlist="sport.itemlist"
                    :initNum="sport.initNum"
                    :step="sport.step"
                    :index="index"
                    @addsport="addsports"
                    ></addSport>
                  </div>
                </div>
              </pane> -->
              <!-- <pane
              label="饮食">
                <div class="pane-bg">
                </div>
                <div class="pane-bgc">
                    <addFood
                    v-for="(food,index) in addFoodData" :key="index"
                    :food="food.food"
                    @addfood="addfoods">
                    </addFood>
                </div>
              </pane> -->
            </tabs>
          </div>
        </div>  
      </div>


      <div id="print" class="print">
        <div class="title">
          <h1>上海立阖泰科技</h1>
          <h1>门诊病历</h1>
        </div>
        <div class="bottom-boder cardnum">
          <span>医疗证/医保卡号：</span>
        </div>
        <div class="bottom-boder">
          <div class="base-info">
            <span>姓名：{{info.name}}</span>
            <span>性别：{{info.sex === 'man' ? '男':'女'}}</span>
            <span>年龄：{{info.age}}</span>
            <!-- <span>科室：{{footerData.type}}</span> -->
            <!-- <span>费别：{{footerData.total}}</span> -->
          </div>
          <div class="info-card">
            <!-- <span>病历号：</span> -->
            <span>电话：{{medication.phone}}</span>
          </div>
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
            <span>病史：{{bingshiStr}}</span>
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
            <span>处理意见：{{medication.doctorTip}}</span>
          </p>
        </div>
        <div class="print-footer">
          <p>签字医生：{{footerData.doctor}}</p>
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
import {bloodheighSickApi, sickApi, modifyCardApi} from '@/api/components/BloodheighSickcard/bloodheighSick'
import {mapState} from 'vuex'
import Bus from '@/bus.js'
import {dateFormat} from './../../untils/date.js'
// import {bloodheighSickDataApi, bloodheighSickApi, sickApi} from '@/api/components/BloodheighSickcard/bloodheighSick'
export default {
  name: 'facediag',
  components: {
    tabs,
    pane,
    medicine,
    addMedicine,
    searchMedicine,
    addSport,
    addFood
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
      labelPosition: 'left',
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
        heigh: 172,
        weight: '65',
        BMI: 2.5,
        tem: 36,
        bloodHeigh: '',
        pulse: '',
        img: ''
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
        diagnosisMsg: ''

      },
      doctorMedicine: [],
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
      // 添加或修改病历
      modify: false,
      // 病历卡id
      id: null,
      year: [],
      month: [],
      day: []
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
          this.jianchaxiangmu = this.medication.checkItem.join(',')
        }
        this.bingshiStr = this.bingshi.join(',')
        this.yichuanshiStr = this.yichuanshi.join(',')
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    getData () {
      // if()
      let params = {
        userId: this.sickID,
        adminHospitalId: this.hospitalId,
        userCasesCardId: this.userCasesCardId
      }
      // if (this.id) {
      console.log('this.id', this.id)
      // params.userCasesCardId = this.$route.params.userCasesCardId
      // }
      this.$axios(bloodheighSickApi(params))
      .then(res => {
        if (res.data) {
          if (res.data.data) {
            this.cardData = {}
            this.cardData = Object.assign({}, res.data.data)
            this.info.name = this.name
            this.info.img = process.env.IMG_URL + this.img
            this.info.sex = (this.sex === '男' ? 'man' : 'woman')
            this.info.age = this.age
            this.info.heigh = this.height
            console.log('name', this.name)
            console.log('heigh1', this.height)
            console.log('heigh', this.info.height)
            this.info.weight = this.weight
            this.medication.name = this.name
            this.medication.sex = (this.sex === '男' ? 'man' : 'woman')
            this.medication.phone = this.mobile
            this.medication.sickHistroy = this.sysIllnessHistoryNameDisease
            this.medication.inhereHistroy = this.sysIllnessHistoryNameGenetic
            this.medication.habit = this.habits
            this.medication.complication = this.sysIllnessHistoryNameBpConcurrent
            this.medication.sureSick = this.doctorDiagnos
            this.medication.symptom = this.readme
            this.medication.year = this.longtimeyear
            this.medication.month = this.longtimemonth
            this.medication.day = this.longtimeday
            this.medication.lastTime = this.lastDate
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
      let obj = {}
      obj.userId = this.sickID
      obj.doctorDiagnos = this.medication.diagnosisMsg
      obj.lastTime = dateFormat(this.medication.lastTime, 0, true)
      obj.yearsSick = this._.isNaN(parseInt(this.medication.year)) ? null : parseInt(this.medication.year)
      obj.monthSick = this._.isNaN(parseInt(this.medication.month)) ? null : parseInt(this.medication.month)
      obj.daySick = this._.isNaN(parseInt(this.medication.day)) ? null : parseInt(this.medication.day)
      obj.confirmDisease = this.medication.sureSick
      obj.isBoth = this.medication.isfirst
      obj.height = this.copyInfo.heigh || this.info.weight
      obj.weight = this.copyInfo.weight || this.info.heigh
      obj.sysIllnessHistoryIdDisease = this.medication.sickHistroy.join(',')
      obj.sysIllnessHistoryIdGenetic = this.medication.inhereHistroy.join(',')
      obj.sysIllnessHistoryIdBpConcurrent = this.medication.complication.join(',')
      obj.smoking = this.medication.smoking
      obj.drinking = this.medication.drinking
      obj.is23Sleep = this.medication.is23Sleep
      obj.sleepStatus = this.medication.sleepStatus
      // obj.sleepStatus = this.medication.sleepStatus
      obj.checkItem = this.medication.checkItem.join(',')
      console.log('this.doctorMedicine', this.doctorMedicine)
      let medicine = []
      this.doctorMedicine.forEach(item => {
        let obj = {}
        obj.medicineType = 1
        obj.medicineName = item.name
        obj.medicineId = item.id
        obj.everyDosage = item.singleuse
        // obj.medicineId =
        obj.unit = item.singleuseUnit

        obj.usageTimes = item.usetimes
        obj.remark = item.tip
        obj.totalNumber = item.usetotal
        obj.usageOff = item.usemethod
        medicine.push(obj)
        // obj.totalNumber
      })
      let sort = this._.sortBy(this.doctorMedicine, function (i) {
        return i.uselong
      })

      console.log('sortme', sort)
      // this.doctorMedicine.
      obj.days = sort[sort.length - 1].uselong
      // obj.list = JSON.stringify(JSON.stri ngify(medicine))
      // obj.list = 'json' + ':' + JSON.stringify(JSON.stringify(medicine))
      obj.json = JSON.stringify(JSON.stringify(medicine))
      console.log('JSON.stringify(medicine)', obj.list)
      // obj.list = JSON.stringify(medicine)
      // if (this.modify) {
      obj.userCasesCardId = this.userCasesCardId
      console.log('userCasesCardId', this.$route.params.userCasesCardId)
      // obj.userMakeOrderDoctorId =
      // }
      this.$axios(modifyCardApi(obj))
      .then(res => {
        if (res.data.code === '0000') {

        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: 'warning'
          })
        }
      })
      // this.$emit('complete', '1')
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
      // console.log('this.bingshi', this.bingshi)
      // console.log('this.bingshi', this.yichuanshi)
      // console.log('this.bingshi', this.jianchaxiangmu)
      // this.bingshi

      var headhtml = '<html><head></head><body>'
      var foothtml = '</body>'
      // 获取div中的html内容
      // var newhtml = document.all.item(printpage).innerHTML;
      var newhtml = document.getElementById('print').innerHTML
      // 获取div中的html内容，jquery写法如下
      // var newhtml= $("#" + printpage).html();

      // 获取原来的窗口界面body的html内容，并保存起来
      var oldhtml = document.body.innerHTML

      // 给窗口界面重新赋值，赋自己拼接起来的html内容
      document.body.innerHTML = headhtml + newhtml + foothtml
      // 调用window.print方法打印新窗口
      window.print()
      window.location.reload()
      // 将原来窗口body的html值回填展示
      document.body.innerHTML = oldhtml
      return false
    }
  },
  computed: {
    // sickID () {
    //   return this.$route.params.sickID
    // },
    // hospitalId () {
    //   return this.$route.params.hospitalId
    // },
    // 姓名
    ...mapState(['adminInfo', 'userCasesCardId']),
    name () {
      if (this.cardData) {
        if (this._.has(this.cardData, 'realName')) {
          return this.cardData.realName
        } else {
          return null
        }
      }
    },
    // 头像
    img () {
      if (this.cardData) {
        if (this._.has(this.cardData, 'userImage')) {
          return this.cardData.userImage
        } else {
          return ''
        }
      }
    },
    // 性别this._.has()
    sex () {
      if (this.cardData) {
        if (this._.has(this.cardData, 'sex')) {
          if (this.cardData.sex === 1) {
            return '男'
          }
          if (this.cardData.sex === 0) {
            return '女'
          }
        } else {
          return '男'
        }
      }
    },
    // 年龄
    age () {
      if (this.cardData) {
        if (this._.has(this.cardData, 'birthDate')) {
          let b = dateFormat(new Date())
          let a = dateFormat(this.cardData.birthDate, 0, true)
          b = parseInt(b.slice(0, 4))
          a = parseInt(a.slice(0, 4))
          console.log('age', b - a)
          // return this.cardData.age
          return b - a
        } else {
          return null
        }
      }
    },
    // 电话
    mobile () {
      if (this.cardData) {
        if (this._.has(this.cardData, 'mobile')) {
          return this.cardData.mobile
        } else {
          return null
        }
      }
    },
    // 医生诊断
    doctorDiagnos () {
      if (this.cardData) {
        if (this._.has(this.cardData, 'doctorDiagnos')) {
          return this.cardData.doctorDiagnos
        } else {
          return null
        }
      }
    },
    // 身高
    height () {
      if (this.cardData) {
        if (this._.has(this.cardData, 'userBody')) {
          if (this._.has(this.cardData.userBody, 'height')) {
            return this.cardData.userBody.height
          } else {
            return null
          }
        } else {
          return null
        }
      }
    },
    // 体重
    weight () {
      if (this.cardData) {
        if (this._.has(this.cardData, 'userBody')) {
          if (this._.has(this.cardData.userBody, 'weight')) {
            return this.cardData.userBody.weight
          } else {
            return null
          }
        } else {
          return null
        }
      }
    },
    // 疾病史
    sysIllnessHistoryNameDisease () {
      // this.cardData
      console.log('this.cardData', this.cardData)
      if (this.cardData) {
        if (this._.has(this.cardData, 'userBody')) {
          if (this._.has(this.cardData.userBody, 'sysIllnessHistoryIdDisease')) {
            // let list = []
            // this.
            let sicklist = this.cardData.userBody.sysIllnessHistoryIdDisease.split(',')
            console.log('sysIllnessHistoryIdDisease', sicklist)
            // if(sicklist.length !==0){
            // sicklist.forEach(item => {
            //   item = parseInt(item)
            // })
            // }
            // sicklist.forEach(item => {
            //   let obj ={}
            //   obj.
            // })
            sicklist = this._.uniqWith(sicklist, this._.isEqual)
            return sicklist
            // return this.cardData.userBody.sysIllnessHistoryNameDisease
          } else {
            return []
          }
        } else {
          return []
        }
      }
    },
    // 家族遗传史
    sysIllnessHistoryNameGenetic () {
      if (this.cardData) {
        if (this._.has(this.cardData, 'userBody')) {
          if (this._.has(this.cardData.userBody, 'sysIllnessHistoryIdGenetic')) {
            let sicklist = this.cardData.userBody.sysIllnessHistoryIdGenetic.split(',')
            sicklist = this._.uniqWith(sicklist, this._.isEqual)
            return sicklist
          } else {
            return []
          }
        } else {
          return []
        }
      }
    },
    // 生活喜好
    habits () {
      let habits = []
      let str = ''
      if (this.cardData) {
        if (this._.has(this.cardData, 'userBody')) {
          if (this._.has(this.cardData.userBody, 'highSaltStatus')) {
            if (this.cardData.userBody.highSaltStatus === 1) {
              habits.push('长期膳食高盐')
            }
            if (this.cardData.userBody.highSaltStatus === 2) {
              habits.push('无长期膳食高盐')
            }
          }
          if (this._.has(this.cardData.userBody, 'sleepStatus')) {
            if (this.cardData.userBody.sleepStatus === 1) {
              this.medication.sleepStatus = '1'
              habits.push('睡眠规律')
            }
            if (this.cardData.userBody.sleepStatus === 2) {
              this.medication.sleepStatus = '2'
              habits.push('睡眠不规律')
            }
          }
          if (this._.has(this.cardData.userBody, 'smoking')) {
            if (this.cardData.userBody.smoking === 1) {
              this.medication.smoking = '1'
              habits.push('抽烟')
            }
            if (this.cardData.userBody.smoking === 2) {
              this.medication.smoking = '2'
              habits.push('不抽烟')
            }
            if (this.cardData.userBody.smoking === 3) {
              this.medication.smoking = '3'
              habits.push('已戒烟')
            }
          }
          if (this._.has(this.cardData.userBody, 'is23Sleep')) {
            if (this.cardData.userBody.is23Sleep === 1) {
              this.medication.is23Sleep = '1'
              habits.push('23点前睡觉')
            }
            if (this.cardData.userBody.is23Sleep === 2) {
              this.medication.is23Sleep = '0'
              habits.push('没有23点前睡觉')
            }
          }
          if (this._.has(this.cardData.userBody, 'dietStatus')) {
            if (this.cardData.userBody.dietStatus === 1) {
              habits.push('饮食规律')
            }
            if (this.cardData.userBody.dietStatus === 2) {
              habits.push('饮食不规律')
            }
          }
          if (this._.has(this.cardData.userBody, 'medicineStatus')) {
            if (this.cardData.userBody.medicineStatus === 1) {
              habits.push('长期服用止痛药或镇定催眠药')
            }
            if (this.cardData.userBody.medicineStatus === 2) {
              habits.push('没有长期服用止痛药或镇定催眠药')
            }
          }
          if (this._.has(this.cardData.userBody, 'urineStatus')) {
            if (this.cardData.userBody.urineStatus === 1) {
              habits.push('大小便正常')
            }
            if (this.cardData.userBody.urineStatus === 2) {
              habits.push('大小便不正常')
            }
          }
          if (this._.has(this.cardData.userBody, 'drinking')) {
            if (this.cardData.userBody.drinking === 1) {
              this.medication.drinking = '1'
              habits.push('从不饮酒')
            }
            if (this.cardData.userBody.drinking === 2) {
              this.medication.drinking = '2'
              habits.push('偶尔饮酒')
            }
            if (this.cardData.userBody.drinking === 3) {
              this.medication.drinking = '3'
              habits.push('经常饮酒')
            }
            if (this.cardData.userBody.drinking === 4) {
              this.medication.drinking = '4'
              habits.push('每天饮酒')
            }
          }
        }
      }
      if (habits.length !== 0) {
        str = habits.join('、')
      }
      return str
    },
    // 血压并发症
    sysIllnessHistoryNameBpConcurrent () {
      if (this.cardData) {
        if (this._.has(this.cardData, 'userBody')) {
          if (this._.has(this.cardData.userBody, 'sysIllnessHistoryIdBpConcurrent')) {
            let sicklist = this.cardData.userBody.sysIllnessHistoryIdBpConcurrent.split(',')
            sicklist = this._.uniqWith(sicklist, this._.isEqual)
            return sicklist
          } else {
            return []
          }
        } else {
          return []
        }
      }
    },
    createTime () {
      if (this.cardData) {
        if (this._.has(this.cardData, 'userBody')) {
          if (this._.has(this.cardData.userBody, 'createTime')) {
            return this.cardData.userBody.createTime
          } else {
            return ''
          }
        } else {
          return ''
        }
      }
    },
    readme () {
      if (this.cardData) {
        if (this._.has(this.cardData, 'userCasesCard')) {
          if (this._.has(this.cardData.userCasesCard, 'readme')) {
            // let sicklist = this.cardData.userBody.sysIllnessHistoryIdBpConcurrent.split(',')
            // sicklist = this._.uniqWith(sicklist, this._.isEqual)
            // return sicklist
            return this.cardData.userCasesCard.readme
          } else {
            return null
          }
        } else {
          return null
        }
      }
    },
    longtimeyear () {
      if (this.cardData) {
        if (this._.has(this.cardData, 'userCasesCard')) {
          if (this._.has(this.cardData.userCasesCard, 'yearsSick')) {
            // let sicklist = this.cardData.userBody.sysIllnessHistoryIdBpConcurrent.split(',')
            // sicklist = this._.uniqWith(sicklist, this._.isEqual)
            // return sicklist
            return this.cardData.userCasesCard.yearsSick
          } else {
            return null
          }
        } else {
          return null
        }
      }
    },
    longtimemonth () {
      if (this.cardData) {
        if (this._.has(this.cardData, 'userCasesCard')) {
          if (this._.has(this.cardData.userCasesCard, 'monthSick')) {
            // let sicklist = this.cardData.userBody.sysIllnessHistoryIdBpConcurrent.split(',')
            // sicklist = this._.uniqWith(sicklist, this._.isEqual)
            // return sicklist
            return this.cardData.userCasesCard.monthSick
          } else {
            return null
          }
        } else {
          return null
        }
      }
    },
    longtimeday () {
      if (this.cardData) {
        if (this._.has(this.cardData, 'userCasesCard')) {
          if (this._.has(this.cardData.userCasesCard, 'daySick')) {
            // let sicklist = this.cardData.userBody.sysIllnessHistoryIdBpConcurrent.split(',')
            // sicklist = this._.uniqWith(sicklist, this._.isEqual)
            // return sicklist
            return this.cardData.userCasesCard.daySick
          } else {
            return null
          }
        } else {
          return null
        }
      }
    },
    lastDate () {
      if (this.cardData) {
        if (this._.has(this.cardData, 'userCasesCard')) {
          if (this._.has(this.cardData.userCasesCard, 'lastTime')) {
            // let sicklist = this.cardData.userBody.sysIllnessHistoryIdBpConcurrent.split(',')
            // sicklist = this._.uniqWith(sicklist, this._.isEqual)
            // return sicklist
            return this.cardData.userCasesCard.lastTime
          } else {
            return null
          }
        } else {
          return null
        }
      }
    }
  },
  mounted () {
    console.log('this.router', this.$route)
    this.id = this.$route.params.userCasesCardId
    this.currentDate = dateFormat(new Date(), 0, true)
    let vm = this
    Bus.$on('modifySickCard', function (val) {
      this.id = val.cardid || this.$route.params.id

      if (val.modify) {
        this.modify = true
        // this.id = val.cardid
      }
    })
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

    Promise.all([promise1, promise2, promise3]).then(function (results) {
      vm.getData()
    })
    // this.getbingshiList()
    // this.getyichuanshiList()
    // this.getgaoxueyabingfazhengList()
    // this.getData()
    console.log('this.adminInfo.name', this.adminInfo.name)
  }
}
</script>

<style lang="scss" scoped>
  // $border-color-input:#dcdfe6;#ebeef5
  $border-color-input:#eaeaea;
  // $border-color-input:#ebeef5;
  $border-radius:4px;
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
    height: 30px;
    border:1px solid $border-color-input;
    border-radius: $border-radius;
    outline: none;
    /*很关键：将默认的select选择框样式清除*/
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
    background: url('~icon/hospital-icon-199.png') no-repeat scroll right 3px center transparent;
    /*为下拉小箭头留出一点位置，避免被文字覆盖*/
    padding-right: 20px;
    padding-left: 4px;
    background-color: #fff;
    font-size: 14px;
    cursor: pointer;
    // text-align: center;
  }
  /*清除ie的默认选择框样式清除，隐藏下拉箭头*/
  select::-ms-expand { display: none; }
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
    width: 40px;
    // height: 20px;
  }
  .single-use{
    width: 25px;
    height: 25px;
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
  .case-left {height: 100%;min-height: 750px;min-width: $left-width; background-color: #fff;}  
  .case-right{height: 770px;min-height: 750px;min-width: $right-width;background-color: #fff;}
  .margin-top{
    margin-top:20px;
  }
  .case-wrap{
    margin-bottom: 8px;
    background: #fff;
  }
  .case-left{
    $font-color:#041421;
    $border-color:#a19696;
    text-align: center;
    padding-bottom: 20px;
    height: inherit;
    input{
      width: 80px;
    }
    .label{
      display: inline-block;
      width: 50px;
    }
    img{
      width: 120px;
    }
    &-img{
      margin-top:36px;
      text-align: center;
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
      margin-left: 36px;
      &-single{
        margin-bottom: 20px;
        color: $font-color;
      }
    }
  }
  .case-main{
    height: inherit;
    .label-width{
      // width: 100px;
    }
    &-content{
      // margin:0 8px;
      background-color: #fff;
      padding:15px;
      border-left:8px solid #f4f6f9;
      border-right:8px solid #f4f6f9;
      // min-height: 940px;
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
    display: none;
    div:nth-last-child(n+2){
      border-bottom: 1px solid #eaeaea;
    }
    padding-bottom: 30px;
    position: relative;
    span{
      display: inline-block;
      margin-top:10px;
      margin-bottom:10px;
      margin-right: 30px;
    }
    &-footer{
      position: absolute;
      bottom: 5px;
      right: 150px;
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
.pick-date-wrap{
  display: flex;
  
  /* justify-content: space-around; */
}
.pick-date-wrap div{
  width: 56px;
  padding-right: 5px;
  /* justify-content: space-around; */
}
</style>


