// 病历卡信息
export const sickBloodHeighCardDataApi = (setsickID, index, allindex) => {
  return {
    method: 'post',
    url: 'https://easy-mock.com/mock/5a5ffcab4a073a3a0e0e9eed/hospital/bloodheighSickDataApi',
    data: {
      sickID: setsickID,
      page: index,
      totalPage: allindex
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    outtime: 10000
  }
}
