<?php

use App\Http\Controllers\System\SysApiController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\System\SysUserController;
use App\Http\Controllers\System\SysDeptController;
use App\Http\Controllers\System\SysDictController;
use App\Http\Controllers\System\SysLoginlogController;
use App\Http\Controllers\System\SysPostController;
use App\Http\Controllers\System\SysMenuController;
use App\Http\Controllers\System\SysRoleController;
use App\Http\Controllers\System\SysUserOnlineController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::name('system.')->group(function (){
    
    /********************** 系统用户**************************************************************** */

    // 系统用户列表
    Route::get('sysuser/list', [SysUserController::class, 'list']);

    // 导出用户列表excel
    Route::get('sysuser/exportExcel', [SysUserController::class, 'exportExcel']);
    // 导出用户列表excel
    Route::post('sysuser/importExcel', [SysUserController::class, 'importExcel']);
    
    // 系统用户信息
    Route::get('sysuser/getInfo', [SysUserController::class, 'getInfo']);

    // 系统用户
    Route::get('sysuser/{id}', [SysUserController::class, 'getUser'])->where(['id' => '[0-9]+|undefined']);

    // 删除系统用户
    Route::delete('sysuser/{id}', [SysUserController::class, 'deleteUser']);

    // 新增用户
    Route::post('sysuser', [SysUserController::class, 'addUser']);

    // 修改用户
    Route::put('sysuser', [SysUserController::class, 'updateUser']);
    
    // 重置用户密码
    Route::put('sysuser/resetPwd', [SysUserController::class, 'resetPwd']);

    // 系统用户个人资料
    Route::get('sysuser/profile', [SysUserController::class, 'getUserProfile']);
    
    // 修改系统用户个人资料
    Route::put('sysuser/profile', [SysUserController::class, 'updateUserProfile']);

    // 修改当前用户密码
    Route::put('sysuser/profile/password', [SysUserController::class, 'updateUserPwd']);

    // 修改当前用户头像
    Route::post('sysuser/profile/avatar', [SysUserController::class, 'uploadAvatar']);

    // 导出用户列表excel
    Route::get('sysuser/exportExcel', [SysUserController::class, 'exportExcel']);

    /********************** 系统部门**************************************************************** */

    // 系统部门树形列表
    Route::get('sysdept/tree', [SysDeptController::class, 'tree']);

    // 系统部门树形列表
    Route::get('sysdept/tree2', [SysDeptController::class, 'tree2']);

    // 系统部门树形列表
    Route::get('sysdept/tree/exclude/{id}', [SysDeptController::class, 'listTreeDeptExcludeChild'])
    ->where(['id' => '[0-9]+']);

    // 系统部门信息
    Route::get('sysdept/{id}', [SysDeptController::class, 'getOne'])

    ->where(['id' => '[0-9]+']);

    // 新增系统部门
    Route::post('sysdept', [SysDeptController::class, 'newOne']);

    // 修改系统部门信息
    Route::put('sysdept', [SysDeptController::class, 'modifyOne']);

    // 删除系统部门
    Route::delete('sysdept/{id}', [SysDeptController::class, 'deleteOne'])
    ->where(['id' => '[0-9]+']);

    /********************** 系统字典**************************************************************** */

    // 系统字典类型列表
    Route::get('sysdict/listType', [SysDictController::class, 'listType']);

    // 系统字典数据列表
    Route::get('sysdict/listData', [SysDictController::class, 'listData']);

    // 导出字典类型列表excel
    Route::get('sysdict/type/exportExcel', [SysDictController::class, 'exportTypeExcel']);
    Route::get('sysdict/data/exportExcel', [SysDictController::class, 'exportDataExcel']);

    // 根据字典类型查询字典数据信息
    Route::get('sysdict/data/type/{dictType}', [SysDictController::class, 'getDataByType']);

    // 系统字典类型
    Route::get('sysdict/type/{id}', [SysDictController::class, 'getType'])

    ->where(['id' => '[0-9]+']);

    // 系统字典数据
    Route::get('sysdict/data/{id}', [SysDictController::class, 'getData'])
    ->where(['id' => '[0-9]+']);

    // 系统字典类型添加
    Route::post('sysdict/type', [SysDictController::class, 'addType']);

    // 系统字典数据添加
    Route::post('sysdict/data', [SysDictController::class, 'addData']);

    // 系统字典类型修改
    Route::put('sysdict/type', [SysDictController::class, 'updateType']);

    // 系统字典数据修改
    Route::put('sysdict/data', [SysDictController::class, 'updateData']);

    // 系统字典类型删除
    Route::delete('sysdict/type/{id}', [SysDictController::class, 'deleteType']);

    // 系统字典数据删除
    Route::delete('sysdict/data/{id}', [SysDictController::class, 'deleteData']);

    /********************** 系统岗位**************************************************************** */

    // 系统岗位列表
    Route::get('syspost/list', [SysPostController::class, 'list']);

    // 系统岗位excel导出
    Route::get('syspost/exportExcel', [SysPostController::class, 'exportExcel']);

    // 系统岗位查询
    Route::get('syspost/{id}', [SysPostController::class, 'getOne'])
    ->where(['id' => '[0-9]+']);

    // 系统岗位删除
    Route::delete('syspost/{id}', [SysPostController::class, 'deletePost']);

    // 系统岗位添加
    Route::post('syspost', [SysPostController::class, 'addOne']);

    // 系统岗位修改
    Route::put('syspost', [SysPostController::class, 'updateOne']);

    /********************** 系统菜单**************************************************************** */

    // 菜单列表
    Route::get('sysmenu/list', [SysMenuController::class, 'list']);

    // 菜单路由列表
    Route::get('getRouters', [SysMenuController::class, 'getRouters']);

    // 菜单树形列表
    Route::get('sysmenu/tree', [SysMenuController::class, 'tree']);

    // 菜单树形列表(value,label)
    Route::get('sysmenu/mapTree', [SysMenuController::class, 'mapTree']);

    // 根据角色id获取菜单树形列表(value,label)
    Route::get('sysmenu/mapTreeByRole/{roleId}', [SysMenuController::class, 'mapTreeByRole'])
    ->where(['roleId' => '[0-9]+']);

    // 获取菜单详情
    Route::get('sysmenu/{id}', [SysMenuController::class, 'getOne'])
    ->where(['id' => '[0-9]+']);

    // 新增
    Route::post('sysmenu', [SysMenuController::class, 'newOne']);

    // 修改
    Route::put('sysmenu', [SysMenuController::class, 'modifyOne']);

    // 删除
    Route::delete('sysmenu/{id}', [SysMenuController::class, 'deleteOne']);

    // 导出栏目列表excel
    Route::get('sysmenu/exportExcel', [SysMenuController::class, 'exportExcel']);

    /********************** 系统Api**************************************************************** */

    // Api列表
    Route::get('sysapi/list', [SysApiController::class, 'list']);

    // Api树形列表
    Route::get('sysapi/tree', [SysApiController::class, 'tree']);

    // Api树形列表(value,label)
    Route::get('sysapi/mapTree', [SysApiController::class, 'mapTree']);

    // 根据角色id获取Api树形列表(value,label)
    Route::get('sysapi/mapTreeByRole/{roleId}', [SysApiController::class, 'mapTreeByRole'])
    ->where(['roleId' => '[0-9]+']);

    // 获取Api详情
    Route::get('sysapi/{id}', [SysApiController::class, 'getOne'])
    ->where(['id' => '[0-9]+']);

    // 新增
    Route::post('sysapi', [SysApiController::class, 'newOne']);

    // 修改
    Route::put('sysapi', [SysApiController::class, 'modifyOne']);

    // 删除
    Route::delete('sysapi/{id}', [SysApiController::class, 'deleteOne']);

    // 导出Api列表excel
    Route::get('sysapi/exportExcel', [SysApiController::class, 'exportExcel']);
    
    /********************** 系统角色**************************************************************** */

    // 系统角色列表
    Route::get('sysrole/list', [SysRoleController::class, 'list']);

    // 系统角色excel导出
    Route::get('sysrole/exportExcel', [SysRoleController::class, 'exportExcel']);

    // 系统角色查询
    Route::get('sysrole/{id}', [SysRoleController::class, 'getOne'])
    ->where(['id' => '[0-9]+']);

    // 系统角色删除
    Route::delete('sysrole/{id}', [SysRoleController::class, 'deleteRole']);

    // 系统角色添加
    Route::post('sysrole', [SysRoleController::class, 'addOne']);

    // 系统角色修改
    Route::put('sysrole', [SysRoleController::class, 'updateOne']);

    /********************** 登录日志**************************************************************** */

    // 系统角色列表
    Route::get('sysLoginlog/list', [SysLoginlogController::class, 'list']);

    // 系统角色excel导出
    Route::get('sysLoginlog/exportExcel', [SysLoginlogController::class, 'exportExcel']);

    /********************** 在线用户**************************************************************** */
    // 列表
    Route::get('sysOnline/list', [SysUserOnlineController::class, 'list']);
    // 强退
    Route::delete('sysOnline/{sessionId}', [SysUserOnlineController::class, 'forceLogout']);
});
