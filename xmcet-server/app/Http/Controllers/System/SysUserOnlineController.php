<?php

namespace App\Http\Controllers\System;

use App\ConstParam\ErrorConst;
use App\Http\Controllers\Controller;
use App\Services\System\SysUserOnlineService;
use App\Utils\CommonUtil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Validator;

class SysUserOnlineController extends Controller
{

  /**
   * 列表
   */
  public function list(Request $request) {
    $page = $request->input('page', 1);
    $pageSize = $request->input('pageSize', 10);
    $ipaddr = $request->input('ipaddr');
    $userName = $request->input('userName');    
    // 获取列表数据
    $data = SysUserOnlineService::getList($page, $pageSize, $ipaddr, $userName);
    return gfResponse()->json($data);
  }

  public function forceLogout(Request $request)
  {
    $message = [
        'sessionId.required' => 'sessionId不能为空',
      ];
      // 输入校验
      $validator = Validator::make(['sessionId' => $request->route('sessionId')], [
        'sessionId' => 'required',
      ], $message);
      // 校验失败处理
      if ($validator->fails()) {
        $errors = $validator->errors();
        CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
      }
      return Redis::del($request->route('sessionId'));
      return gfResponse()->json('', '操作成功');
  }
}