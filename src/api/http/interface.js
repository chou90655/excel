import request from './request'
export function get(data) {
  return request({
    url: 'get',
    method: 'get',
    data
  })
}
export function create(data) {
  return request({
    url: 'get',
    method: 'post',
    data
  })
}
