// 病人基本信息
export const bloodheighSickDataApi = (params) => {
  return {
    method: 'post',
    url: '/highBlood/userInfo',
    data: {
      'userId': params.userId,
      'adminHospitalId': params.adminHospitalId,
      'pageNum': params.pageNum,
      'pageSize': params.pageSize
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    outtime: 10000
  }
}

// 动态血压分析报告
export const moveBloodHeighDataApi = (setsickID) => {
  return {
    method: 'post',
    url: 'https://easy-mock.com/mock/5a5ffcab4a073a3a0e0e9eed/hospital/bloodheighSickDataApi',
    data: {
      sickID: setsickID
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    outtime: 10000
  }
}
// 血压分布
export const coverBloodHeighDataApi = (setsickID) => {
  return {
    method: 'post',
    url: 'https://easy-mock.com/mock/5a5ffcab4a073a3a0e0e9eed/hospital/bloodheighSickDataApi',
    data: {
      sickID: setsickID
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    outtime: 10000
  }
}
// 平均血压统计
export const averageBloodHeighDataApi = (setsickID) => {
  return {
    method: 'post',
    url: 'https://easy-mock.com/mock/5a5ffcab4a073a3a0e0e9eed/hospital/bloodheighSickDataApi',
    data: {
      sickID: setsickID
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    outtime: 10000
  }
}
// 原始测量数据
export const OriginalBloodHeighDataApi = (setsickID) => {
  return {
    method: 'post',
    url: 'https://easy-mock.com/mock/5a5ffcab4a073a3a0e0e9eed/hospital/bloodheighSickDataApi',
    data: {
      sickID: setsickID
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    outtime: 10000
  }
}
