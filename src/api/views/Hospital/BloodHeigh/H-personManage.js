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
<<<<<<< HEAD
      'fields': parmas.fields,
      'pageNum': parmas.pageNum,
      'pageSize': parmas.pageSize
      // 'mobile': parmas.mobile
=======
      // 'name': parmas.name,
      'pageNum': parmas.pageNum,
      'pageSize': parmas.pageSize,
      // 'mobile': parmas.mobile,
      'fields': parmas.fields
>>>>>>> origin/dev
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    timeout: 10000
  }
}
export const editDoctorAPI = (parmas) => {
  return {
    method: 'post',
    url: '/update',
    data: {
      'id': parmas.id,
      'username': parmas.username,
      'mobile': parmas.mobile,
      'regionId': parmas.address,
      'roleId': parmas.roleId
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    timeout: 10000
  }
}
