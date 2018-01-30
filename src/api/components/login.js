export const sendUserMsg = (obj) => {
  return {
    method: 'post',
    url: '/loginaccount',
    data: obj
  }
}
