<?php

namespace App\Services\App;

use App\Models\App\AppUser;
use WxTokenService;

class UserService
{
    static public function getToken($code)
    {
        //根据临时登录凭证code实例化用户token处理类
        $ut = new WxTokenService($code);
        //调用获取token的类
        $token = $ut->get();
        return $token;
    }
}