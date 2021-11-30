<?php

namespace App\Services\System;

use App\Models\System\SysMenu;
use App\Services\Common\JwtAuthService;

class SysMenuService
{
    /**
     * 新增菜单
     */
    static function newOne($data) {
        $insert = [        
          'parent_id' => $data['parentId'],
          'menu_name'=> $data['menuName'],
          'menu_type'=> $data['menuType'],
          'order_num'=> $data['orderNum'],
          'icon'=> array_key_exists('icon', $data) ? $data['icon'] : "",
          'isFrame'=> array_key_exists('isFrame', $data) ? $data['isFrame'] : "",
          'path'=> array_key_exists('path', $data) ? $data['path'] : "",
          'component'=> array_key_exists('component', $data) ? $data['component'] : "",
          'perms'=> array_key_exists('perms', $data) ? $data['perms'] : "",
          'remark'=> array_key_exists('remark', $data) ? $data['remark'] : "",
          'create_by'=> (new JwtAuthService())->userInfo()['user_name'],
          'status'=> array_key_exists('status', $data) ? $data['status'] : 0,
          'visible'=> array_key_exists('visible', $data) ? $data['visible'] : 0,
        ];
        $SysMenu = SysMenu::create($insert);
        return $SysMenu;
    }

    /**
     * 修改菜单
     */
    static function modifyOne($data) {
        $SysMenu = SysMenu::find($data['menuId']);
        $SysMenu->parent_id = array_key_exists('parentId', $data) ? $data['parentId'] : "";
        $SysMenu->menu_name = array_key_exists('menuName', $data) ? $data['menuName'] : "";
        $SysMenu->menu_type = array_key_exists('menuType', $data) ? $data['menuType'] : "";
        $SysMenu->order_num = array_key_exists('orderNum', $data) ? $data['orderNum'] : "";
        $SysMenu->icon = array_key_exists('icon', $data) ? $data['icon'] : "";
        $SysMenu->is_frame = array_key_exists('isFrame', $data) ? $data['isFrame'] : "";
        $SysMenu->path = array_key_exists('path', $data) ? $data['path'] : "";
        $SysMenu->component = array_key_exists('component', $data) ? $data['component'] : "";
        $SysMenu->perms = array_key_exists('perms', $data) ? $data['perms'] : "";
        $SysMenu->remark = array_key_exists('remark', $data) ? $data['remark'] : "";
        $SysMenu->visible = array_key_exists('visible', $data) ? $data['visible'] : "";
        $SysMenu->update_by = (new JwtAuthService())->userInfo()['user_name'];
        $SysMenu->status = array_key_exists('status', $data) ? $data['status'] : 0;
        $SysMenu->save();
        return $SysMenu;    
    }

    /**
     * 删除菜单
     */
    static function deleteOne($id) {
      $idArr = explode(',', $id);
      // SysMenu::whereIn('id', $idArr)->update(['status'=>0]);
      SysMenu::whereIn('menu_id', $idArr)->delete();
    }
}