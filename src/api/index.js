import axios from 'axios'
import auth from '@/utils/auth'
import router from '@/router'

// 设置基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 请求头 token 配置
// axios.defaults.headers.Authorization = `Bearer ${auth.getUser().token}`

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const user = auth.getUser()
  if (user.token) config.headers.Authorization = `Bearer ${auth.getUser().token}`
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  // token 失效 跳转到登录页
  if (error.response && error.response.status === 401) router.push('/login')
  return Promise.reject(error)
})

export default axios
