/**
 *
 * @param {number 1-高血压药品目录 2-糖尿病药品目录} medicineType
 * @description 药品目录
 */
export const sickTypeApi = (medicineType) => {
  console.log(medicineType)
  return {
    method: 'post',
    url: '/medicine/directory/list',
    data: {
      'medicineType': medicineType
    }
  }
}
/**
 *
 * @param {number} medicineType
 * @param {number} sickType
 * @description  根据药品目录id查询高血压药品信息
 */
export const medicineTypeApi = (medicineType, sickType) => {
  if (isNaN(sickType)) {
    sickType = parseInt(sickType)
  }
  if (sickType === 1) {
    return {
      method: 'post',
      url: '/medicine/blood/list',
      data: {
        'medicineId': medicineType
      }
    }
  }
  if (sickType === 2) {
    return {
      method: 'post',
      url: '/region/add',
      data: {
        'medicineId': medicineType
      }
    }
  }
}
