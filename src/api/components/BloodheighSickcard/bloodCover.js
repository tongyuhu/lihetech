import {dateFormat, daybefor} from './../../../untils/date'
export const bloodheighSickDataApi = (params, data) => {
  // 最近
  if (data === 0) {
    return {
      method: 'post',
      url: '/highBlood/lately/data',
      data: {
        'userId': params.userId,
        'adminHospitalId': params.adminHospitalId,
        'bpMeasureTime': params.bpMeasureTime,
        'pageNum': params.pageNum || 1,
        'pageSize': params.pageSize || 10
      },
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      outtime: 10000
    }
  }
  // 日
  if (data === 1) {
    return {
      method: 'post',
      url: '/highBlood/dayAvg',
      data: {
        'userId': params.userId,
        'adminHospitalId': params.adminHospitalId,
        'pageNum': params.pageNum || 1,
        'pageSize': params.pageSize || 10,
        'bpMeasureTime': params.bpMeasureTime
      },
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      outtime: 10000
    }
  }
  // 周
  if (data === 2) {
    return {
      method: 'post',
      url: '/highBlood/weekAvg',
      data: {
        'userId': params.userId,
        'adminHospitalId': params.adminHospitalId,
        'pageNum': params.pageNum || 1,
        'pageSize': params.pageSize || 10,
        'bpMeasureTime': params.bpMeasureTime
      },
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      outtime: 10000
    }
  }
  // 月
  if (data === 3) {
    return {
      method: 'post',
      url: '/highBlood/monthAvg',
      data: {
        'userId': params.userId,
        'adminHospitalId': params.adminHospitalId,
        'pageNum': params.pageNum || 1,
        'pageSize': params.pageSize || 10,
        'bpMeasureTime': params.bpMeasureTime
      },
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      outtime: 10000
    }
  }
}
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
export const updatebloodTrendStateApi = (params, type, date) => {
  // 最近
  if (type === 0) {
    return {
      method: 'post',
      url: '/highBlood/bpStateNum',
      data: {
        'userId': params.userId,
        'adminHospitalId': params.adminHospitalId,
        'bpMeasureTime': params.bpMeasureTime,
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
        'startDate': daybefor(date, 6, 1),
        'endDate': date
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
        'startDate': monthStart,
        'endDate': monthEnd
      },
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      outtime: 10000
    }
  }
}
