export const layerSickApi = (obj) => {
  return {
    method: 'post',
    url: '/wholePoint/blood/level',
    data: obj
  }
}
export const easyApi = (obj) => {
  return {
    method: 'post',
    url: '/wholePoint/blood/easy/crowd',
    data: obj
  }
}
