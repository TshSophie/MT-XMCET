import request from '@/utils/request'

// 获取文章列表
export function listPost(params) {
  return request({
    url: '/syspost/list',
    method: 'get',
    params
  })
}

// 获取文章列表excel
export function exportPost(params) {
  return request({
    url: '/syspost/exportExcel',
    method: 'get',
    params
  })
}

// 获取文章
export function getPost(id) {
  return request({
    url: '/syspost/' + id,
    method: 'get'
  })
}

// 新增文章
export function addPost(data) {
  return request({
    url: '/syspost',
    method: 'post',
    data
  })
}

// 修改文章
export function updatePost(data) {
  return request({
    url: '/syspost',
    method: 'put',
    data
  })
}

// 删除文章
export function delPost(ids) {
  return request({
    url: '/syspost/' + ids,
    method: 'delete'
  })
}
