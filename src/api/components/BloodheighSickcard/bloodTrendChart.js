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
 * @param {Number} data 0:最近,1:日,2:周,3:月 4半年
 * @description 血压趋势
 */
export const bloodTrendChartApi = (params, date) => {
  let data = {}
  if (date === 0) {
    data = {
      'userId': params.userId,
      'adminHospitalId': params.adminHospitalId,
      // 'bpMeasureTime': params.bpMeasureTime,
      'pageNum': params.pageNum || 1,
      'pageSize': params.pageSize || 10,
      'dateType': 0,
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
      'dateType': 1,
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
      'dateType': 2,
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
      'dateType': 3,
      'bpMeasureTime': params.bpMeasureTime,
      'bpMeasureState': params.bpMeasureState
    }
  }
  if (date === 4) {
    data = {
      'userId': params.userId,
      'adminHospitalId': params.adminHospitalId,
      'pageNum': params.pageNum || 1,
      'pageSize': params.pageSize || 10,
      'dateType': 4,
      'bpMeasureTime': params.bpMeasureTime,
      'bpMeasureState': params.bpMeasureState
    }
  }
  return {
    method: 'post',
    url: '/highBlood/trend',
    data: data,
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    outtime: 10000
  }
}
