<?php

namespace App\Http\Controllers\App;

use App\ConstParam\ErrorConst;
use App\Http\Controllers\Controller;
use App\Models\App\AppArticle;
use App\Services\App\AppArticleService;
use App\Utils\CommonUtil;
use Illuminate\Http\Request;

class AppArticleControlller extends Controller 
{
  public function getDetail(Request $request) {
    $id = $request->input('id');
    if(!$id) {
      CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, ErrorConst::PARAM_ERROR_CODE_MSG);
    }
    $data = AppArticleService::getDetail($id);
    return gfResponse()->json($data);
  }

  public function getListForIndexPage() {
    $data = AppArticle::where('status', 1)->orderBy('create_time', 'desc')
    ->limit(3)
    ->get();
    return gfResponse()->json($data);
  }

}