import axios from 'axios'
import { ElMessage } from 'element-plus'
import Store from '../store'
const request = axios.create({
  baseURL: process.env.VUE_APP_API,
  // baseURL: '/api',
  timeout: 60000
})
request.interceptors.request.use(config => { // 请求拦截
  if (Store.state.token) config.headers.Authorization = `bearer ${Store.state.token}`
  return config
}, err => {
  console.log(err)
  return Promise.reject(err)
})

request.interceptors.response.use(({ data, status, config }) => { // 响应拦截
  if (status === 200) return data
  else {
    ElMessage(data.msg || '网络繁忙')
    return Promise.reject(data)
  }
}, err => {
  ElMessage(err.msg || '网络繁忙')
  return Promise.reject(err)
})

export default request
