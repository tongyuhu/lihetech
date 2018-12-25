/**
 * @param {Object} params
 * @description  心血管风险评估api
 */
export const assessmentApi = (params, data) => {
  return {
    method: 'post',
    url: '/highBlood/bpDoubleArm',
    data: {
      'userId': params.userId,
      'adminHospitalId': params.adminHospitalId,
      'bpMeasureTime': params.bpMeasureTime || '',
      'pageNum': params.pageNum || 1,
      'pageSize': params.pageSize || 10
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    outtime: 10000
  }
}
