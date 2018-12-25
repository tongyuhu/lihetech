/**
 * @description 随访用户列表
 * @param adminIdMainDoctor 医生id
isFollowUp是否已经访问 0-否 1-是
pageNum页码  pageSize每页显示数量
 */
export const FlupListApi = (params) => {
  return {
    method: 'post',
    url: '/follow/up',
    data: params
  }
}
/**
 *
 * @param {object} params
 * @description 随访卡查询
 */
export const FlupCardApi = (params) => {
  return {
    method: 'post',
    url: '/follow/up',
    data: params
  }
}
/**
 *
 * @param {object} params
 * @description 添加或修改随访
 */
export const submitFlupApi = (params) => {
  return {
    method: 'post',
    url: '/follow/card/add',
    data: params
  }
}
/**
 *
 * @param {Object} params
 * @description 分层评估提交
 */
export const submitLayerApi = (params) => {
  return {
    method: 'post',
    url: '/member/danger/level/addOrEdit',
    data: params
  }
}
/**
 *
 * @param {object} params
 * @description 分层评估查询
 */
export const lookLayerApi = (params) => {
  return {
    method: 'post',
    url: '/member/danger/level/mes',
    data: params
  }
}
