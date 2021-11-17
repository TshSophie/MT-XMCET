import request from '@/utils/request'

// 获取列表
export function listCourse(params) {
  return request({
    url: '/admin/course/list',
    method: 'get',
    params
  })
}

// 获取列表
export function getCoursesByBook(params) {
  return request({
    url: '/admin/course/byBook',
    method: 'get',
    params
  })
}

// 获取课程信息
export function getCourse(id) {
  return request({
    url: '/admin/course/' + id,
    method: 'get'
  })
}

// 删除课程
export function delCourse(ids) {
  return request({
    url: '/admin/course/' + ids,
    method: 'delete'
  })
}

// 新增课程
export function addCourse(data) {
  return request({
    url: '/admin/course',
    method: 'post',
    data
  })
}

// 修改课程信息
export function updateCourse(data) {
  return request({
    url: '/admin/updateCourse',
    method: 'post',
    data
  })
}
