<?php

namespace App\Http\Controllers\Admin;

use App\ConstParam\ErrorConst;
use App\Http\Controllers\Controller;
use App\Models\App\AppSection;
use App\Models\App\AppSectionCourse;
use App\Services\Admin\SectionService;
use App\Utils\CommonUtil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SectionController extends Controller 
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
      $title = $request->input('title');
      // 子标题
      $subTitle = $request->input('subTitle');
      // 周次
      $week = $request->input('week');
      // bookid
      $bookid = $request->input('bookid');
      // 日期范围
      $beginTime = $request->input('beginTime');
      $endTime = $request->input('endTime');

      // 获取列表数据
      $data = SectionService::getList($pageSize, $title, $subTitle, $week, $bookid, $beginTime, $endTime);

      return gfResponse()->json($data);
    }

    public function getOne(Request $request)
    {
      $id = $request->route('id');
      $data = [];
      if($id) {
        $data = AppSection::find($id);
      }
      return gfResponse()->json($data);
    }

    public function addOne(Request $request) {
        $params = $request->all();
        // 输入校验
        $validator = Validator::make($params, [
          'title' => 'required|max:255',
          'subTitle' => 'required|max:255',
          'bookid' => 'required|integer',
          'week' => 'required|integer',
          'inorder' => 'required|integer',
        ]);

        // 校验失败处理
        if ($validator->fails()) {
          $errors = $validator->errors();
          CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
        }
        $data = SectionService::addOne($params);
        return gfResponse()->json($data, '新增课程成功');
    }

    public function updateOne(Request $request) {
        $params = $request->all();
        // 输入校验
        $validator = Validator::make($params, [
          'id' => 'required|integer',
          'title' => 'max:255',
          'subTitle' => 'max:255',
          'bookid' => 'integer',
          'week' => 'integer',
          'inorder' => 'integer',
        ]);

        // 校验失败处理
        if ($validator->fails()) {
          $errors = $validator->errors();
          CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
        }
        $data = SectionService::updateOne($params);
        return gfResponse()->json($data, '新增课程成功');
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

      SectionService::del($request->route('id'));
      return gfResponse()->json([], '删除课程成功');
    }

    public function getSectionCourse(Request $request)
    {
      $id = $request->route('id');
      $data = [];
      if($id) {
        $data = AppSectionCourse::with('course', 'section')->find($id);
      }
      return gfResponse()->json($data);
    }

    public function addSectionCourse(Request $request)
    {
      $params = $request->all();
        // 输入校验
        $validator = Validator::make($params, [
          'courseId' => 'required|integer',
          'sectionId' => 'required|integer',
          'sort' => 'required|integer',
        ]);
        // 校验失败处理
        if ($validator->fails()) {
          $errors = $validator->errors();
          CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
        }
        $data = SectionService::addSectionCourse($params);
        return gfResponse()->json($data, '新增成功');
    }

    public function updateSectionCourse(Request $request) {
      $params = $request->all();
      // 输入校验
      $validator = Validator::make($params, [
        'id' => 'required|integer',
        'courseId' => 'required|integer',
        'sectionId' => 'required|integer',
        'sort' => 'integer',
      ]);

      // 校验失败处理
      if ($validator->fails()) {
        $errors = $validator->errors();
        CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
      }
      $data = SectionService::updateSectionCourse($params);
      return gfResponse()->json($data, '新增课程成功');
  }

  public function delSectionCourse(Request $request) {
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

    SectionService::delSectionCourse($request->route('id'));
    return gfResponse()->json([], '删除成功');
  }
}