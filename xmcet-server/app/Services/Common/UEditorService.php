<?php

namespace App\Services\Common;

use App\ConstParam\ErrorConst;
use App\Utils\CommonUtil;

class UEditorService {
    //保存配置信息
    private $CONFIG;

    public function __construct()
    {
        //读取ueditor后端配置文件
        $this->CONFIG = json_decode(preg_replace(
            "/\/\*[\s\S]+?\*\//",
            "",
            file_get_contents("./storage/ueditor/config.json")),
            true);
    }

    public function getConfigs()
    {
        return $this->CONFIG;
    }

    // 上传附件和上传视频
    public function actionUpload($request)
    {
        $fileField = 'upfile';
        $file = $request->file($fileField);
        //判断是否有文件上传成功
        if ($request->hasFile($fileField) && $file->isValid())
        {
            $filename = $file->store('editor', 'public');
            return[
                "state" => '',
                "url" => '/storage/' . $filename,
                "title" => $filename,
                "original" => $file->getClientOriginalName(),
                "type" => '',
                "size" => '',
            ];
            
        }
        else
        {
            CommonUtil::throwException(ErrorConst::UPLOAD_FAILED_CODE, ErrorConst::UPLOAD_FAILED_CODE_MSG);
        }
    }

}