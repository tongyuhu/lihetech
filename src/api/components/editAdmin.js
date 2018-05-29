export const editAdminApi = (parmas) => {
  // console.log(medicineType)
  return {
    method: 'post',
    url: '/update',
    data: parmas
  }
}
export const uploadFileApi = (parmas) => {
  // console.log(medicineType)
  return {
    method: 'post',
    url: '/file/upload/commons',
    data: parmas
  }
}
