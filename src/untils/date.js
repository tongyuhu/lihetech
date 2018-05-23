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
/**
 *
 * @param {*} source 原始时间
 * @param {*} monthbefor 几个月前
 * @param {*} ignoreMinute 忽略分钟
 */
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
      let monthNum
      if (!isNaN(month)) {
        monthNum = month
      } else {
        monthNum = parseInt(month)
      }
      if (monthbefor) {
        if (monthbefor > 12) {
          year = year - Math.floor(monthbefor / 12)
          monthbefor = monthbefor - 12 * Math.floor(monthbefor / 12)
        }
        if ((monthNum - monthbefor) <= 0) {
          month = monthNum - monthbefor + 12
          year = year - 1
          if (month < 10) {
            month = '0' + month
          }
        } else {
          month = monthNum - monthbefor
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
/**
 *
 * @param {原始时间} sourceDay
 * @param {多少天前} day
 * @param {是否忽略分钟} ignoreMinute
 */
export const daybefor = function (sourceDay, day, ignoreMinute) {
  let myDate = dateFormat(sourceDay, 0, 1)
  let arr = myDate.split('-')
  // console.log(arr)
  // let myDate1 = Date(arr[0], arr[1], arr[2])
  let myDate1 = new Date()
  myDate1.setFullYear(arr[0])
  myDate1.setFullYear(arr[0], arr[1] - 1, arr[2])
  let date = new Date(myDate1)
  let value = date.getTime() - day * 86400000
  return dateFormat(value, 0, ignoreMinute)
}
//   通过周数和星期计算日期
/**
 *
 * @param {年} year
 * @param {周数} week
 * @param {星期 0-6 0代表周日} day
 * @returns {时间日期}
 */
export const dateFromWeek = function (year, week, day) {
  //   year       年
  //   week       周
  //   day         星期   (0-6,   0代表周日)
  day = day | 0
  let date1 = new Date(year, 0, 1)
  let dayMS = 24 * 60 * 60 * 1000
  let firstDay = (7 - date1.getDay()) * dayMS
  let weekMS = (week - 2) * 7 * dayMS
  let result = date1.getTime() + firstDay + weekMS + day * dayMS
  date1.setTime(result)
  // return date1.toLocaleDateString()
  return dateFormat(date1, 0, 1)
}

export const computeWeekday = function (date) {
  let day = dateFormat(date, 0, true)
  let weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  let myday = new Date(Date.parse(day.replace(/-/g, '/')))
  return weekDays[myday.getDay()]
}
