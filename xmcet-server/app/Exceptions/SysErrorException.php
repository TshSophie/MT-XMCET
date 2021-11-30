<?php

namespace App\Exceptions;

class SysErrorException extends BaseException {
    public function __construct($msg = '系统错误，请联系系统管理员！', $code = 500, $status = 500)
    {
        parent::__construct($msg, $code, $status);
    }
}