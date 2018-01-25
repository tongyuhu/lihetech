export const cookie = {
  set: function (name, value, days) {
    // let path = ''
    // let domain = ''
    // let secure = ''
    // if (options) {
    // var path1 = path ? '; path=' + path : ''          // 设置路径
    // var domain1 = domain ? '; domain=' + domain : ''  // 设置域
    // var secure1 = secure ? '; secure' : ''                    // 设置安全措施，为 true 则直接设置，否则为空
    // }
      // document.cookie = [name, '=', value, expires, path, domain, secure].join('')
      // expires = '; expires=' + date.toUTCString()
      // let path = options.path ? '; path=' + options.path : '', // 设置路径
      // domain = options.domain ? '; domain=' + options.domain : '', // 设置域
      // secure = options.secure ? '; secure' : '' // 设置安全措施，为 true 则直接设置，否则为空

    let d = new Date()
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
    let expires = '; expires=' + d.toGMTString()
    // window.document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString()
    // window.document.cookie = name + '=' + value + expires + path + domain + secure
    window.document.cookie = [name, '=', value, expires].join('')
    // window.document.cookie = [name, '=', value, expires].join('')
    // console.log(secure)
    // console.log(d)
  },

  get: function (name) {
    let v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
    return v ? v[2] : null
  },

  delete: function (name) {
    this.set(name, '', -1)
  }
}

// export const Cookie = function (name, value, options) {
//   // 如果第二个参数存在
//   if (typeof value !== 'undefined') {
//     options = options || {}
//     if (value === null) {
//       // 设置失效时间
//       options.expires = -1
//     }
//     let expires = ''
//     // 如果存在事件参数项，并且类型为 number，或者具体的时间，那么分别设置事件
//     if (options.expires && (typeof options.expires === 'number' || options.expires.toUTCString)) {
//       let date
//       if (typeof options.expires === 'number') {
//         date = new Date()
//         date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000))
//       } else {
//         date = options.expires
//       }
//       expires = '; expires=' + date.toUTCString()
//     }
//     let path = options.path ? '; path=' + options.path : '', // 设置路径
//       domain = options.domain ? '; domain=' + options.domain : '', // 设置域
//       secure = options.secure ? '; secure' : '' // 设置安全措施，为 true 则直接设置，否则为空

//     // 把所有字符串信息都存入数组，然后调用 join() 方法转换为字符串，并写入 Cookie 信息
//     document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('')
//   } else { // 如果第二个参数不存在
//     let CookieValue = null
//     if (document.cookie && document.cookie !== '') {
//       let Cookie = document.cookie.split(';')
//       for (let i = 0; i < Cookies.length; i++) {
//         let Cookie = (Cookie[i] || '').replace(/^\s+|\s+$/g, '')
//         if (Cookie.substring(0, name.length + 1) === (name + '=')) {
//           CookieValue = decodeURIComponent(Cookie.substring(name.length + 1))
//           break
//         }
//       }
//     }
//     return CookieValue
//   }
// }
