<template>
  <div>
  <table cellpadding='0' cellspacing="0">
    <tr>
      <th>用户自述</th>
      <td> <span>最近总是恶心、呕吐、浑身无力、四肢无力</span> </td>
    </tr>
    <tr>
      <th>系统分析</th>
      <td>
        <span>
          高血压用药不能停止，请继续服用
        </span>
      </td>
    </tr>
    <tr>
      <th>医生诊断</th>
      <td>
        <span>

          您属于二型糖尿病、请按照下面的药品进行服用
        </span>
        <button>qq</button>
      </td>
      <!-- <td>
      </td> -->
    </tr>
    
    
    
    <tr>
      <td>
        <table cellpadding='0' cellspacing="0" class="border-collapse no-border">
          <td class="text-center no-bottom-border no-top-border no-left-border">
            医<br />生<br />方<br />案
          </td>
          <td class="no-border">
            <table cellpadding='0' cellspacing="0" class="border-collapse no-border">
              <tr>
                <td class="text-center only-bottom-border">用药</td>
              </tr>
              <tr>
                <td class="text-center only-bottom-border">运动</td>
              </tr>
              <tr>
                <td class="text-center no-border">饮食</td>
              </tr>
            </table>
          </td>
        </table>
      </td>
      <td class="no-bottom-border">
        <table cellpadding='0' cellspacing="0" class="border-collapse no-border">
          <tr>
            <td class="only-bottom-border">
              <span>
                药品1   药品2 
              </span>
            </td>
          </tr>
          <tr>
            <td class="only-bottom-border">
              <span>
                血压偏高，不宜大幅度运动、请选择每天步行30min
              </span>
            </td>
          </tr>
          <tr>
            <td class="no-border">
              <span>
                饮食清淡为主、不要多吃肉
              </span>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <th>
        饮食
      </th>
      <td>
        <span>
          饮食清淡为主、不要多吃肉
        </span>
      </td>
    </tr>
  </table>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
  	table{
			margin:0;
			padding: 0;
			border-spacing: 0px;
			border:1px solid #5555;
			border-collapse: collapse;
			width: 100%;
		}
		th{
			border:1px solid #5555;
      height: 30px;
		}
		td{
			border:1px solid #5555;
      height: 40px;
		}
		.border-collapse{
			border-collapse: collapse;
		}
		.no-border{
			border:none;
		}
		.no-bottom-border{
			border-bottom: none;
		}
		.no-top-border{
			border-top: none;
		}
		.no-right-border{
			border-right: none;
		}
		.no-left-border{
			border-left: none;
		}
		.only-bottom-border{
			border-right: none;
			border-left: none;
			border-top: none;
		}
    .text-center{
      text-align:center;  
    }
    table span{
      padding-left: 20px;
    }
</style>

