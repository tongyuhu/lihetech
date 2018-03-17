import axios from 'axios'
import Vue from 'vue'
import { Message } from 'element-ui'
Vue.component(Message.name, Message)
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
// 深拷贝
export const deepcopy = function (source) {
  if (!source) {
    return source
  }
  let sourceCopy = source instanceof Array ? [] : {}
  for (let item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? deepcopy(source[item]) : source[item]
  }
  return sourceCopy
}
// 菜单数据组织         #########暂时没用
export const buildMenu = (array, ckey) => {
  let menuData = []
  let indexKeys = Array.isArray(array) ? array.map((e) => { return e.id }) : []
  ckey = ckey || 'parent_id'
  array.forEach((e, i) => {
    // 一级菜单
    if (!e[ckey] || (e[ckey] === e.id)) {
      delete e[ckey]
      menuData.push(deepcopy(e))  // 深拷贝
    } else if (Array.isArray(indexKeys)) {
      // 检测ckey有效性
      let parentIndex = indexKeys.findIndex(id => {
        return id === e[ckey]          /// //////////////////    ???????
      })
      if (parentIndex === -1) {
        menuData.push(e)
      }
    }
  })
  let findChildren = function (parentArr) {
    if (Array.isArray(parentArr) && parentArr.length) {
      parentArr.forEach(function (parentNode) {
        array.forEach(function (node) {
          if (parentNode.id === node[ckey]) {
            if (parentNode.children) {
              parentNode.children.push(node)
            } else {
              parentNode.children = [node]
            }
          }
        })
        if (parentNode.children) {
          findChildren(parentNode.children)
        }
      })
    }
  }
  findChildren(menuData)
  return menuData
}

// sessionStorage
export const session = (key, value) => {
  if (value === void (0)) {
    let lsVal = sessionStorage.getItem(key)
    if (lsVal && lsVal.indexOf('autostringify-') === 0) {
      return JSON.parse(lsVal.split('autostringify-')[1])
    } else {
      return lsVal
    }
  } else {
    if (typeof (val) === 'object' || Array.isArray(value)) {
      value = 'autostringify-' + JSON.stringify(value)
    }
    return sessionStorage.setItem(key, value)
  }
}

// export const instance = axios.create({
//   baseURL: 'https://easy-mock.com/mock/5a5ffcab4a073a3a0e0e9eed/hospital',
//   timeout: 10000
// })
// instance.defaults.headers.post['Content-Type'] = 'application/json'

// 错误处理
export const catchError = (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        Vue.prototype.$message({
          message: error.response.data.message || '请求参数异常',
          type: 'error'
        })
        break
      case 401:
        sessionStorage.removeItem('user')
        Vue.prototype.$message({
          message: error.response.data.message || '密码或账号错误',
          type: 'warning',
          onClose: function () {
            location.reload()
          }
        })
        break
      case 403:
        Vue.prototype.$message({
          message: error.response.data.message || '无权访问',
          type: 'warning'
        })
        break
      default:
        Vue.prototype.$message({
          message: error.response.data.message || '服务端异常',
          type: 'error'
        })
    }
  }
  return Promise.reject(error)
}
// instance.interceptors.response.use(response => {
//   return response
// }, catchError)
