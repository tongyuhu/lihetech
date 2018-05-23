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
