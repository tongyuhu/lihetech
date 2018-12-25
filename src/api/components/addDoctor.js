/**
 *
 * @param {object} obj
 * @description  添加 管理员-医生-专家-信息
 */
export const addDoctorApi = (obj) => {
  return {
    method: 'post',
    url: 'add',
    data: obj
  }
}
