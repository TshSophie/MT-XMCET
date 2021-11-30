<?php

namespace App\Services\System;

use App\ConstParam\Constants;
use App\Utils\ArrayUtils;
use Illuminate\Support\Facades\Redis;

class SysUserOnlineService
{
    public static function getList($page, $pageSize, $ipaddr, $userName) {
        // 查询出所有key
        $keys = Redis::keys(Constants::LOGIN_TOKEN_KEY . "*");
        $list = Redis::mGet($keys);
        $userOnlineList = [];
        foreach ($list as $user) {
            $data = json_decode($user, true);
            if($ipaddr && $userName) {
                if($data['ipaddr'] == $ipaddr && $data['user_name'] == $userName) {
                    $userOnlineList[] = $data;
                }
            } elseif($ipaddr) {
                if($data['ipaddr'] == $ipaddr) {
                    $userOnlineList[] = $data;
                }
            } elseif($userName) {
                if($data['user_name'] == $userName) {
                    $userOnlineList[] = $data;
                }
            } else {
                $userOnlineList[] = $data;
            }
        }
        return ArrayUtils::paginator($userOnlineList, $page, $pageSize);
    }    
}