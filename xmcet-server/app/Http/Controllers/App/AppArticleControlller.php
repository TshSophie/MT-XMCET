<?php

namespace App\Http\Controllers\App;

use App\ConstParam\ErrorConst;
use App\Http\Controllers\Controller;
use App\Models\App\AppArticle;
use App\Models\App\AppArticleCategory;
use App\Services\App\AppArticleService;
use App\Utils\CommonUtil;
use Illuminate\Http\Request;

class AppArticleControlller extends Controller 
{
  // 文章详情
  public function getDetail(Request $request) {
    $id = $request->input('id');
    if(!$id) {
      CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, ErrorConst::PARAM_ERROR_CODE_MSG);
    }
    $data = AppArticleService::getDetail($id);
    return gfResponse()->json($data);
  }

  // 首页推荐列表
  public function getListForIndexPage() {
    $data = AppArticle::where('status', 1)->orderBy('create_time', 'desc')
    ->limit(3)
    ->get();
    return gfResponse()->json($data);
  }

  // 文章分类树
  public function getArticleCategory() {
    $data = AppArticleCategory::get(['id', 'pid', 'name']);
    return gfResponse()->json(arrayToTree($data));
  }

  // 主页文章列表
  public function getArticleList(Request $request) {
    // 每页数据条数
    $pageSize = $request->input('pageSize', 10);
    $paginator = AppArticle::where([
      'status' => 1
    ])
    ->orderBy('create_time', 'desc')
    ->paginate($pageSize, '*', 'pageNum');
    $data = [
      'total' => $paginator->total(),
      'rows' => $paginator->items(),        
    ];
    return gfResponse()->json($data);
  }

  // 文章列表按分类
  public function getArticleListByCategory(Request $request) {
    // 每页数据条数
    $pageSize = $request->input('pageSize', 10);
    // 排序默认正序：按时间递减
    $order = $request->input('order', 0);
    $id = $request->input('id');
    if(!$id) {
      CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, ErrorConst::PARAM_ERROR_CODE_MSG);
    }
    $data = AppArticleService::getArticleListByCategory($pageSize, $order, $id);
    return gfResponse()->json($data);
  }

}