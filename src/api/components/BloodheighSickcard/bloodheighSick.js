/**
 * @param {obj } userId,adminHospitalId,pageNum,pageSize
 * @description 病人基本信息
 */
export const bloodheighSickDataApi = (params) => {
  return {
    method: 'post',
    url: '/user/casesCard/info/list',
    data: {
      'userId': params.userId,
      'adminHospitalId': params.adminHospitalId,
      'pageNum': params.pageNum,
      'pageSize': params.pageSize || 1
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    outtime: 10000
  }
}
/**
 *
 * @param {obj } params userId,userCasesCardId
 * @description 根据用户id和病历卡id获取用户基本信息
 */
export const bloodheighSickApi = (params) => {
  return {
    method: 'post',
    url: '/member/info',
    data: params,
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    outtime: 10000
  }
}
/**
 * @param {number 病史3、遗传史4、糖尿病并发症5、高血压并发症6} params
 */
export const sickApi = (params) => {
  return {
    method: 'post',
    url: '/user/casesCard/illSelect/list',
    data: {
      'illType': params
      // 'adminHospitalId': params.adminHospitalId,
      // 'pageNum': params.pageNum,
      // 'pageSize': params.pageSize || 1
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    outtime: 10000
  }
}
/**
 *
 * @param {obj} params
 * @description 病历卡-修改或者添加
 */
export const modifyCardApi = (params) => {
  return {
    method: 'post',
    url: '/user/casesCard/add',
    data: params,
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    outtime: 10000
  }
}
/**
 *
 * @param {number 1:高血压,2:糖尿病} params
 * @description 国家疾病编码库
 */
export const sickCodeApi = (params) => {
  return {
    method: 'post',
    url: '/sys/national/disease/list',
    data: params,
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    outtime: 10000
  }
}
