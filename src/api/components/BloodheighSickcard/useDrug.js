export const useDrugApi = (params) => {
  return {
    method: 'post',
    url: '/highBlood/medication/list',
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
