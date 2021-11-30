<?php

namespace App\Exceptions;

class ClientErrorException extends BaseException {
    public function __construct($msg = 'error', $code = 400, $status = 200)
    {
        parent::__construct($msg, $code, $status);
    }
}