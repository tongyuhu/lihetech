export const orderApi = (parmars) => {
  return {
    method: 'post',
    url: '/make/order/list',
    data: {
      'type': parmars.type,
      'startTime': parmars.startTime,
      'endTime': parmars.endTime
    }
  }
}
export const orderSettingApi = (parmars) => {
  return {
    method: 'post',
    url: '/make/order/list',
    data: {
      'weeks': parmars.weeks,
      'startEndPeriodTimeMor': parmars.startEndPeriodTimeMor,
      'startEndPeriodTimeAftn': parmars.startEndPeriodTimeAftn
    }
  }
}
