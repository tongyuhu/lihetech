import Vue from 'vue'
import { Message } from 'element-ui'
Vue.component(Message.name, Message)
// 判断数据类型
function typeOf (obj) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return map[toString.call(obj)]
}
// 深拷贝
function deepcopy (data) {
  const t = typeOf(data)
  let o
  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }
  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepcopy(data[i]))
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepcopy(data[i])
    }
  }
  return o
}
export {deepcopy}
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
// export const catchError = (error) => {
//   if (error.response) {
//     switch (error.response.status) {
//       case 400:
//         Vue.prototype.$message({
//           message: error.response.data.message || '请求参数异常',
//           type: 'error'
//         })
//         break
//       case 401:
//         sessionStorage.removeItem('user')
//         Vue.prototype.$message({
//           message: error.response.data.message || '密码或账号错误',
//           type: 'warning',
//           onClose: function () {
//             location.reload()
//           }
//         })
//         break
//       case 403:
//         Vue.prototype.$message({
//           message: error.response.data.message || '无权访问',
//           type: 'warning'
//         })
//         break
//       default:
//         Vue.prototype.$message({
//           message: error.response.data.message || '服务端异常',
//           type: 'error'
//         })
//     }
//   }
//   return Promise.reject(error)
// }
// instance.interceptors.response.use(response => {
//   return response
// }, catchError)

// 向上寻找指定组件 context 为从哪儿开始 一般为this
function findComponentUpward (context, componentName, componentNames) {
  if (typeof componentName === 'string') {
    componentNames = [componentName]
  } else {
    componentNames = componentName
  }

  let parent = context.$parent
  let name = parent.$options.name
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent
    if (parent) name = parent.$options.name
  }
  return parent
}
export {findComponentUpward}

// Find component downward 向下寻找指定组件 返回第一个
export function findComponentDownward (context, componentName) {
  const childrens = context.$children
  let children = null

  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name
      if (name === componentName) {
        children = child
        break
      } else {
        children = findComponentDownward(child, componentName)
        if (children) break
      }
    }
  }
  return children
}

// Find components downward 向下寻找指定组件 返回所有name相同的组件
export function findComponentsDownward (context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child)
    const foundChilds = findComponentsDownward(child, componentName)
    return components.concat(foundChilds)
  }, [])
}

// Find components upward 向上寻找指定组件 返回所有name相同的组件
export function findComponentsUpward (context, componentName) {
  let parents = []
  const parent = context.$parent
  if (parent) {
    if (parent.$options.name === componentName) parents.push(parent)
    return parents.concat(findComponentsUpward(parent, componentName))
  } else {
    return []
  }
}

// Find brothers components  寻找所有兄弟组件 不包括自身
export function findBrothersComponents (context, componentName) {
  let res = context.$parent.$children.filter(item => {
    return item.$options.name === componentName
  })
  let index = res.indexOf(context)
  res.splice(index, 1)
  return res
}
