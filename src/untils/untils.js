import axios from 'axios'
// 年月周日按钮的选择
export const checkDateBtn = (btn, btnArr, defaultType, changeType) => {
  if (btnArr[btn] === defaultType) {
    for (let i = 0; i < btnArr.length; i++) {
      btnArr.splice(i, 1, defaultType)
    }
    btnArr.splice(btn, 1, changeType)
  }
}

// 关注按钮 的设置
export const careText = (boolean) => {
  if (boolean) {
    return '取消关注'
  } else {
    return '关注'
  }
}
export const care = (index, row) => {
  if (row[index].care === false) {
    row[index].care = true
    axios({
      method: 'post',
      url: 'https://easy-mock.com/mock/5a5ffcab4a073a3a0e0e9eed/hospital/badsick',
      data: {
        sickID: row[index].id,
        sickName: row[index].name,
        isCare: row[index].care
      }
    })
    .then()
    .catch(err => {
      return err
    })
    // 点击关注的动作
    // console.log(row[index].name)
    // console.log(row[index].id)
  } else {
    // 取消关注 do thing
    row[index].care = false
    axios({
      method: 'post',
      url: 'https://easy-mock.com/mock/5a5ffcab4a073a3a0e0e9eed/hospital/badsick',
      data: {
        sickID: row[index].id,
        sickName: row[index].name,
        isCare: row[index].care
      }
    })
      .then()
      .catch(err => {
        return err
      })
  }
}

// 诊断按钮
// export const diagnose = (row, router) => {
//   router.push({
//     name: 'bloodheighSick',
//     params: {
//       sickInfo: row.id
//       // sickName: row.name,
//       // sickId: row.id
//     }
//   })
//   console.log(row)
//   console.log(this.$router)
// }
