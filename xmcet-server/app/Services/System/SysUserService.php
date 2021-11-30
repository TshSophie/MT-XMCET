<?php

namespace App\Services\System;

use App\ConstParam\ErrorConst;
use App\Models\System\SysDept;
use App\Models\System\SysMenu;
use App\Models\System\SysPost;
use App\Models\System\SysRole;
use App\Models\System\SysRoleMenu;
use App\Models\System\SysUser;
use App\Models\System\SysUserPost;
use App\Models\System\SysUserRole;
use App\Utils\CommonUtil;
use Illuminate\Support\Facades\Storage;

class SysUserService
{
    static function getList($pageSize,$userName, $status, $deptId, $phonenumber, $beginTime, $endTime) {
        $searchCondition = SysUser::with(["dept"])                        
                          ->orderBy('id', 'asc');
        // 名称模糊匹配
        if($userName) {
            $searchCondition = $searchCondition->where('user_name', 'like', $userName . '%');
        }
        // 状态匹配
        if($status != null){
            $searchCondition = $searchCondition->where('status','=', $status);
        }
        // $phonenumber匹配
        if($phonenumber) {
            $searchCondition = $searchCondition->where('phonenumber', 'like', $phonenumber . '%');
        }
        // 日期范围查询
        if($beginTime && $endTime) {
            $searchCondition = $searchCondition->whereBetween('create_time', [$beginTime, $endTime]);
        }
        // 状态匹配
        if($deptId) {
            // 查询部门表，将该部门下所有子部门id查找出来
            $depts = SysDept::get();
            $targets = [];
            foreach ($depts as $key => $value) {
                $ancestors = explode(',', $value['ancestors']);
                if($value['dept_id'] == $deptId || in_array($deptId, $ancestors)) {
                    $targets[] = $value;
                }
            }
            $targetIds = array_column($targets, 'dept_id');
            $searchCondition = $searchCondition->whereIn('dept_id', $targetIds);
        }
        $paginator = $searchCondition
        ->paginate($pageSize, '*', 'pageNum');
        return [
            'total' => $paginator->total(),
            'rows' => $paginator->items(),        
        ]; 
    }

    static function getUser($id) {
        // 查询部门列表
        $posts = SysPost::get();
        // 查询角色列表
        $roles = SysRole::get();        
        if($id && $id != 'undefined') {
            $user = SysUser::find($id);
            $user->avatar = '/storage/' . $user->avatar;
            // 查询该用户对应的角色、职位
            $roleIds = array_column(SysUserRole::where('user_id', '=', $id)->get()->toArray(), 'role_id');
            $postIds = array_column(SysUserPost::where('user_id', '=', $id)->get()->toArray(), 'post_id');
            return compact('user', 'posts', 'roles', 'roleIds', 'postIds');
        }

        return compact('posts', 'roles');
    }

    static function getUserProfile() {
        $id = app('jwtAuth')->userInfo()['id'];
        $user = SysUser::with('dept')->find($id);
        // 查询该用户对应的角色、职位
        $roleIds = array_column(SysUserRole::where('user_id', '=', $id)->get()->toArray(), 'role_id');
        $roleGroup = array_column(SysRole::whereIn('role_id', $roleIds)->get()->toArray(), 'role_name');
        $postIds = array_column(SysUserPost::where('user_id', '=', $id)->get()->toArray(), 'post_id');
        $postGroup = array_column(SysPost::whereIn('post_id', $postIds)->get()->toArray(), 'post_name');
        $user->roleGroup = $roleGroup;
        $user->postGroup = $postGroup;
        $user->avatar = '/storage/' . $user->avatar;
        return $user;
    }

    static function updateUserPwd($oldPassword, $newPassword) {
        $id = app('jwtAuth')->userInfo()['id'];
        $user = SysUser::find($id);
        // 检查旧密码是否输入正确
        if(\Hash::check($oldPassword, $user->password)) {
            // 设置新密码
            $user->password = bcrypt($newPassword);
            $user->save();
        } else {
            CommonUtil::throwException(ErrorConst::OLD_PASSWORD_ERR_CODE, ErrorConst::OLD_PASSWORD_ERR_CODE_MSG);
        }
    }

    static function updateAvatar($path) {
        $id = app('jwtAuth')->userInfo()['id'];
        $user = SysUser::find($id);
        // 设置新头像
        $user->avatar = $path;
        $user->save();
    }

    static function getInfo() {
        $userInfo = app('jwtAuth')->userInfo();
        $user = SysUser::with('dept')->where('id', '=', $userInfo['id'])->first();
        $user->avatar = '/storage/' . $user->avatar;
        // 查询该用户对应的角色
        $roleData = SysUserRole::with('role')->where('user_id', '=' , $user->id)->get()->toArray();
        $roleIds = array_column($roleData, 'role_id');
        $user->roles = array_column($roleData, 'role');
        $roles = array_column($user->roles, 'role_key');
        // 查询该用户对应的菜单权限
        $menuIds = array_column(SysRoleMenu::whereIn('role_id', $roleIds)->get()->toArray(), 'menu_id');
        $permissions = array_column(SysMenu::whereIn('menu_id', $menuIds)->get()->toArray(), 'perms');
        return compact('user', 'roles', 'permissions');
    }

