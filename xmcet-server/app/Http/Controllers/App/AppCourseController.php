<?php

namespace App\Http\Controllers\App;

use App\ConstParam\ErrorConst;
use App\Http\Controllers\Controller;
use App\Models\App\AppCourse;
use App\Services\App\AppCourseService;
use App\Utils\CommonUtil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AppCourseController extends Controller 
{
  // 课程内容
  public function getDetail(Request $request) {
    $courseId = $request->input('courseId');
    if(!$courseId) {
      CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, ErrorConst::PARAM_ERROR_CODE_MSG);
    }
    $data = AppCourseService::getDetail($courseId);
    return gfResponse()->json($data);
  }

  public function postAnswer(Request $request)
  {
    $params = $request->all();
    // 输入校验
    $validator = Validator::make($params, [
      'courseId' => 'required|integer',
      'bookId' => 'required|integer',
      'sectionId' => 'required|integer',
      'answers' => 'required|array',
    ]);
    // 校验失败处理
    if ($validator->fails()) {
      $errors = $validator->errors();
      CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
    }
    $data = AppCourseService::saveAnswer($params);
    return gfResponse()->json($data);
  }
}