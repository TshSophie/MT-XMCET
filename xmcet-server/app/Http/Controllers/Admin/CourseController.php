<?php

namespace App\Http\Controllers\Admin;

use App\ConstParam\ErrorConst;
use App\Http\Controllers\Controller;
use App\Models\App\AppCourse;
use App\Services\Admin\CourseService;
use App\Utils\CommonUtil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CourseController extends Controller 
{
    /**
     * 列表
     */
    public function list(Request $request) {
        // 页数 默认参数page
      // $page = $request->input('page', 1);
      // 每页数据条数
      $pageSize = $request->input('pageSize', 10);
      // 名称模糊匹配
      $name = $request->input('name');
      // 状态
      $status = $request->input('status');
      // 日期范围
      $beginTime = $request->input('beginTime');
      $endTime = $request->input('endTime');

      // 获取列表数据
      $data = CourseService::getList($pageSize, $name, $status, $beginTime, $endTime);

      return gfResponse()->json($data);
    }

    public function getCoursesByBookId(Request $request) {
      $bookid = $request->input('bookid');
      if($bookid) {
        $data = AppCourse::where('book_type', $bookid)->get();
      } else {
        $data = AppCourse::get();
      }
      return gfResponse()->json($data);
    }

    public function getOne(Request $request)
    {
      $id = $request->route('id');
      $data = [];
      if($id) {
        $data = AppCourse::find($id);
      }
      return gfResponse()->json($data);
    }

    public function addOne(Request $request) {
        $params = $request->all();
        // 输入校验
        $validator = Validator::make($params, [
          'name' => 'required|max:100',
          'content' => 'required',
          'type' => 'required|integer',
          'bookType' => 'required|integer',
          'audio' => 'max:100'
        ]);

        // 校验失败处理
        if ($validator->fails()) {
          $errors = $validator->errors();
          CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
        }
        // 判断是否为听力
        if($request->input('type') == 2) {
          // 处理文件上传
          $fileField = 'file';
          $file = $request->file($fileField);
          if ($request->hasFile($fileField) && $file->isValid()) {
            $filename = '/storage/' . $file->store('audio', 'public');
            $params['audio'] = $filename;
          } else {
            // 未上传过音频
            if(!$params['audio']) {
              CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, '未上传音频资源');
            }
          }
        }
        $data = CourseService::addOne($params);
        return gfResponse()->json($data, '新增课程成功');
    }

    public function updateOne(Request $request) {
        $params = $request->all();
        // 输入校验
        $validator = Validator::make($params, [
          'id' => 'required|integer',
          'name' => 'max:100',
          'content' => 'required',
          'type' => 'integer',
          'audio' => 'max:100'
        ]);

        // 校验失败处理
        if ($validator->fails()) {
          $errors = $validator->errors();
          CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
        }
        // 判断是否为听力
        if($request->input('type') == 2) {
          // 处理文件上传
          $fileField = 'file';
          $file = $request->file($fileField);
          if ($request->hasFile($fileField) && $file->isValid()) {
            $filename = '/storage/' . $file->store('audio', 'public');
            $params['audio'] = $filename;
          } else {
            // 未上传过音频
            if(!$params['audio']) {
              CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, '未上传音频资源');
            }
          }
        }
        $data = CourseService::updateOne($params);
        return gfResponse()->json($data, '修改课程成功');
    }

    public function del(Request $request) {
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

      CourseService::del($request->route('id'));
      return gfResponse()->json([], '删除课程成功');
    }
}
