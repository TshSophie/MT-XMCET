<?php

namespace App\Http\Controllers\System;

use App\Exports\System\SysRoleExport;
use App\Http\Controllers\Controller;
use App\Models\System\SysRole;
use App\Services\System\SysRoleService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Excel;
use App\Utils\CommonUtil;
use App\ConstParam\ErrorConst;
class SysRoleController extends Controller
{
    public function list(Request $request){
        // 页数 默认参数page
        // $page = $request->input('page', 1);
        // 每页数据条数
        $pageSize = $request->input('pageSize', 10);
        $roleKey = $request->input('roleKey');
        $roleName = $request->input('roleName');
        $status = $request->input('status');
        $beginTime = $request->input('beginTime');
        $endTime = $request->input('endTime');

        $data = SysRoleService::getList($pageSize, $roleKey, $roleName, $status, $beginTime, $endTime);
        return gfResponse()->json($data);
      }

      public function exportExcel(Request $request){
          // 页数 默认参数page
        // $page = $request->input('page', 1);
        // 每页数据条数
        $pageSize = $request->input('pageSize', 10);
        $roleKey = $request->input('roleKey');
        $roleName = $request->input('roleName');
        $status = $request->input('status');
        $beginTime = $request->input('beginTime');
        $endTime = $request->input('endTime');

        $data = SysRoleService::getList($pageSize, $roleKey, $roleName, $status, $beginTime, $endTime);
        $filename = "角色列表".date("Ymd",time())."_h".date("His",time()).'.xlsx';

        return Excel::download(new SysRoleExport($data['rows']), $filename); // 输出直接流下载
      }

      public function getOne(Request $request)
      {
        $id = $request->route('id');
        $data = [];
        if($id) {
          $data = SysRole::find($id);
        }
        return gfResponse()->json($data);
      }

      public function addOne(Request $request) {
          $message = [
            'roleName.required' => '角色名称不能为空',
            'roleKey.required' => '权限字符不能为空',
            'roleSort.required' => '角色编码不能为空',
          ];

          // 输入校验
          $validator = Validator::make($request->all(), [
            'roleName' => 'required|max:100',
            'roleKey' => 'required|max:30',
            'roleSort' => 'integer',
            'status' => 'integer',
          ], $message);

          // 校验失败处理
          if ($validator->fails()) {
            $errors = $validator->errors();
            CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
          }

          $data = SysRoleService::addOne($request->all());
          return gfResponse()->json($data, '新增角色成功');
      }

      public function updateOne(Request $request) {
          $message = [
              'roleId.required' => '角色id不能为空',
              'roleName.required' => '角色名称不能为空',
              'roleKey.required' => '权限字符不能为空',
              'roleSort.required' => '角色编码不能为空',
            ];

            // 输入校验
            $validator = Validator::make($request->all(), [
              'roleId' => 'required|integer',
              'roleName' => 'required|max:100',
              'roleKey' => 'required|max:30',
              'roleSort' => 'integer',
              'status' => 'integer',
            ], $message);

          // 校验失败处理
          if ($validator->fails()) {
            $errors = $validator->errors();
            CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
          }

          $data = SysRoleService::updateData($request->all());
          return gfResponse()->json($data, '修改角色成功');
      }

      public function deleteRole(Request $request){
          $message = [
            'id.required' => 'id不能为空',
          ];
          // 输入校验
          $validator = Validator::make(['id' => $request->route('id')], [
            'id' => 'required',
          ], $message);

          // 校验失败处理
          if ($validator->fails()) {
            $errors = $validator->errors();
            CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
          }

          SysRoleService::deleteData($request->route('id'));
          return gfResponse()->json('', '删除角色成功');
      }
}
