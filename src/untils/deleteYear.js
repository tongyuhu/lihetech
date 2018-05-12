import _ from 'lodash'
export const deleteYear = function (arr) {
  let time = arr
  let year
  time = _.map(time, function (value, index) {
    if (index === 0) {
      if (value.length >= 19) {
        year = value.slice(5, 11)
        return value.slice(5)
      } else {
        year = value.slice(0, 4)
        return value
      }
    } else {
      let y
      if (value.length >= 19) {
        y = value.slice(5, 11)
      } else {
        y = value.slice(0, 4)
      }
      // y= value.slice(0, 4)
      if (_.eq(y, year)) {
        if (value.length >= 19) {
          return value.slice(11)
        } else {
          return value.slice(5)
        }
      } else {
        if (value.length >= 19) {
          year = value.slice(5, 11)
          return value.slice(5)
        } else {
          year = value.slice(0, 4)
          return value
        }
        // year = value.slice(0, 4)
      }
    }
  })
  return time
}
export const deleteSecond = function (time) {
  time = time.slice()
  return time
}
