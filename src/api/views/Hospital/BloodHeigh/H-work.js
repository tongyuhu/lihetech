/**
 *
 * @param {number} HospitalId
 * @param {number} page
 * @param {number} Size
 * @description 患者最新问诊
 */
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
/**
 *
 * @param {number} adminHospitalId
 * @param {number} pageNum
 * @param {number} pageSize
 * @description 严重患者
 */
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
/**
 *
 * @param {number} adminHospitalId
 * @param {number} pageNum
 * @param {number} pageSize
 * @description 未遵医嘱患者
 */
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
/**
 *
 * @param {object} params
 * @description 关注
 */
export const careApi = (params) => {
  return {
    method: 'post',
    url: '/wholePoint/blood/focus/on',
    data: {
      'adminHospitalId': params.adminHospitalId,
      'userId': params.userId,
      'isDocusOn': params.isDocusOn
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    timeout: 10000
  }
}
