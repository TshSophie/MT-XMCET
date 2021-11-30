<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Support\Facades\Log;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        // 注册客户端异常返回
        // $this->renderable(function (ClientErrorException $e, $request) {
        //     print_r($e);
        //     return response()->json(['msg' => $e->msg, 'code' => $e->code, 'data' => $e->data], $e->status);
        // });
    }

    public function render($request, Throwable $exception)
    {
        // 自定义异常
        if ($exception instanceof BaseException) {
        } else if(!env('APP_DEBUG')){
            return response()->json(['msg' => '系统错误，请联系系统管理员！', 'code' => 500], 500);
        }
        return parent::render($request, $exception);
    }

    /**
     * 报告异常.
     *
     * @return bool|null
     */
    public function report(Throwable $exception)
    {
        // 自定义异常
        if ($exception instanceof BaseException) {
        } else {
            // 拦截系统错误异常，记录日志
            $data = [
                'file'    => $exception->getFile(),
                'line'    => $exception->getLine(),
                'message' => $exception->getMessage(),
                'code'    => $exception->getCode(),
            ];
            Log::channel('single')->error($data);
        }
        return true;
    }

}
