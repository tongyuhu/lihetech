export default function (region) {
  return {
    method: 'post',
    url: '/region/list',
    data: {
      regionId: region
    }
  }
}
