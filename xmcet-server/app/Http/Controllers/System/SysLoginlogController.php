<?php

namespace App\Http\Controllers\System;

use App\Exports\System\SysLoginlogExport;
use App\Http\Controllers\Controller;
use App\Services\System\SysLoginlogService;
use Illuminate\Http\Request;
use Excel;

class SysLoginlogController extends Controller
{
     /**
     * 列表
     */
    public function list(Request $request) {
        // 页数 默认参数page
      // $page = $request->input('page', 1);
      // 每页数据条数
      $pageSize = $request->input('pageSize', 10);
      $ipaddr = $request->input('ipaddr');
      $userName = $request->input('userName');
      $status = $request->input('status');
      // 日期范围
      $beginTime = $request->input('beginTime');
      $endTime = $request->input('endTime');

      // 获取列表数据
      $data = SysLoginlogService::getList($pageSize, $ipaddr, $userName, $status, $beginTime, $endTime);

      return gfResponse()->json($data);
    }

    /**
     * 导出列表
     */
    public function exportExcel(Request $request) {
        $pageSize = $request->input('pageSize', 10);
        $ipaddr = $request->input('ipaddr');
        $userName = $request->input('userName');
        $status = $request->input('status');
        // 日期范围
        $beginTime = $request->input('beginTime');
        $endTime = $request->input('endTime');
  
        // 获取列表数据
        $data = SysLoginlogService::getList($pageSize, $ipaddr, $userName, $status, $beginTime, $endTime);
  
        $filename = "登录日志列表".date("Ymd",time())."_h".date("His",time()).'.xlsx';
        return Excel::download(new SysLoginlogExport($data['rows']), $filename); // 输出直接流下载
    }

}