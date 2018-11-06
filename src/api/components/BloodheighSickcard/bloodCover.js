import {dateFormat, daybefor} from './../../../untils/date'
/**
 *
 * @param {object} params
 * @example params={
 *  'userId': params.userId,
    'adminHospitalId': params.adminHospitalId,
    'bpMeasureTime': params.bpMeasureTime,
    'pageNum': params.pageNum || 1,
    'pageSize': params.pageSize || 10
 * }
 * @param {Number} data 0:最近,1:日,2:周,3:月
 * @description 血压趋势
 */
export const bloodTrendDataApi = (params, date) => {
  let data = {}
  if (date === 0) {
    data = {
      'userId': params.userId,
      'adminHospitalId': params.adminHospitalId,
      // 'bpMeasureTime': params.bpMeasureTime,
      'pageNum': params.pageNum || 1,
      'pageSize': params.pageSize || 10,
      'resType': 4,
      'bpMeasureTime': params.bpMeasureTime,
      'bpMeasureState': params.bpMeasureState
    }
  }
  if (date === 1) {
    data = {
      'userId': params.userId,
      'adminHospitalId': params.adminHospitalId,
      'pageNum': params.pageNum || 1,
      'pageSize': params.pageSize || 10,
      'resType': 1,
      'bpMeasureTime': params.bpMeasureTime,
      'bpMeasureState': params.bpMeasureState
    }
  }
  if (date === 2) {
    data = {
      'userId': params.userId,
      'adminHospitalId': params.adminHospitalId,
      'pageNum': params.pageNum || 1,
      'pageSize': params.pageSize || 10,
      'resType': 2,
      'bpMeasureTime': params.bpMeasureTime,
      'bpMeasureState': params.bpMeasureState
    }
  }
  if (date === 3) {
    data = {
      'userId': params.userId,
      'adminHospitalId': params.adminHospitalId,
      'pageNum': params.pageNum || 1,
      'pageSize': params.pageSize || 10,
      'resType': 3,
      'bpMeasureTime': params.bpMeasureTime,
      'bpMeasureState': params.bpMeasureState
    }
  }
  return {
    method: 'post',
    url: '/highBlood/period/bpAvg',
    data: data,
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    outtime: 10000
  }
}

// export const bloodheighSickDataApi = (params, data) => {
//   // 最近
//   if (data === 0) {
//     return {
//       method: 'post',
//       url: '/highBlood/lately/data',
//       data: {
//         'userId': params.userId,
//         'adminHospitalId': params.adminHospitalId,
//         'bpMeasureTime': params.bpMeasureTime,
//         'pageNum': params.pageNum || 1,
//         'pageSize': params.pageSize || 10
//       },
//       headers: { 'Content-type': 'application/x-www-form-urlencoded' },
//       outtime: 10000
//     }
//   }
//   // 日
//   if (data === 1) {
//     return {
//       method: 'post',
//       url: '/highBlood/dayAvg',
//       data: {
//         'userId': params.userId,
//         'adminHospitalId': params.adminHospitalId,
//         'pageNum': params.pageNum || 1,
//         'pageSize': params.pageSize || 10,
//         'bpMeasureTime': params.bpMeasureTime
//       },
//       headers: { 'Content-type': 'application/x-www-form-urlencoded' },
//       outtime: 10000
//     }
//   }
//   // 周
//   if (data === 2) {
//     return {
//       method: 'post',
//       url: '/highBlood/weekAvg',
//       data: {
//         'userId': params.userId,
//         'adminHospitalId': params.adminHospitalId,
//         'pageNum': params.pageNum || 1,
//         'pageSize': params.pageSize || 10,
//         'bpMeasureTime': params.bpMeasureTime
//       },
//       headers: { 'Content-type': 'application/x-www-form-urlencoded' },
//       outtime: 10000
//     }
//   }
//   // 月
//   if (data === 3) {
//     return {
//       method: 'post',
//       url: '/highBlood/monthAvg',
//       data: {
//         'userId': params.userId,
//         'adminHospitalId': params.adminHospitalId,
//         'pageNum': params.pageNum || 1,
//         'pageSize': params.pageSize || 10,
//         'bpMeasureTime': params.bpMeasureTime
//       },
//       headers: { 'Content-type': 'application/x-www-form-urlencoded' },
//       outtime: 10000
//     }
//   }
// }
/**
 *
 * @param {object} params
 * @param {Number} type
 * @param {Date} date
 * @description 行为分数和高血压比例日周月
 */
