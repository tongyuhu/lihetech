/**
 * @description  高血压患者分布
 */
export const sickDistributionDataApi = (params) => {
  return {
    method: 'post',
    url: '/wholePoint/blood/countBase',
    data: {
      'periodTime': params.periodTime
      // endMeasureTime: param.endTime
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    timeout: 10000
  }
}
/**
 * @description  高血压患者控压走势 正常高血压每天所
 */
export const sickTrendDataApi = (params) => {
  return {
    method: 'post',
    url: '/wholePoint/blood/countBase/list',
    data: {
      pageNum: 1,
      pageSize: 31,
      'periodTime': params.periodTime
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    timeout: 10000
  }
}
// export sickDistributionDataApi
