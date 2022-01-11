<?php

namespace App\Http\Controllers\App;

use App\ConstParam\ErrorConst;
use App\Http\Controllers\Controller;
use App\Models\App\AppFeedback;
use App\Services\App\AppFeedbackService;
use App\Utils\CommonUtil;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Validator;

class AppUserLikeController extends Controller
{
    
    public function addOne(Request $request)
    {
        $params = $request->all();
        // 输入校验
        $validator = Validator::make($params, [
            'type_id' => 'required|integer',
            'type' => 'required|max:255',
            'status' => 'required|integer',
        ]);
        // 校验失败处理
        if ($validator->fails()) {
            $errors = $validator->errors();
            CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
        }
        // return gfResponse()->json($data, '新增成功');
    }
}