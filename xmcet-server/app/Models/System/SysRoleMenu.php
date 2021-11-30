<?php

namespace App\Models\System;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SysRoleMenu extends Model
{
    /**
     * 与模型关联的表名
     *
     * @var string
     */
    protected $table = 'sys_role_menu';

    /**
     * 可批量赋值属性
     *
     * @var array
     */
    protected $fillable = [
        'role_id', 'menu_id', 
    ];

    // 关联menu表
    public function sysMenu()
    {
        return $this->hasOne('App\Models\System\SysMenu','menu_id', 'menu_id');
    }
}
