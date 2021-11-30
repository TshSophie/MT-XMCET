<?php

namespace App\Utils;

class ArrayUtils
{

    public static function paginator($list, $page, $pagesize)
    {
        $count = count($list); //总条数
        $start = ($page - 1) * $pagesize; //偏移量，当前页-1乘以每页显示条数
        $data = array_slice($list, $start, $pagesize);
        return [
            'rows' => $data,
            'total' => $count
        ];
    }
}
