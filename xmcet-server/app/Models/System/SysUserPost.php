<?php

namespace App\Models\System;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SysUserPost extends Model
{
   /**
     * 与模型关联的表名
     *
     * @var string
     */
    protected $table = 'sys_user_post';

    /**
     * 与表关联的主键
     * 默认就是id
     * @var string
     */
    // protected $primaryKey = 'user_id';
}
