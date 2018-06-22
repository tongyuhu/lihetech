export const BMIApi = (params) => {
  let req = {}
  req = {
    'userId': params.userId,
    'adminHospitalId': params.adminHospitalId,
    'pageNum': params.pageNum || 1,
    'pageSize': params.pageSize || 10
  }
  let obj = {
    method: 'post',
    url: '/highBlood/bmi/list',
    data: req,
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    outtime: 10000
  }
  return obj
}
