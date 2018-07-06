<template>
  <div class="danger-layer">
    <div>
      <el-card>
        <div>
          <span class="title-name">毛健康</span>
          <button class="voice-btn">语音</button>
        </div>
      </el-card>
    </div>
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
          <span class="danger-btn-text">很危险</span>
        </div>
        <div>
          <div class="line-block gap-right">
            <span>危险因素：</span>
            <span class="red-text">血脂异常、耐糖量受损</span>
          </div>
          <div class="line-block gap-right">
            <span>靶器官损害：</span>
            <span class="red-text">左心室肥厚</span>
          </div>
          <div class="line-block gap-right">
            <span>临床疾患：</span>
            <span class="red-text">心肌梗死史</span>
          </div>
        </div>
      </el-card>
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
                <numberinput
                v-model="value"
                :leftOffset="45"
                :rightOffset="5">
                  <template slot="left">
                    <span>
                    年龄：
                    </span>
                  </template>
                  <!-- <template slot="right">
                    <span>
                    次/天
                    </span>
                  </template> -->
                </numberinput>
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
                v-model="value"
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
                v-model="value"
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
                v-model="value"
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
                <el-select v-model="flupMethods" size="small" placeholder="请选择" style="{'width':'60px'}">
                  <el-option
                    label="男"
                    :value="1">
                  </el-option>
                  <el-option
                    label="女"
                    :value="2">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="line-block">
              <el-form-item label="是否吸烟" label-width="110px">
                <el-select v-model="flupMethods" size="small" placeholder="请选择" style="{'width':'60px'}">
                  <el-option
                    label="是"
                    :value="1">
                  </el-option>
                  <el-option
                    label="否"
                    :value="2">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="line-block">
              <el-form-item label="早发心血管病家族史" label-width="170px">
                <el-select v-model="flupMethods" size="small" placeholder="请选择" style="{'width':'60px'}">
                  <el-option
                    label="有"
                    :value="1">
                  </el-option>
                  <el-option
                    label="无"
                    :value="2">
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
                    <span>总胆固醇(mg/24h)</span>
                  </div>
                  <div class="line-block">
                    <div class="line-block gap-right">
                      <el-radio-group 
                        v-model="body"
                        size="small">
                        <el-radio :label="1">mmol/L</el-radio>
                        <el-radio :label="2">mg/dl</el-radio>
                        <!-- <el-radio :label="3">&gt;6.9</el-radio> -->
                      </el-radio-group>
                    </div>
                    <el-radio-group 
                      v-model="body"
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
                      v-model="body"
                      size="small">
                      <el-radio :label="1">&gt;1.0</el-radio>
                      <el-radio :label="2">&lt;=1.0</el-radio>
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
                      v-model="body"
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
              <button class="check-btn">
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
              v-model="value"
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
              <button class="check-btn">
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
                  <span>空腹血糖(mmol/L)</span>
                </div>
                <div class="line-block">
                  <el-radio-group 
                    v-model="body"
                    size="small">
                    <el-radio :label="1">&lt;6.1</el-radio>
                    <el-radio :label="2">6.1-6.9</el-radio>
                    <el-radio :label="3">&gt;6.9</el-radio>
                  </el-radio-group>
                </div>
            </div>
            <div class="radio-box line-block">
                <div class="line-block">
                  <span>餐后两小时血糖(mmol/L)</span>
                </div>
                <div class="line-block">
                  <el-radio-group 
                    v-model="body"
                    size="small">
                    <el-radio :label="1">&lt;7.8</el-radio>
                    <el-radio :label="2">7.8-11.0</el-radio>
                    <el-radio :label="3">&gt;11.0</el-radio>
                  </el-radio-group>
                </div>
            </div>
            <div class="radio-box line-block">
                <div class="line-block">
                  <span>糖化血红蛋白(mmol/L)</span>
                </div>
                <div class="line-block">
                  <el-radio-group 
                    v-model="body"
                    size="small">
                    <el-radio :label="1">&lt;6.5%</el-radio>
                    <!-- <el-radio :label="2">6.1-6.9</el-radio> -->
                    <el-radio :label="3">&gt;=6.5%</el-radio>
                  </el-radio-group>
                </div>
            </div>
          </div>
          <div>
            <div>
              <span>检查单：</span>
              <button class="check-btn">
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
              </button>
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
                  <span>血清肌酐</span>
                </div>
                <div class="line-block">
                  <el-radio-group 
                    v-model="body"
                    size="small">
                    <el-radio :label="1">umol/L</el-radio>
                    <el-radio :label="2">mg/dl</el-radio>
                  </el-radio-group>
                  <el-radio-group 
                    v-model="body"
                    size="small">
                    <el-radio :label="1">&lt;115</el-radio>
                    <el-radio :label="2">115-133</el-radio>
                    <el-radio :label="3">&gt;133</el-radio>
                    <el-radio :label="3">估算的肾小球滤过率&lt;60(eGFR降低)</el-radio>
                  </el-radio-group>
                </div>
            </div>
          </div>
          <div class="gap-bottom line-block">
            <div class="radio-box line-block">
                <div class="line-block">
                  <span>蛋白尿值(mg/24h)</span>
                </div>
                <div class="line-block">
                  <el-radio-group 
                    v-model="body"
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
              <button class="check-btn">
                <span class="iconfont icon-chakanwenjian icon"></span>
                血生化-血肌酐
              </button>
              <button class="check-btn">
                <span class="iconfont icon-chakanwenjian icon"></span>
                尿常规
              </button>
              <button class="check-btn">
                <span class="iconfont icon-chakanwenjian icon"></span>
                尿蛋白
              </button>
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
                  <span>心电图指标</span>
                </div>
                <div class="line-block">
                  <el-radio-group 
                    v-model="body"
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
                  <span>超声心动图LVMI指标(g/m2)</span>
                </div>
                <div class="line-block">
                  <el-radio-group 
                    v-model="body"
                    size="small">
                    <el-radio :label="1">&gt;=125</el-radio>
                    <!-- <el-radio :label="2">30-300</el-radio> -->
                    <el-radio :label="3">&lt;125</el-radio>
                  </el-radio-group>
                </div>
            </div>
          </div>
          <div class="gap-bottom line-block">
            <div class="radio-box line-block">
                <div class="line-block">
                  <span>心脏扩大</span>
                </div>
                <div class="line-block">
                  <el-radio-group 
                    v-model="body"
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
                  <span>已确诊心脏疾病</span>
                </div>
                <div class="line-block">
                  <el-radio-group 
                    v-model="body"
                    size="small">
                    <el-radio :label="1">心肌梗死史</el-radio>
                    <el-radio :label="2">心绞痛</el-radio>
                    <el-radio :label="2">冠状动脉血运重建史</el-radio>
                    <el-radio :label="2">慢性心力衰竭</el-radio>
                  </el-radio-group>
                </div>
            </div>
          </div>
          <div>
            <div class="line-block">
              <span>检查单：</span>
              <button class="check-btn">
                <span class="iconfont icon-chakanwenjian icon"></span>
                心电图
              </button>
              <button class="check-btn">
                <span class="iconfont icon-chakanwenjian icon"></span>
                超声心动图（心脏彩超）
              </button>
              <button class="check-btn">
                <span class="iconfont icon-chakanwenjian icon"></span>
                X线胸片
              </button>
            </div>
            <div class="line-block">
              <span>高级检查单：</span>
              <button class="check-btn">
                <span class="iconfont icon-chakanwenjian icon"></span>
                心脏MRI 磁共振血管造影 (MRA)
              </button>
              <button class="check-btn">
                <span class="iconfont icon-chakanwenjian icon"></span>
                计算机断层扫描血管造影 (CTA)
              </button>
              <button class="check-btn">
                <span class="iconfont icon-chakanwenjian icon"></span>
                心脏同位素显像
              </button>
              <button class="check-btn">
                <span class="iconfont icon-chakanwenjian icon"></span>
                运动实验 或冠状动脉造影
              </button>
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
                  <span>颈-股动脉脉搏波 速度(m/s)</span>
                </div>
                <div class="line-block">
                  <el-radio-group 
                    v-model="body"
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
                  <span>踝臂血压指数</span>
                </div>
                <div class="line-block">
                  <el-radio-group 
                    v-model="body"
                    size="small">
                    <el-radio :label="1">&lt;0.9</el-radio>
                    <!-- <el-radio :label="2">30-300</el-radio> -->
                    <el-radio :label="3">&gt;=0.9</el-radio>
                  </el-radio-group>
                </div>
            </div>
          </div>
          <div class="gap-bottom line-block">
            <div class="radio-box line-block">
                <div class="line-block">
                  <span>颈动脉超声(IMT)</span>
                </div>
                <div class="line-block">
                  <el-radio-group 
                    v-model="body"
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
                  <span>外周血管疾病</span>
                </div>
                <div class="line-block">
                  <el-radio-group 
                    v-model="body"
                    size="small">
                    <el-radio :label="1">动脉瘤、狭窄、闭塞、栓塞、主动脉夹层</el-radio>
                    <el-radio :label="2">血管外伤、血管瘤、下肢溃疡</el-radio>
                    <el-radio :label="2">3静脉血栓、形成、曲张、动静脉内瘘</el-radio>
                  </el-radio-group>
                </div>
            </div>
          </div>
          <div>
            <div>
              <span>检查单：</span>
              <button class="check-btn">
                <span class="iconfont icon-chakanwenjian icon"></span>
                颈动脉超声
              </button>
              <button class="check-btn">
                <span class="iconfont icon-chakanwenjian icon"></span>
                脉搏波传导速度
              </button>
              <button class="check-btn">
                <span class="iconfont icon-chakanwenjian icon"></span>
                踝臂指数
              </button>
              <button class="check-btn">
                <span class="iconfont icon-chakanwenjian icon"></span>
                其它血管检查项
              </button>
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
                  <span>脑血管疾病</span>
                </div>
                <div class="line-block">
                  <el-radio-group 
                    v-model="body"
                    size="small">
                    <el-radio :label="1">脑出血</el-radio>
                    <el-radio :label="2">缺血性脑卒中</el-radio>
                    <el-radio :label="3">短暂性脑缺血发作</el-radio>
                  </el-radio-group>
                </div>
            </div>
          </div>
          <div>
            <div>
              <span>检查单：</span>
              <button class="check-btn">
                <span class="iconfont icon-chakanwenjian icon"></span>
                头颅MRI MRA
              </button>
              <button class="check-btn">
                <span class="iconfont icon-chakanwenjian icon"></span>
                CTA
              </button>
              <button class="check-btn">
                <span class="iconfont icon-chakanwenjian icon"></span>
                精神状态量表
              </button>
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
                  <span>Keith-Wagnar分级</span>
                </div>
                <div class="line-block">
                  <el-radio-group 
                    v-model="body"
                    size="small">
                    <el-radio :label="1">正常</el-radio>
                    <el-radio :label="2">Ⅰ视网膜动脉痉挛期</el-radio>
                    <el-radio :label="3">Ⅱ视网膜病变期(出血、渗出)</el-radio>
                    <el-radio :label="4">Ⅲ视神经视网膜病变期(视乳头水肿)</el-radio>
                    <el-radio :label="5">Ⅳ失明</el-radio>
                  </el-radio-group>
                </div>
            </div>
          </div>
          <div>
            <div>
              <span>检查单：</span>
              <button class="check-btn">
                <span class="iconfont icon-chakanwenjian icon"></span>
                眼底检查(高分辨率眼底成像系统)
              </button>
            </div>
          </div>
        </el-card>
      </div>

    </el-form>
    <div class="submit-btn-wrap">
      <button class="submit-btn">提交</button>
    </div>
  </div>
</template>

<script>
import numberinput from './number'
export default {
  name: 'dangerLayer',
  components: {
    numberinput
  },
  data () {
    return {
      value: null
    }
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
  background: #e87070;
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
</style>

