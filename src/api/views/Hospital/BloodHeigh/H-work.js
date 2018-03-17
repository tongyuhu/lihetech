export const newsickaskDataApi = (HospitalId, page, Size) => {
  return {
    method: 'post',
    url: '/wholePoint/blood/casesCard/list',
    data: {
      'adminHospitalId': HospitalId,
      'pageNum': page,
      'pageSize': Size
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    timeout: 10000
  }
}
export const badsickDataApi = (adminHospitalId, pageNum, pageSize) => {
  return {
    method: 'post',
    url: '/wholePoint/blood/serious/list',
    data: {
      'adminHospitalId': adminHospitalId,
      'pageNum': pageNum,
      'pageSize': pageSize
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    timeout: 10000
  }
}
export const noListenDoctorDataApi = (adminHospitalId, pageNum, pageSize) => {
  return {

    method: 'post',
    url: '/wholePoint/blood/notDocus/list',
    data: {
      'adminHospitalId': adminHospitalId,
      'pageNum': pageNum,
      'pageSize': pageSize
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    timeout: 10000
  }
}
export const unperfectMsgDataApi = {
  method: 'post',
  url: 'https://easy-mock.com/mock/5a5ffcab4a073a3a0e0e9eed/hospital/unperfectMsgData',
  data: {
    unperfectMsgData: '档案不完整患者问诊患者列表'
  },
  headers: { 'Content-type': 'application/x-www-form-urlencoded' },
  timeout: 10000
}
