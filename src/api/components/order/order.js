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
    url: '/make/order/setUp',
    data: {
      'weeks': parmars.weeks,
      'startEndPeriodTimeMor': parmars.startEndPeriodTimeMor,
      'startEndPeriodTimeAftn': parmars.startEndPeriodTimeAftn
    }
  }
}
export const closeorderApi = (parmars) => {
  return {
    method: 'post',
    url: '/make/order/openOrGuan',
    data: {
      'weekDay': parmars.weekDay,
      'slotType': parmars.slotType,
      'isStop': parmars.isStop
    }
  }
}
export const settingDataApi = (parmars) => {
  return {
    method: 'post',
    url: '/make/order/details',
    data: {
      'weekDay': parmars.weekDay,
      'slotType': parmars.slotType
    }
  }
}
