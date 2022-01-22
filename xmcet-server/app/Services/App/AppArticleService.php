<?php

namespace App\Services\App;

use App\ConstParam\Constants;
use App\Models\App\AppArticle;
use App\Models\App\AppArticleCategory;
use App\Models\App\AppUserCollect;
use App\Models\App\AppUserLike;
use App\Models\App\AppUserSubscribe;
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

    public static function getArticleListByCategory($pageSize, $order, $id) {
        $uid = WxTokenService::getCurrentUid();
        // 获取分类信息
        $category = AppArticleCategory::where([
            'id' => $id
        ])->first(['id', 'name']);
         // 该分类订阅情况
        $subscribeStatus = AppUserSubscribe::where([
            'user_id' => $uid,
            'channel_id' => $id,
            'channel_type' => Constants::SUBSCRIBE_TYPE_ARTICLE,
            'status' => 1,
        ])->count() > 0;
        $category->subscribeStatus = $subscribeStatus;
        $paginator = AppArticle::where([
            'status' => 1,
            'category_id' => $id
          ])
          ->orderBy('create_time', $order ? 'desc' : 'asc')
          ->paginate($pageSize, '*', 'pageNum');
          $data = [
            'total' => $paginator->total(),
            'rows' => $paginator->items(),
            'category' => $category     
          ];
          return $data;
    }
}