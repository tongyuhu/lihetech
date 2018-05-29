// 病人基本信息
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
export const bloodheighSickApi = (params) => {
  return {
    method: 'post',
    url: '/member/info',
    data: {
      'userId': params.userId
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
 * @param {病史3、遗传史4、糖尿病并发症5、高血压并发症6} params
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
export const modifyCardApi = (params) => {
  return {
    method: 'post',
    url: '/user/casesCard/add',
    data: params,
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    outtime: 10000
  }
}
