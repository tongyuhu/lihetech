export const sickDistributionDataApi = (param) => {
  return {
    method: 'post',
    url: '/wholePoint/blood/countBase',
    data: {
      startMeasureTime: param.startTime,
      endMeasureTime: param.endTime
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    timeout: 10000
  }
}
export const sickTrendDataApi = (param) => {
  return {

    method: 'post',
    url: '/wholePoint/blood/countBase/list',
    data: {
      pageNum: param.pageNum,
      pageSize: param.pageSize
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    timeout: 10000
  }
}
// export sickDistributionDataApi
