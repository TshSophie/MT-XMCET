import request from '@/utils/request'

// 获取Api树形列表
export function treeApi(params) {
  return request({
    url: '/sysapi/tree',
    method: 'get',
    params
  })
}

// 获取Api树形列表
export function mapTree() {
  return request({
    url: '/sysapi/mapTree',
    method: 'get'
  })
}

// 根据角色获取Api树形列表
export function roleApiTreeselect(id) {
  return request({
    url: '/sysapi/mapTreeByRole/' + id,
    method: 'get'
  })
}

// 获取Api列表
export function getApi(id) {
  return request({
    url: '/sysapi/' + id,
    method: 'get'
  })
}

// 获取Api列表
export function listApi(params) {
  return request({
    url: '/sysapi/list',
    method: 'get',
    params
  })
}

// 新增Api
export function addApi(data) {
  return request({
    url: '/sysapi',
    method: 'post',
    data
  })
}

// 修改Api
export function updateApi(data) {
  return request({
    url: '/sysapi',
    method: 'put',
    data
  })
}

// 删除Api
export function delApi(ids) {
  return request({
    url: '/sysapi/' + ids,
    method: 'delete'
  })
}
