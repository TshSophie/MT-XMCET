<?php

namespace App\Http\Controllers\App;

use App\ConstParam\ErrorConst;
use App\Http\Controllers\Controller;
use App\Services\App\UserService;
use App\Utils\CommonUtil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
        // 输入校验
        $validator = Validator::make($request->all(), [
            'nickName' => 'max:255',
            'avatar' => 'max:255',
            'location' => 'max:300',
            'gender' => 'integer',
        ]);
        // 校验失败处理
        if ($validator->fails()) {
            $errors = $validator->errors();
            CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
        }
        $data = UserService::updateUser($request->all());
        return gfResponse()->json($data, '更新信息成功');
    }

    // 获取用户信息
    public function getUserInfo()
    {
        $data = UserService::getUserInfo();
        return gfResponse()->json($data);
    }
}