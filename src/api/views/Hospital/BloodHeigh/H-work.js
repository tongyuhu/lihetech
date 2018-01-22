export const newsickaskDataApi = {
  method: 'post',
  url: 'https://easy-mock.com/mock/5a5ffcab4a073a3a0e0e9eed/hospital/sickMsgPost',
  data: {
    newsickaskData: '最新患者问诊患者列表'
  },
  headers: { 'Content-type': 'application/x-www-form-urlencoded' },
  timeout: 10000
}
export const badsickDataApi = {
  method: 'post',
  url: 'https://easy-mock.com/mock/5a5ffcab4a073a3a0e0e9eed/hospital/badsick',
  data: {
    badsickData: '严重患者问诊患者列表'
  },
  headers: { 'Content-type': 'application/x-www-form-urlencoded' },
  timeout: 10000
}
export const noListenDoctorDataApi = {
  method: 'post',
  url: 'https://easy-mock.com/mock/5a5ffcab4a073a3a0e0e9eed/hospital/noListenDoctorData',
  data: {
    noListenDoctorData: '不遵医嘱患者问诊患者列表'
  },
  headers: { 'Content-type': 'application/x-www-form-urlencoded' },
  timeout: 10000
}
export const unperfectMsgDataApi = {
  method: 'post',
  url: 'https://easy-mock.com/mock/5a5ffcab4a073a3a0e0e9eed/hospital/unperfectMsgData',
  data: {
    unperfectMsgData: '档案不完整患者问诊患者列表'
  },
  headers: { 'Content-type': 'application/x-www-form-urlencoded' },
  timeout: 10000
}
