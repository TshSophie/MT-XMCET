<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ResponseTransFormMiddleware
{
    /**
     * Handle an incoming request.
     * 下划线转驼峰
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);
        $original = $response->original;
        $original = $this->changeHump(json_decode(json_encode($original), true));
        return response()->json($original);
    }

    //转换驼峰(只转key)
    public function changeHump($params)
    {
        if (is_array($params)) {
            foreach ($params as $key => $value){
                unset($params[$key]);
                $params[$this->convertUnderline($key)] = is_array($value) ? $this->changeHump($value) : $value;
            }
        }
        return $params;
    }

    public function convertUnderline($str)
    {
        return  preg_replace_callback('/([-_]+([a-z]{1}))/i', function ($matches) {return strtoupper($matches[2]);}, $str);
    }
}
