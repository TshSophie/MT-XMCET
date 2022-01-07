<?php

namespace App\Http\Controllers\System;

use App\Exports\System\SysUserExport;
use App\Http\Controllers\Controller;
use App\Services\System\SysUserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\ConstParam\ErrorConst;
use App\Models\System\SysDept;
use App\Models\System\SysUser;
use App\Models\System\SysUserRole;
use App\Services\System\SysLoginlogService;
use App\Utils\CommonUtil;
use Excel;
use PhpOffice\PhpSpreadsheet\Reader\Xlsx;
use PhpOffice\PhpSpreadsheet\Reader\Xls;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use Illuminate\Support\Facades\Storage;
class SysUserController extends Controller
{
    /**
     * 登录
     */
    public function login(Request $request){
        $message = [
            'username.required' => '用户名不能为空',
            'password.required' => '密码不能为空',
            'captcha.required' => '验证码不能为空',
        ];

        // 输入校验
        $validator = Validator::make($request->all(), [
            'username' => 'required|max:255',
            'password' => 'required|min:6',
            'key' => 'required',
            'captcha' => 'required|captcha_api:'. request('key')
        ], $message);

        // 校验失败处理
        if ($validator->fails()) {
            $errMsg = '';
            $errors = json_decode(json_encode($validator->errors()), true);
            if(array_key_exists('captcha', $errors)) {
                $errMsg = '验证码错误';
            } else {
                $errMsg = '用户名或密码错误..';
            }
            SysLoginlogService::add(1, $errMsg);
            CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errMsg);
        }
        // 生成token
        $data = app('jwtAuth')->createToken($request->input('username'), $request->input('password'));
        SysLoginlogService::add(0, '登录成功');
        return gfResponse()->json($data);
    }

    /**
     * 退出
     */
    public function logout() {
        SysLoginlogService::add(0, '退出成功');
        app('jwtAuth')->logout();
        return gfResponse()->json();
    }

    /**
     * 列表
     */
    public function list(Request $request) {
        // 页数 默认参数page
      // $page = $request->input('page', 1);
      // 每页数据条数
      $pageSize = $request->input('pageSize', 10);
      // 名称模糊匹配
      $userName = $request->input('userName');
      // 状态
      $status = $request->input('status');
      // 部门
      $deptId = $request->input('deptId');
      // phonenumber
      $phonenumber = $request->input('phonenumber');
      // 日期范围
      $beginTime = $request->input('beginTime');
      $endTime = $request->input('endTime');

      // 获取列表数据
      $data = SysUserService::getList($pageSize, $userName, $status, $deptId, $phonenumber, $beginTime, $endTime);

      return gfResponse()->json($data);
    }

    /**
     * 导出列表
     */
    public function exportExcel(Request $request) {
       // 页数 默认参数page
      // $page = $request->input('page', 1);
      // 每页数据条数
      $pageSize = $request->input('pageSize', 10);
      // 名称模糊匹配
      $userName = $request->input('userName');
      // 状态
      $status = $request->input('status');
      // 部门
      $deptId = $request->input('deptId');
      // 日期范围
      $beginTime = $request->input('beginTime');
      $endTime = $request->input('endTime');
      // phonenumber
      $phonenumber = $request->input('phonenumber');
      // 获取列表数据
      $data = SysUserService::getList($pageSize, $userName, $status, $deptId, $phonenumber, $beginTime, $endTime);
      $filename = "用户列表".date("Ymd",time())."_h".date("His",time()).'.xlsx';
      return Excel::download(new SysUserExport($data['rows']), $filename); // 输出直接流下载
    }

    // 导入excel
    public function importExcel(Request $request) {
        // 要求上传的文件类型必须是表格格式
         $this->validate($request, [
          'file'  => 'required|mimes:xls,xlsx'
         ]);
        $file = $request->file('file');
        // 判断文件是否上传成功
        if ($file->isValid()){
            // 原文件名
            $originalName = $file->getClientOriginalName();
            // 临时绝对路径
            $realPath = $file->getRealPath();

            $reader = new Xlsx();
            // $reader = new Xls();
            $reader->setReadDataOnly(TRUE);
            $spreadsheet = $reader->load($realPath);
            $worksheet = $spreadsheet->getActiveSheet();  // 获取当前的工作表数据
            // 获取单元格数据
            $highestRow = $worksheet->getHighestRow();
            // $highestColumn = $worksheet->getHighestColumn();
            $recordData = [];
            // 部门数据
            $depts = SysDept::all()->toArray();            
            for ($row=2; $row < $highestRow; $row++) {
                if($worksheet->getCellByColumnAndRow(1 , $row)->getValue() == '') {
                    break;
                }
                $deptName = $worksheet->getCellByColumnAndRow(2 , $row)->getValue();
                // 部门值转换
                $deptId = '';
                foreach ($depts as $dept) {
                    if($dept['dept_name'] == $deptName) {
                        $deptId = $dept['dept_id'];
                        break;
                    }
                }
                $rowData = [
                    'user_name' => $worksheet->getCellByColumnAndRow(1 , $row)->getValue(),
                    'nick_name' => $worksheet->getCellByColumnAndRow(1 , $row)->getValue(),
                    'dept_id' => $deptId,
                    'phonenumber' => $worksheet->getCellByColumnAndRow(3 , $row)->getValue(),
                    'email' => $worksheet->getCellByColumnAndRow(4 , $row)->getValue(),
                    'office_phonenumber' => $worksheet->getCellByColumnAndRow(5 , $row)->getValue(),
                    'post_or_title' => $worksheet->getCellByColumnAndRow(6 , $row)->getValue(),
                    'sex' => $worksheet->getCellByColumnAndRow(7 , $row)->getValue() == '男' ? 0 : 1,
                    'attributes' => '综合部对接人',
                    'password' => '$2a$10$kYDKj4wgUQpLEKHkI8Tg4uYtpTogGdhib2BQw5q2sR/FrzjdruAl.'
                ];
                // 新增用户
                $SysUser = SysUser::create($rowData);
                // 新增角色
                SysUserRole::insert([
                    'user_id' => $SysUser->id,
                    'role_id' => 2 // 普通角色
                ]);
                $recordData[] = $rowData;
            }
            return gfResponse()->json([
                'recordData' => $recordData,
                'length' => count($recordData),
            ]);            
        }
    }

    /**
     * 根据id查询用户信息
     */
    public function getUser(Request $request) {
        $data = SysUserService::getUser($request->route('id'));
        return gfResponse()->json($data);
    }

    /**
     * 获取当前用户个人资料
     */
    public function getUserProfile() {
        $data = SysUserService::getUserProfile();
        return gfResponse()->json($data);
    }

    /**
     * 更新当前用户个人资料
     */
    public function updateUserProfile(Request $request) {
        // 输入校验
        $validator = Validator::make($request->all(), [
            'nickName' => 'max:30',
            'phonenumber' => 'max:11',
            'email' => 'max:50',
            'status' => 'integer',
            'sex' => 'integer',
        ]);

        // 校验失败处理
        if ($validator->fails()) {
            $errors = $validator->errors();
            CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
        }

        $data = SysUserService::updateUserProfile($request->all());
        return gfResponse()->json($data, '修改资料成功');
    }

    /**
     * 修改当前用户密码
     */
    public function updateUserPwd(Request $request) {
        // 输入校验
        $validator = Validator::make($request->all(), [
            'oldPassword' => 'required|min:6|max:30',
            'newPassword' => 'required|min:6|max:30',
        ]);
        // 校验失败处理
        if ($validator->fails()) {
            $errors = $validator->errors();
            CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
        }
        $oldPassword = $request->input('oldPassword');
        $newPassword = $request->input('newPassword');
        $data = SysUserService::updateUserPwd($oldPassword, $newPassword);
        return gfResponse()->json($data);
    }

    /**
     * 修改当前用户头像
     */
    public function uploadAvatar(Request $request) {
        $fileField = 'avatarfile';
        $file = $request->file($fileField);
        //判断是否有文件上传成功
        if ($request->hasFile($fileField) && $file->isValid())
        {
            $filename = $file->store('avatars', 'public');
            SysUserService::updateAvatar($filename);
            return gfResponse()->json([
                'imgUrl' => '/storage/' . $filename
            ], '上传文件成功');
        }
        else
        {
            CommonUtil::throwException(ErrorConst::UPLOAD_FAILED_CODE, ErrorConst::UPLOAD_FAILED_CODE_MSG);
        }
    }

    /**
     * 获取当前用户信息（基本信息、角色、权限）
     */
    public function getInfo() {        
        $data = SysUserService::getInfo();
        return gfResponse()->json($data);
    }

    /**
     * 添加
     */
    public function addUser(Request $request) {
        $message = [
        'nickName.required' => '用户昵称不能为空',
        'deptId.required' => '归属部门id不能为空',
        ];

        // 输入校验
        $validator = Validator::make($request->all(), [
        'nickName' => 'required|max:30',
        'deptId' => 'required|integer',
        'phonenumber' => 'required|max:11',
        'email' => 'required|max:50',
        'userName' => 'required|max:30',
        'password' => 'required|min:6|max:30',
        'status' => 'integer',
        ], $message);

        // 校验失败处理
        if ($validator->fails()) {
            $errors = $validator->errors();
            CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
        }

        $data = SysUserService::addUser($request->all());
        return gfResponse()->json($data, '新增用户成功');
    }

    /**
     * 修改用户信息
     */
    public function updateUser(Request $request) {
        $message = [
            'id.required' => '用户id不能为空',
        ];

        // 输入校验
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer',
            'nickName' => 'max:30',
            'deptId' => 'integer',
            'phonenumber' => 'max:11',
            'email' => 'max:50',
            'userName' => 'max:30',
            'password' => 'max:30',
            'status' => 'integer',
        ], $message);

        // 校验失败处理
        if ($validator->fails()) {
            $errors = $validator->errors();
            CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
        }

        $data = SysUserService::updateUser($request->all());
        return gfResponse()->json($data, '修改用户成功');
    }

    /**
     * 重置用户密码
     */
    public function resetPwd(Request $request) {
        $message = [
            'id.required' => '用户id不能为空',
        ];

        // 输入校验
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer',
            'password' => 'required|max:30',
        ], $message);

        // 校验失败处理
        if ($validator->fails()) {
            $errors = $validator->errors();
            CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE, $errors);
        }

        $data = SysUserService::updateUser($request->all());
        return gfResponse()->json($data, '修改密码成功');
    }

    public function deleteUser(Request $request){
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

        SysUserService::deleteUser($request->route('id'));
        return gfResponse()->json([], '删除用户成功');
    }

}
