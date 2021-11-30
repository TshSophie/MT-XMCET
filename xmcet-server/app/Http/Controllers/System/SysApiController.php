<?php

namespace App\Http\Controllers\System;

use App\Exports\System\SysApiExport;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\System\SysApi;
use App\Models\System\SysRoleApi;
use App\Services\System\SysApiService;
use App\Utils\CommonUtil;
use App\ConstParam\ErrorConst;
use Excel;

class SysApiController extends Controller
{
      // 获取所有Api
      public function list(){
        // 查询所有Api数据
        $data = SysApi::get();
        return gfResponse()->json($data);
      }

      // 获取所有Api
      public function exportExcel(){
        // 查询所有Api数据
        $allCates = SysApi::with('pSysApi')->get()->toArray();
        $filename = "Api列表".date("Ymd",time())."_h".date("His",time()).'.xlsx';
        return Excel::download(new SysApiExport($allCates), $filename); // 输出直接流下载
      }

      // 获取嵌套Api列表 完整
      public function tree(Request $request) {
        // 名称模糊匹配 title
        $name = $request->input('apiName');
        $status = $request->input('status');
        $searchCondition =  new SysApi();
        if($status != null){
          $searchCondition = $searchCondition->where('status', $status);
        }
        // 标题模糊匹配
        if($name) {
          $searchCondition = $searchCondition->where('api_name', 'like', '%' . urldecode($name) . '%');
        }
        // 查询所有Api数据
        $allApis = $searchCondition->orderBy('order_num', 'asc')->get();
        $data = self::sortEndless($allApis);
        return gfResponse()->json($data);
      }

      public function mapTree()
      {
        $allApis = SysApi::where('status', '=', 0)->get();
        $data = self::sortEndless2($allApis);
        return gfResponse()->json($data);
      }

      public function mapTreeByRole(Request $request){
        $message = [
          'roleId.required' => 'roleId不能为空',
        ];
        $roleId = $request->route('roleId');
        // 输入校验
        $validator = Validator::make(['roleId' => $roleId], [
          'roleId' => 'required',
        ], $message);

        // 校验失败处理
        if ($validator->fails()) {
          $errors = $validator->errors();
          return response()->json(['msg'=>'error','code' => 500, 'data'=>$errors]);
        }
        // 查询该角色对应的所有apiid
        $checkedApiData = SysRoleApi::where('role_id', '=', $roleId)
        ->get()
        ->toArray();

        // 所有Api数据
        $allApi = SysApi::get()->toArray();
        // 过滤出叶子节点
        $leafNodes = [];
        $parentIds = array_column($allApi, 'parent_id');
        foreach ($checkedApiData as $item) {
           if(!in_array($item['api_id'], $parentIds)) {
             $leafNodes[] = $item;
           }
        }
        $checkedApiIds = array_column($leafNodes, 'api_id');
        $allApis = SysApi::where('status', '=', 0)->get();
        $data = [
          'apis' => self::sortEndless2($allApis),
          'checkedKeys'=> $checkedApiIds
        ];
        return gfResponse()->json($data);
      }

      // 无限极Api排序
      private static function sortEndless($array, $pid = 0)
      {
        if(count($array) == 1) {
          return $array;
        }
        $SysApi = [];
        foreach ($array as $val)
        {
          if ($pid == $val['parent_id'])
          {
            $newItem = $val;
            $children = self::sortEndless($array, $val['api_id']);
            if(count($children)){
              $newItem['children'] = $children;
            }
            $SysApi[] = $newItem;
          }
        }
        return $SysApi;
      }

      // 无限极Api排序
      private static function sortEndless2($array, $pid = 0)
      {
        if(count($array) == 1) {
          return  [
            'label' => $array[0]['api_name'],
            'value' => $array[0]['api_id'],
          ];
        }
        $SysApi = [];
        foreach ($array as $val)
        {
          if ($pid == $val['parent_id'])
          {
            $newItem = [
              'label' => $val['api_name'],
              'value' => $val['api_id'],
            ];
            $children = self::sortEndless2($array, $val['api_id']);
            if(count($children)){
              $newItem['children'] = $children;
            }
            $SysApi[] = $newItem;
          }
        }
        return $SysApi;
      }

      public function getOne(Request $request) {
        $id = $request->route('id');
        $data = [];
        if($id) {
            $data = SysApi::find($id);
        }
        return gfResponse()->json($data);
      }

      /**
       * 新增Api
       */
      public function newOne(Request $request)
      {
        $message = [
          'apiName.required' => '名称不能为空',
          'orderNum.required' => '显示排序不能为空',
          'parentId.required' => 'parentId不能为空',
          'type.required' => 'type不能为空',
        ];

        // 输入校验
        $validator = Validator::make($request->all(), [
          'apiName' => 'required|max:255',
          'parentId' => 'required|max:255',
          'orderNum' => 'required|integer',
          'type' => 'required|integer',
        ], $message);

        // 校验失败处理
        if ($validator->fails()) {
          $errors = $validator->errors();
          CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
        }

        $data = SysApiService::newOne($request->all());
        return gfResponse()->json($data, '新增Api成功');
      }

      /**
       * 修改Api
       */
      public function modifyOne(Request $request)
      {
        $message = [
          'apiId.required' => 'apiId不能为空',
        ];

        // 输入校验
        $validator = Validator::make($request->all(), [
          'apiId' => 'required|integer',
        ], $message);

        // 校验失败处理
        if ($validator->fails()) {
          $errors = $validator->errors();
          CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
        }

        $data = SysApiService::modifyOne($request->all());
        return gfResponse()->json($data, '修改Api成功');
      }

      /**
       * 删除Api
       */
      public function deleteOne(Request $request){
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

        SysApiService::deleteOne($request->route('id'));
        return gfResponse()->json('', '删除Api成功');
      }
}
