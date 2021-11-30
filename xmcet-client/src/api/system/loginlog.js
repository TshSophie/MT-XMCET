import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/sysLoginlog/list',
    method: 'get',
    params
  })
}
