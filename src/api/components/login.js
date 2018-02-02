export const sendUserMsg = (obj) => {
  return {
    method: 'post',
    url: '/login',
    data: obj
  }
}
