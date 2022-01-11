<?php

namespace App\Http\Controllers\App;

use App\ConstParam\ErrorConst;
use App\Http\Controllers\Controller;
use App\Models\App\AppCourse;
use App\Utils\CommonUtil;
use Illuminate\Http\Request;

class AppCourseController extends Controller 
{
  // 课程内容
  public function getDetail(Request $request) {
    $courseId = $request->input('courseId');
    if(!$courseId) {
      CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, ErrorConst::PARAM_ERROR_CODE_MSG);
    }
    $data = AppCourse::where('id', $courseId)->first();
    return gfResponse()->json($data);
  }

  // 课程记录
  public function getCourseRecord(Request $request) {
    $courseId = $request->input('courseId');
    if(!$courseId) {
      CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, ErrorConst::PARAM_ERROR_CODE_MSG);
    }
    $data = AppCourse::where('id', $courseId)->first();
    return gfResponse()->json($data);
  }
}