export const updateBehaviourRateApi = (params, type, date) => {
  // 日
  if (type === 0) {
    return {
      method: 'post',
      url: '/highBlood/scoreAndBp/Ratio',
      data: {
        'userId': params.userId,
        'adminHospitalId': params.adminHospitalId,
        'startDate': date,
        'endDate': date
      },
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      outtime: 10000
    }
  }
  // 周
  if (type === 1) {
    return {
      method: 'post',
      url: '/highBlood/scoreAndBp/Ratio',
      data: {
        'userId': params.userId,
        'adminHospitalId': params.adminHospitalId,
        'startDate': daybefor(date, 6, 1),
        'endDate': date
      },
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      outtime: 10000
    }
  }
  // 月
  if (type === 2) {
    let monthStart = dateFormat(date, 0, 1)
    let a = dateFormat(date, -1, 1)
    let monthEnd = daybefor(a, 1, 1)
    return {
      method: 'post',
      url: '/highBlood/scoreAndBp/Ratio',
      data: {
        'userId': params.userId,
        'adminHospitalId': params.adminHospitalId,
        // 'startDate': dateFormat(date, 1, 1),
        'startDate': monthStart,
        // 'endDate': date
        'endDate': monthEnd
      },
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      outtime: 10000
    }
  }
}
/**
 *
 * @param {object} params 用户信息
 * @param {Number} type 0 最近 1 日 2周 3月
 * @param {Date} date 开始日期
 * @description 血压状态统计（微高、高、危险
 */
export const updatebloodTrendStateApi = (params, type, date) => {
  // date = dateFormat(date, 0, 1)
  // 最近
  if (type === 0) {
    return {
      method: 'post',
      url: '/highBlood/bpStateNum',
      data: {
        'userId': params.userId,
        'adminHospitalId': params.adminHospitalId,
        'bpMeasureTime': params.bpMeasureTime,
        'bpMeasureState': params.bpMeasureState,
        'startDate': date,
        'endDate': date
      },
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      outtime: 10000
    }
  }
  // 日
  if (type === 1) {
    return {
      method: 'post',
      url: '/highBlood/bpStateNum',
      data: {
        'userId': params.userId,
        'adminHospitalId': params.adminHospitalId,
        'pageNum': params.pageNum || 1,
        'pageSize': params.pageSize || 10,
        'bpMeasureTime': params.bpMeasureTime,
        'bpMeasureState': params.bpMeasureState,
        'startDate': date,
        'endDate': date
      },
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      outtime: 10000
    }
  }
  // 周
  if (type === 2) {
    return {
      method: 'post',
      url: '/highBlood/bpStateNum',
      data: {
        'userId': params.userId,
        'adminHospitalId': params.adminHospitalId,
        'pageNum': params.pageNum || 1,
        'pageSize': params.pageSize || 10,
        'bpMeasureTime': params.bpMeasureTime,
        'bpMeasureState': params.bpMeasureState,
        'startDate': date,
        'endDate': daybefor(date, -6, 1)
      },
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      outtime: 10000
    }
  }
  // 月
  if (type === 3) {
    let monthStart = dateFormat(date, 0, 1)
    let a = dateFormat(date, -1, 1)
    let monthEnd = daybefor(a, 1, 1)
    return {
      method: 'post',
      url: '/highBlood/bpStateNum',
      data: {
        'userId': params.userId,
        'adminHospitalId': params.adminHospitalId,
        'pageNum': params.pageNum || 1,
        'pageSize': params.pageSize || 10,
        'bpMeasureTime': params.bpMeasureTime,
        'bpMeasureState': params.bpMeasureState,
        'startDate': monthStart,
        'endDate': monthEnd
      },
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      outtime: 10000
    }
  }
  if (type === 4) {
    let monthStart = dateFormat(date, 0, 1)
    let a = dateFormat(date, -1, 1)
    let monthEnd = daybefor(a, 1, 1)
    return {
      method: 'post',
      url: '/highBlood/bpStateNum',
      data: {
        'userId': params.userId,
        'adminHospitalId': params.adminHospitalId,
        'pageNum': params.pageNum || 1,
        'pageSize': params.pageSize || 10,
        'bpMeasureTime': params.bpMeasureTime,
        'bpMeasureState': params.bpMeasureState,
        'startDate': monthStart,
        'endDate': monthEnd
      },
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      outtime: 10000
    }
  }
}
/**
 *
 * @param {object} params 用户信息
 * @description 血压状态统计（微高、高、危险
 */
