<?php

namespace App\Http\Controllers\System;

use App\Exports\System\SysPostExport;
use App\Http\Controllers\Controller;
use App\Models\System\SysPost;
use App\Services\System\SysPostService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Excel;
use App\Utils\CommonUtil;
use App\ConstParam\ErrorConst;

class SysPostController extends Controller
{
    public function list(Request $request){
      // 页数 默认参数page
      // $page = $request->input('page', 1);
      // 每页数据条数
      $pageSize = $request->input('pageSize', 10);
      $postCode = $request->input('postCode');
      $postName = $request->input('postName');
      $status = $request->input('status');

      $data = SysPostService::getList($pageSize, $postCode, $postName, $status);
      return gfResponse()->json($data);
    }

    public function exportExcel(Request $request){
        // 页数 默认参数page
      // $page = $request->input('page', 1);
      // 每页数据条数
      $pageSize = $request->input('pageSize', 10);
      $postCode = $request->input('postCode');
      $postName = $request->input('postName');
      $status = $request->input('status');

      $data = SysPostService::getList($pageSize, $postCode, $postName, $status);
      $filename = "岗位列表".date("Ymd",time())."_h".date("His",time()).'.xlsx';

      return Excel::download(new SysPostExport($data['rows']), $filename); // 输出直接流下载
    }

    public function getOne(Request $request)
    {
      $id = $request->route('id');
      $data = [];
      if($id) {
        $data = SysPost::find($id);
      }
      return gfResponse()->json($data);
    }

    public function addOne(Request $request) {
        $message = [
          'postName.required' => '岗位名称不能为空',
          'postCode.required' => '岗位编码不能为空',
          'postSort.required' => '岗位编码不能为空',
        ];

        // 输入校验
        $validator = Validator::make($request->all(), [
          'postName' => 'required|max:100',
          'postCode' => 'required|max:100',
          'postSort' => 'integer',
          'status' => 'integer',
        ], $message);

        // 校验失败处理
        if ($validator->fails()) {
          $errors = $validator->errors();
          CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
        }

        $data = SysPostService::addOne($request->all());
        return gfResponse()->json($data, '新增岗位成功');
    }

    public function updateOne(Request $request) {
        $message = [
            'postId.required' => '岗位id不能为空',
            'postName.required' => '岗位名称不能为空',
            'postCode.required' => '岗位编码不能为空',
            'postSort.required' => '岗位编码不能为空',
          ];

          // 输入校验
          $validator = Validator::make($request->all(), [
            'postId' => 'required|max:100',
            'postName' => 'required|max:100',
            'postCode' => 'required|max:100',
            'postSort' => 'integer',
            'status' => 'integer',
          ], $message);

        // 校验失败处理
        if ($validator->fails()) {
          $errors = $validator->errors();
          CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
        }

        $data = SysPostService::updateData($request->all());
        return gfResponse()->json($data, '修改岗位成功');
    }

    public function deletePost(Request $request){
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

        SysPostService::deleteData($request->route('id'));
        return gfResponse()->json('', '删除成功');
    }
}
