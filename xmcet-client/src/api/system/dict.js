import request from '@/utils/request'

// 根据字典类型查询字典数据信息
export function getDicts(dictType) {
  return request({
    url: '/sysdict/data/type/' + dictType,
    method: 'get'
  })
}

// 获取字典类型列表
export function listType(params) {
  return request({
    url: '/sysdict/listType',
    method: 'get',
    params
  })
}

// 获取字典数据列表
export function listData(params) {
  return request({
    url: '/sysdict/listData',
    method: 'get',
    params
  })
}

// 获取字典类型
export function getType(id) {
  return request({
    url: '/sysdict/type/' + id,
    method: 'get'
  })
}

// 新增字典类型
export function addType(data) {
  return request({
    url: '/sysdict/type',
    method: 'post',
    data
  })
}

// 修改字典类型
export function updateType(data) {
  return request({
    url: '/sysdict/type',
    method: 'put',
    data
  })
}

// 删除字典类型
export function delType(ids) {
  return request({
    url: '/sysdict/type/' + ids,
    method: 'delete'
  })
}

// 获取字典数据
export function getData(id) {
  return request({
    url: '/sysdict/data/' + id,
    method: 'get'
  })
}

// 新增字典数据
export function addData(data) {
  return request({
    url: '/sysdict/data',
    method: 'post',
    data
  })
}

// 修改字典数据
export function updateData(data) {
  return request({
    url: '/sysdict/data',
    method: 'put',
    data
  })
}

// 删除字典数据
export function delData(ids) {
  return request({
    url: '/sysdict/data/' + ids,
    method: 'delete'
  })
}
