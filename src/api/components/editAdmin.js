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
    data: parmas,
    // headers: { 'Content-type': 'form-data' }
    headers: { 'Content-type': 'multipart/form-data' }
    // timeout: 10000
  }
}
