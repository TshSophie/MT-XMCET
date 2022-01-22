<?php

namespace App\Services\App;

use App\ConstParam\Constants;
use App\Models\App\AppUserCollect;
use App\Services\Common\WxTokenService;

class AppUserCollectService
{
    // 用户收藏文章
    public static function userSetCollectArticle($id, $status) {
        $uid = WxTokenService::getCurrentUid();
        $insert = [
            'type' => Constants::COLLECT_TYPE_ARTICLE,
            'type_id' => $id,
            'status' => $status,
            'user_id' => $uid
        ];
        $collectData = AppUserCollect::where([
            'type' => Constants::COLLECT_TYPE_ARTICLE,
            'type_id' => $id,
            'user_id' => $uid
        ])->first();
        if($collectData) {
            $collectData->status = $collectData->status ? 0 : 1;
            $collectData->save();
            return $collectData;
        }
        return AppUserCollect::create($insert);
    }
}