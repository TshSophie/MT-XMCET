<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * 列表
     */
    public function list(Request $request)
    {
        // 页数 默认参数page
        // $page = $request->input('page', 1);
        // 每页数据条数
        $pageSize = $request->input('pageSize', 10);
        // 名称模糊匹配
        $nickName = $request->input('nickName');

        $data = UserService::getList($pageSize, $nickName);
        return gfResponse()->json($data);
    }
}