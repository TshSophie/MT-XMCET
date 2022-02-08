import request from '@/utils/request'

// 获取列表
export function listArticle(params) {
  return request({
    url: '/admin/article/list',
    method: 'get',
    params
  })
}

// 获取article信息
export function getArticle(id) {
  return request({
    url: '/admin/article/' + id,
    method: 'get'
  })
}

// 删除article
export function delArticle(ids) {
  return request({
    url: '/admin/article/' + ids,
    method: 'delete'
  })
}

// 新增article
export function addArticle(data) {
  return request({
    url: '/admin/article',
    method: 'post',
    data
  })
}

// 修改article信息
export function updateArticle(data) {
  return request({
    url: '/admin/article',
    method: 'put',
    data
  })
}
