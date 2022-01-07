<?php

namespace App\Http\Controllers\App;

use App\ConstParam\ErrorConst;
use App\Http\Controllers\Controller;
use App\Services\App\UserService;
use App\Utils\CommonUtil;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // 获取token
    public function getToken(Request $request)
    {
        $code = $request->input('code');
        if (!$code) {
            CommonUtil::throwException(ErrorConst::WX_CODE_LOSS_MSG, ErrorConst::WX_CODE_LOSS_CODE);
        }
        $data = UserService::getToken($code);
        return gfResponse()->json($data);
    }

    // 用户授权信息
    public function authorizeUserInfo(Request $request)
    {
        
    }

    // 获取用户信息
    public function getInfo()
    {
        
    }
}