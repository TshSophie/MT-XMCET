import request from '@/utils/request'

// 获取列表
export function listUser(params) {
  return request({
    url: '/admin/user/list',
    method: 'get',
    params
  })
}

// 获取user信息
export function getUser(id) {
  return request({
    url: '/admin/user/' + id,
    method: 'get'
  })
}

// 修改user信息
export function updateUser(data) {
  return request({
    url: '/admin/user',
    method: 'put',
    data
  })
}
