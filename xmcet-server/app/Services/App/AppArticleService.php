<?php

namespace App\Services\App;

use App\ConstParam\Constants;
use App\Models\App\AppArticle;
use App\Models\App\AppUserCollect;
use App\Models\App\AppUserLike;
use App\Services\Common\WxTokenService;

class AppArticleService
{
    public static function getDetail($id) {
        $data = AppArticle::where(
            [
              'status' => 1,
              'id' => $id
            ]
        )->first();
        // 阅读数+1
        $data->read += 1;
        $data->save();
        $uid = WxTokenService::getCurrentUid();
        $likeCount = AppUserLike::where([
            'type_id' => $id,
            'type' => Constants::LIKE_TYPE_ARTICLE,
            'status' => 1,
            'user_id' => $uid
        ])->count();
        // 获取该文章用户收藏、点赞状态
        $collectStatus = AppUserCollect::where([
            'type_id' => $id,
            'type' => Constants::COLLECT_TYPE_ARTICLE,
            'status' => 1,
            'user_id' => $uid
        ])->count() > 0;
        $data->likeStatus = $likeCount > 0;
        $data->collectStatus = $collectStatus;
        $data->likeCount = $likeCount;
        return $data;
    }
}