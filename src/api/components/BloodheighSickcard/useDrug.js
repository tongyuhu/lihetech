export const useDrugApi = (params) => {
  return {
    method: 'post',
    url: '/highBlood/medication/list',
    data: {
      'userId': params.userId,
      'adminHospitalId': params.adminHospitalId,
      'pageNum': params.pageNum || 1,
      'pageSize': params.pageSize || 5,
      'startTime': params.startTime,
      'endTime': params.endTime
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    outtime: 10000
  }
}
