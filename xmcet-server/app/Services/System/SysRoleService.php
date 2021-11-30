<?php

namespace App\Services\System;

use App\Models\System\SysRole;
use App\Models\System\SysRoleApi;
use App\Models\System\SysRoleMenu;

class SysRoleService
{
    public static function getList($pageSize, $roleKey, $roleName, $status, $beginTime, $endTime) {
        $searchCondition =  new SysRole();
        // 模糊匹配
        if($roleKey) {
          $searchCondition = $searchCondition->where('role_key', 'like',  $roleKey . '%');
        }
        if($roleName) {
          $searchCondition = $searchCondition->where('role_name', 'like',  $roleName . '%');
        }
        if($status != null){
          $searchCondition = $searchCondition->where('status', '=',  $status);
        }
        if($beginTime && $endTime) {
          $searchCondition = $searchCondition->whereBetween('create_time', [$beginTime, $endTime]);
        }
        $paginator = $searchCondition
        ->paginate($pageSize, '*', 'pageNum');
        return [
            'total' => $paginator->total(),
            'rows' => $paginator->items(),        
        ];
    }

    public static function addOne($data) {
      $insert = [        
          'role_name' => $data['roleName'],
          'role_key'=> $data['roleKey'],
          'role_sort'=> $data['roleSort'],
          'status'=> array_key_exists('status', $data) ? $data['status'] : 0,
          'remark'=> array_key_exists('remark', $data) ? $data['remark'] : "",
        ];
        $SysRole = SysRole::create($insert);
        if(array_key_exists('menuIds', $data) && count($data['menuIds']) > 0) {
          // 创建role_menu关联
          $insertRoleMenu = [];
          foreach ($data['menuIds'] as $key => $value) {
            $insertRoleMenu[] = [
              'role_id' => $SysRole->role_id,
              'menu_id' => $value
            ];
          }
          SysRoleMenu::insert($insertRoleMenu);
        }
        if(array_key_exists('apiIds', $data) && count($data['apiIds']) > 0) {
          // 创建role_api关联
          $insertRoleApi = [];
          foreach ($data['apiIds'] as $key => $value) {
            $insertRoleApi[] = [
              'role_id' => $SysRole->role_id,
              'api_id' => $value
            ];
          }
          SysRoleApi::insert($insertRoleApi);
        }
        return $SysRole;
    }

    static function updateData($data) {
        $SysRole = SysRole::find($data['roleId']);
        $SysRole->role_name = $data['roleName'];
        $SysRole->role_key = $data['roleKey'];
        $SysRole->role_sort = $data['roleSort'];
        $SysRole->status = array_key_exists('status', $data) ? $data['status'] : $SysRole->status ;
        $SysRole->remark = array_key_exists('remark', $data) ? $data['remark'] : $SysRole->remark ;
        $SysRole->save();
        // 将该角色关联的role_menu记录删除
        SysRoleMenu::where('role_id', '=', $SysRole->role_id)->delete();
        // 修改role_menu关联
        if(array_key_exists('menuIds', $data) && count($data['menuIds']) > 0) {
          $insertRoleMenu = [];
          foreach ($data['menuIds'] as $key => $value) {
            $insertRoleMenu[] = [
              'role_id' => $SysRole->role_id,
              'menu_id' => $value
            ];
          }
          SysRoleMenu::insert($insertRoleMenu);
        }
        // 将该角色关联的role_api记录删除
        SysRoleApi::where('role_id', '=', $SysRole->role_id)->delete();
        // 修改role_api关联
        if(array_key_exists('apiIds', $data) && count($data['apiIds']) > 0) {
          $insertRoleApi = [];
          foreach ($data['apiIds'] as $key => $value) {
            $insertRoleApi[] = [
              'role_id' => $SysRole->role_id,
              'api_id' => $value
            ];
          }
          SysRoleApi::insert($insertRoleApi);
        }
        return $SysRole;
    }

    static function deleteData($id) {
      $idArr = explode(',', $id);
      SysRole::whereIn('role_id', $idArr)->delete();
      // 删除role_menu对应的数据
      SysRoleMenu::whereIn('role_id', $idArr)->delete();
      // 删除role_api对应的数据
      SysRoleApi::whereIn('role_id', $idArr)->delete();
    }
}