// 血压趋势
export const sickBloodHeighTrendDataApi = (setsickID, time) => {
  return {
    method: 'post',
    url: 'https://easy-mock.com/mock/5a5ffcab4a073a3a0e0e9eed/hospital/bloodheighSickDataApi',
    data: {
      sickID: setsickID,
      date: time,
      trend: '血压趋势数据'
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    outtime: 10000
  }
}
// 血压分布
export const sickBloodHeighCoverDataApi = (setsickID, time) => {
  return {
    method: 'post',
    url: 'https://easy-mock.com/mock/5a5ffcab4a073a3a0e0e9eed/hospital/bloodheighSickDataApi',
    data: {
      sickID: setsickID,
      date: time,
      cover: '血压分布数据'
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    outtime: 10000
  }
}
// 血压平均水平
export const sickBloodHeighAverageDataApi = (setsickID, time) => {
  return {
    method: 'post',
    url: 'https://easy-mock.com/mock/5a5ffcab4a073a3a0e0e9eed/hospital/bloodheighSickDataApi',
    data: {
      sickID: setsickID,
      date: time,
      average: '血压平均水平数据'
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    outtime: 10000
  }
}
// 血压与饮食
export const bloodFoodBloodHeighDataApi = (setsickID, time) => {
  return {
    method: 'post',
    url: 'https://easy-mock.com/mock/5a5ffcab4a073a3a0e0e9eed/hospital/bloodheighSickDataApi',
    data: {
      sickID: setsickID,
      date: time,
      food: '血压与饮食数据'
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    outtime: 10000
  }
}
// 血压与运动
export const bloodSportBloodHeighDataApi = (setsickID, time) => {
  return {
    method: 'post',
    url: 'https://easy-mock.com/mock/5a5ffcab4a073a3a0e0e9eed/hospital/bloodheighSickDataApi',
    data: {
      sickID: setsickID,
      date: time
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    outtime: 10000
  }
}
// 用药
export const useMedicationBloodHeighDataApi = (setsickID, time) => {
  return {
    method: 'post',
    url: 'https://easy-mock.com/mock/5a5ffcab4a073a3a0e0e9eed/hospital/bloodheighSickDataApi',
    data: {
      sickID: setsickID,
      date: time
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    outtime: 10000
  }
}
