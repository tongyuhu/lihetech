export const sendUserMsg = (obj) => {
  return {
    method: 'post',
    url: '/login',
    data: obj
  }
}
export const getAdminInfo = () => {
  return {
    method: 'post',
    url: '/info'
  }
}
