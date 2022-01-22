<?php

use App\Response\GfResponse;
use Illuminate\Contracts\Routing\ResponseFactory;

/**
 * 自定义http响应数据格式
 */
if (!function_exists('gfResponse')) {

    // 自定义响应函数
    function gfResponse($content = '', $status = 200, array $headers = [])
    {
        $factory = app(ResponseFactory::class);

        if (func_num_args() === 0) {
            return new GfResponse();
        }
        return $factory->make($content,[ $status, $headers]);
    }
}

/**
 * @param $url string get请求地址
 * @param int $httpCode 返回状态码
 * @return mixed
 */
if (!function_exists("curl_get")) {
    function curl_get($url, &$httpCode = 0)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        //不做证书校验，部署在Linux环境下改为true
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
        $file_contents = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        return $file_contents;
    }
}


/**
 * 求两个日期之间相差的天数
 * (针对1970年1月1日之后，求之前可以采用泰勒公式)
 * @param string $day1
 * @param string $day2
 * @return number
 */
if (!function_exists('diffBetweenTwoDays')) {
    function diffBetweenTwoDays($day1, $day2)
    {
        $second1 = strtotime($day1);
        $second2 = strtotime($day2);
        if ($second1 < $second2) {
            $tmp = $second2;
            $second2 = $second1;
            $second1 = $tmp;
        }
        return ($second1 - $second2) / 86400;
    }
}

/**
 * 数组转树型数据
 */
if(!function_exists('arrayToTree')) {
    // 无限极分类排序
    function arrayToTree($array, $pid = 0)
    {
        if(count($array) == 1) {
            return $array;
        }
        $temp = [];
        foreach ($array as $val)
        {
            if ($pid == $val['pid'])
            {
                $newItem = $val;
                $children = arrayToTree($array, $val['id']);
                if(count($children)){
                    $newItem['children'] = $children;
                }
                $temp[] = $newItem;
            }
        }
        return $temp;
    }
}