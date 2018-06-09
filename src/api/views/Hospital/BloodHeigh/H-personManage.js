export const getDoctorListAPI = (parmas) => {
  return {
    method: 'post',
    url: '/user/manage/doctor/list',
    data: {
      // 'name': parmas.name,
      'pageNum': parmas.pageNum,
      'pageSize': parmas.pageSize,
      // 'mobile': parmas.mobile
      'fields': parmas.fields
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
      // 'name': parmas.name,
      'pageNum': parmas.pageNum,
      'pageSize': parmas.pageSize,
      // 'mobile': parmas.mobile,
      'fields': parmas.fields
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    timeout: 10000
  }
}
export const editDoctorAPI = (parmas) => {
  return {
    method: 'post',
    url: '/update',
    data: parmas,
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    timeout: 10000
  }
}
export const doctorEnabledAPI = (parmas) => {
  return {
    method: 'post',
    url: '/user/manage/doctor/enabled',
    data: parmas,
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    timeout: 10000
  }
}
