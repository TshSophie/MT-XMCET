<?php

namespace App\Http\Controllers\System;

use App\Exports\System\SysMenuExport;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\System\SysMenu;
use App\Models\System\SysRoleMenu;
use App\Services\System\SysMenuService;
use App\Utils\CommonUtil;
use App\ConstParam\ErrorConst;
use Excel;

class SysMenuController extends Controller
{
      // 获取所有分类
      public function list(){
        // 查询所有分类数据
        $data = SysMenu::get();
        return gfResponse()->json($data);
      }

      // 获取所有分类
      public function exportExcel(){
        // 查询所有分类数据
        $allCates = SysMenu::with('pSysMenu')->get()->toArray();
        $filename = "菜单列表".date("Ymd",time())."_h".date("His",time()).'.xlsx';
        return Excel::download(new SysMenuExport($allCates), $filename); // 输出直接流下载
      }

      public function getRouters() {
        // 查询所有分类数据
        $data = SysMenu::where('menu_type', '!=', 'F')->get();
        $result = [];
        foreach ($data as $item) {
          $component = $item['component'];
          // 目录
          if($item['menu_type'] == 'M') {
            $component = $component??'Layout';
            $result[] = [
              'parent_id' => $item['parent_id'],
              'menu_id' => $item['menu_id'],
              'alwaysShow' => true,
              'badge' => 0,
              'component' => $component,
              'hidden' => false,
              'meta' => [
                'title' => $item['menu_name'],
                'icon' => $item['icon']
              ],
              'name' => ucfirst($item['path']),
              'path' => '/' . ltrim($item['path'], '/'),
              'redirect'=> "noRedirect"
            ];
          // 菜单
          } elseif ($item['menu_type'] == 'C') {            
            $result[] = [
              'parent_id' => $item['parent_id'],
              'menu_id' => $item['menu_id'],
              'badge' => 0,
              'component' => $component,
              'hidden' => false,
              'meta' => [
                'title' => $item['menu_name'],
                'icon' => $item['icon']
              ],
              'name' => ucfirst($item['path']),
              'path' => $item['path'],
            ];
          }
        }
        $result = self::sortEndless3($result);
        return gfResponse()->json($result);
      }


      // 获取嵌套分类列表 完整
      public function tree(Request $request) {
        // 名称模糊匹配 title
        $name = $request->input('menuName');
        $status = $request->input('status');
        $searchCondition =  new SysMenu();
        if($status != null){
          $searchCondition = $searchCondition->where('status', $status);
        }
        // 标题模糊匹配
        if($name) {
          $searchCondition = $searchCondition->where('menu_name', 'like',  urldecode($name) . '%');
        }
        // 查询所有分类数据
        $allMenus = $searchCondition->orderBy('order_num', 'asc')->get();
        $data = self::sortEndless($allMenus);
        return gfResponse()->json($data);
      }

      public function mapTree()
      {
        $allMenus = SysMenu::where('status', '=', 0)->get();
        $data = self::sortEndless2($allMenus);
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
        // 查询该角色对应的所有menuid
        $checkedMenuData = SysRoleMenu::where('role_id', '=', $roleId)
        ->get()
        ->toArray();

        // 所有菜单数据
        $allMenu = SysMenu::get()->toArray();
        // 过滤出叶子节点
        $leafNodes = [];
        $parentIds = array_column($allMenu, 'parent_id');
        foreach ($checkedMenuData as $item) {
           if(!in_array($item['menu_id'], $parentIds)) {
             $leafNodes[] = $item;
           }
        }
        $checkedMenuIds = array_column($leafNodes, 'menu_id');
        $allMenus = SysMenu::where('status', '=', 0)->get();
        $data = [
          'menus' => self::sortEndless2($allMenus),
          'checkedKeys'=> $checkedMenuIds
        ];
        return gfResponse()->json($data);
      }

      // 无限极分类排序
      private static function sortEndless($array, $pid = 0)
      {
        if(count($array) == 1) {
          return $array;
        }
        $SysMenu = [];
        foreach ($array as $val)
        {
          if ($pid == $val['parent_id'])
          {
            $newItem = $val;
            $children = self::sortEndless($array, $val['menu_id']);
            if(count($children)){
              $newItem['children'] = $children;
            }
            $SysMenu[] = $newItem;
          }
        }
        return $SysMenu;
      }

      // 无限极分类排序
      private static function sortEndless2($array, $pid = 0)
      {
        if(count($array) == 1) {
          return  [
            'label' => $array[0]['menu_name'],
            'value' => $array[0]['menu_id'],
          ];
        }
        $SysMenu = [];
        foreach ($array as $val)
        {
          if ($pid == $val['parent_id'])
          {
            $newItem = [
              'label' => $val['menu_name'],
              'value' => $val['menu_id'],
            ];
            $children = self::sortEndless2($array, $val['menu_id']);
            if(count($children)){
              $newItem['children'] = $children;
            }
            $SysMenu[] = $newItem;
          }
        }
        return $SysMenu;
      }

      // 无限极分类排序
      private static function sortEndless3($array, $pid = 0)
      {
        if(count($array) == 1) {
          return $array;
        }
        $SysMenu = [];
        foreach ($array as $val)
        {
          if ($pid == $val['parent_id'])
          {
            $newItem = $val;
            $children = self::sortEndless3($array, $val['menu_id']);
            if(count($children)){              
              $newItem['children'] = $children;
            }
            unset($newItem['parent_id']);
            unset($newItem['menu_id']);
            $SysMenu[] = $newItem;
          }
        }
        return $SysMenu;
      }


      public function getOne(Request $request) {
        $id = $request->route('id');
        $data = [];
        if($id) {
            $data = SysMenu::find($id);
        }
        return gfResponse()->json($data);
      }


      /**
       * 新增菜单
       */
      public function newOne(Request $request)
      {
        $message = [
          'menuName.required' => '名称不能为空',
          'orderNum.required' => '显示排序不能为空',
          'parentId.required' => 'parentId不能为空',
        ];

        // 输入校验
        $validator = Validator::make($request->all(), [
          'menuName' => 'required|max:255',
          'parentId' => 'required|max:255',
          'orderNum' => 'required|integer',
        ], $message);

        // 校验失败处理
        if ($validator->fails()) {
          $errors = $validator->errors();
          CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
        }

        $data = SysMenuService::newOne($request->all());
        return gfResponse()->json($data, '新增菜单成功');
      }

      /**
       * 修改菜单
       */
      public function modifyOne(Request $request)
      {
        $message = [
          'menuName.required' => '名称不能为空',
        ];

        // 输入校验
        $validator = Validator::make($request->all(), [
          'menuId' => 'required|integer'
        ], $message);

        // 校验失败处理
        if ($validator->fails()) {
          $errors = $validator->errors();
          CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
        }

        $data = SysMenuService::modifyOne($request->all());
        return gfResponse()->json($data, '修改菜单成功');
      }

      /**
       * 删除菜单
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

        SysMenuService::deleteOne($request->route('id'));
        return gfResponse()->json('', '删除菜单成功');
      }
}
