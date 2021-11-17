import request from '@/utils/request'

// 获取列表
export function books(params) {
  return request({
    url: '/admin/book/all',
    method: 'get',
    params
  })
}

// 获取book信息
export function getBook(id) {
  return request({
    url: '/admin/book/' + id,
    method: 'get'
  })
}

// 删除book
export function delBook(ids) {
  return request({
    url: '/admin/book/' + ids,
    method: 'delete'
  })
}

// 新增book
export function addBook(data) {
  return request({
    url: '/admin/book',
    method: 'post',
    data
  })
}

// 修改book信息
export function updateBook(data) {
  return request({
    url: '/admin/book',
    method: 'put',
    data
  })
}
