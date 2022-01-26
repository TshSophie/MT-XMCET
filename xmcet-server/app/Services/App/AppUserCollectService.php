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

    // 获取用户收藏文章列表
    public static function getUserCollectArticleList($pageSize, $order) {
        $uid = WxTokenService::getCurrentUid();
        $paginator = AppUserCollect::with('article')
        ->where([
            'type' => Constants::COLLECT_TYPE_ARTICLE,
            'user_id' => $uid,
            'status' => 1
        ])
        ->orderBy('create_time', $order ? 'desc' : 'asc')
        ->paginate($pageSize, '*', 'pageNum');
        $data = $paginator->items();
        $dealData = [];
        foreach ($data as $item) {
           $dealData[] = [
             'id' => $item['id'],
             'articleId' => $item['article']['id'],
             'title' => $item['article']['title'],
             'createTime' => $item['update_time'],
             'coverImg' => $item['article']['cover_img'],
           ];
        }
        $data = [
          'total' => $paginator->total(),
          'rows' => $dealData,
        ];
        return $data;
    }
}