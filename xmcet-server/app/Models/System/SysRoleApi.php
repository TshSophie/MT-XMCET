<?php

namespace App\Models\System;

use Illuminate\Database\Eloquent\Model;

class SysRoleApi extends Model
{
    /**
     * 与模型关联的表名
     *
     * @var string
     */
    protected $table = 'sys_role_api';

    /**
     * 可批量赋值属性
     *
     * @var array
     */
    protected $fillable = [
        'role_id', 'api_id', 
    ];

    // 关联api表
    public function sysApi()
    {
        return $this->hasOne('App\Models\System\SysApi','api_id', 'api_id');
    }
}
