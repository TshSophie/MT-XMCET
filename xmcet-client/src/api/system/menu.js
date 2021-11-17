import request from '@/utils/request'

// 获取菜单树形列表
export function treeMenu(params) {
  return request({
    url: '/sysmenu/tree',
    method: 'get',
    params
  })
}

// 获取菜单树形列表
export function mapTree() {
  return request({
    url: '/sysmenu/mapTree',
    method: 'get'
  })
}

// 根据角色获取菜单树形列表
export function roleMenuTreeselect(id) {
  return request({
    url: '/sysmenu/mapTreeByRole/' + id,
    method: 'get'
  })
}

// 获取菜单列表
export function getMenu(id) {
  return request({
    url: '/sysmenu/' + id,
    method: 'get'
  })
}

// 获取菜单列表
export function listMenu(params) {
  return request({
    url: '/sysmenu/list',
    method: 'get',
    params
  })
}

// 新增菜单
export function addMenu(data) {
  return request({
    url: '/sysmenu',
    method: 'post',
    data
  })
}

// 修改菜单
export function updateMenu(data) {
  return request({
    url: '/sysmenu',
    method: 'put',
    data
  })
}

// 删除菜单
export function delMenu(ids) {
  return request({
    url: '/sysmenu/' + ids,
    method: 'delete'
  })
}

// 获取路由
export const getRouters = () => {
  return request({
    url: '/getRouters',
    method: 'get'
  })
}
