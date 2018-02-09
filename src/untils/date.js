// export const dateFormat = function (source, ignoreMinute) {
//   let myDate
//   let separate = '-'
//   let minute = ''
//   if (source === void (0)) {
//     source = new Date()
//   }
//   if (source) {
//     if (source.split) {
//       source = source.replace(/\-/g, '/')
//     } else if (isNaN(parseInt(source))) {
//       source = source.toString().replace(/\-/g, '/')
//     } else {
//       source = new Date(source)
//     }

//     if (new Date(source) && (new Date(source)).getDate) {
//       myDate = new Date(source)
//       if (!ignoreMinute) {
//         minute = (myDate.getHours() < 10 ? ' 0' : ' ') + myDate.getHours() + ':' + (myDate.getMinutes() < 10 ? '0' : '') + myDate.getMinutes()
//       }
//       return myDate.getFullYear() + separate + ((myDate.getMonth() + 1) < 10 ? '0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1)) + separate + (myDate.getDate() < 10 ? '0' : '') + myDate.getDate() + minute
//     } else {
//       return source.slice(0, 16)
//     }
//   } else {
//     return source
//   }
// }
export const dateFormat = function (source, monthbefor, ignoreMinute) {
  let myDate
  let separate = '-'
  let minute = ''
  if (source === void (0)) {
    source = new Date()
  }
  if (source) {
    if (source.split) {
      source = source.replace(/\-/g, '/')
    } else if (isNaN(parseInt(source))) {
      source = source.toString().replace(/\-/g, '/')
    } else {
      source = new Date(source)
    }

    if (new Date(source) && (new Date(source)).getDate) {
      myDate = new Date(source)
      if (!ignoreMinute) {
        minute = (myDate.getHours() < 10 ? ' 0' : ' ') + myDate.getHours() + ':' + (myDate.getMinutes() < 10 ? '0' : '') + myDate.getMinutes()
      }

      let year = myDate.getFullYear()
      let month = (myDate.getMonth() + 1) < 10 ? '0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1)
      if (monthbefor) {
        if (monthbefor > 12) {
          year = year - Math.floor(monthbefor / 12)
          monthbefor = monthbefor - 12 * Math.floor(monthbefor / 12)
        }
        if ((month - monthbefor) < 0) {
          month = month - monthbefor + 12
          year = year - 1
          if (month < 10) {
            month = '0' + month
          }
        } else {
          month = month - monthbefor
          if (month < 10) {
            month = '0' + month
          }
        }
      }

      return year + separate + month + separate + (myDate.getDate() < 10 ? '0' : '') + myDate.getDate() + minute
    } else {
      return source.slice(0, 16)
    }
  } else {
    return source
  }
}

export const daybefor = function (day, ignoreMinute) {
  let myDate = new Date()
  let value = myDate.getTime() - day * 86400000
  return dateFormat(value, 0, ignoreMinute)
}
