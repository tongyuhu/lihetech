
export const originalApi = (params) => {
  return {
    method: 'post',
    url: '/highBlood/history/list',
    data: params,
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    outtime: 10000
  }
}