export const updatebloodTrendTotalApi = (params) => {
  return {
    method: 'post',
    url: '/highBlood/bpStateNum',
    data: {
      'userId': params.userId,
      'adminHospitalId': params.adminHospitalId,
      'bpMeasureTime': params.bpMeasureTime,
      'bpMeasureState': params.bpMeasureState,
      'startDate': params.startDate,
      'endDate': params.enddate
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    outtime: 10000
  }
}
// export const updatebloodTrendStateApi = (params, type, date) => {
//   // date = dateFormat(date, 0, 1)
//   console.log('after', date)
//   // 最近
//   if (type === 0) {
//     return {
//       method: 'post',
//       url: '/highBlood/bpStateNum',
//       data: {
//         'userId': params.userId,
//         'adminHospitalId': params.adminHospitalId,
//         'bpMeasureTime': params.bpMeasureTime,
//         'startDate': date,
//         'endDate': date
//       },
//       headers: { 'Content-type': 'application/x-www-form-urlencoded' },
//       outtime: 10000
//     }
//   }
//   // 日
//   if (type === 1) {
//     return {
//       method: 'post',
//       url: '/highBlood/bpStateNum',
//       data: {
//         'userId': params.userId,
//         'adminHospitalId': params.adminHospitalId,
//         'pageNum': params.pageNum || 1,
//         'pageSize': params.pageSize || 10,
//         'bpMeasureTime': params.bpMeasureTime,
//         'startDate': date,
//         'endDate': date
//       },
//       headers: { 'Content-type': 'application/x-www-form-urlencoded' },
//       outtime: 10000
//     }
//   }
//   // 周
//   if (type === 2) {
//     return {
//       method: 'post',
//       url: '/highBlood/bpStateNum',
//       data: {
//         'userId': params.userId,
//         'adminHospitalId': params.adminHospitalId,
//         'pageNum': params.pageNum || 1,
//         'pageSize': params.pageSize || 10,
//         'bpMeasureTime': params.bpMeasureTime,
//         'startDate': date,
//         'endDate': daybefor(date, -6, 1)
//       },
//       headers: { 'Content-type': 'application/x-www-form-urlencoded' },
//       outtime: 10000
//     }
//   }
//   // 月
//   if (type === 3) {
//     let monthStart = dateFormat(date, 0, 1)
//     let a = dateFormat(date, -1, 1)
//     let monthEnd = daybefor(a, 1, 1)
//     return {
//       method: 'post',
//       url: '/highBlood/bpStateNum',
//       data: {
//         'userId': params.userId,
//         'adminHospitalId': params.adminHospitalId,
//         'pageNum': params.pageNum || 1,
//         'pageSize': params.pageSize || 10,
//         'bpMeasureTime': params.bpMeasureTime,
//         'startDate': monthStart,
//         'endDate': monthEnd
//       },
//       headers: { 'Content-type': 'application/x-www-form-urlencoded' },
//       outtime: 10000
//     }
//   }
// }
