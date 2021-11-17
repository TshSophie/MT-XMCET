import request from '@/utils/request'

// 获取系统用户列表
export function listUser(params) {
  return request({
    url: '/sysuser/list',
    method: 'get',
    params
  })
}

// 获取系统用户信息
export function getUser(id) {
  return request({
    url: '/sysuser/' + id,
    method: 'get'
  })
}

// 获取个人资料
export function getUserProfile() {
  return request({
    url: '/sysuser/profile',
    method: 'get'
  })
}

// 修改密码
export function updateUserPwd(data) {
  return request({
    url: '/sysuser/profile/password',
    method: 'put',
    data
  })
}

// 修改用户资料
export function updateUserProfile(data) {
  return request({
    url: '/sysuser/profile',
    method: 'put',
    data
  })
}

// 导出excel
export function exportExcel(params) {
  return request({
    url: 'sysuser/exportExcel',
    method: 'get',
    params
  })
}

// 删除用户
export function delUser(ids) {
  return request({
    url: '/sysuser/' + ids,
    method: 'delete'
  })
}

// 新增用户
export function addUser(data) {
  return request({
    url: '/sysuser',
    method: 'post',
    data
  })
}

// 修改用户信息
export function updateUser(data) {
  return request({
    url: '/sysuser',
    method: 'put',
    data
  })
}

// 上传头像
export function uploadAvatar(data) {
  return request({
    url: '/sysuser/profile/avatar',
    method: 'post',
    data
  })
}

// 修改密码
export function resetUserPwd(data) {
  return request({
    url: '/sysuser/resetPwd',
    method: 'put',
    data
  })
}

// 修改用户状态
export function changeUserStatus(data) {
  return request({
    url: '/sysuser',
    method: 'put',
    data
  })
}
