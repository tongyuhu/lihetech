// 双臂血压计
export const KSGBloodHeighDataApi = (setsickID) => {
  return {
    method: 'post',
    url: 'https://easy-mock.com/mock/5a5ffcab4a073a3a0e0e9eed/hospital/bloodheighSickDataApi',
    data: {
      sickID: setsickID
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    outtime: 10000
  }
}
