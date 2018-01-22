
//  sicklistData
//  id
//  name
//  sicktype
//  badrate
//  badtimes
//  status
//  addtime
//  care
//  phone

export const sicklistDataApi = {
  method: 'post',
  url: 'https://easy-mock.com/mock/5a5ffcab4a073a3a0e0e9eed/hospital/sickMsgPost',
  data: {
    sicklist: '病人列表'
  },
  headers: { 'Content-type': 'application/x-www-form-urlencoded' },
  timeout: 10000
}
export const halfyearSickListApi = {
  method: 'post',
  url: 'https://easy-mock.com/mock/5a5ffcab4a073a3a0e0e9eed/hospital/halfyearSickList',
  data: {
    halfyearSick: '半年未做检查的病人列表'
  },
  headers: { 'Content-type': 'application/x-www-form-urlencoded' },
  timeout: 10000
}
export function sicknameSelectApi (sclectdata) {
  return {
    method: 'post',
    url: 'https://easy-mock.com/mock/5a5ffcab4a073a3a0e0e9eed/hospital/sick',
    data: {
      sick: '病人姓名',
      sickname: sclectdata
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    timeout: 10000
  }
}

export function sicktypeselect (select) {
  return {
    method: 'post',
    url: 'https://easy-mock.com/mock/5a5ffcab4a073a3a0e0e9eed/hospital/halfyearSickList',
    data: {
      state: '病人状况说明',
      sickMsg: select
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    timeout: 10000
  }
}
