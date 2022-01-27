<?php

namespace App\Http\Controllers\App;

use App\ConstParam\ErrorConst;
use App\Http\Controllers\Controller;
use App\Models\App\AppFeedback;
use App\Services\App\AppFeedbackService;
use App\Utils\CommonUtil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AppFeedbackController extends Controller
{
    // 获取当前用户反馈列表
    public function getListByUser() {
        $data = AppFeedback::getListByUser();
        return gfResponse()->json($data);
    }

    // 用户提交反馈
    public function postByUser(Request $request) {
        $params = $request->all();
        // 输入校验
        $validator = Validator::make($params, [
            'title' => 'required|max:50',
            'type' => 'required|integer',
            'content' => 'required|max:200',
            'link' => 'required|max:50',
            'images' => 'required|max:500',
        ]);
        // 校验失败处理
        if ($validator->fails()) {
            $errors = $validator->errors();
            CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
        }
        $data = AppFeedbackService::postByUser($params);
        return gfResponse()->json($data);
    }

    // 用户提交反馈
    public function reply(Request $request) {
        $params = $request->all();
        // 输入校验
        $validator = Validator::make($params, [
            'id' => 'required|integer',
            'reply' => 'required|max:500',
        ]);
        // 校验失败处理
        if ($validator->fails()) {
            $errors = $validator->errors();
            CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
        }
        $data = AppFeedbackService::reply($params);
        return gfResponse()->json($data);
    }
}
