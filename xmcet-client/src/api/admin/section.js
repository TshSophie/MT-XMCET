import request from '@/utils/request'

// 获取列表
export function listSection(params) {
  return request({
    url: '/admin/section/list',
    method: 'get',
    params
  })
}

// 获取章节信息
export function getSection(id) {
  return request({
    url: '/admin/section/' + id,
    method: 'get'
  })
}

// 删除章节
export function delSection(ids) {
  return request({
    url: '/admin/section/' + ids,
    method: 'delete'
  })
}

// 新增章节
export function addSection(data) {
  return request({
    url: '/admin/section',
    method: 'post',
    data
  })
}

// 修改章节信息
export function updateSection(data) {
  return request({
    url: '/admin/section',
    method: 'put',
    data
  })
}

// 新增章节
export function getSectionCourse(id) {
  return request({
    url: '/admin/section/course/' + id,
    method: 'get'
  })
}

// 新增章节
export function addSectionCourse(data) {
  return request({
    url: '/admin/section/course',
    method: 'post',
    data
  })
}

// 修改章节信息
export function updateSectionCourse(data) {
  return request({
    url: '/admin/section/course',
    method: 'put',
    data
  })
}

// 修改章节信息
export function deleteSectionCourse(ids) {
  return request({
    url: '/admin/section/course/' + ids,
    method: 'delete'
  })
}
