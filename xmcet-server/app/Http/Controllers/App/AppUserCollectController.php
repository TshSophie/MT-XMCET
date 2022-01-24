<?php

namespace App\Http\Controllers\App;

use App\ConstParam\ErrorConst;
use App\Http\Controllers\Controller;
use App\Services\App\AppUserCollectService;
use App\Utils\CommonUtil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AppUserCollectController extends Controller
{
    // 用户收藏
    public function userSetCollectArticle(Request $request) {
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
        $data = AppUserCollectService::userSetCollectArticle($params['id'], $params['status']);
        return gfResponse()->json($data);
    }

    // 用户文章收藏列表
    public function getUserCollectArticleList(Request $request) {        
        $data = AppUserCollectService::getUserCollectArticleList();
        return gfResponse()->json($data);
    }
}