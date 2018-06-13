export const checkimgApi = (imgurl) => {
  // console.log(medicineType)
  return {
    method: 'post',
    url: imgurl,
    // data: parmas,
    // headers: { 'Content-type': 'form-data' }
    headers: { 'Content-type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*' }
    // timeout: 10000
  }
}
