const key = 'user'
// 本存储 用户信息
const setUser = (user) => {
  window.sessionStorage.setItem(key, JSON.stringify(user))
}

// 从本地获取 用户信息
const getUser = () => {
  return JSON.parse(window.sessionStorage.getItem(key) || '{}')
}

// 删除本地 存储用户信息
const removeUser = () => {
  return window.sessionStorage.removeItem('user')
}

export default {
  setUser,
  getUser,
  removeUser
}
