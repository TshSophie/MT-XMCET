<?php

namespace App\Services\App;

use App\Services\Common\WxTokenService;

class UserService
{
    static public function getToken($code)
    {
        //根据临时登录凭证code实例化用户token处理类
        $ut = new WxTokenService($code);
        //调用获取token的类
        $tokenInfo = $ut->get();
        return $tokenInfo;
    }

    // 检测用户是否授权过信息
    static public function checkUserAuthorizeStatus() {
        
    }
}