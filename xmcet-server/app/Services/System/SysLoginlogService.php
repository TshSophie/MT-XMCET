<?php

namespace App\Services\System;

use App\Models\System\SysLoginlog;
use App\Utils\AddressUtils;
use Browser;
class SysLoginlogService
{
  public static function getList($pageSize, $ipaddr, $userName, $status, $beginTime, $endTime) {
      $searchCondition =  SysLoginlog::orderBy('login_time', 'desc');
      // 模糊匹配
      if($ipaddr) {
        $searchCondition = $searchCondition->where('ipaddr', 'like',  $ipaddr . '%');
      }
      if($userName) {
        $searchCondition = $searchCondition->where('user_name', 'like',  $userName . '%');
      }
      if($status != null){
        $searchCondition = $searchCondition->where('status', '=',  $status);
      }
      // 日期范围查询
      if($beginTime && $endTime) {
          $searchCondition = $searchCondition->whereBetween('login_time', [$beginTime, $endTime]);
      }
      $paginator = $searchCondition
      ->paginate($pageSize, '*', 'pageNum');
      return [
          'total' => $paginator->total(),
          'rows' => $paginator->items(),        
      ];
  }

  static public function add($status, $msg)
  {
    if(app('jwtAuth')->userInfo()) {
      $request = app('request');
      $loginfo = [
        'ipaddr' => $request->ip(),
        'user_name' => app('jwtAuth')->userInfo()['user_name'],
        'login_location' => AddressUtils::getRealAddressByIP($request->ip()),
        'browser' => Browser::browserName(),
        'os' => Browser::platformName(),
        'status' => $status,
        'msg' => $msg,
        'login_time' => now()
      ];
      SysLoginlog::create($loginfo);
    }
    return 'ok';
  }
}