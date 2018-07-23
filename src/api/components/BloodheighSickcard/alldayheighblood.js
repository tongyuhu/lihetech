/**
 * @param {object}params
 * @example params={
 *    'userId':userId,
      'adminHospitalId':adminHospitalId,
      'bpMeasureTime':bpMeasureTime || '',
      'getupTime':getupTime,
      'sleepTime':sleepTime,
      'pageNum': 1,
      'pageSize': 10
 * }
 * @description  ABPM统计表 动态分析报告 24小时血压
 */
export const alldayHeighBloodApi = (params, data) => {
  return {
    method: 'post',
    url: '/highBlood/analysis/report',
    data: {
      'userId': params.userId,
      'adminHospitalId': params.adminHospitalId,
      'bpMeasureTime': params.bpMeasureTime || '',
      'getupTime': params.getupTime,
      'sleepTime': params.sleepTime,
      'pageNum': params.pageNum || 1,
      'pageSize': params.pageSize || 10
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    outtime: 10000
  }
}
