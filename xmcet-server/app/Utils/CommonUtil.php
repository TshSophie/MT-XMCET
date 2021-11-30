<?php

namespace App\Utils;

use App\Exceptions\ClientErrorException;

class CommonUtil
{
  // 抛出自定义异常
  static function throwException($code, $msg, $status = 200) {
    throw new ClientErrorException($msg, $code, $status);
  }

  // 数组key下划线转驼峰处理函数
  static function changeHump($params)
  {
    if (is_array($params)) {
      foreach ($params as $key => $value){
        unset($params[$key]);
        $params[self::convertUnderline($key)] = is_array($value) ? self::changeHump($value) : $value;
      }
    }
    return $params;
  }

  // 字符串由下划线转驼峰
  static function convertUnderline(string $str)
  {
    return  preg_replace_callback('/([-_]+([a-z]{1}))/i', function ($matches) {return strtoupper($matches[2]);}, $str);
  }

  // 列表数据转嵌套tree型数据
  static function listToTree(array $list, $pid = 0,string $idName = 'id', string $pidName = 'pid')
  {
    if(count($list) == 1) {
      return $list;
    }
    $treeData = [];
    foreach ($list as $val)
    {
      if ($pid == $val[$pidName])
      {
        $newItem = $val;
        $children = self::listToTree($list, $val[$idName], $idName, $pidName);
        if(count($children)){
          $newItem['children'] = $children;
        }
        $treeData[] = $newItem;
      }
    }
    return $treeData;
  }
}