    /**
     * 新增系统用户
     */
    static function addUser($data) {
        $insert = [
          'nick_name' => $data['nickName'],
          'user_name'=> $data['userName'],
          'phonenumber'=> $data['phonenumber'],
          'dept_id'=> $data['deptId'],
          'email'=> $data['email'],
          'password'=> bcrypt($data['password']),
          'sex'=> array_key_exists('sex', $data) ? $data['sex'] : "",
          'post_or_title'=> array_key_exists('postOrTitle', $data) ? $data['postOrTitle'] : "",
          'attributes'=> array_key_exists('attributes', $data) ? $data['attributes'] : "",
          'status'=> array_key_exists('status', $data) ? $data['status'] : "0",
        ];
        $SysUser = SysUser::create($insert);
        // 插入岗位、角色关系
        if(array_key_exists('postIds', $data)) {
            $insertUserPost = [];
            foreach ($data['postIds'] as $key => $value) {
                $insertUserPost[] = [
                    'user_id' => $SysUser->id,
                    'post_id' => $value
                ];
            }
            SysUserPost::insert($insertUserPost);
        }
        if(array_key_exists('roleIds', $data)) {
            $insertUserRole = [];
            foreach ($data['roleIds'] as $key => $value) {
                $insertUserRole[] = [
                    'user_id' => $SysUser->id,
                    'role_id' => $value
                ];
            }
            SysUserRole::insert($insertUserRole);
        }
        return $SysUser;
    }

    /**
     * 修改系统用户
     */
    static function updateUser($data) {
        $SysUser = SysUser::find($data['id']);
        array_key_exists('nickName', $data) ? $SysUser->nick_name = $data['nickName'] : "";
        array_key_exists('userName', $data) ? $SysUser->user_name = $data['userName'] : "";
        array_key_exists('phonenumber', $data) ? $SysUser->phonenumber = $data['phonenumber'] : "";
        array_key_exists('deptId', $data) ? $SysUser->dept_id = $data['deptId'] : "";
        array_key_exists('email', $data) ? $SysUser->email = $data['email'] : "";
        array_key_exists('attributes', $data) ? $SysUser->attributes = $data['attributes'] : "";
        array_key_exists('status', $data) ? $SysUser->status = $data['status'] : "";
        array_key_exists('postOrTitle', $data) ? $SysUser->post_or_title = $data['postOrTitle'] : "";
        array_key_exists('sex', $data) ? $SysUser->sex = $data['sex'] : "";
        $SysUser->save();
        // 更新岗位、角色关系
        if(array_key_exists('postIds', $data)) {
            // 删除原来的关系
            SysUserPost::where('user_id', '=', $SysUser->id)->delete();
            $insertUserPost = [];
            foreach ($data['postIds'] as $key => $value) {
                $insertUserPost[] = [
                    'user_id' => $SysUser->id,
                    'post_id' => $value
                ];
            }
            SysUserPost::insert($insertUserPost);
        }
        if(array_key_exists('roleIds', $data)) {
            // 删除原来的关系
            SysUserRole::where('user_id', '=', $SysUser->id)->delete();
            $insertUserRole = [];
            foreach ($data['roleIds'] as $key => $value) {
                $insertUserRole[] = [
                    'user_id' => $SysUser->id,
                    'role_id' => $value
                ];
            }
            SysUserRole::insert($insertUserRole);
        }
        return $SysUser;    
    }
    /**
     * 修改当前用户资料
     */
    static function updateUserProfile($data) {
        $userInfo = app('jwtAuth')->userInfo();
        $SysUser = SysUser::where('id', '=', $userInfo['id'])->first();
        array_key_exists('nickName', $data) ? $SysUser->nick_name = $data['nickName'] : "";
        array_key_exists('phonenumber', $data) ? $SysUser->phonenumber = $data['phonenumber'] : "";
        array_key_exists('email', $data) ? $SysUser->email = $data['email'] : "";
        array_key_exists('sex', $data) ? $SysUser->sex = $data['sex'] : "";
        $SysUser->save();
        return $SysUser;
    }

    /**
     * 重置密码
     */
    static function resetPwd($data) {
        $SysUser = SysUser::find($data['id']);
        $SysUser->password = bcrypt($data['password']);
        $SysUser->save();
        return $SysUser;    
    }

    /**
     * 删除系统用户
     */
    static function deleteUser($id) {
      $idArr = explode(',', $id);
      // SysUser::whereIn('id', $idArr)->update(['status'=>0]);
      SysUser::whereIn('id', $idArr)->delete();
      // 删除关联关系
      SysUserPost::whereIn('user_id', $idArr)->delete();
      SysUserRole::whereIn('user_id', $idArr)->delete();
    }
}