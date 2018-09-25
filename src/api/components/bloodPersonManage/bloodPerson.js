/**
 *
 * @param {Object} obj
 * @description
 * 高血压管理 分层查询
 * pageNum页码（默认1）
  pageSize每页显示数量（默认5）
  dangerLevel number 级别 0-未分级 1~3级  5-正常 6-易患人群
 */
export const layerSickApi = (obj) => {
  return {
    method: 'post',
    url: '/wholePoint/blood/level',
    data: obj
  }
}
/**
 *
 * @param {object} obj
 * @description 高血压易患人群  废弃
 */
export const easyApi = (obj) => {
  return {
    method: 'post',
    url: '/wholePoint/blood/easy/crowd',
    data: obj
  }
}
