import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/sysOnline/list',
    method: 'get',
    params
  })
}

// 强退用户
export function forceLogout(tokenId) {
  return request({
    url: '/sysOnline/' + tokenId,
    method: 'delete'
  })
}
