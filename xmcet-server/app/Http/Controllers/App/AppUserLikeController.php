<?php

namespace App\Http\Controllers\App;

use App\ConstParam\ErrorConst;
use App\Http\Controllers\Controller;
use App\Services\App\AppUserLikeService;
use App\Utils\CommonUtil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AppUserLikeController extends Controller
{
    // 用户点赞
    public function userSetLikeArticle(Request $request) {
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
        $data = AppUserLikeService::userSetLikeArticle($params['id'], $params['status']);
        return gfResponse()->json($data);
    }
}