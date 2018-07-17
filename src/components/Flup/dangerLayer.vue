<template>
  <div class="danger-layer">
    <div class="gap-bottom">
      <el-card>
        <div>
          <span class="title-name">{{realName}}</span>
          <button @click="call" class="voice-btn">语音</button>
        </div>
      </el-card>
    </div>
    <div v-if="showResult">

      <div class="gap-bottom">
        <span class="heart-layer">心血管分层</span>
      </div>
      <div class="gap-bottom">
        <el-card>
          <div class="card-head-title">
            <p>评估结果</p>
          </div>
          <div class="gap-bottom">
            <span>危险等级：</span>
            <span class="danger-btn-text" :style="{'background':computeDanger(result.dangerLevel)}">
              {{danger(result.dangerLevel)}}
            </span>
          </div>
          <div>
            <div class="line-block gap-right">
              <span>危险因素：</span>
              <span class="red-text">{{result.danger?result.danger:'暂无'}}</span>
            </div>
            <div class="line-block gap-right">
              <span>靶器官损害：</span>
              <span class="red-text">{{result.organDamage?result.organDamage:'暂无'}}</span>
            </div>
            <div class="line-block gap-right">
              <span>临床疾患：</span>
              <span class="red-text">{{result.disease?result.disease:'暂无'}}</span>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <el-form>
      <div class="gap-bottom">
        <el-card>
          <div class="card-head-title">
            <p>身体指标</p>
          </div>
          <div class="gap-bottom">
            <el-row :gutter="20">
              <el-col :span="6">
                <span>出生日期</span>
                <el-date-picker
                  v-model="birthDate"
                  type="date"
                  size="small"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
                <!-- <numberinput
                v-model="birthDate"
                :leftOffset="45"
                :rightOffset="5">
                  <template slot="left">
                    <span>
                    年龄：
                    </span>
                  </template>
                </numberinput> -->
                <!-- <el-input placeholder="" v-model="body" size="small">
                  <template slot="prefix">
                    <span class="input-tip">年龄：</span>
                  </template>
                  <template slot="suffix">
                    <span class="input-tip">cm</span>
                  </template>
                </el-input> -->
              </el-col>
              <el-col :span="6">
                <numberinput
                v-model="height"
                :leftOffset="45"
                :rightOffset="30">
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
                <!-- <el-input placeholder="" v-model="body" size="small">
                  <template slot="prefix">
                    <span class="input-tip">身高：</span>
                  </template>
                  <template slot="suffix">
                    <span class="input-tip">cm</span>
                  </template>
                </el-input> -->
              </el-col>
              <el-col :span="6">
                <numberinput
                v-model="weight"
                :leftOffset="45"
                :rightOffset="30">
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
              </el-col>
              <el-col :span="6">
                <numberinput
                v-model="waistWai"
                :leftOffset="45"
                :rightOffset="30">
                  <template slot="left">
                    <span>
                    胸围：
                    </span>
                  </template>
                  <template slot="right">
                    <span>
                    尺
                    </span>
                  </template>
                </numberinput>
              </el-col>
            </el-row>
          </div>
          <div>
            <div class="line-block">
              <el-form-item label="性别" label-width="40px">
                <el-select v-model="sex" size="small" placeholder="请选择" style="{'width':'60px'}">
                  <el-option
                    label="男"
                    :value="1">
                  </el-option>
                  <el-option
                    label="女"
                    :value="0">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="line-block">
              <el-form-item label="是否吸烟" label-width="110px">
                <el-select v-model="smoking" size="small" placeholder="请选择" style="{'width':'60px'}">
                  <el-option
                    label="是"
                    :value="1">
                  </el-option>
                  <el-option
                    label="否"
                    :value="2">
                  </el-option>
                  <el-option
                    label="已戒烟"
                    :value="3">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="line-block">
              <el-form-item label="早发心血管病家族史" label-width="170px">
                <el-select v-model="heartVesselsFamilyHistory" size="small" placeholder="请选择" style="{'width':'60px'}">
                  <el-option
                    label="有"
                    :value="1">
                  </el-option>
                  <el-option
                    label="无"
                    :value="0">
                  </el-option>
                </el-select>
              </el-form-item>

            </div>
          </div>
        </el-card>
      </div>
      <div class="gap-bottom">
        <el-card>
          <div class="card-head-title">
            <p>血脂</p>
          </div>
          <div class="gap-bottom">
            <el-row :gutter="20">
                <div class="radio-box line-block">
                  <div class="line-block">
                    <span>总胆固醇(mg/24h)：</span>
                  </div>
                  <div class="line-block">
                    <!-- <div class="line-block gap-right">
                      <el-radio-group 
                        v-model="cholesterolTotal"
                        size="small">
                        <el-radio :label="1">mmol/L</el-radio>
                        <el-radio :label="2">mg/dl</el-radio>
                      </el-radio-group>
                    </div> -->
                    <el-radio-group 
                      v-model="cholesterolTotal"
                      size="small">
                      <el-radio :label="1">&gt;5.7</el-radio>
                      <el-radio :label="2">&lt;=5.7</el-radio>
                      <!-- <el-radio :label="3">&gt;6.9</el-radio> -->
                    </el-radio-group>
                  </div>
                </div>
                <div class="radio-box line-block">
                  <div class="line-block">
                    <span>高密度脂蛋白胆固醇：</span>
                  </div>
                  <div class="line-block">
                    <el-radio-group 
                      v-model="highProteinCholesterol"
                      size="small">
                      <el-radio :label="1">&lt;1.0</el-radio>
                      <el-radio :label="2">&gt;=1.0</el-radio>
                      <!-- <el-radio :label="3">&gt;6.9</el-radio> -->
                    </el-radio-group>
                  </div>
                </div>
                <div class="radio-box line-block">
                  <div class="line-block">
                    <span>低密度脂蛋白胆固醇：</span>
                  </div>
                  <div class="line-block">
                    <el-radio-group 
                      v-model="lowProteinCholesterol"
                      size="small">
                      <el-radio :label="1">&gt;3.3</el-radio>
                      <el-radio :label="2">&lt;=3.3</el-radio>
                    </el-radio-group>
                  </div>
                </div>
            </el-row>
          </div>
          <div>
            <div>
              <span>检查单：</span>
              <!-- <a :class="['a-upload',bloodFatUrls?'hasapload':'unapload']" title="上传"> 
                <input type="file" accept="image/jpg" @change="uploadFile('bloodFatUrls',$event)">
                <span class="iconfont icon-chakanwenjian icon"></span>
                <span>血生化-血脂</span>
              </a> -->
              <button @click.prevent="openCheckItemDialog('bloodFatUrls')" 
              :class="['check-btn',bloodFatUrls.length!==0?'hasapload':'unapload']">
                <span class="iconfont icon-chakanwenjian icon"></span>
                血生化-血脂
              </button>
            </div>
          </div>
        </el-card>
      </div>
      <div class="gap-bottom">
        <el-card>
          <div class="card-head-title">
            <p>血同型半胱氨酸（Hcy）</p>
          </div>
          <div class="gap-bottom">
            <div class="width">
              <numberinput
              v-model="hcy"
              :leftOffset="150"
              :rightOffset="60">
                <template slot="left">
                  <span>
                  血同型半胱氨酸(Hcy)：
                  </span>
                </template>
                <template slot="right">
                  <span>
                  umol/L
                  </span>
                </template>
              </numberinput>
            </div>
          </div>
          <div>
            <div>
              <span>检查单：</span>
              <!-- <a :class="['a-upload',hcyUrls?'hasapload':'unapload']" title="上传"> 
                <input type="file" accept="image/jpg" @change="uploadFile('hcyUrls',$event)">
                <span class="iconfont icon-chakanwenjian icon"></span>
                <span>同型半胱氨酸测定</span>
              </a> -->
              <button @click.prevent="openCheckItemDialog('hcyUrls')" 
              :class="['check-btn',hcyUrls.length!==0?'hasapload':'unapload']">
                <span class="iconfont icon-chakanwenjian icon"></span>
                同型半胱氨酸测定
              </button>
            </div>
          </div>
        </el-card>
      </div>
      <div class="gap-bottom">
        <el-card>
          <div class="card-head-title">
            <p>血糖评估</p>
          </div>
          <div class="gap-bottom">
            <div class="radio-box line-block">
                <div class="line-block">
                  <span>空腹血糖(mmol/L)：</span>
                </div>
                <div class="line-block">
                  <el-radio-group 
                    v-model="bloodSugarEmpty"
                    size="small">
                    <el-radio :label="1">&lt;6.1</el-radio>
                    <el-radio :label="2">6.1-6.9</el-radio>
                    <el-radio :label="3">&gt;6.9</el-radio>
                  </el-radio-group>
                </div>
            </div>
            <div class="radio-box line-block">
                <div class="line-block">
                  <span>餐后两小时血糖(mmol/L)：</span>
                </div>
                <div class="line-block">
                  <el-radio-group 
                    v-model="bloodSugarAfterMealTwo"
                    size="small">
                    <el-radio :label="1">&lt;7.8</el-radio>
                    <el-radio :label="2">7.8-11.0</el-radio>
                    <el-radio :label="3">&gt;11.0</el-radio>
                  </el-radio-group>
                </div>
            </div>
            <div class="radio-box line-block">
                <div class="line-block">
                  <span>糖化血红蛋白(mmol/L)：</span>
                </div>
                <div class="line-block">
                  <el-radio-group 
                    v-model="sugarBloodProtein"
                    size="small">
                    <el-radio :label="1">&lt;6.5%</el-radio>
                    <!-- <el-radio :label="2">6.1-6.9</el-radio> -->
                    <el-radio :label="2">&gt;=6.5%</el-radio>
                  </el-radio-group>
                </div>
            </div>
          </div>
          <div>
            <div>
              <span>检查单：</span>
              <button @click.prevent="openCheckItemDialog('bloodSugarEmptyUrl')" 
              :class="['check-btn',bloodSugarEmptyUrl.length!==0?'hasapload':'unapload']">
                <span class="iconfont icon-chakanwenjian icon"></span>
                空腹血糖
              </button>
              <button @click.prevent="openCheckItemDialog('bloodSugarAfterMealTwoUrl')" 
              :class="['check-btn',bloodSugarAfterMealTwoUrl.length!==0?'hasapload':'unapload']">
                <span class="iconfont icon-chakanwenjian icon"></span>
                餐后2小时血糖
              </button>
              <button @click.prevent="openCheckItemDialog('sugarBloodProteinUrl')" 
              :class="['check-btn',sugarBloodProteinUrl.length!==0?'hasapload':'unapload']">
                <span class="iconfont icon-chakanwenjian icon"></span>
                糖化血红蛋白HbA1c
              </button>
              <!-- <a :class="['a-upload','gap-right',bloodSugarEmptyUrl?'hasapload':'unapload']" title="上传"> 
                <input type="file" accept="image/jpg" @change="uploadFile('bloodSugarEmptyUrl',$event)">
                <span class="iconfont icon-chakanwenjian icon"></span>
                <span>空腹血糖</span>
              </a>
              <a :class="['a-upload','gap-right',bloodSugarAfterMealTwoUrl?'hasapload':'unapload']" title="上传"> 
                <input type="file" accept="image/jpg" @change="uploadFile('bloodSugarAfterMealTwoUrl',$event)">
                <span class="iconfont icon-chakanwenjian icon"></span>
                <span>餐后2小时血糖</span>
              </a> -->
              <!-- <a :class="['a-upload',sugarBloodProteinUrl?'hasapload':'unapload']" title="上传"> 
                <input type="file" accept="image/jpg" @change="uploadFile('sugarBloodProteinUrl',$event)">
                <span class="iconfont icon-chakanwenjian icon"></span>
                <span>糖化血红蛋白HbA1c</span>
              </a> -->
              <!-- <button class="check-btn">
                <span class="iconfont icon-chakanwenjian icon"></span>
                同型半胱氨酸测定
              </button>
              <button class="check-btn">
                <span class="iconfont icon-chakanwenjian icon"></span>
                餐后2小时血糖
              </button>
              <button class="check-btn">
                <span class="iconfont icon-chakanwenjian icon"></span>
                糖化血红蛋白HbA1c
              </button> -->
            </div>
          </div>
        </el-card>
      </div>
      <div class="gap-bottom">
        <el-card>
          <div class="card-head-title">
            <p>肾脏评估</p>
          </div>
          <div class="gap-bottom line-block">
            <div class="radio-box line-block">
                <div class="line-block">
                  <span>血清肌酐：</span>
                </div>
                <div class="line-block">
                  <div class="line-block gap-right">
                    <el-radio-group 
                      v-model="serumCreatinineUnit"
                      size="small">
                      <el-radio :label="1">umol/L</el-radio>
                      <el-radio :label="2">mg/dl</el-radio>
                    </el-radio-group>
                  </div>
                  <el-radio-group 
                    v-model="serumCreatinineType"
                    size="small">
                    <el-radio :label="1">&lt;115</el-radio>
                    <el-radio :label="2">115-133</el-radio>
                    <el-radio :label="3">&gt;133</el-radio>
                    <!-- <el-radio :label="3">估算的肾小球滤过率&lt;60(eGFR降低)</el-radio> -->
                  </el-radio-group>
                </div>
            </div>
          </div>
          <div class="gap-bottom line-block">
            <div class="radio-box line-block">
                <div class="line-block">
                  <span>估算的肾小球滤过率&lt;60(eGFR降低)：</span>
                </div>
                <div class="line-block">
                  <el-radio-group 
                    v-model="egfr"
                    size="small">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                    <!-- <el-radio :label="3">&gt;300</el-radio> -->
                  </el-radio-group>
                </div>
            </div>
          </div>
          <div class="gap-bottom line-block">
            <div class="radio-box line-block">
                <div class="line-block">
                  <span>蛋白尿值(mg/24h)：</span>
                </div>
                <div class="line-block">
                  <el-radio-group 
                    v-model="proteinUrineType"
                    size="small">
                    <el-radio :label="1">&lt;30</el-radio>
                    <el-radio :label="2">30-300</el-radio>
                    <el-radio :label="3">&gt;300</el-radio>
                  </el-radio-group>
                </div>
            </div>
          </div>
          <div>
            <div>
              <span>检查单：</span>
              <button @click.prevent="openCheckItemDialog('bloodCreatinineUrls')" 
              :class="['check-btn',bloodCreatinineUrls.length!==0?'hasapload':'unapload']">
                <span class="iconfont icon-chakanwenjian icon"></span>
                血生化-血肌酐
              </button>
              <button @click.prevent="openCheckItemDialog('routineUrineUrls')" 
              :class="['check-btn',routineUrineUrls.length!==0?'hasapload':'unapload']">
                <span class="iconfont icon-chakanwenjian icon"></span>
                尿常规
              </button>
              <button @click.prevent="openCheckItemDialog('routineProteinUrls')" 
              :class="['check-btn',routineProteinUrls.length!==0?'hasapload':'unapload']">
                <span class="iconfont icon-chakanwenjian icon"></span>
                尿蛋白
              </button>
              
              <!-- <a :class="['a-upload','gap-right',bloodFatUrls?'hasapload':'unapload']" title="上传"> 
                <input type="file" accept="image/jpg" @change="uploadFile('bloodFatUrls',$event)">
                <span class="iconfont icon-chakanwenjian icon"></span>
                <span>血生化-血肌酐</span>
              </a> -->
              <!-- <a :class="['a-upload','gap-right',routineUrineUrls?'hasapload':'unapload']" title="上传"> 
                <input type="file" accept="image/jpg" @change="uploadFile('routineUrineUrls',$event)">
                <span class="iconfont icon-chakanwenjian icon"></span>
                <span>尿常规</span>
              </a> -->
              <!-- <a :class="['a-upload','gap-right',routineProteinUrls?'hasapload':'unapload']" title="上传"> 
                <input type="file" accept="image/jpg" @change="uploadFile('routineProteinUrls',$event)">
                <span class="iconfont icon-chakanwenjian icon"></span>
                <span>尿蛋白</span>
              </a> -->
            </div>
          </div>
        </el-card>
      </div>
      <div class="gap-bottom">
        <el-card>
          <div class="card-head-title">
            <p>心脏评估</p>
          </div>
          <div class="gap-bottom line-block">
            <div class="radio-box line-block">
                <div class="line-block">
                  <span>心电图指标：</span>
                </div>
                <div class="line-block">
                  <el-radio-group 
                    v-model="ecgType"
                    size="small">
                    <el-radio :label="1">Sokolow-lyon&gt;38mm或cornell&gt;2440mm.ms</el-radio>
                    <el-radio :label="2">正常</el-radio>
                  </el-radio-group>
                </div>
            </div>
          </div>
          <div class="gap-bottom line-block">
            <div class="radio-box line-block">
                <div class="line-block">
                  <span>超声心动图LVMI指标(g/m2)：</span>
                </div>
                <div class="line-block">
                  <el-radio-group 
                    v-model="lvmlType"
                    size="small">
                    <el-radio :label="1">&gt;=125</el-radio>
                    <!-- <el-radio :label="2">30-300</el-radio> -->
                    <el-radio :label="2">&lt;125</el-radio>
                  </el-radio-group>
                </div>
            </div>
          </div>
          <div class="gap-bottom line-block">
            <div class="radio-box line-block">
                <div class="line-block">
                  <span>心脏扩大：</span>
                </div>
                <div class="line-block">
                  <el-radio-group 
                    v-model="heartExpandType"
                    size="small">
                    <el-radio :label="1">左右心房、心室任一增大</el-radio>
                    <el-radio :label="2">无增大</el-radio>
                  </el-radio-group>
                </div>
            </div>
          </div>
          <div class="gap-bottom">
            <div class="radio-box line-block">
                <div class="line-block">
                  <span>已确诊心脏疾病：</span>
                </div>
                <div class="line-block">
                  <el-radio-group 
                    v-model="heartDisease"
                    size="small">
                    <el-radio :label="1">心肌梗死史</el-radio>
                    <el-radio :label="2">心绞痛</el-radio>
                    <el-radio :label="3">冠状动脉血运重建史</el-radio>
                    <el-radio :label="4">慢性心力衰竭</el-radio>
                    <el-radio :label="0">未知</el-radio>
                  </el-radio-group>
                </div>
            </div>
          </div>
          <div>
            <div class="line-block gap-bottom">
              <span>检查单：</span>
              <button @click.prevent="openCheckItemDialog('heartFigureUrl')" 
              :class="['check-btn',heartFigureUrl.length!==0?'hasapload':'unapload']">
                <span class="iconfont icon-chakanwenjian icon"></span>
                心电图
              </button>
              <button @click.prevent="openCheckItemDialog('heartUltrasonicUrl')" 
              :class="['check-btn',heartUltrasonicUrl.length!==0?'hasapload':'unapload']">
                <span class="iconfont icon-chakanwenjian icon"></span>
                超声心动图（心脏彩超）
              </button>
              <button @click.prevent="openCheckItemDialog('xChestUrl')" 
              :class="['check-btn',xChestUrl.length!==0?'hasapload':'unapload']">
                <span class="iconfont icon-chakanwenjian icon"></span>
                X线胸片
              </button>
              <!-- <a :class="['a-upload','gap-right',heartFigureUrl?'hasapload':'unapload']" title="上传"> 
                <input type="file" accept="image/jpg" @change="uploadFile('heartFigureUrl',$event)">
                <span class="iconfont icon-chakanwenjian icon"></span>
                <span>心电图</span>
              </a> -->
              <!-- <a :class="['a-upload','gap-right',heartUltrasonicUrl?'hasapload':'unapload']" title="上传"> 
                <input type="file" accept="image/jpg" @change="uploadFile('heartUltrasonicUrl',$event)">
                <span class="iconfont icon-chakanwenjian icon"></span>
                <span>超声心动图（心脏彩超）</span>
              </a> -->
              <!-- <a :class="['a-upload','gap-right',xChestUrl?'hasapload':'unapload']" title="上传"> 
                <input type="file" accept="image/jpg" @change="uploadFile('xChestUrl',$event)">
                <span class="iconfont icon-chakanwenjian icon"></span>
                <span>X线胸片</span>
              </a> -->
            </div>
            <div class="line-block gap-bottom">
              <span>高级检查单：</span>
              <button @click.prevent="openCheckItemDialog('heartMrlMraUrl')" 
              :class="['check-btn',heartMrlMraUrl.length!==0?'hasapload':'unapload']">
                <span class="iconfont icon-chakanwenjian icon"></span>
                心脏MRI 磁共振血管造影 (MRA)
              </button>
              <button @click.prevent="openCheckItemDialog('ctaUrl')" 
              :class="['check-btn',ctaUrl.length!==0?'hasapload':'unapload']">
                <span class="iconfont icon-chakanwenjian icon"></span>
                计算机断层扫描血管造影
              </button>
              <button @click.prevent="openCheckItemDialog('heartWithUrl')" 
              :class="['check-btn',heartWithUrl.length!==0?'hasapload':'unapload']">
                <span class="iconfont icon-chakanwenjian icon"></span>
                心脏同位素显像
              </button>
              <button @click.prevent="openCheckItemDialog('movementUrl')" 
              :class="['check-btn',movementUrl.length!==0?'hasapload':'unapload']">
                <span class="iconfont icon-chakanwenjian icon"></span>
                运动实验 或冠状动脉造影
              </button>
              <!-- <a :class="['a-upload','gap-right',heartMrlMraUrl?'hasapload':'unapload']" title="上传"> 
                <input type="file" accept="image/jpg" @change="uploadFile('heartMrlMraUrl',$event)">
                <span class="iconfont icon-chakanwenjian icon"></span>
                <span>心脏MRI 磁共振血管造影 (MRA)</span>
              </a> -->
              <!-- <a :class="['a-upload','gap-right',ctaUrl?'hasapload':'unapload']" title="上传"> 
                <input type="file" accept="image/jpg" @change="uploadFile('ctaUrl',$event)">
                <span class="iconfont icon-chakanwenjian icon"></span>
                <span>计算机断层扫描血管造影 (CTA)</span>
              </a> -->
              <!-- <a :class="['a-upload','gap-right',heartWithUrl?'hasapload':'unapload']" title="上传"> 
                <input type="file" accept="image/jpg" @change="uploadFile('heartWithUrl',$event)">
                <span class="iconfont icon-chakanwenjian icon"></span>
                <span>心脏同位素显像</span>
              </a> -->
              <!-- <a :class="['a-upload','gap-right',movementUrl?'hasapload':'unapload']" title="上传"> 
                <input type="file" accept="image/jpg" @change="uploadFile('movementUrl',$event)">
                <span class="iconfont icon-chakanwenjian icon"></span>
                <span>运动实验 或冠状动脉造影</span>
              </a> -->
            </div>
          </div>
        </el-card>
      </div>
      <div class="gap-bottom">
        <el-card>
          <div class="card-head-title">
            <p>外周血管评估</p>
          </div>
          <div class="gap-bottom line-block">
            <span>靶器官损害</span>
            <div class="radio-box line-block">
                <div class="line-block">
                  <span>颈-股动脉脉搏波 速度(m/s)：</span>
                </div>
                <div class="line-block">
                  <el-radio-group 
                    v-model="neckStocksSpeedType"
                    size="small">
                    <el-radio :label="1">&gt;=12</el-radio>
                    <el-radio :label="2">&lt;12</el-radio>
                  </el-radio-group>
                </div>
            </div>
          </div>
          <div class="gap-bottom line-block">
            <div class="radio-box line-block">
                <div class="line-block">
                  <span>踝臂血压指数：</span>
                </div>
                <div class="line-block">
                  <el-radio-group 
                    v-model="ankleArmIndex"
                    size="small">
                    <el-radio :label="1">&lt;0.9</el-radio>
                    <!-- <el-radio :label="2">30-300</el-radio> -->
                    <el-radio :label="2">&gt;=0.9</el-radio>
                  </el-radio-group>
                </div>
            </div>
          </div>
          <div class="gap-bottom line-block">
            <div class="radio-box line-block">
                <div class="line-block">
                  <span>颈动脉超声(IMT)：</span>
                </div>
                <div class="line-block">
                  <el-radio-group 
                    v-model="imtType"
                    size="small">
                    <el-radio :label="1">&gt;=0.9mm或动脉粥样板块</el-radio>
                    <el-radio :label="2">&lt;0.9mm</el-radio>
                  </el-radio-group>
                </div>
            </div>
          </div>
          <div class="gap-bottom">
            <span>临床疾患</span>
            <div class="radio-box line-block">
                <div class="line-block">
                  <span>外周血管疾病：</span>
                </div>
                <div class="line-block">
                  <el-radio-group 
                    v-model="outsideVesselsDisease"
                    size="small">
                    <el-radio :label="1">动脉瘤、狭窄、闭塞、栓塞、主动脉夹层</el-radio>
                    <el-radio :label="2">血管外伤、血管瘤、下肢溃疡</el-radio>
                    <el-radio :label="3">静脉血栓、形成、曲张、动静脉内瘘</el-radio>
                    <el-radio :label="0">未知</el-radio>
                  </el-radio-group>
                </div>
            </div>
          </div>
          <div>
            <div>
              <span>检查单：</span>
              <button @click.prevent="openCheckItemDialog('neckSoundUrl')" 
              :class="['check-btn',neckSoundUrl.length!==0?'hasapload':'unapload']">
                <span class="iconfont icon-chakanwenjian icon"></span>
                颈动脉超声
              </button>
              <button @click.prevent="openCheckItemDialog('pulseSpeedUrl')" 
              :class="['check-btn',pulseSpeedUrl.length!==0?'hasapload':'unapload']">
                <span class="iconfont icon-chakanwenjian icon"></span>
                脉搏波传导速度
              </button>
              <button @click.prevent="openCheckItemDialog('ankleArmNumUrl')" 
              :class="['check-btn',ankleArmNumUrl.length!==0?'hasapload':'unapload']">
                <span class="iconfont icon-chakanwenjian icon"></span>
                踝臂指数
              </button>
              <button @click.prevent="openCheckItemDialog('otherVesselsUrl')" 
              :class="['check-btn',otherVesselsUrl.length!==0?'hasapload':'unapload']">
                <span class="iconfont icon-chakanwenjian icon"></span>
                其它血管检查项
              </button>
              <!-- <a :class="['a-upload','gap-right',neckSoundUrl?'hasapload':'unapload']" title="上传"> 
                <input type="file" accept="image/jpg" @change="uploadFile('neckSoundUrl',$event)">
                <span class="iconfont icon-chakanwenjian icon"></span>
                <span>颈动脉超声</span>
              </a> -->
              <!-- <a :class="['a-upload','gap-right',pulseSpeedUrl?'hasapload':'unapload']" title="上传"> 
                <input type="file" accept="image/jpg" @change="uploadFile('pulseSpeedUrl',$event)">
                <span class="iconfont icon-chakanwenjian icon"></span>
                <span>脉搏波传导速度</span>
              </a> -->
              <!-- <a :class="['a-upload','gap-right',ankleArmNumUrl?'hasapload':'unapload']" title="上传"> 
                <input type="file" accept="image/jpg" @change="uploadFile('ankleArmNumUrl',$event)">
                <span class="iconfont icon-chakanwenjian icon"></span>
                <span>踝臂指数</span>
              </a> -->
              <!-- <a :class="['a-upload','gap-right',otherVesselsUrl?'hasapload':'unapload']" title="上传"> 
                <input type="file" accept="image/jpg" @change="uploadFile('otherVesselsUrl',$event)">
                <span class="iconfont icon-chakanwenjian icon"></span>
                <span>其它血管检查项</span>
              </a> -->
            </div>
          </div>
        </el-card>
      </div>
      <div class="gap-bottom">
        <el-card>
          <div class="card-head-title">
            <p>脑评估</p>
          </div>
          <div class="gap-bottom line-block">
            <div class="radio-box line-block">
                <div class="line-block">
                  <span>脑血管疾病：</span>
                </div>
                <div class="line-block">
                  <el-radio-group 
                    v-model="brainDiseaseType"
                    size="small">
                    <el-radio :label="1">脑出血</el-radio>
                    <el-radio :label="2">缺血性脑卒中</el-radio>
                    <el-radio :label="3">短暂性脑缺血发作</el-radio>
                    <el-radio :label="0">未知</el-radio>
                  </el-radio-group>
                </div>
            </div>
          </div>
          <div>
            <div>
              <span>检查单：</span>
              <button @click.prevent="openCheckItemDialog('brainMriMraUrl')" 
              :class="['check-btn',brainMriMraUrl.length!==0?'hasapload':'unapload']">
                <span class="iconfont icon-chakanwenjian icon"></span>
                头颅MRI MRA
              </button>
              <button @click.prevent="openCheckItemDialog('brainCtaUrl')" 
              :class="['check-btn',brainCtaUrl.length!==0?'hasapload':'unapload']">
                <span class="iconfont icon-chakanwenjian icon"></span>
                CTA
              </button>
              <button @click.prevent="openCheckItemDialog('spiritStateUrl')" 
              :class="['check-btn',spiritStateUrl.length!==0?'hasapload':'unapload']">
                <span class="iconfont icon-chakanwenjian icon"></span>
                精神状态量表
              </button>
              <!-- <a :class="['a-upload','gap-right',brainMriMraUrl?'hasapload':'unapload']" title="上传"> 
                <input type="file" accept="image/jpg" @change="uploadFile('brainMriMraUrl',$event)">
                <span class="iconfont icon-chakanwenjian icon"></span>
                <span>头颅MRI MRA</span>
              </a> -->
              <!-- <a :class="['a-upload','gap-right',brainCtaUrl?'hasapload':'unapload']" title="上传"> 
                <input type="file" accept="image/jpg" @change="uploadFile('brainCtaUrl',$event)">
                <span class="iconfont icon-chakanwenjian icon"></span>
                <span>CTA</span>
              </a> -->
              <!-- <a :class="['a-upload',spiritStateUrl?'hasapload':'unapload']" title="上传"> 
                <input type="file" accept="image/jpg" @change="uploadFile('spiritStateUrl',$event)">
                <span class="iconfont icon-chakanwenjian icon"></span>
                <span>精神状态量表</span>
              </a> -->
            </div>
          </div>
        </el-card>
      </div>
      <div class="gap-bottom">
        <el-card>
          <div class="card-head-title">
            <p>眼底评估</p>
          </div>
          <div class="gap-bottom line-block">
            <div class="radio-box line-block">
                <div class="line-block">
                  <span>Keith-Wagnar分级：</span>
                </div>
                <div class="line-block">
                  <el-radio-group 
                    v-model="keithWagnarLevel"
                    size="small">
                    <el-radio :label="6">正常</el-radio>
                    <el-radio :label="1">Ⅰ视网膜动脉痉挛期</el-radio>
                    <el-radio :label="2">Ⅱ级视网膜动脉硬化期</el-radio>
                    <el-radio :label="3">Ⅲ视网膜病变期(出血、渗出)</el-radio>
                    <el-radio :label="4">Ⅳ视神经视网膜病变期(视乳头水肿)</el-radio>
                    <el-radio :label="5">Ⅴ失明</el-radio>
                  </el-radio-group>
                </div>
            </div>
          </div>
          <div>
            <div>
              <span>检查单：</span>
              <button @click.prevent="openCheckItemDialog('fundusUrl')" 
              :class="['check-btn',fundusUrl.length!==0?'hasapload':'unapload']">
                <span class="iconfont icon-chakanwenjian icon"></span>
                眼底检查(高分辨率眼底成像系统)
              </button>
              <!-- <a :class="['a-upload',fundusUrl?'hasapload':'unapload']" title="上传"> 
                <input type="file" accept="image/jpg" @change="uploadFile('fundusUrl',$event)">
                <span class="iconfont icon-chakanwenjian icon"></span>
                <span>眼底检查(高分辨率眼底成像系统)</span>
              </a> -->
            </div>
          </div>
        </el-card>
      </div>

    </el-form>
    <div class="submit-btn-wrap">
      <button class="submit-btn" @click.prevent="submit">提交</button>
    </div>
    <div v-if="imgDialog">
      <imgFloatCarousel
      :imgsrc="imgarr"
      :show="true"
      @addImg="changeImgs"
      @close="closeImg"
      >
      </imgFloatCarousel>
    </div>
    <div>
      <!-- <el-dialog
        title="检查单"
        :visible.sync="dialogVisible"
        width="90%"
        center>
        <el-carousel indicator-position="outside" arrow="always" :autoplay="false" trigger="click">
          <el-carousel-item v-for="item in 4" :key="item">
            <div class="dialog-img-box">
              <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531740671333&di=f26a31e505e2a2d6bd1a5e4b03334b02&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Ffaedab64034f78f00549571175310a55b2191c96.jpg" alt="">
            </div>
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
        <span slot="footer" class="dialog-footer">
          <el-button @click="openCheckItemDialog" type="primary">添加体检单</el-button>
        </span>
      </el-dialog> -->
    </div>
  </div>
