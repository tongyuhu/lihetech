export const noteApi = (param) => {
  return {
    method: 'post',
    url: '/today/notes/user/total',
    data: {
      userId: param.userId,
      adminHospitalId: param.adminHospitalId,
      createDayTime: param.time
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    timeout: 10000
  }
}
