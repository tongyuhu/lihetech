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
