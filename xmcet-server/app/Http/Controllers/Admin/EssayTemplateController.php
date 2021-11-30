<?php

namespace App\Http\Controllers\Admin;

use App\ConstParam\ErrorConst;
use App\Http\Controllers\Controller;
use App\Models\App\AppEssayTemplate;
use App\Services\Admin\EssayTemplateService;
use App\Utils\CommonUtil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EssayTemplateController extends Controller
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
        $title = $request->input('title');
        // 状态
        $status = $request->input('status');
        // 日期范围
        $beginTime = $request->input('beginTime');
        $endTime = $request->input('endTime');
        $data = EssayTemplateService::getList($pageSize, $title, $status, $beginTime, $endTime);
        return gfResponse()->json($data);
    }

    public function getOne(Request $request)
    {
        $id = $request->route('id');
        $data = [];
        if ($id) {
            $data = AppEssayTemplate::find($id);
        }
        return gfResponse()->json($data);
    }

    public function addOne(Request $request)
    {
        $params = $request->all();
        // 输入校验
        $validator = Validator::make($params, [
            'title' => 'required|max:255',
            'content' => 'required',
            'status' => 'required|integer',
            'author' => 'required|max:255',
        ]);
        // 校验失败处理
        if ($validator->fails()) {
            $errors = $validator->errors();
            CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
        }
        $data = EssayTemplateService::addOne($params);
        return gfResponse()->json($data, '新增成功');
    }

    public function updateOne(Request $request)
    {
        $params = $request->all();
        // 输入校验
        $validator = Validator::make($params, [
            'id' => 'required|integer',
            'title' => 'max:255',
            'author' => 'max:255',
            'status' => 'integer',
        ]);
        // 校验失败处理
        if ($validator->fails()) {
            $errors = $validator->errors();
            CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
        }
        $data = EssayTemplateService::updateOne($params);
        return gfResponse()->json($data, '修改成功');
    }

    public function del(Request $request)
    {
        $message = [
            'id.required' => 'id不能为空',
        ];
        // 输入校验
        $validator = Validator::make(['id' => $request->route('id')], [
            'id' => 'required',
        ], $message);

        // 校验失败处理
        if ($validator->fails()) {
            $errors = $validator->errors();
            CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
        }

        EssayTemplateService::del($request->route('id'));
        return gfResponse()->json([], '删除成功');
    }
}
