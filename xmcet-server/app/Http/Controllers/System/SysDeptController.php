<?php

namespace App\Http\Controllers\System;

use App\Models\System\SysDept;
use App\Services\System\SysDeptService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use App\Utils\CommonUtil;
use App\ConstParam\ErrorConst;

class SysDeptController extends Controller
{

    // 获取部门信息
    public function getOne(Request $request)
    {
      $id = $request->route('id');
      $data = [];
      if($id) {
        // 获取字典类型数据
        $data = SysDept::find($id);
      }
      return gfResponse()->json($data);
    }

    public function newOne(Request $request)
    {
      $message = [
        'deptName.required' => '部门名称不能为空',
        'parentId.required' => '上级本部门parentId不能为空',
        'orderNum.required' => '显示排序不能为空',
      ];

      // 输入校验
      $validator = Validator::make($request->all(), [
        'deptName' => 'required|max:255',
        'parentId' => 'required|max:255',
        'orderNum' => 'required|integer',
        'status' => 'integer',
        'phone' => 'max:11',
        'leader' => 'max:20',
        'email' => 'max:50',
      ], $message);

      // 校验失败处理
      if ($validator->fails()) {
        $errors = $validator->errors();
        CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
      }

      $data = SysDeptService::newOne($request->all());

      return gfResponse()->json($data, '新增部门成功');
    }

    public function modifyOne(Request $request)
    {
      $message = [
        'deptName.required' => '部门名称不能为空',
        'parentId.required' => '上级本部门parentId不能为空',
        'orderNum.required' => '显示排序不能为空',
      ];

      // 输入校验
      $validator = Validator::make($request->all(), [
        'deptName' => 'required|max:255',
        'parentId' => 'required|max:255',
        'orderNum' => 'required|integer',
        'status' => 'integer',
        'phone' => 'max:11',
        'leader' => 'max:20',
        'email' => 'max:50',
      ], $message);

      // 校验失败处理
      if ($validator->fails()) {
        $errors = $validator->errors();
        CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);;
      }
      $data = SysDeptService::modifyOne($request->all());
      return gfResponse()->json($data, '修改部门成功');
    }

    /**
     * 删除
     */
    public function deleteOne(Request $request){
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
        CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);;
      }
      SysDeptService::deleteOne($request->route('id'));
      return gfResponse()->json('', '删除部门成功');
    }

    // 获取嵌套分类列表
    public function tree() {
        // 查询所有分类数据
        $allDepts = SysDept::where([
            'status' => 0,
        ])->get();
        $data = self::sortEndless($allDepts);
        return gfResponse()->json($data);
    }

    // 获取嵌套分类列表 完整
    public function tree2(Request $request) {
      // 名称模糊匹配 title
      $deptName = $request->input('deptName');
      $status = $request->input('status');
      $searchCondition = new SysDept();
      if($status != null){
        $searchCondition = $searchCondition->where('status', '=', $status);
      }
      // 标题模糊匹配
      if($deptName) {
        $searchCondition = $searchCondition->where('dept_name', 'like',  $deptName . '%');
      }
      // 查询所有分类数据
      $allData = $searchCondition->get();
      $data = self::sortEndless2($allData);
      return gfResponse()->json($data);
    }

    public function listTreeDeptExcludeChild(Request $request) {
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
        return response()->json(['msg' => 'error','code' => 500, 'data' => $errors]);
      }

      // 查询所有分类数据
      $allData = SysDept::where('dept_id', '<>', $request->route('id'))->get();
      $data = self::sortEndless2($allData);
      return gfResponse()->json($data);
    }

    // 无限极分类排序 label value
    private static function sortEndless($array, $pid = 0)
    {
      if(count($array) == 1) {
        return [
          'label' => $array[0]['dept_name'],
          'id' => $array[0]['dept_id'],
        ];
      }
      $dept = [];
      foreach ($array as $val)
      {
        if ($pid == $val['parent_id'])
        {
          $newItem = [
            'label' => $val['dept_name'],
            'id' => $val['dept_id'],
          ];
          $children = self::sortEndless($array, $val['dept_id']);
          if(count($children)){
            $newItem['children'] = $children;
          }
          $dept[] = $newItem;
        }
      }
      return $dept;
    }

    // 无限极分类排序 label value版
    private static function sortEndless2($array, $pid = 0)
    {
      if(count($array) == 1) {
        return $array;
      }
      $dept = [];
      foreach ($array as $val)
      {
        if ($pid == $val['parent_id'])
        {
          $newItem = $val;
          $children = self::sortEndless2($array, $val['dept_id']);
          if(count($children)){
            $newItem['children'] = $children;
          }
          $dept[] = $newItem;
        }
      }
      return $dept;
    }
}
