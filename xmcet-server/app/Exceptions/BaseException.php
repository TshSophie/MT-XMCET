<?php

namespace App\Exceptions;

use Exception;

class BaseException extends Exception {
    public $status; // HTTP 状态码 404,200...
    public $msg;  // 错误信息具体
    public $code;  // 自定义错误码

    public function __construct($msg, $code, $status)
    {
        $this->msg = $msg;
        $this->code = $code;
        $this->status = $status;
    }

    /**
     *渲染异常为 HTTP 响应。
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function render($request)
    {
        return response()->json(['msg' => $this->msg, 'code' => $this->code], $this->status);
    }
}