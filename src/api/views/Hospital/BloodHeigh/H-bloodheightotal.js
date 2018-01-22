export const sickDistributionDataApi = {
  method: 'post',
  url: 'https://easy-mock.com/mock/5a5ffcab4a073a3a0e0e9eed/hospital/sickDistributionData',
  data: {
    sickDistribution: '高血压患者分布'
  },
  headers: { 'Content-type': 'application/x-www-form-urlencoded' },
  timeout: 10000
}
export const sickTrendDataApi = {
  method: 'post',
  url: 'https://easy-mock.com/mock/5a5ffcab4a073a3a0e0e9eed/hospital/sickTrendData',
  data: {
    sickTrend: '高血压患者走势数据'
  },
  headers: { 'Content-type': 'application/x-www-form-urlencoded' },
  timeout: 10000
}
