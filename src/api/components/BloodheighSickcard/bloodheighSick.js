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
