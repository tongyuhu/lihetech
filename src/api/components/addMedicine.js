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
