<?php

namespace App\Http\Controllers\System;

use App\Models\System\SysDictData;
use App\Services\System\SysDictService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use App\Utils\CommonUtil;
use App\ConstParam\ErrorConst;
use App\Exports\System\SysDictDataExport;
use App\Exports\System\SysDictTypeExport;
use Excel;

class SysDictController extends Controller
{
    /**
     * 字典列表
     */
    public function listType(Request $request)
    {
      // 页数 默认参数page
      // $page = $request->input('page', 1);
      // 每页数据条数
      $pageSize = $request->input('pageSize', 10);
      // 字典名称
      $dictName = $request->input('dictName');
      // 字典类型
      $dictType = $request->input('dictType');
      // 状态
      $status = $request->input('status');
      // 日期范围 
      $date = null;
      $beginTime = $request->input('beginTime');
      $endTime = $request->input('endTime');
      if($beginTime && $endTime) {
        $date = [
          $beginTime, $endTime
        ];
      }
      // 获取字典数据
      $data = SysDictService::getTypeList($pageSize, $dictName, $date, $dictType, $status);

      return gfResponse()->json($data);
    }

    /**
     * 导出字典列表
     */
    public function exportTypeExcel(Request $request)
    {
      // 页数 默认参数page
      // $page = $request->input('page', 1);
      // 每页数据条数
      $pageSize = $request->input('pageSize', 10);
      // 字典名称
      $dictName = $request->input('dictName');
      // 字典类型
      $dictType = $request->input('dictType');
      // 状态
      $status = $request->input('status');
      // 日期范围 
      $date = null;
      $beginTime = $request->input('beginTime');
      $endTime = $request->input('endTime');
      if($beginTime && $endTime) {
        $date = [
          $beginTime, $endTime
        ];
      }
      // 获取字典数据
      $data = SysDictService::getTypeList($pageSize, $dictName, $date, $dictType, $status);

      $filename = "字典类型列表".date("Ymd",time())."_h".date("His",time()).'.xlsx';
      return Excel::download(new SysDictTypeExport($data['rows']), $filename); // 输出直接流下载
    }

    /**
     * 字典数据列表
     */
    public function listData(Request $request)
    {
      // 页数 默认参数page
      // $page = $request->input('page', 1);
      // 每页数据条数
      $pageSize = $request->input('pageSize', 10);
      // 字典类型
      $dictType = $request->input('dictType');
      // 字典标签
      $dictLabel = $request->input('dictLabel');
      // 状态
      $status = $request->input('status');

      // 获取字典数据
      $data = SysDictService::getDataList($pageSize, $dictLabel, $dictType, $status);

      return gfResponse()->json($data);
    }

    /**
     * 导出字典数据列表
     */
    public function exportDataExcel(Request $request)
    {
      // 页数 默认参数page
      // $page = $request->input('page', 1);
      // 每页数据条数
      $pageSize = $request->input('pageSize', 10);
      // 字典类型
      $dictType = $request->input('dictType');
      // 字典标签
      $dictLabel = $request->input('dictLabel');
      // 状态
      $status = $request->input('status');

      // 获取字典数据
      $data = SysDictService::getDataList($pageSize, $dictLabel, $dictType, $status);
      $filename = "字典数据列表".date("Ymd",time())."_h".date("His",time()).'.xlsx';
      return Excel::download(new SysDictDataExport($data['rows']), $filename); // 输出直接流下载
    }

    /**
     * 字典类型
     */
    public function getType(Request $request)
    {
      $id = $request->route('id');
      $data = [];
      if($id) {
        // 获取字典类型数据
        $data = SysDictService::getType($id);
      }
      return gfResponse()->json($data);
    }

    /**
     * 字典数据
     */
    public function getData(Request $request)
    {
      $id = $request->route('id');
      $data = [];
      if($id) {
        // 获取字典类型数据
        $data = SysDictService::getData($id);
      }
      return gfResponse()->json($data);
    }

    /**
     * 字典数据
     */
    public function getDataByType(Request $request)
    {
      $dictType = $request->route('dictType');
      $data = [];
      if($dictType) {
        // 获取字典类型数据
        $data = SysDictData::where('dict_type', '=', $dictType)->get();
      }
      return gfResponse()->json($data);
    }

    /**
     * 新增字典类型
     */
    public function addType(Request $request) {
      $message = [
        'dictName.required' => '字典名称不能为空',
        'dictType.required' => '字典类型不能为空',
      ];

      // 输入校验
      $validator = Validator::make($request->all(), [
        'dictName' => 'required|max:100',
        'dictType' => 'required|max:100',
        'status' => 'integer',
      ], $message);

      // 校验失败处理
      if ($validator->fails()) {
        $errors = $validator->errors();
        CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
      }

      $data = SysDictService::addType($request->all());

      return gfResponse()->json($data, '新增字典类型成功');
    }


    /**
     * 修改字典类型
     */
    public function updateType(Request $request) {
      $message = [
        'deptName.required' => '字典名称不能为空',
        'dictType.required' => '字典类型不能为空',
      ];

      // 输入校验
      $validator = Validator::make($request->all(), [
        'dictName' => 'required|max:100',
        'dictType' => 'required|max:100',
        'status' => 'integer',
      ], $message);

      // 校验失败处理
      if ($validator->fails()) {
        $errors = $validator->errors();
        CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);;
      }

      $data = SysDictService::updateType($request->all());

      return gfResponse()->json($data, '修改字典类型成功');
    }


    /**
     * 新增字典数据
     */
    public function addData(Request $request) {
      $message = [
        'dictLabel.required' => '数据标签不能为空',
        'dictValue.required' => '数据键值不能为空',
        'dictType.required' => '字典类型不能为空',
        'dictSort.required' => '显示排序不能为空',
      ];

      // 输入校验
      $validator = Validator::make($request->all(), [
        'dictLabel' => 'required|max:100',
        'dictValue' => 'required|max:100',
        'dictType' => 'required|max:100',
        'dictSort' => 'required|integer',
        'status' => 'integer',
      ], $message);

      // 校验失败处理
      if ($validator->fails()) {
        $errors = $validator->errors();
        CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);;
      }

      $data = SysDictService::addData($request->all());

      return gfResponse()->json($data, '新增字典数据成功');
    }

    /**
     * 修改字典数据
     */
    public function updateData(Request $request) {
      $message = [
        'dictCode.required' => '字典码不能为空',
        'dictLabel.required' => '数据标签不能为空',
        'dictValue.required' => '数据键值不能为空',
        'dictType.required' => '字典类型不能为空',
        'dictSort.required' => '显示排序不能为空',
      ];

      // 输入校验
      $validator = Validator::make($request->all(), [
        'dictCode' => 'required|integer',
        'dictLabel' => 'required|max:100',
        'dictValue' => 'required|max:100',
        'dictType' => 'required|max:100',
        'dictSort' => 'required|integer',
        'status' => 'integer',
      ], $message);

      // 校验失败处理
      if ($validator->fails()) {
        $errors = $validator->errors();
        CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);;
      }

      $data = SysDictService::updateData($request->all());

      return gfResponse()->json($data, '修改字典数据成功');
    }

    /**
     * 删除字典类型
     */
    public function deleteType(Request $request){
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

      SysDictService::deleteType($request->route('id'));

      return gfResponse()->json('', '删除字典类型成功');
    }

    /**
     * 删除字典类型
     */
    public function deleteData(Request $request){
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

      SysDictService::deleteData($request->route('id'));

      return gfResponse()->json('', '删除字典数据成功');
    }
}
