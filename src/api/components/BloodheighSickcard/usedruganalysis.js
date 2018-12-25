/**
 *
 * @param {userId} userId
 * @description 用药分析
 */
export default (userId) => {
  return {
    method: 'post',
    url: '/smart/analysis/medicine',
    data: {
      'userId': userId
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    outtime: 10000
  }
}
