export const rongFriendApi = (params) => {
  return {
    method: 'post',
    url: '/rong/friend/list',
    data: {
      'pageNum': 999,
      'pageSize': 1
    },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    timeout: 10000
  }
}
