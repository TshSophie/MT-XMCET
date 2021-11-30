<?php

namespace App\Http\Controllers\App;

use App\ConstParam\ErrorConst;
use App\Http\Controllers\Controller;
use App\Services\App\UserService;
use App\Utils\CommonUtil;

class UserController extends Controller
{
    // 获取token
    public function getToken($code = '')
    {
        if (!$code) {
            CommonUtil::throwException(ErrorConst::WX_CODE_LOSS_MSG, ErrorConst::WX_CODE_LOSS_CODE);
        }
        $data = UserService::getToken($code);
        return gfResponse()->json($data);
    }

    // 获取用户信息
    public function getInfo()
    {
       
    }
}