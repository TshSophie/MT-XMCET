<?php

namespace App\Services\App;

use App\Models\App\AppUser;
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

    // 更新用户信息
    static public function updateUser($data) {
        $id = WxTokenService::getCurrentUid();
        $user = AppUser::find($id);
        array_key_exists('nickName', $data) ? $user->nick_name = $data['nickName'] : "";
        array_key_exists('avatar', $data) ? $user->avatar = $data['avatar'] : "";
        array_key_exists('location', $data) ? $user->location = $data['location'] : "";
        array_key_exists('gender', $data) ? $user->gender = $data['gender'] : "";
        $user->save();
        return $user;
    }
}