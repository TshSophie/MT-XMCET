<?php

namespace App\ConstParam;

class ErrorConst
{    
    const PARAM_ERROR_CODE = 8000;
    const PARAM_ERROR_CODE_MSG = '缺少参数';
    const UPLOAD_FAILED_CODE = 8001;
    const UPLOAD_FAILED_CODE_MSG = '上传失败';
    const LOGIN_FAILED_CODE = 8003;
    const LOGIN_FAILED_CODE_MSG = '用户名或密码错误！';
    const UNAUTHORIZED_ACCESS_CODE = 8004;
    const UNAUTHORIZED_ACCESS_CODE_MSG = '无权限访问该接口！';
    const RESOURCE_NOTFOUND_CODE = 8005;
    const RESOURCE_NOTFOUND_CODE_MSG = '没有找到该资源';
    const OLD_PASSWORD_ERR_CODE = 8006;
    const OLD_PASSWORD_ERR_CODE_MSG = '修改密码失败，旧密码错误';

    // token缺失
    const WX_CODE_LOSS_CODE = 20003;
    const WX_CODE_LOSS_MSG = '微信小程序code缺失，非法！';

    const WX_INNER_ERR_CODE = 20004;
    const WX_INNER_ERR_MSG = '获取session_key及openID时异常，微信内部错误';

    const SERVER_EXCEPTION_CODE = 20005;
    const SERVER_EXCEPTION_MSG = '服务器缓存异常';

    // token不正确或过期
    const  TOKEN_EXPIRE_CODE = 10001;
    const TOKEN_EXPIRE_MSG = 'token不正确、缺失或过期';

}