<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Services\Common\WxTokenService;

class AuthAppToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $g = null)
    {
        // 身份校验
        if (!WxTokenService::check()) {
            return response()->json(['code' => 401,'msg' => 'token校验失败']);
        }
        // 接口权限校验
        // self::checkApiAuth($request);
        return $next($request);
    }
}
