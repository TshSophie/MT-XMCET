import request from '@/utils/request'

// 获取部门树形列表
export function deptTree (params) {
  return request({
    url: '/sysdept/tree',
    method: 'get',
    params
  })
}

// 获取部门树形列表详细
export function deptTree2 (params) {
  return request({
    url: '/sysdept/tree2',
    method: 'get',
    params
  })
}

// 获取排除某些部门的树形列表
export function listDeptExcludeChild (id) {
  return request({
    url: '/sysdept/tree/exclude/' + id,
    method: 'get'
  })
}

// 获取部门
export function getDept (id) {
  return request({
    url: '/sysdept/' + id,
    method: 'get'
  })
}

// 新增部门
export function addDept (data) {
  return request({
    url: '/sysdept',
    method: 'post',
    data
  })
}

// 修改部门
export function updateDept (data) {
  return request({
    url: '/sysdept',
    method: 'put',
    data
  })
}

// 删除部门
export function delDept (ids) {
  return request({
    url: '/sysdept/' + ids,
    method: 'delete'
  })
}
