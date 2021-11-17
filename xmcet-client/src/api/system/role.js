import request from '@/utils/request'

// 获取文章列表
export function listRole(params) {
  return request({
    url: '/sysrole/list',
    method: 'get',
    params
  })
}

// 获取文章列表excel
export function exportRole(params) {
  return request({
    url: '/sysrole/exportExcel',
    method: 'get',
    params
  })
}

// 获取文章
export function getRole(id) {
  return request({
    url: '/sysrole/' + id,
    method: 'get'
  })
}

// 新增文章
export function addRole(data) {
  return request({
    url: '/sysrole',
    method: 'post',
    data
  })
}

// 修改文章
export function updateRole(data) {
  return request({
    url: '/sysrole',
    method: 'put',
    data
  })
}

// 删除文章
export function delRole(ids) {
  return request({
    url: '/sysrole/' + ids,
    method: 'delete'
  })
}
