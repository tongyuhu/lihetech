/**
 *
 * @param {object} parmas
 * @description 修改 管理员-医生-专家-信息
 */
export const editAdminApi = (parmas) => {
  // console.log(medicineType)
  return {
    method: 'post',
    url: '/update',
    data: parmas
  }
}
/**
 *
 * @param {File} parmas
 * @description 公共的上传文件接口
 */
export const uploadFileApi = (parmas) => {
  // console.log(medicineType)
  return {
    method: 'post',
    url: '/file/upload/commons',
    data: parmas,
    // headers: { 'Content-type': 'form-data' }
    headers: { 'Content-type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*' }
    // timeout: 10000
  }
}
