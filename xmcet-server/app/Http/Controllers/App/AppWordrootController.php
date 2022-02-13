<?php

namespace App\Http\Controllers\App;

use App\ConstParam\ErrorConst;
use App\Http\Controllers\Controller;
use App\Services\App\AppWordrootService;
use App\Utils\CommonUtil;
use Illuminate\Http\Request;

class AppWordrootController extends Controller 
{
    public function getBasicInfo()
    {
        $data = AppWordrootService::getBasicInfo();
        return gfResponse()->json($data);
    }

    public function setPlan(Request $request)
    {
        $dailyCount = $request->input('dailyCount', 10);
        $total = $request->input('total', 10);
        $data = AppWordrootService::setPlan($dailyCount, $total);
        return gfResponse()->json($data);
    }

    public function getList(Request $request) {
        // 每页数据条数
        $pageSize = $request->input('pageSize', 10);
        // 排序默认正序：按首字母递减
        $order = $request->input('order', 0);
        $type = $request->input('type');
        $data = AppWordrootService::getList($pageSize, $order, $type);
        return gfResponse()->json($data);
    }

    // 获取今日计划词汇列表
    public function getScheduleList()
    {
        $data = AppWordrootService::getScheduleList();
        return gfResponse()->json($data);
    }

    // 更新背词记录
    public function updateRecord(Request $request)
    {
        $id = $request->input('id');
        $status = $request->input('status', 0);
        if(!$id) {
            CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, ErrorConst::PARAM_ERROR_CODE_MSG);
        }
        $data = AppWordrootService::updateRecord($id, $status);
        return gfResponse()->json($data);
    }
}