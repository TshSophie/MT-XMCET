<?php

namespace App\Services\App;

use App\ConstParam\Constants;
use App\Models\App\AppUserSubscribe;
use App\Services\Common\WxTokenService;

class AppUserSubscribeService
{
    // 用户点赞文章
    public static function userSubscribeArticle($id, $status) {
        $uid = WxTokenService::getCurrentUid();
        $insert = [
            'channel_type' => Constants::SUBSCRIBE_TYPE_ARTICLE,
            'channel_id' => $id,
            'status' => $status,
            'user_id' => $uid
        ];
        // 查询用户是否已订阅过
        $data = AppUserSubscribe::where([
            'channel_type' => Constants::SUBSCRIBE_TYPE_ARTICLE,
            'channel_id' => $id,
            'user_id' => $uid
        ])->first();
        if($data) {
            $data->status = $data->status ? 0 : 1;
            $data->save();
            return $data;
        }
        return AppUserSubscribe::create($insert);
    }
}