<?php

namespace App\Http\Controllers\App;

use App\ConstParam\ErrorConst;
use App\Http\Controllers\Controller;
use App\Services\App\AppUserSubscribeService;
use App\Utils\CommonUtil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AppUserSubscribeController extends Controller
{
    // 用户订阅文章专栏
    public function userSubscribeArticle(Request $request) {
        $params = $request->all();
        // 输入校验
        $validator = Validator::make($params, [
            'id' => 'required|integer',
            'status' => 'required|integer',
        ]);
        // 校验失败处理
        if ($validator->fails()) {
            $errors = $validator->errors();
            CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
        }
        $data = AppUserSubscribeService::userSubscribeArticle($params['id'], $params['status']);
        return gfResponse()->json($data);
    }

    public function getUserSubscribeArticleCategoryList(Request $request) {
        // 每页数据条数
        $pageSize = $request->input('pageSize', 10);
        // 排序默认正序：按时间递减
        $order = $request->input('order', 0);
        $data = AppUserSubscribeService::getUserSubscribeArticleCategoryList($pageSize, $order);
        return gfResponse()->json($data);
    }
}