</template>

<script>
import numberinput from './number'
import {uploadFileApi} from '@/api/components/editAdmin.js'
import {submitLayerApi, lookLayerApi} from '@/api/components/Flup/Flup.js'
import {mapState, mapMutations} from 'vuex'
import imgFloat from '@/components/imgFloat.vue'
import imgFloatCarousel from '@/components/imgFloatCarousel.vue'
export default {
  name: 'dangerLayer',
  components: {
    numberinput,
    imgFloat,
    imgFloatCarousel
  },
  data () {
    return {
      // value: null,
      // body: {
      //   birthday: null,
      //   height: null,
      //   weight: null,
      //   bust: null,
      //   sex: null,
      //   smoke: null,
      //   bloodhistroy: null
      // },
      imgarr: [
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531740671333&di=f26a31e505e2a2d6bd1a5e4b03334b02&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Ffaedab64034f78f00549571175310a55b2191c96.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531820093362&di=fa47cd471c3075484fd0980fa42871d5&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F342ac65c103853434cc02dda9f13b07eca80883a.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531820093362&di=789a8bfd582e29315ca2a71b5047d815&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Ffcfaaf51f3deb48fd0e9be27fc1f3a292cf57842.jpg'
      ],
      imgDialog: false,
      currentCheckItem: '',
      realName: null,
      sex: null,
      birthDate: null,
      bloodPressureSickStart: null,  // 患病开始时间
      systolicMaxHistory: null,  // 收缩压
      diastolicMaxHistory: null,  // 舒张压 历史最高
      height: null,  // 身高
      weight: null,  // 体重
      waistWai: null,  // 腰围
      smoking: null,  // 抽烟情况 1：是、2：否、3：已戒烟
      drinking: null,  // 饮酒情况 1：从不、2：偶尔、3：经常、4：每天
      cholesterolTotal: null,  // 总的胆固醇
      highProteinCholesterol: null,  // 高密度脂蛋白胆固醇
      lowProteinCholesterol: null,  // 低密度脂蛋白胆固醇
      bloodFatUrls: [],  // 血生化-血脂 检查单
      hcy: null,  // 血同型半胱氨酸
      hcyUrls: [],  // 同型半胱氨酸测定 检查单
      heartVesselsFamilyHistory: null,  // 早发心血管病家族史 0-无 1-有
      serumCreatinineType: null, // 血清肌酐
      serumCreatinineUnit: null, // 血清肌酐单位 1-umol/L 2-mg/dl
      // serumCreatinineUnit: null, // 血清肌酐单位 1-umol/L 2-mg/dl
      egfr: null,  // 估算的肾小球滤过率<60(eGFR降低) 是-true 否-false
      proteinUrineType: null,  // 蛋白尿值 1-小于30 2-30到300 3-大于300 单位：mg/24h
      bloodCreatinineUrls: [],  // 血生化-血肌酐检查单
      routineUrineUrls: [], // 尿常规 检查单
      routineProteinUrls: [], // 尿蛋白 检查单
      ecgType: null,  // 心电图指标类型 1- Sokolow-lyon>38mm 或 cornell>2440 mm.ms 2-正常
      lvmlType: null,  // 超声心动图LVMI指标类型 1- 大于等于125 2-小于125 单位g/m2
      heartExpandType: null,  // 心脏扩大 1- 左右心房、心室任一增大 2-无增大
      heartDisease: null,  // 已确诊心脏基本 0-未知 1-心肌梗塞 2-心绞痛 3-冠状动脉血运重建史 4-慢性心力衰竭
      heartFigureUrl: [],  // 心电图 检查单
      heartUltrasonicUrl: [],  // 超声心电图（心脏彩超） 检查单
      xChestUrl: [],  // X线胸片 检查单
      heartMrlMraUrl: [],  // 心脏MRI磁共振血管造影（MRA） 检查单
      ctaUrl: [],  // 计算机断层扫描血管造影（CTA） 检查单
      heartWithUrl: [],  // 心脏同位素显像 检查单
      movementUrl: [],  // 运动实验或冠状动脉造影 检查单
      neckStocksSpeedType: null,  // 颈-股动脉脉搏波速度 1-大于等于12 2-小于12 单位m/s
      ankleArmIndex: null, // 踝臂血压指数 1-小于0.9 2-大于等于0.9
      imtType: null, // 颈动脉超声(IMT) 1->=0.9mm或动脉粥样板块 2-<0.9mm
      outsideVesselsDisease: null, // 外周血管疾病 0-未知 1-主动脉夹层】 //2-【血管
      neckSoundUrl: [], // 颈动脉超声 检查单
      pulseSpeedUrl: [], // 脉搏波传导速度 检查单
      ankleArmNumUrl: [], // 踝臂指数 检查单
      otherVesselsUrl: [], // 其它血管检查项 检查单
      brainDiseaseType: null, // 脑血管疾病 0-未知 1-脑出血 2-缺血性脑卒中 3-短暂性脑缺血发作
      brainMriMraUrl: [], // 头颅MRI MRA 检查单
      brainCtaUrl: [], // CTA 检查单
      spiritStateUrl: [], // 精神状态量表 检查单
      keithWagnarLevel: null, // Keith-Wagnar分级
      fundusUrl: [], // 眼底检查（高分辨率眼底成像系统） 检查单
      bloodSugarEmpty: null, // 空腹血糖 1-【小于6.1】 2-【6.1到6.9】3-【大于6.9】
      bloodSugarAfterMealTwo: null, // 餐后两小时血糖 1-【小于7.8】 2-【7.8到11.0】3-【大于11.0
      sugarBloodProtein: null, // 糖化血红蛋白 1-小于百分之6.5 2-大于等于百分之6.5
      bloodSugarEmptyUrl: [], // 空腹血糖 检查单
      bloodSugarAfterMealTwoUrl: [], // 餐后两小时血糖 检查单
      sugarBloodProteinUrl: [], // 糖化血红蛋白HbA1c 检查单
      inDoctoeIdentify: null, // 中医辨证
      sysIllnessHistoryIdDisease: null, // 疾病史id集合
      sysIllnessHistoryIdGenetic: null, // 家族遗传病史 id集合
      userId: null, // 患者id
      adminHospitalId: null, // 诊所id
      result: {
        disease: null,
        dangerLevel: null,
        organDamage: null, // 靶器官 信息
        danger: null
      },
      showResult: false
    }
  },
  computed: {
    ...mapState(['FlupInfo', 'adminInfo'])
  },
  methods: {
    ...mapMutations([
      'addChatFriend',
      'changeChatFriend',
      'openChatWindow'
    ]),
    openCheckItemDialog (val) {
      console.log('检查单', val)
      this.imgDialog = true
      this.imgarr = this[val]
      this.currentCheckItem = val
    },
    changeImgs (arr) {
      this[this.currentCheckItem] = arr
      console.log('添加体检单', this[this.currentCheckItem], arr)
    },
    closeImg () {
      this.imgDialog = false
    },
    uploadFile: function (val, e) {
      // uploadFileApi
      // let vm = this
      let file = e.target.files[0]
      let formdata = new FormData()
      formdata.append('files', file)
      // image.src = window.URL.createObjectURL(files.item(dd))
      this.$axios(uploadFileApi(formdata))
      .then(res => {
        if (res.data.code === '0000') {
          this[val] = res.data.data.saveFile
          this.$message({
            message: '上传成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '上传失败',
            type: 'waring'
          })
        }
        return false
      })
    },
    submit () {
      let obj = {}
      obj.userId = this.FlupInfo.userId
      obj.adminHospitalId = this.FlupInfo.adminHospitalId
      if (this.realName !== null) {
        obj.realName = this.realName
      }
      if (this.sex !== null) {
        obj.sex = this.sex
      }
      if (this.birthDate !== null) {
        obj.birthDate = this.birthDate
      }
      if (this.bloodPressureSickStart !== null) {
        obj.bloodPressureSickStart = this.bloodPressureSickStart
      }
      if (this.systolicMaxHistory !== null) {
        obj.systolicMaxHistory = this.systolicMaxHistory
      }
      if (this.diastolicMaxHistory !== null) {
        obj.diastolicMaxHistory = this.diastolicMaxHistory
      }
      if (this.height !== null) {
        obj.height = this.height
      }
      if (this.weight !== null) {
        obj.weight = this.weight
      }
      if (this.waistWai !== null) {
        obj.waistWai = this.waistWai
      }
      if (this.smoking !== null) {
        obj.smoking = this.smoking
      }
      if (this.drinking !== null) {
        obj.drinking = this.drinking
      }
      if (this.cholesterolTotal !== null) {
        obj.cholesterolTotal = this.cholesterolTotal
      }
      if (this.highProteinCholesterol !== null) {
        obj.highProteinCholesterol = this.highProteinCholesterol
      }
      if (this.lowProteinCholesterol !== null) {
        obj.lowProteinCholesterol = this.lowProteinCholesterol
      }
      if (this.bloodFatUrls !== []) {
        obj.bloodFatUrls = this.bloodFatUrls.join(',')
      }
      if (this.hcy !== null) {
        obj.hcy = this.hcy
      }
      if (this.hcyUrls !== []) {
        obj.hcyUrls = this.hcyUrls
      }
      if (this.heartVesselsFamilyHistory !== null) {
        obj.heartVesselsFamilyHistory = this.heartVesselsFamilyHistory
      }
      if (this.serumCreatinineType !== null) {
        obj.serumCreatinineType = this.serumCreatinineType
      }
      if (this.serumCreatinineUnit !== null) {
        obj.serumCreatinineUnit = this.serumCreatinineUnit
      }
      if (this.egfr !== null) {
        obj.egfr = this.egfr
      }
      if (this.proteinUrineType !== null) {
        obj.proteinUrineType = this.proteinUrineType
      }
      if (this.bloodCreatinineUrls !== []) {
        obj.bloodCreatinineUrls = this.bloodCreatinineUrls.join(',')
      }
      if (this.routineProteinUrls !== []) {
        obj.routineProteinUrls = this.routineProteinUrls.join(',')
      }
      if (this.lvmlType !== null) {
        obj.lvmlType = this.lvmlType
      }
      if (this.heartExpandType !== null) {
        obj.heartExpandType = this.heartExpandType
      }
      if (this.heartDisease !== null) {
        obj.heartDisease = this.heartDisease
      }
      if (this.heartFigureUrl !== []) {
        obj.heartFigureUrl = this.heartFigureUrl.join(',')
      }
      if (this.heartUltrasonicUrl !== []) {
        obj.heartUltrasonicUrl = this.heartUltrasonicUrl.join(',')
      }
      if (this.xChestUrl !== []) {
        obj.xChestUrl = this.xChestUrl.join(',')
      }
      if (this.heartMrlMraUrl !== []) {
        obj.heartMrlMraUrl = this.heartMrlMraUrl.join(',')
      }
      if (this.ctaUrl !== []) {
        obj.ctaUrl = this.ctaUrl.join(',')
      }
      if (this.heartWithUrl !== []) {
        obj.heartWithUrl = this.heartWithUrl.join(',')
      }
      if (this.movementUrl !== []) {
        obj.movementUrl = this.movementUrl.join(',')
      }
      if (this.neckStocksSpeedType !== null) {
        obj.neckStocksSpeedType = this.neckStocksSpeedType
      }
      if (this.ankleArmIndex !== null) {
        obj.ankleArmIndex = this.ankleArmIndex
      }
      if (this.imtType !== null) {
        obj.imtType = this.imtType
      }
      if (this.outsideVesselsDisease !== null) {
        obj.outsideVesselsDisease = this.outsideVesselsDisease
      }
      if (this.neckSoundUrl !== []) {
        obj.neckSoundUrl = this.neckSoundUrl.join(',')
      }
      if (this.pulseSpeedUrl !== []) {
        obj.pulseSpeedUrl = this.pulseSpeedUrl.join(',')
      }
      if (this.ankleArmNumUrl !== []) {
        obj.ankleArmNumUrl = this.ankleArmNumUrl.join(',')
      }
      if (this.otherVesselsUrl !== []) {
        obj.otherVesselsUrl = this.otherVesselsUrl.join(',')
      }
      if (this.brainDiseaseType !== null) {
        obj.brainDiseaseType = this.brainDiseaseType
      }
      if (this.brainMriMraUrl !== []) {
        obj.brainMriMraUrl = this.brainMriMraUrl.join(',')
      }
      if (this.spiritStateUrl !== []) {
        obj.spiritStateUrl = this.spiritStateUrl.join(',')
      }
      if (this.keithWagnarLevel !== null) {
        obj.keithWagnarLevel = this.keithWagnarLevel
      }
      if (this.fundusUrl !== []) {
        obj.fundusUrl = this.fundusUrl.join(',')
      }
      if (this.bloodSugarEmpty !== null) {
        obj.bloodSugarEmpty = this.bloodSugarEmpty
      }
      if (this.bloodSugarAfterMealTwo !== null) {
        obj.bloodSugarAfterMealTwo = this.bloodSugarAfterMealTwo
      }
      if (this.sugarBloodProtein !== null) {
        obj.sugarBloodProtein = this.sugarBloodProtein
      }
      if (this.bloodSugarEmptyUrl !== []) {
        obj.bloodSugarEmptyUrl = this.bloodSugarEmptyUrl.join(',')
      }
      if (this.bloodSugarAfterMealTwoUrl !== []) {
        obj.bloodSugarAfterMealTwoUrl = this.bloodSugarAfterMealTwoUrl.join(',')
      }
      if (this.sugarBloodProteinUrl !== []) {
        obj.sugarBloodProteinUrl = this.sugarBloodProteinUrl.join(',')
      }
      if (this.inDoctoeIdentify !== null) {
        obj.inDoctoeIdentify = this.inDoctoeIdentify
      }
      if (this.bloodPressureSickStart !== null) {
        obj.bloodPressureSickStart = this.bloodPressureSickStart
      }
      if (this.sysIllnessHistoryIdDisease !== null) {
        obj.sysIllnessHistoryIdDisease = this.sysIllnessHistoryIdDisease
      }
      if (this.sysIllnessHistoryIdGenetic !== null) {
        obj.sysIllnessHistoryIdGenetic = this.sysIllnessHistoryIdGenetic
      }
      this.$axios(submitLayerApi(obj))
      .then(res => {
        if (res.data.code === '0000') {
          this.result = this._.merge(this.result, res.data.data)
          this.showResult = true
          this.$message({
            message: '评估成功',
            type: 'success'
          })
          // this.$router.go(-1)
        } else {
          this.$message({
            message: res.data.msg,
            type: 'waring'
          })
        }
      })
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
    getLayerData () {
      let obj = {}
      obj.userId = this.FlupInfo.userId
      obj.adminHospitalId = this.FlupInfo.adminHospitalId
      this.$axios(lookLayerApi(obj))
      .then(res => {
        if (res.data.data) {
          let resdata = res.data.data
          if (this._.has(resdata, 'realName')) {
            this.realName = resdata.realName
          }
          if (this._.has(resdata, 'sex')) {
            this.sex = this._.toNumber(resdata.sex)
          }
          if (this._.has(resdata, 'birthDate')) {
            this.birthDate = resdata.birthDate
          }
          if (this._.has(resdata, 'userBody')) {
            if (this._.has(resdata.userBody, 'height')) {
              this.height = resdata.userBody.height
            }
            if (this._.has(resdata.userBody, 'weight')) {
              this.weight = resdata.userBody.weight
            }
            if (this._.has(resdata.userBody, 'smoking')) {
              this.smoking = resdata.userBody.smoking
            }
            if (this._.has(resdata.userBody, 'drinking')) {
              this.drinking = resdata.userBody.drinking
            }
            //
            if (this._.has(resdata.userBody, 'realName')) {
              this.realName = resdata.userBody.realName
            }
            if (this._.has(resdata.userBody, 'sex')) {
              this.sex = resdata.userBody.sex
            }
            if (this._.has(resdata.userBody, 'birthDate')) {
              this.birthDate = resdata.userBody.birthDate
            }
            if (this._.has(resdata.userBody, 'bloodPressureSickStart')) {
              this.bloodPressureSickStart = resdata.userBody.bloodPressureSickStart
            }
            if (this._.has(resdata.userBody, 'systolicMaxHistory')) {
              this.systolicMaxHistory = resdata.userBody.systolicMaxHistory
            }
            if (this._.has(resdata.userBody, 'diastolicMaxHistory')) {
              this.diastolicMaxHistory = resdata.userBody.diastolicMaxHistory
            }
            if (this._.has(resdata.userBody, 'height')) {
              this.height = resdata.userBody.height
            }
            if (this._.has(resdata.userBody, 'weight')) {
              this.weight = resdata.userBody.weight
            }
            if (this._.has(resdata.userBody, 'waistWai')) {
              this.waistWai = resdata.userBody.waistWai
            }
            if (this._.has(resdata.userBody, 'smoking')) {
              this.smoking = resdata.userBody.smoking
            }
            if (this._.has(resdata.userBody, 'drinking')) {
              this.drinking = resdata.userBody.drinking
            }
            if (this._.has(resdata.userBody, 'sex')) {
              this.cholesterolTotal = resdata.userBody.cholesterolTotal
            }
            if (this._.has(resdata.userBody, 'highProteinCholesterol')) {
              this.highProteinCholesterol = resdata.userBody.highProteinCholesterol
            }
            if (this._.has(resdata.userBody, 'lowProteinCholesterol')) {
              this.lowProteinCholesterol = resdata.userBody.lowProteinCholesterol
            }
            if (this._.has(resdata.userBody, 'bloodFatUrls')) {
              this.bloodFatUrls = resdata.userBody.bloodFatUrls.split(',')
            }
            if (this._.has(resdata.userBody, 'hcy')) {
              this.hcy = resdata.userBody.hcy
            }
            if (this._.has(resdata.userBody, 'hcyUrls')) {
              this.hcyUrls = resdata.userBody.hcyUrls
            }
            if (this._.has(resdata.userBody, 'heartVesselsFamilyHistory')) {
              this.heartVesselsFamilyHistory = resdata.userBody.heartVesselsFamilyHistory
            }
            if (this._.has(resdata.userBody, 'serumCreatinineType')) {
              this.serumCreatinineType = resdata.userBody.serumCreatinineType
            }
            if (this._.has(resdata.userBody, 'serumCreatinineUnit')) {
              this.serumCreatinineUnit = resdata.userBody.serumCreatinineUnit
            }
            if (this._.has(resdata.userBody, 'egfr')) {
              this.egfr = resdata.userBody.egfr
            }
            if (this._.has(resdata.userBody, 'proteinUrineType')) {
              this.proteinUrineType = resdata.userBody.proteinUrineType
            }
            if (this._.has(resdata.userBody, 'bloodCreatinineUrls')) {
              this.bloodCreatinineUrls = resdata.userBody.bloodCreatinineUrls.split(',')
            }
            if (this._.has(resdata.userBody, 'routineProteinUrls')) {
              this.routineProteinUrls = resdata.userBody.routineProteinUrls.split(',')
            }
            if (this._.has(resdata.userBody, 'lvmlType')) {
              this.lvmlType = resdata.userBody.lvmlType
            }
            if (this._.has(resdata.userBody, 'heartExpandType')) {
              this.heartExpandType = resdata.userBody.heartExpandType
            }
            if (this._.has(resdata.userBody, 'heartDisease')) {
              this.heartDisease = resdata.userBody.heartDisease
            }
            if (this._.has(resdata.userBody, 'heartFigureUrl')) {
              this.heartFigureUrl = resdata.userBody.heartFigureUrl.split(',')
            }
            if (this._.has(resdata.userBody, 'heartUltrasonicUrl')) {
              this.heartUltrasonicUrl = resdata.userBody.heartUltrasonicUrl.split(',')
            }
            if (this._.has(resdata.userBody, 'xChestUrl')) {
              this.xChestUrl = resdata.userBody.xChestUrl.split(',')
            }
            if (this._.has(resdata.userBody, 'heartMrlMraUrl')) {
              this.heartMrlMraUrl = resdata.userBody.heartMrlMraUrl.split(',')
            }
            if (this._.has(resdata.userBody, 'ctaUrl')) {
              this.ctaUrl = resdata.userBody.ctaUrl.split(',')
            }
            if (this._.has(resdata.userBody, 'heartWithUrl')) {
              this.heartWithUrl = resdata.userBody.heartWithUrl.split(',')
            }
            if (this._.has(resdata.userBody, 'movementUrl')) {
              this.movementUrl = resdata.userBody.movementUrl.split(',')
            }
            if (this._.has(resdata.userBody, 'neckStocksSpeedType')) {
              this.neckStocksSpeedType = resdata.userBody.neckStocksSpeedType
            }
            if (this._.has(resdata.userBody, 'ankleArmIndex')) {
              this.ankleArmIndex = resdata.userBody.ankleArmIndex
            }
            if (this._.has(resdata.userBody, 'imtType')) {
              this.imtType = resdata.userBody.imtType
            }
            if (this._.has(resdata.userBody, 'outsideVesselsDisease')) {
              this.outsideVesselsDisease = resdata.userBody.outsideVesselsDisease
            }
            if (this._.has(resdata.userBody, 'neckSoundUrl')) {
              this.neckSoundUrl = resdata.userBody.neckSoundUrl.split(',')
            }
            if (this._.has(resdata.userBody, 'pulseSpeedUrl')) {
              this.pulseSpeedUrl = resdata.userBody.pulseSpeedUrl.split(',')
            }
            if (this._.has(resdata.userBody, 'ankleArmNumUrl')) {
              this.ankleArmNumUrl = resdata.userBody.ankleArmNumUrl.split(',')
            }
            if (this._.has(resdata.userBody, 'otherVesselsUrl')) {
              this.otherVesselsUrl = resdata.userBody.otherVesselsUrl.split(',')
            }
            if (this._.has(resdata.userBody, 'brainDiseaseType')) {
              this.brainDiseaseType = resdata.userBody.brainDiseaseType
            }
            if (this._.has(resdata.userBody, 'brainMriMraUrl')) {
              this.brainMriMraUrl = resdata.userBody.brainMriMraUrl.split(',')
            }
            if (this._.has(resdata.userBody, 'spiritStateUrl')) {
              this.spiritStateUrl = resdata.userBody.spiritStateUrl.split(',')
            }
            if (this._.has(resdata.userBody, 'keithWagnarLevel')) {
              this.keithWagnarLevel = resdata.userBody.keithWagnarLevel
            }
            if (this._.has(resdata.userBody, 'fundusUrl')) {
              this.fundusUrl = resdata.userBody.fundusUrl.split(',')
            }
            if (this._.has(resdata.userBody, 'bloodSugarEmpty')) {
              this.bloodSugarEmpty = resdata.userBody.bloodSugarEmpty
            }
            if (this._.has(resdata.userBody, 'bloodSugarAfterMealTwo')) {
              this.bloodSugarAfterMealTwo = resdata.userBody.bloodSugarAfterMealTwo
            }
            if (this._.has(resdata.userBody, 'sugarBloodProtein')) {
              this.sugarBloodProtein = resdata.userBody.sugarBloodProtein
            }
            if (this._.has(resdata.userBody, 'bloodSugarEmptyUrl')) {
              this.bloodSugarEmptyUrl = resdata.userBody.bloodSugarEmptyUrl.split(',')
            }
            if (this._.has(resdata.userBody, 'bloodSugarAfterMealTwoUrl')) {
              this.bloodSugarAfterMealTwoUrl = resdata.userBody.bloodSugarAfterMealTwoUrl.split(',')
            }
            if (this._.has(resdata.userBody, 'sugarBloodProteinUrl')) {
              this.sugarBloodProteinUrl = resdata.userBody.sugarBloodProteinUrl.split(',')
            }
            if (this._.has(resdata.userBody, 'inDoctoeIdentify')) {
              this.inDoctoeIdentify = resdata.userBody.inDoctoeIdentify
            }
            if (this._.has(resdata.userBody, 'bloodPressureSickStart')) {
              this.bloodPressureSickStart = resdata.userBody.bloodPressureSickStart
            }
            if (this._.has(resdata.userBody, 'sysIllnessHistoryIdDisease')) {
              this.sysIllnessHistoryIdDisease = resdata.userBody.sysIllnessHistoryIdDisease
            }
            if (this._.has(resdata.userBody, 'sysIllnessHistoryIdGenetic')) {
              this.sysIllnessHistoryIdGenetic = resdata.userBody.sysIllnessHistoryIdGenetic
            }
            // if (this._.has(resdata.userBody, 'weight')) {
            //   this.waistWai = resdata.userBody.weight
            // }
          }
          // if (this._.has(resdata, 'birthDate')) {
          //   this.systolicMaxHistory = resdata.birthDate
          // }
          // if (this._.has(resdata, 'birthDate')) {
          //   this.diastolicMaxHistory = resdata.birthDate
          // }
          // if (this._.has(resdata, 'birthDate')) {
          //   this.bloodPressureSickStart = resdata.birthDate
          // }
        }
      })
    },
    call () {
      // console.log('聊天对象', )
      let rongId = 'member_' + this.FlupInfo.userId
      let sick = {
        userId: rongId,
        userImg: '',
        userName: this.realName || '患者',
        hasMsg: false,
        currentChat: false
      }
      console.log('聊天对象sick', sick)
      this.addChatFriend(sick)
      this.changeChatFriend(sick)
      this.openChatWindow()
    }
  },
  created () {
    console.log('store随访数据', this.FlupInfo)
    this.realName = this.FlupInfo.userName
    this.getLayerData()
  },
  mounted () {
    // this.realName = this.FlupInfo.userName
    // console.log('store随访数据', this.FlupInfo)
    // console.log('store随访数据', this.FlupInfo)
    // this.getLayerData()
  }
}
</script>
<style lang="scss" scoped>
.danger-layer{
  font-size: 14px;
}
.voice-btn{
  border: #96bcdd;
  background: #1991fc;
  outline: none;
  color: #fff;
  padding: 3px 7px;
  cursor: pointer;
  border-radius: 4px;
  width: 60px;
}
.title-name{
  color: #041421;
  font-size: 24px;
  display: inline-block;
  margin-right: 10px;
}
.heart-layer{
  display: inline-block;
  color: #041421;
  font-size: 20px;
  margin-top:40px;
  margin-left: 20px;
}
.gap-bottom{
  margin-bottom: 8px;
}
.card-head-title{
  border-bottom:1px solid #ebeef5;
  padding-bottom: 10px;
  font-size: 20px;
  margin-bottom: 15px;
  color: #666;
}
.line-block{
  display: inline-block;
}
.gap-right{
  margin-right: 20px;
}
.danger-btn-text{
  color: #fff;
  display: inline-block;
  // background: #e87070;
  width: 60px;
  text-align: center;
  padding:3px;
}
.red-text{
  color: #e87070;
}
.input-tip{
  display: inline-block;
  color: #041421;
  font-size: 14px;
  line-height: 32px;
  // width: 100px;
}
.check-btn{
  border: none;
  outline: none;
  color: #1991fc;
  // padding: 3px 5px;
  cursor: pointer;
  background: transparent;
  padding: 0;
}
.icon{
  font-size: 12px;
}
.width{
  width: 400px;
}
.radio-box{
  border:1px solid #dcdfe6;
  height: 30px;
  border-radius: 4px;
  line-height: 32px;
  // line-height: 1;
  // width: 97%;
  padding: 0 10px;
  // padding: 7px 5px;
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
.a-upload {
  /* padding: 4px 10px; */
  // height: 25px;
  // line-height: 32px;
  font-size: 14px;
  position: relative;
  cursor: pointer;
  color: #666;
  vertical-align: middle;
  /* background: #fafafa; */
  /* border: 1px solid #ddd; */
  /* border-radius: 4px; */
  overflow: hidden;
  display: inline-block;
  *display: inline;
  *zoom: 1
}

.a-upload  input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer
}

.a-upload:hover {
    /* color: #444; */
    /* background: #eee; */
    /* border-color: #ccc; */
    text-decoration: none
}
.unapload{
  color:#666;
}
.hasapload{
  color:#1991fc;
}
.dialog-img-box{
  width: 100%;
  height: 100%;
  margin: 0 auto;
  text-align: center;
  img{
    max-width: 100%;
    max-height: 100%;
  }
}
</style>

