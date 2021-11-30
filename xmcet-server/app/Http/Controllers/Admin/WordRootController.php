<?php

namespace App\Http\Controllers\Admin;

use App\ConstParam\ErrorConst;
use App\Http\Controllers\Controller;
use App\Models\App\AppWordRoot;
use App\Services\Admin\WordRootService;
use App\Utils\CommonUtil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WordRootController extends Controller
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
        $word = $request->input('word');

        $data = WordRootService::getList($pageSize, $word);
        return gfResponse()->json($data);
    }

    public function getOne(Request $request)
    {
        $id = $request->route('id');
        $data = [];
        if ($id) {
            $data = AppWordRoot::find($id);
        }
        return gfResponse()->json($data);
    }

    public function addOne(Request $request)
    {
        $params = $request->all();
        // 输入校验
        $validator = Validator::make($params, [
            'word' => 'required|max:255',
            'mean' => 'required|max:1000',
            'detail' => 'required',
        ]);
        // 校验失败处理
        if ($validator->fails()) {
            $errors = $validator->errors();
            CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
        }
        $data = WordRootService::addOne($params);
        return gfResponse()->json($data, '新增成功');
    }

    public function updateOne(Request $request)
    {
        $params = $request->all();
        // 输入校验
        $validator = Validator::make($params, [
            'id' => 'required|integer',
            'word' => 'max:255',
            'mean' => 'max:1000',
        ]);
        // 校验失败处理
        if ($validator->fails()) {
            $errors = $validator->errors();
            CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
        }
        $data = WordRootService::updateOne($params);
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

        WordRootService::del($request->route('id'));
        return gfResponse()->json([], '删除成功');
    }
}
