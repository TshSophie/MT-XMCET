<?php

namespace App\Services\App;

use App\Models\App\AppFeedback;
use App\Services\Common\WxTokenService;

class AppFeedbackService
{
    // 获取当前用户反馈列表
    public static function getListByUser()
    {
        $id = WxTokenService::getCurrentUid();
        $data = AppFeedback::where([
            'user_id' => $id
        ])->orderBy('create_time', 'desc')->get();        
        return $data;
    }

    // 用户提交反馈
    public static function postByUser($data) {
        $id = WxTokenService::getCurrentUid();
        $insert = [
            'type' => $data['type'],
            'content' => $data['content'],
            'link' => $data['link'],
            'images' => $data['images'],
            'user_id' => $id
        ];
        return AppFeedback::create($insert);
    }

    // 回复反馈
    public static function reply($data) {
        $feedback = AppFeedback::where('id', '=', $data['id'])->first();
        $feedback->reply = $data['reply'];
        $feedback->save();
        return AppFeedback::create($data);
    }

}