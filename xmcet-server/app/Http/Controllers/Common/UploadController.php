<?php

namespace App\Http\Controllers\Common;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Utils\CommonUtil;
use App\ConstParam\ErrorConst;
use App\Services\Common\UEditorService;

class UploadController extends Controller
{
    // 通用上传接口
    public function commonUpload(Request $request)
    {
        $fileField = 'file';
        $file = $request->file($fileField);
        //判断是否有文件上传成功
        if ($request->hasFile($fileField) && $file->isValid())
        {
            $filename = $file->store('common', 'public');
            return gfResponse()->json([
                'imgUrl' => '/storage/' . $filename
            ], '上传文件成功');
        }
        else
        {
            CommonUtil::throwException(ErrorConst::UPLOAD_FAILED_CODE, ErrorConst::UPLOAD_FAILED_CODE_MSG);
        }
    }

    // 编辑器图片
    public function editorUpload1(Request $request)
    {
        $fileField = 'file';
        $file = $request->file($fileField);
        //判断是否有文件上传成功
        if ($request->hasFile($fileField) && $file->isValid())
        {
            $filename = $file->store('editor', 'public');
            return gfResponse()->json([
                'imgUrl' => '/storage/' . $filename
            ], '上传文件成功');
        }
        else
        {
            CommonUtil::throwException(ErrorConst::UPLOAD_FAILED_CODE, ErrorConst::UPLOAD_FAILED_CODE_MSG);
        }
    }

    public function editorUpload(Request $request)
    {
        $UEditor = new UEditorService();
        // 读取ueditor后端配置文件
        $CONFIG = $UEditor->getConfigs();

        // 获取请求操作类型
        $action = $request->input('action');
        switch ($action) {
            case 'config':
                $result = json_encode($CONFIG);
                break;
            case 'uploadimage': // 上传图片
            case 'uploadscrawl': // 上传涂鸦
            case 'uploadvideo': // 上传视频
            case 'uploadfile': // 上传文件
                //$result = include("action_upload.php");
                $result = $UEditor->actionUpload($request);
                break;
            case 'listimage': // 列出图片
                $result = [];
                break;
            case 'listfile': // 列出文件
                //$result = include("action_list.php");
                $result =[];
                break;
            case 'catchimage': // 抓取远程文件
                //$result = include("action_crawler.php");
                $result = [];
                break;
            default:
                $result = json_encode(array(
                    'state' => '请求地址出错'
                ));
                break;
        }
        // 输出结果
        if ($request->input('callback')) {
            if (preg_match("/^[\w_]+$/", $request->input('callback'))) {
                return htmlspecialchars($_GET["callback"]) . '(' . $result . ')';
            } else {
                return json_encode(array(
                    'state' => 'callback参数不合法'
                ));
            }
        } else {
            return $result;
        }
    }
}
