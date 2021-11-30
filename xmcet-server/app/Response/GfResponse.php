<?php

namespace App\Response;

use App\Utils\CommonUtil;
use Illuminate\Support\Facades\Response;

class GfResponse{
    public static function json($data = [], $msg = 'ok', $code = 200, $status = 200, array $headers = [], $options = 0) {
        return Response::json([
            'msg' => $msg,
            'code' => $code,
            // 数组下标下划线转驼峰
            'data' => CommonUtil::changeHump(json_decode(json_encode($data), true)),
        ], $status, $headers, $options);
    }
}