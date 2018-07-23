/**
 *
 * @param {object} parmars
 * @description 医生当前预约详情
 */
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
/**
 * @description  预约设置
 */
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
/**
 *
 * @param {object} parmars
 * @description 开启或关闭预约
 */
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
