<?php

namespace App\Services\App;

use App\ConstParam\Constants;
use App\Models\App\AppArticle;
use App\Models\App\AppUserLike;
use App\Services\Common\WxTokenService;

class AppUserLikeService
{
    // 用户点赞文章
    public static function userSetLikeArticle($id, $status) {
        $uid = WxTokenService::getCurrentUid();
        $insert = [
            'type' => Constants::LIKE_TYPE_ARTICLE,
            'type_id' => $id,
            'status' => $status,
            'user_id' => $uid
        ];
        // 记录用户点赞数
        $data = AppArticle::where(
            [
              'status' => 1,
              'id' => $id
            ]
        )->first();
        if($status) {
            $data->praise += 1;
        } else {
            $data->praise -= 1;
        }
        $data->save();
        return AppUserLike::create($insert);
    }
}