export const dailyImgApi = (params) => {
  let obj = {
    method: 'post',
    url: '/today/notes/date/photo',
    data: params,
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    outtime: 10000
  }
  return obj
}
