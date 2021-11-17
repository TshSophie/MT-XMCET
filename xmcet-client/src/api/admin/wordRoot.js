import request from '@/utils/request'

// 获取列表
export function listWordRoot(params) {
  return request({
    url: '/admin/wordRoot/list',
    method: 'get',
    params
  })
}

// 获取wordRoot信息
export function getWordRoot(id) {
  return request({
    url: '/admin/wordRoot/' + id,
    method: 'get'
  })
}

// 删除wordRoot
export function delWordRoot(ids) {
  return request({
    url: '/admin/wordRoot/' + ids,
    method: 'delete'
  })
}

// 新增wordRoot
export function addWordRoot(data) {
  return request({
    url: '/admin/wordRoot',
    method: 'post',
    data
  })
}

// 修改wordRoot信息
export function updateWordRoot(data) {
  return request({
    url: '/admin/wordRoot',
    method: 'put',
    data
  })
}
