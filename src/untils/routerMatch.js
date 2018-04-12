import _ from 'lodash'
// 根据返回路由匹配路由
export const routeMatch = function (route, full) {
  let arr = []
  if (Array.isArray(route) && route.length === 0) {
    return
  } else if (!Array.isArray(route)) {
    return
  } else {
    for (let i = 0; i < full.length; i++) {
      for (let j = 0; j < route.length; j++) {
        if (route[j].name === full[i].name) {
          if (route[j].children) {
            full[i].children = routeMatch(route[j].children, full[i].children)
          }
          arr.push(full[i])
        }
      }
    }
  }
  return arr
}

// 根据角色匹配路由
export const roleMatch = function (role, full) {
  let arr = []
  let matchRole = role
  for (let i = 0; i < full.length; i++) {
    if (full[i].meta && full[i].meta.role) {
      if (full[i].meta.role.indexOf(matchRole) !== -1) {
        if (full[i].children) {
          full[i].children = roleMatch(matchRole, full[i].children)
        }
        arr.push(full[i])
      }
    } else {
      return
    }
  }
  return arr
}
function routerRoleMatch (role, fullRouter) {
  let routers = []
  let full = fullRouter
  if (!_.isArray(full)) {
    full = []
  }

  routers = _.filter(full, (o) => {
    if (o.children) {
      o.children = routerRoleMatch(role, o.children)
    }
    return _.includes(o.meta.role, role)
  })
  return routers
}
export {routerRoleMatch}
