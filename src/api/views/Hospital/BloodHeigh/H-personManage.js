/**
 * @description 查询医生列表
 */
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
/**
 *
 * @param {object} parmas
 * @description 查询病人用户列表
 */
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
/**
 *
 * @param {object} parmas
 * @description 修改 管理员-医生-专家-信息
 */
export const editDoctorAPI = (parmas) => {
  return {
    method: 'post',
    url: '/update',
    data: parmas,
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    timeout: 10000
  }
}
/**
 *
 * @param {object} parmas
 * @description 账户停用或者启用
 */
export const doctorEnabledAPI = (parmas) => {
  return {
    method: 'post',
    url: '/user/manage/doctor/enabled',
    data: parmas,
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    timeout: 10000
  }
}
