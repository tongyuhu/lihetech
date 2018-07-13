export const FlupListApi = (params) => {
  return {
    method: 'post',
    url: '/follow/up',
    data: params
  }
}
export const FlupCardApi = (params) => {
  return {
    method: 'post',
    url: '/follow/up',
    data: params
  }
}
export const submitFlupApi = (params) => {
  return {
    method: 'post',
    url: '/follow/card/add',
    data: params
  }
}
export const submitLayerApi = (params) => {
  return {
    method: 'post',
    url: '/member/danger/level/addOrEdit',
    data: params
  }
}
export const lookLayerApi = (params) => {
  return {
    method: 'post',
    url: '/member/danger/level/mes',
    data: params
  }
}
