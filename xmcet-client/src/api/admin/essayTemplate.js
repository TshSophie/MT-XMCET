import request from '@/utils/request'

// 获取列表
export function listEssayTemplate(params) {
  return request({
    url: '/admin/essayTemplate/list',
    method: 'get',
    params
  })
}

// 获取essayTemplate信息
export function getEssayTemplate(id) {
  return request({
    url: '/admin/essayTemplate/' + id,
    method: 'get'
  })
}

// 删除essayTemplate
export function delEssayTemplate(ids) {
  return request({
    url: '/admin/essayTemplate/' + ids,
    method: 'delete'
  })
}

// 新增essayTemplate
export function addEssayTemplate(data) {
  return request({
    url: '/admin/essayTemplate',
    method: 'post',
    data
  })
}

// 修改essayTemplate信息
export function updateEssayTemplate(data) {
  return request({
    url: '/admin/essayTemplate',
    method: 'put',
    data
  })
}
