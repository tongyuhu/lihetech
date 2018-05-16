export const getDoctorListAPI = (parmas) => {
  return {
    method: 'post',
    url: '/user/manage/doctor/list',
    data: {
      'name': parmas.name,
      'pageNum': parmas.pageNum,
      'pageSize': parmas.pageSize,
      'mobile': parmas.mobile
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    timeout: 10000
  }
}
export const getSickListAPI = (parmas) => {
  return {
    method: 'post',
    url: '/user/manage/member/list',
    data: {
      'name': parmas.name,
      'pageNum': parmas.pageNum,
      'pageSize': parmas.pageSize,
      'mobile': parmas.mobile
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    timeout: 10000
  }
}
