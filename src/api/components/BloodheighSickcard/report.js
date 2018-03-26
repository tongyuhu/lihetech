import {dateFormat, daybefor} from './../../../untils/date'
export const bloodCoverApi = (params, date) => {
  date.value = dateFormat(date.value, 0, 1)
  let req = {}
  if (date.endDate) {
    req = {
      'userId': params.userId,
      'adminHospitalId': params.adminHospitalId,
      'startDate': date.value,
      'endDate': date.endtime
    }
  } else {
    // 周
    if (date.label === 'oneweek') {
      req = {
        'userId': params.userId,
        'adminHospitalId': params.adminHospitalId,
        'startDate': daybefor(date.value, 6, 1),
        'endDate': date.value
      }
    }
    // 一周
    if (date.label === 'twoweek') {
      req = {
        'userId': params.userId,
        'adminHospitalId': params.adminHospitalId,
        'startDate': daybefor(date.value, 13, 1),
        'endDate': date.value
      }
    }
    // 一月
    if (date.label === 'onemonth') {
      req = {
        'userId': params.userId,
        'adminHospitalId': params.adminHospitalId,
        'startDate': dateFormat(date.value, 1, 1),
        'endDate': date.value

      }
    }
    // 三月
    if (date.label === 'threemonth') {
      req = {
        'userId': params.userId,
        'adminHospitalId': params.adminHospitalId,
        'startDate': dateFormat(date.value, 3, 1),
        'endDate': date.value
      }
    }
  }
  let obj = {
    method: 'post',
    url: '/highBlood/bpPeriodRatio',
    data: req,
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    outtime: 10000
  }
  return obj
}
export const histogramApi = (params, date) => {
  date.value = dateFormat(date.value, 0, 1)
  let req = {}
  if (date.endDate) {
    req = {
      'userId': params.userId,
      'adminHospitalId': params.adminHospitalId,
      'startDate': date.value,
      'endDate': date.endtime
    }
  } else {
    // 周
    if (date.label === 'oneweek') {
      req = {
        'userId': params.userId,
        'adminHospitalId': params.adminHospitalId,
        'startDate': daybefor(date.value, 6, 1),
        'endDate': date.value
      }
    }
    // 一周
    if (date.label === 'twoweek') {
      req = {
        'userId': params.userId,
        'adminHospitalId': params.adminHospitalId,
        'startDate': daybefor(date.value, 13, 1),
        'endDate': date.value
      }
    }
    // 一月
    if (date.label === 'onemonth') {
      req = {
        'userId': params.userId,
        'adminHospitalId': params.adminHospitalId,
        'startDate': dateFormat(date.value, 1, 1),
        'endDate': date.value

      }
    }
    // 三月
    if (date.label === 'threemonth') {
      req = {
        'userId': params.userId,
        'adminHospitalId': params.adminHospitalId,
        'startDate': dateFormat(date.value, 3, 1),
        'endDate': date.value
      }
    }
  }
  let obj = {
    method: 'post',
    url: '/highBlood/bpPeriodData',
    data: req,
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    outtime: 10000
  }
  return obj
}
export const bloodfoodApi = (params, date) => {
  let req = {}
  req = {
    'userId': params.userId,
    'adminHospitalId': params.adminHospitalId,
    'pageNum': params.pageNum || 1,
    'pageSize': params.pageSize || 5
  }
  if (date) {
    date.value = dateFormat(date.value, 0, 1)
    if (date.endDate) {
      req = {
        'userId': params.userId,
        'adminHospitalId': params.adminHospitalId,
        'startDate': date.value,
        'endDate': date.endtime,
        'pageNum': params.pageNum || 1,
        'pageSize': params.pageSize || 5
      }
    } else {
      // 周
      if (date.label === 'oneweek') {
        req = {
          'userId': params.userId,
          'adminHospitalId': params.adminHospitalId,
          'startDate': daybefor(date.value, 6, 1),
          'endDate': date.value,
          'pageNum': params.pageNum || 1,
          'pageSize': params.pageSize || 5
        }
      }
      // 一周
      if (date.label === 'twoweek') {
        req = {
          'userId': params.userId,
          'adminHospitalId': params.adminHospitalId,
          'startDate': daybefor(date.value, 13, 1),
          'endDate': date.value,
          'pageNum': params.pageNum || 1,
          'pageSize': params.pageSize || 5
        }
      }
      // 一月
      if (date.label === 'onemonth') {
        req = {
          'userId': params.userId,
          'adminHospitalId': params.adminHospitalId,
          'startDate': dateFormat(date.value, 1, 1),
          'endDate': date.value,
          'pageNum': params.pageNum || 1,
          'pageSize': params.pageSize || 5

        }
      }
      // 三月
      if (date.label === 'threemonth') {
        req = {
          'userId': params.userId,
          'adminHospitalId': params.adminHospitalId,
          'startDate': dateFormat(date.value, 3, 1),
          'endDate': date.value,
          'pageNum': params.pageNum || 1,
          'pageSize': params.pageSize || 5
        }
      }
    }
  }
  let obj = {
    method: 'post',
    url: '/highBlood/food/list',
    data: req,
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    outtime: 10000
  }
  return obj
}
export const bloodsportApi = (params, date) => {
  let req = {}
  req = {
    'userId': params.userId,
    'adminHospitalId': params.adminHospitalId,
    // 'startDate': date.value,
    // 'endDate': date.endtime,
    'pageNum': params.pageNum || 1,
    'pageSize': params.pageSize || 5
  }
  if (date) {
    date.value = dateFormat(date.value, 0, 1)

    if (date.endDate) {
      req = {
        'userId': params.userId,
        'adminHospitalId': params.adminHospitalId,
        'startDate': date.value,
        'endDate': date.endtime,
        'pageNum': params.pageNum || 1,
        'pageSize': params.pageSize || 5
      }
    } else {
      // 周
      if (date.label === 'oneweek') {
        req = {
          'userId': params.userId,
          'adminHospitalId': params.adminHospitalId,
          'startDate': daybefor(date.value, 6, 1),
          'endDate': date.value,
          'pageNum': params.pageNum || 1,
          'pageSize': params.pageSize || 5
        }
      }
      // 一周
      if (date.label === 'twoweek') {
        req = {
          'userId': params.userId,
          'adminHospitalId': params.adminHospitalId,
          'startDate': daybefor(date.value, 13, 1),
          'endDate': date.value,
          'pageNum': params.pageNum || 1,
          'pageSize': params.pageSize || 5
        }
      }
      // 一月
      if (date.label === 'onemonth') {
        req = {
          'userId': params.userId,
          'adminHospitalId': params.adminHospitalId,
          'startDate': dateFormat(date.value, 1, 1),
          'endDate': date.value,
          'pageNum': params.pageNum || 1,
          'pageSize': params.pageSize || 5

        }
      }
      // 三月
      if (date.label === 'threemonth') {
        req = {
          'userId': params.userId,
          'adminHospitalId': params.adminHospitalId,
          'startDate': dateFormat(date.value, 3, 1),
          'endDate': date.value,
          'pageNum': params.pageNum || 1,
          'pageSize': params.pageSize || 5
        }
      }
    }
  }

  let obj = {
    method: 'post',
    url: '/highBlood/food/list',
    data: req,
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    outtime: 10000
  }
  return obj
}
