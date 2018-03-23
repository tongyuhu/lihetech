// 病人基本信息
export const bloodheighSickDataApi = (params) => {
  return {
    method: 'post',
    url: '/highBlood/userInfo',
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
