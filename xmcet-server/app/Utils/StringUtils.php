<?php

namespace App\Utils;

class StringUtils
{
    /**
     * 生成长度为length的随机码
     * @param $length 随机码的长度
     * @return null|string 随机码
     */
    public static function getRandChars($length)
    {
        $str = null;
        $strPol = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
        $max = strlen($strPol)-1;
        for ($i = 0;$i<$length;$i++)
        {
            $str .= $strPol[rand(0,$max)];
        }
        return $str;
    }

}